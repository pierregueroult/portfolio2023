import Layout from "@/components/Layout";
import MarkdownToHTML from "@/lib/convert";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "@/styles/Legals.module.scss";

const Legals = ({ content }: { content: string }) => {
  return (
    <Layout title="" description="">
      <section
        className={styles.legals}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { file } = context.params as { file: string };

  const res = await axios.get(
    "https://data.pierregueroult.dev/legals/" + file + ".md"
  );

  const content = await MarkdownToHTML(res.data);

  return {
    props: {
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          file: "termsofuse",
        },
      },
      {
        params: {
          file: "privacypolicy",
        },
      },
    ],
    fallback: false,
  };
};

export default Legals;
