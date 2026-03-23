import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./Testimonials.module.scss";
import { Testimonial } from "../../types";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setTestimonials([
        {
          id: "1",
          personName: "Jane Doe",
          linkedinUrl: "#",
          profilePicUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
          position: "CEO",
          company: "InnovateX",
          quote:
            "Smruti is a rare talent who bridges the gap between sophisticated design and optimal performance. Highly recommended!",
          recommendedDate: "October 12, 2024",
        },
        {
          id: "2",
          personName: "John Smith",
          linkedinUrl: "#",
          profilePicUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
          position: "Product Manager",
          company: "DesignFlow",
          quote:
            "Working with Smruti was an absolute pleasure. Delivered exceptional results on time and with great attention to detail.",
          recommendedDate: "January 5, 2025",
        },
      ]);
    };
    loadData();
  }, []);

  return (
    <section className={styles.testimonialsSection} id="testimonials">
      <Container>
        <h2 className="display-5 fw-bold mb-5 text-center">
          Words From Clients
        </h2>
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
                      <h4 className="h6 fw-bold mb-0">{test.personName}</h4>
                      <div className="small text-muted">
                        {test.position} at {test.company}
                      </div>
                      <div
                        className="small text-muted mt-1"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {test.recommendedDate}
                      </div>
                    </div>
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

export default Testimonials;
