import React, { useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useInView, animate } from "framer-motion";
import styles from "./About.module.scss";
import TechTicker from "./TechTicker";

const AnimatedNumber = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.round(v).toString() + suffix;
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <TechTicker />
      <div className={styles.stickyContainer}>
        <Container>
          <Row className="align-items-center g-5">
            <Col md={6}>
              <motion.div
                className={styles.leftContent}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
              >
                <div className={styles.tagline}>
                  <span className={styles.taglineLine}></span>
                  ABOUT ME
                </div>
                <h2 className={styles.sectionTitle}>
                  BUILDING THE<br />
                  WEB THAT<br />
                  MATTERS
                </h2>
                <p className={styles.bioText}>
                  I'm a Full-Stack Software Engineer with 3+ years of experience
                  designing, developing, and maintaining scalable and secure
                  applications. Proficient in C#, .NET Core, and modern web tech
                  — I care deeply about clean code, security, and performance.
                </p>
                <a href="#contact" className={styles.contactLink}>
                  Let's work together &rarr;
                </a>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className={styles.statsGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.div
                  className={styles.statCard}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h3>
                    <AnimatedNumber value={3} suffix="+" />
                  </h3>
                  <p>YEARS EXPERIENCE</p>
                </motion.div>
                <motion.div
                  className={styles.statCard}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h3>
                    <AnimatedNumber value={99} suffix="%" />
                  </h3>
                  <p>VULN REDUCED</p>
                </motion.div>
                <motion.div
                  className={styles.statCard}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h3>
                    <AnimatedNumber value={600} suffix="+" />
                  </h3>
                  <p>BUGS RESOLVED</p>
                </motion.div>
                <motion.div
                  className={styles.statCard}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h3>
                    <AnimatedNumber value={20} suffix="+" />
                  </h3>
                  <p>INTERNS MENTORED</p>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default About;
