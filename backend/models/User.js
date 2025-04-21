const pool = require('../db');

class User {
  // Tìm user theo email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  // Tìm user theo id
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // Tạo user mới
  static async create(userData) {
    const { name, email, password } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  }

  // Lấy giỏ hàng của user
  static async getCart(userId) {
    const [rows] = await pool.query(
      `SELECT c.product_id, c.quantity, p.name, p.image, p.new_price 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`, 
      [userId]
    );
    
    // Chuyển đổi kết quả thành định dạng tương tự như MongoDB
    const cartData = {};
    rows.forEach(item => {
      cartData[item.product_id] = item.quantity;
    });
    
    return cartData;
  }

  // Thêm sản phẩm vào giỏ hàng
  static async addToCart(userId, productId) {
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const [existing] = await pool.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    
    if (existing.length > 0) {
      // Nếu đã có, tăng số lượng
      await pool.query(
        'UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
    } else {
      // Nếu chưa có, thêm mới
      await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)',
        [userId, productId]
      );
    }
    
    return true;
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeFromCart(userId, productId) {
    const [existing] = await pool.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    
    if (existing.length > 0 && existing[0].quantity > 1) {
      // Giảm số lượng nếu > 1
      await pool.query(
        'UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
    } else if (existing.length > 0) {
      // Xóa khỏi giỏ hàng nếu số lượng = 1
      await pool.query(
        'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
    }
    
    return true;
  }
}

module.exports = User; 