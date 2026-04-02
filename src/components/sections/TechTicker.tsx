import React from "react";
import styles from "./TechTicker.module.scss";

const technologies = [
  "C# .NET CORE",
  "ASP.NET",
  "REACT.JS",
  "BLAZOR",
  "AZURE DEVOPS",
  "TYPESCRIPT",
  "SQL SERVER",
  "DOCKER",
];

const TechTicker: React.FC = () => {
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.tickerTrack}>
        {/* We duplicate the terms to create an infinite scroll effect */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.tickerGroup}>
            {technologies.map((tech, index) => (
              <React.Fragment key={`${i}-${index}`}>
                <span className={styles.techItem}>{tech}</span>
                <span className={styles.separator}>&#8226;</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
