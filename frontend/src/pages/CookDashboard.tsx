// CookDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from "../utils/AppContext";
import LogoutButton from '../components/LogoutButton';
import { Recipe } from '../types/Recipe';
import CreateRecipe from '../components/Recipes/RecipeForm';
import RecipeList from '../components/Recipes/RecipeList';

const CookDashboard: React.FC = () => {
  const { backendUrl, userId } = useAppContext();
  const [chefId, setChefId] = useState(userId);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/recipes`, {
        params: {
          chefId,
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Handle new recipe creation
  const handleRecipeCreated = (recipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
  };

  return (
    <div className="container">
      <h1>Welcome, Cocinero!</h1>
      <p>Here you can create and manage your recipes.</p>
      <LogoutButton />
      <RecipeList />
    </div>
  );
};

export default CookDashboard;
