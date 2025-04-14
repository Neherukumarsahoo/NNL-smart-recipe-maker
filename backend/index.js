// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Neheru@088',
    database: 'recipe_db'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Sample route to test API
app.get('/', (req, res) => {
    res.send('Smart Recipe Maker API is running');
});

// Route to add a new recipe
app.post('/add-recipe', asyncHandler(async (req, res) => {
    const { name, description, steps, ingredients } = req.body;
    if (!name || !ingredients || ingredients.length === 0) {
        return res.status(400).json({ message: 'Recipe name and ingredients are required' });
    }

    db.query('INSERT INTO recipes (name, description, steps) VALUES (?, ?, ?)', [name, description, steps], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding recipe', error: err });
        
        const recipeId = result.insertId;
        ingredients.forEach(ingredient => {
            db.query('INSERT INTO ingredients (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)', [ingredient], (err, result) => {
                if (err) return;
                const ingredientId = result.insertId;
                db.query('INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)', [recipeId, ingredientId]);
            });
        });
        res.status(201).json({ message: 'Recipe added successfully' });
    });
}));

// Route to fetch recipes based on ingredients
app.get('/recipes', asyncHandler(async (req, res) => {
    const { ingredients } = req.query;
    if (!ingredients) {
        return res.status(400).json({ message: 'Please provide ingredients' });
    }

    const ingredientList = ingredients.split(',');
    const placeholders = ingredientList.map(() => '?').join(',');

    const query = `SELECT DISTINCT recipes.* FROM recipes 
                   JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id 
                   JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id 
                   WHERE ingredients.name IN (${placeholders})`;

    db.query(query, ingredientList, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching recipes', error: err });
        res.json(results);
    });
}));

// Add review to a recipe
app.post('/recipes/:id/review', asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const recipeId = req.params.id;

    db.query(
        'INSERT INTO reviews (recipe_id, rating, comment) VALUES (?, ?, ?)',
        [recipeId, rating, comment],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error adding review', error: err });
            res.status(201).json({ message: 'Review added successfully' });
        }
    );
}));

// Get recipe with reviews
app.get('/recipes/:id', asyncHandler(async (req, res) => {
    const recipeId = req.params.id;

    const recipeQuery = `SELECT * FROM recipes WHERE id = ?`;
    const ingredientQuery = `
        SELECT i.name FROM ingredients i 
        JOIN recipe_ingredients ri ON i.id = ri.ingredient_id 
        WHERE ri.recipe_id = ?
    `;
    const reviewQuery = `SELECT rating, comment FROM reviews WHERE recipe_id = ?`;

    db.query(recipeQuery, [recipeId], (err, recipeResults) => {
        if (err || recipeResults.length === 0) {
            return res.status(500).json({ message: "Recipe not found", error: err });
        }

        const recipe = recipeResults[0];

        db.query(ingredientQuery, [recipeId], (err, ingredientsResults) => {
            if (err) return res.status(500).json({ message: "Error fetching ingredients" });

            db.query(reviewQuery, [recipeId], (err, reviewResults) => {
                if (err) return res.status(500).json({ message: "Error fetching reviews" });

                res.json({
                    id: recipe.id,
                    name: recipe.name,
                    description: recipe.description,
                    image: recipe.image,
                    steps: recipe.steps,
                    ingredients: ingredientsResults.map(i => i.name),
                    reviews: reviewResults
                });
            });
        });
    });
}));


// Update recipe
app.put('/recipes/:id', asyncHandler(async (req, res) => {
    const { name, description, steps, image } = req.body;
    const recipeId = req.params.id;

    db.query(
        'UPDATE recipes SET name = ?, description = ?, steps = ?, image = ? WHERE id = ?',
        [name, description, steps, image, recipeId],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Error updating recipe' });
            res.json({ message: 'Recipe updated successfully' });
        }
    );
}));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
