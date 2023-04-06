import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.redirect("/");
    return;
  }

  const { name, email, message } = req.body;

  console.log(name, email, message);

  if (name === undefined || email === undefined || message === undefined) {
    res.redirect("/");
    return;
  }

  try {
    await prisma.message.create({
      data: {
        name: name,
        email: email,
        message: message,
      },
    });
    res.redirect(`/contact/success/${email}`);

    return;
  } catch (e: any) {
    console.log(e);
    res.redirect("/");
    return;
  }
}
