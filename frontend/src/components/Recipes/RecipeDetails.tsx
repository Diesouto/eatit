import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';

const RecipeDetails = ({ recipe }) => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, p: 2 }}>
      {/* Recipe Image */}
      <Card>
        {recipe.image && (
          <CardMedia
            component="img"
            height="300"
            image={recipe.image}
            alt={recipe.name}
          />
        )}
      </Card>

      {/* Recipe Information */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          {/* Recipe Name and Rating */}
          <Typography variant="h4" gutterBottom>
            {recipe.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              name="recipe-rating"
              value={recipe.averageRating || 0}
              readOnly
              precision={0.5}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {recipe.averageRating?.toFixed(1) || "No rating"} ({recipe.totalRatings || 0})
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {recipe.description || "No description available."}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Ingredients */}
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients?.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No ingredients listed.
              </Typography>
            )}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Comments */}
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <List>
            {recipe.comments?.length > 0 ? (
              recipe.comments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={comment.text}
                    secondary={`- ${comment.userId?.name || "Anonymous"}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Join Recipe Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => alert("Join Recipe functionality coming soon!")}
          >
            Join Recipe
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetails;
