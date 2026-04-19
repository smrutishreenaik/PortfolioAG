import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import styles from "./CaseStudies.module.scss";
import { CaseStudy } from "../types";
import { useCollection } from "../hooks/useCollection";

const CaseStudies: React.FC = () => {
  const {
    data: caseStudies,
    loading,
    error,
  } = useCollection<CaseStudy>("caseStudies");

  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("id");

  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (caseStudies.length === 0 || hasInitialized.current) return;

    const targetStudy = preselectedId
      ? (caseStudies.find((s) => s.id === preselectedId) ?? caseStudies[0])
      : caseStudies[0];

    hasInitialized.current = true;

    const timer = setTimeout(() => {
      setSelectedStudy(targetStudy);
      setContentVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [caseStudies, preselectedId]);

  const handleSelectStudy = (study: CaseStudy) => {
    if (study.id === selectedStudy?.id) return;
    setContentVisible(false);
    setTimeout(() => {
      setSelectedStudy(study);
      setContentVisible(true);
    }, 200);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Case Studies</h1>
        <p className={styles.pageSubtitle}>
          In-depth look at my design and development processes.
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <Spinner animation="border" />
          <span>Loading case studies…</span>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          Failed to load case studies: {error}
        </div>
      ) : caseStudies.length === 0 ? (
        <div className={styles.emptyState}>No case studies found.</div>
      ) : (
        <div className={styles.splitLayout}>
          {/* ── Left sidebar ── */}
          <aside className={styles.sidebar}>
            <p className={styles.sidebarLabel}>
              {caseStudies.length} case{" "}
              {caseStudies.length === 1 ? "study" : "studies"}
            </p>
            <ul className={styles.studyList}>
              {caseStudies.map((study) => (
                <li key={study.id}>
                  <button
                    className={`${styles.studyItem} ${
                      selectedStudy?.id === study.id
                        ? styles.studyItemActive
                        : ""
                    }`}
                    onClick={() => handleSelectStudy(study)}
                  >
                    {study.imageUrl && (
                      <img
                        src={study.imageUrl}
                        alt=""
                        className={styles.studyThumb}
                      />
                    )}
                    <span className={styles.studyItemTitle}>{study.title}</span>
                    <span className={styles.studyItemArrow}>›</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Right content panel ── */}
          <main
            className={`${styles.contentPanel} ${
              contentVisible ? styles.contentPanelVisible : ""
            }`}
          >
            {selectedStudy && (
              <>
                {selectedStudy.imageUrl && (
                  <div className={styles.contentHero}>
                    <img
                      src={selectedStudy.imageUrl}
                      alt={selectedStudy.title}
                      className={styles.contentHeroImage}
                    />
                  </div>
                )}
                <div className={styles.contentBody}>
                  <span className={styles.contentTag}>Case Study</span>
                  <h2 className={styles.contentTitle}>{selectedStudy.title}</h2>
                  <div
                    className={styles.contentRich}
                    dangerouslySetInnerHTML={{ __html: selectedStudy.content }}
                  />
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default CaseStudies;
