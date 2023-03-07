import Layout from "@/components/Layout";

const titre = "Me Contacter";
const description = `Sont présents sur cette page toutes les informations nécessaires pour contacter Pierre Guéroult.`;

export default function Contact(): JSX.Element {
  return (
    <Layout title={titre} description={description}>
      <section>contact</section>
    </Layout>
  );
}
