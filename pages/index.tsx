import Layout from "@/components/Layout";
import { useEffect, useRef } from "react";
import styles from "@/styles/Home.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";
import Link from "next/link";
import socialMedias from "@/lib/socialmedia";
import { footerTopics } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// ? title for next-seo
const titre = "Accueil";
const description = `Bienvenue sur mon portfolio | Je suis apprenti 
  développeur web, vous trouverez ici mes élements de portfolio ainsi
   que tous mes projets.`;

// ? type for Home Component
export type HomeProject = {
  concatenatedName: string;
  name: string;
  type: string;
  banner: string;
  color: string;
  createdAt: string;
  contrastedColor?: string;
  keywords?: string[];
};
type HomeProps = {
  webProjects: HomeProject[];
};

function Home(props: HomeProps) {
  useEffect(() => {
    // ? section second title animation
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
            start: "100% bottom",
            scrub: 1,
          },
        });

        desktopTl.to(`.${styles.sectionsecond__title}`, {
          duration: 2,
          xPercent: -30,
          color: "#fff",
        });
      },
    });

    // ? section forth title animation
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

    // ? section third animation
  }, []);

  // ? section second content animation
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
    <Layout title={titre} description={description}>
      <section className={`${styles.section} ${styles.sectionfirst}`}></section>
      <section
        className={`${styles.section} ${styles.variant} ${styles.sectionthird}`}
      ></section>
      <section
        className={`${styles.section} horizontal ${styles.sectionsecond}`}
      >
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
      </section>
      <section
        className={`${styles.section} ${styles.variant} ${styles.sectionforth} sectionforth`}
      >
        <h2 className={styles.sectionforth__title}>ME CONTACTER</h2>
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
      </section>
    </Layout>
  );
}

export default Home;

type projectType = {
  concatenatedName: string;
  name: string;
  type: string;
  banner: string;
  color: string;
  createdAt: Date;
  contrastedColor?: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const webProjects = await prisma.project.findMany({
    where: {
      type: "web",
      visible: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      webProjects: makeSerializable(webProjects),
    },
  };
};
