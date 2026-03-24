import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Badge } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import styles from "./CaseStudyDetail.module.scss";
import { CaseStudy } from "../types";

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCaseStudy = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "caseStudies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCaseStudy({ id: docSnap.id, ...docSnap.data() } as CaseStudy);
        } else {
          setCaseStudy(null);
        }
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
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
