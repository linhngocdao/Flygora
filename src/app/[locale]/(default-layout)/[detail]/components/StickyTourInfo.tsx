import React, { useState, useEffect } from "react";
import { Clock, Users, Calendar, MapPin, Star, User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourDetail } from "@/types/tour";

interface StickyTourInfoProps {
  tour: TourDetail;
  onBookingClick: () => void;
}

export const StickyTourInfo: React.FC<StickyTourInfoProps> = ({ tour, onBookingClick }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight; // Full screen hero height
      setIsSticky(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${isSticky ? "fixed top-0 left-0 right-0 z-40 shadow-lg" : "relative"}`}
    >
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden lg:block py-6">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <div className="space-y-4">
                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h1 className="text-white uppercase text-2xl lg:text-3xl font-bold">
                      TRẢI NGHIỆM ZIPLINE THÁC ĐỖ QUYÊN
                    </h1>
                    <p className="text-gray-100 text-base">
                      Trở thành Nhà thám hiểm thực thụ với thử thách trượt zipline dài 85 mét và tận
                      hưởng cảnh quan thiên nhiên tuyệt đẹp tại thác Đỗ Quyên, Vườn Quốc Gia Bạch
                      Mã!
                    </p>
                  </div>

                  <div className="h-[1px] bg-green-500"></div>

                  {/* Tour Details Grid */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-200" />
                        <div className="text-gray-200 text-sm w-20 flex-shrink-0">Thời gian</div>
                        <div className="text-white font-medium">1 ngày</div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-gray-200" />
                        <div className="text-gray-200 text-sm w-20 flex-shrink-0">Số lượng</div>
                        <div className="text-white font-medium">Tối đa 1000 người</div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-200" />
                        <div className="text-gray-200 text-sm w-20 flex-shrink-0">Thời gian</div>
                        <div className="text-white font-medium">Hàng ngày từ 8:00 đến 17:00</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-200" />
                        <div className="text-gray-200 text-sm w-20 flex-shrink-0">Tập trung</div>
                        <div className="text-white font-medium">Quầy bán vé đỉnh Bạch Mã</div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Star className="w-4 h-4 text-gray-200" />
                        <div className="text-gray-200 text-sm w-20 flex-shrink-0">Đánh giá</div>
                        <div className="flex items-center space-x-1">
                          <span className="text-white font-medium">4.9/5</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-200 text-sm">(1016 đánh giá)</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-200" />
                        <div className="text-gray-200 text-sm w-20 flex-shrink-0">Độ tuổi</div>
                        <div className="text-white font-medium">Từ 12 tuổi trở lên</div>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Level */}
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-200 text-sm">Độ khó</div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-2 bg-green-400 rounded"></div>
                      <div className="w-8 h-2 bg-yellow-400 rounded"></div>
                      <div className="w-8 h-2 bg-orange-400 rounded"></div>
                      <div className="w-8 h-2 bg-gray-400 rounded"></div>
                    </div>
                  </div>

                  <div className="text-gray-200 text-sm">
                    Điều kiện tham gia: Cân nặng từ 40 đến 90kg, không có các bệnh lý về tim mạch,
                    huyết áp cao, sợ độ cao...
                  </div>
                </div>
              </div>

              <div className="col-span-4">
                <div className="bg-white rounded-lg p-4 text-gray-900">
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
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden py-4">
            <div className="space-y-4">
              <h1 className="text-white uppercase text-xl font-bold">
                TRẢI NGHIỆM ZIPLINE THÁC ĐỖ QUYÊN
              </h1>

              <div className="bg-white rounded-lg p-4 text-gray-900">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="text-xl">💰</span>
                    <span className="text-sm">Chi phí</span>
                  </div>
                  <div className="text-green-600 font-bold text-lg">
                    VND {new Intl.NumberFormat("vi-VN").format(tour.sale_price)}/người
                  </div>

                  <Button
                    onClick={onBookingClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Đặt Tour
                  </Button>

                  <div className="flex space-x-2">
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm">
                      Tặng Tour
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm">
                      Chọn Private Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sticky bar for mobile */}
      {isSticky && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 z-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">
                VND {new Intl.NumberFormat("vi-VN").format(tour.sale_price)}
              </div>
              <div className="text-xs text-green-200">CHO BẠN!</div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-white text-green-600 px-4 py-2 rounded text-sm">🎁</button>
              <Button
                onClick={onBookingClick}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
              >
                Đặt Tour
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
