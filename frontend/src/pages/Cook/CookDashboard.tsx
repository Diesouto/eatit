// CookDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAppContext } from "../../utils/AppContext";
import LogoutButton from '../../components/LogoutButton';
import { Recipe } from '../../types/Recipe';
import RecipeList from '../../components/Recipes/RecipeList';

const CookDashboard: React.FC = () => {
  const { backendUrl, userId } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API for this Cook
  const fetchRecipes = async () => {
    await axios.get(`${backendUrl}/api/recipes`, {
      params: {
        chefId: userId,
      }
    })
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
      });
  };

  return (
    <div className="container">
      <h1>Welcome, Cocinero!</h1>
      <p>Here you can create and manage your recipes.</p>
      <LogoutButton />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="display-4 text-center">Recipes List</h2>
          </div>
          <div className="col-md-11">
            <Link to="/create-recipe" className="btn btn-outline-warning float-right">
              + Add New Recipe
            </Link>
            <hr />
          </div>
        </div>

        <RecipeList recipes={recipes} />;
      </div>
    </div>
  );
};

export default CookDashboard;
