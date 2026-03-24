import React, { useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Testimonials.module.scss";
import { Testimonial } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion, useScroll, useTransform } from "framer-motion";

const Testimonials: React.FC = () => {
  const {
    data: testimonials,
    loading,
    error,
  } = useCollection<Testimonial>("testimonials");

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      ref={sectionRef}
    >
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          What People <span>Say</span>
        </motion.h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "#7c3aed" }} />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load testimonials.
          </p>
        ) : (
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <span className={styles.quoteIcon}>"</span>
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
                  <div>
                    <p className={styles.authorName}>
                      {testimonial.personName}
                    </p>
                    <p className={styles.authorRole}>
                      {testimonial.position} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Testimonials;
