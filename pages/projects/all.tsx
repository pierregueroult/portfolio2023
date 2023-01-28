import Layout from "@/components/Layout";

const titre = "Tous mes projects";
const description =
  "Retrouvez sur cette page tout les projects de Pierre Gueroult présents dans la base de donnéees !";

export default function AllProjects(): JSX.Element {
  return (
    <Layout title="titre" description={description}>
      <section>oui</section>
    </Layout>
  );
}
