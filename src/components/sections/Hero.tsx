import React, { useState, useEffect } from "react";
import styles from "./Hero.module.scss";

const ROLES = ["Full-Stack Builder.", "Problem Solver.", ".NET Developer."];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentRole = ROLES[roleIndex];

    if (isDeleting) {
      if (text === "") {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setText(currentRole.substring(0, text.length - 1));
        }, 50);
      }
    } else {
      if (text === currentRole) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className={styles.heroOuter}>
      <div className={styles.hero} id="home">
        <div>
          <div className={styles.heroTag}>Available for opportunities</div>
          <h1 className={styles.heroTitle}>
            Smrutishree Naik.
            <em className={styles.roleText}>
              {text}
              <span className={styles.cursor}>|</span>
            </em>
          </h1>
          <p className={styles.heroDesc}>
            I'm Smrutishree — a C# / .NET Full-Stack Engineer with 3+ years
            building secure, scalable web platforms. I ship features that matter
            and mentor teams to grow.
          </p>
          <div className={styles.heroBtns}>
            <a className={styles.btnPrimary} href="#projects">
              View My Work
            </a>
            <a className={styles.btnSecondary} href="#contact">
              Get In Touch
            </a>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImageWrapper}>
            <img src="/Hero.png" alt="Hero Illustration" className={styles.heroImage} />

            {/* BlueCode decorators */}
            <img src="/BlueCode.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueCode1}`} />
            <img src="/BlueCode.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueCode2}`} />
            <img src="/BlueCode.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueCode3}`} />

            {/* BlueStar decorators */}
            <img src="/BlueStar.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueStar1}`} />
            <img src="/BlueStar.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueStar2}`} />
            <img src="/BlueStar.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueStar3}`} />
            <img src="/BlueStar.png" alt="" className={`${styles.decorator} ${styles.decoratorBlueStar4}`} />

            {/* GreenStar decorators */}
            <img src="/GreenStar.png" alt="" className={`${styles.decorator} ${styles.decoratorGreenStar1}`} />
            <img src="/GreenStar.png" alt="" className={`${styles.decorator} ${styles.decoratorGreenStar2}`} />
            <img src="/GreenStar.png" alt="" className={`${styles.decorator} ${styles.decoratorGreenStar3}`} />
            <img src="/GreenStar.png" alt="" className={`${styles.decorator} ${styles.decoratorGreenStar4}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
