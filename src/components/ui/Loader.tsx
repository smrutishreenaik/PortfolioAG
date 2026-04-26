import React, { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

export const LOADER_SESSION_KEY = "portfolio_loader_shown";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const alreadyShown = sessionStorage.getItem(LOADER_SESSION_KEY) === "true";
  const [loading, setLoading] = useState(!alreadyShown);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (alreadyShown) {
      document.body.classList.remove("loading");
      onComplete?.();
      return;
    }

    sessionStorage.setItem(LOADER_SESSION_KEY, "true");

    let timer2: ReturnType<typeof setTimeout> | undefined;

    const timer1 = setTimeout(() => {
      setHidden(true);
      document.body.classList.remove("loading");

      timer2 = setTimeout(() => {
        setLoading(false);
        onComplete?.();
      }, 700);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      if (timer2) {
        clearTimeout(timer2);
      }
      document.body.classList.remove("loading");
    };
  }, [alreadyShown, onComplete]);

  if (!loading) return null;

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.loaderName}>
        <span className={styles.loaderNameInner}>Smrutishree Naik</span>
      </div>
      <div className={styles.loaderBarWrap}>
        <div className={styles.loaderBar}></div>
      </div>
      <div className={styles.loaderLabel}>INITIALIZING</div>
    </div>
  );
};

export default Loader;
