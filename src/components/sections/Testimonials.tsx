import React from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "./Testimonials.module.scss";
import { Testimonial } from "../../types";
import { useCollection } from "../../hooks/useCollection";
import { motion } from "framer-motion";

const Testimonials: React.FC = () => {
  const {
    data: testimonials,
    loading,
    error,
  } = useCollection<Testimonial>("testimonials");

  return (
    <section className={styles.testimonialsSection} id="testimonials">
      <Container>
        <motion.h2
          className="display-5 fw-bold mb-5 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Words From Clients
        </motion.h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p className="text-center text-danger">
            Failed to load testimonials: {error}
          </p>
        ) : (
          <div className={styles.testimonialsGrid}>
            {testimonials.map((test, i) => (
              <motion.div
                key={test.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 60, scale: 0.85, rotate: -4 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.75,
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="mb-4 text-warning">{"★".repeat(5)}</div>
                <p className="fst-italic flex-grow-1 lead">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <hr className="my-4 border-secondary opacity-25" />
                <div className="d-flex align-items-center">
                  {test.profilePicUrl && (
                    <img
                      src={test.profilePicUrl}
                      alt={test.personName}
                      className={styles.avatar}
                    />
                  )}
                  <div>
                    <h4 className="h6 fw-bold mb-0">
                      {test.linkedinUrl ? (
                        <a
                          href={test.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white text-decoration-none"
                        >
                          {test.personName}
                        </a>
                      ) : (
                        test.personName
                      )}
                    </h4>
                    <div className="small text-muted">
                      {test.position} at {test.company}
                    </div>
                    {test.recommendedDate && (
                      <div
                        className="small text-muted mt-1"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {test.recommendedDate}
                      </div>
                    )}
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
