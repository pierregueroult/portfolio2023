import { ProjectsList } from "@/pages/projects";
import styles from "./ProjectsSection.module.scss";
import Link from "next/link";
import ProjectCard from "../ProjectCard/ProjectCard";

type Props = {
  projects: ProjectsList | [];
  type: "WEB" | "AUDIOVISUEL" | "LOGO";
};

function ProjectsSection({ projects, type }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Mes derniers projets {type}s :</h2>
      <div className={styles.articlesContainer}>
        {projects.length === 0 ? (
          <h4 className={styles.errorText}>Aucun Project {type} trouvé ...</h4>
        ) : (
          projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
