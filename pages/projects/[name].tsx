import Error from "next/error";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import getContrastedColor from "@/lib/getContrastedColor";

import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import styles from "@/styles/ProjectSlug.module.scss";
import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import MarkdownToHTML from "@/lib/convert";
import prisma from "@/lib/prisma";
import { Avatar } from "@readyplayerme/visage";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import axios from "axios";
import getInvertedColor from "@/lib/getInvertedColor";

// const maleAnimations = [
//   "https://data.pierregueroult.dev/avatars/male-idle.glb",
//   "https://data.pierregueroult.dev/avatars/hiphop.glb",
// ];
// const femaleAnimations = [
//   "https://data.pierregueroult.dev/avatars/rumba.glb",
//   "https://data.pierregueroult.dev/avatars/taunt.glb",
// ];
// const animations = [...maleAnimations, ...femaleAnimations];

gsap.registerPlugin(ScrollTrigger);

export type CompleteProjectType = {
  id: string;
  name: string;
  concatenatedName: string;
  createdAt: string;
  type:
    | "video"
    | "website"
    | "photo"
    | "economic"
    | "marketing"
    | "graphism"
    | "drawing";
  description: string;
  banner: string;
  illustration: string;
  keywords: string[];
  documentation: string;
  contentHistory: string;
  contentImages: string[];
  asset: string;
  company: string;
  workers?: WorkerType[];
};

type WorkerType = {
  id: string;
  description: string;
  role: string;
  data: {
    id: string;
    name: string;
    image: string;
    link: string;
  };
};

type Props = {
  isValid: boolean;
  data?: CompleteProjectType;
  colors?: {
    accent: string;
    contrasted: string;
    inverted: string;
  };
};

export default function Project(props: Props): JSX.Element {
  useEffect(() => {
    // we set the colors of the project in the css variables
    document.body.style.setProperty("--main", props.colors?.accent || null);
    document.body.style.setProperty(
      "--reverse",
      props.colors?.contrasted || null
    );
    document.body.style.setProperty(
      "--inverted",
      props.colors?.inverted || null
    );
  }, [props.colors]);

  return props.isValid && props.data ? (
    <Layout title={props.data.name} description={props.data.description}>
      <ProjectIntroduction name={props.data.name} />
      <ProjectBanner data={props.data} />
      <ProjectContent data={props.data} />
      <ProjectWorkers workers={props.data.workers} />
      <ProjectEnd />
    </Layout>
  ) : (
    <Error statusCode={404} />
  );
}

const ProjectWorkers = (props: { workers: WorkerType[] | undefined }) => {
  const [currentWorker, setCurrentWorker] = useState(-1);

  useEffect(() => {
    if (props.workers !== undefined && props.workers.length > 0) {
      const windowWidth = window.innerWidth;
      const titleWidth =
        document.querySelector(`.${styles.workers__title}`)?.clientWidth || 0;

      gsap.fromTo(
        `.${styles.workers__title}`,
        { x: 0 },
        {
          x: -titleWidth + windowWidth,
          scrollTrigger: {
            trigger: `.${styles.workers}`,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
          },
        }
      );
    }
  }, [props.workers]);

  if (props.workers === undefined || props.workers.length === 0)
    return <div className={styles.workers__end}></div>;

  return (
    <section className={styles.workers}>
      <h2 className={styles.workers__title}>
        <span>L&apos;équipe du projet</span>
        <span>L&apos;équipe du projet</span>
      </h2>
      <div className={styles.workers__container}>
        <div className={styles.workers__description}>
          {props.workers &&
            props.workers.map((worker, index) => (
              <div
                key={index}
                className={`${styles.workers__description__text} ${
                  index === currentWorker
                    ? styles.workers__description__text__active
                    : ""
                }`}
                onClick={() => setCurrentWorker(index)}
              >
                <h3>{worker.data.name}</h3>
                <h4>{worker.role}</h4>
                <p>{worker.description}</p>
              </div>
            ))}
        </div>
        <div className={styles.workers__avatars}>
          {props.workers &&
            props.workers.map((worker, index) =>
              index === currentWorker ? (
                // <Avatar
                //   modelSrc={worker.data.image}
                //   animationSrc={animations[0]}
                //   className={styles.workers__avatar}
                //   scale={0.26}
                //   cameraTarget={0.23}
                //   cameraInitialDistance={0.2}
                //   key={index}
                // />
                <Fragment key={index}>
                  <div
                    style={{
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      fontSize: "2rem",
                    }}
                  >
                    Problème de performance client avec les avatar, réessayer
                    ulterieurement !
                  </div>
                </Fragment>
              ) : (
                <Fragment key={index}></Fragment>
              )
            )}
          {props.workers && currentWorker === -1 && (
            <p>
              Cliquer sur un nom pour faire apparaître son avatar (création de
              lag conséquent)
            </p>
          )}
        </div>
      </div>
      <div className={styles.workers__end}></div>
    </section>
  );
};

const ProjectIntroduction = (props: { name: string }) => {
  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const titleWidth =
      document.querySelector(`.${styles.introduction__title__ltr}`)
        ?.clientWidth || 0;

    gsap.fromTo(
      `.${styles.introduction__title__ltr}`,
      { x: -titleWidth + windowWidth },
      {
        x: windowWidth,
        ease: "linear",
        scrollTrigger: {
          trigger: `.${styles.banner}`,
          scrub: 0.5,
          end: `+=${windowHeight * 2}`,
        },
      }
    );

    gsap.fromTo(
      `.${styles.introduction__title__rtl}`,
      { x: 0 },
      {
        x: -titleWidth,
        ease: "linear",
        scrollTrigger: {
          trigger: `.${styles.banner}`,
          scrub: 0.5,
          end: `+=${windowHeight * 2}`,
        },
      }
    );
  }, []);

  return (
    <section className={styles.introduction}>
      <div className={styles.introduction__container}>
        <h2 className={styles.introduction__title__ltr}>
          <span>{props.name}</span>
          <span>{props.name}</span>
        </h2>
        <h2 className={styles.introduction__title__rtl}>
          <span>{props.name}</span>
          <span>{props.name}</span>
        </h2>
        <h2 className={styles.introduction__title__ltr}>
          <span>{props.name}</span>
          <span>{props.name}</span>
        </h2>
        <h2 className={styles.introduction__title__rtl}>
          <span>{props.name}</span>
          <span>{props.name}</span>
        </h2>
      </div>
    </section>
  );
};

const ProjectContent = (props: { data: CompleteProjectType }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className={styles.content}>
      {props.data.contentHistory && props.data.contentImages ? (
        <>
          <div
            className={styles.content__text}
            dangerouslySetInnerHTML={{ __html: props.data.contentHistory }}
          ></div>
          <div className={styles.content__images}>
            <div className={styles.content__images__container}>
              {props.data.contentImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={600}
                  height={600}
                  className={`${styles.content__image}`}
                  style={{
                    opacity: index === currentImage ? 1 : 0,
                    zIndex: index === currentImage ? 1 : 0,
                  }}
                />
              ))}
              <div className={styles.content__pdf}>
                <a
                  href={props.data.documentation}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir la documentation du projet
                </a>
              </div>
            </div>
            {props.data.contentImages.length > 0 && (
              <div className={styles.content__images__selector}>
                {props.data.contentImages.map((image, index) => (
                  <button
                    key={index}
                    className={styles.content__images__selector__button}
                    aria-label="Select image"
                    onClick={() => setCurrentImage(index)}
                  >
                    <Image
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={100}
                      height={100}
                      className={`${styles.content__selector__image}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

const ProjectBanner = (props: { data: CompleteProjectType }) => {
  return (
    <section className={styles.banner}>
      <div className={styles.banner__text}>
        <h1>{props.data.name}</h1>
        <div>
          <div className={styles.banner__container}>
            <table className={styles.banner__table}>
              <tbody>
                <tr>
                  <td>Type :</td>
                  <td>
                    {props.data.type === "video"
                      ? "Vidéo"
                      : props.data.type === "website"
                      ? "Site Web"
                      : props.data.type === "photo"
                      ? "Photo"
                      : props.data.type === "economic"
                      ? "Gestion / Organisation"
                      : props.data.type === "graphism"
                      ? "Graphisme"
                      : props.data.type === "drawing"
                      ? "Dessin"
                      : props.data.type === "marketing"
                      ? "Marketing"
                      : "Autre"}
                  </td>
                </tr>
                <tr>
                  <td>Année :</td>
                  <td> {new Date(props.data.createdAt).getFullYear()}</td>
                </tr>
                <tr>
                  <td>Commanditaire :</td>
                  <td>{props.data.company || "Projet de cours"}</td>
                </tr>
              </tbody>
            </table>
            {props.data.asset && props.data.asset !== "" && (
              <a
                href={props.data.asset}
                target="_blank"
                rel="noreferrer"
                className={styles.banner__button}
              >
                {props.data.type === "video" ? "Voir la vidéo" : "Voir le site"}
              </a>
            )}
          </div>
          <div className={styles.banner__container}>
            <ul>
              {props.data.keywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
            <p>{props.data.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectEnd = () => {
  return <div className={styles.end}></div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  // get the project name from the query
  const { name } = context.params as { name: string };
  // if the name is a string, we can search for it in the database
  if (typeof name === "string") {
    // we search for the project in the database
    const data = await prisma.project.findUnique({
      where: { concatenatedName: name },
      include: { workers: { include: { data: true } } },
    });
    // if the project is not found, we return an error
    if (data === null) {
      return {
        props: {
          isValid: false,
        },
      };
    }

    // if the project is found, we serialize the data
    var serializedData = await makeSerializable(data);

    // look for the contrasted color of the project color
    const contrastedColor = getContrastedColor(serializedData.color);
    const invertedColor = getInvertedColor(serializedData.color);

    const url = "https://data.pierregueroult.dev/contents/" + name + ".md";

    var content;

    try {
      content = await axios.get(url);
    } catch (error) {
      content = { data: "", status: 404 };
    }

    var convertedContent = await MarkdownToHTML(
      content.status === 200
        ? content.data
        : "Le contenu de ce projet n'est pas disponible pour le moment."
    );
    // we add the content to the data
    serializedData.contentHistory = convertedContent;

    // we return the data
    return {
      props: {
        isValid: true,
        data: serializedData,
        colors: {
          accent: serializedData.color,
          contrasted: contrastedColor,
          inverted: invertedColor,
        },
      },
    };
  }
  // if the name is not a string, we return an error
  else {
    return {
      props: {
        isValid: false,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // we get all the projects in the database
  const projects = await prisma.project.findMany({
    select: { concatenatedName: true },
  });
  // we serialize the data
  const serializedProjects = makeSerializable(projects);
  // we return the paths
  return {
    paths: serializedProjects.map((project) => ({
      params: { name: project.concatenatedName },
    })),
    fallback: false,
  };
};
