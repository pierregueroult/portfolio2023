import Layout from "@/components/Layout";

const titre = "Mes projets";
const description = `Retrouvez sur cette page tous les projets réalisés par Pierre Guéroult !`;

export default function About() {
  return (
    <Layout title={titre} description={description}>
      <section className="first-section">A-propos et informations</section>
    </Layout>
  );
}
