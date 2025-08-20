import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "Trải nghiệm Zipline này có an toàn không?",
    answer:
      "An toàn của quý khách luôn là ưu tiên hàng đầu của Jungle Boss. Chúng tôi sử dụng trang thiết bị Zipline và trang thiết bị an toàn hiện đại, được kiểm định chất lượng thường xuyên theo tiêu chuẩn quốc tế. Đội ngũ nhân viên được đào tạo bài bản, giàu kinh nghiệm sẽ hướng dẫn chi tiết quy trình và giám sát chặt chẽ trong suốt quá trình trải nghiệm.",
  },
  {
    id: "2",
    question: "Giá vé là bao nhiêu và bao gồm những gì?",
    answer:
      "Giá vé trải nghiệm Zipline băng qua thác Đỗ Quyên hiện tại là 180.000 VNĐ/người. Giá vé này bao gồm phí tham gia đường trượt Zipline, trang thiết bị bảo hộ và sự hướng dẫn, giám sát của nhân viên trong suốt quá trình trải nghiệm.",
  },
  {
    id: "3",
    question: "Điều kiện để có thể tham gia trải nghiệm Zipline này?",
    answer:
      "Để đảm bảo an toàn, chúng tôi có một số điều kiện tham gia sau:\n• Độ tuổi: Từ 12 tuổi trở lên.\n• Cân nặng: Từ 40kg đến 90kg.\n• Sức khỏe: Không có các bệnh lý về tim mạch, huyết áp cao, sợ độ cao, hoặc các vấn đề sức khỏe nghiêm trọng khác.",
  },
  {
    id: "4",
    question: "Thời tiết xấu có ảnh hưởng đến tour không?",
    answer:
      "Vì lý do an toàn, chúng tôi sẽ tạm dừng hoạt động zipline khi có mưa to, gió lớn hoặc thời tiết nguy hiểm. Trong trường hợp này, quý khách có thể chọn hoãn tour sang ngày khác hoặc được hoàn tiền 100%.",
  },
  {
    id: "5",
    question: "Có cần đặt trước không?",
    answer:
      "Chúng tôi khuyến khích đặt trước để đảm bảo có chỗ, đặc biệt vào cuối tuần và ngày lễ. Tuy nhiên, quý khách cũng có thể mua vé trực tiếp tại quầy vé nếu còn chỗ trống.",
  },
];

export const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="rounded-lg lg:p-6 md:p-4 p-3 lg:space-y-8 md:space-y-6 space-y-4 bg-white">
      <h2 className="uppercase text-2xl font-bold text-gray-800">Câu hỏi thường gặp</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => toggleItem(faq.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-gray-900">{faq.question}</span>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gray-500 transition-transform duration-200",
                  openItems[faq.id] && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openItems[faq.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 pb-4 text-gray-700 whitespace-pre-line">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
