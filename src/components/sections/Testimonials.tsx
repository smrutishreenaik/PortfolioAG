import React from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import styles from "./Testimonials.module.scss";
import { Testimonial } from "../../types";
import { useCollection } from "../../hooks/useCollection";

const Testimonials: React.FC = () => {
  const {
    data: testimonials,
    loading,
    error,
  } = useCollection<Testimonial>("testimonials");

  return (
    <section className={styles.testimonialsSection} id="testimonials">
      <Container>
        <h2 className="display-5 fw-bold mb-5 text-center">
          Words From Clients
        </h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load testimonials: {error}
          </p>
        ) : (
          <Row className="g-4">
            {testimonials.map((test) => (
              <Col md={6} lg={4} key={test.id}>
                <Card className={styles.testimonialCard}>
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-4 text-warning">{"★".repeat(5)}</div>
                    <Card.Text className="fst-italic flex-grow-1 lead">
                      &ldquo;{test.quote}&rdquo;
                    </Card.Text>
                    <hr className="my-4 border-secondary opacity-25" />
                    <div className="d-flex align-items-center">
                      {test.profilePicUrl && (
                        <img
                          src={test.profilePicUrl}
                          alt={test.personName}
                          className={styles.avatar}
                        />
                      )}
                      <div>
                        <h4 className="h6 fw-bold mb-0">
                          {test.linkedinUrl ? (
                            <a
                              href={test.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white text-decoration-none"
                            >
                              {test.personName}
                            </a>
                          ) : (
                            test.personName
                          )}
                        </h4>
                        <div className="small text-muted">
                          {test.position} at {test.company}
                        </div>
                        {test.recommendedDate && (
                          <div
                            className="small text-muted mt-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {test.recommendedDate}
                          </div>
                        )}
                      </div>
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

export default Testimonials;
