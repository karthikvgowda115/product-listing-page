const { body } = require('express-validator');

const productValidators = {
  createProduct: [
    body('name')
      .notEmpty().withMessage('Product name is required')
      .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),
    
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
    
    body('description')
      .notEmpty().withMessage('Description is required')
      .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
    
    body('category')
      .notEmpty().withMessage('Category is required')
      .isIn(['innerwear', 'men', 'women', 'kids']).withMessage('Invalid category'),
    
    body('stock')
      .notEmpty().withMessage('Stock is required')
      .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    
    body('imageUrl')
      .notEmpty().withMessage('Image URL is required')
      .isURL().withMessage('Valid image URL is required')
  ]
};

module.exports = {
  productValidators
};