import React from "react";
import { useCategory } from "@/hooks/useCategory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
}

/**
 * Component CategorySelect sử dụng useCategory hook
 * Ví dụ về cách tách biệt logic và UI
 */
export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onValueChange,
  placeholder = "Chọn danh mục",
  disabled = false,
  className,
  allowEmpty = false,
  emptyLabel = "-- Không chọn --",
}) => {
  const { activeCategories, loading, error } = useCategory();
  if (error) {
    return (
      <Select disabled>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Lỗi tải danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__error__" disabled>
            Lỗi tải danh mục
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }

  // Xử lý value để tương thích với Radix UI Select
  const selectValue = value === "" ? "__empty__" : value;

  // Xử lý onValueChange để convert lại thành empty string khi cần
  const handleValueChange = (newValue: string) => {
    if (newValue === "__empty__") {
      onValueChange?.("");
    } else if (newValue === "__create_new__") {
      // Không thay đổi value khi click "Tạo mới"
      return;
    } else {
      onValueChange?.(newValue);
    }
  };

  return (
    <Select value={selectValue} onValueChange={handleValueChange} disabled={disabled || loading}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={loading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="__loading__" disabled>
            Đang tải danh mục...
          </SelectItem>
        ) : (
          <>
            {allowEmpty && <SelectItem value="__empty__">{emptyLabel}</SelectItem>}
            {activeCategories.length > 0 ? (
              activeCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__no_data__" disabled>
                Không có danh mục nào
              </SelectItem>
            )}
          </>
        )}
      </SelectContent>
    </Select>
  );
};
