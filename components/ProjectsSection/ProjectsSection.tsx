import { ProjectsList } from "@/pages/projects";
import styles from "./ProjectsSection.module.scss";
import ProjectCard from "../ProjectCard/ProjectCard";

type Props = {
  projects: ProjectsList | [];
  type: "WEB" | "AUDIOVISUEL" | "GRAPHISME";
};

function ProjectsSection({ projects, type }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Mes derniers projets {type}s :</h2>
      <div className={styles.articlesContainer}>
        {projects.length === 0 ? (
          <h3 className={styles.errorText}>Aucun Project {type} trouvé ...</h3>
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
