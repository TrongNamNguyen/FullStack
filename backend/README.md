# E-Commerce Backend

## Chuyển từ MongoDB sang MySQL

Backend của hệ thống đã được chuyển từ MongoDB sang MySQL để phù hợp với yêu cầu mới.

## Yêu cầu

1. Node.js (version 14 trở lên)
2. MySQL Server (version 8.0 trở lên)

## Cài đặt

1. Cài đặt các phụ thuộc:
   ```
   npm install
   ```

2. Cài đặt và cấu hình MySQL Server:
   - Đảm bảo MySQL Server đã được cài đặt và đang chạy
   - Mặc định ứng dụng sẽ kết nối tới MySQL với:
     - Host: localhost
     - User: root
     - Password: Clmmtt123
     - Database: e_commerce (sẽ được tạo tự động)

3. Thiết lập cơ sở dữ liệu:
   ```
   npm run setup
   ```
   Script này sẽ tạo cơ sở dữ liệu, các bảng cần thiết và thêm một số dữ liệu mẫu.

4. Chạy ứng dụng:
   ```
   npm start
   ```
   Server sẽ chạy trên cổng 4000: http://localhost:4000

## Cấu trúc cơ sở dữ liệu

- `users`: Lưu thông tin người dùng hệ thống
- `products`: Lưu thông tin sản phẩm
- `cart_items`: Lưu thông tin giỏ hàng của người dùng

## API Endpoints

- `/login`: Đăng nhập người dùng
- `/signup`: Đăng ký người dùng mới
- `/allproducts`: Lấy tất cả sản phẩm
- `/newcollections`: Lấy sản phẩm mới
- `/popularinwomen`: Lấy sản phẩm phổ biến cho nữ
- `/relatedproducts`: Lấy sản phẩm liên quan theo danh mục
- `/addtocart`: Thêm sản phẩm vào giỏ hàng
- `/removefromcart`: Xóa sản phẩm khỏi giỏ hàng
- `/getcart`: Lấy thông tin giỏ hàng
- `/addproduct`: Thêm sản phẩm mới (Admin)
- `/removeproduct`: Xóa sản phẩm (Admin)
- `/upload`: Tải lên hình ảnh sản phẩm

## Thay đổi Cấu hình MySQL

Nếu bạn cần thay đổi thông tin kết nối MySQL, chỉnh sửa các file sau:
- `db.js`: Thông tin kết nối cho ứng dụng chính
- `setup.js`: Thông tin kết nối cho script thiết lập ban đầu 