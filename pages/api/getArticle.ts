import MarkdownToHTML from "@/lib/convert";
import { getAllUnpublished } from "@/lib/devto";
import { makeSerializable } from "@/lib/makeSerializable";
import { NextApiRequest, NextApiResponse } from "next";

type devtoArticle = {
  id: number;
  body_markdown: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await getAllUnpublished();
    const query = req.query as { id: string };

    if (query.id === undefined) {
      res.json({ error: "wrong parameters" });
      return;
    }

    const resArticle = data.find(
      (article: devtoArticle) => article.id === Number(query.id)
    );

    var html;

    if (resArticle?.body_markdown !== undefined) {
      html = await MarkdownToHTML(resArticle.body_markdown);
      res.json({ articleContent: html });
    } else {
      res.json({ error: "wrong parameters" });
    }
  } else {
    res.json({ error: "wrong parameters" });
  }
}
