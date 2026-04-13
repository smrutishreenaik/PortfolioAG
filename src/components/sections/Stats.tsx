import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Stats.module.scss";

interface StatItemProps {
  target: number;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ target, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * target));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      className={styles.statItem}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
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
