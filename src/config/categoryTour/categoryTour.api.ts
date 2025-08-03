import { Category, CategoryPayload, QueryGetCategories } from "@/types/categories.type";
import axiosInstance from "../axios";
import { ApiResponse } from "@/types/main";

/* Get All tour */
export async function getCategory(payload: QueryGetCategories) {
  const { data } = await axiosInstance.get<ApiResponse<Category>>("/categories/tour", {
    params: payload,
  });
  return data;
}

/* Get All categories without pagination */
export async function getAllCategories() {
  const { data } = await axiosInstance.get<ApiResponse<{ categories: Category[] }>>(
    "/categories/tour",
    {
      params: { limit: 100 },
    }
  );
  return data;
}

// Get category by ID
export async function getCategoryById(id: string) {
  const { data } = await axiosInstance.get<ApiResponse<Category>>(`/categories/tour/${id}`);
  return data;
}

/* Create category */
export async function createCategory(payload: CategoryPayload) {
  const { data } = await axiosInstance.post<ApiResponse<Category>>("/categories/tour", payload);
  return data;
}

/* Update category */
export async function updateCategory(id: string, payload: CategoryPayload) {
  const { data } = await axiosInstance.put<ApiResponse<Category>>(
    `/categories/tour/${id}`,
    payload
  );
  return data;
}

/* Update status */
export async function updateCategoryStatus(id: string, status: "active" | "inactive") {
  const { data } = await axiosInstance.patch<ApiResponse<Category>>(
    `/categories/tour/${id}/status`,
    { status }
  );
  return data;
}

/* Delete category */
export async function deleteCategory(id: string) {
  const { data } = await axiosInstance.delete<ApiResponse<Category>>(`/categories/tour/${id}`);
  return data;
}
