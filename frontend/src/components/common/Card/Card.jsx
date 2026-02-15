import React from "react";

const paddingClasses = {
  small: "p-3",
  medium: "p-5",
  large: "p-8",
};

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  variant = "default",
  padding = "medium",
  hover = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${
        paddingClasses[padding] || paddingClasses.medium
      } ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 m-0">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1 m-0">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
