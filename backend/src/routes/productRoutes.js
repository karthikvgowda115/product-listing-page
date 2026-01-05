const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// TEMP: remove validation to avoid masking errors
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/search', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

module.exports = router;
