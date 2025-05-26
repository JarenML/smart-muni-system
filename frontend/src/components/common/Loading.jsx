import React from "react";

const Loading = ({ text = "Cargando...", size = "md", fullPage = false }) => {
  const spinnerSizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const spinnerSize = spinnerSizes[size] || spinnerSizes.md;

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <div
            className="inline-block animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-4 ease-linear"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
          <p className="text-gray-700 font-medium">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center">
        <div
          className={`inline-block animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-2 ease-linear ${spinnerSize}`}
        ></div>
        {text && <p className="text-gray-700 text-sm">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
