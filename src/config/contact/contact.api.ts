import { contactPayload, RecaptchaResponse } from "@/types/contact.type";
import axiosInstance from "../axios";

interface contactParam {
  page?: number;
  limit?: number;
}

// Xác thực reCAPTCHA trước khi gửi form
export async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
  const response = await fetch("/api/verify-recaptcha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return response.json();
}

export async function SendContact(payload: contactPayload) {
  // Xác thực reCAPTCHA trước khi gửi contact
  const recaptchaResult = await verifyRecaptcha(payload.recaptcha);

  if (!recaptchaResult.success) {
    throw new Error("Xác thực bảo mật không thành công. Vui lòng thử lại.");
  }

  // Xóa token reCAPTCHA khỏi payload trước khi gửi đến backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { recaptcha, ...contactData } = payload;

  const { data } = await axiosInstance.post("/contact", contactData);
  return data;
}

export async function GetContact(param: contactParam) {
  const { data } = await axiosInstance.get("/contact", { params: param });
  return data;
}

export async function DeleteContact(id: string) {
  const { data } = await axiosInstance.delete(`/contact/${id}`);
  return data;
}
