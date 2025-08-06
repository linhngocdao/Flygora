import z from "zod";

export const TourFormSchema = z.object({
  title: z.string().min(1, "Tiêu đề tour là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  card_description: z.string().optional(),
  location: z.string().optional(),
  meeting_point: z.string().optional(),
  tour_booking_process: z.string().optional(),
  tour_cancellation_policy: z.string().optional(),
  age_requirement: z.string(),
  cover: z.string().optional(),
  image_in_menu: z.string().optional(),
  tour_days: z.string().optional(),
  tour_nights: z.string().optional(),
  original_price: z.number().min(0, "Giá gốc phải lớn hơn 0"),
  sale_price: z.number().min(0, "Giá bán phải lớn hơn 0"),
  participant_min: z.number().optional(),
  participant_max: z.number().optional(),
  product_code: z.string().min(1, "Mã sản phẩm là bắt buộc"),
  image_header: z.string().optional(),
  tour_category_id: z.string().min(1, "Danh mục là bắt buộc"),

  // Tour detail fields
  campsites: z.string().optional(),
  food: z.string().optional(),
  kitlist: z.string().optional(),
  languages_code: z.string().optional(),
  logistics: z.string().optional(),
  map_title: z.string().optional(),
  optional_extra: z.string().optional(),
  the_area: z.string().optional(),
  title_kitlist: z.string().optional(),
  transfers: z.string().optional(),
  weather_condition: z.string().optional(),

  // Meta data fields
  sort: z.number().optional(),
  show_in_footer: z.boolean().optional(),
  is_top: z.boolean().optional(),
  label_hot: z.string().optional(),
  is_featured: z.boolean().optional(),
  label_discount: z.string().optional(),
  status: z.enum(["published", "unpublished"]),
  meta_description: z.string().optional(),
  meta_image: z.string().optional(),
  meta_keyword: z.string().optional(),
  meta_robot: z.array(z.string()).optional(),
  meta_title: z.string().optional(),

  // Related data arrays
  tour_images: z.array(
    z.object({
      image_url: z.string(),
      caption: z.string().optional(),
      sort_order: z.number().optional(),
    })
  ),

  tour_intenerary: z.array(
    z.object({
      session: z.string(),
      title: z.string(),
      description: z.string(),
      sort_order: z.number().optional(),
    })
  ),

  tour_inclusions: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      sort_order: z.number().optional(),
    })
  ),

  videos: z.array(
    z.object({
      url: z.string(),
      title: z.string().optional(),
      sort_order: z.number().optional(),
    })
  ),

  tour_highlights: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      sort_order: z.number().optional(),
    })
  ),
});
