import { ApiResponse } from "@/types/main";
import axiosInstance from "../axios";
import { GetAllUserResponse, GetPayload } from "@/types/user.type";

/* Get all user */
export async function getAllUser(payload: GetPayload) {
  const { data } = await axiosInstance.get<ApiResponse<GetAllUserResponse>>("/user/admin/users", {
    params: payload,
  });
  return data;
}

/* Change status */
export async function changeStatusUser(id: string, status: "active" | "inactive") {
  const { data } = await axiosInstance.patch<ApiResponse<{ id: string; status: string }>>(
    `/user/admin/users/${id}/status`,
    { status }
  );
  return data;
}
