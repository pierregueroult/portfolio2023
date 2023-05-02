import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.json({ message: "Bien reçu, Bien reçu" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
