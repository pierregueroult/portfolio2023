import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import styles from "./index.module.scss";

const titre = "Mes projets";
const description = `Retrouvez sur cette page les projets réalisés par Pierre Guéroult trié par catégorie !`;

export type Project = {
  id: string;
  createAt: string;
  name: string;
  keyWords: string[];
  shortDescription: string;
  linkName: string;
};

export type ProjectsList = Project[];

type Props = {
  webPosts: ProjectsList | [];
  videoPosts: ProjectsList | [];
  logoPosts: ProjectsList | [];
  canonical: String;
};

const Projects = (props: Props) => {
  return (
    <Layout title={titre} description={description}>
      <header className={styles.header}>
        <h1>Mes derniers projets </h1>
      </header>
      <ProjectsSection projects={props.webPosts} type="WEB" />
      <ProjectsSection projects={props.videoPosts} type="AUDIOVISUEL" />
      <ProjectsSection projects={props.logoPosts} type="LOGO" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const webData = await prisma.project.findMany({
    where: { published: true, type: "web" },
    select: {
      id: true,
      createAt: true,
      name: true,
      keyWords: true,
      shortDescription: true,
      linkName: true,
    },
  });
  const videoData = await prisma.project.findMany({
    where: { published: true, type: "audiovisuel" },
    select: {
      id: true,
      createAt: true,
      name: true,
      keyWords: true,
      shortDescription: true,
      linkName: true,
    },
  });
  const logoData = await prisma.project.findMany({
    where: { published: true, type: "logo" },
    select: {
      id: true,
      createAt: true,
      name: true,
      keyWords: true,
      shortDescription: true,
      linkName: true,
    },
  });
  return {
    props: {
      webPosts: makeSerializable(webData),
      videoPosts: makeSerializable(videoData),
      logoPosts: makeSerializable(logoData),
    },
  };
};

export default Projects;
