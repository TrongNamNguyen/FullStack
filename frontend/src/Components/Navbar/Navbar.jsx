import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Assets/atino-logo.jpg';
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faPhone, faUser, faBars, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

// HARD CODE
const MENUS = [
    { name: "Trang chủ", path: "/" },
    { name: "ÁO XUÂN HÈ", path: "/ao-xuan-he" },
    { name: "QUẦN", path: "/quan" },
    { name: "PHỤ KIỆN", path: "/phukien" },
    { name: "Thông Tin", path: "/thongtin" },
    { name: "Đơn hàng", path: "/orders" },
];

const Navbar = () => {
    const [user, setUser] = useState(null);
    const { getTotalCartItems } = useContext(ShopContext);
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);  // state để kiểm soát việc hiển thị menu mobile
    const location = useLocation();  // Để lấy đường dẫn hiện tại

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);  // Navbar sẽ trở thành fixed khi cuộn xuống
        } else {
            setScrolled(false); // Khi cuộn lên, navbar trở về vị trí ban đầu
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="nav-wrapper">
            {/* Subnav */}
            <div className={`${scrolled ? 'hidden' : 'flex'} subnav`}>
                <div className="subnav-phone">
                    <FontAwesomeIcon icon={faPhone} className="subnav-phone-icon" />
                    <p>+91 1234567890</p>
                </div>
                <div className="subnav-action">
                    <div className="user">
                        {user ? (
                            <>
                                <FontAwesomeIcon icon={faUser} className="subnav-user-icon" />
                                <p>{user}</p>
                            </>
                        ) : (
                            <Link className="login-link" to="/login" style={{ textDecoration: 'none' }}>
                                <FontAwesomeIcon icon={faUser} className="subnav-user-icon" />
                                <p>Đăng nhập</p>
                            </Link>
                        )}
                    </div>
                    <Link to="/orders" className="order-link">
                        <FontAwesomeIcon icon={faBoxOpen} className="subnav-orders-icon" />
                        <p>Đơn hàng</p>
                    </Link>
                    <Link to="/cart" className="cart-link">
                        <FontAwesomeIcon icon={faBagShopping} className="subnav-cart-icon" />
                        <div className="amout-cart">Giỏ hàng ({getTotalCartItems()})</div>
                    </Link>
                </div>
            </div>

            {/* Mainnav */}
            <div className={`${scrolled ? 'fixed' : ''} nav bg-white shadow-md z-20 top-0 left-0 right-0 py-3 px-6`}>
                <div className="nav-container flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <Link to="/" className="nav-logo mr-8">
                            <img src={logo} alt="logo" className="h-10" />
                        </Link>

                        {/* Menu Desktop */}
                        <ul className="nav-menu hidden md:flex">
                            {MENUS.map((item, i) => (
                                <li
                                    key={i}
                                    className={location.pathname === item.path ? 'nav-menu-item active' : 'nav-menu-item'}
                                >
                                    <Link to={item.path} style={{ textDecoration: 'none' }}>
                                        {item.name}
                                    </Link>
                                    <div className='border-b'></div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Menu Mobile Icon */}
                    <div className="md:hidden">
                        <FontAwesomeIcon
                            icon={faBars}
                            className="nav-mobile-icon text-gray-700 text-xl"
                            onClick={() => setShowMenu(!showMenu)}
                        />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div className={`fixed top-0 left-0 right-0 bottom-0 z-30 bg-[rgba(0,0,0,0.3)] ${showMenu ? 'block' : 'hidden'}`} onClick={() => {
                setShowMenu(false);
            }}></div>

            {/* Mobile Menu */}
            <div className={`nav-mobile-menu fixed top-0 left-0 right-0 bottom-0 bg-white z-40 w-[300px] shadow-lg ${showMenu ? 'translate-x-0' : 'translate-x-[-100%]'} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center bg-black text-white p-4">
                    <h3 className="uppercase font-bold">Menu</h3>
                    <button onClick={() => setShowMenu(false)} className="text-white text-xl">&times;</button>
                </div>
                <ul className="nav-menu-mobile">
                    {MENUS.map((item, i) => (
                        <li key={i} className="border-b border-gray-200 hover:bg-gray-50">
                            <Link 
                                to={item.path} 
                                className={`block p-4 ${location.pathname === item.path ? 'text-black font-bold' : 'text-gray-700'}`}
                                onClick={() => {
                                    setShowMenu(false);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="p-4 border-t border-gray-200">
                    <Link to="/cart" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded">
                        <FontAwesomeIcon icon={faBagShopping} />
                        <span>Giỏ hàng ({getTotalCartItems()})</span>
                    </Link>
                    <Link to="/orders" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded">
                        <FontAwesomeIcon icon={faBoxOpen} />
                        <span>Đơn hàng</span>
                    </Link>
                    <Link to="/login" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded">
                        <FontAwesomeIcon icon={faUser} />
                        <span>{user ? user : 'Đăng nhập'}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
