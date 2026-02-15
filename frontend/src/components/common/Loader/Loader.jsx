import React from "react";

const sizeClasses = {
  small: "w-6 h-6 border-2",
  medium: "w-10 h-10 border-4",
  large: "w-16 h-16 border-4",
};

const Loader = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) => {
  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`rounded-full border-gray-200 border-t-indigo-600 animate-spin ${
          sizeClasses[size] || sizeClasses.medium
        }`}
      ></div>
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
};

export default Loader;
