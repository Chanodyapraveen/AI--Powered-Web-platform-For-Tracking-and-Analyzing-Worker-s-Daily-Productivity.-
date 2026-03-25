import React, { useState, useEffect, useCallback } from "react";


const DEFAULT_IMAGES = [
  "/images/banner-sp-1024x576.jpg",
  "/images/jerry-kavan-i9eaAR4dWi8-unsplash.jpg",
  "/images/pexels-andrea-zanenga-9756792-6120446.jpg",
];

const BackgroundCarousel = ({
  images = DEFAULT_IMAGES,
  interval = 5000,
  overlayClassName = "bg-black/50",
  showIndicators = true,
  showArrows = true,
  pauseOnHover = true,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [goNext, interval, isPaused, images.length]);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-center bg-no-repeat ${
            index === currentIndex ? "opacity-100 z-[0]" : "opacity-0 z-[-1]"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "100% 100%",
            backgroundAttachment: "fixed",
          }}
          aria-hidden={index !== currentIndex}
        />
      ))}

      {/* Dark overlay */}
      <div className={`absolute inset-0 z-[1] ${overlayClassName}`} />

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[3] w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[3] w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 cursor-pointer"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

     

      {/* Content rendered on top */}
      <div className="relative z-[2] min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
