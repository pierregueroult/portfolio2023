import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/ContactSuccess.module.scss";
import Link from "next/link";

const title = "Envoyé avec succès !";
const description =
  "Merci de nous avoir contacté ! Nous répondrons à votre demande dans les plus brefs délais.";

export default function Success() {
  const router = useRouter();
  const { email } = router.query;

  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <h1 className={styles.title}>Message envoyé avec succés !</h1>
        <p className={styles.text}>
          Merci de nous avoir contacté ! Je répondrai à votre demande dans les
          plus brefs délais à l&apos;email : <strong>{email}</strong>. Vous
          pouvez également me contacter sur les réseaux sociaux.
        </p>
        <Link href="/" className={styles.link}>
          Revenir à l&apos;accueil
        </Link>
      </div>
    </Layout>
  );
}
