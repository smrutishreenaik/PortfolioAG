import React from "react";
import styles from "./CaseStudiesOverview.module.scss";

const CaseStudiesOverview: React.FC = () => {
  return (
    <section id="casestudy" className={styles.casestudySection}>
      <div className={styles.sectionWrap}>
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <svg width="110" height="96" viewBox="0 0 110 96" fill="none">
            {/* Bar chart in centre */}
            <rect
              x="38"
              y="55"
              width="10"
              height="28"
              rx="2"
              fill="#3d9e6a"
              opacity="0.3"
            />
            <rect
              x="51"
              y="42"
              width="10"
              height="41"
              rx="2"
              fill="#3d9e6a"
              opacity="0.5"
            />
            <rect
              x="64"
              y="30"
              width="10"
              height="53"
              rx="2"
              fill="#3d9e6a"
              opacity="0.85"
            />
            <line
              x1="35"
              y1="83"
              x2="77"
              y2="83"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Upward arrow on chart */}
            <path
              d="M38 55 Q50 30 74 18"
              stroke="#3d9e6a"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,3"
            />
            <path
              d="M70 14 L74 18 L69 20"
              stroke="#3d9e6a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Person LEFT */}
            <circle
              cx="22"
              cy="28"
              r="12"
              fill="#fde8d0"
              stroke="#222"
              strokeWidth="1.6"
            />
            <path d="M11 24 Q13 15 22 14 Q31 15 33 24" fill="#2d1b00" />
            <circle cx="18" cy="28" r="2" fill="#2d1b00" />
            <circle cx="26" cy="28" r="2" fill="#2d1b00" />
            <path
              d="M18 34 Q22 37 26 34"
              stroke="#222"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx="22"
              cy="56"
              rx="11"
              ry="15"
              fill="#fde8d0"
              stroke="#222"
              strokeWidth="1.4"
            />
            <path
              d="M13 49 Q22 56 31 49"
              fill="#6b9bff"
              stroke="#4f46e5"
              strokeWidth="1"
            />
            {/* Left arm reaching up to high-five */}
            <path
              d="M31 50 Q38 40 43 35"
              stroke="#fde8d0"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M31 50 Q38 40 43 35"
              stroke="#222"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Person RIGHT */}
            <circle
              cx="88"
              cy="28"
              r="12"
              fill="#fde8d0"
              stroke="#222"
              strokeWidth="1.6"
            />
            <path d="M77 24 Q79 15 88 14 Q97 15 99 24" fill="#1a1a2e" />
            <circle cx="84" cy="28" r="2" fill="#2d1b00" />
            <circle cx="92" cy="28" r="2" fill="#2d1b00" />
            <path
              d="M84 34 Q88 37 92 34"
              stroke="#222"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx="88"
              cy="56"
              rx="11"
              ry="15"
              fill="#fde8d0"
              stroke="#222"
              strokeWidth="1.4"
            />
            <path
              d="M79 49 Q88 56 97 49"
              fill="#3d9e6a"
              stroke="#2a7a52"
              strokeWidth="1"
            />
            {/* Right arm reaching to high-five */}
            <path
              d="M79 50 Q72 40 67 35"
              stroke="#fde8d0"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M79 50 Q72 40 67 35"
              stroke="#222"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />

            {/* High-five spark in middle */}
            <path
              d="M55 33 l2 4 l4 2 l-4 2 l-2 4 l-2-4 l-4-2 l4-2z"
              fill="#fbbf24"
            />
            <line
              x1="55"
              y1="27"
              x2="55"
              y2="24"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="62"
              y1="30"
              x2="65"
              y2="28"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="48"
              y1="30"
              x2="45"
              y2="28"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            className={styles.sectionEyebrow}
            style={{ justifyContent: "center" }}
          >
            Case Study
          </div>
          <div className={styles.sectionTitle}>
            What changes in the first 90 days
          </div>
          <div
            className={styles.sectionSub}
            style={{ margin: "0.5rem auto", textAlign: "center" }}
          >
            How AI-powered staffing recommendations transformed project
            delivery.
          </div>
        </div>

        <div className={styles.csGrid}>
          <div className={styles.csCard}>
            <div className={styles.csPhase}>Phase 01 / Problem</div>
            <div className={styles.csCardTitle}>Manual, slow RFP analysis</div>
            <div className={styles.csCardText}>
              Organizations spent weeks manually reviewing RFP documents to
              staff projects. The process relied on senior engineers and didn't
              scale as the project pipeline grew.
            </div>
          </div>
          <div className={styles.csCard} style={{ transitionDelay: ".1s" }}>
            <div className={styles.csPhase}>Phase 02 / Solution</div>
            <div className={styles.csCardTitle}>GPT-powered recommender</div>
            <div className={styles.csCardText}>
              Built a C# application that ingests RFP PDFs, uses OpenAI GPT to
              extract role and skill requirements, then matches them against an
              internal database with confidence scoring.
            </div>
          </div>
          <div className={styles.csCard} style={{ transitionDelay: ".2s" }}>
            <div className={styles.csPhase}>Phase 03 / Result</div>
            <div className={styles.csCardTitle}>Faster, better decisions</div>
            <div className={styles.csCardText}>
              Junior PMs now make staffing decisions independently. Senior time
              freed up for higher-value work. Consistency improved across all
              project bids.
            </div>
            <div className={styles.csMetric}>~80%</div>
            <div className={styles.csMetricLabel}>
              Reduction in staffing decision time
            </div>
          </div>
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <div
            className={styles.sectionTitle}
            style={{ fontSize: "clamp(24px,3vw,36px)", marginBottom: "2rem" }}
          >
            Skills that become daily habits
          </div>
          <div className={styles.checklist}>
            {[
              "Manual work reduced across core workflows",
              "Workflow automation inside existing tools",
              "Turnaround faster without adding headcount",
              "Knowledge systems that surface answers instantly",
              "Fewer errors as repeated steps disappear",
              "Systems feel stable and predictable to use",
            ].map((text, idx) => (
              <div key={idx} className={styles.checkItem}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="#e8f5ee"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 10 L9 13 L14 7"
                    stroke="#3d9e6a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesOverview;
