# Admin Dashboard - GoTravel

## Tổng quan

Admin Dashboard của GoTravel là hệ thống quản trị web hiện đại được xây dựng với **Next.js 15**, **Shadcn/ui**, và **TypeScript**. Dashboard cung cấp các tính năng quản lý toàn diện cho nền tảng du lịch mạo hiểm.

## Tính năng chính

### 🏠 Dashboard

- **Tổng quan thống kê**: Doanh thu, số booking, khách hàng mới
- **Biểu đồ phân tích**: Xu hướng booking và doanh thu
- **Hoạt động gần đây**: Booking mới nhất, thông báo
- **Thao tác nhanh**: Các chức năng thường dùng

### 🗺️ Quản lý Tours

- **Danh sách tours**: Xem tất cả tours với thông tin chi tiết
- **Tạo/Sửa tours**: Giao diện form hiện đại với validation
- **Quản lý trạng thái**: Active, Inactive, Draft
- **Tìm kiếm & lọc**: Theo tên, địa điểm, danh mục
- **Thống kê booking**: Số lượng đặt tour cho mỗi tour

### 📅 Quản lý Bookings

- **Danh sách booking**: Tất cả đặt tour với thông tin khách hàng
- **Quản lý trạng thái**: Confirmed, Pending, Cancelled, Completed
- **Thanh toán**: Tracking trạng thái thanh toán
- **Xuất báo cáo**: Export Excel, PDF
- **Lịch booking**: Calendar view cho việc lên lịch

### 👥 Quản lý Khách hàng

- **Hồ sơ khách hàng**: Thông tin chi tiết, lịch sử booking
- **Thống kê chi tiêu**: Tổng tiền đã chi, số lần booking
- **Phân loại khách hàng**: VIP, Regular, New
- **Liên hệ trực tiếp**: Email, phone integration

### ⭐ Quản lý Đánh giá

- **Reviews từ khách hàng**: Rating, comment, hình ảnh
- **Moderation**: Duyệt và quản lý reviews
- **Phản hồi**: Reply reviews từ admin
- **Báo cáo đánh giá**: Average rating cho tours

### 📊 Analytics & Reports

- **Revenue reports**: Theo ngày, tháng, năm
- **Booking trends**: Phân tích xu hướng đặt tour
- **Customer insights**: Phân tích hành vi khách hàng
- **Tour performance**: Tours phổ biến nhất

## Công nghệ sử dụng

### Frontend Core

- **Next.js 15** - App Router với server components
- **React 19** - Functional components với hooks
- **TypeScript 5** - Strong typing, code quality
- **Tailwind CSS 4** - Utility-first styling

### UI Components

- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible component primitives

### State Management

- **React Query** - Server state management
- **Zustand** - Global state (when needed)
- **React Hook Form** - Form handling

### Internationalization

- **next-intl** - Đa ngôn ngữ (vi/en)
- **Nested translations** - Organized translation keys

## Cấu trúc thư mục

```
src/app/[locale]/admin/
├── layout.tsx              # Admin layout wrapper
├── page.tsx                # Dashboard overview
├── login/                  # Admin authentication
│   └── page.tsx
├── tours/                  # Tours management
│   └── page.tsx
├── bookings/               # Bookings management
│   └── page.tsx
├── customers/              # Customers management
│   └── page.tsx
└── settings/               # Admin settings
    └── page.tsx

src/components/Admin/
├── layout/
│   ├── AdminHeader.tsx     # Top navigation bar
│   └── AdminSidebar.tsx    # Left sidebar navigation
└── ui/                     # Reusable admin components
```

## Routes Admin

### Authentication

- `/admin/login` - Trang đăng nhập admin

### Main Dashboard

- `/admin` - Dashboard tổng quan
- `/admin/tours` - Quản lý tours
- `/admin/bookings` - Quản lý bookings
- `/admin/customers` - Quản lý khách hàng
- `/admin/reviews` - Quản lý đánh giá
- `/admin/categories` - Quản lý danh mục
- `/admin/content` - Quản lý nội dung
- `/admin/analytics` - Phân tích & báo cáo
- `/admin/settings` - Cài đặt hệ thống

## Cách sử dụng

### 1. Truy cập Admin Dashboard

```bash
# Mở trình duyệt và truy cập:
http://localhost:3000/vi/admin/login

# Demo credentials:
Email: admin@gotravel.com
Password: admin123
```

### 2. Navigation

- **Sidebar**: Điều hướng chính giữa các modules
- **Header**: User menu, notifications, settings
- **Breadcrumbs**: Theo dõi vị trí hiện tại

### 3. Quản lý dữ liệu

- **CRUD Operations**: Create, Read, Update, Delete
- **Bulk Actions**: Thao tác hàng loạt
- **Search & Filter**: Tìm kiếm và lọc dữ liệu
- **Export/Import**: Xuất nhập dữ liệu

## Responsive Design

Dashboard được thiết kế responsive cho:

- **Desktop**: Full functionality với sidebar
- **Tablet**: Collapsed sidebar, touch-friendly
- **Mobile**: Mobile-first navigation với drawer

## Security Features

- **Role-based access**: Phân quyền theo vai trò
- **Authentication**: JWT token authentication
- **Authorization**: Route protection
- **Input validation**: Server-side validation
- **XSS Protection**: Content sanitization

## Performance

- **Code splitting**: Lazy loading components
- **Image optimization**: Next.js Image component
- **Caching**: React Query data caching
- **Bundle optimization**: Tree shaking, minification

## Development

### Chạy development server

```bash
npm run dev
```

### Build production

```bash
npm run build
npm start
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Customization

### Thêm module mới

1. Tạo route trong `app/[locale]/admin/`
2. Thêm sidebar item trong `AdminSidebar.tsx`
3. Tạo components tương ứng
4. Thêm translations trong `messages/`

### Themes

- **Light/Dark mode**: Automatic theme switching
- **Custom colors**: Tailwind configuration
- **Component variants**: Shadcn/ui theming

## Troubleshooting

### Common Issues

1. **Route not found**: Kiểm tra routing configuration
2. **Component import errors**: Verify file paths
3. **Translation missing**: Add keys to translation files
4. **Permission denied**: Check user roles and permissions

### Debug Mode

```bash
# Enable debug logging
DEBUG=admin:* npm run dev
```

## Contributing

1. Follow **TypeScript strict mode**
2. Use **ESLint + Prettier** formatting
3. Write **component comments in Vietnamese**
4. Support **i18n for all text**
5. Follow **SOLID principles**

## License

Private - GoTravel Internal Use Only
