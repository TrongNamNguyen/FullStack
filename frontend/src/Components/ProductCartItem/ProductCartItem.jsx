import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { formatCurrency } from '../../Utils/formatCurrency';

function ProductCartItem({ isChangeAmount = true }) {
    // get props from parent component
    // ...
    const [amoutSelected, setAmoutSelected] = React.useState(1);

    return (
        <div className="productdisplay-right-cart-item flex items-center justify-between gap-4 pt-3 mb-3 select-none">
            <div className="flex items-center justify-between gap-4">
                <img src={"https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg"} alt="" className="w-[80px] rounded-sm border" />
                <div className="productdisplay-right-cart-item-infor flex items-start justify-start flex-col gap-1">
                    <h3 className="text-sm">{"Áo Polo Regular L.3.3440 - Trắng - 2XL"}</h3>
                    <p className="text-sm font-semibold">{formatCurrency(490000)} <span className="italic">x2</span></p>
                    <div className="border cursor-pointer hover:bg-gray-200 p-1 rounded-sm flex items-center justify-between w-fit text-sm">
                        <span>Xóa</span>
                    </div>
                </div>
            </div>
            {/* amount of product */}
            {isChangeAmount && <div className="text-sm">
                <div className="flex items-center justify-start gap-4 border">
                    <div
                        className="w-[26px] h-[26px] flex items-center justify-center rounded-sm border-r"
                        onClick={() => {
                            if (amoutSelected > 1) {
                                setAmoutSelected(amoutSelected - 1);
                            }
                        }}
                        style={{
                            cursor: amoutSelected > 1 ? "pointer" : "not-allowed",
                            opacity: amoutSelected > 1 ? 1 : 0.5
                        }}
                    >
                        <FontAwesomeIcon icon={faMinus} className="text-sm" />
                    </div>
                    <p className='select-none'>{amoutSelected}</p>
                    <div
                        className="w-[26px] h-[26px] flex items-center justify-center border-l rounded-sm"
                        onClick={() => {
                            setAmoutSelected(amoutSelected + 1);
                        }}
                        style={{
                            cursor: "pointer",
                            opacity: 1
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ProductCartItem
