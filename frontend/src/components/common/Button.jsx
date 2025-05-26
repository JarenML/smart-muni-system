import React from "react";
import PropTypes from "prop-types";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false, // <--- Añadido
  onClick,
  className = "",
  icon,
  ...rest
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition-colors duration-200";

  const focusRing = "focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 ${focusRing} focus:ring-blue-500`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 ${focusRing} focus:ring-gray-500`,
    success: `bg-green-600 text-white hover:bg-green-700 ${focusRing} focus:ring-green-500`,
    danger: `bg-red-600 text-white hover:bg-red-700 ${focusRing} focus:ring-red-500`,
    outline: `bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 ${focusRing} focus:ring-blue-500`,
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner />
          {typeof children === "string" ? "Cargando..." : children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "outline",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool, // <--- Añadido
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default Button;
