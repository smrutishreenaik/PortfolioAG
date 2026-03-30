import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrubLetter = ({ char, progress, index }: any) => {
  // Title animates early during the section scroll (10% to 30%)
  const start = 0.1 + index * 0.015;
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const y = useTransform(progress, [start, start + 0.05], [20, 0]);
  return (
    <motion.span style={{ opacity, y, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const ScrubInput = ({ children, progress, index, className }: any) => {
  // Inputs animate mid-way through the section scroll (30% to 60%)
  const start = 0.3 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.1], [40, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "1 0"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  // Overall form wrapper background / container fade
  const wrapperOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const wrapperY = useTransform(scrollYProgress, [0.2, 0.4], [60, 0]);

  // Subtitle fade
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.15, 0.25], [20, 0]);

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

  const titlePart1 = "Get In ".split("");
  const titlePart2 = "Touch".split("");

  return (
    <section className={styles.contactSection} id="contact" ref={sectionRef}>
      <motion.div className={styles.backgroundOrb} style={{ y: orbY }} />

      <Container>
        <h2 className={styles.sectionTitle}>
          {titlePart1.map((char, i) => (
            <ScrubLetter
              key={`p1-${i}`}
              char={char}
              index={i}
              progress={scrollYProgress}
            />
          ))}
          <span>
            {titlePart2.map((char, i) => (
              <ScrubLetter
                key={`p2-${i}`}
                char={char}
                index={titlePart1.length + i}
                progress={scrollYProgress}
              />
            ))}
          </span>
        </h2>

        <motion.p
          className={styles.sectionSubtitle}
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Ready to discuss your next project? Drop a message below.
        </motion.p>

        <motion.div
          className={styles.formWrapper}
          style={{ opacity: wrapperOpacity, y: wrapperY }}
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
              <ScrubInput
                progress={scrollYProgress}
                index={0}
                className={styles.formGroup}
              >
                <label className={styles.formLabel}>Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  required
                  className={styles.formControl}
                />
              </ScrubInput>
              <ScrubInput
                progress={scrollYProgress}
                index={1}
                className={styles.formGroup}
              >
                <label className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  required
                  className={styles.formControl}
                />
              </ScrubInput>
            </div>

            <ScrubInput
              progress={scrollYProgress}
              index={2}
              className={styles.formGroup}
            >
              <label className={styles.formLabel}>Message</label>
              <textarea
                name="message"
                placeholder="How can I help you?"
                required
                className={styles.formControl}
              />
            </ScrubInput>

            <ScrubInput
              progress={scrollYProgress}
              index={3}
              className={styles.submitBtn}
            >
              <button
                type="submit"
                className="btn w-100 text-white fw-bold"
                style={{ background: "transparent", border: "none" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </ScrubInput>
          </form>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
