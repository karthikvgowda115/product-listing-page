const cartService = require('../services/cartService');
const { validationResult } = require('express-validator');

const cartController = {
  async getCart(req, res) {
    try {
      // In a real app, you'd have user authentication
      // For demo, using session ID from headers or generating one
      const sessionId = req.headers['x-session-id'] || 'demo-session-123';
      
      const cart = await cartService.getCartItems(sessionId);
      
      res.status(200).json({
        success: true,
        data: cart
      });
    } catch (error) {
      console.error('Error in getCart controller:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch cart'
      });
    }
  },

  async addToCart(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const sessionId = req.headers['x-session-id'] || 'demo-session-123';
      const { productId, quantity } = req.body;
      
      const cart = await cartService.addToCart(sessionId, productId, quantity);
      
      res.status(200).json({
        success: true,
        message: 'Product added to cart successfully',
        data: cart
      });
    } catch (error) {
      console.error('Error in addToCart controller:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to add to cart'
      });
    }
  },

  async updateCartItem(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const sessionId = req.headers['x-session-id'] || 'demo-session-123';
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (quantity < 1) {
        return res.status(400).json({
          success: false,
          error: 'Quantity must be at least 1'
        });
      }
      
      const cart = await cartService.updateCartItem(sessionId, id, quantity);
      
      res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        data: cart
      });
    } catch (error) {
      console.error('Error in updateCartItem controller:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update cart item'
      });
    }
  },

  async removeFromCart(req, res) {
    try {
      const sessionId = req.headers['x-session-id'] || 'demo-session-123';
      const { id } = req.params;
      
      const cart = await cartService.removeFromCart(sessionId, id);
      
      res.status(200).json({
        success: true,
        message: 'Item removed from cart successfully',
        data: cart
      });
    } catch (error) {
      console.error('Error in removeFromCart controller:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to remove from cart'
      });
    }
  },

  async clearCart(req, res) {
    try {
      const sessionId = req.headers['x-session-id'] || 'demo-session-123';
      
      const result = await cartService.clearCart(sessionId);
      
      res.status(200).json({
        success: true,
        message: result.message,
        data: { items: [], summary: { subtotal: 0, gst: 0, total: 0 } }
      });
    } catch (error) {
      console.error('Error in clearCart controller:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to clear cart'
      });
    }
  }
};

module.exports = cartController;