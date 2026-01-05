const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      sort: req.query.sort,
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit
    };

    const result = await productService.getAllProducts(filters);

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error in getAllProducts controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
};

const getProductById = async (req, res) => {
  res.json({ message: 'getProductById working' });
};

const getProductsByCategory = async (req, res) => {
  res.json({ message: 'getProductsByCategory working' });
};

const getCategories = async (req, res) => {
  res.json({ message: 'getCategories working' });
};

const searchProducts = async (req, res) => {
  res.json({ message: 'searchProducts working' });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  searchProducts
};
