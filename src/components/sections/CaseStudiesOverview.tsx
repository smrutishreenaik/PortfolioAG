import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CaseStudiesOverview.module.scss";
import { CaseStudy } from "../../types";

const CaseStudiesOverview: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setCaseStudies([
        {
          id: "1",
          title: "Redesigning the Payment Flow",
          content: "Brief excerpt of the case study...",
          imageUrl:
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: "2",
          title: "Scaling the Backend Architecture",
          content: "Brief excerpt of the case study...",
          imageUrl:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
        },
      ]);
    };
    loadData();
  }, []);

  return (
    <section className={styles.caseStudiesSection} id="case-studies">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-5">
          <h2 className="display-5 fw-bold mb-0">Case Studies</h2>
          <Link
            to="/case-studies"
            className="btn btn-outline-secondary rounded-pill"
          >
            View All
          </Link>
        </div>
        <Row className="g-4">
          {caseStudies.map((study) => (
            <Col md={6} key={study.id}>
              <Link
                to={`/case-studies/${study.id}`}
                className="text-decoration-none"
              >
                <Card className={styles.studyCard}>
                  {study.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={study.imageUrl}
                      className={styles.cardImg}
                    />
                  )}
                  <Card.Body className={styles.cardBody}>
                    <Card.Title className="h4 fw-bold">
                      {study.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {study.content}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CaseStudiesOverview;
