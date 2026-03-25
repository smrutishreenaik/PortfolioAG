import React, { useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Experience.module.scss";
import { Experience as ExperienceType } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const Experience: React.FC = () => {
  const {
    data: experiences,
    loading,
    error,
  } = useCollection<ExperienceType>("experience");

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      className={styles.experienceSection}
      id="experience"
      ref={sectionRef}
    >
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Work <span>Experience</span>
        </motion.h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "#7c3aed" }} />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load experience: {error}
          </p>
        ) : (
          <div className={styles.timeline}>
            <motion.div
              className={styles.timelineLine}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-1 flex-wrap">
                    <h3 className={styles.roleTitle}>{exp.role}</h3>
                    <span className={styles.timeBadge}>{exp.timePeriod}</span>
                  </div>
                  <div className={styles.companyRow}>
                    <a
                      href={exp.companyWebsite || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.companyLink}
                    >
                      {exp.logoUrl && (
                        <img
                          src={exp.logoUrl}
                          alt={`${exp.companyName} logo`}
                          className={styles.companyLogo}
                        />
                      )}
                      {exp.companyName}
                    </a>
                  </div>
                  <ul className={styles.achievementList}>
                    {exp.achievements?.map((achieve, idx) => (
                      <li key={idx}>{achieve}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Experience;
