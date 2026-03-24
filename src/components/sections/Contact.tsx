import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        setStatus("success");
        formRef.current?.reset();
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section className={styles.contactSection} id="contact" ref={sectionRef}>
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Get In <span>Touch</span>
        </motion.h2>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to discuss your next project? Drop a message below.
        </motion.p>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === "success" && (
            <p
              style={{
                color: "#7c3aed",
                fontWeight: 600,
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              ✓ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p
              style={{
                color: "#ff6b6b",
                fontWeight: 600,
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Failed to send. Please try again.
            </p>
          )}

          <form ref={formRef} onSubmit={sendEmail}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  required
                  className={styles.formControl}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  required
                  className={styles.formControl}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Message</label>
              <textarea
                name="message"
                placeholder="How can I help you?"
                required
                className={styles.formControl}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
