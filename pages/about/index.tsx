import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect } from "react";
import styles from "@/styles/About.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const titre = "Mes projets";
const description = `Retrouvez sur cette page tous les projets réalisés par Pierre Guéroult !`;

type AboutProps = {
  resultSkills: resultType;
  types: string[];
  resultJobs: {
    link: string;
    name: string;
    company: string;
    beginAt: string;
    endAt: string | null;
  }[];
};

type resultType = {
  [key: string]: [
    { name: string; icon: string; color: string; category: string }
  ];
};

export default function About({ resultSkills, types, resultJobs }: AboutProps) {
  useEffect(() => {
    const setupScrollMagic = async () => {
      if (typeof window !== "undefined") {
        const container = document.querySelectorAll(
          `.${styles.skills__element}`
        );
        const titles = document.querySelectorAll(`.${styles.skills__subtitle}`);
        const title = document.querySelector(`.${styles.skills__title}`);
        const imageContainer = document.querySelector(
          `.${styles.about__imageContainer}`
        );
        const textContainer = document.querySelector(
          `.${styles.about__textContainer}`
        );
        const jobTitle = document.querySelector(`.${styles.jobs__title}`);
        const jobElements = document.querySelectorAll(
          `.${styles.jobs__element}`
        );

        const ScrollMagic = (await import("scrollmagic")).default;

        const controller = new ScrollMagic.Controller();

        for (let i = 0; i < container.length; i++) {
          const element = container[i];
          new ScrollMagic.Scene({
            triggerElement: element,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(element, styles.skills__element__active)
            .addTo(controller);
        }

        for (let j = 0; j < titles.length; j++) {
          const element = titles[j];
          new ScrollMagic.Scene({
            triggerElement: element,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(element, styles.skills__subtitle__active)
            .addTo(controller);
        }

        for (let i = 0; i < jobElements.length; i++) {
          const element = jobElements[i];
          new ScrollMagic.Scene({
            triggerElement: element,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(element, styles.jobs__element__active)
            .addTo(controller);
        }

        if (jobTitle !== null) {
          new ScrollMagic.Scene({
            triggerElement: jobTitle,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(jobTitle, styles.jobs__title__active)
            .addTo(controller);
        }

        if (title !== null) {
          new ScrollMagic.Scene({
            triggerElement: title,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(title, styles.skills__title__active)
            .addTo(controller);
        }

        if (imageContainer !== null) {
          new ScrollMagic.Scene({
            triggerElement: imageContainer,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(
              imageContainer,
              styles.about__imageContainer__active
            )
            .addTo(controller);
        }

        if (textContainer !== null) {
          new ScrollMagic.Scene({
            triggerElement: textContainer,
            offset: 50,
            triggerHook: 0.9,
            reverse: true,
          })
            .setClassToggle(textContainer, styles.about__textContainer__active)
            .addTo(controller);
        }
      }
    };
    setupScrollMagic();
  }, []);

  return (
    <Layout title={titre} description={description}>
      <section className={styles.about}>
        <div className={styles.about__textContainer}>
          <h2 className={styles.about__title}>Me, Myself and I</h2>
          <p className={styles.about__text}>
            Hello There ! Je m&apos;appelle Pierre Guéroult, mais vous pouvez
            m&apos;appeler Pierre. J&apos;ai 18 ans et je suis passionné par le
            dévellopement web depuis maintenant quelques années. Je suis
            actuellement dans une formation BUT Métiers du Multimédia et de
            l&apos;Internet, afin de devenir développeur web et vivre de ma
            passion !
          </p>
          <div className={styles.about__links}>
            <a
              href="https://data.pierregueroult.dev/documentations/CV_Pierre_Gueroult.pdf"
              className={styles.about__link}
              target={"_blank"}
              rel={"noreferrer"}
            >
              Mon Curriculum vitæ
            </a>
            <a
              href="https://www.linkedin.com/in/pierregueroult/"
              className={styles.about__link}
              target={"_blank"}
              rel={"noreferrer"}
            >
              Mon LinkedIn
            </a>
          </div>
        </div>
        <div className={styles.about__imageContainer}>
          <Image
            alt="Une photo de moi"
            src="https://data.pierregueroult.dev/avatars/pierregueroult.png"
            width={100}
            height={500}
            className={styles.about__image}
            unoptimized={true}
          />
        </div>
      </section>
      <section className={styles.skills}>
        <h2 className={styles.skills__title}>Compétences</h2>
        <div className={styles.skills__container}>
          {types.map((type, i) => (
            <article key={i} className={styles.skills__article}>
              <h3 className={styles.skills__subtitle}>{type}</h3>
              <ul className={`${styles.skills__list}`}>
                {resultSkills[type].map((skill, j) => (
                  <li
                    key={j}
                    className={`${styles.skills__element} skillElement`}
                  >
                    <div
                      className={styles.skills__imageContainer}
                      style={{
                        borderColor: skill.color,
                        backgroundColor: skill.color + "44",
                      }}
                    >
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        width={60}
                        height={60}
                        className={styles.skills__logo}
                      />
                    </div>
                    <p className={styles.skills__text}>{skill.name}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.jobs}>
        <h2 className={styles.jobs__title}>Expériences</h2>
        <ul className={`${styles.jobs__list}`}>
          {resultJobs.map((job, i) => (
            <li key={i} className={`${styles.jobs__element}`}>
              <p>
                <span className={styles.jobs__element__name}>{job.name}</span>
                <span className={styles.jobs__element__gap}>-</span>
                <span className={styles.jobs__element__company}>
                  {job.company}
                </span>
              </p>
              <div className={styles.jobs__element__container}>
                <p>
                  <span className={styles.jobs__element__date}>
                    {new Date(job.beginAt).toLocaleDateString("fr-FR", {})}
                  </span>
                  <span className={styles.jobs__element__gap}>-</span>
                  <span className={styles.jobs__element__date}>
                    {job.endAt === null
                      ? "Aujourd'hui"
                      : new Date(job.endAt).toLocaleDateString("fr-FR", {})}
                  </span>
                </p>
                <a
                  href={job.link}
                  className={styles.jobs__element__link}
                  title={`External Link to ${job.company}`}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const skills = await prisma.skills.findMany({
    select: {
      name: true,
      icon: true,
      color: true,
      category: true,
    },
  });

  const jobs = await prisma.jobs.findMany({
    select: {
      name: true,
      company: true,
      beginAt: true,
      endAt: true,
      link: true,
    },
  });

  var result: resultType = {};
  var types: string[] = [];

  var serializedSkills = makeSerializable(skills);
  var serializedJobs = makeSerializable(jobs);

  for (let index = 0; index < serializedSkills.length; index++) {
    const element = serializedSkills[index];

    if (element.category in result) {
      result[element.category].push(element);
    } else {
      result[element.category] = [element];
      types.push(element.category);
    }
  }

  return {
    props: {
      resultSkills: result,
      types: types,
      resultJobs: serializedJobs,
    },
  };
};
