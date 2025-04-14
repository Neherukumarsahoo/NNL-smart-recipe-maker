import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          {/* Page Links */}
          <Col md={4} sm={12}>
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/recipes" className="footer-link">Recipes</Link></li>
              <li><Link to="/diet" className="footer-link">Diet</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </Col>

          {/* Social Links */}
          <Col md={4} sm={12}>
            <h5>Connect With Us</h5>
            <ul className="social-icons list-unstyled gap-3">
  <li>
    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-link col-md-12">
      <FontAwesomeIcon icon={faFacebook} size="lg" />  <span className="px-3">Facebook </span>
    </a>  
  </li>
  <li>
    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link col-md-12">
      <FontAwesomeIcon icon={faInstagram} size="lg" />  <span className="px-3">Instagram </span>
    </a> 
  </li>
  <li>
    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-link col-md-12">
      <FontAwesomeIcon icon={faTwitter} size="lg" /> <span className="px-3">Twitter </span>
    </a> 
  </li>
  <li>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link col-md-12">
      <FontAwesomeIcon icon={faLinkedin} size="lg" />  <span className="px-3">Linkedin </span>
    </a>
  </li>
</ul>

          </Col>

          {/* Address */}
          <Col md={4} sm={12}>
            <h5>Address</h5>
            <p>Smart Recipe Maker</p>
            <p>Laden's Home, Bhubaneswar, Odisha</p>
            <p>Email: neherukumar1@gmail.com</p>
            <p>Phone: +91-8260840527</p>
          </Col>
        </Row>
        <div className="footer-bottom mt-4">
          © {new Date().getFullYear()} Smart Recipe Maker. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
