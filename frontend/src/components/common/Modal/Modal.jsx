import React from "react";

const sizeClasses = {
  small: "max-w-sm",
  medium: "max-w-lg",
  large: "max-w-3xl",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  footer,
  closeOnOverlayClick = true,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-[fadeIn_0.2s_ease-in-out]"
      onClick={handleOverlayClick}
    >
      <div
        className={`w-full bg-white rounded-lg shadow-xl animate-[slideUp_0.2s_ease-in-out] ${
          sizeClasses[size] || sizeClasses.medium
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 m-0">{title}</h2>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 text-xl leading-none transition-all hover:bg-gray-100 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
