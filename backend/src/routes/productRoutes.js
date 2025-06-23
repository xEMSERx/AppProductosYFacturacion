const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create-table', productController.createProductsTable); // Crear la tabla de productos si no existe

router.get('/', productController.getAll); // Obtener todos los productos

router.get('/:id', productController.getById); // Obtener un producto por ID

router.post('/', productController.create); // Crear un producto

router.put('/:id', productController.update); // Actualizar un producto

router.delete('/:id', productController.remove); // Eliminar un producto

module.exports = router;