import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Games.module.scss";

const GAMES_LIST = [
  {
    id: "snake",
    title: "Snake Game",
    description: "The classic Nokia game. Eat food to grow, but don't bite yourself!",
    tags: ["React State", "Game Loop", "Logic"],
  },
];

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
        <div className={styles.gamesGrid}>
          {GAMES_LIST.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`} className={styles.gameCard}>
              <div className={styles.cardHeader}>
                <h3>{game.title}</h3>
              </div>
              <p className={styles.cardDesc}>{game.description}</p>
              <div className={styles.cardTags}>
                {game.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardFooter}>
                Play Now &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
