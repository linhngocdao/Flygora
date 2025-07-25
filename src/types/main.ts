export interface ApiResponse<T> {
  status: boolean;
  code: number;
  message: string;
  data: T;
  errors: null;
  meta: null;
}
