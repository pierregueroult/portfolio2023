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
import getContrastedColor from "@/lib/getContrastedColor";

gsap.registerPlugin(ScrollTrigger);

// ? title for next-seo
const titre = "Accueil";
const description = `Bienvenue sur mon portfolio | Je suis apprenti 
  développeur web, vous trouverez ici mes élements de portfolio ainsi
   que tous mes projets.`;
const currentPrincipalProject = "konbinul";

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
  featuredProjects: HomeProject[];
  principalProject: HomeProject;
};

function Home(props: HomeProps) {
  // ? gsap scroll useeffect
  useEffect(() => {
    let ctx = gsap.context(() => {
      let sections = gsap.utils.toArray(".horizontalContainer > .horizontal");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontalContainer",
          pin: true,
          scrub: 0.7,
          end: "+=1300",
        },
      });
    }, document.body);
    return () => ctx.revert();
  }, []);

  return (
    <Layout title={titre} description={description}>
      <section className={`${styles.section} ${styles.sectionfirst}`}>
        <HomeSectionFirst />
      </section>
      <div className={`${styles.horizontalContainer} horizontalContainer`}>
        <section
          className={`${styles.section} ${styles.variant} horizontal ${styles.sectionsecond}`}
        >
          <HomeSectionSecond />
        </section>
        <section
          className={`${styles.section} horizontal ${styles.sectionthird}`}
        >
          <HomeSectionThird
            principalProject={props.principalProject}
            featuredProjects={props.featuredProjects}
          />
        </section>
      </div>
      <section className={`${styles.section} ${styles.variant} horizontal`}>
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
  const featuredProjects: projectType[] = await prisma.project.findMany({
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
      color: true,
      createdAt: true,
    },
  });
  const principalProject: projectType | null = await prisma.project.findUnique({
    where: {
      concatenatedName: currentPrincipalProject,
    },
    select: {
      concatenatedName: true,
      name: true,
      type: true,
      banner: true,
      color: true,
      createdAt: true,
      keywords: true,
    },
  });
  featuredProjects.forEach((element) => {
    element.contrastedColor = getContrastedColor(element.color);
  });
  return {
    props: {
      featuredProjects: makeSerializable(featuredProjects),
      principalProject: makeSerializable(principalProject),
    },
  };
};
