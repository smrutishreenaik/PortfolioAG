import React, { useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Projects.module.scss";
import { Project } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const Projects: React.FC = () => {
  const { data: projects, loading, error } = useCollection<Project>("projects");

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className={styles.projectsSection} id="projects" ref={sectionRef}>
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured <span>Projects</span>
        </motion.h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "#7c3aed" }} />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load projects: {error}
          </p>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={styles.cardImg}
                  />
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>
                    {project.description}
                  </p>
                  <div className={styles.techWrap}>
                    {project.techStack?.map((tech: string, idx: number) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardActions}>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnLive}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnGithub}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Projects;
