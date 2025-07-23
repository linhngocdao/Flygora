"use client";

import { useState, useEffect, useCallback } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Theo dõi scroll để show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      // Hiển thị button khi scroll xuống 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Throttle scroll event để tối ưu performance
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(toggleVisibility, 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-24 right-4 md:right-6 md:bottom-32
        z-[998] flex justify-center items-center
        w-12 h-12 md:w-14 md:h-14
        rounded-full cursor-pointer
        bg-gradient-to-r from-green-600 to-green-700
        text-white hover:text-yellow-400
        hover:from-green-700 hover:to-green-800
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        shadow-lg backdrop-blur-sm
      `}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      {/* Arrow up icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3.5L6.5 9H9V20H15V9H17.5L12 3.5Z"
          fill="currentColor"
        />
      </svg>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
      </div>
    </button>
  );
};

export default ScrollToTop;
