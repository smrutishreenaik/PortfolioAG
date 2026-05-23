import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./SnakeGame.module.scss";

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

  // Use refs for state accessed inside the game loop to avoid stale closures
  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const isPlayingRef = useRef(isPlaying);
  const gameOverRef = useRef(gameOver);

  useEffect(() => {
    snakeRef.current = snake;
    directionRef.current = direction;
    isPlayingRef.current = isPlaying;
    gameOverRef.current = gameOver;
  }, [snake, direction, isPlaying, gameOver]);

  // Load high score on mount
  useEffect(() => {
    const savedScore = localStorage.getItem("snakeHighScore");
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
    // Initialize food
    setFood(generateFood(INITIAL_SNAKE));
  }, []);

  // --- Controls ---
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default scrolling for arrow keys
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
  }, []);

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

    // Increase speed slightly as score increases (max speed capped)
    const speed = Math.max(50, BASE_SPEED - Math.floor(score / 50) * 10);
    const interval = setInterval(moveSnake, speed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, score]);

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
    setIsPlaying(true);
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
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.scoreBoard}>
          <div className={styles.scoreItem}>
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div className={styles.scoreItem}>
            <span>Best</span>
            <strong>{highScore}</strong>
          </div>
        </div>
      </div>

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
        {!isPlaying && !gameOver && (
          <div className={styles.overlay}>
            <h3>Ready?</h3>
            <p>Use arrow keys or WASD to move.</p>
            <button className={styles.playButton} onClick={() => setIsPlaying(true)}>
              Press Space to Start
            </button>
          </div>
        )}

        {gameOver && (
          <div className={styles.overlay}>
            <h3>Game Over!</h3>
            <p>You scored {score} points.</p>
            <button className={styles.playButton} onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className={styles.controlsHint}>
        Use <span>W A S D</span> or <span>Arrows</span> to move
      </div>
    </div>
  );
};

export default SnakeGame;
