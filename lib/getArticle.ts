import axios from "axios";
import { Octokit } from "octokit";
import MarkdownToHTML from "./convert";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export default async function getArticle(path: string) {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "pierregueroult",
      repo: "projects-2023",
      path: path + ".md",
    }
  );

  if (!data) {
    return null;
  }

  // @ts-ignore 7017
  const content = await axios.get(data.download_url || "");

  if (!content || !content.data) {
    return null;
  }

  return await MarkdownToHTML(content.data);
}
