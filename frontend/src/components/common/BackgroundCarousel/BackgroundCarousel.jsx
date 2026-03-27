import React, { useEffect, useMemo, useState } from "react";

export default function BackgroundCarousel({
  images = [],
  interval = 5000,
  overlayClassName = "bg-black/40",
  children,
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeImages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [safeImages, interval]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        {safeImages.length > 0 ? (
          safeImages.map((img, i) => (
            <img
              key={`${img}-${i}`}
              src={img}
              alt=""
              className={`absolute inset-0 h-screen w-screen object-cover object-center transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900" />
        )}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </div>
  );
}
