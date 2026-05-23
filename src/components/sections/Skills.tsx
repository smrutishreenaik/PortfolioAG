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

interface IconConfig {
  src: string;
  className: string;
}

const LEFT_ICONS: IconConfig[] = [
  { src: "/JS.png", className: styles.iconLeft1 },
  { src: "/CSS.png", className: styles.iconLeft2 },
  { src: "/HTML.png", className: styles.iconLeft3 },
  { src: "/Python.png", className: styles.iconLeft4 },
  { src: "/SQL.png", className: styles.iconLeft5 },
];

const RIGHT_ICONS: IconConfig[] = [
  { src: "/Blazor.png", className: styles.iconRight1 },
  { src: "/JWT.png", className: styles.iconRight2 },
  { src: "/Azure.png", className: styles.iconRight3 },
  { src: "/CSharp.png", className: styles.iconRight4 },
  { src: "/Git.png", className: styles.iconRight5 },
];

const ALL_ICONS = [...LEFT_ICONS, ...RIGHT_ICONS];

const Skills: React.FC = () => {
  const {
    data: skills,
    loading,
    error,
  } = useCollection<Skill>("skills");

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.floatingIconsContainer}>
        {ALL_ICONS.map((icon) => (
          <img
            key={icon.src}
            src={icon.src}
            alt=""
            className={`${styles.floatingIcon} ${icon.className}`}
          />
        ))}
      </div>

      <div className={styles.sectionWrap}>
        <div className={styles.header}>
          <div className={styles.sectionEyebrow}>Tech Stack</div>
          <div className={styles.sectionTitle}>Skills &amp; Tools</div>
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
