import React from "react";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  helper,
  children,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {children || (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-3 py-2 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
          }`}
        />
      )}

      {helper && !error && (
        <p className="mt-1 text-xs text-gray-500">{helper}</p>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
