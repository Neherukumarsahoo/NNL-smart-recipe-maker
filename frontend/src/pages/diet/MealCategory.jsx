// src/components/MealCategory.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import meals from "./mealData.json";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const MealCategory = () => {
  const { mealType } = useParams();
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    const filtered = meals.filter((meal) => meal.type.toLowerCase() === mealType.toLowerCase());
    setFilteredMeals(filtered);
  }, [mealType]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🍽️ {capitalize(mealType)} Recipes</h2>
      {filteredMeals.length === 0 ? (
        <p className="text-center text-muted">No meals found for "{capitalize(mealType)}"</p>
      ) : (
        <Row className="g-4">
          {filteredMeals.map((meal) => (
            <Col key={meal.id} md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={meal.photo}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{meal.emoji} {meal.name}</Card.Title>
                  <Card.Text>Calories: {meal.calories} kcal</Card.Text>
                  <Button
                    as={Link}
                    to={`/meal-details/${meal.id}`}
                    variant="primary"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MealCategory;
