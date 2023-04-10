import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";

const siteMap = () => {};

export default siteMap;

const generateSiteMap = (projects: { concatenatedName: string }[]): string => {
  return `<?xml version='1.0' encoding='UTF-8'?>
  <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
    <url>
      <loc>https://pierregueroult.dev</loc>
      <priority>1.0</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>https://pierregueroult.dev/about</loc>
      <priority>1.0</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>https://pierregueroult.dev/projects</loc>
      <priority>1.0</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>https://pierregueroult.dev/contact</loc>
      <priority>1.0</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>https://pierregueroult.dev/projects/all</loc>
      <priority>1.0</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${projects
      .map((project) => {
        return `
          <url>
            <loc>https://pierregueroult.dev/projects/${
              project.concatenatedName
            }</loc>
            <priority>0.8</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>
        `;
      })
      .join("")}
  </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const projects = await prisma.project.findMany({
    select: {
      concatenatedName: true,
    },
  });

  const sitemap = generateSiteMap(projects);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
