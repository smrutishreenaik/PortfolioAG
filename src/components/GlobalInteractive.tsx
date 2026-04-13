import React, { useEffect, useState } from "react";
import { useScroll, motion } from "framer-motion";
import styles from "./GlobalInteractive.module.scss";

const GlobalInteractive: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let rx = 0;
    let ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      rx += (mousePosition.x - rx) * 0.12;
      ry += (mousePosition.y - ry) * 0.12;
      setRingPosition({ x: rx, y: ry });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".skillPill") ||
        target.closest(".painCard") ||
        target.closest(".projCard") ||
        target.closest(".csCard")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      />
      <div
        className={`${styles.cursorDot} ${isHovering ? styles.hover : ""}`}
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />
      <div
        className={`${styles.cursorRing} ${isHovering ? styles.hover : ""}`}
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
    </>
  );
};

export default GlobalInteractive;
