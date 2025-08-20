import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourDetail } from "@/types/tour";

interface StickyBookingBoxProps {
  tour: TourDetail;
  onBookingClick: () => void;
}

export const StickyBookingBox: React.FC<StickyBookingBoxProps> = ({ tour, onBookingClick }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight; // Full screen hero height
      setIsSticky(window.scrollY > heroHeight + 200); // Start sticky after hero + some offset
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${isSticky ? "fixed top-4 right-4 z-50 w-80" : "relative w-full"}`}
    >
      <div className="bg-white rounded-lg p-4 shadow-lg border">
        <div className="flex items-center space-x-2 mb-3">
          <Camera className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 font-medium">Hình ảnh</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-2xl">💰</span>
            <span className="text-sm">Chi phí</span>
          </div>
          <div className="text-green-600 font-bold text-xl">
            VND {new Intl.NumberFormat("vi-VN").format(tour.sale_price)}/người
          </div>

          <Button
            onClick={onBookingClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Đặt Tour
          </Button>

          <div className="flex space-x-2">
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50">
              Tặng Tour
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50">
              Chọn Private Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
