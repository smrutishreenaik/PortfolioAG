import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../services/firebase";
import styles from "./Login.module.scss";
import { useAuth } from "../hooks/useAuth";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Redirect if already logged in
  if (currentUser) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to where they wanted to go, or /admin by default
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (err: any) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginShell}>
        <div className={styles.brandPanel}>
          <Link to="/" className={styles.backLink}>
            <FaArrowLeft />
            Back to site
          </Link>
          <div>
            <p className={styles.eyebrow}>Admin Console</p>
            <h1>Welcome back.</h1>
            <p className={styles.lede}>
              Sign in to manage projects, case studies, experience, skills, and
              testimonials.
            </p>
          </div>
          <div className={styles.brandFooter}>
            <span>PortfolioAG</span>
            <span>Secure access</span>
          </div>
        </div>

        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <p className={styles.eyebrow}>Sign in</p>
            <h2>Management Console</h2>
          </div>

          {error && (
            <Alert variant="danger" className={styles.alert}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className={styles.formGroup}>
              <Form.Label>Email</Form.Label>
              <div className={styles.inputWrap}>
                <FaEnvelope />
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className={styles.formControl}
                />
              </div>
            </Form.Group>

            <Form.Group id="password" className={styles.formGroup}>
              <Form.Label>Password</Form.Label>
              <div className={styles.inputWrap}>
                <FaLock />
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={styles.formControl}
                />
              </div>
            </Form.Group>

            <button
              disabled={loading}
              className={styles.submitButton}
              type="submit"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Login;
