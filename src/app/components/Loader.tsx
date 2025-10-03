import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-12 h-12 border-4 border-t-cgreen border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
