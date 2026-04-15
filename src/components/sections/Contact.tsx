import React, { useState } from "react";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  const [btnText, setBtnText] = useState("Send Message");
  const [op, setOp] = useState(1);
  const [bg, setBg] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setBtnText("Sending...");
    setOp(0.7);
    setTimeout(() => {
      setBtnText("✓ Message Sent!");
      setBg("#3d9e6a");
      setOp(1);
      setTimeout(() => {
        setBtnText("Send Message");
        setBg("");
      }, 3000);
    }, 1200);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactWrap}>
        <div>
          <div className={styles.contactEyebrow}>Contact</div>
          <div className={styles.contactTitle}>
            Ready to build something great?
          </div>
          <div className={styles.contactSub}>
            A short conversation to understand your needs and see where we can
            create the most impact together.
          </div>
          <div className={styles.contactInfo}>
            <a href="mailto:smrutishreenaik@gmail.com">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1.5"
                  y="3"
                  width="13"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M1.5 4.5L8 9l6.5-4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              smrutishreenaik@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/smrutishreenaik"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="14"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
                <path
                  d="M4.5 7v5M7 12V9a2 2 0 014 0v3M7 7v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              linkedin.com/in/smrutishreenaik
            </a>
          </div>
        </div>

        <div className={styles.contactForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>FULL NAME</label>
              <input type="text" placeholder="e.g. Alex Carter" />
            </div>
            <div className={styles.formGroup}>
              <label>COMPANY NAME</label>
              <input type="text" placeholder="e.g. Nova Labs" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>WORK EMAIL</label>
            <input type="email" placeholder="alex@company.com" />
          </div>
          <div className={styles.formGroup}>
            <label>MESSAGE</label>
            <textarea placeholder="Tell me about the role or project..."></textarea>
          </div>
          <button
            className={styles.formSubmit}
            style={{ opacity: op, background: bg || undefined }}
            onClick={handleSubmit}
          >
            {btnText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
