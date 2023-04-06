import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";
import { projectType, ProjectBanner } from ".";
import { useState, useEffect } from "react";
import styles from "@/styles/Project.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const title = "Tous mes projets";
const description = "Vous trouverez sur cette page tous mes projets, triables.";

type allProjectProps = {
  projects: projectType[];
};

const AllProject = ({ projects }: allProjectProps) => {
  const [projectsList, setProjectsList] = useState<projectType[]>([]);

  const handleChangeKeywords = () => {
    const keywords = document.getElementById("keywords") as HTMLInputElement;
    const filteredProjects = projects.filter(
      (project) =>
        // Check if the keyword is in the project's keywords
        project.keywords.includes(keywords.value) ||
        // Check if the keyword is in the project's keywords in lowercase
        project.keywords.includes(keywords.value.toLowerCase()) ||
        // Check if the keyword is in the project's keywords in uppercase
        project.keywords.includes(keywords.value.toUpperCase()) ||
        // Check if the keyword is in the start of the project's keywords
        project.keywords.some((keyword) =>
          keyword.startsWith(keywords.value)
        ) ||
        // Check if the keyword is in the start of the project's keywords in lowercase
        project.keywords.some((keyword) =>
          keyword.startsWith(keywords.value.toLowerCase())
        ) ||
        // Check if the keyword is in the start of the project's keywords in uppercase
        project.keywords.some((keyword) =>
          keyword.startsWith(keywords.value.toUpperCase())
        ) ||
        // Check if the keyword is in the end of the project's keywords
        project.keywords.some((keyword) => keyword.endsWith(keywords.value)) ||
        // Check if the keyword is in the end of the project's keywords in lowercase
        project.keywords.some((keyword) =>
          keyword.endsWith(keywords.value.toLowerCase())
        ) ||
        // Check if the keyword is in the end of the project's keywords in uppercase
        project.keywords.some((keyword) =>
          keyword.endsWith(keywords.value.toUpperCase())
        ) ||
        // Check if the keyword is in the project's name
        project.name == keywords.value ||
        // Check if the keyword is in the project's name in lowercase
        project.name.toLowerCase() == keywords.value ||
        // Check if the keyword is in the project's name in uppercase
        project.name.toUpperCase() == keywords.value ||
        // Check if the keyword is in the start of the project's name
        project.name.startsWith(keywords.value) ||
        // Check if the keyword is in the start of the project's name in lowercase
        project.name.toLowerCase().startsWith(keywords.value) ||
        // Check if the keyword is in the start of the project's name in uppercase
        project.name.toUpperCase().startsWith(keywords.value) ||
        // Check if the keyword is in the end of the project's name
        project.name.endsWith(keywords.value) ||
        // Check if the keyword is in the end of the project's name in lowercase
        project.name.toLowerCase().endsWith(keywords.value) ||
        // Check if the keyword is in the end of the project's name in uppercase
        project.name.toUpperCase().endsWith(keywords.value)
    );
    setProjectsList(filteredProjects);
  };

  const handleChangeType = () => {
    const type = document.getElementById("type") as HTMLSelectElement;
    if (type.value === "all") {
      setProjectsList(projects);
    } else {
      const filteredProjects = projects.filter(
        (project) => project.type === type.value
      );
      setProjectsList(filteredProjects);
    }
  };

  useEffect(() => {
    setProjectsList(projects);
  }, [projects]);

  return (
    <Layout title={title} description={description}>
      <h1 className={styles.allProjects__title}>Tous mes projets : </h1>
      <section className={styles.allProjects__filter}>
        <p>
          <Link
            href="/projects"
            title="Retour aux projets"
            className={styles.allProjects__back}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Retour</span>
          </Link>
        </p>
        <p>
          <label htmlFor="type">Type de projet :</label>
          <select name="type" id="type" onChange={handleChangeType}>
            <option value="all">Tous</option>
            <option value="web">Web</option>
            <option value="graphism">Graphisme</option>
            <option value="video">Vidéo</option>
            <option value="communication">Communication</option>
          </select>
        </p>
        <p>
          <label htmlFor="keywords">Recherche par mots-clés :</label>
          <input
            type="text"
            name="keywords"
            id="keywords"
            autoComplete="none"
            autoFocus
            tabIndex={1}
            onChange={handleChangeKeywords}
          />
        </p>
      </section>
      <section className={styles.allProjects__container}>
        {projectsList &&
          projectsList.map((project, i) => {
            return <ProjectBanner key={i} {...project} />;
          })}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allProjects = await prisma.project.findMany({
    where: {
      visible: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      concatenatedName: true,
      name: true,
      type: true,
      banner: true,
      keywords: true,
      color: true,
    },
  });
  return {
    props: {
      projects: makeSerializable(allProjects),
    },
  };
};

export default AllProject;
