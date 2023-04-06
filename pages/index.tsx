import Layout from "@/components/Layout";
import { useEffect } from "react";
import styles from "@/styles/Home.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {
  HomeSectionFirst,
  HomeSectionSecond,
  HomeSectionThird,
  HomeSectionFourth,
} from "@/components/HomeSections";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";

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
  // // ? gsap scroll useeffect
  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     let sections = gsap.utils.toArray(".horizontalContainer > .horizontal");

  //     gsap.to(sections, {
  //       xPercent: -100 * (sections.length - 1),
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: ".horizontalContainer",
  //         pin: true,
  //         scrub: 0.7,
  //         end: "+=1300",
  //       },
  //     });
  //   }, document.body);
  //   return () => ctx.revert();
  // }, []);

  return (
    <Layout title={titre} description={description}>
      <section className={`${styles.section} ${styles.sectionfirst}`}>
        <HomeSectionFirst />
      </section>
      <section
        className={`${styles.section} ${styles.variant} ${styles.sectionsecond}`}
      >
        <HomeSectionSecond webProjects={props.webProjects} />
      </section>
      <section
        className={`${styles.section} horizontal ${styles.sectionthird}`}
      >
        <HomeSectionThird />
      </section>
      <section
        className={`${styles.section} ${styles.variant} ${styles.sectionforth} sectionforth`}
      >
        <HomeSectionFourth />
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
