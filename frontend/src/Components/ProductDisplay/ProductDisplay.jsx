import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretRight, faClose, faHeart, faMinus, faMoneyBill, faPeopleArrows, faPlus, faRightLong, faShip } from "@fortawesome/free-solid-svg-icons";
import ProductOtherData from "../ProductOtherData/ProductOtherData";
import { formatCurrency } from "../../Utils/formatCurrency";
import ProductStore from "../ProductStore/ProductStore";
import { Link } from "react-router-dom";
import { backend_url } from "../../App";

const ProductDisplay = ({ product }) => {
    // Ensure product has necessary properties with default values
    const colors = product.colors || [];
    const sizes = product.sizes || [];
    
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedColorImage, setSelectedColorImage] = useState(
        colors.length > 0 && colors[0].image ? colors[0].image : product.image
    );
    const [amountSelected, setAmountSelected] = useState(1);
    const { addToCart } = useContext(ShopContext) || {};
    const [showSlideCart, setShowSlideCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (colors.length > 0 && colors[selectedColor] && colors[selectedColor].image) {
            setSelectedColorImage(colors[selectedColor].image);
        } else {
            // Fallback to the main product image if no color image is available
            setSelectedColorImage(product.image);
        }
    }, [selectedColor, colors, product.image]);

    // Fetch cart items when slide cart is opened
    useEffect(() => {
        if (showSlideCart) {
            fetchCartItems();
        }
    }, [showSlideCart]);

    // Function to fetch cart items
    const fetchCartItems = async () => {
        const authToken = localStorage.getItem('auth-token');
        if (!authToken) return;

        try {
            // Thử sử dụng API mới
            const response = await fetch(`${backend_url}/cart`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                // Nếu API mới không hoạt động (404), sử dụng API cũ
                if (response.status === 404) {
                    console.log("Using fallback API for fetching cart...");
                    const fallbackResponse = await fetch(`${backend_url}/getcart`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'auth-token': authToken,
                            'Content-Type': 'application/json',
                        }
                    });
                    
                    if (fallbackResponse.ok) {
                        try {
                            const fallbackData = await fallbackResponse.json();
                            // Chuyển đổi dữ liệu từ API cũ về định dạng tương thích
                            const cartProductIds = Object.keys(fallbackData);
                            if (cartProductIds.length > 0) {
                                // Lấy thông tin chi tiết sản phẩm
                                const productPromises = cartProductIds.map(async (productId) => {
                                    const productResponse = await fetch(`${backend_url}/product/${productId}`);
                                    if (productResponse.ok) {
                                        const productData = await productResponse.json();
                                        return {
                                            id: productId,
                                            product_id: productId,
                                            quantity: fallbackData[productId],
                                            name: productData.name,
                                            image: productData.image,
                                            new_price: productData.new_price,
                                            old_price: productData.old_price
                                        };
                                    }
                                    return null;
                                });
                                
                                const cartItems = (await Promise.all(productPromises)).filter(item => item !== null);
                                setCartItems(cartItems);
                            } else {
                                setCartItems([]);
                            }
                        } catch (parseError) {
                            console.error('Error parsing fallback response:', parseError);
                            setCartItems([]);
                        }
                        return;
                    } else {
                        console.error('Error fetching cart (fallback):', await fallbackResponse.text());
                        setCartItems([]);
                        return;
                    }
                }
                console.error('Error fetching cart:', await response.text());
                setCartItems([]);
                return;
            }

            try {
                const data = await response.json();
                if (data.success) {
                    setCartItems(data.cartItems || []);
                } else {
                    console.error('Failed to fetch cart items:', data.message);
                    setCartItems([]);
                }
            } catch (parseError) {
                console.error('Error parsing response:', parseError);
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setCartItems([]);
        }
    };

    // Function to add product to cart
    const addToCartHandler = async () => {
        if (!localStorage.getItem("auth-token")) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
            return;
        }

        setLoading(true);
        try {
            // Thử sử dụng API mới
            const response = await fetch(`${backend_url}/cart/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem("auth-token"),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: amountSelected
                }),
            });

            if (!response.ok) {
                // Nếu API mới không hoạt động, thử API cũ
                if (response.status === 404) {
                    console.log("Using fallback API...");
                    const fallbackResponse = await fetch(`${backend_url}/addtocart`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'auth-token': localStorage.getItem("auth-token"),
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "itemId": product.id }),
                    });
                    
                    if (fallbackResponse.ok) {
                        showSuccessMessage('Đã thêm sản phẩm vào giỏ hàng');
                        // Chờ một chút trước khi làm mới giỏ hàng để đảm bảo dữ liệu đã được lưu
                        setTimeout(() => {
                            fetchCartItems();
                            setShowSlideCart(true);
                        }, 300);
                        
                        if (addToCart) {
                            addToCart(product.id);
                        }
                    } else {
                        showErrorMessage('Không thể thêm vào giỏ hàng');
                        console.error('Fallback API failed:', await fallbackResponse.text());
                    }
                } else {
                    showErrorMessage('Không thể thêm vào giỏ hàng');
                    console.error('Error with new API:', await response.text());
                }
            } else {
                try {
                    const data = await response.json();
                    
                    if (data.success) {
                        showSuccessMessage(data.message || 'Đã thêm sản phẩm vào giỏ hàng');
                        fetchCartItems(); // Refresh cart items
                        setShowSlideCart(true); // Show cart sidebar
                        
                        // Also update the ShopContext if it exists
                        if (addToCart) {
                            addToCart(product.id);
                        }
                    } else {
                        showErrorMessage(data.message || 'Không thể thêm vào giỏ hàng');
                    }
                } catch (parseError) {
                    console.error('Error parsing response:', parseError);
                    // Assume success if we can't parse the response but the request was OK
                    showSuccessMessage('Đã thêm sản phẩm vào giỏ hàng');
                    fetchCartItems();
                }
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showErrorMessage('Đã xảy ra lỗi khi thêm vào giỏ hàng');
        } finally {
            setLoading(false);
        }
    };

    // Function to buy now
    const buyNowHandler = async () => {
        await addToCartHandler();
        // Navigate to checkout page
        window.location.href = "/checkout";
    };

    // Hiển thị thông báo sau khi thêm vào giỏ hàng thành công
    const showSuccessMessage = (message) => {
        setMessage({ type: 'success', text: message || 'Đã thêm sản phẩm vào giỏ hàng' });
        setTimeout(() => setMessage(null), 3000);
        fetchCartItems();
        setShowSlideCart(true);
    };

    // Hiển thị thông báo khi có lỗi
    const showErrorMessage = (message) => {
        setMessage({ type: 'error', text: message || 'Không thể thêm vào giỏ hàng' });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {colors.map((color, index) => (
                            <div key={index} className="productdisplay-img-list-item" onClick={() => {
                                setSelectedColor(index);
                            }}>
                            <img src={color.image || product.image} alt={`Color ${index + 1}`} />
                        </div>
                    ))}
                    
                    {/* If no colors are available, still show the main image */}
                    {colors.length === 0 && (
                        <div className="productdisplay-img-list-item">
                            <img src={product.image} alt={product.name} />
                            </div>
                    )}
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={selectedColorImage} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">{formatCurrency(product.old_price)}</div>
                    <div className="productdisplay-right-price-new">{formatCurrency(product.new_price)}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                
                {/* Only show color selection if colors are available */}
                {colors.length > 0 && (
                <div className="productdisplay-right-color">
                    <h1>Màu sắc</h1>
                    <div className="productdisplay-right-colors">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="productdisplay-right-color-item"
                                    onClick={() => {
                                        setSelectedColor(index);
                                    }}
                                    style={{
                                        border: selectedColor === index ? "2px solid black" : "2px solid #eee"
                                    }}
                                >
                                    <img src={color.image || product.image} alt={`Color ${index + 1}`} style={{
                                        width: "auto",
                                        height: "40px"
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Only show size selection if sizes are available */}
                {sizes.length > 0 && (
                    <div className="productdisplay-right-size">
                    <h1>Kích thước</h1>
                    <div className="productdisplay-right-sizes">
                            {sizes.map((size, index) => (
                                <div
                                    key={index}
                                    className="productdisplay-right-size-item"
                                    onClick={() => {
                                        setSelectedSize(index);
                                    }}
                                    style={{
                                        border: selectedSize === index ? "2px solid black" : "2px solid #eee"
                                    }}
                                >
                                    <p>{size.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* amount of product */}
                <div className="productdisplay-right-amount">
                    <div className="productdisplay-right-amount-item">
                        <div
                            className="productdisplay-right-amount-icon"
                            onClick={() => {
                                if (amountSelected > 1) {
                                    setAmountSelected(amountSelected - 1);
                                }
                            }}
                            style={{
                                cursor: amountSelected > 1 ? "pointer" : "not-allowed",
                                opacity: amountSelected > 1 ? 1 : 0.5
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} className="productdisplay-right-amount-icon" style={{ fontSize: "15px" }} />
                        </div>
                        <p>{amountSelected}</p>
                        <div
                            className="productdisplay-right-amount-icon"
                            onClick={() => {
                                setAmountSelected(amountSelected + 1);
                            }}
                            style={{
                                cursor: "pointer",
                                opacity: 1
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} className="productdisplay-right-amount-icon" style={{ fontSize: "15px" }} />
                        </div>
                    </div>
                </div>
                
                {/* Display message if there is one */}
                {message && (
                    <div className={`message ${message.type}`} style={{
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '4px',
                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24'
                    }}>
                        {message.text}
                    </div>
                )}
                
                <div className="flex gap-4">
                    <button 
                        onClick={addToCartHandler} 
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Đang xử lý...' : 'Thêm vào giỏ hàng'}
                    </button>
                    <button 
                        onClick={buyNowHandler}
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Đang xử lý...' : 'Mua ngay'}
                    </button>
                </div>
                <div>
                    <button className="outline flex gap-2 items-center justify-center">
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        <span>Yêu thích</span>
                    </button>
                </div>
                {/* Store infor  */}
                <ProductStore />
                {/* Product infor */}
                <ProductOtherData content={"Thông tin của sẩn phẩm"} title="Thông tin sản phẩm" />
                <ProductOtherData content={"Chính sách đổi trả"} title="Chính sách đổi trả" />
                <ProductOtherData content={"ƯU ĐÃI MEMBER"} title="ƯU ĐÃI MEMBER" />
                <ProductOtherData icon={<FontAwesomeIcon icon={faShip} />} content={""} title="GIAO HÀNG NỘI THÀNH TRONG 24 GIỜ" />
                <ProductOtherData icon={<FontAwesomeIcon icon={faMoneyBill} />} content={""} title="GĐỔI HÀNG TRONG 30 NGÀY" />
                <ProductOtherData icon={<FontAwesomeIcon icon={faPeopleArrows} />} content={""} title="TỔNG ĐÀI BÁN HÀNG 096728.4444" />
            </div>

            {/* Cart */}
            {/* Overlay */}
            <div className={`fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.3)] ${showSlideCart ? 'block' : 'hidden'}`} onClick={() => {
                setShowSlideCart(false);
            }}></div>
            {/* Cart */}
            <div className="p-4 fixed top-0 right-0 w-[450px] h-screen bg-white z-30 shadow-lg transition-transform duration-300 ease-in-out transform translate-x-full" style={{ transform: showSlideCart ? "translateX(0)" : "translateX(100%)" }}>
                <div className="absolute top-5 right-5 cursor-pointer hover:text-red-400 text-lg text-gray-400" onClick={() => {
                    setShowSlideCart(false);
                }}>
                    <FontAwesomeIcon icon={faClose} />
                </div>

                <div className="flex items-center justify-between pt-[60px]">
                    <div className="flex items-start justify-start gap-1 mb-4 flex-col">
                        <h3>Giỏ hàng</h3>
                        <p>Bạn đang có <span className="font-semibold">{cartItems.length}</span> sản phẩm trong giỏ hàng.</p>
                    </div>
                </div>
                
                {/* list product cart */}
                <div className="productdisplay-right-cart-list max-h-[300px] overflow-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-center py-4">Giỏ hàng trống</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="productdisplay-right-cart-item flex items-center justify-start gap-4 border-t pt-3 mb-3">
                                <img 
                                    src={item.image ? `${backend_url}${item.image}` : selectedColorImage} 
                                    alt={item.name} 
                                    className="w-[100px] rounded-sm border" 
                                />
                        <div className="productdisplay-right-cart-item-infor flex items-start justify-start flex-col gap-1">
                                    <h3 className="text-sm">
                                        {item.name} 
                                        {item.color && ` - ${item.color}`} 
                                        {item.size && ` - ${item.size}`}
                                    </h3>
                                    <p className="text-sm font-semibold">
                                        {formatCurrency(item.new_price)} 
                                        <span className="italic">x{item.quantity}</span>
                                    </p>
                                    <div 
                                        className="border cursor-pointer hover:bg-gray-200 p-1 rounded-sm flex items-center justify-between w-fit text-sm"
                                        onClick={async () => {
                                            if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                                                try {
                                                    // Thử sử dụng API mới
                                                    const response = await fetch(`${backend_url}/cart/remove/${item.id}`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'auth-token': localStorage.getItem("auth-token"),
                                                            'Content-Type': 'application/json',
                                                        },
                                                    });
                                                    
                                                    if (!response.ok) {
                                                        // Nếu API mới không hoạt động, thử API cũ
                                                        if (response.status === 404) {
                                                            console.log("Using fallback API for removal...");
                                                            const fallbackResponse = await fetch(`${backend_url}/removefromcart`, {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'auth-token': localStorage.getItem("auth-token"),
                                                                    'Content-Type': 'application/json',
                                                                },
                                                                body: JSON.stringify({ "itemId": item.product_id }),
                                                            });
                                                            
                                                            if (fallbackResponse.ok) {
                                                                setTimeout(() => {
                                                                    fetchCartItems();
                                                                }, 300);
                                                                return;
                                                            } else {
                                                                console.error('Error using fallback removal:', await fallbackResponse.text());
                                                            }
                                                        } else {
                                                            console.error('Error removing item:', await response.text());
                                                        }
                                                    } else {
                                                        try {
                                                            const data = await response.json();
                                                            if (data.success) {
                                                                fetchCartItems(); // Refresh cart after removal
                                                            } else {
                                                                console.error('Error removing item:', data.message);
                                                            }
                                                        } catch (parseError) {
                                                            console.error('Error parsing response:', parseError);
                                                            // Still try to refresh in case it worked
                                                            fetchCartItems();
                                                        }
                                                    }
                                                } catch (error) {
                                                    console.error('Error removing item:', error);
                                                }
                                            }
                                        }}
                                    >
                                <span>Xóa</span>
                            </div>
                        </div>
                            </div>
                        ))
                    )}
                </div>
                
                <div className="productdisplay-right-cart-total flex items-center justify-between border-t-2 border-black font-semibold pt-4 mb-3 uppercase">
                    <h3 className="text-sm">Tổng cộng:</h3>
                    <p className="text-sm font-semibold">
                        {formatCurrency(
                            cartItems.reduce((total, item) => total + (item.new_price * item.quantity), 0)
                        )}
                    </p>
                </div>
                
                <div className="productdisplay-right-cart-action flex flex-col gap-3 items-center justify-between font-semibold mb-3 uppercase">
                    <button className="bg-black text-white p-2 rounded-sm w-full">
                        <Link to={"/checkout"} className="flex items-center justify-center gap-2 text-white">
                            Tiến hành đặt hàng
                        </Link>
                    </button>
                    <button className="p-2 rounded-sm w-full text-sm flex items-center justify-center gap-2 hover:text-red-400">
                        <Link to={"/cart"}>
                            Xem chi tiết giỏ hàng <FontAwesomeIcon className="" icon={faArrowRight} />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
