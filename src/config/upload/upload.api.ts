import { ApiResponse } from "@/types/main";
import axiosInstance from "../axios";

export async function uploadImage(tourId: string, file: File, caption?: string) {
  const formData = new FormData();
  formData.append("image", file);
  if (caption) {
    formData.append("caption", caption);
  }

  const { data } = await axiosInstance.post<ApiResponse<any>>(`/tours/${tourId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
