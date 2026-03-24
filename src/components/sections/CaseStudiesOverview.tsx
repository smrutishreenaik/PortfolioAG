import React from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CaseStudiesOverview.module.scss";
import { CaseStudy } from "../../types";
import { useCollection } from "../../hooks/useCollection";

const CaseStudiesOverview: React.FC = () => {
  const {
    data: caseStudies,
    loading,
    error,
  } = useCollection<CaseStudy>("caseStudies");

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
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load case studies: {error}
          </p>
        ) : (
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
                        {study.content && study.content.length > 100
                          ? study.content.substring(0, 100) + "..."
                          : study.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default CaseStudiesOverview;
