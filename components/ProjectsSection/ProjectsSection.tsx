import { useEffect } from "react";
import { ProjectsList } from "@/pages/projects";
import Image from "next/image";
import styles from "./ProjectsSection.module.scss";

type Props = {
  projects: ProjectsList | [];
  type: "WEB" | "AUDIOVISUEL" | "LOGO";
};

function ProjectsSection({ projects, type }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Mes derniers projets {type} :</h2>
      <div className={styles.articlesContainer}>
        {projects.length === 0 ? (
          <h4 className={styles.errorText}>Aucun Project {type} trouvé ...</h4>
        ) : (
          projects.map((project) => (
            <article key={project.id} className={styles.article}>
              <Image
                src={project.brefIllustration}
                alt={`${project.name} illustration`}
                fill
              />
              <div className={styles.articleContent}>
                <h5>{project.name}</h5>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
