export interface Category {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
}
export interface QueryGetCategories {
  page?: number;
  limit?: number;
  query?: string;
  status?: "active" | "inactive";
}

export interface CategoryPayload {
  name: string;
  description: string;
  status?: "active" | "inactive";
}
