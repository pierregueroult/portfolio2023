// ! This component is used in the projects page

// ? import modules
import Link from "next/link";

// ? import dependencies
import { Project } from "@/pages/projects";
import styles from "./ProjectBanner.module.scss";

type Props = {
  project: Project;
};

export default function ProjectBanner({ project }: Props): JSX.Element {
  return (
    <article className={styles.line}>
      <Link href={`/projects/${project.linkName}`}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url("${project.brefIllustration}")` }}
        >
          <div className={styles.content}>
            <h2 className={styles.title}>{project.name}</h2>
            <ul className={styles.list}>
              {project.keyWords.map((keyword, i) => (
                <li key={i} className={styles.listEl}>
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}
