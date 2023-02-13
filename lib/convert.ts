// ! This file is used to convert markdown to html

// ? import modules
import rehypeFormat from "rehype-format";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";

export default async function MarkdownToHTML(markdown: string) {
  // ? convert markdown to html
  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  // ? add syntax highlighting for code blocks
  const file = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeHighlight)
    .process(content.value);

  // ? convert file to string and return
  return String(file);
}
