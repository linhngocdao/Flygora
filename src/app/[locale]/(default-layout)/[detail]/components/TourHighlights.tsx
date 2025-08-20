import React from "react";
import { TourHighlight } from "@/types/tour";

interface TourHighlightsProps {
  highlights: TourHighlight[];
}

export const TourHighlights: React.FC<TourHighlightsProps> = ({ highlights }) => {
  return (
    <div className="rounded-lg lg:p-6 md:p-4 p-3 space-y-4 bg-white">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-center space-x-4 text-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-full">
            <span className="text-2xl">{highlight.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-700 font-semibold text-lg mb-1">{highlight.title}</h3>
            <p className="text-gray-600">{highlight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
