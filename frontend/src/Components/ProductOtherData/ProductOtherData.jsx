import React, { useState } from 'react'
import "./ProductOtherData.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function ProductOtherData({ content, title, icon }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`${!icon && 'border-b-2'} overflow-hidden ${isOpen ? "h-auto" : "h-[50px]"} transition-all duration-500 ease-in-out`}>
            <div className="flex items-center justify-between">
                <h3 className="p-4 uppercase font-semibold flex gap-2 items-center justify-center">
                    {icon && icon}
                    {title}
                </h3>
                <div className="">
                   {!icon &&  <FontAwesomeIcon
                        icon={faPlus}
                        className={`text-sm transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ cursor: "pointer" }}
                    />}
                </div>
            </div>
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] p-4" : "max-h-0 p-0"}`}>
                {content}
            </div>
        </div>
    )
}

export default ProductOtherData
