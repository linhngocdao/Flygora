import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TourDetail } from "@/types/tour";
import { cn } from "@/lib/utils";

interface TourDetailsProps {
  tour: TourDetail;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div>
      <div className="h-[1px] bg-gray-200"></div>
      <div>
        <div
          className="flex items-center justify-between py-3 text-gray-900 duration-300 cursor-pointer lg:hover:text-green-600"
          onClick={onToggle}
        >
          <div className="flex items-center space-x-4">
            <div className="uppercase font-semibold text-lg">{title}</div>
          </div>
          <ChevronDown
            className={cn("w-4 h-4 duration-300 transition-transform", isOpen && "rotate-180")}
          />
        </div>
        <div
          className={cn(
            "overflow-hidden duration-500 transition-all",
            isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="rounded-lg lg:p-6 md:p-4 p-3 lg:space-y-8 md:space-y-6 space-y-4 bg-white">
      <h2 className="uppercase text-2xl font-bold text-gray-800">Chi tiết Tour</h2>

      {/* Lịch trình */}
      <AccordionItem
        title="Lịch trình"
        isOpen={openSections.itinerary}
        onToggle={() => toggleSection("itinerary")}
      >
        <div className="space-y-6">
          {tour.tour_intenerary.map((item, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-gray-900">
                {item.session}: {item.title}
              </h4>
              <div className="text-gray-700 whitespace-pre-line">{item.description}</div>
            </div>
          ))}
        </div>
      </AccordionItem>

      {/* Tour bao gồm */}
      <AccordionItem
        title="Tour bao gồm"
        isOpen={openSections.inclusions}
        onToggle={() => toggleSection("inclusions")}
      >
        <div className="space-y-4">
          <div className="text-gray-900 font-semibold">Bao gồm</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tour.tour_inclusions.map((inclusion, index) => (
              <div key={index} className="space-y-2">
                <div className="text-gray-900 font-medium">{inclusion.title}</div>
                <div className="text-gray-700 text-sm">{inclusion.description}</div>
              </div>
            ))}
          </div>
        </div>
      </AccordionItem>

      {/* Đồ dùng mang theo */}
      <AccordionItem
        title="Đồ dùng mang theo"
        isOpen={openSections.kitlist}
        onToggle={() => toggleSection("kitlist")}
      >
        <div className="space-y-4">
          <div className="text-gray-900 font-semibold">Lưu ý trang phục</div>
          <div className="text-gray-700 whitespace-pre-line">{tour.kitlist}</div>
        </div>
      </AccordionItem>

      {/* Điều kiện thời tiết */}
      <AccordionItem
        title="Điều kiện thời tiết"
        isOpen={openSections.weather}
        onToggle={() => toggleSection("weather")}
      >
        <div className="text-gray-700 whitespace-pre-line">{tour.weather_condition}</div>
      </AccordionItem>

      {/* Địa điểm */}
      <AccordionItem
        title="Địa điểm"
        isOpen={openSections.location}
        onToggle={() => toggleSection("location")}
      >
        <div className="space-y-4">
          <div className="text-gray-900 font-semibold">Khu vực</div>
          <div className="text-gray-700">{tour.the_area}</div>
          <div className="text-gray-900 font-semibold">Phương tiện di chuyển</div>
          <div className="text-gray-700">{tour.transfers}</div>
        </div>
      </AccordionItem>
    </div>
  );
};
