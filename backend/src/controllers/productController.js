const db = require('../config/db');

exports.getAll = (req, res) => { // Obtener todos los productos
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => { // Crear un producto
  const { nombre, descripcion, precio, categoria, imagen } = req.body;
  db.query(
    'INSERT INTO products (nombre, descripcion, precio, categoria, imagen) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, categoria, imagen],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, nombre, descripcion, precio, categoria, imagen });
    }
  );
};

exports.update = (req, res) => { // Actualizar un producto
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, imagen } = req.body;
  db.query(
    'UPDATE products SET nombre=?, descripcion=?, precio=?, categoria=?, imagen=? WHERE id=?',
    [nombre, descripcion, precio, categoria, imagen, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ id, nombre, descripcion, precio, categoria, imagen });
    }
  );
};

exports.remove = (req, res) => { // Eliminar un producto
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  });
};

exports.getById = (req, res) => { // Obtener un producto por ID (opcional)
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(results[0]);
  });
};