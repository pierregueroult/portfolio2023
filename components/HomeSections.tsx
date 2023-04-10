import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { footerTopics } from "@/lib/data";

import { HomeProject } from "@/pages";
import socialMedias from "@/lib/socialmedia";

gsap.registerPlugin(ScrollTrigger);

export const HomeSectionFirst = () => {
  return <></>;
};

export const HomeSectionSecond = (props: { webProjects: HomeProject[] }) => {
  useEffect(() => {
    ScrollTrigger.saveStyles(
      `.${styles.sectionsecond__title}, .${styles.sectionsecond__title} > span`
    );
    ScrollTrigger.matchMedia({
      "(max-width: 768px)": function () {
        let mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: `.${styles.sectionsecond__title}`,
            start: "-100% bottom",
            scrub: 1,
          },
        });

        mobileTl.to(`.${styles.sectionsecond__title}`, {
          duration: 2,
          xPercent: -40,
          color: "#fff",
        });
      },
      "(min-width: 769px)": function () {
        let desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: `.${styles.sectionsecond__title}`,
            start: "-40% bottom",
            scrub: 1,
          },
        });

        desktopTl.to(`.${styles.sectionsecond__title}`, {
          duration: 2,
          xPercent: -40,
          color: "#fff",
        });
      },
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    const current = document.querySelector(
      `.${styles.sectionsecond__content} > div[data-index="${index}"]`
    );
    const others = document.querySelectorAll(
      `.${styles.sectionsecond__content} > div:not([data-index="${index}"])`
    );

    if (current) {
      current.classList.add(styles.sectionsecond__content__image__active);
      current.classList.remove(styles.sectionsecond__content__image__inactive);
    }
    others.forEach((other) => {
      other.classList.add(styles.sectionsecond__content__image__inactive);
      other.classList.remove(styles.sectionsecond__content__image__active);
    });
  };

  return (
    <>
      <h2 className={styles.sectionsecond__title}>
        <span>mes créations</span>
        <span>mes créations</span>
        <span>mes créations</span>
      </h2>
      <div className={styles.sectionsecond__content}>
        {props.webProjects.map((project, index) => (
          <div
            key={index}
            className={styles.sectionsecond__content__image}
            data-index={index}
            style={{
              backgroundImage: `url(${project.banner})`,
            }}
          ></div>
        ))}
        <ul className={styles.sectionsecond__content__list}>
          {props.webProjects.map((project, index) => (
            <li
              key={index}
              className={styles.sectionsecond__content__text}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Link
                href={`/projects/${project.concatenatedName}`}
                className={styles.sectionsecond__content__text__link}
                title={`Voir ${project.name}`}
                style={{ color: project.color }}
              >
                <h3 className={styles.sectionsecond__content__text__title}>
                  {project.name}
                </h3>
                <p>{project.type === "web" && "Site web complet"}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/projects"
          className={styles.sectionsecond__content__link}
          title="Voir tous mes projets"
        >
          Voir plus de projets
        </Link>
      </div>
    </>
  );
};

export const HomeSectionThird = () => {
  return <></>;
};

export const HomeSectionFourth = () => {
  useEffect(() => {
    gsap.fromTo(
      `.sectionforth > h2`,
      {
        x: -300,
      },
      {
        x: 0,
        scrollTrigger: {
          trigger: `.sectionforth > h2`,
          scrub: 1,
          end: "bottom bottom",
        },
      }
    );

    ScrollTrigger.batch(`.${styles.sectionforth__content__topics} > ul > li`, {
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, opacity: 1, stagger: 0.2 }),
    });
  }, []);

  return (
    <>
      <h2 className={styles.sectionforth__title}>
        <span data-effect="M">M</span>
        <span data-effect="E">E</span> <span data-effect="C">C</span>
        <span data-effect="O">O</span>
        <span data-effect="N">N</span>
        <span data-effect="T">T</span>
        <span data-effect="A">A</span>
        <span data-effect="C">C</span>
        <span data-effect="T">T</span>
        <span data-effect="E">E</span>
        <span data-effect="R">R</span>
      </h2>
      <div className={styles.sectionforth__content}>
        <div className={styles.sectionforth__content__topics}>
          <h3>Pour parler de : </h3>
          <ul>
            {footerTopics.map((topic, i) => (
              <li key={i}>
                <p>{topic}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sectionforth__content__form}>
          <h3>Me contacter :</h3>
          <form method="GET" action="/contact/success">
            <div className={styles.sectionforth__content__form__container}>
              <div className={styles.sectionforth__content__form__input}>
                <input type="text" name="name" id="name" required />
                <label htmlFor="name">Nom</label>
              </div>
              <div className={styles.sectionforth__content__form__input}>
                <input type="email" name="email" id="email" required />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div
              className={`${styles.sectionforth__content__form__input} ${styles.sectionforth__content__form__input__variant}`}
            >
              <textarea name="message" id="message" required />
              <label htmlFor="message">Message</label>
            </div>
            <button type="submit">Envoyer</button>
          </form>
          <div className={styles.sectionforth__content__form__socials}>
            <ul className={styles.sectionforth__content__socialMedias}>
              {socialMedias.map(({ Icon, url, name }, i) => (
                <li key={i}>
                  <a
                    href={url}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
