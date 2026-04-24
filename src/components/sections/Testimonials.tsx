import React, { useRef, useState, useEffect, useCallback } from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Testimonials.module.scss";
import { Testimonial } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const AUTOPLAY_INTERVAL_MS = 5000;

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
    <path
      d="M0 28V17.6C0 14.08 0.746667 10.9867 2.24 8.32C3.73333 5.65333 5.97333 3.36 8.96 1.44L11.52 5.12C9.81333 6.18667 8.48 7.46667 7.52 8.96C6.56 10.4533 6.02667 12.16 5.92 14.08H11.52V28H0ZM20.48 28V17.6C20.48 14.08 21.2267 10.9867 22.72 8.32C24.2133 5.65333 26.4533 3.36 29.44 1.44L32 5.12C30.2933 6.18667 28.96 7.46667 28 8.96C27.04 10.4533 26.5067 12.16 26.4 14.08H32V28H20.48Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  direction: number;
}> = ({ testimonial, direction }) => (
  <motion.div
    className={styles.testimonialCard}
    key={testimonial.id}
    custom={direction}
    variants={{
      enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
      center: { x: 0, opacity: 1, scale: 1 },
      exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
    }}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className={styles.quoteIconWrap}>
      <QuoteIcon />
    </div>
    <p className={styles.quoteText}>{testimonial.quote}</p>
    <div className={styles.authorRow}>
      {testimonial.profilePicUrl ? (
        <img
          src={testimonial.profilePicUrl}
          alt={testimonial.personName}
          className={styles.authorAvatar}
        />
      ) : (
        <div className={styles.authorAvatarPlaceholder}>
          {testimonial.personName?.charAt(0).toUpperCase()}
        </div>
      )}
      <div className={styles.authorInfo}>
        <p className={styles.authorName}>{testimonial.personName}</p>
        <p className={styles.authorRole}>
          {testimonial.position} · {testimonial.company}
        </p>
      </div>
      {testimonial.linkedinUrl && (
        <a
          href={testimonial.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinLink}
          aria-label={`${testimonial.personName} on LinkedIn`}
        >
          <LinkedInIcon />
        </a>
      )}
    </div>
    {testimonial.recommendedDate && (
      <p className={styles.recommendedDate}>{testimonial.recommendedDate}</p>
    )}
  </motion.div>
);

const Testimonials: React.FC = () => {
  const { data: testimonials, loading, error } = useCollection<Testimonial>("testimonials");

  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      setDirection(dir);
      setActiveIndex((nextIndex + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1, 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused, goNext]);

  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      ref={sectionRef}
    >
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.sectionTitle}>
            What People <span>Say</span>
          </h2>
          {!loading && testimonials.length > 0 && (
            <p className={styles.counterLabel}>
              {activeIndex + 1} / {testimonials.length}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "#3d9e6a" }} />
          </div>
        ) : error ? (
          <p className="text-center text-danger">Failed to load testimonials.</p>
        ) : testimonials.length === 0 ? (
          <p className={styles.emptyState}>No testimonials yet.</p>
        ) : (
          <div
            className={styles.carouselWrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Cards */}
            <div className={styles.carouselTrack}>
              <AnimatePresence mode="wait" custom={direction}>
                <TestimonialCard
                  key={testimonials[activeIndex].id}
                  testimonial={testimonials[activeIndex]}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
              <button
                className={styles.navBtn}
                onClick={goPrev}
                aria-label="Previous testimonial"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeftIcon />
              </button>

              <div className={styles.dots}>
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
                    onClick={() => goTo(idx, idx > activeIndex ? 1 : -1)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                className={styles.navBtn}
                onClick={goNext}
                aria-label="Next testimonial"
                disabled={testimonials.length <= 1}
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Progress bar */}
            {!isPaused && testimonials.length > 1 && (
              <div className={styles.progressBar}>
                <motion.div
                  key={activeIndex}
                  className={styles.progressFill}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_INTERVAL_MS / 1000, ease: "linear" }}
                />
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Testimonials;
