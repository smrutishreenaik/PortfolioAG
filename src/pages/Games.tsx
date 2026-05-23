import React, { useEffect } from "react";
import styles from "./Games.module.scss";

const Games: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Games</h1>
        <p className={styles.pageSubtitle}>
          A collection of my interactive games and experiments.
        </p>
      </div>

      <div className={styles.contentContainer}>
        <p>Coming soon! Check back later for playable games.</p>
      </div>
    </div>
  );
};

export default Games;
