import React from "react";

const Loading = ({ text = "Cargando...", size = "md", fullPage = false }) => {
  const spinnerSizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const sizeClass = spinnerSizes[size] || spinnerSizes.md;

  const Spinner = () => (
    <div
      className={`animate-spin rounded-full border-gray-300 border-t-blue-600 ease-linear ${sizeClass}`}
      role="status"
      aria-label="Cargando"
    ></div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center space-y-2">
          <Spinner />
          <p className="text-gray-700 font-medium">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <Spinner />
        {text && <p className="text-gray-700 text-sm">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
