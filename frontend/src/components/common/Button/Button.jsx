import React from "react";

const variantClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-emerald-500 text-white hover:bg-emerald-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline:
    "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
  ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
};

const sizeClasses = {
  small: "px-4 py-1.5 text-sm",
  medium: "px-6 py-2 text-base",
  large: "px-8 py-3 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  icon,
  className: customClassName,
  ...props
}) => {
  const className = [
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 cursor-pointer border-none outline-none whitespace-nowrap",
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.medium,
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    customClassName || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
