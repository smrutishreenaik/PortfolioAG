import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./CaseStudiesOverview.module.scss";
import { Testimonial } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const AUTOPLAY_MS = 5000;

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M13 4L7 10L13 16"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M7 4L13 10L7 16"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Testimonials: React.FC = () => {
  const {
    data: testimonials,
    loading,
    error,
  } = useCollection<Testimonial>("testimonials");

  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      setDirection(dir);
      setActiveIndex((nextIndex + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const goNext = useCallback(
    () => goTo(activeIndex + 1, 1),
    [activeIndex, goTo],
  );
  const goPrev = useCallback(
    () => goTo(activeIndex - 1, -1),
    [activeIndex, goTo],
  );

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused, goNext]);

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className={styles.casestudySection}
      ref={sectionRef}
    >
      <div className={styles.sectionWrap}>
        <motion.div className={styles.floatingOrb} style={{ y: floatY }} />

        <motion.div
          className={styles.headerBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sectionEyebrow}>Kind Words</div>
          <div className={styles.sectionTitle}>
            What people <span>say about me</span>
          </div>
          <div className={styles.sectionSub}>
            Feedback from colleagues and clients I&apos;ve had the pleasure to
            work with.
          </div>
        </motion.div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.skeletonCard} />
          </div>
        ) : error ? (
          <p className={styles.errorText}>Failed to load testimonials.</p>
        ) : testimonials.length === 0 ? (
          <p className={styles.emptyText}>No testimonials yet.</p>
        ) : (
          <div
            className={styles.carouselWrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.carouselTrack}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  className={styles.testimonialCard}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      x: d > 0 ? 72 : -72,
                      opacity: 0,
                      scale: 0.97,
                    }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({
                      x: d > 0 ? -72 : 72,
                      opacity: 0,
                      scale: 0.97,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.quoteIcon}>"</span>
                  <p className={styles.quoteText}>{current.quote}</p>
                  <div className={styles.divider} />
                  <div className={styles.authorRow}>
                    {current.profilePicUrl ? (
                      <img
                        src={current.profilePicUrl}
                        alt={current.personName}
                        className={styles.authorAvatar}
                      />
                    ) : (
                      <div className={styles.authorAvatarPlaceholder}>
                        {current.personName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className={styles.authorInfo}>
                      <p className={styles.authorName}>{current.personName}</p>
                      <p className={styles.authorRole}>
                        {current.position}
                        {current.company && ` · ${current.company}`}
                      </p>
                    </div>
                    {current.linkedinUrl && (
                      <a
                        href={current.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.linkedinLink}
                        aria-label={`${current.personName}'s LinkedIn`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="18"
                          height="18"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  {current.recommendedDate && (
                    <p className={styles.recommendedDate}>
                      {current.recommendedDate}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.controls}>
              <button
                className={styles.navBtn}
                onClick={goPrev}
                aria-label="Previous testimonial"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft />
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

              <span className={styles.counter}>
                {activeIndex + 1} / {testimonials.length}
              </span>

              <button
                className={styles.navBtn}
                onClick={goNext}
                aria-label="Next testimonial"
                disabled={testimonials.length <= 1}
              >
                <ChevronRight />
              </button>
            </div>

            {!isPaused && testimonials.length > 1 && (
              <div className={styles.progressBar}>
                <motion.div
                  key={activeIndex}
                  className={styles.progressFill}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
