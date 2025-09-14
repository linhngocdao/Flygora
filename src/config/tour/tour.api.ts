import { Tour, TourPayload, QueryGetTours, TourResponse } from "@/types/tour.type";
import axiosInstance from "../axios";
import { ApiResponse } from "@/types/main";

/* Get All tours (Public) */
export async function getTours(payload: QueryGetTours) {
  const { data } = await axiosInstance.get<ApiResponse<Tour[]>>("/tours", {
    params: payload,
  });
  return data;
}

/* Get All tours (Private - Admin) */
export async function getPrivateTours(payload: QueryGetTours) {
  const { data } = await axiosInstance.get<ApiResponse<Tour[]>>("/tours/private", {
    params: payload,
  });
  return data;
}

/* Get Featured tours */
export async function getFeaturedTours(payload?: QueryGetTours) {
  const { data } = await axiosInstance.get<ApiResponse<Tour[]>>("/tours/featured", {
    params: payload,
  });
  return data;
}

/* Get tours by category */
export async function getToursByCategory(categoryId: string, payload?: QueryGetTours) {
  const { data } = await axiosInstance.get<ApiResponse<Tour[]>>(`/tours/category/${categoryId}`, {
    params: payload,
  });
  return data;
}

// Get tour by ID
export async function getTourById(id: string) {
  const { data } = await axiosInstance.get<ApiResponse<TourResponse>>(`/tours/${id}`);
  return data;
}

/* Create tour */
export async function createTour(payload: TourPayload) {
  const { data } = await axiosInstance.post<ApiResponse<TourResponse>>("/tours", payload);
  return data;
}

/* Update tour */
export async function updateTour(id: string, payload: Partial<TourPayload>) {
  const { data } = await axiosInstance.put<ApiResponse<TourResponse>>(`/tours/${id}`, payload);
  return data;
}

/* Update tour status */
export async function updateTourStatus(id: string, status: "published" | "unpublished") {
  const { data } = await axiosInstance.patch<ApiResponse<TourResponse>>(`/tours/${id}/status`, {
    status,
  });
  return data;
}

/* Delete tour */
export async function deleteTour(id: string) {
  const { data } = await axiosInstance.delete<ApiResponse<Tour>>(`/tours/${id}`);
  return data;
}
