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
  const ctaOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.35, 0.4, 0.45], [1, 1.1, 0.5]);
  const ctaY = useTransform(scrollYProgress, [0.35, 0.45], [0, -40]);
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
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <FadeOutText
                text="✦ Fullstack .NET Developer"
                progress={scrollYProgress}
                start={0.0}
                end={0.05}
              />
            </motion.p>

            <motion.h1 className={styles.headline}>
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ display: "inline-block" }}
              >
                <FadeOutText
                  text="Hello,"
                  progress={scrollYProgress}
                  start={0.05}
                  end={0.07}
                />
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ display: "inline-block" }}
              >
                <FadeOutText
                  text="I'm"
                  progress={scrollYProgress}
                  start={0.07}
                  end={0.09}
                />
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ display: "inline-block" }}
              >
                <span className={styles.glowName} data-text="Smrutishree Naik">
                  <FadeOutText
                    text="Smrutishree Naik"
                    progress={scrollYProgress}
                    start={0.09}
                    end={0.15}
                  />
                </span>
              </motion.span>
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
              <FadeOutText
                text="Full-Stack .NET Engineer dedicated to building robust, high-performance software. Driven by a passion for scalable system design, algorithms, and crafting impactful digital products."
                progress={scrollYProgress}
                start={0.15}
                end={0.35}
              />
            </motion.p>

            <motion.div style={{ opacity: ctaOpacity, scale: ctaScale, y: ctaY }}>
              <motion.div
                className={styles.ctaGroup}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.a
                  href="#projects"
                  className={styles.btnPrimary}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  className={styles.btnGhost}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
