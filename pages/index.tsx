import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { footerTopics } from "@/lib/data";
import socialMedias from "@/lib/socialmedia";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import getContrastedColor from "@/lib/getContrastedColor";
import Marquee from "react-fast-marquee";

import image from "../src/images/bw1.jpg";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// ? title for next-seo
const titre = "Portfolio";
const description = `Bienvenue sur mon portfolio | Je suis apprenti 
  développeur web, vous trouverez ici mes élements de portfolio ainsi
   que tous mes projets.`;

// ? some typing
type Creation = {
  color: string;
  contrasted?: string;
  name: string;
  description: string;
  illustration: string;
  concatenatedName: string;
  asset: string | null;
};

interface Props {
  creations: Creation[];
}

function Home(props: Props) {
  const handleScrollButton = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: ".container",
      ease: "power2.out",
    });
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Pierre Guéroult - Portfolio",
        text: description,
        url: "https://pierregueroult.dev",
      });
    } else {
      alert("Votre navigateur ne supporte pas cette fonctionnalité");
    }
  };
  useEffect(() => {
    let ctx = gsap.context(() => {
      // ? sections animations
      let sections = gsap.utils.toArray(".container > section");
      let projectsSection: HTMLDivElement | null =
        document.querySelector(`.container`);

      // ? articles animations
      let articles = document.querySelectorAll(`.${styles.projects__article}`);
      let titles = document.querySelectorAll(
        `.${styles.projects__article__titles__title}`
      );
      let descriptions = document.querySelectorAll(
        `.${styles.projects__article__description}`
      );
      let images = document.querySelectorAll(
        `.${styles.projects__article__image}`
      );
      let assets = document.querySelectorAll(
        `.${styles.projects__article__button}`
      );

      // ? main animation
      var tween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          scrub: 0.8,
          end: () => "+=1800",
        },
      });
      // ? projects section animation
      articles.forEach((article, i) => {
        if (projectsSection === null) return;

        // ? background color const
        const color = article.getAttribute("data-color");
        const preColor =
          i === 0 ? "#132c76" : articles[i - 1].getAttribute("data-color");

        // ? text color const
        const contrasted = article.getAttribute("data-contrasted");
        const preContrasted =
          i === 0 ? "#fff" : articles[i - 1].getAttribute("data-contrasted");

        if (color !== null && preColor !== null) {
          gsap.fromTo(
            projectsSection,
            {
              backgroundColor: preColor,
              "--text-color": preContrasted,
              "--background-color": preColor,
              immediateRender: false,
            },
            {
              backgroundColor: color,
              "--text-color": contrasted,
              "--background-color": color,
              immediateRender: false,
              scrollTrigger: {
                trigger: article,
                start: i !== 0 ? "top 80%" : "40% bottom",
                end: i !== 0 ? "+=80%" : "+=60%",
                containerAnimation: i !== 0 ? tween : undefined,
                // containerAnimation: tween,
                scrub: true,
              },
            }
          );
        }
      });
      // ? articles animations
      let tl = gsap.timeline();

      for (let i = 0; i < articles.length; i++) {
        tl.fromTo(
          titles[i],
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            ease: "linear",
            scrollTrigger: {
              trigger: articles[i],
              start: "top 60%",
              end: "+=300",
              scrub: 1,
              containerAnimation: i !== 0 ? tween : undefined,
            },
          }
        );
        tl.fromTo(
          descriptions[i],
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            ease: "linear",
            scrollTrigger: {
              trigger: articles[i],
              start: "top 40%",
              end: "+=300",
              scrub: 1,
              containerAnimation: i !== 0 ? tween : undefined,
            },
          }
        );
        tl.fromTo(
          images[i],
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            ease: "linear",
            scrollTrigger: {
              trigger: articles[i],
              start: "top 40%",
              end: "+=300",
              scrub: 1,
              containerAnimation: i !== 0 ? tween : undefined,
            },
          }
        );
        tl.fromTo(
          assets[i],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "linear",
            scrollTrigger: {
              trigger: articles[i],
              start: "top 40%",
              end: "+=300",
              scrub: 1,
              containerAnimation: i !== 0 ? tween : undefined,
            },
          }
        );
      }

      ScrollTrigger.batch(".topics > li", {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, stagger: 0.1 }),
        onLeave: (batch) => gsap.set(batch, { opacity: 0, stagger: 0.1 }),
        onEnterBack: (batch) => gsap.to(batch, { opacity: 1, stagger: 0.1 }),
        onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, stagger: 0.1 }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Layout title={titre} description={description}>
      <section className={styles.introduction}>
        <div className={styles.introduction__content}>
          <h1>Portfolio 2023</h1>
          <p>
            Développeur web full stack, étudiant en 1ère année de BUT Métiers du
            Multimédia et de l&apos;Internet à l&apos;IUT de Elbeuf.
          </p>
          <div className={styles.introduction__content__buttons}>
            <button onClick={handleScrollButton} className="hovered">
              Défiler pour voir mes créations
            </button>
          </div>
        </div>
        <Image
          src={image}
          alt="Pierre Guéroult"
          width={1000}
          height={750}
          className={styles.introduction__image}
          quality={100}
        />
        <Cursor />
        <Marquee
          gradient={false}
          speed={100}
          direction="left"
          loop={0}
          delay={0}
          play={true}
          className={styles.introduction__marquee}
        >
          <h2 className={styles.introduction__title}>
            May the code be with you - Bringing the force of creativity and
            interactivity to the web galaxy
          </h2>
        </Marquee>
      </section>
      <div className={styles.container + " container"}>
        {props.creations.map((creation, index) => (
          <Creation key={index} creation={creation} />
        ))}
      </div>
      <section className={styles.contact}>
        <div className={styles.contact__content}>
          <div className={styles.contact__content__topics}>
            <h3>Pour parler de : </h3>
            <ul className="topics">
              {footerTopics.map((topic, i) => (
                <li key={i}>
                  <p>{topic}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.contact__content__form}>
            <h3>Me contacter :</h3>
            <form method="GET" action="/contact/success">
              <div className={styles.contact__content__form__container}>
                <div className={styles.contact__content__form__input}>
                  <input type="text" name="name" id="name" required />
                  <label htmlFor="name">Nom</label>
                </div>
                <div className={styles.contact__content__form__input}>
                  <input type="email" name="email" id="email" required />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div
                className={`${styles.contact__content__form__input} ${styles.contact__content__form__input__variant}`}
              >
                <textarea name="message" id="message" required />
                <label htmlFor="message">Message</label>
              </div>
              <button type="submit">Envoyer</button>
            </form>
            <div className={styles.contact__content__form__socials}>
              <ul className={styles.contact__content__socialMedias}>
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
                <li>
                  <button onClick={handleShare} aria-label="Partager le site">
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Creation = ({ creation }: { creation: Creation }) => {
  return (
    <section
      className={styles.projects__article}
      data-color={creation.color}
      data-contrasted={creation.contrasted}
    >
      <div className={styles.projects__article__titles}>
        <Link href={`/projects/${creation.concatenatedName}`}>
          <h3 className={styles.projects__article__titles__title}>
            SITE WEB
            <br />
            <span className={styles.projects__article__titles__title__variant}>
              {creation.name.toUpperCase()}
            </span>
          </h3>
        </Link>
      </div>
      <div className={styles.projects__article__image}>
        <Link href={`/projects/${creation.concatenatedName}`}>
          {creation.illustration.endsWith(".mp4") ? (
            <video
              src={creation.illustration}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={creation.illustration}
              alt={creation.name}
              width={500}
              height={500}
            />
          )}
        </Link>
      </div>
      <div className={styles.projects__article__description}>
        <p>{creation.description}</p>
      </div>
      {creation.asset && (
        <div className={styles.projects__article__button}>
          <a
            className={styles.projects__article__button__link}
            href={creation.asset}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le site
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      )}
    </section>
  );
};

const Cursor = () => {
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      gsap.to(`.${styles.introduction__cursor}`, {
        x: e.clientX,
        y: e.clientY,
        ease: "none",
        duration: 0.1,
      });
      gsap.to(`.${styles.introduction__follower}`, {
        x: e.clientX,
        y: e.clientY,
        delay: 0.1,
        duration: 0.2,
      });

      const hovered = document.querySelector(".hovered");

      if (hovered) {
        hovered.addEventListener("mouseenter", () => {
          gsap.fromTo(
            `.${styles.introduction__cursor}`,
            {
              scale: 1,
            },
            {
              scale: 2,
              duration: 1,
              ease: "power2.out",
            }
          );
        });
        hovered.addEventListener("mouseleave", () => {
          gsap.fromTo(
            `.${styles.introduction__cursor}`,
            {
              scale: 2,
            },
            {
              scale: 1,
              duration: 1,
              ease: "power2.out",
            }
          );
        });
      }
    };

    window.addEventListener("pointermove", updateCursor);

    return () => window.removeEventListener("pointermove", updateCursor);
  }, []);

  return (
    <>
      <div className={styles.introduction__cursor}>
        <div className={styles.introduction__cursor__inner}></div>
      </div>
      <div className={styles.introduction__follower}></div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const creations: Creation[] = await prisma.project.findMany({
    where: {
      type: "web",
      visible: true,
    },
    select: {
      color: true,
      name: true,
      description: true,
      illustration: true,
      concatenatedName: true,
      asset: true,
    },
    take: 5,
  });

  creations.forEach((creation) => {
    creation.contrasted = getContrastedColor(creation.color);
  });

  return {
    props: {
      creations,
    },
  };
};
