import Layout from "@/components/Layout";
import styles from "@/styles/Contact.module.scss";
import { footerTopics } from "@/lib/data";
import socialMedias from "@/lib/socialmedia";

const titre = "Me Contacter";
const description = `Sont présents sur cette page toutes les informations nécessaires pour contacter Pierre Guéroult.`;

export default function Contact(): JSX.Element {
  return (
    <Layout title={titre} description={description}>
      <section className={styles.section}>
        <h2 className={styles.title}>
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
        <div className={styles.content}>
          <div className={styles.content__topics}>
            <h3>Pour parler de : </h3>
            <ul>
              {footerTopics.map((topic, i) => (
                <li key={i}>
                  <p>{topic}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.content__form}>
            <h3>Me contacter :</h3>
            <form method="GET" action="/contact/success">
              <div className={styles.content__form__container}>
                <div className={styles.content__form__input}>
                  <input type="text" name="name" id="name" required />
                  <label htmlFor="name">Nom</label>
                </div>
                <div className={styles.content__form__input}>
                  <input type="email" name="email" id="email" required />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div
                className={`${styles.content__form__input} ${styles.content__form__input__variant}`}
              >
                <textarea name="message" id="message" required />
                <label htmlFor="message">Message</label>
              </div>
              <button type="submit">Envoyer</button>
            </form>
            <div className={styles.content__form__socials}>
              <ul className={styles.content__socialMedias}>
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
