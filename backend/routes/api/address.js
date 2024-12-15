// routes/address.js
const express = require("express");
const router = express.Router();
const Address = require("../../models/Address");

// @route   GET /api/address/:userId
// @desc    Get all addresses for a specific user
// @access  Public
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Access userId from params correctly
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las direcciones" });
  }
});

// @route   POST /api/address/:userId
// @desc    Create or update address for a specific user
// @access  Public
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id, ...addressData } = req.body;

    let address;
    if (_id) {
      address = await Address.findByIdAndUpdate(_id, addressData, {
        new: true,
      });
    } else {
      address = new Address({ ...addressData, userId });
      await address.save();
    }

    res.status(201).json(address);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al guardar la dirección" });
  }
});

// @route   DELETE /api/address/:userId/:addressId
// @desc    Delete address for a specific user
// @access  Public
router.delete("/:userId/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    // Verificar si la dirección es la predeterminada
    if (address.userId.toString() === userId) {
      await address.remove();
      res.status(200).json({ message: "Dirección eliminada correctamente" });
    } else {
      res.status(403).json({ message: "No se puede eliminar esta dirección" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar la dirección" });
  }
});

module.exports = router;
