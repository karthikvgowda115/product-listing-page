const helpers = {
  // Generate pagination metadata
  generatePagination: (page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    return {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  },

  // Format price with currency
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  },

  // Generate session ID (for demo purposes)
  generateSessionId: () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Validate category
  isValidCategory: (category) => {
    const validCategories = ['innerwear', 'men', 'women', 'kids'];
    return validCategories.includes(category);
  },

  // Calculate GST
  calculateGST: (amount, percentage = 18) => {
    return (amount * percentage) / 100;
  }
};

module.exports = helpers;