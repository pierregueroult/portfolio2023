import Layout from "@/components/Layout";
import { makeSerializable } from "@/lib/makeSerializable";
import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/About.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@readyplayerme/visage";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titre = "À Propos de moi";
const description = `Qui est Pierre Guéroult ? Découvrez tout sur moi sur cette page !`;

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
  const [animations, setAnimations] = useState<Array<string>>([
    "/3d/hiphop.glb",
    "/3d/silly.glb",
    "/3d/idle.glb",
    "/3d/guitar.glb",
    // "/3d/run.glb",
  ]);

  const handleEgg = () => {
    setAnimations(["/3d/twerk.glb"]);
  };

  useEffect(() => {
    // ! Animations for the skill section
    const elements = document.querySelectorAll(
      `.${styles.skills__element}, .${styles.skills__subtitle}, .${styles.skills__title}`
    );

    ScrollTrigger.batch(elements, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
        }),
      onLeave: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          x: -20,
          stagger: 0.1,
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
        }),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          x: -20,
          stagger: 0.1,
        }),
      start: "top 90%",
      end: "bottom 10%",
    });

    // ! Animations for the job section

    const elementsJob = document.querySelectorAll(
      `.${styles.jobs__element}, .${styles.jobs__title}`
    );

    ScrollTrigger.batch(elementsJob, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
        }),
      onLeave: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          x: -20,
          stagger: 0.1,
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
        }),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0,
          x: -20,
          stagger: 0.1,
        }),
      start: "top 90%",
      end: "bottom 10%",
    });
  }, []);

  return (
    <Layout title={titre} description={description}>
      <section className={styles.about}>
        <h2 className={styles.about__title}>Me, Myself and I</h2>
        <div className={styles.about__textContainer}>
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
          <Avatar
            modelSrc={
              "https://data.pierregueroult.dev/avatars/pierregueroult.glb"
            }
            animationSrc={
              animations[Math.floor(Math.random() * animations.length)]
            }
            className={styles.about__image}
            scale={0.26}
            cameraTarget={0.23}
            cameraInitialDistance={0.2}
          />
        </div>
      </section>
      <section className={styles.skills}>
        <h2 className={styles.skills__title}>
          C
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 611"
            onClick={handleEgg}
            aria-label="O"
          >
            <g transform="translate(-277.14275,-3.3922404)">
              <path
                d="M 577.14274,3.3922404 L 521.39108,65.279638 C 540.93548,93.300637 548.23908,126.99884 548.23908,143.92364 C 531.63848,114.64924 513.40228,106.19644 495.4463,94.089837 L 459.53476,133.95704 C 508.37198,150.90044 538.2723,208.70783 538.2723,268.50843 C 538.27232,297.41203 528.30552,366.18303 459.53476,363.19283 L 459.53476,362.91263 C 408.80909,356.90943 361.16789,297.96483 356.87697,233.62483 C 352.59883,169.47623 379.80055,107.04664 424.65105,55.219439 L 424.49531,55.219439 C 342.48137,104.01184 285.56993,191.00623 278.01483,292.27303 C 277.82969,294.75463 277.67315,297.25003 277.54765,299.74803 C 277.54497,299.80003 277.55029,299.85183 277.54765,299.90383 C 277.42181,302.43343 277.30011,304.98903 277.23619,307.53463 C 277.16989,310.12723 277.14275,312.74383 277.14275,315.35223 C 277.14275,480.95242 411.54271,615.35222 577.14274,615.35222 C 742.74275,615.35222 877.14275,480.95242 877.14275,315.35223 C 877.14275,307.58983 876.85055,299.88783 876.27055,292.27303 C 868.71555,191.00623 811.80415,104.01184 729.79015,55.219439 L 729.63435,55.219439 C 774.48495,107.04664 801.68655,169.47623 797.40855,233.62483 C 793.11755,297.96483 745.47635,356.90943 694.75076,362.91263 L 694.75076,363.19283 C 625.97996,366.18303 616.01316,297.41203 616.01316,268.50843 C 616.01316,208.70783 645.91356,150.90044 694.75076,133.95704 L 658.83916,94.089837 C 640.88316,106.19644 622.64696,114.64924 606.04636,143.92364 C 606.04636,126.99884 613.34996,93.300637 632.89436,65.279638 L 577.14274,3.3922404 z "
                style={{
                  fill: "#ffffff",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "none",
                }}
              />
            </g>
          </svg>
          mpétences
        </h2>
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

export const getStaticProps: GetStaticProps = async () => {
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
