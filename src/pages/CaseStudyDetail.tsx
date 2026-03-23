import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Badge } from "react-bootstrap";
import styles from "./CaseStudyDetail.module.scss";
import { CaseStudy } from "../types";

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate fetching from Firestore
    setTimeout(() => {
      setCaseStudy({
        id: id || "1",
        title:
          id === "1"
            ? "Redesigning the Payment Flow"
            : id === "2"
              ? "Scaling the Backend Architecture"
              : "Building a Premium Portfolio",
        content: `
          <h2>Overview</h2>
          <p>This is a detailed placeholder for the case study content. Here we can describe the problem, the solution, and the outcomes. It can include rich text, images, and other formatted content.</p>
          
          <h3>The Challenge</h3>
          <p>Users were dropping off during the payment process. We needed to identify the friction points and smooth them out.</p>
          
          <h3>The Solution</h3>
          <p>We implemented a single-page checkout, added more payment options, and improved loading times.</p>
          
          <h3>Results</h3>
          <ul>
            <li>Conversion rate increased by 15%</li>
            <li>Checkout time decreased by 30 seconds</li>
            <li>Positive feedback from user testing sessions</li>
          </ul>
        `,
        imageUrl:
          id === "1"
            ? "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
            : id === "2"
              ? "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200"
              : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Container className={styles.pageContainer}>
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!caseStudy) {
    return (
      <Container className={styles.pageContainer}>
        <div className="text-center mt-5">
          <h2>Case Study Not Found</h2>
          <Link to="/case-studies" className="btn btn-primary mt-3">
            Back to Case Studies
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className={styles.detailWrapper}>
      {/* Hero Header for Case Study */}
      <div
        className={styles.heroHeader}
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.9)), url(${caseStudy.imageUrl})`,
        }}
      >
        <Container>
          <Link to="/case-studies" className={styles.backLink}>
            &larr; Back to all Case Studies
          </Link>
          <div className="mt-4">
            <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill">
              Case Study
            </Badge>
            <h1 className="display-3 fw-bold text-white">{caseStudy.title}</h1>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <Container className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
        </div>
      </Container>
    </div>
  );
};

export default CaseStudyDetail;
