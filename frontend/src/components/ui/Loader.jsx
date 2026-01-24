// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
        {/* Text */}
        <p className="text-white text-lg font-semibold tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
