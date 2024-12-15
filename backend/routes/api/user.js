const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");
const Comment = require("../../models/Comment");

// #region FOODIE

// @route   GET api/user/cart
// @desc    Get user's unpaid recipes (cart)
// @access  Private
router.get("/cart", async (req, res) => {
  const { userId } = req.query;

  // Validar que el userId esté presente y sea válido
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  try {
    // Buscar recetas donde el usuario está en participants y no ha pagado
    const recipes = await Recipe.find({
      "participants.userId": userId,
      "participants.hasPaid": false,
    }).populate("chefId");

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ message: error.message });
  }
});

//#endregion

// #region COOK

// @route   GET api/user/cook/:id
// @desc    Get cook detail information
// @access  Private
router.get("/cook/:id", async (req, res) => {
  try {
    const chefId = req.params.id;

    // Buscar la información del cocinero
    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Cocinero no encontrado" });
    }

    // Buscar todas las recetas del cocinero
    const recipes = await Recipe.find({ chefId });

    // Calcular puntuación media
    const totalRatings = recipes.reduce((acc, recipe) => {
      const recipeRating =
        recipe.participants.reduce((sum, p) => sum + (p.rating || 0), 0) /
        (recipe.participants.length || 1);
      return acc + recipeRating;
    }, 0);

    const averageRating =
      recipes.length > 0 ? (totalRatings / recipes.length).toFixed(1) : 0;

    // Obtener precio mínimo de todas sus recetas
    const lowestPrice =
      recipes.length > 0
        ? Math.min(...recipes.map((recipe) => recipe.price || 0))
        : 0;

    res.json({
      name: chef.name,
      location: chef.location || "Desconocida",
      averageRating,
      recipeCount: recipes.length,
      price: lowestPrice,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/user/:id/recipes
// @desc    Get cook recipes with average rating
// @access  Private
router.get("/:id/recipes", async (req, res) => {
  try {
    const chefId = req.params.id;

    // Buscar todas las recetas del cocinero
    const recipes = await Recipe.find({ chefId });

    // Agregar puntuación media y cantidad de reseñas
    const recipesWithRating = recipes.map((recipe) => {
      const totalRating = recipe.participants.reduce(
        (sum, p) => sum + (p.rating || 0),
        0
      );
      const averageRating =
        recipe.participants.length > 0
          ? (totalRating / recipe.participants.length).toFixed(1)
          : 0;

      return {
        id: recipe._id,
        name: recipe.name,
        image: recipe.image || "",
        rating: averageRating,
        reviews: recipe.participants.length,
        price: recipe.price || 0,
      };
    });

    res.json(recipesWithRating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// #endregion

module.exports = router;
