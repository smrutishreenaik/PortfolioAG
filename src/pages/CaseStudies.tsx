import React, { useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CaseStudies.module.scss";
import { CaseStudy } from "../types";
import { useCollection } from "../hooks/useCollection";

const CaseStudies: React.FC = () => {
  const {
    data: caseStudies,
    loading,
    error,
  } = useCollection<CaseStudy>("caseStudies");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={styles.pageContainer}>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">All Case Studies</h1>
        <p className="lead text-muted">
          In-depth look into my design and development processes.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-center text-danger">
          Failed to load case studies: {error}
        </p>
      ) : (
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
                    <Card.Text className="text-muted">
                      {study.content && study.content.length > 150
                        ? study.content.substring(0, 150) + "..."
                        : study.content}
                    </Card.Text>
                    <div className="mt-3 text-secondary fw-bold">
                      Read Full Case Study &rarr;
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CaseStudies;
