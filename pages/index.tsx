import Layout from "@/components/Layout";
import { useEffect, useLayoutEffect } from "react";
import styles from "@/styles/Home.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ? title for next-seo
const titre = "Accueil";
const description = `Bienvenue sur mon portfolio | Je suis apprenti 
  développeur web, vous trouverez ici mes élements de portfolio ainsi
   que tous mes projets.`;

function Home() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      let sections = gsap.utils.toArray(".horizontalContainer > .horizontal");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontalContainer",
          pin: true,
          scrub: 0.5,
          end: "+=1500",
        },
      });
    }, document.body);
    return () => ctx.revert();
  }, []);
  return (
    <Layout title={titre} description={description}>
      <section className={styles.section}>
        <h1
          className={styles.sectionfirst__title}
          data-text={"pierre gueroult."}
        >
          pierre gueroult.
        </h1>
      </section>
      <div className={`${styles.horizontalContainer} horizontalContainer`}>
        <section className={`${styles.section} ${styles.variant} horizontal`}>
          Section 2 - Come from bottom
        </section>
        <section className={`${styles.section} horizontal`}>
          Section 3 - Come from right
        </section>
      </div>
      <section className={`${styles.section} ${styles.variant} horizontal`}>
        Section 4 - Come from bottom
      </section>
    </Layout>
  );
}

export default Home;
