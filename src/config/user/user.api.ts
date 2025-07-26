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

/* Delete user */
export async function deleteUser(id: string) {
  const { data } = await axiosInstance.delete<ApiResponse<{ id: string }>>(
    `/user/admin/users/${id}`
  );
  return data;
}

/* Đổi pass với admin */
export async function changePasswordUserApi(id: string, new_password: string) {
  const { data } = await axiosInstance.patch<ApiResponse<{ id: string }>>(
    `/user/admin/users/${id}/change-password`,
    {
      new_password,
      confirm_password: new_password,
    }
  );
  return data;
}

/* Add user */
export async function addUserApi(
  name: string,
  email: string,
  password: string,
  role: "admin" | "seo"
) {
  const { data } = await axiosInstance.post<ApiResponse<{ id: string }>>("/user/admin/users", {
    name,
    email,
    password,
    role,
  });
  return data;
}

/* Edit user */
export async function editUserApi(
  id: string,
  name: string,
  email: string,
  role: "admin" | "seo",
  status: "active" | "inactive"
) {
  const { data } = await axiosInstance.put<ApiResponse<{ id: string }>>(`/user/admin/users/${id}`, {
    name,
    email,
    role,
    status,
  });
  return data;
}

/* Get detail user */
export async function getDetailUserApi(id: string) {
  const { data } = await axiosInstance.get<ApiResponse<GetAllUserResponse>>(
    `/user/admin/users/${id}`
  );
  return data;
}
