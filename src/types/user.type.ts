export type UserRole = "admin" | "seo";
export type UserStatus = "active" | "inactive";

export interface GetPayload {
  page?: number;
  limit?: number;
  search?: string | undefined;
  role?: UserRole | undefined;
  status?: UserStatus | undefined;
}
export interface GetAllUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at?: string;
  updated_at?: string;
  length?: any; // đếm so với tổng số bản ghi
}
