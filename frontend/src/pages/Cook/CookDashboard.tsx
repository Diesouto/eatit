import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Typography, Box } from "@mui/material";
import { Link } from 'react-router-dom';

// Components
import { useAppContext } from "../../utils/AppContext";
import { Recipe } from "../../types/Recipe";
import RecipeList from "../../components/Recipes/RecipeList";
import RecipeForm from "../../components/Recipes/RecipeForm"; // Assuming you have a RecipeForm component

const CookDashboard: React.FC = () => {
  const { backendUrl, userId } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API for this Cook
  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes`, {
        params: { chefId: userId },
      });
      setRecipes(data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  // Toggle modal for adding new recipe
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="container">
      <h1>Welcome, Cocinero!</h1>
      <p>Here you can create and manage your recipes.</p>

      <div className="row">
        <div className="col-md-12">
          <h2 className="display-4 text-center">Recipes List</h2>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12 text-right">
          <Button
            variant="outlined"
            color="warning"
            onClick={handleOpenModal}
          >
            + Add New Recipe
          </Button>
        </div>
      </div>

      <RecipeList recipes={recipes} />

      {/* Modal for adding a new recipe */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-recipe-modal"
        aria-describedby="modal-to-add-new-recipe"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Recipe
          </Typography>
          <RecipeForm onClose={handleCloseModal} fetchRecipes={fetchRecipes} />
        </Box>
      </Modal>

      {/* Navigation */}
      <div className="mt-4">
        <nav>
          <ul>
            <li>
              <Link to="/cook/dashboard">Base Page</Link>
            </li>
            <li>
              <Link to="/cook/config">Config</Link>
            </li>
            <li>
              <Link to="/cook/orders">Orders</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CookDashboard;
