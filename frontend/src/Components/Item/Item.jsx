import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { backend_url, currency } from '../../App'
import { formatCurrency } from '../../Utils/formatCurrency'

const Item = (props) => {
    return (
        <div className='item group'>
            <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
                <img src={props.image} alt="products" />
            </Link>
            <div className="item-colors">
                {props.colors.map((color, index) => {
                    return <div key={index} className="item-color">
                        <img src={color.image} alt="color" />
                    </div>
                })}
            </div>

            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">{formatCurrency(props.new_price)}</div>
                <div className="item-price-old">{formatCurrency(props.old_price)}</div>
            </div>

            <div className='hidden lg:flex items-center justify-between w-full gap-2 mt-4 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100'>
                <div className="item-add-to-cart select-none cursor-pointer p-2 bg-black text-white flex-1 text-center rounded-sm">
                   <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
                        <p className='text-sm'>Xem chi tiết</p>
                     </Link>
                </div>
                <div className="item-wishlist p-2 bg-black text-white flex-1 text-center rounded-sm select-none cursor-pointer" onClick={() => {
                    alert("Chức năng này chưa được phát triển")
                }}>
                    <p className='text-sm'>Giỏ hàng</p>
                </div>
            </div>
        </div>
    )
}

export default Item
