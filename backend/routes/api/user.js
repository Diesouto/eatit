const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");
const Comment = require("../../models/Comment");
const Address = require("../../models/Address");

// @route   GET /api/user/:userId/default-address
// @desc    Obtener la dirección predeterminada del usuario
// @access  Public (o Private si se requiere autenticación)
router.get("/:userId/default-address", async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar al usuario en la base de datos
    const user = await User.findById(userId).populate("defaultAddress");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!user.defaultAddress) {
      return res
        .status(404)
        .json({ message: "No se ha configurado una dirección predeterminada" });
    }

    // Devolver la dirección predeterminada
    res.status(200).json({
      defaultAddress: user.defaultAddress, // Aquí es donde se pasa la dirección predeterminada
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error al obtener la dirección predeterminada" });
  }
});

// @route   PUT /api/user/:userId/default-address
// @desc    Set a default address for the user
// @access  Private
router.put("/:id/default-address", async (req, res) => {
  try {
    const { addressId } = req.body;

    // Buscar el usuario
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.defaultAddress = addressId;
    await user.save();

    res.json({ message: "Dirección predeterminada actualizada" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar la dirección predeterminada" });
  }
});

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
