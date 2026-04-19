import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCollection } from "../../hooks/useCollection";
import { CaseStudy } from "../../types";
import styles from "./CaseStudiesPreview.module.scss";

const CaseStudiesPreview: React.FC = () => {
  const { data: caseStudies, loading } =
    useCollection<CaseStudy>("caseStudies");
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const handleCardClick = (studyId: string) => {
    navigate(`/case-studies?id=${studyId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!loading && caseStudies.length === 0) return null;

  return (
    <section
      className={styles.section}
      id="case-studies-preview"
      ref={sectionRef}
    >
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <div className={styles.sectionWrap}>
        <div className={styles.headerBlock}>
          <div className={styles.sectionEyebrow}>Deep Dives</div>
          <div className={styles.sectionTitle}>
            Case <span>Studies</span>
          </div>
          <div className={styles.sectionSub}>
            Real problems, real solutions — a closer look at my most impactful
            work.
          </div>
        </div>

        <div className={styles.cardGrid}>
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={styles.skeletonCard} />
              ))
            : caseStudies.map((study, i) => (
                <motion.article
                  key={study.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1,
                  }}
                  onClick={() => handleCardClick(study.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCardClick(study.id)
                  }
                  aria-label={`View case study: ${study.title}`}
                >
                  {study.imageUrl ? (
                    <div className={styles.cardImageWrap}>
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className={styles.cardImage}
                      />
                    </div>
                  ) : (
                    <div className={styles.cardImagePlaceholder}>
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        width="48"
                        height="48"
                      >
                        <rect width="48" height="48" rx="12" fill="#e8f5ee" />
                        <path
                          d="M14 34L20 24l6 8 4-6 8 8H14z"
                          fill="#3d9e6a"
                          opacity="0.6"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="4"
                          fill="#3d9e6a"
                          opacity="0.4"
                        />
                      </svg>
                    </div>
                  )}

                  <div className={styles.cardBody}>
                    <span className={styles.cardTag}>Case Study</span>
                    <h3 className={styles.cardTitle}>{study.title}</h3>
                    <p className={styles.cardExcerpt}>
                      {study.content
                        ? study.content.replace(/<[^>]+>/g, "").slice(0, 120) +
                          "…"
                        : "Click to read the full case study."}
                    </p>
                    <div className={styles.cardFooter}>
                      <span className={styles.readMore}>
                        Read case study
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          width="14"
                          height="14"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>

        <motion.div
          className={styles.viewAllWrap}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            className={styles.viewAllBtn}
            onClick={() => {
              navigate("/case-studies");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            View all case studies
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
