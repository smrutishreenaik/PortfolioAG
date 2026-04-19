import React, { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

let hasLoadedOnce = false;

const Loader: React.FC = () => {
  const alreadyShown = hasLoadedOnce;
  const [loading, setLoading] = useState(!alreadyShown);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (alreadyShown) return;

    const timer1 = setTimeout(() => {
      setHidden(true);
      document.body.classList.remove("loading");
      hasLoadedOnce = true;
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
