const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    // Kết nối tới MySQL
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'N@m3112004'
    });

    console.log('Kết nối MySQL thành công!');

    // Đọc và thực thi tệp SQL
    const sqlFile = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
    const queries = sqlFile.split(';').filter(query => query.trim() !== '');

    for (const query of queries) {
      if (query.trim() !== '') {
        await connection.query(query + ';');
        console.log('Thực thi truy vấn thành công:', query.slice(0, 50) + '...');
      }
    }

    console.log('Thiết lập cơ sở dữ liệu hoàn tất!');
    
    // Thêm một số dữ liệu mẫu
    await connection.query('USE e_commerce');
    
    // Lấy danh sách category_id đã có
    const [categories] = await connection.query('SELECT id, slug FROM categories');
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });
    
    // Thêm sản phẩm mẫu
    const sampleProducts = [
      {
        name: 'Áo thun nam đen',
        description: 'Áo thun nam đen cổ tròn, chất liệu cotton',
        image: '/images/product_1.jpg',
        category: 'men',
        new_price: 299000,
        old_price: 350000
      },
      {
        name: 'Đầm nữ hoa',
        description: 'Đầm nữ họa tiết hoa, chất liệu vải lụa mềm mại',
        image: '/images/product_2.jpg',
        category: 'women',
        new_price: 450000,
        old_price: 550000
      },
      {
        name: 'Áo khoác denim',
        description: 'Áo khoác denim cao cấp, phong cách hiện đại',
        image: '/images/product_3.jpg',
        category: 'men',
        new_price: 699000,
        old_price: 850000
      },
      {
        name: 'Túi xách nữ',
        description: 'Túi xách da thật cao cấp, thiết kế sang trọng',
        image: '/images/product_4.jpg',
        category: 'women',
        new_price: 1290000,
        old_price: 1500000
      },
      {
        name: 'Áo thun trẻ em',
        description: 'Áo thun cotton dành cho bé, màu sắc tươi sáng',
        image: '/images/product_5.jpg',
        category: 'kid',
        new_price: 199000,
        old_price: 250000
      }
    ];

    for (const product of sampleProducts) {
      // Lấy category_id từ category
      const categoryId = categoryMap[product.category];
      
      // Kiểm tra xem sản phẩm đã tồn tại chưa
      const [existingProducts] = await connection.query(
        'SELECT id FROM products WHERE name = ? AND category_id = ?',
        [product.name, categoryId]
      );

      if (existingProducts.length === 0) {
        await connection.query(
          'INSERT INTO products (name, description, image, category_id, new_price, old_price) VALUES (?, ?, ?, ?, ?, ?)',
          [product.name, product.description, product.image, categoryId, product.new_price, product.old_price]
        );
        console.log(`Đã thêm sản phẩm: ${product.name}`);
      } else {
        console.log(`Sản phẩm đã tồn tại: ${product.name}`);
      }
    }
    
    console.log('Đã thêm dữ liệu mẫu vào cơ sở dữ liệu!');
    
    // Đóng kết nối
    await connection.end();
    
  } catch (error) {
    console.error('Lỗi khi thiết lập cơ sở dữ liệu:', error);
  }
}

setupDatabase(); 