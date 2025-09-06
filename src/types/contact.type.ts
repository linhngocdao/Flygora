// Định nghĩa kiểu dữ liệu cho contact form
export interface contactPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  phonePrefix?: string;
  phoneNumber?: string;
  message?: string;
  type: "contact" | "marketing";
}

// Định nghĩa kiểu dữ liệu cho contact record từ API
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
  message?: string;
  type: "contact" | "marketing";
  createdAt: string;
  updatedAt?: string;
}

// Query parameters cho API contact
export interface QueryGetContacts {
  page?: number;
  limit?: number;
  query?: string;
  type?: "contact" | "marketing";
}

// Response từ API contact
export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}
