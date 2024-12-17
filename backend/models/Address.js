const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addressName: { type: String, required: true }, // Nombre para identificar la dirección (ej: "Casa", "Trabajo")
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("address", AddressSchema);
