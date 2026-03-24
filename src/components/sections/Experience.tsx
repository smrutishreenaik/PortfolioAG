import React from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Experience.module.scss";
import { Experience as ExperienceType } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion } from "framer-motion";

const Experience: React.FC = () => {
  const {
    data: experiences,
    loading,
    error,
  } = useCollection<ExperienceType>("experience");

  return (
    <section className={styles.experienceSection} id="experience">
      <Container>
        <motion.h2
          className="display-5 fw-bold mb-5 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Work Experience
        </motion.h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
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
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.18, duration: 0.7 }}
              >
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h4 fw-bold text-white mb-0">{exp.role}</h3>
                    <span className="badge bg-primary rounded-pill">
                      {exp.timePeriod}
                    </span>
                  </div>
                  <h4 className="h5 text-secondary mb-3">
                    <a
                      href={exp.companyWebsite || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondary text-decoration-none d-flex align-items-center gap-2"
                    >
                      {exp.logoUrl && (
                        <img
                          src={exp.logoUrl}
                          alt={`${exp.companyName} logo`}
                          style={{
                            width: "24px",
                            height: "24px",
                            objectFit: "contain",
                          }}
                        />
                      )}
                      {exp.companyName}
                    </a>
                  </h4>
                  <ul className="text-muted">
                    {exp.achievements?.map((achieve, idx) => (
                      <li key={idx} className="mb-1">
                        {achieve}
                      </li>
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
