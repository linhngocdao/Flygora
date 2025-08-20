import React from "react";
import { Clock, Users, Calendar, MapPin, Star, User } from "lucide-react";
import { TourDetail } from "@/types/tour";

interface TourInfoSectionProps {
  tour: TourDetail;
}

export const TourInfoSection: React.FC<TourInfoSectionProps> = ({ tour }) => {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-8">
            <div
              className="py-8 lg:py-16 md:py-11 space-y-4 lg:space-y-8 md:space-y-6 bg-green-600 rounded-lg px-6 lg:px-8"
              id="green-area"
            >
              {/* Title and Description */}
              <div className="space-y-2">
                <h1 className="text-white uppercase text-2xl lg:text-4xl md:text-3xl font-bold">
                  {tour.title}
                </h1>
                <div className="text-gray-50 text-base lg:text-lg">
                  <p>{tour.description}</p>
                </div>
              </div>

              <div className="h-[1px] bg-green-500"></div>

              {/* Tour Details Grid */}
              <div className="space-x-0 md:flex lg:space-x-16 md:space-x-11 max-md:space-y-4">
                <div className="space-y-4 md:w-1/2">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-100" />
                    <div className="text-gray-100 text-sm w-[120px] flex-shrink-0">Thời gian</div>
                    <div className="text-white font-semibold">
                      {tour.tour_days} ngày{" "}
                      {tour.tour_nights && tour.tour_nights !== "0"
                        ? `${tour.tour_nights} đêm`
                        : ""}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-100" />
                    <div className="text-gray-100 text-sm w-[120px] flex-shrink-0">Số lượng</div>
                    <div className="text-white font-semibold">
                      Tối đa {tour.participant_max} người
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-100" />
                    <div className="text-gray-100 text-sm w-[120px] flex-shrink-0">Thời gian</div>
                    <div className="text-white font-semibold">Hàng ngày từ 8:00 đến 17:00</div>
                  </div>
                </div>

                <div className="flex-grow space-y-4">
                  <div className="flex items-center space-x-3 lg:space-x-8 md:space-x-6">
                    <MapPin className="w-5 h-5 text-gray-100" />
                    <div className="text-gray-100 text-sm w-[120px] flex-shrink-0 !ml-3">
                      Tập trung
                    </div>
                    <div className="text-white font-semibold">{tour.meeting_point}</div>
                  </div>

                  <div className="flex items-center space-x-3 lg:space-x-8 md:space-x-6">
                    <Star className="w-5 h-5 text-gray-100" />
                    <div className="text-gray-100 text-sm w-[120px] flex-shrink-0 !ml-3">
                      Đánh giá
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-white font-semibold">4.9/5</span>
                      <div className="text-gray-50 text-sm">(1016 đánh giá)</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 lg:space-x-8 md:space-x-6">
                    <User className="w-5 h-5 text-gray-100" />
                    <div className="text-gray-100 text-sm w-[120px] !ml-3">Độ tuổi</div>
                    <div className="text-white font-semibold">{tour.age_requirement}</div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="!ml-0 mt-4 md:w-1/2 space-y-4 w-full">
                <div className="text-gray-50 text-sm">
                  Điều kiện tham gia: Cân nặng từ 40 đến 90kg, không có các bệnh lý về tim mạch,
                  huyết áp cao, sợ độ cao...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
