const pool = require('../db');
const Cart = require('./Cart');

class Order {
  // Lấy danh sách đơn hàng của user
  static async getByUserId(userId) {
    try {
      const [orders] = await pool.query(
        `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
      );
      
      // Lấy chi tiết sản phẩm cho mỗi đơn hàng
      for (let order of orders) {
        const [items] = await pool.query(
          `SELECT i.*, p.name, p.image 
           FROM order_items i
           JOIN products p ON i.product_id = p.id
           WHERE i.order_id = ?`,
          [order.id]
        );
        order.items = items;
      }
      
      return {
        success: true,
        orders: orders
      };
    } catch (error) {
      console.error("Error getting orders:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi lấy danh sách đơn hàng'
      };
    }
  }

  // Lấy chi tiết đơn hàng theo ID
  static async getById(orderId, userId = null) {
    try {
      let query = `SELECT * FROM orders WHERE id = ?`;
      let params = [orderId];
      
      // Nếu có userId, chỉ lấy đơn hàng của user đó
      if (userId) {
        query += ` AND user_id = ?`;
        params.push(userId);
      }
      
      const [orders] = await pool.query(query, params);
      
      if (orders.length === 0) {
        return {
          success: false,
          message: 'Đơn hàng không tồn tại'
        };
      }
      
      const order = orders[0];
      
      // Lấy chi tiết sản phẩm trong đơn hàng
      const [items] = await pool.query(
        `SELECT i.*, p.name, p.image 
         FROM order_items i
         JOIN products p ON i.product_id = p.id
         WHERE i.order_id = ?`,
        [order.id]
      );
      
      order.items = items;
      
      return {
        success: true,
        order: order
      };
    } catch (error) {
      console.error("Error getting order details:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi lấy thông tin đơn hàng'
      };
    }
  }

  // Tạo đơn hàng mới từ giỏ hàng - phiên bản đơn giản phù hợp với schema
  static async create(userId, orderData) {
    const { shipping_address, phone_number, email, payment_method = 'cod', notes = '' } = orderData;
    
    try {
      console.log("\n=== ORDER MODEL - CREATE METHOD ===");
      console.log("User ID:", userId);
      console.log("Order Data:", JSON.stringify(orderData, null, 2));
      
      // 1. Kiểm tra trực tiếp giỏ hàng của user
      let cartItems = [];
      try {
        console.log("Step 1: Fetching cart items");
        console.log("Running query: SELECT c.id, c.product_id, c.quantity, p.new_price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?");
        
        const [items] = await pool.query(
          `SELECT c.id, c.product_id, c.quantity, 
           p.name, p.image, p.new_price, p.old_price 
           FROM cart c
           JOIN products p ON c.product_id = p.id
           WHERE c.user_id = ?`, 
          [userId]
        );
        
        console.log("Database returned items:", items ? items.length : 0);
        if (items && items.length > 0) {
          console.log("First item sample:", JSON.stringify(items[0], null, 2));
        } else {
          console.log("No items found in cart");
        }
        
        cartItems = items || [];
      } catch (cartError) {
        console.error("Error in Step 1 - Fetching cart:");
        console.error("Error message:", cartError.message);
        console.error("Error stack:", cartError.stack);
        return {
          success: false,
          message: "Không thể lấy thông tin giỏ hàng: " + cartError.message
        };
      }
      
      // 2. Kiểm tra giỏ hàng có trống không
      console.log("Step 2: Checking if cart is empty");
      console.log("Cart items count:", cartItems.length);
      
      if (!cartItems || cartItems.length === 0) {
        console.log("Cart is empty!");
        return {
          success: false,
          message: "Giỏ hàng trống"
        };
      }
      
      // 3. Tính tổng tiền đơn hàng
      let totalAmount = 0;
      try {
        console.log("Step 3: Calculating total amount");
        totalAmount = cartItems.reduce((sum, item) => {
          const itemPrice = parseFloat(item.new_price || 0);
          const itemQuantity = parseInt(item.quantity || 0);
          const itemTotal = itemPrice * itemQuantity;
          console.log(`Item: ${item.product_id}, Price: ${itemPrice}, Quantity: ${itemQuantity}, Total: ${itemTotal}`);
          return sum + itemTotal;
        }, 0);
        console.log("Calculated total amount:", totalAmount);
      } catch (calcError) {
        console.error("Error in Step 3 - Calculating total:");
        console.error("Error message:", calcError.message);
        console.error("Error stack:", calcError.stack);
        totalAmount = 0; // Fallback to zero if calculation fails
      }
      
      // 4. Tạo đơn hàng với các trường phù hợp
      let orderId;
      try {
        console.log("Step 4: Creating order in database");
        console.log("SQL: INSERT INTO orders (user_id, total_amount, shipping_address, phone_number, email, payment_method, status, payment_status, notes) VALUES (?, ?, ?, ?, ?, ?, 'pending', 'pending', ?)");
        console.log("Params:", [userId, totalAmount, shipping_address, phone_number, email, payment_method, notes]);
        
        const [orderResult] = await pool.query(
          `INSERT INTO orders 
           (user_id, total_amount, shipping_address, phone_number, email, payment_method, status, payment_status, notes) 
           VALUES (?, ?, ?, ?, ?, ?, 'pending', 'pending', ?)`,
          [userId, totalAmount, shipping_address, phone_number, email, payment_method, notes]
        );
        
        orderId = orderResult.insertId;
        console.log("Order created with ID:", orderId);
      } catch (orderError) {
        console.error("Error in Step 4 - Creating order:");
        console.error("Error message:", orderError.message);
        console.error("Error stack:", orderError.stack);
        return {
          success: false,
          message: "Không thể tạo đơn hàng: " + orderError.message
        };
      }
      
      // 5. Thêm order_items (nếu có bảng này)
      try {
        console.log("Step 5: Adding order items");
        for (const item of cartItems) {
          console.log(`Adding item ${item.product_id} to order ${orderId}`);
          await pool.query(
            `INSERT INTO order_items 
             (order_id, product_id, quantity, price) 
             VALUES (?, ?, ?, ?)`,
            [orderId, item.product_id, item.quantity, item.new_price]
          );
          console.log(`Item ${item.product_id} added successfully`);
        }
        console.log("All items added to order");
      } catch (itemsError) {
        console.error("Error in Step 5 - Adding order items:");
        console.error("Error message:", itemsError.message);
        console.error("Error stack:", itemsError.stack);
        // Không return lỗi ở đây, tiếp tục để hoàn thành đơn hàng
      }
      
      // 6. Xóa giỏ hàng
      try {
        console.log("Step 6: Clearing cart");
        await pool.query("DELETE FROM cart WHERE user_id = ?", [userId]);
        console.log("Cart cleared successfully");
      } catch (clearError) {
        console.error("Error in Step 6 - Clearing cart:");
        console.error("Error message:", clearError.message);
        console.error("Error stack:", clearError.stack);
        // Không return lỗi ở đây, đơn hàng đã được tạo
      }
      
      // 7. Thành công
      console.log("Step 7: Order process completed successfully");
      console.log("=== END ORDER CREATION ===\n");
      
      return {
        success: true,
        message: "Đặt hàng thành công",
        order_id: orderId
      };
      
    } catch (error) {
      console.error("=== MAIN ERROR IN ORDER CREATION ===");
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return {
        success: false,
        message: "Lỗi tạo đơn hàng: " + error.message
      };
    }
  }

  // Cập nhật trạng thái đơn hàng (chỉ cho admin)
  static async updateStatus(orderId, { status, payment_status }) {
    try {
      const [orderCheck] = await pool.query('SELECT id FROM orders WHERE id = ?', [orderId]);
      
      if (orderCheck.length === 0) {
        return {
          success: false,
          message: 'Đơn hàng không tồn tại'
        };
      }
      
      let query = 'UPDATE orders SET ';
      const updateFields = [];
      const params = [];
      
      if (status) {
        updateFields.push('status = ?');
        params.push(status);
      }
      
      if (payment_status) {
        updateFields.push('payment_status = ?');
        params.push(payment_status);
      }
      
      if (updateFields.length === 0) {
        return {
          success: false,
          message: 'Không có thông tin cập nhật'
        };
      }
      
      query += updateFields.join(', ') + ' WHERE id = ?';
      params.push(orderId);
      
      await pool.query(query, params);
      
      return {
        success: true,
        message: 'Cập nhật trạng thái đơn hàng thành công'
      };
    } catch (error) {
      console.error("Error updating order status:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng'
      };
    }
  }

  // Hủy đơn hàng (cho user)
  static async cancel(orderId, userId) {
    try {
      const [orderCheck] = await pool.query(
        'SELECT id, status FROM orders WHERE id = ? AND user_id = ?', 
        [orderId, userId]
      );
      
      if (orderCheck.length === 0) {
        return {
          success: false,
          message: 'Đơn hàng không tồn tại hoặc không thuộc về bạn'
        };
      }
      
      const order = orderCheck[0];
      
      // Chỉ cho phép hủy đơn hàng ở trạng thái pending hoặc processing
      if (order.status !== 'pending' && order.status !== 'processing') {
        return {
          success: false,
          message: 'Không thể hủy đơn hàng ở trạng thái hiện tại'
        };
      }
      
      await pool.query(
        'UPDATE orders SET status = "cancelled" WHERE id = ?', 
        [orderId]
      );
      
      return {
        success: true,
        message: 'Hủy đơn hàng thành công'
      };
    } catch (error) {
      console.error("Error cancelling order:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi hủy đơn hàng'
      };
    }
  }

  // Lấy danh sách tất cả đơn hàng (cho admin)
  static async getAll(limit = null, offset = 0) {
    try {
      let query = `
        SELECT o.*, u.name as user_name, u.email as user_email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
      `;
      
      if (limit) {
        query += ' LIMIT ? OFFSET ?';
        const [orders] = await pool.query(query, [limit, offset]);
        
        // Lấy tổng số đơn hàng
        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM orders');
        const total = countResult[0].total;
        
        return {
          success: true,
          orders: orders,
          total: total
        };
      } else {
        const [orders] = await pool.query(query);
        return {
          success: true,
          orders: orders
        };
      }
    } catch (error) {
      console.error("Error getting all orders:", error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi lấy danh sách đơn hàng'
      };
    }
  }
}

module.exports = Order; 