// Định nghĩa kiểu dữ liệu cho contact form
export interface contactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: string;
  phoneNumber: string;
  message?: string;
  recaptcha: string; // Thêm token reCAPTCHA
}

// Response từ API contact
export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Response từ reCAPTCHA verification
export interface RecaptchaResponse {
  success: boolean;
  message: string;
  score?: number;
  errors?: string[];
}
