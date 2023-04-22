"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import { Fragment } from "react";
import styles from "@/styles/error.module.scss";
import Marquee from "react-fast-marquee";
import Draggable from "react-draggable";

const title = "404";
const description = "La page que vous cherchez n'existe pas !";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Error() {
  const messages: Array<any> = [
    <Fragment key={1}>
      <span className={styles.red}>Happiness</span>
      <span className={styles.white}>.</span>
      <span className={styles.pink}>find</span>
      <span className={styles.green}>{`()`}</span>
    </Fragment>,
    <Fragment key={2}>
      <span className={styles.red}>while</span>
      <span className={styles.blue}>{"("}</span>
      <span className={styles.red}> !</span>
      <span className={styles.white}>success </span>
      <span className={styles.blue}>{")"}</span>
      <span className={styles.blue}>{"{"}</span>
      <br />
      <span className={styles.margin}></span>
      <span className={styles.pink}> tryAgain</span>
      <span className={styles.green}>{"()"}</span>
      <span className={styles.white}>{"; "}</span>
      <br />
      <span className={styles.blue}>{"}"}</span>
    </Fragment>,
    <Fragment key={3}>
      <span className={styles.pink}>SELECT </span>
      <span className={styles.white}>* </span>
      <span className={styles.pink}>FROM </span>
      <span className={styles.white}>people </span>
      <span className={styles.pink}>WHERE </span>
      <span className={styles.white}>attitude</span>
      <span className={styles.lightblue}> = </span>
      <span className={styles.green}>{"'good' "}</span>
      <span className={styles.white}>{";"}</span>
    </Fragment>,
    <Fragment key={4}>
      <span className={styles.pink}>SELECT </span>
      <span className={styles.white}>name </span>
      <span className={styles.pink}>FROM </span>
      <span className={styles.white}>friends </span>
      <span className={styles.pink}>WHERE </span>
      <span className={styles.white}>type </span>
      <span className={styles.lightblue}>= </span>
      <span className={styles.green}>{"'true' "}</span>
      <span className={styles.white}>{";"}</span>
    </Fragment>,
    <Fragment key={5}>
      <span className={styles.red}>if</span>
      <span className={styles.blue}>{"("}</span>
      <span className={styles.pink}> itIsHard</span>
      <span className={styles.green}>{"() "}</span>
      <span className={styles.blue}>{") "}</span>
      <span className={styles.blue}>{"{"}</span>
      <br />
      <span className={styles.margin}></span>
      <span className={styles.pink}> workHarder</span>
      <span className={styles.green}>{"() "}</span>
      <span className={styles.white}>{"; "}</span>
      <br />
      <span className={styles.blue}>{"}"}</span>
    </Fragment>,
    <Fragment key={6}>
      <span className={styles.pink}>export default</span>
      <span className={styles.blue}> Kindness</span>
      <span className={styles.green}>;</span>
    </Fragment>,
  ];

  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>404</h1>
          <h2>Page Introuvable</h2>
          <Link href="/">Retour à l&apos;accueil</Link>
          <p>Les morceaux de code sont déplaçables</p>
        </div>
        <div className={styles.marquee}>
          <Marquee
            gradient={false}
            speed={150}
            direction="right"
            loop={0}
            delay={0}
            play={true}
          >
            <span>404</span>
            <span>Page Introuvable</span>
          </Marquee>
        </div>
        {messages.map((message, index) => {
          return (
            <Draggable key={index}>
              <pre
                key={index}
                className={styles.message}
                style={
                  index % 2 === 0
                    ? {
                        top: `${randomIntFromInterval(
                          index * 8,
                          (index + 1) * 8
                        )}vh`,
                        left: `${randomIntFromInterval(1, 18)}vw`,
                      }
                    : {
                        top: `${randomIntFromInterval(
                          index * 8,
                          (index + 1) * 8
                        )}vh`,
                        right: `${randomIntFromInterval(1, 18)}vw`,
                      }
                }
              >
                <code>{message}</code>
              </pre>
            </Draggable>
          );
        })}
      </div>
    </Layout>
  );
}
