export interface ApiResponse<T> {
  status: boolean;
  code: number;
  message: string;
  data: T;
  errors: null | any;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}
