import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import styles from "./Hero.module.scss";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className={styles.heroSection} id="home" ref={sectionRef}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <motion.div
        style={{ scale, opacity, y }}
        className={styles.contentWrapper}
      >
        <Container className={styles.contentContainer}>
          <motion.h1
            className="display-1 fw-bold mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Hello, I'm <span className="text-secondary">Smruti</span>
          </motion.h1>
          <motion.h2
            className="h3 mb-5 text-muted"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            Crafting exceptional digital experiences.
          </motion.h2>
          <motion.a
            href="#projects"
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
          </motion.a>
        </Container>
      </motion.div>
    </section>
  );
};

export default Hero;
