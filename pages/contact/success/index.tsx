import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/ContactSuccess.module.scss";
import Link from "next/link";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

const title = "Envoyé avec succès !";
const description =
  "Merci de nous avoir contacté ! Nous répondrons à votre demande dans les plus brefs délais.";

type Props = {
  name: string;
  email: string;
};

export default function Success(props: Props) {
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <h1 className={styles.title}>Message envoyé avec succés !</h1>
        <p className={styles.text}>
          Merci de m&apos;avoir contacté <strong>{props.name}</strong> ! Je
          répondrai à votre demande dans les plus brefs délais à l&apos;email :{" "}
          <strong>{props.email}</strong>. Vous pouvez également me contacter sur
          les réseaux sociaux.
        </p>
        <Link href="/" className={styles.link}>
          Revenir à l&apos;accueil
        </Link>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name, email, message } = context.query;

  if (!email || !message || !name) {
    return {
      redirect: {
        destination: "/contact",
        permanent: false,
      },
    };
  }

  try {
    await prisma.message.create({
      data: {
        name: name as string,
        email: email as string,
        message: message as string,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/contact",
        permanent: false,
      },
    };
  }
  return {
    props: {
      name,
      email,
    },
  };
};
