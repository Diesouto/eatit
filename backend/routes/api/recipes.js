// routes/api/recipes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Recipe model
const Recipe = require("../../models/Recipe");

// @route   GET api/recipes/
// @desc    Get all recipes/All recipes from cook user
// @access  Public
router.get("/", async (req, res) => {
  const { recipeStatus, chefId } = req.query;
  const filters = {};

  if (recipeStatus) filters.recipeStatus = recipeStatus;
  if (chefId) filters.chefId = new mongoose.Types.ObjectId(chefId);

  try {
    const recipes = await Recipe.find(filters).populate("chefId");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("chefId");
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST api/recipes/
// @desc    Add/save recipe
// @access  Public
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT api/recipes/:id
// @desc    Update recipe by id
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete recipe by id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Receta eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST api/recipes/:id/join
// @desc    Lets a foodie join a recipe
// @access  Public
router.post("/:id/join", async (req, res) => {
  try {
    const { userId } = req.body;
    const recipeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const alreadyParticipant = recipe.participants.some(
      (participant) => participant.userId._id == userId
    );

    if (alreadyParticipant) {
      return res.status(400).json({ message: "User is already a participant" });
    }

    recipe.participants.push({
      userId: new mongoose.Types.ObjectId(userId),
      hasPaid: false,
    });

    await recipe.save();

    res.status(200).json({ message: "User successfully added to recipe" });
  } catch (error) {
    console.error("Error joining recipe:", error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/recipes/:id/is-participant
// @desc    Check if a user is a participant in a recipe
// @access  Public
router.get("/:id/is-participant", async (req, res) => {
  const { userId } = req.query; // Pass userId in the query parameters

  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "participants.userId"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const isParticipant = recipe.participants.some(
      (participant) => participant.userId._id == userId
    );

    res.json({ isParticipant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST api/recipes/:id/remove-participant
// @desc    Remove a user from a recipe
// @access  Public
router.post("/:id/remove-participant", async (req, res) => {
  const { userId } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.participants = recipe.participants.filter(
      (participant) => participant.userId.toString() !== userId
    );

    await recipe.save();

    res.json({ message: "User removed from recipe", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST api/recipes/:id/rate-comment
// @desc    Lets a user rate and comment on a recipe
// @access  Public
router.post("/:id/rate-comment", async (req, res) => {
  const { rating, comment, userId } = req.body;

  if (!rating && !comment) {
    return res.status(400).json({ message: "Rating or comment is required" });
  }

  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const participant = recipe.participants.find((p) => p.userId._id == userId);

    if (!participant) {
      return res.status(403).json({
        message: "You must be a participant to rate or comment on this recipe",
      });
    }

    // Actualizar la puntuación si se proporciona
    if (rating) {
      participant.rating = rating;
    }

    // Actualizar el comentario si se proporciona
    if (comment) {
      participant.comment = comment;
    }

    await recipe.save();

    res.json({
      message: "Rating and/or comment submitted successfully",
      participant,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/recipes/:id/comments
// @desc    Get all comments with ratings and user info for a recipe
// @access  Public
router.get("/:id/comments", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "participants.userId", // Cargar información del usuario
      "name email" // Selecciona los campos relevantes
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Extraer comentarios y puntuaciones de los participantes
    const comments = recipe.participants
      .filter((p) => p.comment || p.rating) // Solo participantes con comentario o puntuación
      .map((p) => ({
        user: {
          id: p.userId._id,
          name: p.userId.name,
          email: p.userId.email,
        },
        comment: p.comment || null,
        rating: p.rating || null,
      }));

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/recipes/:id/ratings
// @desc    Get average rating and total number of ratings for a recipe
// @access  Public
router.get("/:id/ratings", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const ratings = recipe.participants
      .filter((p) => p.rating) // Solo participantes con puntuación
      .map((p) => p.rating);

    if (ratings.length === 0) {
      return res.json({ averageRating: 0, totalRatings: 0 });
    }

    const totalRatings = ratings.length;
    const averageRating =
      ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings;

    res.json({ averageRating, totalRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
