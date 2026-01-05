// frontend/src/utils/formatters.js

/**
 * Format Indian Rupees with ₹ symbol
 * @param {number} amount - Amount to format
 * @param {boolean} showPaise - Whether to show decimal places
 * @returns {string} Formatted currency string with ₹
 */
export const formatRupees = (amount, showPaise = false) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0' + (showPaise ? '.00' : '');
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showPaise ? 2 : 0,
    maximumFractionDigits: showPaise ? 2 : 0
  }).format(amount);
};

/**
 * Format price for product display (₹ without decimal)
 * @param {number} price - Product price
 * @returns {string} Formatted price string with ₹
 */
export const formatPrice = (price) => {
  return formatRupees(price, false);
};

/**
 * Format price with paise (₹ with decimal)
 * @param {number} price - Product price
 * @returns {string} Formatted price string with ₹
 */
export const formatPriceWithPaise = (price) => {
  return formatRupees(price, true);
};

/**
 * Format currency - alias for formatRupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string with ₹
 */
export const formatCurrency = (amount) => {
  return formatRupees(amount, true);
};

/**
 * Format percentage for discounts
 * @param {number} value - Percentage value (0-100)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }
  
  return value.toFixed(decimals) + '%';
};

/**
 * Format large numbers with Indian numbering system
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (number) => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }
  
  // Indian numbering system uses lakhs and crores
  if (number >= 10000000) { // 1 crore
    return (number / 10000000).toFixed(2) + ' Cr';
  } else if (number >= 100000) { // 1 lakh
    return (number / 100000).toFixed(2) + ' L';
  } else if (number >= 1000) { // 1 thousand
    return (number / 1000).toFixed(1) + 'K';
  }
  
  return number.toLocaleString('en-IN');
};

/**
 * Format date in Indian format (DD/MM/YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj);
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * Format date to relative time (Indian English)
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Recently';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) {
      return 'last week';
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) {
      return 'last month';
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    if (diffInYears === 1) {
      return 'last year';
    } else {
      return `${diffInYears} years ago`;
    }
  } catch (error) {
    return 'Recently';
  }
};

/**
 * Format product rating with stars
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star rating string
 */
export const formatRating = (rating) => {
  if (typeof rating !== 'number' || isNaN(rating) || rating < 0 || rating > 5) {
    return '☆☆☆☆☆';
  }
  
  const fullStars = '★'.repeat(Math.floor(rating));
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = '☆'.repeat(5 - Math.floor(rating) - (hasHalfStar ? 1 : 0));
  const halfStar = hasHalfStar ? '½' : '';
  
  return `${fullStars}${halfStar}${emptyStars} (${rating.toFixed(1)})`;
};

/**
 * Format weight for products (grams and kilograms)
 * @param {number} grams - Weight in grams
 * @returns {string} Formatted weight string
 */
export const formatWeight = (grams) => {
  if (typeof grams !== 'number' || isNaN(grams)) {
    return '0 g';
  }
  
  if (grams < 1000) {
    return `${grams} g`;
  }
  
  const kilograms = grams / 1000;
  return `${kilograms.toFixed(2)} kg`;
};

/**
 * Format clothing sizes (Indian sizes: S, M, L, XL, XXL)
 * @param {string|Array} size - Size or array of sizes
 * @returns {string} Formatted size string
 */
export const formatSize = (size) => {
  if (!size) return 'Free Size';
  
  if (typeof size === 'string') {
    return size.toUpperCase();
  }
  
  if (Array.isArray(size)) {
    return size.map(s => s.toUpperCase()).join(', ');
  }
  
  return 'Free Size';
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .split(' ')
    .map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

/**
 * Generate slug from text
 * @param {string} text - Text to slugify
 * @returns {string} Slug
 */
export const slugify = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

/**
 * Format delivery time estimate for India
 * @param {number} minDays - Minimum days
 * @param {number} maxDays - Maximum days
 * @returns {string} Formatted delivery estimate
 */
export const formatDeliveryTime = (minDays = 3, maxDays = 7) => {
  if (minDays === maxDays) {
    if (minDays === 1) return 'Delivery tomorrow';
    return `Delivery in ${minDays} days`;
  }
  
  if (minDays === 1) {
    return `Delivery in 1-${maxDays} days`;
  }
  
  return `Delivery in ${minDays}-${maxDays} days`;
};

/**
 * Format stock status with Indian context
 * @param {number} quantity - Available quantity
 * @returns {string} Stock status string
 */
export const formatStockStatus = (quantity) => {
  if (quantity <= 0) {
    return 'Out of Stock';
  } else if (quantity === 1) {
    return 'Only 1 left!';
  } else if (quantity < 10) {
    return `Only ${quantity} left!`;
  } else if (quantity < 50) {
    return 'Limited Stock';
  } else {
    return 'In Stock';
  }
};

/**
 * Format product SKU code
 * @param {string} sku - SKU string
 * @returns {string} Formatted SKU
 */
export const formatSKU = (sku) => {
  if (!sku) return 'N/A';
  
  return sku.toUpperCase();
};

/**
 * Format GST amount with ₹
 * @param {number} amount - Base amount
 * @param {number} rate - GST rate (default: 0.18 for 18%)
 * @returns {string} Formatted GST amount
 */
export const formatGST = (amount, rate = 0.18) => {
  const gstAmount = amount * rate;
  return formatRupees(gstAmount, true);
};

/**
 * Format cart totals with ₹
 * @param {number} subtotal - Cart subtotal
 * @param {number} gst - GST amount
 * @param {number} shipping - Shipping amount
 * @returns {Object} Formatted totals object
 */
export const formatCartTotals = (subtotal, gst, shipping) => {
  return {
    subtotal: formatRupees(subtotal, true),
    gst: formatRupees(gst, true),
    shipping: shipping === 0 ? 'FREE' : formatRupees(shipping, true),
    total: formatRupees(subtotal + gst + shipping, true)
  };
};

/**
 * Format savings amount with ₹
 * @param {number} original - Original price
 * @param {number} discounted - Discounted price
 * @returns {string} Formatted savings
 */
export const formatSavings = (original, discounted) => {
  const savings = original - discounted;
  return `Save ${formatRupees(savings, false)} (${formatPercentage(Math.round((savings / original) * 100))})`;
};

/**
 * Format price range with ₹
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (minPrice, maxPrice) => {
  if (minPrice === maxPrice) {
    return formatRupees(minPrice, false);
  }
  return `${formatRupees(minPrice, false)} - ${formatRupees(maxPrice, false)}`;
};