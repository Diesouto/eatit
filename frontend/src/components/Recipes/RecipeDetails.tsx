import React from 'react';
import { Link } from 'react-router-dom';
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
  TextField,
} from '@mui/material';


const RecipeDetails = ({
  recipe,
  isParticipant,
  onJoinRecipe,
  onRemoveRecipe,
  comments,
  averageRating,
  userComment,
  userRating,
  setUserComment,
  setUserRating,
  onSubmitComment,
}) => {

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
          <Link to={`/cook/${recipe.chefId._id}`}>
            {recipe.chefId.name}
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              name="recipe-rating"
              value={averageRating || 0}
              readOnly
              precision={0.5}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {averageRating?.toFixed(1) || 'No rating'} ({comments.length || 0})
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {recipe.description || 'No description available.'}
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

          {/* Join Recipe Button */}
          {isParticipant ? (
            <Button variant="outlined" color="secondary" fullWidth onClick={onRemoveRecipe}>
              Remove from Recipe
            </Button>
          ) : (
            <Button variant="contained" color="primary" fullWidth onClick={onJoinRecipe}>
              Join Recipe
            </Button>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Comments Section */}
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <List>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={comment.comment || 'No comment'}
                    secondary={`- ${comment.userId.name} ${comment.rating}/5`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No comments yet. Be the first to comment!</Typography>
            )}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Add/Edit Comment */}
          <Typography variant="h6" gutterBottom>
            Your Comment and Rating
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Leave a comment..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Rating (1-5)"
            value={userRating}
            onChange={(e) => setUserRating(Number(e.target.value))}
            inputProps={{ min: 1, max: 5 }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onSubmitComment}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetails;
