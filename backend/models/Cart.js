const pool = require('../db');

class Cart {
  // Lấy giỏ hàng của user
  static async getByUserId(userId) {
    try {
      const [items] = await pool.query(
        `SELECT c.id, c.product_id, c.quantity, 
         p.name, p.image, p.new_price, p.old_price, p.description,
         (p.new_price * c.quantity) as total_price
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?`,
        [userId]
      );
      
      return {
        success: true,
        cartItems: items,
        total: items.reduce((sum, item) => sum + item.total_price, 0)
      };
    } catch (error) {
      console.error("Error getting cart:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi lấy thông tin giỏ hàng'
      };
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  static async addItem(userId, { product_id, quantity }) {
    try {
      // Kiểm tra sản phẩm có tồn tại không
      const [product] = await pool.query('SELECT id FROM products WHERE id = ?', [product_id]);
      if (product.length === 0) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại'
        };
      }

      // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const [existingItem] = await pool.query(
        'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, product_id]
      );

      if (existingItem.length > 0) {
        // Nếu đã có, cập nhật số lượng
        await pool.query(
          'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
          [quantity, existingItem[0].id]
        );
      } else {
        // Nếu chưa có, thêm mới
        await pool.query(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [userId, product_id, quantity]
        );
      }

      return {
        success: true,
        message: 'Đã thêm sản phẩm vào giỏ hàng'
      };
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi thêm vào giỏ hàng'
      };
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateQuantity(userId, cartItemId, quantity) {
    try {
      // Kiểm tra item có thuộc về user không
      const [cartItem] = await pool.query(
        'SELECT id FROM cart WHERE id = ? AND user_id = ?',
        [cartItemId, userId]
      );

      if (cartItem.length === 0) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại trong giỏ hàng'
        };
      }

      if (quantity <= 0) {
        // Xóa khỏi giỏ hàng nếu số lượng <= 0
        await pool.query('DELETE FROM cart WHERE id = ?', [cartItemId]);
        return {
          success: true,
          message: 'Đã xóa sản phẩm khỏi giỏ hàng'
        };
      } else {
        // Cập nhật số lượng
        await pool.query(
          'UPDATE cart SET quantity = ? WHERE id = ?',
          [quantity, cartItemId]
        );
        return {
          success: true,
          message: 'Đã cập nhật số lượng'
        };
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi cập nhật giỏ hàng'
      };
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeItem(userId, cartItemId) {
    try {
      // Kiểm tra item có thuộc về user không
      const [cartItem] = await pool.query(
        'SELECT id FROM cart WHERE id = ? AND user_id = ?',
        [cartItemId, userId]
      );

      if (cartItem.length === 0) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại trong giỏ hàng'
        };
      }

      await pool.query('DELETE FROM cart WHERE id = ?', [cartItemId]);
      
      return {
        success: true,
        message: 'Đã xóa sản phẩm khỏi giỏ hàng'
      };
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng'
      };
    }
  }

  // Xóa toàn bộ giỏ hàng của user
  static async clearCart(userId) {
    try {
      await pool.query('DELETE FROM cart WHERE user_id = ?', [userId]);
      
      return {
        success: true,
        message: 'Đã xóa toàn bộ giỏ hàng'
      };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi xóa giỏ hàng'
      };
    }
  }
}

module.exports = Cart; 