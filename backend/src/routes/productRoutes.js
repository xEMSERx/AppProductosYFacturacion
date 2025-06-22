const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Crear la tabla de productos si no existe
router.post('/create-table', productController.createProductsTable);

// Obtener todos los productos
router.get('/', productController.getAll);

// Obtener un producto por ID
router.get('/:id', productController.getById);

// Crear un producto
router.post('/', productController.create);

// Actualizar un producto
router.put('/:id', productController.update);

// Eliminar un producto
router.delete('/:id', productController.remove);

module.exports = router;