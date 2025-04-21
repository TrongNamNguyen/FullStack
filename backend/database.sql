-- Tạo database nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS e_commerce;
USE e_commerce;

-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  image VARCHAR(255)
);

-- Thêm các danh mục mặc định
INSERT INTO categories (name, description) 
VALUES 
('Nữ', 'Sản phẩm thời trang dành cho nữ'),
('Nam', 'Sản phẩm thời trang dành cho nam'),
('Trẻ em', 'Sản phẩm thời trang dành cho trẻ em')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Tạo bảng products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  new_price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  available BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Tạo bảng cart_items
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Indices để tối ưu truy vấn
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_cart_items_user_product ON cart_items(user_id, product_id); 