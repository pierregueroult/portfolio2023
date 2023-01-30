import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import { ProjectsList } from ".";
import styles from "./all.module.scss";

const titre = "Tous mes projects";
const description =
  "Retrouvez sur cette page tout les projects de Pierre Gueroult présents dans la base de donnéees !";

type Props = {
  projects: ProjectsList | [];
};

const AllProjects = (props: Props): JSX.Element => {
  return (
    <Layout title={titre} description={description}>
      <section className={styles.allProjects}>
        {props.projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.project.findMany({
    where: { published: true },
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
      projects: makeSerializable(data),
    },
  };
};

export default AllProjects;
