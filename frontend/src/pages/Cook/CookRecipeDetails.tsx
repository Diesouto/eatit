import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, List, ListItem, Avatar } from "@mui/material";
import axios from "axios";

// Components
import { useAppContext } from "../../utils/AppContext";
import RecipeDetails from "../../components/Recipes/RecipeDetails";
import BackButton from "../../components/BackButton";

const CookRecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const [participants, setParticipants] = useState([]);
  const { backendUrl } = useAppContext();
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
    fetchParticipants();
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes/${recipeId}`);
      setRecipe(data);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }
  };

  const fetchParticipants = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/subscriptions/${recipeId}/participants`);
      setParticipants(data);
    } catch (err) {
      console.error("Error fetching participants:", err);
    }
  };

  const onDeleteClick = async () => {
    try {
      await axios.delete(`${backendUrl}/api/recipes/${recipeId}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  if (!recipe.chefId) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="container">
      {/* Header */}
      <BackButton title="Cook Recipe Detail"/>

      {/* Recipe Details */}
      <RecipeDetails recipe={recipe} />

      {/* Participants List */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Currently Joined Users</Typography>
        {participants.length > 0 ? (
          <List>
            {participants.map((participant) => (
              <ListItem key={participant._id}>
                <Avatar>{participant.name[0]}</Avatar>
                <Typography sx={{ ml: 2 }}>{participant.name}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No users have joined this recipe yet.</Typography>
        )}
      </Box>

      {/* Actions */}
      <Box sx={{ mt: 4 }}>
        <button className="btn btn-danger" onClick={onDeleteClick}>
          Delete Recipe
        </button>
        <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-info ml-2">
          Edit Recipe
        </Link>
      </Box>
    </div>
  );
};

export default CookRecipeDetail;
