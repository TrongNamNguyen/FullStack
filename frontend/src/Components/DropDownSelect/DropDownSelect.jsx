import React from "react";
import { IoIosArrowDown } from "react-icons/io"; // Custom icon library (e.g., React Icons)

function DropDownSelect({
  placeholder,
  name,
  value,
  onChange,
  label,
  errorMessage,
  options,
  selected,
  disabled,
}) {
  return (
    <div className="relative w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }} // Hide default select icon
        name={name}
        id={name}
        value={value}
        onChange={(e) => {
          if (!disabled) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md outline-none focus:shadow-lg sm:text-sm transition-all duration-150 ease-linear ${errorMessage ? "border-red-500 border-2" : ""} pr-8 ${disabled ? "bg-gray-100 text-gray-400 pointer-events-none" : ""}`}
      >
        <option value="default" key={"default"}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            className="text-black"
            key={option.key}
            value={option.key}
            selected={selected === option.key}
          >
            {option.value}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>
      )}

      {/* Custom Dropdown Icon */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <IoIosArrowDown className="text-gray-400" size={16} />
      </div>
    </div>
  );
}

export default DropDownSelect;
