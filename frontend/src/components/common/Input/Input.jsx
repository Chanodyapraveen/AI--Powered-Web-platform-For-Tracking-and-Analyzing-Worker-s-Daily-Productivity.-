import React from "react";

export default function Input({ label, error, className = "", id, ...props }) {
  const inputId = id || props.name;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={`w-full rounded-lg border px-3 py-2 outline-none transition ${error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"} ${className}`}
        {...props}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
