import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";
import { useEffect } from "react";

const titre = "Mes projets";
const description = `Retrouvez sur cette page les projets réalisés par Pierre Guéroult trié par catégorie !`;

type Props = {
  id: string;
  createAt: string;
  name: string;
  keyWords: string[];
};

const Projects: React.FC<Props> = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Layout title={titre} description={description}>
      <p>oui</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const webData = await prisma.project.findMany({
    where: { published: true, type: "web" },
    select: { id: true, createAt: true, name: true, keyWords: true },
  });
  return {
    props: { webPosts: makeSerializable(webData) },
  };
};

export default Projects;
