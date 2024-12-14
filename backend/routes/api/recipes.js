const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipe = require("../../models/Recipe");

// Get all recipes or filter by status/chefId
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

// Get recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("chefId");
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update recipe
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

// Delete recipe
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Receta eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
