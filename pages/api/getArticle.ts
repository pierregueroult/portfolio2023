import getArticle from "@/lib/getArticle";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.json({ error: "wrong method" });
    return;
  }

  const { path } = req.query as { path: string };

  if (!path || path.length === 0) {
    res.json({ error: "wrong parameters" });
    return;
  }

  const data = await getArticle(path);

  if (!data || data.length === 0 || data === null || data === undefined) {
    res.json({ error: "wrong path" });
    return;
  }
  res.json(data);
}
