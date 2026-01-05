// frontend/src/utils/helpers.js

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'INR') => {
  const locales = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-US') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Calculate GST amount
 * @param {number} amount - Base amount
 * @param {number} rate - GST rate (default: 0.18 for 18%)
 * @returns {number} GST amount
 */
export const calculateGST = (amount, rate = 0.18) => {
  return amount * rate;
};

/**
 * Calculate total with GST
 * @param {number} amount - Base amount
 * @param {number} rate - GST rate (default: 0.18)
 * @returns {number} Total amount including GST
 */
export const calculateTotalWithGST = (amount, rate = 0.18) => {
  return amount + calculateGST(amount, rate);
};

/**
 * Calculate shipping cost
 * @param {number} subtotal - Cart subtotal
 * @param {number} threshold - Free shipping threshold
 * @param {number} shippingCost - Standard shipping cost
 * @returns {number} Shipping cost
 */
export const calculateShipping = (subtotal, threshold = 1000, shippingCost = 99) => {
  return subtotal >= threshold ? 0 : shippingCost;
};

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Get rating stars HTML/JSX
 * @param {number} rating - Rating value (0-5)
 * @returns {Array} Array of star elements
 */
export const getRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  
  if (hasHalfStar) {
    stars.push('½');
  }
  
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆');
  }
  
  return stars;
};

/**
 * Sort products by criteria
 * @param {Array} products - Array of products
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating_desc':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};

/**
 * Filter products by search term
 * @param {Array} products - Array of products
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered products
 */
export const filterProductsBySearch = (products, searchTerm) => {
  if (!searchTerm.trim()) return products;
  
  const searchLower = searchTerm.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower) ||
    product.category.toLowerCase().includes(searchLower) ||
    product.material?.toLowerCase().includes(searchLower) ||
    product.features?.some(feature => 
      feature.toLowerCase().includes(searchLower)
    )
  );
};

/**
 * Get cart total items count
 * @param {Array} cart - Cart items array
 * @returns {number} Total items count
 */
export const getCartItemsCount = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get cart subtotal
 * @param {Array} cart - Cart items array
 * @returns {number} Subtotal amount
 */
export const getCartSubtotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Calculate cart totals (subtotal, GST, shipping, total)
 * @param {Array} cart - Cart items array
 * @param {number} gstRate - GST rate (default: 0.18)
 * @param {number} shippingThreshold - Free shipping threshold
 * @param {number} shippingCost - Standard shipping cost
 * @returns {Object} Cart totals
 */
export const calculateCartTotals = (cart, gstRate = 0.18, shippingThreshold = 1000, shippingCost = 99) => {
  const subtotal = getCartSubtotal(cart);
  const gst = calculateGST(subtotal, gstRate);
  const shipping = calculateShipping(subtotal, shippingThreshold, shippingCost);
  const total = subtotal + gst + shipping;
  
  return {
    subtotal,
    gst,
    shipping,
    total,
    itemsCount: getCartItemsCount(cart)
  };
};

/**
 * Filter products by category
 * @param {Array} products - Array of products
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered products
 */
export const filterProductsByCategory = (products, category) => {
  if (!category || category === 'all') return products;
  return products.filter(product => product.category === category);
};

/**
 * Get unique categories from products
 * @param {Array} products - Array of products
 * @returns {Array} Unique categories
 */
export const getUniqueCategories = (products) => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};