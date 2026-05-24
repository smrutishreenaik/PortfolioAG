import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./SnakeGame.module.scss";
import { db } from "../../services/firebase";
import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { GameScore } from "../../types";

// --- Types & Constants ---
type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = "UP";
const BASE_SPEED = 150; // ms per tick

// --- Helper Functions ---
const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    isOccupied = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
  }
  return newFood!;
};

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<GameScore[]>([]);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [playerName, setPlayerName] = useState("");

  // Use refs for state accessed inside the game loop to avoid stale closures
  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const isPlayingRef = useRef(isPlaying);
  const gameOverRef = useRef(gameOver);
  const scoreRef = useRef(score);

  useEffect(() => {
    snakeRef.current = snake;
    directionRef.current = direction;
    isPlayingRef.current = isPlaying;
    gameOverRef.current = gameOver;
    scoreRef.current = score;
  }, [snake, direction, isPlaying, gameOver, score]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const q = query(
        collection(db, "gameScores"),
        where("gameId", "==", "snake"),
        orderBy("score", "desc"),
        limit(3)
      );
      const snapshot = await getDocs(q);
      const scores = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as GameScore)
      );
      setLeaderboard(scores);
    } catch (error) {
      console.warn("Index may be missing, falling back to local sort", error);
      try {
        const qFallback = query(collection(db, "gameScores"), where("gameId", "==", "snake"));
        const snapshot = await getDocs(qFallback);
        const scores = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as GameScore)
        );
        scores.sort((a, b) => b.score - a.score);
        setLeaderboard(scores.slice(0, 3));
      } catch (fallbackError) {
        console.error("Error fetching leaderboard", fallbackError);
      }
    }
  }, []);

  // Load high score and leaderboard on mount
  useEffect(() => {
    const savedScore = localStorage.getItem("snakeHighScore");
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
    setFood(generateFood(INITIAL_SNAKE));
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // --- Controls ---
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (showNamePopup) return; // Disable game controls when popup is open

    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
    ) {
      e.preventDefault();
    }

    if (!isPlayingRef.current && !gameOverRef.current && e.key === " ") {
      setIsPlaying(true);
      return;
    }

    if (gameOverRef.current && e.key === " ") {
      resetGame();
      return;
    }

    const currentDir = directionRef.current;
    switch (e.key) {
      case "ArrowUp":
      case "w":
        if (currentDir !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
      case "s":
        if (currentDir !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
      case "a":
        if (currentDir !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
      case "d":
        if (currentDir !== "LEFT") setDirection("RIGHT");
        break;
    }
  }, [showNamePopup]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // --- Game Loop ---
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      const currentSnake = [...snakeRef.current];
      const head = { ...currentSnake[0] };
      const currentDir = directionRef.current;

      switch (currentDir) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        handleGameOver();
        return;
      }

      // Check collision with self
      if (
        currentSnake.some(
          (segment) => segment.x === head.x && segment.y === head.y
        )
      ) {
        handleGameOver();
        return;
      }

      currentSnake.unshift(head);

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood(currentSnake));
      } else {
        currentSnake.pop();
      }

      setSnake(currentSnake);
    };

    const speed = Math.max(50, BASE_SPEED - Math.floor(score / 50) * 10);
    const interval = setInterval(moveSnake, speed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, score]);

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    
    const finalScore = scoreRef.current;
    
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("snakeHighScore", finalScore.toString());
    }

    // Check if qualifies for top 3
    if (finalScore > 0) {
      if (leaderboard.length < 3 || finalScore > leaderboard[leaderboard.length - 1].score) {
        setShowNamePopup(true);
      }
    }
  };

  const resetGame = () => {
    if (showNamePopup) return; // Prevent reset if popup is active
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
    setIsPlaying(true);
  };

  const submitScore = async () => {
    const nameToSubmit = playerName.trim() || "Anonymous";
    try {
      await addDoc(collection(db, "gameScores"), {
        gameId: "snake",
        playerName: nameToSubmit,
        score: score,
        createdAt: serverTimestamp(),
      });
      setShowNamePopup(false);
      fetchLeaderboard();
    } catch (error) {
      console.error("Error saving score", error);
    }
  };

  const skipSubmit = () => {
    setShowNamePopup(false);
  };

  // --- Rendering Helpers ---
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const isSnake = snake.some(
          (segment) => segment.x === col && segment.y === row
        );
        const isHead = snake[0].x === col && snake[0].y === row;
        const isFood = food.x === col && food.y === row;

        grid.push(
          <div
            key={`${row}-${col}`}
            className={`${styles.cell} ${isHead ? styles.snakeHead : isSnake ? styles.snakeBody : ""} ${
              isFood ? styles.food : ""
            }`}
          ></div>
        );
      }
    }
    return grid;
  };

  return (
    <div className={styles.layoutContainer}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.iconBox}>🐍</div>
          <h1 className={styles.title}>Snake Game</h1>
          <span className={styles.tag}>{"</>"}</span>
        </div>
        <p className={styles.subtitle}>
          The classic Nokia game. Eat food to grow, but don't bite yourself!
        </p>
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className={styles.columns}>
        {/* Left Column: Game Board */}
        <div className={styles.leftCol}>
          <div className={styles.boardWrapper}>
            <div
              className={styles.board}
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              }}
            >
              {renderGrid()}
            </div>

            {/* Overlays */}
            {!isPlaying && !gameOver && !showNamePopup && (
              <div className={styles.overlay}>
                <h3>Ready?</h3>
                <button className={styles.playButton} onClick={() => setIsPlaying(true)}>
                  Press Space to Start
                </button>
              </div>
            )}

            {gameOver && !showNamePopup && (
              <div className={styles.overlay}>
                <h3>Game Over!</h3>
                <button className={styles.playButton} onClick={resetGame}>
                  Play Again
                </button>
              </div>
            )}

            {/* Name Entry Popup */}
            {showNamePopup && (
              <div className={styles.overlay}>
                <h3>New High Score!</h3>
                <p>You made it to the Top 3 with {score} points.</p>
                <input
                  type="text"
                  placeholder="Enter your name (optional)"
                  className={styles.popupInput}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  autoFocus
                  maxLength={15}
                />
                <div className={styles.popupActions}>
                  <button className={styles.playButton} onClick={submitScore}>
                    Submit Score
                  </button>
                  <button className={styles.skipButton} onClick={skipSubmit}>
                    Skip
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.tipSection}>
            <span className={styles.tipIcon}>✨</span>
            <span className={styles.tipText}>
              <strong>Tip:</strong> Look ahead and avoid trapping yourself against the walls!
            </span>
          </div>
        </div>

        {/* Right Column: Panels */}
        <div className={styles.rightCol}>
          
          {/* How to Play Panel */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIconLight}>💡</span>
              <h4>How to Play</h4>
            </div>
            <p className={styles.panelText}>
              Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to move the snake. Eat the red apples to grow and increase your score. Be quick!
            </p>
          </div>

          {/* Game Status Panel */}
          <div className={styles.panel}>
            <h4 className={styles.panelTitle}>Game Status</h4>
            <div className={styles.statusGrid}>
              <div className={styles.statusItem}>
                <span className={styles.statusIcon}>📏</span>
                <span className={styles.statusValue}>{snake.length}</span>
                <span className={styles.statusLabel}>Length</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusIcon}>🎯</span>
                <span className={styles.statusValue}>{score}</span>
                <span className={styles.statusLabel}>Score</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusIcon}>⚡</span>
                <span className={styles.statusValue}>{Math.floor(score / 50) + 1}</span>
                <span className={styles.statusLabel}>Speed</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Panel */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIconGold}>🏆</span>
              <h4>Top 3 Players</h4>
            </div>
            
            {leaderboard.length > 0 ? (
              <div className={styles.leaderboardList}>
                {leaderboard.map((entry, index) => (
                  <div key={entry.id || index} className={`${styles.leaderboardItem} ${styles[`rank${index + 1}`]}`}>
                    <div className={styles.playerInfo}>
                      <span className={styles.rankBadge}>#{index + 1}</span>
                      <span>{entry.playerName}</span>
                    </div>
                    <span className={styles.leaderboardScore}>{entry.score}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.panelText}>No scores yet. Be the first!</p>
            )}
          </div>

          {/* High Score Panel (Local) */}
          <div className={styles.panel}>
            <div className={styles.flexBetween}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIconGold}>⭐</span>
                <div>
                  <h4 className={styles.mb0}>High Score</h4>
                  <p className={styles.panelSubtext}>Personal Best</p>
                </div>
              </div>
              <div className={styles.highScoreValue}>{highScore}</div>
            </div>
          </div>

          {/* Action Button */}
          <button className={styles.giveUpBtn} onClick={resetGame}>
            {isPlaying ? "Give Up & Reset" : "Reset Game"}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
