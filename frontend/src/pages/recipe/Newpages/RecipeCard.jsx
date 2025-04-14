// src/components/recipe/RecipeCard.jsx
import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="card recipe-card h-100 shadow-sm" onClick={() => onClick(recipe)}>
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text text-muted mb-2">
          <strong>By:</strong> {recipe.publisher}
        </p>
        <button className="btn btn-outline-primary btn-sm mt-auto">View Details</button>
      </div>
    </div>
  );
};

export default RecipeCard;
