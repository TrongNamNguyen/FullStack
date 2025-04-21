import React from "react";

function Field({
  placeholder,
  type,
  name,
  value,
  onChange,
  label,
  errorMessage,
}) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:shadow-lg transition-all duration-0 ease-linear sm:text-sm ${errorMessage ? "border-red-500 border-2" : ""}`}
      />
      {errorMessage && (
        <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

export default Field;
