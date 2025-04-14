import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-100">
      {/* Full-width container */}
      <Container fluid className="text-center py-5 px-4">
        {/* Hero Section */}
        <Row className="justify-content-center align-items-center mb-5">
          <Col lg={10}>
            <h1 className="display-4 fw-bold">Welcome to Smart Recipe Maker</h1>
            <p className="lead">
              Find delicious recipes, plan healthy meals, and improve your cooking skills.
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Button as={Link} to="/recipes" variant="primary">
                Find Recipes
              </Button>
              <Button as={Link} to="/diet" variant="success">
                Plan Your Diet
              </Button>
            </div>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="justify-content-center">
          <Col md={3} className="p-4 m-3 border rounded bg-light shadow-sm">
            <h4><i className="bi bi-egg-fried me-2"></i>Discover New Recipes</h4>
            <p>Explore a variety of recipes based on ingredients you have.</p>
          </Col>
          <Col md={3} className="p-4 m-3 border rounded bg-light shadow-sm">
            <h4><i className="bi bi-heart-pulse me-2"></i>Healthy Diet Plans</h4>
            <p>Maintain a balanced diet with our AI-powered meal planner.</p>
          </Col>
          <Col md={3} className="p-4 m-3 border rounded bg-light shadow-sm">
            <h4><i className="bi bi-lightbulb me-2"></i>Get Cooking Tips</h4>
            <p>Learn expert cooking tips and tricks to enhance your skills.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
