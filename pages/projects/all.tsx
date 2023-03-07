import Layout from "@/components/Layout";
import styles from "@/styles/ProjectAll.module.scss";

const titre = "Tous mes projects";
const description =
  "Retrouvez sur cette page tout les projects de Pierre Gueroult présents dans la base de donnéees !";

const AllProjects = (): JSX.Element => {
  return (
    <Layout title={titre} description={description}>
      <section>
        <h1>Tous les projets</h1>
      </section>
    </Layout>
  );
};

export default AllProjects;
