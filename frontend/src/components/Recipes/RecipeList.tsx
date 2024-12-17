import React from 'react';
import RecipeCard from './RecipeCard';
import CartItem from '../Cart/CartItem';
import { Recipe } from '../../types/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
  useCartView?: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, useCartView = false }) => {
  if(useCartView && !recipes || recipes.length === 0) {
    return <p>No has añadido recetas al carro.</p>;
  }
  if (!recipes || recipes.length === 0) {
    return <p>No hay recetas disponibles en este momento.</p>;
  }

  const recipeList = recipes.map((recipe) =>
    useCartView ? (
      <CartItem recipe={recipe} key={recipe._id} />
    ) : (
      <RecipeCard recipe={recipe} key={recipe._id} />
    )
  );

  return (
    <div className="container">
      <div className="row">{recipeList}</div>
    </div>
  );
};

export default RecipeList;