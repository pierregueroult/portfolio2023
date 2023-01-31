import Error from "next/error";
import axios from "axios";
import Image from "next/image";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { rehype } from "rehype";
import { useEffect } from "react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";

import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import styles from "./name.module.scss";

export type CompleteProject = {
  id: string;
  createAt: string;
  name: string;
  type: string;
  shortDescription: string;
  fullContent: string;
  comments: Array<any>; // TODO: augmenter le typage
  workers: Array<any>;
  keyWords: string[];
  brefIllustration: string;
  mainIllustration: string;
  documentationLink: string;
};

type Props = {
  isValid: boolean;
  data?: CompleteProject;
  pageContent?: string;
};

type DevtoContent = {
  data: {
    body_markdown: string;
  };
};

export default function Project({
  isValid,
  data,
  pageContent,
}: Props): JSX.Element {
  useEffect(() => {
    console.log(pageContent);
  }, []);

  return isValid && data ? (
    <Layout title={data.name} description={data.shortDescription}>
      <section>
        <header className={styles.header}>
          <div className={styles.headerTexts}>
            <h1 className={styles.title}>{data.name}</h1>
            <p className={styles.headerDate}>
              Publié le {new Date(data.createAt).getDate()}-
              {(new Date(data.createAt).getMonth() + 1).toString().length < 10
                ? `0${new Date(data.createAt).getMonth() + 1}`
                : `${new Date(data.createAt).getMonth() + 1}`}
              -{new Date(data.createAt).getFullYear()}
            </p>
            <p className={styles.headerDescription}>{data.shortDescription}</p>
            <ul className={styles.headerKeywords}>
              {data.keyWords.map((keyWord, i) => (
                <li key={i} className={styles.headerKeyword}>
                  #{keyWord}
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={data.brefIllustration}
            height={200 - 48}
            width={260}
            alt={`${data.name} picture`}
            className={styles.headerImage}
          />
        </header>
        {data.fullContent === "notOut" ||
        typeof pageContent !== "string" ||
        pageContent === "" ? (
          <article className={styles.projectArticle}>
            <p className={styles.errorText}>
              Le contenu de cet article n&apos;est pas encore rédigé !
            </p>
          </article>
        ) : (
          <article
            className={styles.projectArticle}
            dangerouslySetInnerHTML={{ __html: pageContent || "" }}
          ></article>
        )}
      </section>
    </Layout>
  ) : (
    <Error statusCode={404} title={"Project Introuvable"} />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;
  if (typeof name === "string") {
    const data = await prisma.project.findUnique({ where: { linkName: name } });
    if (data === null) {
      return {
        props: {
          isValid: false,
        },
      };
    }
    if (data.fullContent === "notOut") {
      return {
        props: {
          isValid: true,
          data: makeSerializable(data),
        },
      };
    }
    const devto: DevtoContent = await axios.get(data.fullContent, {
      // headers: {
      //   "api-key": process.env.DEVTO_API_KEY,
      // },
    });

    const content = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(devto.data.body_markdown);

    const file = await rehype()
      .data("settings", { fragment: true })
      .use(rehypeHighlight)
      .process(content.value);

    return {
      props: {
        isValid: true,
        data: makeSerializable(data),
        pageContent: makeSerializable(String(file)),
      },
    };
  } else {
    return {
      props: {
        isValid: false,
      },
    };
  }
};
