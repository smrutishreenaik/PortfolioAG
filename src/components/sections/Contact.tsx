import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("sending");
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <section className={styles.contactSection} id="contact">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className={styles.formContainer}>
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
                <p className="lead text-muted">
                  Ready to discuss your next project? Drop a message below.
                </p>
              </div>

              {status === "success" && (
                <Alert variant="success">
                  Your message was sent successfully!
                </Alert>
              )}
              {status === "error" && (
                <Alert variant="danger">
                  Failed to send message. Please try again.
                </Alert>
              )}

              <Form ref={form} onSubmit={sendEmail}>
                <Form.Group className="mb-4" controlId="user_name">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_name"
                    placeholder="John Doe"
                    required
                    className={styles.formInput}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="user_email">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="user_email"
                    placeholder="john@example.com"
                    required
                    className={styles.formInput}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="message">
                  <Form.Label className="fw-bold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="How can I help you?"
                    required
                    className={styles.formInput}
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-lg"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
