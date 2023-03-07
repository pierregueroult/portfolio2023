import Error from "next/error";
import Image from "next/image";
import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import styles from "@/styles/ProjectSlug.module.scss";
import { Fragment, useEffect, useState } from "react";
import getContrastedColor from "@/lib/getContrastedColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";

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
  asset: string;
  workers?: {
    id: string;
    name: string;
    role: string;
    description: string;
    image?: string;
    link: string;
  }[];
};

type Props = {
  isValid: boolean;
  data?: CompleteProjectType;
  colors?: {
    accent: string;
    contrasted: string;
  };
};

export type ContentType = {
  data: { content: string; image: { url: string; alt: string }[] }[];
  conclusion: string;
};

export default function Project({ isValid, data, colors }: Props): JSX.Element {
  // boolean state to know if the full content is shown
  const [fullContentIsShown, setFullContentIsShown] = useState(false);
  // state to store the full content
  const [fullContent, setFullContent] = useState<ContentType | null>(null);
  // state to store the error message
  const [fullContentError, setFullContentError] = useState("");
  // state to store the scroll step
  const [scrollStep, setScrollStep] = useState(0);

  // function to handle the click on the content button
  // in order to get the full content and put it in the state or to show an error message
  const handleContentClick = async () => {
    // if the full content is not already shown
    if (fullContent === null) {
      // try to get the full content
      try {
        const response = await axios.get("/api/getProjectContent", {
          params: { id: data?.id },
        });
        // update the state with the full content
        setFullContent(response.data);
        // update the state to show the full content
        setFullContentIsShown(true);
      } catch (error) {
        // if an error occurs, update the state to show the error message
        setFullContentError("Une erreur est survenue !");
      }
    } else {
      // if the full content is already shown, update the state to show the error message
      setFullContentError("Le contenu est déjà chargé !");
    }
  };

  // function to handle the click on the asset button
  const handleClick = () => {
    window.open(data?.asset, "_blank");
  };

  useEffect(() => {
    // function to set the colors of the project in the css variables
    const setColors = (accent: string, contrasted: string) => {
      document.documentElement.style.setProperty("--accentColor", accent);
      document.documentElement.style.setProperty(
        "--contrastedColor",
        contrasted
      );
    };

    // if the colors are defined, set them
    if (colors) {
      setColors(colors.accent, colors.contrasted);
    } else {
      // if the colors are not defined, set the default colors
      setColors("#000000", "#ffffff");
    }
  }, [colors, data]);

  useEffect(() => {
    // function to set the scroll step in the state at each scroll
    const onScroll = (e: Event) => setScrollStep(window.scrollY);

    // add the scroll event listener to the window
    window.addEventListener("scroll", onScroll);

    // remove the scroll event listener when the component is unmounted
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // if the project is valid and the data is defined, return the project page
  return isValid && data ? (
    <Layout title={data.name} description={data.description}>
      <section className={`${styles.introduction} project_section`}>
        <div
          style={{
            backgroundImage: `url("${data.banner}")`,
            backgroundPositionY: `top ${scrollStep / 5}px`,
          }}
          className={styles.introductionImage}
        ></div>
        <h1 className={styles.introductionTitle}>{data.name}</h1>
      </section>
      <section className={`${styles.description} project_section`}>
        <Image
          src={data.illustration}
          alt={`${data.name} illustration`}
          width={400}
          height={500}
          className={styles.descriptionImage}
        />
        <article>
          <h2 className={styles.descriptionTitle}>{data.name}</h2>
          <ul className={styles.descriptionList}>
            {data.keywords.map((keyword, index) => (
              <li className={styles.descriptionListItem} key={index}>
                {keyword}
              </li>
            ))}
          </ul>
          <p className={styles.descriptionText}>{data.description}</p>
          {data.type === "video" ? (
            <button className={styles.descriptionButton} onClick={handleClick}>
              Voir la vidéo
            </button>
          ) : data.type == "website" ? (
            <button className={styles.descriptionButton} onClick={handleClick}>
              Voir le site
            </button>
          ) : (
            <Fragment />
          )}
        </article>
      </section>
      <section className={`${styles.gap} project_section`}>
        <div
          className={styles.gapImage}
          style={{
            backgroundImage: `url("${data.banner}")`,
            backgroundPositionY: `top calc(${scrollStep / 5}px - 40vw)`,
          }}
        ></div>
      </section>
      <section className={`${styles.members} project_section`}>
        <h2 className={styles.membersTitle}>
          Les membres de l&apos;équipe du projet :
        </h2>
        {data.workers ? (
          <WorkersSection workers={data.workers} />
        ) : (
          <p>Aucun membre d&apos;équipe trouvé !</p>
        )}
      </section>
      <section className={`${styles.showmore} project_section`}>
        <div
          className={styles.showmoreImage}
          style={{
            backgroundImage: `url("${data.banner}")`,
            backgroundPositionY: `top calc(${scrollStep / 5}px - 40vw)`,
          }}
        ></div>
        <nav className={styles.showmoreNav}>
          <button
            className={styles.showmoreButton}
            onClick={handleContentClick}
          >
            Voir le contenu complet
          </button>
          <Link className={styles.showmoreButton} href="/projects">
            Voir les autres projets
          </Link>
          <a href={data.documentation} className={styles.showmoreButton}>
            Voir la documentation
          </a>
        </nav>
        <p
          aria-hidden={fullContentError === "" ? true : false}
          className={`${styles.showmoreError} ${
            fullContentError !== "" ? styles.showmoreErrorIsActive : ""
          }`}
        >
          {fullContentError}
        </p>
      </section>
      <section
        className={`${styles.fullContent} ${
          fullContentIsShown
            ? styles.fullContentVisible
            : styles.fullContentNotVisible
        }`}
      >
        {fullContent !== null && fullContentIsShown === true ? (
          <Fragment>
            {fullContent.data.map((content, index) => {
              const TextComponent = (
                <div
                  dangerouslySetInnerHTML={{ __html: content.content }}
                  className={styles.fullContentText}
                ></div>
              );
              const ImageComponent = (
                <div className={styles.fullContentImages}>
                  {content.image.map((image, index) => (
                    <Image
                      key={index}
                      src={image.url}
                      alt={image.alt}
                      width={400}
                      height={500}
                      className={styles.fullContentImage}
                    />
                  ))}
                </div>
              );
              return (
                <article key={index} className={styles.fullContentArticle}>
                  {index % 2 === 0 ? (
                    <>
                      {TextComponent} {ImageComponent}
                    </>
                  ) : (
                    <>
                      {ImageComponent} {TextComponent}
                    </>
                  )}
                </article>
              );
            })}
            <article
              className={styles.fullContentConclusion}
              dangerouslySetInnerHTML={{ __html: fullContent.conclusion }}
            ></article>
          </Fragment>
        ) : (
          <Fragment />
        )}
      </section>
    </Layout>
  ) : (
    // If the project is not found, we display a 404 error
    <Error statusCode={404} title={"Project Introuvable"} />
  );
}

// The component that displays the workers

// The props type
type WorkersSectionProps = {
  workers: {
    id: string;
    name: string;
    role: string;
    description: string;
    image?: string;
    link: string;
  }[];
};

function WorkersSection(props: WorkersSectionProps) {
  // The current worker displayed in the slider
  const [currentWorker, setCurrentWorker] = useState(0);

  // The function that handle the slider right click
  const handleRightClick = () => {
    if (currentWorker < props.workers.length - 1) {
      setCurrentWorker(currentWorker + 1);
    } else {
      setCurrentWorker(0);
    }
  };
  // The function that handle the slider left click
  const handleLeftClick = () => {
    if (currentWorker > 0) {
      setCurrentWorker(currentWorker - 1);
    } else {
      setCurrentWorker(props.workers.length - 1);
    }
  };

  return (
    <div className={styles.membersContainer}>
      <div
        className={`${styles.membersSlider} ${styles.membersSliderLeft}`}
        onClick={handleLeftClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className={`${styles.membersSlider} ${styles.membersSliderRight}`}
        onClick={handleRightClick}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      {props.workers?.map((worker, index) => (
        <article
          key={index}
          className={`${styles.member} ${
            index === currentWorker
              ? styles.memberVisible
              : styles.memberNotVisible
          }`}
        >
          <div className={styles.memberData}>
            <h3 className={styles.memberName}>{worker.name}</h3>
            <h4 className={styles.memberRole}>{worker.role}</h4>
            <p className={styles.memberText}>{worker.description}</p>

            <a
              target={"_blank"}
              rel="noreferrer"
              href={worker.link}
              className={`${styles.memberLink} ${
                worker.link === "https://pierregueroult.dev"
                  ? styles.memberLinkHidden
                  : ""
              }`}
            >
              Voir son site
            </a>
          </div>
          <div className={styles.memberImageContainer}>
            {worker.image ? (
              <Image
                src={worker.image}
                alt={`${worker.name} illustration`}
                width={200}
                height={450}
                className={styles.memberImage}
                quality={100}
                unoptimized={true}
              />
            ) : (
              <div className={styles.memberImagePlaceholder}></div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // get the project name from the query
  const { name } = query;
  // if the name is a string, we can search for it in the database
  if (typeof name === "string") {
    // we search for the project in the database
    const data = await prisma.project.findUnique({
      where: { concatenatedName: name },
      include: { workers: true },
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

    // we return the data
    return {
      props: {
        isValid: true,
        data: serializedData,
        colors: {
          accent: serializedData.color,
          contrasted: contrastedColor,
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
