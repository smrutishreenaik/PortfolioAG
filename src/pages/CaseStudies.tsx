import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CaseStudies.module.scss";
import { CaseStudy } from "../types";

const CaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        {
          id: "3",
          title: "Building a Premium Portfolio",
          content: "A deep dive into three.js and gsap animations.",
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        },
      ]);
    };
    loadData();
  }, []);

  return (
    <Container className={styles.pageContainer}>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">All Case Studies</h1>
        <p className="lead text-muted">
          In-depth look into my design and development processes.
        </p>
      </div>

      <Row className="g-5">
        {caseStudies.map((study) => (
          <Col lg={4} md={6} key={study.id}>
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
                  <Card.Title className="h4 fw-bold text-white mb-3">
                    {study.title}
                  </Card.Title>
                  <Card.Text className="text-muted">{study.content}</Card.Text>
                  <div className="mt-3 text-secondary fw-bold">
                    Read Full Case Study &rarr;
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CaseStudies;
