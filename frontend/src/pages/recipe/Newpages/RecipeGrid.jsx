// src/components/recipe/RecipeGrid.jsx
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onRecipeClick }) => {
  if (!recipes || recipes.length === 0) {
    return <div className="text-muted text-center">No recipes found.</div>;
  }

  return (
    <div className="row">
      {recipes.map((recipe) => (
        <div className="col-md-4 mb-4" key={recipe.id}>
          <RecipeCard recipe={recipe} onClick={onRecipeClick} />
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
