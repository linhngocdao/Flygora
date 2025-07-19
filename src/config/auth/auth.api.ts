import axiosInstance from "../axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// Response wrapper từ backend
export interface ApiResponse<T> {
  status: boolean;
  code: number;
  message: string;
  data: T;
  errors: null;
  meta: null;
}

export async function login(payload: LoginPayload) {
  const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>("/user/login", payload);
  return data.data; // Trả về data.data vì backend wrap trong ApiResponse
}

export async function verifyToken() {
  const { data } = await axiosInstance.get<ApiResponse<{ valid: boolean }>>("/user/verify-token");
  return data.data;
}

export async function refreshToken() {
  // Không cần gửi refresh_token vì nó đã được lưu trong httpOnly cookie
  // Backend sẽ tự động đọc từ cookie
  const { data } =
    await axiosInstance.post<ApiResponse<{ access_token: string }>>("/user/refresh-token");
  return data.data;
}

export async function logout() {
  const { data } = await axiosInstance.post<ApiResponse<null>>("/user/logout");
  return data.data;
}
