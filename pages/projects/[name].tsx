import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import Error from "next/error";
import { useEffect } from "react";

const title = "";
const description = "";

export type CompleteProject = {
  id: string;
  createAt: string;
  name: string;
  type: string;
  shortDescription: string;
  fullContent: string;
  comments: Array<any>; // augmenter le typage
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

export default function Project(props: Props): JSX.Element {
  return props.isValid ? (
    <Layout title={title} description={description}>
      <section>Hello</section>
    </Layout>
  ) : (
    <Error statusCode={404} title={"Project Introuvable"} />
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
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
