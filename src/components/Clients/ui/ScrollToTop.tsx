"use client";

import { ArrowUpFromDot } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 1200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

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
        fixed bottom-24 right-4 md:right-12 md:bottom-4
        z-[998] flex justify-center items-center
        w-12 h-12 md:w-14 md:h-14
        rounded-full cursor-pointer bg-img text-white
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2
        transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        shadow-lg backdrop-blur-sm
      `}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUpFromDot size={18} />
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
      </div>
    </button>
  );
};

export default ScrollToTop;
