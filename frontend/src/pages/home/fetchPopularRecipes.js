import axios from "axios";

const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "4506e35e-b58c-4e08-bf24-ecb64278ed12";

const fetchPopularRecipes = async () => {
  try {
    // Step 1: Fetch a list of recipes based on a search query
    const response = await axios.get(`${API_URL}?search=pasta&key=${API_KEY}`);
    const recipes = response.data?.data?.recipes || [];

    // Step 2: For each recipe, fetch detailed information
    const detailedRecipesPromises = recipes.slice(0, 4).map(async (recipe) => {
      const detailResponse = await axios.get(`${API_URL}/${recipe.id}?key=${API_KEY}`);
      return detailResponse.data?.data?.recipe;
    });

    // Wait for all detailed recipe fetches to complete
    const detailedRecipes = await Promise.all(detailedRecipesPromises);

    return detailedRecipes;
  } catch (error) {
    console.error("Failed to fetch popular recipes:", error);
    return [];
  }
};

export default fetchPopularRecipes;
