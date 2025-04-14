// src/components/recipe/RecipeModal.jsx
import React from 'react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose, onViewDetails }) => {
  if (!recipe) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-box-custom">
        <button className="btn-close-custom" onClick={onClose}>
          ×
        </button>

        <img src={recipe.image_url} alt={recipe.title} className="modal-img mb-3" />
        <h4>{recipe.title}</h4>
        <p className="text-muted">
          <strong>By:</strong> {recipe.publisher}
        </p>

        <div className="d-flex justify-content-center mt-4 gap-3">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => onViewDetails(recipe.id)}>
            View Full Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
