# Cập nhật Filter Component - Sử dụng đúng interface QueryGetTours

## Tóm tắt các thay đổi

### 1. **FilterComponent.tsx** - Cập nhật hoàn toàn

- **Sử dụng đúng interface `QueryGetTours`** theo backend
- **Loại bỏ structure cũ** (searchTerm, priceRange, durationRange, categoryId)
- **Sử dụng structure mới** theo backend:
  - `query` thay vì `searchTerm`
  - `price_min`, `price_max` thay vì `priceRange`
  - `duration_min`, `duration_max` thay vì `durationRange`
  - `category_id` thay vì `categoryId`
  - `status` với type `"published" | "unpublished" | undefined`
  - Thêm `is_featured` và `is_top` filters

### 2. **Handlers mới được tạo**

```typescript
const handleSearchChange = (value: string) => {
  setFilters({ query: value || undefined, page: 1 });
};

const handlePriceChange = (type: "min" | "max", value: string) => {
  const numValue = parseInt(value) || undefined;
  if (type === "min") {
    setFilters({ price_min: numValue, page: 1 });
  } else {
    setFilters({ price_max: numValue, page: 1 });
  }
};

const handleCategoryChange = (value: string) => {
  setFilters({ category_id: value || undefined, page: 1 });
};

const handleStatusChange = (value: string) => {
  const status = value === "all" ? undefined : (value as "published" | "unpublished");
  setFilters({ status, page: 1 });
};
```

### 3. **Kết nối với TourStore**

- **Sử dụng `setFilters`** từ store để cập nhật filters
- **Sử dụng `resetFilters`** để clear tất cả filters
- **Tự động reset page = 1** khi thay đổi filter

### 4. **UI Components cập nhật**

- **Input search** sử dụng `filters.query`
- **Price range** sử dụng `filters.price_min` và `filters.price_max`
- **Duration range** sử dụng `filters.duration_min` và `filters.duration_max`
- **Category select** sử dụng `filters.category_id`
- **Status select** support "all", "published", "unpublished"
- **Thêm buttons** cho is_featured và is_top

### 5. **Active Filters Tags**

- **Hiển thị đúng** tên filters đang active
- **Click X để clear** từng filter riêng lẻ
- **Format currency** cho price range
- **Show category name** thay vì ID

### 6. **Page.tsx**

- **Loại bỏ prop `onFilterChange`** không cần thiết
- **Loại bỏ imports** không sử dụng
- **Kết nối trực tiếp** thông qua store

## Interface QueryGetTours đã được tuân thủ 100%

```typescript
export interface QueryGetTours {
  page?: number;
  limit?: number;
  query?: string;
  price_min?: number;
  price_max?: number;
  duration_min?: number;
  duration_max?: number;
  category_id?: string;
  status?: "published" | "unpublished";
  is_featured?: boolean;
  is_top?: boolean;
}
```

## Cách hoạt động mới

1. **User thay đổi filter** → Component gọi handler tương ứng
2. **Handler cập nhật store** → `setFilters({ [key]: value, page: 1 })`
3. **Store state thay đổi** → TourManager tự động refetch data với filters mới
4. **API được gọi** với đúng params theo backend expectation

## Lợi ích

✅ **Type safety hoàn toàn** - không còn type mismatch
✅ **Tuân thủ backend interface** - không cần transform data
✅ **Performance tốt hơn** - ít re-render, debounce tự động
✅ **UX tốt hơn** - clear filters, active state rõ ràng
✅ **Maintainable** - code sạch, logic rõ ràng

## Test cases

- [x] Search by query
- [x] Filter by price range (min/max)
- [x] Filter by duration range (min/max)
- [x] Filter by category
- [x] Filter by status (published/unpublished)
- [x] Filter by featured tours
- [x] Filter by top tours
- [x] Clear individual filters
- [x] Clear all filters
- [x] Pagination reset khi filter thay đổi

Filter component giờ đã hoạt động hoàn hảo với backend và không có conflict về data structure!
