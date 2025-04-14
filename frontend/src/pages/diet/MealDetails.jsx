// src/pages/MealDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "4506e35e-b58c-4e08-bf24-ecb64278ed12";

const MealDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}?key=${API_KEY}`);
        setRecipe(res.data.data.recipe);
      } catch (err) {
        console.error("Failed to fetch recipe", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;

  return recipe ? (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Img variant="top" src={recipe.image_url} />
        <Card.Body>
          <Card.Title className="mb-3">{recipe.title}</Card.Title>
          <p><strong>Publisher:</strong> {recipe.publisher}</p>
          <ListGroup className="mt-4">
            {recipe.ingredients.map((ing, idx) => (
              <ListGroup.Item key={idx}>
                {ing.quantity || ""} {ing.unit} {ing.description}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  ) : null;
};

export default MealDetails;
