import { ApiResponse } from "@/types/main";
import axiosInstance from "../axios";

export interface BookingPayload {
  tour_id: string;
  tour_date: string;
  booker: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  participants: Array<{
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    nationality?: string;
    passport_number?: string;
    special_requirements?: string;
  }>;
  voucher_code?: string;
}

// Response từ createBooking API (đã tích hợp Stripe Checkout)
interface CreateBookingResponse {
  bookingId: string;
  checkoutUrl: string; // URL để redirect đến Stripe Checkout
}

export interface BookingParam {
  page?: number;
  limit?: number;
  status?: "pending" | "confirmed" | "cancelled" | "completed";
  tour_id?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  payment_status?: "pending" | "succeeded" | "failed" | "refunded";
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface Booking {
  id: string;
  booking_code: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  tour_date: string;
  number_of_participants: number;
  total_price: string;
  final_price: string;
  discount_amount: string | null;
  tour_id: string;
  tour_booker_id: string;
  voucher_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
  booker: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
  tour: {
    id: string;
    title: string;
    slug: string;
    description: string;
    card_description: string;
    location: string;
    meeting_point: string;
    tour_booking_process: string | null;
    tour_cancellation_policy: string | null;
    age_requirement: string;
    cover: string;
    image_in_menu: string | null;
    tour_days: string;
    tour_nights: string;
    original_price: string;
    sale_price: string;
    participant_min: number;
    participant_max: number;
    product_code: string;
    image_header: string | null;
    tour_category_id: string;
    campsites: string | null;
    food: string | null;
    kitlist: string | null;
    languages_code: string | null;
    logistics: string | null;
    map_title: string | null;
    optional_extra: string | null;
    the_area: string | null;
    title_kitlist: string | null;
    transfers: string | null;
    weather_condition: string | null;
    sort: number;
    show_in_footer: boolean | null;
    is_top: boolean | null;
    label_hot: string | null;
    is_featured: boolean | null;
    label_discount: string | null;
    status: string;
    meta_description: string | null;
    meta_image: string | null;
    meta_keyword: string | null;
    meta_robot: string[] | null;
    meta_title: string | null;
    user_created: string;
    user_updated: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface BookingResponse {
  status: boolean;
  code: number;
  message: string;
  data: Booking[];
  errors: any;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Interface cho booking detail từ API admin
export interface BookingDetail {
  id: string;
  booking_code: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  tour_date: string;
  number_of_participants: number;
  total_price: string;
  final_price: string;
  discount_amount: string | null;
  tour_id: string;
  tour_booker_id: string;
  voucher_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
  booker: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
  participants: Array<{
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    nationality?: string;
    passport_number?: string;
    special_requirements?: string;
    booking_id: string;
    created_at: string;
    updated_at: string;
  }>;
  tour: {
    id: string;
    title: string;
    slug: string;
    description: string;
    card_description: string;
    location: string;
    meeting_point: string;
    tour_booking_process: string | null;
    tour_cancellation_policy: string | null;
    age_requirement: string;
    cover: string;
    image_in_menu: string | null;
    tour_days: string;
    tour_nights: string;
    original_price: string;
    sale_price: string;
    participant_min: number;
    participant_max: number;
    product_code: string;
    image_header: string | null;
    tour_category_id: string;
    campsites: string | null;
    food: string | null;
    kitlist: string | null;
    languages_code: string | null;
    logistics: string | null;
    map_title: string | null;
    optional_extra: string | null;
    the_area: string | null;
    title_kitlist: string | null;
    transfers: string | null;
    weather_condition: string | null;
    sort: number;
    show_in_footer: boolean | null;
    is_top: boolean | null;
    label_hot: string | null;
    is_featured: boolean | null;
    label_discount: string | null;
    status: string;
    meta_description: string | null;
    meta_image: string | null;
    meta_keyword: string | null;
    meta_robot: string[] | null;
    meta_title: string | null;
    user_created: string;
    user_updated: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface BookingDetailResponse {
  status: string;
  data: BookingDetail;
}

export async function createBooking(
  payload: BookingPayload
): Promise<ApiResponse<CreateBookingResponse>> {
  const { data } = await axiosInstance.post<ApiResponse<CreateBookingResponse>>(
    "/bookings",
    payload
  );
  return data;
}

export async function ListBooking(params: BookingParam) {
  const { data } = await axiosInstance.get<BookingResponse>("/bookings", { params });
  return data;
}

export async function UpdateStatus(
  bookingID: string,
  payload: { status: "pending" | "confirmed" | "cancelled" | "completed" }
) {
  const { data } = await axiosInstance.put<ApiResponse<any>>(
    `/bookings/${bookingID}/status`,
    payload
  );
  return data;
}

export async function DetailBookingByAdmin(bookingID: string) {
  const { data } = await axiosInstance.get<BookingDetailResponse>(`/bookings/${bookingID}`);
  return data;
}
