import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url } from "../../App";
import { formatCurrency } from "../../Utils/formatCurrency";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { Link, useNavigate } from "react-router-dom";

const CartItems = () => {
    const navigate = useNavigate();
    const { removeFromCart } = useContext(ShopContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const calculatedTotal = cartItems.reduce((sum, item) => {
                return sum + parseFloat(item.total_price || 0);
            }, 0);
            setTotalAmount(calculatedTotal);
        } else {
            setTotalAmount(0);
        }
    }, [cartItems]);

    console.log("cartItems", cartItems);
    
    // TESTING - Direct setting của cartItems nếu cần
    useEffect(() => {
        if (window.testCartData) {
            console.log("Using test cart data:", window.testCartData);
            setCartItems(window.testCartData);
        }
    }, []);

    const fetchCartItems = async () => {
        try {
            setIsLoading(true);
            const authToken = localStorage.getItem('auth-token');
            if (!authToken) {
                navigate('/login');
                return;
            }

            const response = await fetch(`${backend_url}/cart`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            console.log("Raw API response:", data);
            
            if (data.success) {
                // Đảm bảo cartItems là một mảng
                let items = data.cartItems || [];
                
                // Nếu không phải mảng, chuyển thành mảng
                if (!Array.isArray(items)) {
                    console.warn("cartItems is not an array, converting...");
                    if (typeof items === 'object') {
                        items = Object.values(items);
                    } else {
                        items = [];
                    }
                }
                
                console.log("Processed cartItems:", items);
                setCartItems(items);
                setTotalAmount(data.total || 0);
            } else {
                setError(data.message || 'Đã có lỗi xảy ra');
            }
        } catch (error) {
            setError('Đã có lỗi khi tải giỏ hàng');
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            try {
                const authToken = localStorage.getItem('auth-token');
                const response = await fetch(`${backend_url}/cart/remove/${itemId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': authToken,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    // Refresh cart after removal
                    fetchCartItems();
                    if (removeFromCart) {
                        removeFromCart(itemId);
                    }
                } else {
                    console.error('Error removing item:', await response.text());
                }
            } catch (error) {
                console.error('Error removing item:', error);
            }
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const authToken = localStorage.getItem('auth-token');
            const response = await fetch(`${backend_url}/cart/update/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity })
            });
            
            if (response.ok) {
                // Refresh cart after update
                fetchCartItems();
            } else {
                console.error('Error updating quantity:', await response.text());
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    console.log("Before render - cartItems:", cartItems, "isLoading:", isLoading, "error:", error);

    // Debugging logs
    console.log("Rendering CartItems with:", {
        cartItemsLength: cartItems ? cartItems.length : 0,
        isArray: Array.isArray(cartItems),
        firstItem: cartItems && cartItems.length > 0 ? cartItems[0] : null,
        isLoading,
        error
    });

    // Expose debug function to window for troubleshooting
    useEffect(() => {
        // Expose setCartItems to window for debugging
        window.debugCart = {
            getCartItems: () => cartItems,
            setCartItems: (items) => {
                console.log("Manually setting cart items:", items);
                setCartItems(Array.isArray(items) ? items : []);
            },
            clearCart: () => setCartItems([]),
            addDummyItem: () => {
                const dummyItem = {
                    id: Date.now(),
                    name: "Test Product",
                    description: "Test Description",
                    image: "/images/image_1745135897240.webp",
                    new_price: "100",
                    old_price: "200",
                    quantity: 1,
                    total_price: "100"
                };
                setCartItems(prevItems => [...prevItems, dummyItem]);
            }
        };
    }, [cartItems]);

    if (isLoading) {
        return (
            <div className="cartitems">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="spinner mb-4"></div>
                        <p>Đang tải giỏ hàng...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
    return (
        <div className="cartitems">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            className="bg-black text-white px-4 py-2 rounded"
                            onClick={fetchCartItems}
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        console.log("Cart is empty or undefined");
        return (
            <div className="cartitems">
                <div className="flex justify-center items-center flex-col h-64">
                    <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
                    <p className="mb-4">Thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                    <Link to="/" className="bg-black text-white px-6 py-2 rounded">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        );
    }
    
    console.log("Rendering cart with items:", cartItems);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded shadow">
                        <img 
                            src={`${backend_url}${item.image}`} 
                            alt={item.name}
                            className="w-full h-48 object-cover mb-3 rounded"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                            }}
                        />
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        
                        <div className="flex justify-between items-center mt-2">
                            <div>
                                <span className="font-bold text-lg">{formatCurrency(item.new_price)}</span>
                                {item.old_price && (
                                    <span className="text-gray-500 line-through text-sm ml-2">
                                        {formatCurrency(item.old_price)}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center border rounded">
                                <button 
                                    className="px-3 py-1 bg-gray-100"
                                    onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >-</button>
                                <span className="px-3 py-1">{item.quantity}</span>
                                <button 
                                    className="px-3 py-1 bg-gray-100"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                >+</button>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t">
                            <span className="font-bold">Thành tiền: {formatCurrency(item.total_price)}</span>
                            <button 
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center text-xl font-bold">
                    <span>Tổng cộng:</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="mt-4 flex space-x-4">
                    <Link to="/checkout" className="bg-black text-white px-4 py-2 rounded flex-1 text-center hover:bg-gray-800">
                        Đặt hàng
                    </Link>
                    <Link to="/" className="border border-black px-4 py-2 rounded flex-1 text-center hover:bg-gray-100">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
