// src/pages/recipe/Recipe.jsx
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../recipe/Newpages/SearchBar';
import RecipeGrid from '../recipe/Newpages/RecipeGrid';
import RecipeModal from '../recipe/Newpages/RecipeModal';
import useRecipeSearch from '../recipe/hooks/useRecipeSearch';
import axios from 'axios';
import './recipe.css';


const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const API_KEY = '4506e35e-b58c-4e08-bf24-ecb64278ed12';
const Recipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // ✅ Load default recipes on first render
  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      try {
        const res = await axios.get(
          `${API_URL}?search=pasta&key=${API_KEY}`
        );
        setRecipes(res.data?.data?.recipes || []);
      } catch (err) {
        console.error('Default recipe fetch failed:', err);
      }
    };
  
    fetchDefaultRecipes();
  }, []);
  


 
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchTerm}&key=4506e35e-b58c-4e08-bf24-ecb64278ed12`
      );
      setRecipes(res.data?.data?.recipes || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes.');
    }
    setLoading(false);
  };


  return (
<div
  className="recipe-page container d-flex flex-column justify-content-center align-items-center text-center"
  style={{ minHeight: '80vh' }} // paddingTop helps push it below navbar
>
  <p className="d-flex justify-content-center align-items-center flex-wrap  w-100 px-3 fs-3  mt-5">Enter the main Ingridents</p>
  {/* Centered Search Section */}
  <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 w-100 px-3  mt-2">
    <input
      type="text"
      className="form-control form-control-lg"
      style={{ maxWidth: '500px' }}
      placeholder="e.g(chicken,paneer,pasta)..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="btn btn-primary btn-lg" onClick={handleSearch}>
      Search
    </button>
  </div>


  {/* Title and optional description */}
  <div className="mb-4 mt-5">
    <h2>Find Recipes 🍽️</h2>
    <p className="text-muted">Search by keyword to explore delicious meals.</p>
  </div>

  {/* Feedback & Results */}
  {loading && <p>Loading recipes...</p>}
  {error && <p className="text-danger">{error}</p>}

{/* default or searched recipe */}
<RecipeGrid
        recipes={recipes.length > 0 ? recipes : recipes}
        onRecipeClick={setSelectedRecipe}
      />
  {/* Recipe Modal Preview */}
  {selectedRecipe && (
    <RecipeModal
      recipe={selectedRecipe}
      onClose={() => setSelectedRecipe(null)}
      onViewDetails={(id) => navigate(`/recipe-details/${id}`)}
    />
  )}
</div>
  );
};

export default Recipe;
