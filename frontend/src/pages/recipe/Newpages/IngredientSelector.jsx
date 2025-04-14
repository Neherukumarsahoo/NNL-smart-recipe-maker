// src/components/recipe/IngredientSelector.jsx
import React from 'react';
import ingredientsData from '../data/ingredientsData';
import './IngredientSelector.css';

const IngredientSelector = ({ selected, setSelected }) => {
  const toggleIngredient = (ingredient) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="ingredient-selector p-3">
      <h5 className="mb-3 text-uppercase">Select Ingredients</h5>

      {Object.keys(ingredientsData).map((category) => (
        <div key={category} className="mb-4">
          <h6 className="text-muted text-uppercase">{category}</h6>
          <div className="d-flex flex-wrap gap-2">
            {ingredientsData[category].map((item) => (
              <button
                key={item}
                className={`btn btn-sm ingredient-btn ${
                  selected.includes(item) ? 'selected' : ''
                }`}
                onClick={() => toggleIngredient(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientSelector;
