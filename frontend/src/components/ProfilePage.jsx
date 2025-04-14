import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import defaultAvatar from "./default profile picture.png";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect if not logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // ✅ Load user profile from localStorage
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile({
        name: storedProfile.name,
        email: storedProfile.email,
        phone: storedProfile.phone,
        photoURL: storedProfile.profileImage || defaultAvatar,
      });
      setName(storedProfile.name);
      setPhone(storedProfile.phone);
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, photoURL: imageUrl }));

    // Save updated image to localStorage
    const updatedProfile = { ...profile, profileImage: imageUrl };
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const handleUpdate = () => {
    const updatedProfile = { ...profile, name, phone };
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  if (!profile) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-4 shadow-lg rounded-4"
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
        <div className="text-center mb-4">
          <img
            src={profile.photoURL || defaultAvatar}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-profile-pic"
              ref={fileInputRef}
            />
            <label htmlFor="upload-profile-pic" className="btn btn-outline-primary btn-sm">
              Change Image
            </label>
          </div>
        </div>

        <h4 className="text-center text-white">{profile.name}</h4>
        <p className="text-center text-white-50"><strong>Email:</strong> {profile.email}</p>
        <p className="text-center text-white-50"><strong>Phone:</strong> {profile.phone}</p>

        {showAlert && (
          <Alert variant="success" className="text-center">
            ✅ Profile updated!
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Full Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control type="email" value={profile.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Phone</Form.Label>
            <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>

          <Button variant="light" className="w-100 mb-2" onClick={handleUpdate}>
            Save Changes
          </Button>
          <Button variant="outline-light" className="w-100" href="/reset-password">
            🔒 Reset Password
          </Button>
        </Form>
      </motion.div>
    </Container>
  );
};

export default ProfilePage;
