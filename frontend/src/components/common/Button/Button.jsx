import React from "react";

const variantClasses = {
  primary:
    "bg-emerald-600 text-white border border-emerald-600 hover:bg-emerald-700",
  outline: "bg-transparent text-white border border-white/70 hover:bg-white/10",
  ghost:
    "bg-transparent text-white border border-transparent hover:bg-white/10",
};

const sizeClasses = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-sm",
  large: "px-6 py-3 text-base",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  icon,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";
  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <button
      type={type}
      className={`${base} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
