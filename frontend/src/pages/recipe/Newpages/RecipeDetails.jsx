// src/pages/recipe/RecipeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './RecipeDetails.css';

const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const API_KEY = '4506e35e-b58c-4e08-bf24-ecb64278ed12';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/${id}?key=${API_KEY}`);
        setRecipe(res.data.data.recipe);
      } catch (err) {
        setError('Recipe not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading recipe...</div>;
  if (error) {
    return (
      <div className="text-center py-5">
        <h3 className="mb-3 text-danger">{error}</h3>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <Container className="py-5 recipe-detail-page">
      <h2 className="text-center mb-5 fw-bold text-uppercase text-primary">{recipe.title}</h2>

      <Row className="gx-5">
        <Col md={6}>
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: "500px" }}
          />
        </Col>

        <Col md={6}>
          <div className="recipe-info">
            <h4 className="mb-3">🧾 Ingredients</h4>
            <ul className="list-group mb-4">
              {recipe.ingredients?.map((ing, index) => (
                <li className="list-group-item" key={index}>
                  {ing.quantity ? `${ing.quantity} ` : ''}
                  {ing.unit ? `${ing.unit} ` : ''}
                  {ing.description}
                </li>
              ))}
            </ul>

            <p><strong>Publisher:</strong> {recipe.publisher}</p>
            <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <a
          href={recipe.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary me-3"
        >
          View Full Instructions ↗
        </a>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          ← Back to Recipes
        </Button>
      </div>
    </Container>
  );
};

export default RecipeDetails;
