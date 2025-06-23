const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, descripcion, precio, categoria, imagen } = data;
    db.query(
      'INSERT INTO products (nombre, descripcion, precio, categoria, imagen) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria, imagen],
      callback
    );
  },

  update: (id, data, callback) => {
    const { nombre, descripcion, precio, categoria, imagen } = data;
    db.query(
      'UPDATE products SET nombre=?, descripcion=?, precio=?, categoria=?, imagen=? WHERE id=?',
      [nombre, descripcion, precio, categoria, imagen, id],
      callback
    );
  },

  remove: (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  }
};

module.exports = Product;