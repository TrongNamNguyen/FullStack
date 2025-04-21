import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backend_url } from '../App';
import { formatCurrency } from '../Utils/formatCurrency';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const authToken = localStorage.getItem('auth-token');
            if (!authToken) {
                window.location.href = '/login';
                return;
            }

            const response = await fetch(`${backend_url}/orders`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            
            if (data.success) {
                setOrders(data.orders || []);
            } else {
                setError(data.message || 'Đã có lỗi xảy ra');
            }
        } catch (error) {
            setError('Đã có lỗi khi tải danh sách đơn hàng');
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
            return;
        }

        try {
            const authToken = localStorage.getItem('auth-token');
            const response = await fetch(`${backend_url}/order/cancel/${orderId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                // Refresh orders after cancellation
                fetchOrders();
                alert('Đơn hàng đã được hủy thành công');
            } else {
                const data = await response.json();
                alert(data.message || 'Không thể hủy đơn hàng');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('Đã xảy ra lỗi khi hủy đơn hàng');
        }
    };

    // Hiển thị trạng thái đơn hàng với màu sắc
    const getStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Text tiếng Việt cho trạng thái
    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Chờ xử lý';
            case 'processing': return 'Đang xử lý';
            case 'shipped': return 'Đang vận chuyển';
            case 'delivered': return 'Đã giao hàng';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="spinner mb-4"></div>
                        <p>Đang tải danh sách đơn hàng...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
                    {error}
                </div>
            )}
            
            {orders.length === 0 ? (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="mb-4">Bạn chưa có đơn hàng nào</p>
                    <Link to="/" className="bg-black text-white px-4 py-2 rounded">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium">Mã đơn hàng</th>
                                <th className="py-3 px-4 text-left font-medium">Ngày đặt</th>
                                <th className="py-3 px-4 text-left font-medium">Tổng tiền</th>
                                <th className="py-3 px-4 text-left font-medium">Trạng thái</th>
                                <th className="py-3 px-4 text-left font-medium">Thanh toán</th>
                                <th className="py-3 px-4 text-left font-medium">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <Link 
                                            to={`/order/${order.id}`} 
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            #{order.id}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4">
                                        {new Date(order.created_at).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="py-3 px-4 font-medium">
                                        {formatCurrency(order.total_amount)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <Link 
                                                to={`/order/${order.id}`} 
                                                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                                            >
                                                Chi tiết
                                            </Link>
                                            {(order.status === 'pending' || order.status === 'processing') && (
                                                <button
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                                >
                                                    Hủy
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders; 