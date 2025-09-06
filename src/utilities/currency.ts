/**
 * Format số tiền theo định dạng Việt Nam
 * @param amount - Số tiền cần format (number hoặc string)
 * @returns Chuỗi đã format (VD: 1.000.000 ₫)
 */
export function formatCurrency(amount: number | string): string {
  // Nếu là string, chuyển đổi cẩn thận để không mất độ chính xác
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

/**
 * Format số tiền dạng ngắn gọn
 * @param amount - Số tiền cần format
 * @returns Chuỗi đã format (VD: 1tr ₫, 500k ₫)
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1).replace(".0", "")}tr ₫`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}k ₫`;
  }
  return `${amount} ₫`;
}

/**
 * Parse chuỗi tiền tệ về số
 * @param currencyString - Chuỗi tiền tệ (VD: "1.000.000 ₫")
 * @returns Số tiền
 */
export function parseCurrency(currencyString: string): number {
  return Number(currencyString.replace(/[^\d]/g, ""));
}
