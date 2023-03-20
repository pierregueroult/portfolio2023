import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";
import styles from "@/styles/Project.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import Image from "next/image";

const titre = "Mes projets";
const description = `Retrouvez sur cette page les projets réalisés par Pierre Guéroult trié par catégorie !`;

export type projectType = {
  concatenatedName: string;
  name: string;
  type: string;
  banner: string;
  keywords: string[];
  color: string;
};

export type logoType = {
  name: string;
  mainImage: string;
  description: string;
  color: string;
};

type projectsProps = {
  lastProjects: projectType[];
  lastLogos: logoType[];
};

const Projects = (props: projectsProps) => {
  return (
    <Layout title={titre} description={description}>
      <h1 className={styles.title}>Mes derniers projets </h1>
      <ul className={styles.projects}>
        {props.lastProjects.map((project, i) => {
          return <ProjectBanner key={i} {...project} />;
        })}
      </ul>
      <Link href={"/projects/all"} className={styles.text}>
        Voir tous les projets
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
      {props.lastLogos.length >= 7 ? (
        <>
          <h2 className={styles.title}>Mon Logofolio</h2>
          <section className={styles.logofolio}>
            {props.lastLogos.map((logo, i) => (
              <article key={i}>
                <Image
                  src={logo.mainImage}
                  alt={logo.name}
                  width={300}
                  height={300}
                />
              </article>
            ))}
          </section>
        </>
      ) : (
        <h2 className={styles.title}>Contenu à venir ...</h2>
      )}
    </Layout>
  );
};

export const ProjectBanner = ({
  concatenatedName,
  name,
  type,
  color,
}: projectType) => {
  const elementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    elementRef.current?.style.setProperty("--color", color);
  }, [color, elementRef]);

  return (
    <li className={`${styles.banner__project}`} ref={elementRef}>
      <Link
        href={`/projects/${concatenatedName}`}
        className={styles.banner__link}
        title={name}
      >
        <div className={styles.banner__text}>
          <h3>{name}</h3>
          <h4>
            {type === "video"
              ? "Projet vidéo"
              : type === "photo"
              ? "Projet de photographie"
              : type === "web"
              ? "Projet Web"
              : type === "graphism"
              ? "Projet de graphisme"
              : "Autre Projet"}
          </h4>
        </div>
        <div className={styles.banner__callToAction}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    </li>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const lastProjects = await prisma.project.findMany({
    where: {
      visible: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
    select: {
      concatenatedName: true,
      name: true,
      type: true,
      banner: true,
      keywords: true,
      color: true,
    },
  });

  const lastLogos = await prisma.logos.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 14,
    select: {
      name: true,
      mainImage: true,
      description: true,
      color: true,
    },
  });
  return {
    props: {
      lastProjects: makeSerializable(lastProjects),
      lastLogos: makeSerializable(lastLogos),
    },
  };
};

export default Projects;
