import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Games.module.scss";

const GAMES_LIST = [
  {
    id: "snake",
    title: "Snake Game",
    description: "The classic Nokia game. Eat food to grow, but don't bite yourself!",
    tags: ["React State", "Game Loop", "Logic"],
    image: "/snake-bg.png",
  },
  {
    id: "untangle",
    title: "Untangle",
    description: "A highly satisfying visual puzzle. Drag the glowing nodes so that no connecting lines cross each other!",
    tags: ["Graph Theory", "Geometry", "Puzzle"],
    image: "/untangle-bg.png",
  },
];

const Games: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.gamesGrid}>
          {GAMES_LIST.map((game) => (
            <Link 
              key={game.id} 
              to={`/games/${game.id}`} 
              className={styles.gameCard}
              style={game.image ? { backgroundImage: `url(${game.image})` } : {}}
            >
              <div className={styles.cardOverlay}></div>
              <div className={styles.cardContent}>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
