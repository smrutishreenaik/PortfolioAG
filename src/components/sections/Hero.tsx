import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Hero.module.scss";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection} id="home">
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
          {/* Will add more premium 3D elements here later */}
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <Container className={styles.contentContainer}>
        <h1 className="display-1 fw-bold mb-4">
          Hello, I'm <span className="text-secondary">Smruti</span>
        </h1>
        <h2 className="h3 mb-5 text-muted">
          Crafting exceptional digital experiences.
        </h2>
        <a
          href="#projects"
          className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg"
        >
          View My Work
        </a>
      </Container>
    </section>
  );
};

export default Hero;
