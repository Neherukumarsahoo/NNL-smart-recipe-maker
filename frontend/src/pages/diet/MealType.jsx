// src/pages/MealType.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import "./MealType.css"; // Ensure you have this CSS file for styling	
const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "4506e35e-b58c-4e08-bf24-ecb64278ed12";

const MealType = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${API_URL}?search=${type}&key=${API_KEY}`);
        setRecipes(response.data.data.recipes || []);
      } catch (err) {
        console.error("Error fetching recipes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [type]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">{type} Recipes</h2>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Row className="g-4">
          {recipes.map((recipe) => (
            <Col md={4} key={recipe.id}>
              <Card className="shadow-sm">
<Card.Img
  variant="top"
  src={recipe.image_url}
  alt={recipe.title}
  className="meal-image"
/>

                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Link to={`/meal/${recipe.id}`}>
                    <Button variant="primary">View Recipe</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MealType;
