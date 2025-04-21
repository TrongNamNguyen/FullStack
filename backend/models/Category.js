const pool = require('../db');

class Category {
  // Lấy tất cả danh mục
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  }

  // Lấy danh mục theo id
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  // Tạo danh mục mới
  static async create(categoryData) {
    const { name, description, image } = categoryData;
    
    // Kiểm tra tên đã tồn tại chưa
    const [existingCategories] = await pool.query('SELECT * FROM categories WHERE name = ?', [name]);
    if (existingCategories.length > 0) {
      return {
        success: false,
        message: 'Tên danh mục đã được sử dụng'
      };
    }
    
    const [result] = await pool.query(
      'INSERT INTO categories (name, description, image) VALUES (?, ?, ?)',
      [name, description || null, image || null]
    );
    
    return {
      success: true,
      id: result.insertId,
      name
    };
  }

  // Cập nhật danh mục
  static async update(id, categoryData) {
    const { name, description, image } = categoryData;
    
    // Kiểm tra sự tồn tại của danh mục
    const [checkCategory] = await pool.query('SELECT id FROM categories WHERE id = ?', [id]);
    if (checkCategory.length === 0) {
      return { success: false, message: 'Danh mục không tồn tại' };
    }
    
    // Kiểm tra tên đã tồn tại chưa (nếu cung cấp)
    if (name) {
      const [existingCategories] = await pool.query('SELECT id FROM categories WHERE name = ? AND id != ?', [name, id]);
      if (existingCategories.length > 0) {
        return {
          success: false,
          message: 'Tên danh mục đã được sử dụng'
        };
      }
    }
    
    // Chuẩn bị câu truy vấn
    let query = 'UPDATE categories SET ';
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
      message: 'Cập nhật danh mục thành công'
    };
  }

  // Xóa danh mục
  static async remove(id) {
    // Kiểm tra xem danh mục có tồn tại không
    const [category] = await pool.query('SELECT name FROM categories WHERE id = ?', [id]);
    
    if (category.length === 0) {
      return { success: false, message: 'Danh mục không tồn tại' };
    }
    
    // Kiểm tra xem danh mục có sản phẩm không
    const [products] = await pool.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
    if (products[0].count > 0) {
      return { 
        success: false, 
        message: `Không thể xóa danh mục này vì có ${products[0].count} sản phẩm đang sử dụng` 
      };
    }
    
    // Thực hiện xóa
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    
    return {
      success: true,
      name: category[0].name,
      message: 'Xóa danh mục thành công'
    };
  }
}

module.exports = Category; 