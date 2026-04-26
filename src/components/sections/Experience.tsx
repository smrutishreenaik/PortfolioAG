import React from "react";
import styles from "./Experience.module.scss";
import { Experience as ExperienceItem } from "../../types";
import { useCollection } from "../../hooks/useCollection";

const Experience: React.FC = () => {
  const {
    data: experiences,
    loading,
    error,
  } = useCollection<ExperienceItem>("experience");

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.sectionWrap}>
        <div className={styles.sectionEyebrow}>Experience</div>
        <div className={styles.sectionTitle}>Where I&apos;ve built things</div>

        {loading ? (
          <div className={styles.stateMessage}>Loading experience...</div>
        ) : error ? (
          <div className={styles.stateMessageError}>
            Failed to load experience.
          </div>
        ) : experiences.length === 0 ? (
          <div className={styles.stateMessage}>No experience added yet.</div>
        ) : (
          <div className={styles.expList}>
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={styles.expRow}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={styles.expMeta}>
                  <div className={styles.expPeriod}>{exp.timePeriod}</div>
                  <div className={styles.expCoBadgeWrap}>
                    {exp.logoUrl ? (
                      <img
                        src={exp.logoUrl}
                        alt={`${exp.companyName} logo`}
                        className={styles.expLogo}
                      />
                    ) : null}
                    <div className={styles.expCoBadge}>{exp.companyName}</div>
                  </div>
                </div>

                <div>
                  <div className={styles.expRoleTitle}>{exp.role}</div>

                  {exp.companyWebsite ? (
                    <a
                      href={exp.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.expWebsite}
                    >
                      Visit company website
                    </a>
                  ) : null}

                  {exp.achievements?.length ? (
                    <ul className={styles.expBullets}>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={`${exp.id}-${idx}`}>{achievement}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
