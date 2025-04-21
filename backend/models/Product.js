const pool = require('../db');

class Product {
  // Lấy tất cả sản phẩm
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);
    return rows;
  }

  // Lấy sản phẩm theo id
  static async findById(id) {
    try {
      // Get basic product information
      const [rows] = await pool.query(`
        SELECT p.*, c.name as category_name 
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?
      `, [id]);
      
      if (rows.length === 0) {
        return null;
      }
      
      const product = rows[0];
      
      // Initialize empty arrays for colors and sizes
      product.colors = [];
      product.sizes = [];
      
      // You can add code here to fetch colors and sizes from database if you have those tables
      // For now, we'll return empty arrays for these properties to ensure the frontend works
      
      return product;
    } catch (error) {
      console.error("Error in Product.findById:", error);
      throw error;
    }
  }

  // Lấy sản phẩm theo danh mục
  static async findByCategory(categoryId, limit = null) {
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? 
      ORDER BY p.id DESC
    `;
    
    if (limit) {
      query += ' LIMIT ?';
      const [rows] = await pool.query(query, [categoryId, limit]);
      return rows;
    } else {
      const [rows] = await pool.query(query, [categoryId]);
      return rows;
    }
  }

  // Lấy sản phẩm mới nhất
  static async getNewCollections(limit = 8) {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.date DESC 
      LIMIT ?
    `, [limit]);
    return rows;
  }

  // Thêm sản phẩm mới
  static async create(productData) {
    const { name, description, image, category_id, new_price, old_price } = productData;
    
    // Kiểm tra danh mục tồn tại
    const [categories] = await pool.query('SELECT id FROM categories WHERE id = ?', [category_id]);
    if (categories.length === 0) {
      return {
        success: false,
        message: 'Danh mục không tồn tại'
      };
    }
    
    const [result] = await pool.query(
      'INSERT INTO products (name, description, image, category_id, new_price, old_price) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, image, category_id, new_price, old_price]
    );
    
    return {
      success: true,
      id: result.insertId,
      name
    };
  }

  // Cập nhật sản phẩm
  static async update(id, productData) {
    const { name, description, image, category_id, new_price, old_price, available } = productData;
    
    // Kiểm tra sự tồn tại của sản phẩm
    const [checkProduct] = await pool.query('SELECT id FROM products WHERE id = ?', [id]);
    if (checkProduct.length === 0) {
      return { success: false, message: 'Sản phẩm không tồn tại' };
    }
    
    // Kiểm tra danh mục tồn tại (nếu có)
    if (category_id !== undefined) {
      const [categories] = await pool.query('SELECT id FROM categories WHERE id = ?', [category_id]);
      if (categories.length === 0) {
        return {
          success: false,
          message: 'Danh mục không tồn tại'
        };
      }
    }
    
    // Chuẩn bị câu truy vấn
    let query = 'UPDATE products SET ';
    const params = [];
    const fields = [];
    
    if (name !== undefined) {
      fields.push('name = ?');
      params.push(name);
    }
    
    if (description !== undefined) {
      fields.push('description = ?');
      params.push(description);
    }
    
    if (image !== undefined) {
      fields.push('image = ?');
      params.push(image);
    }
    
    if (category_id !== undefined) {
      fields.push('category_id = ?');
      params.push(category_id);
    }
    
    if (new_price !== undefined) {
      fields.push('new_price = ?');
      params.push(new_price);
    }
    
    if (old_price !== undefined) {
      fields.push('old_price = ?');
      params.push(old_price);
    }
    
    if (available !== undefined) {
      fields.push('available = ?');
      params.push(available);
    }
    
    // Nếu không có field nào được cập nhật
    if (fields.length === 0) {
      return { success: false, message: 'Không có thông tin cập nhật' };
    }
    
    query += fields.join(', ') + ' WHERE id = ?';
    params.push(id);
    
    // Thực hiện cập nhật
    await pool.query(query, params);
    
    return {
      success: true,
      message: 'Cập nhật sản phẩm thành công'
    };
  }

  // Cập nhật trạng thái hiển thị sản phẩm
  static async updateAvailability(id, available) {
    const [checkProduct] = await pool.query('SELECT id FROM products WHERE id = ?', [id]);
    if (checkProduct.length === 0) {
      return { success: false, message: 'Sản phẩm không tồn tại' };
    }
    
    await pool.query('UPDATE products SET available = ? WHERE id = ?', [available, id]);
    
    return {
      success: true,
      message: 'Cập nhật trạng thái sản phẩm thành công'
    };
  }

  // Xóa sản phẩm
  static async remove(id) {
    // Lấy tên sản phẩm trước khi xóa
    const [product] = await pool.query('SELECT name FROM products WHERE id = ?', [id]);
    
    if (product.length === 0) {
      return { success: false, message: 'Sản phẩm không tồn tại' };
    }
    
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    return {
      success: true,
      name: product[0].name
    };
  }
}

module.exports = Product; 