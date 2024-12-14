import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../../types/Recipe';
import { useAppContext } from '../../utils/AppContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const handleClick = () => {
    const route =
      userRole === 'foodie'
        ? `/recipes/foodie/${recipe._id}`
        : `/recipes/cook/${recipe._id}`;

    navigate(route);
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className='col-4 mx-2 my-3'
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <CardMedia
        sx={{ height: 176 }}
        image={recipe.image}
      />
      <CardContent>
        <section className="d-flex justify-content-between">
          <p>{recipe.chefId?.name}</p>
          <p>rating</p>
        </section>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <p className="card-text">{recipe.description}</p>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
