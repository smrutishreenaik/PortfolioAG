import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./Projects.module.scss";
import useProjectModal, { ProjectModalData } from "../../hooks/useProjectModal";
import useProjects from "../../hooks/useProjects";
import ProjectModal from "../ui/ProjectModal";

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ProjectImage: React.FC<{ project: ProjectModalData }> = ({ project }) => {
  const image = project.media.find((item) => item.type === "image");

  if (image) {
    return (
      <img
        className={styles.projImage}
        src={image.url}
        alt={image.caption ?? `${project.title} screenshot`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={styles.projImageFallback}>
      <span>{project.title}</span>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: ProjectModalData;
  index: number;
  onOpen: (project: ProjectModalData) => void;
}> = ({ project, index, onOpen }) => (
  <div
    className={styles.projCard}
    onClick={() => onOpen(project)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    aria-label={`View ${project.title} details`}
    style={{ transitionDelay: `${index * 0.08}s` }}
  >
    <div className={styles.projImg}>
      <ProjectImage project={project} />
    </div>
    <div className={styles.projBody}>
      <div className={styles.projType}>{project.type}</div>
      <div className={styles.projTitle}>{project.title}</div>
      <div className={styles.projLabel}>What changed</div>
      <div className={styles.projText}>{project.description}</div>
      <div className={`${styles.projLabel} ${styles.green}`}>Outcome</div>
      <div className={styles.projText}>{project.outcome}</div>
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardGithubLink}
          onClick={(e) => e.stopPropagation()}
          aria-label={`View ${project.title} source on GitHub`}
        >
          <GitHubIcon /> GitHub
        </a>
      )}
    </div>
  </div>
);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const { activeProject, openModal, closeModal } = useProjectModal();
  const { projects } = useProjects();

  const dotCount = Math.max(projects.length, 1);
  const trackEnd =
    !isCompact && projects.length > 1 ? `-${(projects.length - 1) * 25}%` : "0%";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", trackEnd]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const syncLayout = () => setIsCompact(mediaQuery.matches);

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => mediaQuery.removeEventListener("change", syncLayout);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isCompact) return;
    const dot = Math.min(Math.floor(latest * dotCount), dotCount - 1);
    setActiveDot(Math.max(dot, 0));
  });

  return (
    <>
      <section id="projects" className={styles.projectsSection} ref={sectionRef}>
        <div className={styles.stickyOuter}>
          <div className={styles.headerWrap}>
            <div className={styles.sectionEyebrow}>Projects</div>
            <div className={styles.sectionTitle}>Real work I've built</div>
            <div className={styles.scrollHint}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Scroll to explore projects
            </div>
            <div className={styles.progressDots}>
              {projects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className={`${styles.projDot} ${activeDot === index ? styles.active : ""}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.trackWindow}>
            <motion.div className={styles.trackWrap} style={{ x: trackX }}>
              {projects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  index={index}
                  onOpen={openModal}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ProjectModal key={activeProject?.title ?? ""} project={activeProject} onClose={closeModal} />
    </>
  );
};

export default Projects;
