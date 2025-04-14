// Signup.jsx
import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userProfile = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      profileImage: selectedImage ? URL.createObjectURL(selectedImage) : "",
    };

    // Save user data to localStorage
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
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
        <h3 className="text-white mb-4 text-center">Sign Up</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Phone</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-white">Profile Image (Optional)</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Sign Up</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
