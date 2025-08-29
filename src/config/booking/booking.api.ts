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
  bookingCode: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  tourDate: string;
  numberOfParticipants: number;
  totalPrice: string;
  finalPrice: string;
  createdAt: string;
  tour: {
    id: string;
    title: string;
    productCode: string;
  };
  booker: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  payment: {
    id: string;
    status: string;
    amount: string;
    paidAt: string | null;
  };
}

export interface BookingResponse {
  data: Booking[];
  meta: {
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
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
  discount_amount: string;
  tour_id: string;
  tour_booker_id: string;
  voucher_id: string | null;
  created_at: string;
  updated_at: string;
  tour: {
    id: string;
    title: string;
    product_code: string;
    original_price: string;
    sale_price: string;
  };
  tour_booker: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  participants: Array<{
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    nationality?: string;
    passport_number?: string;
    special_requirements?: string;
  }>;
  voucher: {
    id: string;
    code: string;
    discount_value: string;
    discount_type: string;
  } | null;
  payment: {
    id: string;
    stripe_payment_intent_id?: string;
    transaction_id?: string;
    amount: string;
    currency: string;
    status: "pending" | "succeeded" | "failed" | "refunded";
    payment_method?: string;
    paid_at?: string;
  };
}

export interface BookingDetailResponse {
  status: boolean;
  code: number;
  message: string;
  data: BookingDetail;
  errors: any;
  meta: any;
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
  const { data } = await axiosInstance.get<BookingResponse>("/bookings/admin", { params });
  return data;
}

export async function UpdateStatus(
  bookingID: string,
  payload: { status: "pending" | "confirmed" | "cancelled" | "completed" }
) {
  const { data } = await axiosInstance.put<ApiResponse<any>>(
    `/bookings/admin/${bookingID}/status`,
    payload
  );
  return data;
}

export async function DetailBookingByAdmin(bookingID: string) {
  const { data } = await axiosInstance.get<BookingDetailResponse>(`/bookings/admin/${bookingID}`);
  return data;
}
