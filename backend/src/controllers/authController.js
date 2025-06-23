/*exports.register = (req, res) => {
  res.json({ message: 'Registro de usuario (a implementar)' });
};

exports.login = (req, res) => {
  res.json({ message: 'Login de usuario (a implementar)' });
};*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "Faltan datos" });

  User.findByEmail(email, (err, data) => {
    if (data.length > 0) return res.status(400).json({ error: "Usuario ya existe" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create(username, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: "Error al registrar usuario" });
      res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  User.findByEmail(email, (err, data) => {
    if (data.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = data[0];
    const esValido = bcrypt.compareSync(password, user.password);
    if (!esValido) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ mensaje: "Login exitoso", token });
  });
};

module.exports = { register, login };