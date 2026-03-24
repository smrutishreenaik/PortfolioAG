import React, { useMemo } from "react";
import { Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import styles from "./About.module.scss";
import { Skill } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const { data: skills, loading, error } = useCollection<Skill>("skills");

  const groupedSkills = useMemo(() => {
    return skills.reduce(
      (acc, skill) => {
        const type = skill.type || "other";
        if (!acc[type]) acc[type] = [];
        acc[type].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );
  }, [skills]);

  let skillIndex = 0;

  return (
    <section className={styles.aboutSection} id="about">
      <Container>
        <Row className="align-items-center h-100">
          <Col md={6}>
            <motion.div
              className={styles.textContainer}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="display-4 fw-bold mb-4">About Me</h2>
              <p className="lead text-muted mb-4">
                I am a passionate software engineer specializing in building
                premium and highly interactive web applications. With a strong
                foundation in modern JavaScript frameworks and scalable backend
                services, I turn complex problems into elegant solutions.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a
                  href="#resume"
                  className="btn btn-outline-primary rounded-pill px-4 py-2"
                >
                  Download Resume
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  LinkedIn
                </a>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  LeetCode
                </a>
              </div>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              className={styles.skillsContainer}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <h3 className="h4 mb-3">Core Skills</h3>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                <p className="text-danger">Failed to load skills.</p>
              ) : (
                <div className="d-flex flex-column gap-4">
                  {Object.entries(groupedSkills).map(([type, groupSkills]) => (
                    <div key={type}>
                      <h4 className="h6 text-capitalize text-secondary mb-2">
                        {type}
                      </h4>
                      <div className="d-flex flex-wrap gap-2">
                        {groupSkills.map((skill) => {
                          const currentIndex = skillIndex++;
                          return (
                            <motion.div
                              key={skill.id}
                              initial={{ opacity: 0, scale: 0.6 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: currentIndex * 0.04,
                                duration: 0.35,
                              }}
                            >
                              <Badge
                                bg="secondary"
                                className={styles.skillBadge}
                              >
                                {skill.name}
                              </Badge>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
