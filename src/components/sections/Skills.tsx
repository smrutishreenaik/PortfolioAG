import React from "react";
import styles from "./Skills.module.scss";

const skills = [
  "C#",
  ".NET Core",
  "ASP.NET",
  "Blazor",
  "MudBlazor",
  "ReactJS",
  "JavaScript",
  "HTML / CSS",
  "MSSQL",
  "Entity Framework",
  "Dapper",
  "RESTful APIs",
  "JWT / OAuth",
  "Azure DevOps",
  "Docker",
  "Git",
  "OpenAI GPT",
  "Python",
  "WPF",
  "Postman",
  "Unit Testing",
  "Agile / Scrum",
  "SonarQube",
  "Okta Auth",
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.sectionWrap}>
        <div style={{ textAlign: "center" }}>
          <div
            className={styles.sectionEyebrow}
            style={{ justifyContent: "center" }}
          >
            Tech Stack
          </div>
          <div className={styles.sectionTitle}>Tools I work with</div>
          <div
            className={styles.sectionSub}
            style={{ margin: "0.5rem auto", textAlign: "center" }}
          >
            Every skill here is battle-tested in production.
          </div>
        </div>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => {
            const delay = `${index * 0.03}s`;
            return (
              <div
                key={skill}
                className={styles.skillPill}
                style={{ transitionDelay: delay }}
              >
                <div className={styles.skillDot}></div>
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
