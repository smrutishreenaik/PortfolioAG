import React from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Projects.module.scss";
import { Project } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
  const { data: projects, loading, error } = useCollection<Project>("projects");

  return (
    <section className={styles.projectsSection} id="projects">
      <Container>
        <motion.h2
          className="display-5 fw-bold mb-5 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Selected Works
        </motion.h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
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
                initial={{ opacity: 0, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.65 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={styles.projectCard}
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={styles.cardImg}
                  />
                )}
                <div className={styles.cardBody}>
                  <h3 className="h4 fw-bold mb-3">{project.title}</h3>
                  <p className="text-muted">{project.description}</p>
                  <div className="d-flex gap-2 flex-wrap mb-4">
                    {project.techStack?.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex gap-3 mt-auto">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm flex-grow-1 rounded-pill"
                      >
                        View Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-light btn-sm flex-grow-1 rounded-pill"
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
