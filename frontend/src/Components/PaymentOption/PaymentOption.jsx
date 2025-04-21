"use client";
import { faCircle, faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function PaymentOptions({ options = [], onSelect = () => {} }) {
  const [payment, setPayment] = useState("");
  return (
    <div>
      <div className="payment-options border rounded-2xl flex flex-col">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setPayment(option.key);
              onSelect(option.key);
            }}
            className={`payment-option px-4 py-2 flex items-center justify-between ${index !== options.length - 1 && "border-b"}`}
          >
            <div>
              <FontAwesomeIcon
                icon={payment === option.key ? faDotCircle : faCircle}
                className={`${payment === option.key ? "text-black" : " text-gray-400"}`}
              />
              <label
                htmlFor={option.key}
                className={`ml-2 ${payment === option.key ? "text-black" : " text-gray-400"}`}
              >
                {option.name}
              </label>
            </div>
            <div>
              <img src={option.icon} className="w-auto h-[30px]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PaymentOptions;
