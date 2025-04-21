import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const STORES = [
    { id: 1, name: "Store116 Cầu Giấy", address: "Phố Nhổn, Bắc Từ Liêm, Hà Nội", city: "Hà Nội", phone: "0968959050116" },
    { id: 2, name: "110 Phố Nhổn", address: "Cầu Giấy, Hà Nội", city: "Hà Nội", phone: "0968959050110" },
    { id: 3, name: "49 Chùa Bộc", address: "Chùa Bộc, Đống Đa, Hà Nội", city: "Hà Nội", phone: "096895905049" },
];


function ProductStore() {
    return (
        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden border flex items-center justify-center flex-col">
            <h3 className="w-full p-3 text-center text-white bg-black">Cửa hàng còn sản phẩm này</h3>
            {/*  */}
            <select name="" id="" className="flex items-center justify-center border my-4 p-2 w-[90%] rounded-lg">
                <option value="">Tình thành</option>
                <option value="">Hà nội</option>
                <option value="">Hồ Chí Minh</option>
                <option value="">Đà Nẵng</option>
                <option value="">Vũng Tàu</option>
            </select>
            {/* Líst store */}
            <div className="productdisplay-right-stores max-h-[250px] overflow-y-scroll p-2 w-full mb-4">
                {STORES.map((store, index) => {
                    return (
                        <div key={index} className="productdisplay-right-store-item">
                            <h3 className="flex gap-2 items-center font-bold text-lg">
                                <FontAwesomeIcon icon={faLocation} />
                                {store.name}</h3>
                            <p className="ms-[20px]">{store.address}</p>
                            <p className="ms-[20px]">{store.city}</p>
                            <p className="ms-[20px]">{store.phone}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ProductStore
