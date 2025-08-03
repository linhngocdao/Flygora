import { z } from "zod";

// Schema for creating a tour
export const createTourSchema = z.object({
  default_title: z.string().min(1, "Tiêu đề tour là bắt buộc"),
  description: z.string().min(1, "Mô tả tour là bắt buộc"),
  tour_category_id: z.string().min(1, "Thể loại tour là bắt buộc"),
  duration_days: z.number().min(1, "Số ngày phải lớn hơn 0"),
  duration_nights: z.number().min(0, "Số đêm không được âm"),
  start_location: z.string().min(1, "Điểm khởi hành là bắt buộc"),
  destination: z.string().min(1, "Điểm đến là bắt buộc"),
  max_participants: z.number().min(1, "Số người tối đa phải lớn hơn 0"),
  original_price: z.number().min(0, "Giá gốc không được âm"),
  sale_price: z.number().nullable().optional(),
  sale_percentage: z.number().min(0).max(100).default(0),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),

  // Optional arrays for related data (will be added later)
  tour_highlights: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .default([]),

  tour_inclusions: z
    .array(
      z.object({
        description: z.string(),
        is_included: z.boolean(),
      })
    )
    .optional()
    .default([]),

  tour_itineraries: z
    .array(
      z.object({
        day_number: z.number(),
        title: z.string(),
        description: z.string(),
        activities: z.string().optional(),
        meals: z.string().optional(),
        accommodation: z.string().optional(),
      })
    )
    .optional()
    .default([]),

  tour_images: z
    .array(
      z.object({
        image_url: z.string(),
        is_primary: z.boolean(),
        alt_text: z.string().optional(),
      })
    )
    .optional()
    .default([]),
});

// Type exports
export type CreateTourPayload = z.infer<typeof createTourSchema>;

// Schema validation cho Tour cơ bản
export const basicTourSchema = z
  .object({
    title: z
      .string()
      .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
      .max(255, "Tiêu đề không được quá 255 ký tự"),

    description: z
      .string()
      .min(50, "Mô tả phải có ít nhất 50 ký tự")
      .max(5000, "Mô tả không được quá 5000 ký tự"),

    card_description: z.string().max(200, "Mô tả ngắn không được quá 200 ký tự").optional(),

    location: z.string().min(1, "Địa điểm là bắt buộc"),

    age_requirement: z.string().min(1, "Yêu cầu độ tuổi là bắt buộc"),

    tour_days: z.string().min(1, "Số ngày là bắt buộc"),

    tour_nights: z.string().min(1, "Số đêm là bắt buộc"),

    original_price: z.number().min(1, "Giá gốc phải lớn hơn 0"),

    sale_price: z.number().min(1, "Giá bán phải lớn hơn 0"),

    product_code: z
      .string()
      .min(3, "Mã sản phẩm phải có ít nhất 3 ký tự")
      .regex(/^[A-Z0-9_-]+$/, "Mã sản phẩm chỉ chứa chữ hoa, số, gạch ngang và gạch dưới"),

    tour_category_id: z.string().min(1, "Danh mục tour là bắt buộc"),

    participant_min: z.number().min(1, "Số người tối thiểu phải ít nhất 1").optional(),

    participant_max: z.number().min(1, "Số người tối đa phải ít nhất 1").optional(),

    status: z.enum(["published", "unpublished"]).default("unpublished"),

    // Meta fields
    is_featured: z.boolean().optional(),
    is_top: z.boolean().optional(),
    meta_title: z.string().max(60, "Meta title không được quá 60 ký tự").optional(),
    meta_description: z.string().max(160, "Meta description không được quá 160 ký tự").optional(),
  })
  .refine((data) => data.sale_price <= data.original_price, {
    message: "Giá bán không được lớn hơn giá gốc",
    path: ["sale_price"],
  })
  .refine(
    (data) => {
      if (data.participant_min && data.participant_max) {
        return data.participant_min <= data.participant_max;
      }
      return true;
    },
    {
      message: "Số người tối thiểu không được lớn hơn số người tối đa",
      path: ["participant_max"],
    }
  );

// Schema cho query parameters
export const tourQuerySchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  query: z.string().optional(),
  price_min: z.number().min(0).optional(),
  price_max: z.number().min(0).optional(),
  duration_min: z.number().min(1).optional(),
  duration_max: z.number().min(1).optional(),
  category_id: z.string().optional(),
  status: z.enum(["published", "unpublished"]).optional(),
  is_featured: z.boolean().optional(),
  is_top: z.boolean().optional(),
});

// Export types
export type BasicTourFormData = z.infer<typeof basicTourSchema>;
export type TourQueryData = z.infer<typeof tourQuerySchema>;
