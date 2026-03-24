import React from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import styles from "./Projects.module.scss";
import { Project } from "../../types";
import { useCollection } from "../../hooks/useCollection";

const Projects: React.FC = () => {
  const { data: projects, loading, error } = useCollection<Project>("projects");

  return (
    <section className={styles.projectsSection} id="projects">
      <Container>
        <h2 className="display-5 fw-bold mb-5 text-center">Selected Works</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load projects: {error}
          </p>
        ) : (
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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Projects;
