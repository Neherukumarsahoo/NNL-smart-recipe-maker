import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./mealInput.css";

const MealInput = () => {
  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState("Breakfast");
  const [calories, setCalories] = useState("");
  const [meals, setMeals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
    setMeals(storedMeals);
  }, []);

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  const addMeal = () => {
    if (!mealName.trim() || !calories.trim()) return;
    const newMeal = {
      id: Date.now(),
      name: mealName,
      category: mealCategory,
      calories,
    };
    setMeals([...meals, newMeal]);
    setMealName("");
    setCalories("");
  };

  const deleteMeal = (id) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
  };

  const editMeal = (id) => {
    const meal = meals.find((m) => m.id === id);
    if (meal) {
      setMealName(meal.name);
      setMealCategory(meal.category);
      setCalories(meal.calories);
      deleteMeal(id); // Remove the old one so it can be replaced
    }
  };

  return (
    <Container className="meal-input-container py-5">
      <h2 className="text-center mb-4">Meal Input Section</h2>
      <Row className="justify-content-center mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={mealCategory}
            onChange={(e) => setMealCategory(e.target.value)}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={addMeal}>Add Meal</Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="primary" onClick={() => navigate("/calendar")}>
            View Full Meal Calendar
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {meals.length > 0 ? (
            <Table bordered hover className="meal-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Meal</th>
                  <th>Category</th>
                  <th>Calories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, idx) => (
                  <tr key={meal.id}>
                    <td>{idx + 1}</td>
                    <td>{meal.name}</td>
                    <td>{meal.category}</td>
                    <td>{meal.calories}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => editMeal(meal.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteMeal(meal.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No meals added yet.</p>
          )}
        </Col>
      </Row>
      
    </Container>
  );
};

export default MealInput;
