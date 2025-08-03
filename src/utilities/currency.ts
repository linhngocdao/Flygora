/**
 * Format số tiền theo định dạng Việt Nam
 * @param amount - Số tiền cần format
 * @returns Chuỗi đã format (VD: 1.000.000 ₫)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
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
