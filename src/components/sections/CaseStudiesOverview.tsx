import React, { useRef } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CaseStudiesOverview.module.scss";
import { CaseStudy } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxImage = ({ src, alt, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Moves the image slightly opposite to scroll direction
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          height: "130%",
          width: "100%",
          objectFit: "cover",
          position: "absolute",
          top: "-15%",
          left: 0,
        }}
      />
    </div>
  );
};

const ScrubCard = ({ children }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.95", "1 0.05"],
  });

  // Stretch the animation to consume 40% of the screen transition on both entry and exit
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.8, 1, 1, 0.8],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [200, 0, 0, -200]);

  return (
    <motion.div ref={ref} style={{ scale, opacity, y }} className="h-100">
      {children}
    </motion.div>
  );
};

const CaseStudiesOverview: React.FC = () => {
  const {
    data: caseStudies,
    loading,
    error,
  } = useCollection<CaseStudy>("caseStudies");

  return (
    <section className={styles.caseStudiesSection} id="case-studies">
      <Container>
        <motion.div
          className="d-flex justify-content-between align-items-end mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="display-5 fw-bold mb-0">Case Studies</h2>
          <Link
            to="/case-studies"
            className="btn btn-outline-secondary rounded-pill"
          >
            View All
          </Link>
        </motion.div>

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
                <ScrubCard>
                  <Link
                    to={`/case-studies/${study.id}`}
                    className="text-decoration-none h-100 d-block"
                  >
                    <Card className={styles.studyCard}>
                      {study.imageUrl && (
                        <ParallaxImage
                          src={study.imageUrl}
                          alt={study.title}
                          className={styles.cardImg}
                        />
                      )}
                      <Card.Body className={styles.cardBody}>
                        <Card.Title className="h4 fw-bold text-white">
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
                </ScrubCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default CaseStudiesOverview;
