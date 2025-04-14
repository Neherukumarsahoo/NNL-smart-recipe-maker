import React,{ useState } from "react";
import { Container, Row, Col, Button, Card  } from "react-bootstrap";
import { Link } from 'react-router-dom';
import MiniGoalsTracker from "./MiniGoalsTracker"; // adjust path if needed
import HydrationTracker from "./HydrationTracker";
import DietProgressTracker from "./DietProgressTracker";
import "./diet.css";
import breakfastImg from "./breakfast.png";
import lunchImg from "./lunch.png";
import dinnerImg from "./dinner.png";
import snackImg from "./snacks.png";





const mealTypes = [
  { name: "Breakfast", image: breakfastImg },
  { name: "Lunch", image: lunchImg },
  { name: "Dinner", image: dinnerImg },
  { name: "Snack", image: snackImg },
];





const Diet = () => {
  return (
    <div className="diet-hero-wrapper">
      {/* Hero Section */}
      <Container className="text-center text-white diet-hero-section py-5">
        <Row className="justify-content-center align-items-center">
          <Col md={10}>
            <h1 className="diet-hero-title">🥗 Plan Your Perfect Diet</h1>
            <p className="lead mt-3">
              Track meals, set diet goals, and explore healthy food insights.
            </p>
            <Button as={Link} to="/meal-input" variant="light" className="mt-4 px-4 py-2 fw-bold">
              Go to Meal Input Section
            </Button>
          </Col>
        </Row>
      </Container>

     {/* diet progress tracker section */}
      <DietProgressTracker />
{/* Hydration Tracker */}
<HydrationTracker />

{/* meal input section */}

{/* explore by meal type */}
<Container className="my-5">
  <h3 className="text-center mb-4 animate__animated animate__fadeInUp">🍽️ Explore by Meal Type</h3>
  <Row className="g-4 justify-content-center">
    {mealTypes.map((meal, idx) => (
      <Col xs={6} md={3} key={meal.name}>
        <Card className={`shadow-sm text-center p-3 hover-card animate__animated animate__fadeInUp delay-${idx}`}>
          <Card.Img
            variant="top"
            src={meal.image}
            alt={`${meal.name}`}
            style={{ height: "150px", objectFit: "cover", borderRadius: "10px" }}
          />
          <Card.Body>
            <Card.Title>{meal.name}</Card.Title>
            <Link to={`/meal-type/${meal.name.toLowerCase()}`}>
              <Button variant="outline-primary" size="sm" className="mt-2">
                View {meal.name}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>


{/* mini gole checklist */}
<MiniGoalsTracker />



    </div>
  );
};

export default Diet;
