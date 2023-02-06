import Error from "next/error";
import Image from "next/image";
import { faDev } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import styles from "./name.module.scss";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

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
};

export default function Project({ isValid, data }: Props): JSX.Element {
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      const content = await axios.get(
        `/api/getArticle?id=${data?.fullContent}`
      );
      setArticleContent(content.data.articleContent);
    };

    if (isValid) {
      fetchArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {articleContent === undefined || articleContent.length === 0 ? (
          <article className={styles.projectArticle}>
            <p className={styles.errorText}>
              Cet article n&apos;a pas encore été publié !
            </p>
          </article>
        ) : (
          <>
            <article
              className={styles.projectArticle}
              dangerouslySetInnerHTML={{ __html: articleContent || "" }}
            ></article>
            <footer className={styles.footer}>
              <p>
                La documentation complète de ce projet peut être trouvée{" "}
                <a href={data.documentationLink}>ici</a>
              </p>
              <p>
                Post réalisé grâce à l&apos;API <FontAwesomeIcon icon={faDev} />
              </p>
            </footer>
          </>
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
    return {
      props: {
        isValid: true,
        data: makeSerializable(data),
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
