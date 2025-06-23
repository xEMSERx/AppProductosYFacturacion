const db = require('../config/db');

const User = {};

User.findByEmail = (email, callback) => { // Buscar usuario por email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

User.create = (nombre, email, hashedPassword, callback) => { // Crear nuevo usuario
  const sql = 'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nombre, email, hashedPassword], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId); // Devuelve el ID del nuevo usuario
  });
};

module.exports = User;