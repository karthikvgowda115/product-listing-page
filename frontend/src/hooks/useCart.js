import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Custom hook for accessing cart context
 * @returns {Object} Cart context values and methods
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

/**
 * Hook for cart calculations
 * @returns {Object} Cart calculation utilities
 */
export const useCartCalculations = () => {
  const { cart } = useCart();
  
  /**
   * Calculate cart subtotal
   * @returns {number} Subtotal amount
   */
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  /**
   * Calculate GST amount
   * @param {number} rate - GST rate (default: 0.18)
   * @returns {number} GST amount
   */
  const getGST = (rate = 0.18) => {
    return getSubtotal() * rate;
  };
  
  /**
   * Calculate shipping cost
   * @param {number} threshold - Free shipping threshold (default: 100)
   * @param {number} cost - Shipping cost (default: 9.99)
   * @returns {number} Shipping cost
   */
  const getShipping = (threshold = 100, cost = 9.99) => {
    const subtotal = getSubtotal();
    return subtotal >= threshold ? 0 : cost;
  };
  
  /**
   * Calculate total amount
   * @param {Object} options - Calculation options
   * @returns {number} Total amount
   */
  const getTotal = (options = {}) => {
    const {
      gstRate = 0.18,
      shippingThreshold = 100,
      shippingCost = 9.99
    } = options;
    
    const subtotal = getSubtotal();
    const gst = subtotal * gstRate;
    const shipping = subtotal >= shippingThreshold ? 0 : shippingCost;
    
    return subtotal + gst + shipping;
  };
  
  /**
   * Get total items count in cart
   * @returns {number} Total items count
   */
  const getItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  /**
   * Check if cart is empty
   * @returns {boolean} Whether cart is empty
   */
  const isCartEmpty = () => {
    return cart.length === 0;
  };
  
  /**
   * Get cart summary object
   * @returns {Object} Cart summary
   */
  const getCartSummary = () => {
    const subtotal = getSubtotal();
    const gst = getGST();
    const shipping = getShipping();
    const total = getTotal();
    
    return {
      subtotal,
      gst,
      shipping,
      total,
      itemsCount: getItemsCount(),
      isEmpty: isCartEmpty()
    };
  };
  
  return {
    getSubtotal,
    getGST,
    getShipping,
    getTotal,
    getItemsCount,
    isCartEmpty,
    getCartSummary
  };
};