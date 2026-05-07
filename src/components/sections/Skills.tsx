import React from "react";
import styles from "./Skills.module.scss";
import { Skill } from "../../types";
import { useCollection } from "../../hooks/useCollection";

const SKILL_TYPE_CLASS: Record<Skill["type"], string> = {
  frontend: styles.frontendPill,
  backend: styles.backendPill,
  tools: styles.toolsPill,
  other: styles.otherPill,
};

const Skills: React.FC = () => {
  const {
    data: skills,
    loading,
    error,
  } = useCollection<Skill>("skills");

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.sectionWrap}>
        <div className={styles.header}>
          <div className={styles.sectionEyebrow}>Tech Stack</div>
          <div className={styles.sectionTitle}>Skills & Tools</div>
          <div className={styles.sectionSub}>
            Every skill here is battle-tested in production.
          </div>
        </div>

        {loading ? (
          <div className={styles.stateMessage}>Loading skills...</div>
        ) : error ? (
          <div className={styles.stateMessageError}>Failed to load skills.</div>
        ) : skills.length === 0 ? (
          <div className={styles.stateMessage}>No skills added yet.</div>
        ) : (
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => {
              const delay = `${index * 0.03}s`;
              return (
                <div
                  key={skill.id}
                  className={`${styles.skillPill} ${SKILL_TYPE_CLASS[skill.type]}`}
                  style={{ transitionDelay: delay }}
                >
                  <div className={styles.skillDot}></div>
                  {skill.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
