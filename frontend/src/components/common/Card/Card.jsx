import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.16)] backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
