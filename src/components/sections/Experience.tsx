import React from "react";
import styles from "./Experience.module.scss";

const experienceData = [
  {
    id: 1,
    period: "Apr 2025 — Present",
    company: "Mindfire Solutions",
    role: "Senior Software Engineer",
    sub: "Full Stack · .NET Core · React",
    bullets: [
      "Designed and built a self-service web platform delivering 20+ UI features and RESTful APIs",
      "Accelerated product releases by 10% through effective sprint management",
      "Increased E2E test coverage by 10%, reducing post-deployment bugs by 15%",
    ],
    tags: [".NET Core", "React.js", "REST APIs", "Agile"],
    delay: "0s",
  },
  {
    id: 2,
    period: "Nov 2023 — Feb 2025",
    company: "Enstoa",
    role: "C# .NET Full Stack Developer",
    sub: "ASP.NET Core 6 · Blazor · SQL",
    bullets: [
      "Enhanced web app with ASP.NET Core 6, Blazor, Web API, Dapper — cut security vulnerabilities by 99%",
      "Built Active Directory authentication, reducing manual effort by 70%",
      "Resolved critical deadlock and JWT token bugs, improving system stability",
      "Managed Azure DevOps pipelines, boards, and Git branching strategies",
    ],
    tags: ["ASP.NET Core 6", "Blazor", "JWT", "Azure DevOps", "SQL"],
    delay: ".1s",
  },
  {
    id: 3,
    period: "May 2022 — Nov 2023",
    company: "EPAM Systems",
    role: "Junior Software Engineer",
    sub: "WPF · SQL · .NET",
    bullets: [
      "Enhanced and maintained a Database Conversion Windows application using WPF",
      "Resolved 600+ SonarQube-identified bugs, significantly improving code maintainability",
      "Mentored 20+ interns on .NET; authored 100+ learning portal quiz questions",
      "Built full E-Commerce site using ASP.NET, Entity Framework, ReactJS during training",
    ],
    tags: ["WPF", "Entity Framework", "SonarQube", "Mentoring"],
    delay: ".2s",
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.sectionWrap}>
        <div className={styles.sectionEyebrow}>Experience</div>
        <div className={styles.sectionTitle}>Where I've built things</div>
        <div className={styles.expList}>
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className={styles.expRow}
              style={{ transitionDelay: exp.delay }}
            >
              <div>
                <div className={styles.expPeriod}>{exp.period}</div>
                <div className={styles.expCoBadge}>{exp.company}</div>
              </div>
              <div>
                <div className={styles.expRoleTitle}>{exp.role}</div>
                <div className={styles.expRoleSub}>{exp.sub}</div>
                <ul className={styles.expBullets}>
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
                <div className={styles.expTags}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.expTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
