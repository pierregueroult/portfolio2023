import { NextApiRequest, NextApiResponse } from "next";

const featured = "darkenedmurder";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/makeSerializable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var data;

  //  Try to get the project content
  try {
    data = await prisma.project.findUnique({
      where: { concatenatedName: featured },
      select: {
        name: true,
        concatenatedName: true,
        banner: true,
      },
    });
  } catch (error) {
    res.json({
      error: "project not found",
    });
    return; // return to prevent the rest of the code from running
  }

  // If the project content is not found, return error
  if (data === null || data === undefined) {
    res.json({
      error: "project not found",
    });
    return; // return to prevent the rest of the code from running
  }

  // serialize the data and sent it
  res.json(makeSerializable(data));
  return;
}
