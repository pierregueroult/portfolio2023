import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { makeSerializable } from "@/lib/makeSerializable";
import MarkdownToHTML from "@/lib/convert";

export type ContentType = {
  data: { content: string; image: { url: string; alt: string }[] }[];
  conclusion: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the id from the query
  const { id } = req.query;

  // Check if the id is valid
  if (id === undefined) {
    res.json({
      error: "wrong parameters",
    });
    return;
  }

  // Get the project content
  var data;

  // Try to get the project content
  try {
    // Get the project content
    data = await prisma.project.findUnique({
      where: { id: id as string },
      select: {
        content: true,
      },
    });
  } catch (error) {
    // If error happens, return error
    res.json({
      error: "project not found",
    });
  }

  // If the project content is not found, return error
  if (data === null || data === undefined) {
    res.json({
      error: "project not found",
    });
    return;
  }

  if (data.content === null || data.content === undefined) {
    res.json({
      error: "project content not found",
    });
    return;
  }

  // Get the content
  const { content } = data;

  // Make the data serializable
  var serializedContent = makeSerializable(content as ContentType);

  // Convert the markdown content to html
  for (let index = 0; index < serializedContent.data.length; index++) {
    const element = serializedContent.data[index];
    element.content = await MarkdownToHTML(element.content);
  }

  // Convert the markdown conclusion to html
  serializedContent.conclusion = await MarkdownToHTML(
    serializedContent.conclusion
  );

  res.json(serializedContent);
}
