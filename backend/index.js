const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 4000;
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const pool = require('./db');

app.use(express.json());
app.use(cors());

// Image Storage Engine
const storage = multer.diskStorage({
	destination: './upload/images',
	filename: (req, file, cb) => {
		return cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

// Cấu hình multer để nhận field 'image' thay vì 'product'
const upload = multer({ storage: storage });

// Upload route sử dụng tên field 'image'
app.post('/upload', (req, res) => {
	try {
		// Sử dụng multer như một middleware thủ công để có thể bắt lỗi
		upload.single('image')(req, res, function(err) {
			if (err) {
				console.error('Upload error:', err);
				return res.status(400).json({
					success: 0,
					message: `Upload failed: ${err.message}`
				});
			}
			
			// Kiểm tra xem file có tồn tại không
			if (!req.file) {
				return res.status(400).json({
					success: 0,
					message: 'No file was uploaded'
				});
			}
			
			console.log('Upload successful:', req.file);
			
	res.json({
		success: 1,
		image_url: `/images/${req.file.filename}`,
	});
		});
	} catch (error) {
		console.error('Server error during upload:', error);
		res.status(500).json({
			success: 0,
			message: `Server error: ${error.message}`
		});
	}
});

// Route for Images folder
app.use('/images', express.static('upload/images'));

// MiddleWare to fetch user from token
const fetchuser = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) {
		res.status(401).send({
			errors: 'Please authenticate using a valid token',
		});
	}
	try {
		const data = jwt.verify(token, 'secret_ecom');
		req.user = data.user;
		next();
	} catch (error) {
		res.status(401).send({
			errors: 'Please authenticate using a valid token',
		});
	}
};

// ROOT API Route For Testing
app.get('/', (req, res) => {
	res.send('Root');
});

// Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
	console.log('Login');
	let success = false;
	
	try {
		// Kiểm tra xem frontend gửi username hay email
		const identifier = req.body.username || req.body.email;
		if (!identifier) {
			return res.status(400).json({
				success: false,
				errors: 'Vui lòng cung cấp tên đăng nhập hoặc email'
			});
		}

		// Tìm user theo username hoặc email
		const [rows] = await pool.query('SELECT * FROM users WHERE name = ? OR email = ?', [identifier, identifier]);
		const user = rows[0];
		
	if (user) {
		const passCompare = req.body.password === user.password;
		if (passCompare) {
			const data = {
				user: {
					id: user.id,
				},
			};
			success = true;
			console.log(user.id);
			const token = jwt.sign(data, 'secret_ecom');
			res.json({ success, token });
		} else {
			return res
				.status(400)
				.json({
					success: success,
						errors: 'Mật khẩu không chính xác',
				});
		}
	} else {
		return res
			.status(400)
			.json({
				success: success,
					errors: 'Tài khoản không tồn tại',
					});
			}
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({
			success: false,
			errors: 'Lỗi máy chủ'
			});
	}
});

//Create an endpoint at ip/auth for regestring the user & sending auth-token
app.post('/signup', async (req, res) => {
	console.log('Sign Up');
	let success = false;
	
	try {
		// Kiểm tra email đã tồn tại chưa
		const check = await User.findByEmail(req.body.email);
		
	if (check) {
		return res
			.status(400)
			.json({
				success: success,
				errors: 'existing user found with this email',
			});
	}
		
		// Tạo user mới
		const userId = await User.create({
		name: req.body.username,
		email: req.body.email,
			password: req.body.password
	});
		
	const data = {
		user: {
				id: userId,
		},
	};

	const token = jwt.sign(data, 'secret_ecom');
	success = true;
	res.json({ success, token });
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).json({
			success: false, 
			errors: 'Server error'
		});
	}
});

// CATEGORY ENDPOINTS

// Lấy tất cả danh mục
app.get('/categories', async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.json(categories);
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Lấy thông tin chi tiết một danh mục
app.get('/category/:id', async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: 'Danh mục không tồn tại'
			});
		}
		res.json({
			success: true,
			category: category
		});
	} catch (error) {
		console.error('Error fetching category:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Tạo danh mục mới
app.post('/addcategory', async (req, res) => {
	try {
		const result = await Category.create(req.body);
		console.log('Category Added');
		res.json(result);
	} catch (error) {
		console.error('Error adding category:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Cập nhật danh mục
app.put('/updatecategory/:id', async (req, res) => {
	try {
		const result = await Category.update(req.params.id, req.body);
		console.log('Category Updated');
		res.json(result);
	} catch (error) {
		console.error('Error updating category:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Xóa danh mục
app.post('/removecategory', async (req, res) => {
	try {
		const result = await Category.remove(req.body.id);
		console.log('Category Removed');
		res.json(result);
	} catch (error) {
		console.error('Error removing category:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// PRODUCT ENDPOINTS

// endpoint for getting all products data
app.get('/allproducts', async (req, res) => {
	try {
		const products = await Product.findAll();
	console.log('All Products');
	res.send(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).send('Server error');
	}
});

// endpoint for getting latest products data
app.get('/newcollections', async (req, res) => {
	try {
		const products = await Product.getNewCollections(8);
	console.log('New Collections');
		res.send(products);
	} catch (error) {
		console.error('Error fetching new collections:', error);
		res.status(500).send('Server error');
	}
});

// endpoint for getting products by category
app.get('/products/category/:id', async (req, res) => {
	try {
		const products = await Product.findByCategory(req.params.id);
		console.log(`Products by category ID: ${req.params.id}`);
		res.send(products);
	} catch (error) {
		console.error('Error fetching products by category:', error);
		res.status(500).send('Server error');
	}
});

// endpoint for getting womens products data
app.get('/popularinwomen', async (req, res) => {
	try {
		// Tìm danh mục "Nữ" (thường là ID 1)
		const [womenCategory] = await pool.query('SELECT id FROM categories WHERE name = "Nữ" OR name = "Women" LIMIT 1');
		let womenCategoryId = 1; // Mặc định là 1 nếu không tìm thấy
		
		if (womenCategory && womenCategory.length > 0) {
			womenCategoryId = womenCategory[0].id;
		}
		
		const products = await Product.findByCategory(womenCategoryId, 4);
	console.log('Popular In Women');
		res.send(products);
	} catch (error) {
		console.error('Error fetching popular in women:', error);
		res.status(500).send('Server error');
	}
});

// endpoint for getting related products data
app.post('/relatedproducts', async (req, res) => {
	try {
	console.log('Related Products');
		const { category_id } = req.body;
		if (!category_id) {
			return res.status(400).json({ success: false, message: 'Category ID is required' });
		}
		const products = await Product.findByCategory(category_id, 4);
		res.send(products);
	} catch (error) {
		console.error('Error fetching related products:', error);
		res.status(500).send('Server error');
	}
});

// CART ENDPOINTS

// Lấy giỏ hàng của user
app.get('/cart', fetchuser, async (req, res) => {
	try {
		console.log('Get Cart');
		const result = await Cart.getByUserId(req.user.id);
		res.json(result);
	} catch (error) {
		console.error('Error getting cart:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Thêm sản phẩm vào giỏ hàng
app.post('/cart/add', fetchuser, async (req, res) => {
	try {
		console.log('Add to Cart (New API)');
		const { product_id, quantity = 1 } = req.body;
		
		if (!product_id) {
			return res.status(400).json({
				success: false,
				message: 'product_id là bắt buộc'
			});
		}
		
		const result = await Cart.addItem(req.user.id, {
			product_id,
			quantity
		});
		
		res.json(result);
	} catch (error) {
		console.error('Error adding to cart:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
app.put('/cart/update/:id', fetchuser, async (req, res) => {
	try {
		console.log('Update Cart Item');
		const { quantity } = req.body;
		
		if (quantity === undefined) {
			return res.status(400).json({
				success: false,
				message: 'quantity là bắt buộc'
			});
		}
		
		const result = await Cart.updateQuantity(req.user.id, req.params.id, quantity);
		res.json(result);
	} catch (error) {
		console.error('Error updating cart item:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Xóa sản phẩm khỏi giỏ hàng
app.delete('/cart/remove/:id', fetchuser, async (req, res) => {
	try {
		console.log('Remove Cart Item');
		const result = await Cart.removeItem(req.user.id, req.params.id);
		res.json(result);
	} catch (error) {
		console.error('Error removing cart item:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Xóa toàn bộ giỏ hàng
app.delete('/cart/clear', fetchuser, async (req, res) => {
	try {
		console.log('Clear Cart');
		const result = await Cart.clearCart(req.user.id);
		res.json(result);
	} catch (error) {
		console.error('Error clearing cart:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// ORDER ENDPOINTS

// Lấy danh sách đơn hàng của user
app.get('/orders', fetchuser, async (req, res) => {
	try {
		console.log('Get Orders');
		const result = await Order.getByUserId(req.user.id);
		res.json(result);
	} catch (error) {
		console.error('Error getting orders:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Lấy chi tiết đơn hàng
app.get('/order/:id', fetchuser, async (req, res) => {
	try {
		console.log('Get Order Detail');
		const result = await Order.getById(req.params.id, req.user.id);
		res.json(result);
	} catch (error) {
		console.error('Error getting order detail:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Tạo đơn hàng mới
app.post('/order/create', fetchuser, async (req, res) => {
	try {
		console.log('=== CREATE ORDER API CALLED ===');
		console.log('User ID:', req.user.id);
		console.log('Request body:', req.body);
		console.log('Authentication token present:', !!req.header('auth-token'));
		
		const { shipping_address, phone_number, email, payment_method, notes } = req.body;
		
		// Validate required fields
		if (!shipping_address || !phone_number || !email) {
			console.log('Missing required fields');
			console.log('shipping_address:', shipping_address);
			console.log('phone_number:', phone_number);
			console.log('email:', email);
			
			return res.status(400).json({
				success: false,
				message: 'Thiếu thông tin cần thiết để tạo đơn hàng'
			});
		}
		
		// Kiểm tra giỏ hàng trước khi tạo đơn hàng
		console.log('Checking cart for user:', req.user.id);
		const cartCheck = await pool.query(
			`SELECT COUNT(*) as count FROM cart WHERE user_id = ?`,
			[req.user.id]
		);
		const cartCount = cartCheck[0][0].count;
		console.log('Cart items count:', cartCount);
		
		if (cartCount === 0) {
			console.log('Cart is empty, cannot create order');
			return res.status(400).json({
				success: false,
				message: 'Giỏ hàng trống, không thể tạo đơn hàng'
			});
		}
		
		console.log('Creating order with data:', {
			shipping_address,
			phone_number,
			email,
			payment_method: payment_method || 'cod',
			notes: notes || ''
		});
		
		const result = await Order.create(req.user.id, {
			shipping_address,
			phone_number,
			email,
			payment_method: payment_method || 'cod',
			notes: notes || ''
		});
		
		console.log('Order creation result:', result);
		
		res.json(result);
	} catch (error) {
		console.error('=== ERROR CREATING ORDER ===');
		console.error('Error details:', error);
		console.error('Error message:', error.message);
		console.error('Error stack:', error.stack);
		
		res.status(500).json({
			success: false,
			message: 'Server error: ' + error.message
		});
	}
});

// Hủy đơn hàng
app.post('/order/cancel/:id', fetchuser, async (req, res) => {
	try {
		console.log('Cancel Order');
		const result = await Order.cancel(req.params.id, req.user.id);
		res.json(result);
	} catch (error) {
		console.error('Error cancelling order:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// ADMIN ORDER ENDPOINTS

// Lấy tất cả đơn hàng (Admin)
app.get('/admin/orders', fetchuser, async (req, res) => {
	try {
		// Kiểm tra quyền admin
		// Tạm thời bỏ qua phần này, bạn có thể thêm sau
		
		console.log('Admin Get All Orders');
		const { limit, offset } = req.query;
		const result = await Order.getAll(
			limit ? parseInt(limit) : null,
			offset ? parseInt(offset) : 0
		);
		res.json(result);
	} catch (error) {
		console.error('Error getting all orders:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// Cập nhật trạng thái đơn hàng (Admin)
app.put('/admin/order/:id', fetchuser, async (req, res) => {
	try {
		// Kiểm tra quyền admin
		// Tạm thời bỏ qua phần này, bạn có thể thêm sau
		
		console.log('Admin Update Order Status');
		const { status, payment_status } = req.body;
		
		if (!status && !payment_status) {
			return res.status(400).json({
				success: false,
				message: 'Không có thông tin cập nhật'
			});
		}
		
		const result = await Order.updateStatus(req.params.id, {
			status,
			payment_status
		});
		
		res.json(result);
	} catch (error) {
		console.error('Error updating order status:', error);
		res.status(500).json({
			success: false,
			message: 'Server error'
		});
	}
});

// DEPRECATION NOTICE - Các API cũ sẽ bị thay thế
// Các API cũ này được giữ lại để tương thích ngược, nhưng nên sử dụng API mới

// DEPRECATED - Sử dụng /cart thay thế
app.post('/getcart', fetchuser, async (req, res) => {
	try {
		console.log('Get Cart (DEPRECATED)');
		const [items] = await pool.query(
			`SELECT c.id, c.product_id, c.quantity, 
			p.name, p.image, p.new_price, p.old_price, p.description  
			FROM cart c
			JOIN products p ON c.product_id = p.id
			WHERE c.user_id = ?`,
			[req.user.id]
		);
		
		// Cách 1: Trả về định dạng cũ (key-value)
		const cartData = {};
		items.forEach(item => {
			cartData[item.product_id] = item.quantity;
		});
		
		res.json(cartData);
	} catch (error) {
		console.error('Error getting cart (deprecated):', error);
		res.status(500).send('Server error');
	}
});

// DEPRECATED - Sử dụng /cart/add thay thế
app.post('/addtocart', fetchuser, async (req, res) => {
	try {
		console.log('Add Cart (DEPRECATED)');
		await Cart.addItem(req.user.id, {
			product_id: req.body.itemId,
			quantity: 1
		});
	res.send('Added');
	} catch (error) {
		console.error('Error adding to cart (deprecated):', error);
		res.status(500).send('Server error');
	}
});

// DEPRECATED - Sử dụng /cart/remove/:id thay thế
app.post('/removefromcart', fetchuser, async (req, res) => {
	try {
		console.log('Remove Cart (DEPRECATED)');
		// Tìm cart item dựa trên product_id
		const [existingItem] = await pool.query(
			'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
			[req.user.id, req.body.itemId]
		);
		
		if (existingItem.length > 0) {
			const cartItemId = existingItem[0].id;
			const newQuantity = existingItem[0].quantity - 1;
			
			// Sử dụng Cart.updateQuantity để cập nhật hoặc xóa nếu số lượng <= 0
			await Cart.updateQuantity(req.user.id, cartItemId, newQuantity);
			res.send('Removed');
		} else {
			res.status(404).send('Item not found');
		}
	} catch (error) {
		console.error('Error removing from cart (deprecated):', error);
		res.status(500).send('Server error');
	}
});

// Create an endpoint for adding products using admin panel
app.post('/addproduct', async (req, res) => {
	try {
		const result = await Product.create(req.body);
		
		if (result.success === false) {
			return res.status(400).json(result);
		}
		
		console.log('Product Added');
		res.json({ success: true, name: req.body.name });
	} catch (error) {
		console.error('Error adding product:', error);
		res.status(500).send('Server error');
	}
});

// Create an endpoint for removing products using admin panel
app.post('/removeproduct', async (req, res) => {
	try {
		const result = await Product.remove(req.body.id);
		console.log('Product Removed');
		res.json(result);
	} catch (error) {
		console.error('Error removing product:', error);
		res.status(500).send('Server error');
	}
});

// API lấy thông tin chi tiết 1 sản phẩm
app.get('/product/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
		}
		
		// Ensure we have colors and sizes arrays even if empty
		product.colors = product.colors || [];
		product.sizes = product.sizes || [];
		
		res.json(product);
	} catch (error) {
		console.error('Error fetching product details:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// API cập nhật thông tin sản phẩm
app.put('/updateproduct/:id', async (req, res) => {
	try {
		const result = await Product.update(req.params.id, req.body);
		console.log('Product Updated');
		res.json(result);
	} catch (error) {
		console.error('Error updating product:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// API cập nhật trạng thái hiển thị sản phẩm
app.put('/updateavailability/:id', async (req, res) => {
	try {
		const result = await Product.updateAvailability(req.params.id, req.body.available);
		console.log('Product Availability Updated');
		res.json(result);
	} catch (error) {
		console.error('Error updating product availability:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// Starting Express Server
app.listen(port, (error) => {
	if (!error) console.log('Server Running on port ' + port);
	else console.log('Error : ', error);
});
