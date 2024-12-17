// authUtils.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateTokenAndUser = async (email, password) => {
  try {
    // Buscar el usuario por correo
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Crear el payload para el JWT
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Generar el token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    return { token, user };
  } catch (error) {
    throw error;
  }
};

module.exports = generateTokenAndUser;
