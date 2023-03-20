import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import upperCases from "@/lib/upperCases";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { HomeProject } from "@/pages";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(ScrollTrigger);

const gsapyoffset = 100;
const gsapxoffset = 100;

export const HomeSectionFirst = () => {
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [cursorText] = useState<string>("scrollDOWN");
  const cursorEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ? cursor animation
    const handleMouseMoove = (event: MouseEvent) => {
      setTimeout(() => {
        setCurrentPos({ x: event.clientX, y: event.clientY });
      }, 0);
    };
    window.addEventListener("mousemove", handleMouseMoove);

    // ? gsap parallax
    gsap.to(`.${styles.sectionfirst__text}`, {
      scrollTrigger: {
        scrub: true,
      },
      y: gsapyoffset,
      x: -gsapxoffset,
      ease: "none",
    });
    gsap.to(`.${styles.sectionfirst__illustration}`, {
      scrollTrigger: {
        scrub: true,
      },
      y: gsapyoffset,
      x: gsapxoffset,
      ease: "none",
    });

    return () => window.addEventListener("mousemove", handleMouseMoove);
  }, []);

  useEffect(() => {
    var content = cursorText
      .split("")
      .map((letter) =>
        upperCases.includes(letter)
          ? `<span class="${
              styles.sectionfirst__spanVariant
            }">${letter.toUpperCase()}</span>`
          : `<span>${letter.toUpperCase()}</span>`
      )
      .join("");
    if (cursorEl.current)
      cursorEl.current.innerHTML = `<div style="--count: ${cursorText.length}">${content}${content}</div>`;
  }, [cursorText]);

  return (
    <>
      <div className={styles.sectionfirst__text}>
        <h1 className={styles.sectionfirst__title}>
          Bonjour. Je suis <span>Pierre Guéroult</span>. <br />
          Futur <span>Développeur Web</span>.
        </h1>
        <p className={styles.sectionfirst__description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          voluptatem hic, eveniet eligendi quas, quis illum saepe animi at totam
          veniam a ea. Similique enim delectus inventore molestiae cupiditate
          dolore.
        </p>
        <Link
          href="/projects"
          className={styles.sectionfirst__link}
          title="Voir mes projets"
        >
          Voir mes projets
        </Link>
      </div>
      <div className={styles.sectionfirst__illustration}></div>
      <div
        className={styles.sectionfirst__cursor}
        ref={cursorEl}
        style={{
          transform: `translate(${
            currentPos.x - (cursorEl.current?.clientWidth || 0) / 2
          }px, ${currentPos.y - (cursorEl.current?.clientHeight || 0) / 2}px)`,
        }}
      ></div>
    </>
  );
};

export const HomeSectionSecond = () => {
  return <></>;
};

type HomeSectionThirdProps = {
  principalProject: HomeProject;
  featuredProjects: HomeProject[];
};

export const HomeSectionThird = (props: HomeSectionThirdProps) => {
  return (
    <>
      <div className={styles.sectionthird__text}>
        <h2>
          <Link href={"/projects"}>Mes projets</Link>
        </h2>
      </div>
      <div className={styles.sectionthird__display}>
        {props.principalProject && (
          <article
            className={`${styles.sectionthird__principalProject} ${styles.sectionthird__project}`}
          >
            <Link
              href={`/projects/${props.principalProject.concatenatedName}`}
              title={`Voir le projet ${props.principalProject.name}`}
              className={styles.sectionthird__project__link}
            >
              <div
                className={styles.sectionthird__project__color}
                style={{ backgroundColor: props.principalProject.color }}
              ></div>
              <div className={styles.sectionthird__principalProject__content}>
                <h3>{props.principalProject.name}</h3>
                <p
                  style={{
                    color: props.principalProject.contrastedColor
                      ? props.principalProject.contrastedColor
                      : "white",
                  }}
                >
                  {props.principalProject.type === "video"
                    ? "Projet vidéo"
                    : props.principalProject.type === "photo"
                    ? "Projet de photographie"
                    : props.principalProject.type === "web"
                    ? "Projet Web"
                    : props.principalProject.type === "graphism"
                    ? "Projet de graphisme"
                    : "Autre Projet"}{" "}
                  {""}-{" "}
                  {new Date(props.principalProject.createdAt).getFullYear()}
                </p>

                <Marquee
                  loop={0}
                  gradient={false}
                  speed={50}
                  direction="right"
                  className={styles.sectionthird__principalProject__marquee}
                >
                  {props.principalProject.keywords?.map((keyword, i) => (
                    <span
                      key={i}
                      style={{
                        color: props.principalProject.contrastedColor
                          ? props.principalProject.contrastedColor
                          : "white",
                      }}
                    >
                      {keyword.toUpperCase()}
                    </span>
                  ))}
                </Marquee>
                <Marquee
                  loop={0}
                  gradient={false}
                  speed={50}
                  direction="left"
                  className={styles.sectionthird__principalProject__marquee}
                >
                  {props.principalProject.keywords?.map((keyword, i) => (
                    <span
                      key={i}
                      style={{
                        color: props.principalProject.contrastedColor
                          ? props.principalProject.contrastedColor
                          : "white",
                      }}
                    >
                      {keyword.toUpperCase()}
                    </span>
                  ))}
                </Marquee>
              </div>
            </Link>
          </article>
        )}
        {props.featuredProjects &&
          props.featuredProjects.map((project, i) => (
            <article
              key={i}
              className={`${styles.sectionthird__featuredProject} ${styles.sectionthird__project}`}
            >
              <Link
                href={`/projects/${project.concatenatedName}`}
                title={`Voir le projet ${project.name}`}
                className={styles.sectionthird__project__link}
              >
                <div className={styles.sectionthird__featuredProject__content}>
                  <h3
                    style={{
                      color: project.contrastedColor
                        ? project.contrastedColor
                        : "white",
                    }}
                  >
                    {project.name}
                  </h3>
                  <p
                    style={{
                      color: project.contrastedColor
                        ? project.contrastedColor
                        : "white",
                    }}
                  >
                    {project.type === "video"
                      ? "Projet vidéo"
                      : project.type === "photo"
                      ? "Projet de photographie"
                      : project.type === "web"
                      ? "Projet Web"
                      : project.type === "graphism"
                      ? "Projet de graphisme"
                      : "Autre Projet"}{" "}
                    {""}- {new Date(project.createdAt).getFullYear()}
                  </p>
                </div>
                <div
                  className={styles.sectionthird__project__color}
                  style={{ backgroundColor: project.color }}
                ></div>
              </Link>
            </article>
          ))}
      </div>
    </>
  );
};

export const HomeSectionFourth = () => {
  return <></>;
};
