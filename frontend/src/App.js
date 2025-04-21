import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import ShopCategory from './Pages/ShopCategory';
import women_banner from './Components/Assets/banner_women.png';
import banner from './Components/Assets/banner3.jpg';
import kid_banner from './Components/Assets/banner_kids.png';
import LoginSignup from './Pages/LoginSignup';
import Checkout from './Pages/Checkout';
import Infor from './Pages/Infor';
import Orders from './Pages/Orders';
import OrderDetail from './Pages/OrderDetail';

export const backend_url = 'http://localhost:4000';
export const currency = '$';

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Shop gender="all" />} />
					<Route
						path="/ao-xuan-he"
						element={
							<ShopCategory
								banner={banner}
								category="Áo Xuân Hè"
							/>
						}
					/>
					<Route
						path="/quan"
						element={
							<ShopCategory banner={banner} category="Quần" />
						}
					/>
					<Route
						path="/phukien"
						element={
							<ShopCategory banner={banner} category="Phụ Kiện" />
						}
					/>
					<Route path="/thongtin" element={<Infor />} />
					<Route path="/product" element={<Product />}>
						<Route path=":productId" element={<Product />} />
					</Route>
					<Route path="/cart" element={<Cart />}></Route>
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/login" element={<LoginSignup />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/order/:id" element={<OrderDetail />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
