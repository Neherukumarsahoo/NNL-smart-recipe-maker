import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./diet.css";

const mealTypes = [
  { name: "Breakfast", bg: "url(https://images.unsplash.com/photo-1508739826987-b79cd8b7da12?auto=format&fit=crop&w=500&h=500)" },
  { name: "Lunch", bg: "url(https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=500&h=500)" },
  { name: "Dinner", bg: "url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&h=500)" },
  { name: "Snack", bg: "url(https://images.unsplash.com/photo-1589308078054-832d0fa2c1f5?auto=format&fit=crop&w=500&h=500)" },
];

const ExploreByMealType = () => {
  const navigate = useNavigate();6

  return (
    <Container className="my-5">
      <h3 className="text-center mb-1 animate__animated animate__fadeInUp">🍽️ Explore by Meal Type</h3>
      <Row className="g-4 justify-content-center">
        {mealTypes.map((type, idx) => (
          <Col xs={12} sm={6} md={3} key={type.name}>
            <Card
              className={`meal-type-card animate__animated animate__fadeInUp delay-${idx}`}
              style={{
                backgroundImage: type.bg,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px",
                borderRadius: "12px",
                position: "relative",
                color: "#fff",
                overflow: "hidden",
              }}
            >
              <div className="meal-overlay d-flex flex-column justify-content-center align-items-center h-100 text-white p-3 text-center">
                <h4>{type.name}</h4>
                <Button variant="light" className="mt-2" onClick={() => navigate(`/category/${type.name.toLowerCase()}`)}>
                  View {type.name}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreByMealType;
