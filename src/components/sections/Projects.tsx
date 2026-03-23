import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./Projects.module.scss";
import { Project } from "../../types";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setProjects([
        {
          id: "1",
          title: "E-commerce Platform",
          description: "A scalable e-commerce site with realtime inventory.",
          features: ["Cart", "Checkout Stripe", "Real-time sync"],
          techStack: ["React", "Firebase", "Stripe"],
          githubLink: "#",
          liveLink: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: "2",
          title: "Analytics Dashboard",
          description: "Visualizing big data with highly responsive charts.",
          features: ["Real-time Graphs", "Export CSV", "Auth"],
          techStack: ["React", "D3.js", "Firebase Auth"],
          githubLink: "#",
          liveLink: "#",
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        },
      ]);
    };
    loadData();
  }, []);

  return (
    <section className={styles.projectsSection} id="projects">
      <Container>
        <h2 className="display-5 fw-bold mb-5 text-center">Selected Works</h2>
        <Row className="g-4">
          {projects.map((project) => (
            <Col md={6} key={project.id}>
              <Card className={styles.projectCard}>
                {project.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={project.imageUrl}
                    className={styles.cardImg}
                  />
                )}
                <Card.Body className={styles.cardBody}>
                  <Card.Title className="h4 fw-bold mb-3">
                    {project.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {project.description}
                  </Card.Text>
                  <div className="d-flex gap-2 flex-wrap mb-4">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex gap-3 mt-auto">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm flex-grow-1 rounded-pill"
                    >
                      View Live
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-light btn-sm flex-grow-1 rounded-pill"
                    >
                      GitHub
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;
