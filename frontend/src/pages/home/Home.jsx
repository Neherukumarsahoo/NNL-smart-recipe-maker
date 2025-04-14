import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import fetchPopularRecipes from "./fetchPopularRecipes"; // Make sure this path is correct
import "./Home.css";

const Home = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      const fetched = await fetchPopularRecipes();
      setPopularRecipes(fetched.slice(0, 8)); // Show top 8 recipes
      setLoading(false);
    };

    loadRecipes();
  }, []);

  return (
    <div className="w-100 py-5  text-white text-center fade-in" style={{backgroundColor:"green"}}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <h1 className="display-4 fw-bold mb-3">
              Your AI-Powered Cooking Companion 🍽️
            </h1>
            <p className="lead mb-4">
              Discover new recipes, plan healthy diets, and enhance your
              cooking skills with Smart Recipe Maker.
            </p>
            <div className="d-flex justify-content-center gap-5 ">
              <Button
                as={Link}
                to="/recipes"
                variant="light"
                className="text-primary hover-scale fw-light buttonabovetwo"
              >
                Explore Recipes
              </Button>
              <Button
                as={Link}
                to="/diet"
                variant="light"
                className="text-primary hover-scale fw-light buttonabovetwo"
              >
                Plan Your Diet
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Smart Features Section */}
      <Container>
        <h2 className="text-center mb-5 fw-bold mt-5">Explore Our Smart Features</h2>
        <Row className="g-4 ">
          {/* Feature Cards */}
          {[
            {
              icon: "bi-egg-fried",
              title: "Discover Recipes",
              desc: "Instantly find recipes using ingredients already in your kitchen.",
              color: "text-primary",
              
            },
            {
              icon: "bi-heart-pulse",
              title: "Healthy Diet Plans",
              desc: "AI-powered meal planning to help you stay fit and energized.",
              color: "text-success",
            },
            {
              icon: "bi-lightbulb",
              title: "Cooking Tips",
              desc: "Learn expert kitchen techniques to boost your culinary skills.",
              color: "text-warning",
            },
            {
              icon: "bi-calendar2-check",
              title: "Meal Calendar",
              desc: "Plan meals for the week and never worry about what to cook again.",
              color: "text-info",
            },
            {
              icon: "bi-robot",
              title: "Smart Suggestions",
              desc: "Get AI-based recipe and diet suggestions tailored to your preferences.",
              color: "text-danger",
            },
            {
              icon: "bi-star-fill",
              title: "Rate & Review",
              desc: "Rate recipes, leave feedback, and explore top-rated meals from others.",
              color: "text-warning",
            },
          ].map((feature, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 text-center shadow-sm hover-scale fade-in " style={{
background:" rgba(255, 255, 255, 0.51)",
borderRadius:"16px",
boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
backdropFilter: "blur(5px)",
webkitbackdropfilter: "blur(5px)",
border: "1px solid rgba(255, 255, 255, 0.3)"}}>
                <Card.Body>
                  <i className={`bi ${feature.icon} display-4 ${feature.color} mb-3`}></i>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Popular Recipes Section */}
      <Container>
        <h2 className="text-center mb-5 fw-bold mt-5">🍽️ Popular Recipes</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Row className="g-5 justify-content-center">
            {popularRecipes.map((recipe) => (
              <Col md={6} lg={3} key={recipe.id}>
                <div
                  className="popular-card"
                  style={{
                    backgroundImage: `url(${recipe.image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    padding: "20px",
                    color: "#fff",
                  }}
                >
                  <div className="popular-card-content bg-dark bg-opacity-50 p-3 rounded">
                    <h5 className="fw-bold">{recipe.title}</h5>
                    <Link to={`/recipe-details/${recipe.id}`}>
                      <Button variant="light" size="sm" className="mt-2">
                        View Recipe
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* CTA Section */}
      <section className="cta-gradient-section text-white text-center">
        <Container className="py-5">
          <h2 className="display-5 fw-bold mb-3">Cook Smart, Eat Smarter</h2>
          <p className="lead mb-4">
            Discover recipes tailored to your ingredients and health goals.
          </p>
          <div className="d-flex justify-content-center gap-5 flex-wrap">
            <Button as={Link} to="/recipes" variant="light" className="px-4 py-2">
              🍳 Browse Recipes
            </Button>
            <Button as={Link} to="/diet" variant="light" className="px-4 py-2">
              🥗 Plan Your Diet
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
