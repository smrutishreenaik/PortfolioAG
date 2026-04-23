import React, { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

const SESSION_KEY = "portfolio_loader_shown";

const Loader: React.FC = () => {
  const alreadyShown = sessionStorage.getItem(SESSION_KEY) === "true";
  const [loading, setLoading] = useState(!alreadyShown);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (alreadyShown) return;

    sessionStorage.setItem(SESSION_KEY, "true");

    const timer1 = setTimeout(() => {
      setHidden(true);
      document.body.classList.remove("loading");
      const timer2 = setTimeout(() => {
        setLoading(false);
      }, 700);
      return () => clearTimeout(timer2);
    }, 2200);

    return () => clearTimeout(timer1);
  }, [alreadyShown]);

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
