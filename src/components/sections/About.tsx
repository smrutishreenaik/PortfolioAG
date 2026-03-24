import React, { useMemo, useRef } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styles from "./About.module.scss";
import { Skill } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const About: React.FC = () => {
  const { data: skills, loading, error } = useCollection<Skill>("skills");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

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
    <section className={styles.aboutSection} id="about" ref={sectionRef}>
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <Row className="align-items-center g-5">
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className={styles.sectionTitle}>
                About <span>Me</span>
              </h2>
              <p className={styles.bioText}>
                I am a passionate software engineer specializing in building
                premium and highly interactive web applications. With a strong
                foundation in modern JavaScript frameworks and scalable backend
                services, I turn complex problems into elegant solutions.
              </p>
              <div className={styles.socialLinks}>
                <a href="#resume" className={styles.resumeBtn}>
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
              className={styles.skillsPanel}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className={styles.skillsTitle}>Core Skills</h3>
              {loading ? (
                <Spinner animation="border" style={{ color: "#7c3aed" }} />
              ) : error ? (
                <p className="text-danger">Failed to load skills.</p>
              ) : (
                <div>
                  {Object.entries(groupedSkills).map(([type, groupSkills]) => (
                    <div key={type} className={styles.skillGroup}>
                      <h4>{type}</h4>
                      <div className={styles.skillsWrap}>
                        {groupSkills.map((skill) => {
                          const idx = skillIndex++;
                          return (
                            <motion.span
                              key={skill.id}
                              className={styles.skillBadge}
                              initial={{ opacity: 0, scale: 0.7 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.04, duration: 0.3 }}
                            >
                              {skill.name}
                            </motion.span>
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
