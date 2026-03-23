import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Experience.module.scss";
import { Experience as ExperienceType } from "../../types";

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setExperiences([
        {
          id: "1",
          companyName: "Tech Corp Inc.",
          timePeriod: "Jan 2023 - Present",
          role: "Senior Frontend Engineer",
          achievements: [
            "Lead the migration to React 18, improving performance by 30%.",
            "Mentored 3 junior developers and established code review guidelines.",
          ],
          companyWebsite: "https://example.com",
        },
        {
          id: "2",
          companyName: "Startup Flow",
          timePeriod: "Jun 2020 - Dec 2022",
          role: "Full Stack Developer",
          achievements: [
            "Developed a real-time analytics dashboard used by 10k+ users.",
            "Integrated Stripe payment gateway and reduced checkout drops.",
          ],
          companyWebsite: "https://example.com",
        },
      ]);
    };
    loadData();
  }, []);

  return (
    <section className={styles.experienceSection} id="experience">
      <Container>
        <h2 className="display-5 fw-bold mb-5 text-center">Work Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.timelineMarker}></div>
              <div className={styles.timelineContent}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="h4 fw-bold text-white mb-0">{exp.role}</h3>
                  <span className="badge bg-primary rounded-pill">
                    {exp.timePeriod}
                  </span>
                </div>
                <h4 className="h5 text-secondary mb-3">
                  <a
                    href={exp.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary text-decoration-none"
                  >
                    {exp.companyName}
                  </a>
                </h4>
                <ul className="text-muted">
                  {exp.achievements.map((achieve, idx) => (
                    <li key={idx} className="mb-1">
                      {achieve}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;
