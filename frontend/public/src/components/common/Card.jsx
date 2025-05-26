import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  bodyClassName = "",
  noPadding = false,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      {/* Card Header */}
      {(title || subtitle) && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      {/* Card Body */}
      <div
        className={`${noPadding ? "" : "px-4 py-5 sm:p-6"} ${bodyClassName}`}
      >
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
