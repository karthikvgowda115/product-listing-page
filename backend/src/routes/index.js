const express = require('express');
const router = express.Router();

// Import route modules
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

// API documentation
router.get('/', (req, res) => {
  res.json({
    message: 'Clothing Store API',
    version: '1.0.0',
    documentation: {
      products: {
        getAll: 'GET /api/products',
        getById: 'GET /api/products/:id',
        search: 'GET /api/products/search?q=query',
        byCategory: 'GET /api/products/category/:category',
        categories: 'GET /api/products/categories',
        featured: 'GET /api/products/featured'
      },
      cart: {
        getSession: 'GET /api/cart/session',
        getCart: 'GET /api/cart',
        addItem: 'POST /api/cart',
        updateItem: 'PUT /api/cart/:productId',
        removeItem: 'DELETE /api/cart/:productId',
        clearCart: 'DELETE /api/cart'
      }
    },
    status: 'Operational',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

module.exports = router;