import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import styles from "./Stats.module.scss";

interface StatItemProps {
  target: number;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ target, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  // Triggers when 80% visible, reducing premature firing on load
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (isInView) {
      // Use framer-motion's robust animate engine paired with React state
      const controls = animate(0, target, {
        duration: 2,
        delay: delay / 1000,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, target, delay]);

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

const Stats: React.FC = () => {
  return (
    <div className={styles.statsBar}>
      <div className={styles.statsBarInner}>
        <StatItem target={3} label="Years of Experience" delay={0} />
        <StatItem target={600} label="Bugs Resolved" delay={100} />
        <StatItem target={99} label="% Vulnerability Reduction" delay={200} />
        <StatItem target={20} label="Engineers Mentored" delay={300} />
        <StatItem target={70} label="% Manual Effort Saved" delay={400} />
      </div>
    </div>
  );
};

export default Stats;
