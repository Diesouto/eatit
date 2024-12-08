const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Recipe model
const Recipe = require("../../models/Recipe");

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

module.exports = router;
