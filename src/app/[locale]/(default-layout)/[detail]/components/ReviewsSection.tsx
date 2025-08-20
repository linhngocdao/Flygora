import React from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "joannemF1376GE",
    date: "10/08/2025",
    rating: 5,
    content:
      "High five to JungleBoss — you've absolutely nailed it! I did the 2-day, 1-night Elephant Cave & Ma Valley trek and had an unforgettable time. The tour had the perfect mix of adventure and relaxation: hiking, cave exploration, river walks, jungle bathing, camping under the stars, swimming in caves, and lazy river lounging — all in one trip!",
  },
  {
    id: "2",
    author: "Nguyễn Văn A",
    date: "08/08/2025",
    rating: 5,
    content:
      "Trải nghiệm zipline tuyệt vời! Nhân viên hướng dẫn rất chuyên nghiệp và an toàn. Cảnh quan thiên nhiên ở thác Đỗ Quyên thật sự ngoạn mục. Sẽ quay lại lần nữa!",
  },
  {
    id: "3",
    author: "Trần Thị B",
    date: "05/08/2025",
    rating: 4,
    content:
      "Tour rất thú vị, cảm giác trượt zipline qua thác nước rất hồi hộp và thích thú. Thiết bị an toàn đầy đủ, hướng dẫn viên nhiệt tình. Chỉ có điều thời tiết hôm đó hơi mưa nhỏ.",
  },
];

export const ReviewsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="rounded-lg lg:p-6 md:p-4 p-3 lg:space-y-8 md:space-y-6 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="uppercase text-2xl font-bold text-gray-800">Đánh giá</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">{renderStars(5)}</div>
          <span className="text-lg font-semibold">4.9/5</span>
          <span className="text-gray-500">({mockReviews.length + 1013} đánh giá)</span>
        </div>
      </div>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{review.author}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
          Xem tất cả đánh giá
        </button>
      </div>
    </div>
  );
};
