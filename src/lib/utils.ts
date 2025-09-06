import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export const getErrorMessage = (error: any, defaultMessage: string): string => {
  // Kiểm tra các possible error structures
  if (error?.response?.data?.errors) {
    // Nếu errors là array
    if (Array.isArray(error.response.data.errors) && error.response.data.errors.length > 0) {
      return error.response.data.errors[0].message || error.response.data.errors[0];
    }
    // Nếu errors là object
    if (typeof error.response.data.errors === "object") {
      const firstError = Object.values(error.response.data.errors)[0];
      return Array.isArray(firstError) ? firstError[0] : String(firstError);
    }
  }

  // Fallback patterns
  return error?.response?.data?.message || error?.message || defaultMessage;
};
