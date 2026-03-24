import React from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Experience.module.scss";
import { Experience as ExperienceType } from "../../types";
import { useCollection } from "../../hooks/useCollection";

const Experience: React.FC = () => {
  const {
    data: experiences,
    loading,
    error,
  } = useCollection<ExperienceType>("experience");

  return (
    <section className={styles.experienceSection} id="experience">
      <Container>
        <h2 className="display-5 fw-bold mb-5 text-center">Work Experience</h2>
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
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
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
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Experience;
