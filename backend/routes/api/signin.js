const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const generateTokenAndUser = require('../../utils/authUtils');

const router = express.Router();

// Signin Route (Register New User)
router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('role', 'Role is required').isIn(['foodie', 'cocinero']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      // Verificar si el usuario ya existe
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Crear el nuevo usuario
      user = new User({
        name,
        email,
        password,
        role,
      });

      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Guardar el usuario en la base de datos
      await user.save();

      // Generar JWT
      const { token, user: userData } = await generateTokenAndUser(email, password);

      res.json({
        token,
        user: {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
