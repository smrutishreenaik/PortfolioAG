import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./GamePlayer.module.scss";
import SnakeGame from "../components/games/SnakeGame";

const GamePlayer: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let gameComponent = null;
  let title = "";
  let description = "";

  switch (gameId) {
    case "snake":
      gameComponent = <SnakeGame />;
      title = "Snake Game";
      description = "The classic Nokia game. Eat food to grow, but don't bite yourself!";
      break;
    default:
      return (
        <div className={styles.pageWrapper}>
          <div className={styles.notFound}>
            <h2>Game not found</h2>
            <Link to="/games" className={styles.backLink}>
              &larr; Back to Games
            </Link>
          </div>
        </div>
      );
  }

  return (
    <div className={styles.pageWrapper}>
      <Link to="/games" className={styles.backLink}>
        &larr; Back to Games
      </Link>
      
      <div className={styles.gameHeader}>
        <h1 className={styles.gameTitle}>{title}</h1>
        <p className={styles.gameSubtitle}>{description}</p>
      </div>

      <div className={styles.playerContainer}>
        {gameComponent}
      </div>
    </div>
  );
};

export default GamePlayer;
