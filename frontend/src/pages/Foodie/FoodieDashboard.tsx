import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from "../../utils/AppContext";
import LogoutButton from '../../components/LogoutButton';
import { Recipe } from '../../types/Recipe';
import RecipeList from '../../components/Recipes/RecipeList';
import Navbar from '../../components/Navigation';

const FoodieDashboard = () => {
  const { backendUrl } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API for this Cook
  const fetchRecipes = async () => {
    await axios.get(`${backendUrl}/api/recipes`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Welcome, Foodie!</h1>
        <p>Here you can explore and join recipes.</p>
        <LogoutButton />

        <div className="container">
          <RecipeList recipes={recipes} />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default FoodieDashboard;
