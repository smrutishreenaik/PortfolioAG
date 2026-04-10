import React from "react";
import styles from "./Certifications.module.scss";

const certifications = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    icon: "☁️", // Could use an actual SVG if provided, text/emoji for now
  },
  {
    title: "Problem Solving \u2014 Intermediate",
    issuer: "HackerRank",
    icon: "🧩",
  },
  {
    title: "Cambridge English Business Vantage B2",
    issuer: "Cambridge Assessment English",
    icon: "GB",
  },
  {
    title: "Java \u2014 Basic",
    issuer: "HackerRank",
    icon: "☕",
  },
  {
    title: "Algorithmic Toolbox",
    issuer: "UC San Diego \u2014 Coursera",
    icon: "🔢", // Reused based on image appearance 12/34 block
  },
];

const Certifications: React.FC = () => {
  return (
    <section className={styles.certSection} id="certifications">
      <div className={styles.headerRow}>
        <div className={styles.leftHeader}>
          <div className={styles.tagline}>
            <span className={styles.taglineLine}>----</span> CREDENTIALS
          </div>
          <h2 className={styles.sectionTitle}>CERTIFICATIONS</h2>
        </div>
      </div>

      <div className={styles.grid}>
        {certifications.map((cert, index) => (
          <div className={styles.certCard} key={index}>
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>{cert.icon}</div>
              <div className={styles.certText}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <p className={styles.certIssuer}>{cert.issuer}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Fill empty grid spot with a decorative empty card */}
        <div className={styles.certCard}>
            <div className={styles.cardContent}>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
