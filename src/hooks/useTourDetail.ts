import { TourDetail } from "@/types/tour";
import { useQuery } from "@tanstack/react-query";

// Mock API function - sẽ được thay thế bằng API thực tế
const fetchTourDetail = async (slug: string): Promise<TourDetail> => {
  console.log(slug);
  // Giả lập việc gọi API để lấy thông tin tour
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data based on the JSON file provided
  return {
    title: "Trượt zipline 85 mét tại thác Đỗ Quyên",
    slug: "zipline-thac-do-quyen",
    description:
      "Trở thành Nhà thám hiểm thực thụ với thử thách trượt zipline dài 85 mét và tận hưởng cảnh quan thiên nhiên tuyệt đẹp tại thác Đỗ Quyên, Vườn Quốc Gia Bạch Mã!",
    card_description: "Trải nghiệm zipline thác Đỗ Quyên",
    location: "Vườn Quốc Gia Bạch Mã, Huế",
    meeting_point: "Quầy bán vé đỉnh Bạch Mã",
    tour_booking_process: "Đặt tour online hoặc tại quầy vé",
    tour_cancellation_policy: "Hủy trước 24h được hoàn tiền",
    age_requirement: "Từ 12 tuổi trở lên",
    cover:
      "https://cms.junglebosstours.com/assets/d4cfa964-da02-47f0-9033-77366d447a38?format=webp",
    image_in_menu:
      "https://cms.junglebosstours.com/assets/d4cfa964-da02-47f0-9033-77366d447a38?format=webp",
    tour_days: "1",
    tour_nights: "0",
    original_price: 200000,
    sale_price: 180000,
    participant_min: 1,
    participant_max: 1000,
    product_code: "ZIP-DQ-001",
    image_header:
      "https://cms.junglebosstours.com/assets/d4cfa964-da02-47f0-9033-77366d447a38?format=webp",
    tour_category_id: "adventure",
    campsites: "Không có cắm trại",
    food: "Trải nghiệm này không cung cấp đồ ăn",
    kitlist:
      "Mang trang phục thoải mái, gọn gàng. Không mang theo vật dụng cá nhân cồng kềnh khi tham gia zipline",
    languages_code: "vi,en",
    logistics: "Trợ lý an toàn, thiết bị an toàn chuẩn quốc tế",
    map_title: "Vị trí thác Đỗ Quyên",
    optional_extra: "Không có dịch vụ bổ sung",
    the_area: "Vườn Quốc Gia Bạch Mã",
    title_kitlist: "Lưu ý trang phục",
    transfers: "Trải nghiệm này không cung cấp dịch vụ đón tiễn",
    weather_condition:
      "Thời tiết tại Vườn Quốc gia Bạch Mã mang tính chất khí hậu nhiệt đới gió mùa",
    sort: 1,
    show_in_footer: true,
    is_top: true,
    label_hot: "HOT",
    is_featured: true,
    label_discount: "10% OFF",
    status: "published",
    meta_description:
      "Trượt zipline 85 mét tại thác Đỗ Quyên - Trải nghiệm mạo hiểm tại Vườn Quốc Gia Bạch Mã",
    meta_image:
      "https://cms.junglebosstours.com/assets/d4cfa964-da02-47f0-9033-77366d447a38?format=webp",
    meta_keyword: "zipline, thác đỗ quyên, bạch mã, adventure",
    meta_robot: ["index", "follow"],
    meta_title: "Zipline Thác Đỗ Quyên | Jungle Boss Tours",
    tour_images: [
      {
        image_url:
          "https://cms.junglebosstours.com/assets/d4cfa964-da02-47f0-9033-77366d447a38?format=webp",
        caption: "Trượt zipline qua thác Đỗ Quyên",
        sort_order: 1,
      },
      {
        image_url:
          "https://cms.junglebosstours.com/assets/79f3cfd7-fe10-4663-99d9-4fb52d03ee10?format=webp",
        caption: "Cảnh quan thiên nhiên tuyệt đẹp",
        sort_order: 2,
      },
    ],
    tour_intenerary: [
      {
        session: "Cả ngày",
        title: "Trải nghiệm zipline thác Đỗ Quyên",
        description: "Công tác chuẩn bị an toàn, hướng dẫn kỹ năng, trải nghiệm đu zipline 85 mét",
        sort_order: 1,
      },
    ],
    tour_inclusions: [
      {
        title: "Trợ lý an toàn",
        description: "Chuyên gia an toàn được đào tạo chuyên nghiệp",
        sort_order: 1,
      },
      {
        title: "Thiết bị an toàn",
        description: "Thiết bị an toàn chuẩn quốc tế",
        sort_order: 2,
      },
      {
        title: "Hướng dẫn viên",
        description: "Hướng dẫn viên song ngữ Anh - Việt",
        sort_order: 3,
      },
    ],
    videos: [],
    tour_highlights: [
      {
        icon: "🏔️",
        title: "Zipline 85 mét",
        description: "Trải nghiệm đường trượt zipline độc đáo",
        sort_order: 1,
      },
      {
        icon: "💧",
        title: "Thác Đỗ Quyên",
        description: "Thác nước cao nhất Đông Nam Á",
        sort_order: 2,
      },
      {
        icon: "🌿",
        title: "Vườn Quốc Gia Bạch Mã",
        description: "Thiên nhiên hùng vĩ và tuyệt đẹp",
        sort_order: 3,
      },
    ],
  };
};

export const useTourDetail = (slug: string) => {
  return useQuery({
    queryKey: ["tour-detail", slug],
    queryFn: () => fetchTourDetail(slug),
    enabled: !!slug,
  });
};
