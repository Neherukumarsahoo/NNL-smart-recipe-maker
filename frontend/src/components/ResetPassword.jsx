import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import "./resetpassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // Simulate email format check
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setError("❌ Please enter a valid email address.");
      return;
    }

    // Simulate success
    setSubmitted(true);
    setError("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "green" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-4 rounded-4 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.51)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h4 className="text-center text-white mb-4">🔐 Reset Your Password</h4>

        {submitted && (
          <Alert variant="success">
            ✅ Reset link sent to <strong>{email}</strong>
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleReset}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email Address</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="light" className="w-100">
            Send Reset Link
          </Button>
        </Form>
      </motion.div>
    </Container>
  );
};

export default ResetPassword;
