import axios, { AxiosInstance, AxiosError } from "axios";
import Cookies from "js-cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api/v1", // Sử dụng proxy thay vì direct call
  timeout: 5 * 60 * 1000,
  withCredentials: true,
});

// Flag để tránh multiple refresh token calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: any) => void;
}> = [];

// Xử lý queue khi refresh thành công/thất bại
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// Request interceptor - thêm token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - xử lý refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Tránh refresh cho login/refresh endpoint
      if (
        originalRequest.url?.includes("/user/login") ||
        originalRequest.url?.includes("/user/refresh-token")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        // Nếu đang refresh, thêm vào queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        // Gọi refresh token endpoint
        const response = await axios.post(
          "/api/v1/user/refresh-token",
          {},
          { withCredentials: true }
        );

        const { access_token } = response.data.data;

        // Lưu token mới
        Cookies.set("access_token", access_token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: 1, // 1 ngày
        });

        // Cập nhật header cho request gốc
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        // Process queue với token mới
        processQueue(null, access_token);

        // Retry request gốc
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại - clear auth và redirect
        processQueue(refreshError, null);
        Cookies.remove("access_token");

        // Redirect về login page
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          if (!currentPath.includes("/login")) {
            const locale = currentPath.split("/")[1] || "vi";
            window.location.href = `/${locale}/admin/login`;
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const sendGet = async <T>(url: string, params?: any): Promise<T> => {
  const res = await axiosInstance.get(url, { params });
  return res.data as T;
};

export const sendPost = <T>(
  url: string,
  params?: unknown,
  queryParams?: Record<string, unknown>
): Promise<T> =>
  axiosInstance.post(url, params, { params: queryParams }).then((res) => res.data as T);

export const sendPut = <T>(url: string, params?: unknown): Promise<T> =>
  axiosInstance.put(url, params).then((res) => res.data as T);

export const sendPatch = <T>(url: string, params?: unknown): Promise<T> =>
  axiosInstance.patch(url, params).then((res) => res.data as T);

export const sendDelete = <T>(url: string, params?: Record<string, unknown>): Promise<T> =>
  axiosInstance.delete(url, { params }).then((res) => res.data as T);

export default axiosInstance;
