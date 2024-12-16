const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Recipe = require("../../models/Recipe");
const Subscription = require("../../models/Subscription");

// Crear pedido
router.post("/create", async (req, res) => {
  const { userId, recipes, totalPrice } = req.body;

  if (!userId || !recipes || recipes.length === 0 || !totalPrice) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newOrder = new Order({ userId, recipes, totalPrice });
    await newOrder.save();

    // Actualizar las subscriptions del usuario a hasPaid: true
    const recipeIds = recipes.map((recipe) => recipe._id);
    const updateResult = await Subscription.updateMany(
      { userId, recipeId: { $in: recipeIds } },
      { hasPaid: true }
    );

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Obtener pedidos de un usuario
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate("recipes")
      .sort({ createdAt: -1 });
    const nextOrders = orders.filter((order) => order.status === "pending");
    const historyOrders = orders.filter((order) => order.status !== "pending");

    res.status(200).json({ nextOrders, historyOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Cancelar pedido
router.put("/cancel/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res
      .status(500)
      .json({ message: "Error cancelling order", error: error.message });
  }
});

module.exports = router;
