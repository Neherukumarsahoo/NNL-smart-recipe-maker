// src/hooks/useRecipeSearch.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const API_KEY = '4506e35e-b58c-4e08-bf24-ecb64278ed12'; // replace this with your actual API key

const useRecipeSearch = (query, selectedIngredients = []) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query && selectedIngredients.length === 0) return;

    const fetchRecipes = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await axios.get(`${API_URL}?search=${query}&key=${API_KEY}`);
        const data = res.data.data.recipes;

        // Optionally filter by selected ingredients
        const filtered = selectedIngredients.length
          ? data.filter((recipe) =>
              selectedIngredients.every((ing) =>
                recipe.title.toLowerCase().includes(ing.toLowerCase())
              )
            )
          : data;

        setRecipes(filtered);
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query, selectedIngredients]);

  return { recipes, loading, error };
};

export default useRecipeSearch;
