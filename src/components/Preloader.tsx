import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.scss";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Animate progress from 0 to 100
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Start fade out after a short delay at 100%
        setTimeout(() => {
          setIsFadingOut(true);
          // Wait for fade out animation to finish before notifying complete
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for CSS opacity transition to complete
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`${styles.preloader} ${isFadingOut ? styles.fadeOut : ""}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.whiteText}>SMRUTI</span>
          <span className={styles.greenText}>SHREE</span>
        </h1>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.percentage}>{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default Preloader;
