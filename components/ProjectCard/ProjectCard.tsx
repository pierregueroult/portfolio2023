import { Project } from "@/pages/projects";
import Link from "next/link";
import styles from "./ProjectCard.module.scss";

type Props = {
  project: Project;
};
function ProjectCard({ project }: Props): JSX.Element {
  return (
    <Link href={`/projects/${project.linkName}`}>
      <article className={styles.article}>
        <div className={styles.articleContent}>
          <h4 className={styles.articleTitle}>{project.name}</h4>
          <p className={styles.articleText}>{project.shortDescription}</p>
          <ul className={styles.articleKeywords}>
            {project.keyWords.map((keyword, i) => (
              <li key={i} className={styles.articleKeyword}>
                #{keyword}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}

export default ProjectCard;
