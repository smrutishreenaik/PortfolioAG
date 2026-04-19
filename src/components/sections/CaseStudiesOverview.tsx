import React, { useRef } from "react";
import styles from "./CaseStudiesOverview.module.scss";
import { Testimonial } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const CaseStudiesOverview: React.FC = () => {
  const { data: testimonials, loading, error } = useCollection<Testimonial>("testimonials");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="casestudy" className={styles.casestudySection} ref={sectionRef}>
      <div className={styles.sectionWrap}>
        <motion.div className={styles.floatingOrb} style={{ y: floatY }} />

        <div className={styles.headerBlock}>
          <div className={styles.sectionEyebrow}>Kind Words</div>
          <div className={styles.sectionTitle}>
            What people <span>say about me</span>
          </div>
          <div className={styles.sectionSub}>
            Feedback from colleagues and clients I've had the pleasure to work with.
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        ) : error ? (
          <p className={styles.errorText}>Failed to load testimonials.</p>
        ) : testimonials.length === 0 ? (
          <p className={styles.emptyText}>No testimonials yet.</p>
        ) : (
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <span className={styles.quoteIcon}>"</span>
                <p className={styles.quoteText}>{testimonial.quote}</p>
                <div className={styles.divider} />
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
                      {testimonial.position}
                      {testimonial.company && ` · ${testimonial.company}`}
                    </p>
                  </div>
                  {testimonial.linkedinUrl && (
                    <a
                      href={testimonial.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.linkedinLink}
                      aria-label={`${testimonial.personName}'s LinkedIn`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesOverview;
