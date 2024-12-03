import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../utils/AppContext";
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types/Recipe';

const ShowRecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { backendUrl, userId } = useAppContext();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/recipes`, {
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
  }, []);

  const recipeList = recipes.length === 0
    ? 'There are no recipes available!'
    : recipes.map((recipe, index) => <RecipeCard recipe={recipe} key={index} />);

  return (
    <div className="ShowRecipeList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Recipes List</h2>
          </div>

          <div className="col-md-11">
            <Link to="/create-recipe" className="btn btn-outline-warning float-right">
              + Add New Recipe
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className="list">{recipeList}</div>
      </div>
    </div>
  );
};

export default ShowRecipeList;
