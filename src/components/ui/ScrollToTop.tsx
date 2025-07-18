"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Component ScrollToTop sẽ cuộn cửa sổ lên đầu mỗi khi thay đổi đường dẫn
 * Điều này đặc biệt quan trọng trong các ứng dụng SPA, nơi mà hành vi mặc định của trình duyệt
 * không tự động cuộn lên đầu khi thay đổi trang.
 */

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
