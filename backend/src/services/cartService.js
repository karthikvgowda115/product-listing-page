const pool = require('../config/database');
const CartItem = require('../models/Cart');
const constants = require('../config/constants');

class CartService {
  async getCartItems(sessionId) {
    try {
      const query = `
        SELECT ci.id, ci.product_id, ci.quantity, 
               p.name, p.price, p.image_url
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.session_id = ?
        ORDER BY ci.created_at DESC
      `;
      
      const [rows] = await pool.execute(query, [sessionId]);
      
      const items = rows.map(row => CartItem.fromDBRow(row).toJSON());
      return this.calculateCartTotals(items);
    } catch (error) {
      console.error('Error in getCartItems:', error);
      throw new Error('Failed to fetch cart items');
    }
  }

  async addToCart(sessionId, productId, quantity = 1) {
    try {
      // Check if product exists and has stock
      const productQuery = 'SELECT id, name, price, stock FROM products WHERE id = ?';
      const [products] = await pool.execute(productQuery, [productId]);
      
      if (products.length === 0) {
        throw new Error('Product not found');
      }
      
      if (products[0].stock < quantity) {
        throw new Error('Insufficient stock');
      }

      // Check if item already exists in cart
      const existingQuery = `
        SELECT id, quantity FROM cart_items 
        WHERE session_id = ? AND product_id = ?
      `;
      
      const [existingItems] = await pool.execute(existingQuery, [sessionId, productId]);
      
      if (existingItems.length > 0) {
        // Update quantity
        const newQuantity = existingItems[0].quantity + quantity;
        const updateQuery = `
          UPDATE cart_items 
          SET quantity = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;
        
        await pool.execute(updateQuery, [newQuantity, existingItems[0].id]);
      } else {
        // Insert new item
        const insertQuery = `
          INSERT INTO cart_items (session_id, product_id, quantity)
          VALUES (?, ?, ?)
        `;
        
        await pool.execute(insertQuery, [sessionId, productId, quantity]);
      }

      // Update product stock
      await pool.execute(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [quantity, productId]
      );

      return await this.getCartItems(sessionId);
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw new Error(`Failed to add to cart: ${error.message}`);
    }
  }

  async updateCartItem(sessionId, cartItemId, quantity) {
    try {
      // Get current cart item
      const currentQuery = `
        SELECT ci.id, ci.product_id, ci.quantity, p.stock
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.id = ? AND ci.session_id = ?
      `;
      
      const [items] = await pool.execute(currentQuery, [cartItemId, sessionId]);
      
      if (items.length === 0) {
        throw new Error('Cart item not found');
      }
      
      const currentItem = items[0];
      const quantityDiff = quantity - currentItem.quantity;
      
      if (quantityDiff > currentItem.stock) {
        throw new Error('Insufficient stock');
      }
      
      // Update cart item quantity
      const updateQuery = `
        UPDATE cart_items 
        SET quantity = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND session_id = ?
      `;
      
      await pool.execute(updateQuery, [quantity, cartItemId, sessionId]);
      
      // Update product stock
      if (quantityDiff !== 0) {
        await pool.execute(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [quantityDiff, currentItem.product_id]
        );
      }
      
      return await this.getCartItems(sessionId);
    } catch (error) {
      console.error('Error in updateCartItem:', error);
      throw new Error(`Failed to update cart item: ${error.message}`);
    }
  }

  async removeFromCart(sessionId, cartItemId) {
    try {
      // Get cart item details before deleting
      const itemQuery = `
        SELECT ci.product_id, ci.quantity
        FROM cart_items ci
        WHERE ci.id = ? AND ci.session_id = ?
      `;
      
      const [items] = await pool.execute(itemQuery, [cartItemId, sessionId]);
      
      if (items.length === 0) {
        throw new Error('Cart item not found');
      }
      
      const item = items[0];
      
      // Delete cart item
      const deleteQuery = 'DELETE FROM cart_items WHERE id = ? AND session_id = ?';
      await pool.execute(deleteQuery, [cartItemId, sessionId]);
      
      // Restore product stock
      await pool.execute(
        'UPDATE products SET stock = stock + ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
      
      return await this.getCartItems(sessionId);
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      throw new Error('Failed to remove from cart');
    }
  }

  async clearCart(sessionId) {
    try {
      // Get all cart items to restore stock
      const itemsQuery = `
        SELECT ci.product_id, ci.quantity
        FROM cart_items ci
        WHERE ci.session_id = ?
      `;
      
      const [items] = await pool.execute(itemsQuery, [sessionId]);
      
      // Restore stock for each product
      for (const item of items) {
        await pool.execute(
          'UPDATE products SET stock = stock + ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }
      
      // Clear cart
      const clearQuery = 'DELETE FROM cart_items WHERE session_id = ?';
      await pool.execute(clearQuery, [sessionId]);
      
      return { message: 'Cart cleared successfully' };
    } catch (error) {
      console.error('Error in clearCart:', error);
      throw new Error('Failed to clear cart');
    }
  }

  calculateCartTotals(items) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = (subtotal * constants.GST_PERCENTAGE) / 100;
    const total = subtotal + gst;
    
    return {
      items,
      summary: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        gst: parseFloat(gst.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        gstPercentage: constants.GST_PERCENTAGE
      }
    };
  }
}

module.exports = new CartService();