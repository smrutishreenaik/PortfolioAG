import React, { useRef } from "react";
import styles from "./Hero.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section className={styles.heroSection} id="home" ref={sectionRef}>
      <div className={styles.stickyContainer}>
        <motion.img
          className={styles.canvasContainer}
          style={{
            scale: bgScale,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="/petals.png"
          alt="Falling petals background"
        />

        <motion.div className={styles.orb1} style={{ y: orb1Y }} />
        <motion.div className={styles.orb2} style={{ y: orb2Y }} />

        <motion.div
          className={styles.contentWrapper}
          style={{ y: contentY, opacity: contentOpacity }}
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
              ✦ Fullstack .NET Developer
            </motion.p>

            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Hello, I'm <span className={styles.glowName}>Smrutishree Naik</span>
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
              Full-Stack .NET Engineer dedicated to building robust, high-performance software. Driven by a passion for scalable system design, algorithms, and crafting impactful digital products.
            </motion.p>

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
