import React, { useRef } from "react";
import styles from "./Hero.module.scss";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import StarParticles from "../ui/StarParticles";

const FadeOutCharacter = ({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [1, 0]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
};

const FadeOutText = ({
  text,
  progress,
  start,
  end,
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const characters = text.split("");
  const step = (end - start) / Math.max(characters.length, 1);

  return (
    <>
      {characters.map((char, i) => {
        const charStart = start + i * step;
        const charEnd = Math.min(charStart + step * 2.5, end);
        return (
          <FadeOutCharacter
            key={i}
            char={char}
            progress={progress}
            range={[charStart, charEnd]}
          />
        );
      })}
    </>
  );
};
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section className={styles.heroSection} id="home" ref={sectionRef}>
      <div
        className={styles.stickyContainer}
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.canvasContainer}>
          <StarParticles />
        </div>

        <motion.div className={styles.orb1} style={{ y: orb1Y }} />
        <motion.div className={styles.orb2} style={{ y: orb2Y }} />

        <motion.div
          className={styles.contentWrapper}
          style={{ y: contentY }}
        >
          <div className={styles.contentInner}>
            <motion.div
              className={styles.tagline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.taglineLine} />
              <FadeOutText
                text="SENIOR FULL STACK ENGINEER"
                progress={scrollYProgress}
                start={0.0}
                end={0.05}
              />
              <span className={styles.dot}>●</span> 
              <span className={styles.availableText}>AVAILABLE</span>
            </motion.div>

            <motion.h1 className={styles.headline}>
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                SMRUTISHREE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={styles.highlightName}
              >
                NAIK
              </motion.div>
            </motion.h1>

            <motion.p
              className={styles.subheadline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Full-Stack Engineer crafting scalable, secure<br/>
              applications with C# · .NET Core · React. 3+ years<br/>
              turning complex problems into elegant solutions.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className={styles.scrollTrack}>
            <motion.div
              className={styles.scrollThumb}
              animate={{
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "top" }}
            />
          </div>
          <span className={styles.scrollLabel}>SCROLL</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
