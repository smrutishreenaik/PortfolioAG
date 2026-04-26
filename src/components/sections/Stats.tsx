import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import styles from "./Stats.module.scss";

interface StatItemProps {
  target: number;
  label: string;
  delay: number;
  ready: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ target, label, delay, ready }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const controls = animate(0, target, {
      duration: 2,
      delay: delay / 1000,
      ease: "easeOut",
      onUpdate: (value) => {
        setCount(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [ready, target, delay]);

  return (
    <motion.div
      ref={ref}
      className={styles.statItem}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <div className={styles.statN}>{count}</div>
      <div className={styles.statL}>{label}</div>
    </motion.div>
  );
};

interface StatsProps {
  ready: boolean;
}

const Stats: React.FC<StatsProps> = ({ ready }) => {
  return (
    <div className={styles.statsBar}>
      <div className={styles.statsBarInner}>
        <StatItem target={3} label="Years of Experience" delay={0} ready={ready} />
        <StatItem target={600} label="Bugs Resolved" delay={100} ready={ready} />
        <StatItem
          target={99}
          label="% Vulnerability Reduction"
          delay={200}
          ready={ready}
        />
        <StatItem target={20} label="Engineers Mentored" delay={300} ready={ready} />
        <StatItem target={70} label="% Manual Effort Saved" delay={400} ready={ready} />
      </div>
    </div>
  );
};

export default Stats;
