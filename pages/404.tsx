import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/error.module.scss";

const title = "404";
const description = "La page que vous cherchez n'existe pas !";

export default function Error() {
  return (
    <Layout title={title} description={description}>
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <h1 className={styles.errorCode}>404</h1>
          <p className={styles.errorText}>
            La page que vous demandez n&apos;existe pas !
          </p>
          <p className={styles.errorText}>
            <Link href={"/"} className={styles.errorLink}>
              Revenir à l&apos;accueil
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
