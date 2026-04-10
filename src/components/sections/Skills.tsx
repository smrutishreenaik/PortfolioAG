import React from "react";
import styles from "./Skills.module.scss";

const staticSkills = [
  { name: "C#", isDark: true },
  { name: ".NET CORE", isDark: true },
  { name: "ASP.NET", isDark: true },
  { name: "REACT.JS", isDark: false },
  { name: "BLAZOR", isDark: true },
  { name: "JAVASCRIPT", isDark: false },
  { name: "HTML / CSS", isDark: false },
  { name: "MSSQL", isDark: false },
  { name: "JWT AUTH", isDark: true },
  { name: "DAPPER", isDark: false },
  { name: "ENTITY FRAMEWORK", isDark: false },
  { name: "DOCKER", isDark: false },
  { name: "AZURE DEVOPS", isDark: true },
  { name: "UNIT TESTING", isDark: false },
  { name: "DESIGN PATTERNS", isDark: false },
  { name: "OPENAI GPT", isDark: false },
  { name: "REST APIS", isDark: true },
  { name: "OKTA OAUTH2", isDark: false },
  { name: "GIT", isDark: false },
  { name: "WPF", isDark: false },
];

const Skills: React.FC = () => {
  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.headerRow}>
        <div className={styles.leftHeader}>
          <div className={styles.tagline}>
            <span className={styles.taglineLine}>----</span> TECH STACK
          </div>
          <h2 className={styles.sectionTitle}>
            SKILLS &<br />TECHNOLOGIES
          </h2>
        </div>
        <a href="#contact" className={styles.hireMeBtn}>
          HIRE ME &rarr;
        </a>
      </div>

      <div className={styles.skillsContainer}>
        {staticSkills.map((skill, index) => (
          <div
            key={index}
            className={`${styles.skillPill} ${skill.isDark ? styles.dark : styles.light}`}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
