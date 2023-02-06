import rehypeFormat from "rehype-format";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";

export default async function MarkdownToHTML(markdown: string) {
  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  const file = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeHighlight)
    .process(content.value);

  return String(file);
}
