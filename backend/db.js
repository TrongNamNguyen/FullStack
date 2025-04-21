const mysql = require('mysql2/promise');

// Tạo kết nối pool để quản lý kết nối hiệu quả
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'N@m3112004',
  database: 'e_commerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối
pool.getConnection()
  .then(connection => {
    console.log('Kết nối MySQL thành công!');
    connection.release();
  })
  .catch(err => {
    console.error('Lỗi kết nối MySQL:', err.message);
  });

module.exports = pool; 