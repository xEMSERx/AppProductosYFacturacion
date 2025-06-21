const db = require('../config/db');

const User = {};

// Buscar usuario por email
User.findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Crear nuevo usuario
User.create = (nombre, email, hashedPassword, callback) => {
  const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nombre, email, hashedPassword], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId); // Devuelve el ID del nuevo usuario
  });
};

module.exports = User;
