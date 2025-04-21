"use client";
import DropDownSelect from "../Components/DropDownSelect/DropDownSelect";
import Field from "../Components/Filed/Filed";
import PaymentOptions from "../Components/PaymentOption/PaymentOption";
import React, { useEffect, useState } from "react";
import momo from "../Components/Assets/momo.webp";
import visa from "../Components/Assets/visa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// import { useAppProvider } from "@/contexts/AppProvider";
// import { useRouter } from "next/navigation";
// import AxiosInstance from "@/utils/axiosInstance";
import { faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
import ProductCartItem from "../Components/ProductCartItem/ProductCartItem";
import SummaryBill from "../Components/SummaryBill/SummaryBill";
import { useNavigate } from 'react-router-dom';
import { backend_url } from '../App';
import { formatCurrency } from '../Utils/formatCurrency';

function Checkout() {
    const navigate = useNavigate();
    // Submit order
    // const [canSubmit, setCanSubmit] = useState(true);

    // Locations
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [province, setProvince] = useState("");
    const [provinceError, setProvinceError] = useState("");
    const [district, setDistrict] = useState("");
    const [districtError, setDistrictError] = useState("");
    const [ward, setWard] = useState("");
    const [wardError, setWardError] = useState("");

    // Get demo product in cookies
    const [cart, setCart] = useState([]);

    // Fields
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");

    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingAddressError, setShippingAddressError] = useState("");

    const [paymentError, setPaymentError] = useState("");

    const [discountPercent, setDiscountPercent] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState("");

    // Discount
    const [discountCode, setDiscountCode] = useState("");
    const [discountError, setDiscountError] = useState("");

    // Total
    const [total, setTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);

    // Provider
    //   const { setAlertMessage, setAlertType, setTotalCart } = useAppProvider();

    // Lấy thông tin của người dùng từ localStorage nếu có
    //   useEffect(() => {
    //     const phone = localStorage.getItem("phone");
    //     const firstName = localStorage.getItem("firstName");
    //     const lastName = localStorage.getItem("lastName");
    //     const shippingAddress = localStorage.getItem("shippingAddress");
    //     const province = localStorage.getItem("province");
    //     const district = localStorage.getItem("district");
    //     const ward = localStorage.getItem("ward");
    //     const paymentMethod = localStorage.getItem("paymentMethod");

    //     // console.log("Phone", phone);
    //     // console.log("FirstName", firstName);
    //     // console.log("LastName", lastName);
    //     // console.log("ShippingAddress", shippingAddress);
    //     // console.log("Province", province);
    //     // console.log("District", district);
    //     // console.log("Ward", ward);
    //     // console.log("PaymentMethod", paymentMethod);

    //     if (phone) {
    //       setPhone(phone);
    //     }

    //     if (firstName) {
    //       setFirstName(firstName);
    //     }

    //     if (lastName) {
    //       setLastName(lastName);
    //     }

    //     if (shippingAddress) {
    //       setShippingAddress(shippingAddress);
    //     }

    //     if (province) {
    //       setProvince(province);
    //     }

    //     if (district) {
    //       setDistrict(district);
    //     }

    //     if (ward) {
    //       setWard(ward);
    //     }

    //     // if (paymentMethod) {
    //     //    setPaymentMethod(paymentMethod);
    //     // }
    //   }, []);

    // Reset cart
    const reset = () => {
        Cookies.remove("cart");
        // setTotalCart(0);
        setFirstName("");
        setLastName("");
        setPhone("");
        setShippingAddress("");
        setProvince("");
        setDistrict("");
        setWard("");
        setPaymentMethod("");
        setDiscountCode("");
        setTotal(0);
        setShippingFee(0);
        setCart([]);
        setDiscountPercent(0);
    };

    //   // Check discount
    //   const checkDiscount = () => {
    //     if (discountCode === "") {
    //       setDiscountError("Vui lòng nhập mã giảm giá");
    //       // isSubmit = false;
    //     } else {
    //       setDiscountError("");
    //     }

    //     if (discountCode === "VIPCUSTOMER") {
    //       setDiscountPercent(100);
    //     }
    //   };

    //   // Handle Order with payment method = 'pay-after-delivery'
    //   const handleOrder = async () => {
    //     let isSubmit = true;
    //     console.log("Handle Order");
    //     // Check empty fields
    //     if (phone === "") {
    //       setPhoneError("Vui lòng nhập số điện thoại");
    //       isSubmit = false;
    //     } else {
    //       setPhoneError("");
    //     }

    //     if (firstName === "") {
    //       setFirstNameError("Vui lòng nhập họ");
    //       isSubmit = false;
    //     } else {
    //       setFirstNameError("");
    //     }

    //     if (lastName === "") {
    //       setLastNameError("Vui lòng nhập tên");
    //       isSubmit = false;
    //     } else {
    //       setLastNameError("");
    //     }

    //     if (shippingAddress === "") {
    //       setShippingAddressError("Vui lòng nhập địa chỉ");
    //       isSubmit = false;
    //     } else {
    //       setShippingAddressError("");
    //     }

    //     if (paymentMethod === "") {
    //       setPaymentError("Vui lòng chọn phương thức thanh toán");
    //       isSubmit = false;
    //     } else {
    //       setPaymentError("");
    //     }

    //     if (province === "") {
    //       setProvinceError("Vui lòng chọn tỉnh/thành phố");
    //       isSubmit = false;
    //     } else {
    //       setProvinceError("");
    //     }

    //     if (district === "") {
    //       setDistrictError("Vui lòng chọn quận/huyện");
    //       isSubmit = false;
    //     } else {
    //       setDistrictError("");
    //     }

    //     if (ward === "") {
    //       setWardError("Vui lòng chọn phường/xã");
    //       isSubmit = false;
    //     } else {
    //       setWardError("");
    //     }

    //     if (!isSubmit) {
    //       console.log("Can't submit");
    //       return;
    //     }

    //     // Lưu thông tin người dùng vào localStorage
    //     localStorage.setItem("phone", phone);
    //     localStorage.setItem("firstName", firstName);
    //     localStorage.setItem("lastName", lastName);
    //     localStorage.setItem("shippingAddress", shippingAddress);
    //     localStorage.setItem("province", province);
    //     localStorage.setItem("district", district);
    //     localStorage.setItem("ward", ward);
    //     localStorage.setItem("paymentMethod", paymentMethod);

    //     const orderData = {
    //       totalPrice: total,
    //       paymentId: paymentMethod === "pay-after-delivery" ? 1 : 2, // ID của phương thức thanh toán
    //       shippingFee: shippingFee, // Phí vận chuyển
    //       shippingAddress:
    //         province + ", " + district + ", " + ward + ", " + shippingAddress, // Địa chỉ giao hàng
    //       discount: discountPercent, // Giảm giá
    //       phone: phone,
    //       customerName: firstName + " " + lastName,
    //       products: cart.map((item) => {
    //         return {
    //           productId: item.id, // Kiểm tra skuId ở đây
    //           price: item.skuPrice,
    //           quantity: item.quantity,
    //         };
    //       }), // Danh sách sản phẩm
    //     };

    //     // Kiểm tra orderData trước khi gửi
    //     // console.log("Order Data:", orderData);

    //     AxiosInstance.post('order/new', { ...orderData })
    //       .then((response) => {
    //         const data = response.data;
    //         if (data.statusCode === 200) {
    //           // Clear cart
    //           reset();

    //           // Back to cart page
    //           setAlertType("success");
    //           setAlertMessage(
    //             "Đơn hàng đã được ghi nhận, nhân viên chúng tôi sẽ liên hệ quý khách sớm nhất có thể để xác nhận đơn",
    //           );

    //           // Chuyển trang sau khi đặt hàng thành công về cart không load lại trang
    //           router.push("/cart");
    //         } else {
    //           toast.error(
    //             "Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ",
    //           );
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         toast.error(
    //           "Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ",
    //         );
    //         // console.error("Error fetching attributes", error);
    //       });

    //     // try {
    //     //   const response = await fetch("http://localhost:8008/api/v1/order/new", {
    //     //     method: "POST",
    //     //     headers: {
    //     //       "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify(orderData),
    //     //   });

    //     //   const data = await response.json();
    //     //   // console.log(data);
    //     //   if (data.statusCode === 200) {
    //     //     // Clear cart
    //     //     reset();

    //     //     // Back to cart page
    //     //     setAlertType("success");
    //     //     setAlertMessage(
    //     //       "Đơn hàng đã được ghi nhận, nhân viên chúng tôi sẽ liên hệ quý khách sớm nhất có thể để xác nhận đơn",
    //     //     );

    //     //     // Chuyển trang sau khi đặt hàng thành công về cart không load lại trang
    //     //     router.push("/cart");
    //     //   } else {
    //     //     toast.error(
    //     //       "Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ",
    //     //     );
    //     //   }
    //     // } catch (error) {
    //     //   toast.error(
    //     //     "Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ",
    //     //   );
    //     // }
    //   };

    const payments = [
        {
            key: "credit-card",
            value: "Credit Card",
            name: "Thẻ tín dụng",
            description: "Pay with Visa, Mastercard, American Express, or Discover",
            icon: visa,
        },
        {
            key: "momo",
            value: "Momo Wallet",
            name: "Ví Momo",
            description: "Pay with Momo Wallet",
            icon: momo,
        },
        {
            key: "pay-after-delivery",
            value: "Pay After Delivery",
            name: "Thanh toán sau khi nhận hàng",
            description: "Pay with Momo Wallet",
        },
    ];

    //   useEffect(() => {
    //     // use AxiosInstance to fetch data
    //     const fetchProvinces = async () => {
    //       AxiosInstance.get("location/provinces").then((response) => {
    //         const data = response.data;
    //         if (data.statusCode === 200) {
    //           setProvinces(convertLocationData(data.metadata));
    //         }
    //       });
    //     };

    //     fetchProvinces();
    //   }, []);

    //   useEffect(() => {
    //     setDistricts([]);
    //     setWards([]);

    //     // use AxiosInstance to fetch data
    //     const fetchDistricts = async () => {
    //       AxiosInstance.get(`location/provinces/district/${province}`).then(
    //         (response) => {
    //           const data = response.data;
    //           if (data.statusCode === 200) {
    //             setDistricts(convertLocationData(data.metadata));
    //           }
    //         },
    //       );
    //     };
    //     if (province) {
    //       fetchDistricts();
    //     }
    //   }, [province]);

    //   useEffect(() => {
    //     // use AxiosInstance to fetch data
    //     const fetchDistricts = async () => {

    //       AxiosInstance.get(`location/provinces/district/ward/${district}`).then(
    //         (response) => {
    //           const data = response.data;
    //           if (data.statusCode === 200) {
    //             setWards(convertLocationData(data.metadata));
    //           }
    //         },
    //       );
    //     };

    //     if (district) {
    //       fetchDistricts();
    //     }
    //   }, [district]);

    //   useEffect(() => {
    //     const getCartProduct = async () => {
    //       setCart([]);
    //       const data = Cookies.get("cart");

    //       if (data) {
    //         let totalAmount = 0;
    //         const cartData = JSON.parse(data);
    //         if (cartData.length > 0) {
    //           const updatedCart = [];

    //           const promise = cartData.map(async (item) => {
    //             if (item.skuId) {
    //               // use AxiosInstance to fetch data
    //               const response = await AxiosInstance.get(`sku/${item.skuId}`);
    //               const productData = response.data;
    //               updatedCart.push({ ...productData, quantity: item.quantity });
    //               totalAmount +=
    //                 productData.skuPrice *
    //                 (1 - productData.spuDiscount / 100) *
    //                 item.quantity;
    //             }
    //           });

    //           await Promise.all(promise);
    //           setCart(updatedCart);
    //           setTotal(totalAmount);
    //         }
    //       }
    //     };

    //     getCartProduct();
    //   }, []); // Add `total` if you need to use it from state directly.

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [formData, setFormData] = useState({
        shipping_address: '',
        phone_number: '',
        email: '',
        payment_method: 'cod',
        notes: ''
    });
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    // Kiểm tra đăng nhập và fetch giỏ hàng
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            // Nếu chưa đăng nhập, chuyển về trang login
            navigate('/login');
            return;
        }

        fetchCartItems();
    }, [navigate]);

    const fetchCartItems = async () => {
        try {
            setIsLoading(true);
            const authToken = localStorage.getItem('auth-token');
            
            console.log("===== CART LOADING DEBUG =====");
            console.log("Auth token:", authToken);
            
            if (!authToken) {
                console.log("No auth token, redirecting to login");
                navigate('/login');
                return;
            }

            console.log("Fetching cart from:", `${backend_url}/cart`);
            const response = await fetch(`${backend_url}/cart`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Cart API response status:", response.status);
            
            if (!response.ok) {
                console.error("Cart API error, status:", response.status);
                throw new Error('Failed to fetch cart items');
            }

            const data = await response.json();
            console.log("Cart API data:", data);
            
            if (data.success) {
                console.log("Cart items:", data.cartItems);
                console.log("Cart total:", data.total);
                
                setCartItems(data.cartItems || []);
                setTotalAmount(data.total || 0);
                
                // Nếu giỏ hàng trống, quay lại trang giỏ hàng
                if (data.cartItems && data.cartItems.length === 0) {
                    console.log("Cart is empty, redirecting to cart page");
                    navigate('/cart');
                }
            } else {
                console.error("API returned error:", data.message);
                setError(data.message || 'Đã có lỗi xảy ra');
            }
        } catch (error) {
            console.error("Exception in fetchCartItems:", error);
            setError('Đã có lỗi khi tải giỏ hàng');
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
            console.log("===== END CART LOADING DEBUG =====");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        // Kiểm tra các trường bắt buộc
        if (!formData.shipping_address || !formData.phone_number || !formData.email) {
            setError('Vui lòng điền đầy đủ thông tin giao hàng');
            return false;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Email không đúng định dạng');
            return false;
        }

        // Kiểm tra số điện thoại
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(formData.phone_number)) {
            setError('Số điện thoại không đúng định dạng (cần 10-11 số)');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("\n=== CHECKOUT FORM SUBMISSION ===");
        
        // Log form data
        console.log("Form data to be submitted:", {
            shipping_address: formData.shipping_address,
            phone_number: formData.phone_number,
            email: formData.email,
            payment_method: formData.payment_method,
            notes: formData.notes
        });
        
        // Validate form data
        console.log("Validating form data...");
        if (!validateForm()) {
            console.log("Form validation failed - missing required fields");
            return;
        }
        console.log("Form validation passed");
        
        setIsLoading(true);
        setError(null);
        
        console.log("Submitting order to API:", `${backend_url}/order/create`);

        try {
            // Thêm logs debug
            console.log("Request headers:", {
                'Accept': 'application/json',
                'auth-token': localStorage.getItem("auth-token") ? "Present (not shown for security)" : "MISSING!",
                'Content-Type': 'application/json'
            });
            console.log("Request body:", JSON.stringify(formData, null, 2));
            
            const response = await fetch(`${backend_url}/order/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem("auth-token"),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log("API Response status:", response.status);
            console.log("API Response status text:", response.statusText);
            
            const data = await response.json();
            console.log("API Response data:", JSON.stringify(data, null, 2));

            if (data.success) {
                console.log("Order created successfully, Order ID:", data.order_id);
                setOrderComplete(true);
                setOrderNumber(data.order_id);
            } else {
                console.error("API returned error:", data.message);
                setError(data.message || 'Đã có lỗi xảy ra khi đặt hàng');
            }
        } catch (error) {
            console.error("Exception in order submission:");
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
            setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
            console.log("=== END CHECKOUT FORM SUBMISSION ===\n");
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="spinner mb-4"></div>
                        <p>Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <h2 className="text-2xl font-bold mb-4">Đặt hàng thành công!</h2>
                        <p className="mb-4">Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là: <strong>#{orderNumber}</strong></p>
                        <p className="mb-6">Chúng tôi sẽ liên hệ với bạn sớm để xác nhận đơn hàng.</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => navigate('/orders')} 
                                className="bg-black text-white px-4 py-2 rounded"
                            >
                                Xem đơn hàng của tôi
                            </button>
                            <button 
                                onClick={() => navigate('/')} 
                                className="border border-black px-4 py-2 rounded"
                            >
                                Quay lại trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
                    {error}
                </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form thanh toán */}
                <div className="md:w-2/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="shipping_address" className="block mb-2">
                                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="shipping_address"
                                    name="shipping_address"
                                    value={formData.shipping_address}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="phone_number" className="block mb-2">
                                    Số điện thoại <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="payment_method" className="block mb-2">
                                    Phương thức thanh toán
                                </label>
                                <select
                                    id="payment_method"
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                >
                                    <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                    <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                                    <option value="momo">Ví MoMo</option>
                                </select>
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="notes" className="block mb-2">
                                    Ghi chú
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    rows="2"
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-3 rounded w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Tóm tắt đơn hàng */}
                <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
                        
                        <div className="mb-4 max-h-96 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex py-3 border-b">
                                    <div className="w-16 h-16 flex-shrink-0 mr-4">
                                        <img
                                            src={item.image ? `${backend_url}${item.image}` : ''}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium">{item.name}</p>
                                        <div className="text-sm text-gray-600">
                                            {item.color && <span>Màu: {item.color} </span>}
                                            {item.size && <span>Size: {item.size}</span>}
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span>{formatCurrency(item.new_price)}</span>
                                            <span>x{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                                <span>Tạm tính:</span>
                                <span>{formatCurrency(totalAmount)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Phí vận chuyển:</span>
                                <span>Miễn phí</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                <span>Tổng cộng:</span>
                                <span>{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
