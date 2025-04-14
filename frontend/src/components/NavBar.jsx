import React, { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Image,
  Button
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import defaultAvatar from "./userlogo.jpg";
import logoof from "./logo1.png";
import './NavbarCustom.css';

const NavigationBar = () => {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      const updatedUser = { ...user, image: base64Image };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile image updated!");
    };
    reader.readAsDataURL(file);
  };

  const profilePic = user?.image || defaultAvatar;
  const logotitle = user?.image || logoof;

  return (
    <Navbar expand="lg" className="sticky-top shadow-sm py-3" style={{ backgroundColor: "#7E97AC" }}>
      <Container fluid>
      <Navbar.Brand as={Link} to="/" className="fw-bold text-warning d-flex align-items-center">
      <Image
                  src={logotitle}
                  roundedCircle
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", border: "2px solid #ddd" }}
                className="me-2"
                />
  <span className="xyz">Smart Recipe Maker</span>
</Navbar.Brand>


        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3 fs-5">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active-nav" : ""}>Home</Nav.Link>
            <Nav.Link as={Link} to="/recipes" className={location.pathname === "/recipes" ? "active-nav" : ""}>Recipes</Nav.Link>
            <Nav.Link as={Link} to="/diet" className={location.pathname === "/diet" ? "active-nav" : ""}>Diet</Nav.Link>
            <Nav.Link as={Link} to="/about" className={location.pathname === "/about" ? "active-nav" : ""}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={location.pathname === "/contact" ? "active-nav" : ""}>Contact</Nav.Link>

            {/* Profile Avatar Dropdown */}
            <Dropdown align="end" className="ms-3">
              <Dropdown.Toggle
                as="div"
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={profilePic}
                  roundedCircle
                  width={45}
                  height={45}
                  style={{ objectFit: "cover", border: "2px solid #ddd" }}
                  onClick={() => fileInputRef.current.click()}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow border-0 rounded-3 fadeInDropdown mt-2">
                {user ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile">
                      👤 {user.displayName || "Profile"}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>🚪 Logout</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete your account?")) {
                          localStorage.removeItem("user");
                          setUser(null);
                          toast.success("Account deleted");
                          navigate("/");
                        }
                      }}
                    >
                      ❌ Delete Account
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">🔐 Login</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/signup">📝 Signup</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Logout Button */}
            {user && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogout}
                className="ms-2"
              >
                Logout
              </Button>
            )}

            {/* Hidden File Input for Avatar */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
