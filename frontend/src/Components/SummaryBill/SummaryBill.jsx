import React from 'react'
import { formatCurrency } from '../../Utils/formatCurrency'
import { Link } from 'react-router-dom'

function SummaryBill({ showActions = true }) {
    return (
        <div className="productdisplay-right-cart-total flex items-start justify-start flex-col gap-4 border rounded-lg p-4 bg-gray-100 w-full">
            <h3>TÓM TẮT ĐƠN HÀNG</h3>
            <p className="text-sm">Chưa bao gồm phí vận chuyển: </p>
            <div className="productdisplay-right-cart-total-item flex items-center justify-between w-full font-semibold">
                <p className="text-sm">Tổng tiền:</p>
                <p className="text-sm">{formatCurrency(299999)}</p>
            </div>
            {
                showActions && <>
                    <div className="h-[1px] w-full bg-gray-200 mt-3"></div>
                    <p className="text-sm font-semibold italic">
                        Bạn có thể nhập mã giảm giá ở trang thanh toán
                    </p>
                </>
            }
            {showActions && <div className="flex flex-col">
                <button className="productdisplay-right-cart-total-item flex items-center justify-center w-full bg-black text-white p-2 rounded-sm cursor-pointer hover:bg-gray-800 transition-all duration-300 ease-in-out">
                    <Link to={"/checkout"}>
                        <p className="text-sm">Tiến hành thanh toán</p>
                    </Link>
                </button>
                <button className="productdisplay-right-cart-total-item flex items-center justify-center w-full bg-white text-black border border-black p-2 rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out mt-2">
                    <p className="text-sm">Tiếp tục mua sắm</p>
                </button>
            </div>}
        </div>
    )
}

export default SummaryBill
