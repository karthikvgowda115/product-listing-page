const pool = require('../config/database');

class ProductService {
  async getAllProducts(filters = {}) {
    try {
      // ✅ FORCE NUMBERS (THIS FIXES THE ERROR)
      const page = parseInt(filters.page, 10) || 1;
      const limit = parseInt(filters.limit, 10) || 10;
      const offset = (page - 1) * limit;

      let sql = `
        SELECT id, name, price, description, category, image_url, stock, created_at
        FROM products
        WHERE 1 = 1
      `;

      const params = [];

      // Category filter
      if (filters.category) {
        sql += ' AND category = ?';
        params.push(filters.category);
      }

      // Search filter
      if (filters.search) {
        sql += ' AND name LIKE ?';
        params.push(`%${filters.search}%`);
      }

      // Sorting
      if (filters.sort === 'price_asc') {
        sql += ' ORDER BY price ASC';
      } else if (filters.sort === 'price_desc') {
        sql += ' ORDER BY price DESC';
      } else {
        sql += ' ORDER BY created_at DESC';
      }

      // ✅ VERY IMPORTANT: LIMIT & OFFSET MUST BE NUMBERS
      sql += ' LIMIT ? OFFSET ?';
      params.push(Number(limit), Number(offset));

      console.log('SQL:', sql);
      console.log('PARAMS:', params);

      const [rows] = await pool.query(sql, params);

      return {
        products: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      };

    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw new Error('Failed to fetch products');
    }
  }
}

module.exports = new ProductService();
