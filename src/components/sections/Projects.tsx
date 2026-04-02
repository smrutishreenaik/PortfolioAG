import React, { useRef } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Projects.module.scss";
import { Project } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const Projects: React.FC = () => {
  const { data: projects, loading, error } = useCollection<Project>("projects");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Translate the track horizontally equal to its own width minus viewport width
  const trackXProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const trackX = useTransform(
    trackXProgress,
    (val) => `calc(-${val}% + ${val}vw)`,
  );

  const numProjectsStr = projects?.length
    ? projects.length < 10
      ? `0${projects.length}`
      : `${projects.length}`
    : "00";

  return (
    <section className={styles.projectsSection} id="projects" ref={sectionRef}>
      <div className={styles.stickyContainer}>
        <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

        <div className={styles.headerRow}>
          <div className={styles.titleContainer}>
            <div className={styles.tagline}>
              <span className={styles.taglineLine}></span>
              SELECTED WORK
            </div>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              FEATURED
              <br />
              PROJECTS
            </motion.h2>
          </div>
          <div className={styles.projectsCount}>{numProjectsStr} PROJECTS</div>
        </div>

        {loading ? (
          <div className="text-center py-5 w-100">
            <Spinner animation="border" style={{ color: "#7c3aed" }} />
          </div>
        ) : error ? (
          <p className="text-center text-danger w-100">
            Failed to load projects: {error}
          </p>
        ) : (
          <motion.div className={styles.scrollTrack} style={{ x: trackX }}>
            {projects.map((project, index) => {
              const variantClass = styles[`bgVariant${index % 4}`];
              return (
                <motion.div
                  key={project.id}
                  className={`${styles.projectCard} ${variantClass}`}
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className={styles.techWrap}>
                    {project.techStack?.map((tech: string, idx: number) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>
                    {project.description}
                  </p>

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.btnArrow}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 13L13 1M13 1H3M13 1V11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
