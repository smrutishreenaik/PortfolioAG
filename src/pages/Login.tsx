import React, { useState } from "react";
import { Container, Form, Card, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../services/firebase";
import styles from "./Login.module.scss";
import { useAuth } from "../hooks/useAuth";

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
    <Container className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Card.Body>
          <h2 className="text-center mb-4 text-white">Admin Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label className="text-white-50">Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white"
              />
            </Form.Group>

            <Form.Group id="password" className="mb-4">
              <Form.Label className="text-white-50">Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white"
              />
            </Form.Group>

            <button
              disabled={loading}
              className="w-100 btn btn-primary"
              type="submit"
            >
              Log In
            </button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
