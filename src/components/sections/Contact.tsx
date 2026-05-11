import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import React, { useState } from "react";
import styles from "./Contact.module.scss";

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 4.5L8 9l6.5-4.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
    <path
      d="M4.5 7v5M7 12V9a2 2 0 014 0v3M7 7v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

type SubmitState = "idle" | "sending" | "sent" | "error";

const contactEmail = "smrutishreenaik@gmail.com";
const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact: React.FC = () => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const resetStatus = (state: SubmitState, message: string) => {
    setSubmitState(state);
    setStatusMessage(message);
    setTimeout(() => {
      setSubmitState("idle");
      setStatusMessage("");
    }, 4500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitState !== "idle") return;

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      resetStatus("error", "Email service is not configured yet. Please use the email link on the left for now.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fromName = formData.get("from_name");
    const fromEmail = formData.get("from_email");
    const message = formData.get("message");

    setSubmitState("sending");
    setStatusMessage("");

    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          name: fromName,
          email: fromEmail,
          message,
        },
        {
          publicKey: emailJsPublicKey,
        },
      );

      form.reset();
      resetStatus("sent", "Message sent. I will get back to you soon.");
    } catch (error) {
      const message =
        error instanceof EmailJSResponseStatus
          ? `Email failed to send: ${error.text}`
          : "Email failed to send. Please use the email link on the left for now.";

      resetStatus("error", message);
    }
  };

  const buttonLabel =
    submitState === "sending" ? "Sending..." : submitState === "sent" ? "Message Sent!" : "Send Message";

  const buttonStyle: React.CSSProperties =
    submitState === "sending"
      ? { opacity: 0.7 }
      : submitState === "sent"
        ? { background: "#3d9e6a" }
        : submitState === "error"
          ? { background: "#b83232" }
          : {};

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactWrap}>
        <div>
          <div className={styles.contactEyebrow}>Contact</div>
          <div className={styles.contactTitle}>Ready to build something great?</div>
          <div className={styles.contactSub}>
            A short conversation to understand your needs and see where we can create the most impact together.
          </div>
          <div className={styles.contactInfo}>
            <a href={`mailto:${contactEmail}`}>
              <EmailIcon />
              {contactEmail}
            </a>
            <a href="https://linkedin.com/in/smrutishreenaik" target="_blank" rel="noreferrer">
              <LinkedInIcon />
              linkedin.com/in/smrutishreenaik
            </a>
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="contact-name">FULL NAME</label>
            <input id="contact-name" name="from_name" type="text" placeholder="e.g. Alex Carter" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact-email">EMAIL</label>
            <input id="contact-email" name="from_email" type="email" placeholder="alex@company.com" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact-message">MESSAGE</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me about the role or project..."
              required
            />
          </div>
          <button type="submit" className={styles.formSubmit} style={buttonStyle} disabled={submitState !== "idle"}>
            {buttonLabel}
          </button>
          {statusMessage && (
            <p className={`${styles.formStatus} ${submitState === "error" ? styles.error : styles.success}`}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
