import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import styles from "./Stats.module.scss";

interface StatItemProps {
  target: number;
  label: string;
  delay: number;
  shouldAnimate: boolean;
}

const StatItem: React.FC<StatItemProps> = ({
  target,
  label,
  delay,
  shouldAnimate,
}) => {
  const [count, setCount] = useState(0);
  const value = useMotionValue(0);

  useMotionValueEvent(value, "change", (latest) => {
    setCount(Math.round(latest));
  });

  useEffect(() => {
    if (!shouldAnimate) return;

    const controls = animate(value, target, {
      duration: 2,
      delay: delay / 1000,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [delay, shouldAnimate, target, value]);

  return (
    <motion.div
      className={styles.statItem}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasEnteredView = useInView(sectionRef, { amount: 0.5, once: true });
  const shouldAnimate = ready && hasEnteredView;

  return (
    <div ref={sectionRef} className={styles.statsBar}>
      <div className={styles.statsBarInner}>
        <StatItem
          target={3}
          label="Years of Experience"
          delay={0}
          shouldAnimate={shouldAnimate}
        />
        <StatItem
          target={600}
          label="Bugs Resolved"
          delay={100}
          shouldAnimate={shouldAnimate}
        />
        <StatItem
          target={99}
          label="% Vulnerability Reduction"
          delay={200}
          shouldAnimate={shouldAnimate}
        />
        <StatItem
          target={20}
          label="Engineers Mentored"
          delay={300}
          shouldAnimate={shouldAnimate}
        />
        <StatItem
          target={70}
          label="% Manual Effort Saved"
          delay={400}
          shouldAnimate={shouldAnimate}
        />
      </div>
    </div>
  );
};

export default Stats;
