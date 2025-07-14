import { useEffect, useState } from 'react';

/**
 * Hook tùy chỉnh để tạo giá trị debounce
 *
 * @template T - Kiểu dữ liệu của giá trị cần debounce
 * @param value - Giá trị đầu vào cần debounce
 * @param delay - Thời gian trễ tính bằng mili giây
 * @returns Giá trị sau khi đã được debounce
 * @throws Error nếu delay là số âm
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * // Effect chỉ chạy khi debouncedSearchTerm thay đổi
 * useEffect(() => {
 *   thucHienTimKiem(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 * ```
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  // State để lưu trữ giá trị đã debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Kiểm tra giá trị delay hợp lệ
    if (delay < 0) {
      throw new Error('Delay phải là số dương');
    }

    // Thiết lập timeout để cập nhật giá trị sau khoảng thời gian delay
    const bodemThoiGian = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hàm cleanup để hủy timeout nếu value hoặc delay thay đổi
    // hoặc nếu component bị unmount trước khi timeout hoàn tất
    return () => {
      clearTimeout(bodemThoiGian);
    };
  }, [value, delay]); // Chạy lại effect khi value hoặc delay thay đổi

  return debouncedValue;
};
