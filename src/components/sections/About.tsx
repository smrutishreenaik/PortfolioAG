import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import styles from "./About.module.scss";
import { Skill } from "../../types";

const About: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setSkills([
        { id: "1", name: "React", type: "frontend" },
        { id: "2", name: "TypeScript", type: "frontend" },
        { id: "3", name: "Firebase", type: "backend" },
        { id: "4", name: "Bootstrap", type: "frontend" },
      ]);
    };
    loadData();
  }, []);

  return (
    <section className={styles.aboutSection} id="about">
      <Container>
        <Row className="align-items-center h-100">
          <Col md={6}>
            <div className={styles.textContainer}>
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
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.skillsContainer}>
              <h3 className="h4 mb-3">Core Skills</h3>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    bg="secondary"
                    key={skill.id}
                    className={styles.skillBadge}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
