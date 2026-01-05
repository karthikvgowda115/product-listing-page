const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const cartController = require('../controllers/cartController');

// Validation middleware
const validateAddToCart = [
  body('productId').isInt({ min: 1 }).withMessage('Valid product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

const validateUpdateCart = [
  param('id').isInt({ min: 1 }).withMessage('Valid cart item ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

// Routes
router.get('/', cartController.getCart);
router.post('/', validateAddToCart, cartController.addToCart);
router.put('/:id', validateUpdateCart, cartController.updateCartItem);
router.delete('/:id', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;