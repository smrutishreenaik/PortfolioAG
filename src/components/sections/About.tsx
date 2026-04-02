import React, { useMemo, useRef } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styles from "./About.module.scss";
import { Skill } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import TechTicker from "./TechTicker";

const Letter = ({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.1)", "rgba(255,255,255,1)"],
  );
  return <motion.span style={{ opacity, color }}>{char}</motion.span>;
};

const ScrollAnimatedText: React.FC<{
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}> = ({ text, progress, start, end }) => {
  const letters = text.split("");
  const step = (end - start) / letters.length;

  return (
    <>
      {letters.map((char, i) => {
        const charStart = start + step * i;
        const charEnd = charStart + step;
        return (
          <Letter
            key={i}
            char={char}
            progress={progress}
            start={charStart}
            end={charEnd}
          />
        );
      })}
    </>
  );
};

const ScrollAnimatedButton = ({
  children,
  progress,
  start,
  end,
  className,
  href,
  target,
  rel,
}: any) => {
  const scale = useTransform(progress, [start, end], [0.8, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ scale, opacity }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

const ScrollAnimatedBadge = ({
  children,
  progress,
  start,
  end,
  className,
}: any) => {
  const scale = useTransform(progress, [start, end], [0.5, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.span
      className={className}
      style={{ scale, opacity, display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
};

const About: React.FC = () => {
  const { data: skills, loading, error } = useCollection<Skill>("skills");
  const sectionRef = useRef<HTMLElement>(null);

  // General scroll progress for the background orb
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Scrub progress specifically calculated for the intro animations
  const { scrollYProgress: introProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });

  const panelY = useTransform(introProgress, [0, 0.5], [100, 0]);
  const panelOpacity = useTransform(introProgress, [0, 0.5], [0, 1]);

  const totalSkills = useMemo(() => (skills ? skills.length : 1), [skills]);

  const groupedSkills = useMemo(() => {
    return skills.reduce(
      (acc, skill) => {
        const type = skill.type || "other";
        if (!acc[type]) acc[type] = [];
        acc[type].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );
  }, [skills]);

  let skillIndex = 0;

  return (
    <section className={styles.aboutSection} id="about" ref={sectionRef}>
      <TechTicker />
      <div className={styles.stickyContainer}>
        <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

        <Container>
          <Row className="align-items-center g-5">
            <Col md={6}>
              <div className={styles.leftContent}>
                <h2 className={styles.sectionTitle}>
                  <ScrollAnimatedText
                    text="About "
                    progress={introProgress}
                    start={0}
                    end={0.15}
                  />
                  <span>
                    <ScrollAnimatedText
                      text="Me"
                      progress={introProgress}
                      start={0.15}
                      end={0.2}
                    />
                  </span>
                </h2>
                <p className={styles.bioText}>
                  <ScrollAnimatedText
                    text="I am a passionate software engineer specializing in building premium and highly interactive web applications. With a strong foundation in modern JavaScript frameworks and scalable backend services, I turn complex problems into elegant solutions."
                    progress={introProgress}
                    start={0.2}
                    end={0.7}
                  />
                </p>
                <div className={styles.socialLinks}>
                  <ScrollAnimatedButton
                    progress={introProgress}
                    start={0.7}
                    end={0.8}
                    href="#resume"
                    className={styles.resumeBtn}
                  >
                    Download Resume
                  </ScrollAnimatedButton>
                  <ScrollAnimatedButton
                    progress={introProgress}
                    start={0.8}
                    end={0.85}
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                  >
                    GitHub
                  </ScrollAnimatedButton>
                  <ScrollAnimatedButton
                    progress={introProgress}
                    start={0.85}
                    end={0.9}
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                  >
                    LinkedIn
                  </ScrollAnimatedButton>
                  <ScrollAnimatedButton
                    progress={introProgress}
                    start={0.9}
                    end={0.95}
                    href="https://leetcode.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                  >
                    LeetCode
                  </ScrollAnimatedButton>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <motion.div
                className={styles.skillsPanel}
                style={{ y: panelY, opacity: panelOpacity }}
              >
                <h3 className={styles.skillsTitle}>Core Skills</h3>
                {loading ? (
                  <Spinner animation="border" style={{ color: "#7c3aed" }} />
                ) : error ? (
                  <p className="text-danger">Failed to load skills.</p>
                ) : (
                  <div>
                    {Object.entries(groupedSkills).map(
                      ([type, groupSkills]) => (
                        <div key={type} className={styles.skillGroup}>
                          <h4>{type}</h4>
                          <div className={styles.skillsWrap}>
                            {groupSkills.map((skill) => {
                              const idx = skillIndex++;
                              // Calculate start and end offsets for this badge
                              // Scale them between 0.25 (after panel slides up) and 0.9 (end of scroll)
                              const badgeStart =
                                0.25 + (0.6 / Math.max(1, totalSkills)) * idx;
                              const badgeEnd = badgeStart + 0.1;

                              return (
                                <ScrollAnimatedBadge
                                  key={skill.id}
                                  className={styles.skillBadge}
                                  progress={introProgress}
                                  start={badgeStart}
                                  end={badgeEnd}
                                >
                                  {skill.name}
                                </ScrollAnimatedBadge>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default About;
