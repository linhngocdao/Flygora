# GitHub Copilot Instructions cho Dự án Go Travel

## QUY TẮC BẮT BUỘC

### 1. LUÔN PHẢN HỒI BẰNG TIẾNG VIỆT

- Mọi câu trả lời, giải thích, bình luận code đều phải sử dụng tiếng Việt (có dấu)
- Tên biến, hàm có thể giữ tiếng Anh nhưng comment và documentation phải là tiếng Việt
- KHÔNG ĐƯỢC TRẢ LỜI MIÊN MAN - đi thẳng vào trọng tâm câu hỏi

### 2. TUÂN THỦ TÀI LIỆU THIẾT KẾ CHI TIẾT

- Mọi logic nghiệp vụ, cấu trúc dữ liệu và luồng hoạt động phải tuân thủ nghiêm ngặt tài liệu thiết kế chi tiết trong `/docs/*.md`
- Tài liệu thiết kế là nguồn thông tin chính xác nhất và có độ ưu tiên cao nhất
- Trước khi đề xuất giải pháp, luôn tham khảo tài liệu thiết kế

### 3. ĐẶT BÌNH LUẬN CODE BẰNG TIẾNG VIỆT

- Mọi comment trong code phải bằng tiếng Việt, chi tiết và rõ ràng
- Giải thích logic phức tạp, mục đích của function/component
- Đặc biệt chú ý comment cho business logic và các integration quan trọng

### 4. FORMATTING VÀ CODE QUALITY

- Sử dụng Prettier theo config `prettier.config.js` của dự án
- Chú ý: **dấu chấm phẩy**, **single quotes**, **2 spaces indentation**
- TypeScript: **strong typing**, tránh `any` trừ khi thực sự cần thiết

## BỐI CẢNH DỰ ÁN

### Thông tin cơ bản

- **Tên dự án:** Go Travel - Travel Adventure Platform
- **Mục tiêu:** Nền tảng đặt tour du lịch mạo hiểm với giao diện đa ngôn ngữ (Tiếng Việt, Tiếng Anh)
- **Vai trò:** Full-stack Developer (cả Frontend và Backend)
- **Ngôn ngữ chính:** TypeScript
- **Framework chính:** Next.js 15 với App Router

### Tầm nhìn kỹ thuật

- Xây dựng hệ thống bền vững cho tương lai với **kiến trúc phân lớp rõ ràng**
- Ưu tiên **rõ ràng, khả năng bảo trì và khả năng kiểm thử** hơn giải pháp nhanh nhưng phức tạp
- Copilot hoạt động như pair programmer có kinh nghiệm, luôn tuân thủ SOLID và DRY

### Đặc điểm dự án

- **Responsive design** cho desktop và mobile
- **Đa ngôn ngữ** với next-intl
- **Adventure tourism** focus với booking system
- **Admin dashboard** cho quản lý tours và bookings

## CÔNG NGHỆ STACK (Go Travel Specific)

### Frontend Core

- **Next.js 15** với App Router (`app/[locale]/` structure)
- **React 19** với Functional Components + Hooks
- **TypeScript 5** - strong typing, tránh `any`
- **Tailwind CSS 4** cho styling với custom utilities
- **Shadcn/ui** components (khi có sẵn)

### UI/UX Libraries

- **next-intl** cho đa ngôn ngữ (vi/en) - LUÔN support i18n
- **Swiper** cho carousel/slider components
- **React Hook Form + Yup** cho form validation
- **@tanstack/react-query** cho data fetching và caching

### State Management

- **React state** (useState, useReducer) cho component state
- **Zustand** cho global state (khi cần thiết)
- **React Query** cho server state và caching

### Development Tools

- **ESLint + Prettier** theo config dự án
- **TypeScript strict mode** enabled
- **Conventional Commits** cho Git workflow

## CẤU TRÚC DỰ ÁN GO TRAVEL

### Tổ chức thư mục thực tế

```
src/
├── app/[locale]/              # App Router với i18n
│   ├── (default-layout)/      # Layout grouping
│   │   ├── (home)/           # Home page
│   │   └── layout.tsx        # Default layout
│   └── layout.tsx            # Root layout
├── components/
│   ├── Clients/              # Client-specific components
│   │   └── layout/           # Layout components
│   │       ├── home/         # Home page sections
│   │       └── header/       # Header components
│   └── ui/                   # Reusable UI components
├── messages/                 # i18n translation files
│   ├── en.json              # English translations
│   └── vi.json              # Vietnamese translations
└── public/
    └── images/              # Static images
        └── homePage/        # Page-specific images
```

### Quy ước đặt tên Go Travel

- **Components:** PascalCase (`HeroSection`, `AdventureTours`)
- **Files:** PascalCase cho components, `page.tsx` cho pages
- **Hooks:** camelCase (`useUserData`, `useTourBooking`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_TOUR_PARTICIPANTS`)
- **Images:** kebab-case (`hero-section.webp`, `adventure-tour-1.jpg`)

### Locale Structure

- **Route pattern:** `app/[locale]/(layout-group)/page.tsx`
- **Translations:** Sử dụng nested keys (`home.hero.title`, `booking.form.submit`)
- **LUÔN support cả tiếng Việt và tiếng Anh**

## NGUYÊN TẮC CODE CORE

### Naming Conventions

- **Component:** PascalCase (`UserProfile`, `BookingForm`, `AdventureTours`)
- **Hook & State:** camelCase (`useState`, `useUserData`, `useTourBooking`)
- **Files:** PascalCase cho components, kebab-case cho utilities
- **Constants:** UPPER_SNAKE_CASE (`MAX_BOOKING_ITEMS`, `TOUR_CATEGORIES`)

### SOLID Principles (Tuân thủ nghiêm ngặt)

- **Single Responsibility:** Mỗi component/function chỉ có một trách nhiệm
- **Open/Closed:** Dễ mở rộng, hạn chế sửa đổi code hiện có
- **Interface Segregation:** Interface nhỏ, chuyên biệt thay vì lớn và chung chung
- **Dependency Inversion:** Phụ thuộc vào abstraction, không phụ thuộc implementation

### DRY Principles

- **Tái sử dụng component:** Tạo shared components trong `/src/components/ui/`
- **Custom hooks:** Cho logic có thể tái sử dụng (`useTourData`, `useBookingForm`)
- **TypeScript generics:** Cho code linh hoạt và type-safe
- **Utility functions:** Trong `/src/lib/` cho helper functions

### Kiến trúc phân lớp (Go Travel)

- **Presentation Layer:** Next.js components trong `app/[locale]/` và `components/`
- **Business Logic:** Custom hooks và utility functions trong `src/lib/`
- **Data Layer:** React Query cho API calls và caching
- **UI Layer:** Tailwind CSS + Shadcn/ui components

### KISS & YAGNI

- **Keep It Simple:** Ưu tiên giải pháp đơn giản, dễ hiểu
- **You Ain't Gonna Need It:** Chỉ implement những gì thực sự cần thiết hiện tại

## ĐA NGÔN NGỮ (NEXT-INTL) - BẮT BUỘC

### Implementation Rules

- **LUÔN support cả tiếng Việt và tiếng Anh** trong mọi component
- **Sử dụng `useTranslations` hook** thay vì hardcode text
- **Nested translation keys:** `home.hero.title`, `booking.form.customerName`
- **Dynamic routing:** `/vi/tours` và `/en/tours`

### Translation Patterns

```typescript
// ✅ ĐÚNG: Sử dụng useTranslations
const t = useTranslations('home.hero');
<h1>{t('title')}</h1>

// ❌ SAI: Hardcode text
<h1>Khám phá thế giới</h1>
```

### File Organization

- `messages/vi.json` - Vietnamese translations
- `messages/en.json` - English translations
- **Sync keys** giữa hai file translation

## PERFORMANCE & UX (GO TRAVEL SPECIFIC)

### Image Optimization

- **Next.js Image component** cho tất cả images
- **WebP format** ưu tiên, fallback to JPG/PNG
- **Lazy loading** mặc định, `priority` cho above-fold images
- **Responsive sizing** với Tailwind breakpoints

### Loading States

- **Skeleton components** cho data loading
- **Spinner/Loading** cho user actions
- **Progressive enhancement** - content trước, enhancement sau
- **Error boundaries** cho error handling

### Swiper Integration

- **Lazy load slides** với `swiper/css/lazy`
- **Touch/Mouse support** cho desktop và mobile
- **Accessibility features** (keyboard navigation, ARIA labels)
- **Performance optimization** với `slidesPerView: 'auto'`

## GIT WORKFLOW (CONVENTIONAL COMMITS)

### Branch Strategy

- `main` - Production ready code
- `develop` - Integration branch
- `feature/<ticket-id>-<description>` - New features
- `hotfix/<ticket-id>-<description>` - Emergency fixes

### Commit Format

- `feat(tours): add adventure tour listing page`
- `fix(booking): resolve form validation issue`
- `style(ui): update hero section responsive design`
- `docs(api): update tour endpoints documentation`

### Pull Request Rules

- **Mô tả rõ ràng:** mục đích, thay đổi chính, cách test
- **Link ticket/issue** tương ứng
- **ESLint + Prettier** pass trước khi merge
- **Ít nhất 1 review** trước khi merge

## MỤC TIÊU CHẤT LƯỢNG

### Code Quality

- **Type Safety:** TypeScript strict mode, tránh `any`
- **Maintainable:** Component < 500 lines, function < 50 lines
- **Testable:** Logic tách biệt, dependency injection
- **Performant:** Bundle size optimization, lazy loading

### User Experience

- **Responsive:** Mobile-first design với Tailwind
- **Accessible:** ARIA labels, keyboard navigation, color contrast
- **Fast:** < 3s loading time, optimized images
- **Intuitive:** Clear navigation, consistent UI patterns

### Development Experience

- **Clear documentation** trong code comments
- **Consistent patterns** across codebase
- **Easy debugging** với proper error handling
- **Hot reloading** development workflow

## LƯU Ý QUAN TRỌNG

### Điều PHẢI làm

- ✅ **Luôn sử dụng useTranslations** cho mọi text
- ✅ **TypeScript interfaces** cho mọi props và data
- ✅ **Error boundaries** cho components
- ✅ **Loading states** cho better UX
- ✅ **Responsive design** mobile-first
- ✅ **Next.js Image** cho tối ưu hình ảnh

### Điều KHÔNG được làm

- ❌ KHÔNG hardcode text, luôn dùng i18n
- ❌ KHÔNG sử dụng `any` type
- ❌ KHÔNG tạo component > 500 lines
- ❌ KHÔNG bỏ qua error handling
- ❌ KHÔNG commit code chưa qua ESLint
- ❌ KHÔNG ignore accessibility

### Khi gặp vấn đề

1. Kiểm tra tài liệu thiết kế trong `/docs/`
2. Tìm existing patterns trong codebase
3. Ưu tiên simple solution
4. Đảm bảo support đa ngôn ngữ
5. Test trên mobile và desktop

---
