import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types/Recipe';

interface ShowRecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<ShowRecipeListProps> = ({ recipes }) => {
  const recipeList = recipes.length === 0
    ? 'There are no recipes available!'
    : recipes.map((recipe, index) => <RecipeCard recipe={recipe} key={index} />);

  return (
    <div className="container">
      <div className="row flex-row flex-nowrap">{recipeList}{recipeList}{recipeList}</div>
    </div>
  );
};

export default RecipeList;