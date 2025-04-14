// Login.jsx
import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      setError("Invalid credentials");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/profile");
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh",backgroundColor:"green" }}>
      <div className="glass-card p-4 rounded-4 shadow-lg w-100" style={{
          background: "rgba(255, 255, 255, 0.51)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}>
        <h3 className="text-white mb-4 text-center">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100" variant="primary">Login</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
