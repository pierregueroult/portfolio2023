import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";
import { useEffect } from "react";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";

const titre = "Mes projets";
const description = `Retrouvez sur cette page les projets réalisés par Pierre Guéroult trié par catégorie !`;

export type Project = {
  id: string;
  createAt: string;
  name: string;
  keyWords: string[];
  brefIllustration: string;
};

export type ProjectsList = Project[];

type Props = {
  webPosts: ProjectsList | [];
  videoPosts: ProjectsList | [];
  logoPosts: ProjectsList | [];
  canonical: String;
};

const Projects: React.FC<Props> = (props) => {
  return (
    <Layout title={titre} description={description}>
      {props ? (
        <ProjectsSection projects={props.webPosts} type="WEB" />
      ) : (
        <p>Loading</p>
      )}
      {/* <ProjectsSection
        projects={[
          {
            id: "1",
            createAt: "2001-20-16",
            name: "Web 1",
            keyWords: ["portfolio"],
            brefIllustration:
              "https://i.postimg.cc/MT5qJLBL/testing-image.webp",
          },
          {
            id: "2",
            createAt: "2001-20-16",
            name: "Web 1",
            keyWords: ["portfolio"],
            brefIllustration:
              "https://i.postimg.cc/MT5qJLBL/testing-image.webp",
          },
        ]}
        type="WEB"
      /> */}
      {/* <ProjectsSection projects={props.videoPosts} type="AUDIOVISUEL" />
      <ProjectsSection projects={props.logoPosts} type="LOGO" /> */}
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
      brefIllustration: true,
    },
  });
  const videoData = await prisma.project.findMany({
    where: { published: true, type: "video" },
    select: {
      id: true,
      createAt: true,
      name: true,
      keyWords: true,
      brefIllustration: true,
    },
  });
  const logoData = await prisma.project.findMany({
    where: { published: true, type: "logo" },
    select: {
      id: true,
      createAt: true,
      name: true,
      keyWords: true,
      brefIllustration: true,
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
