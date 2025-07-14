# Hướng dẫn Next.js và TypeScript cho Dự án Go Travel

## Ngữ cảnh kỹ thuật Frontend

Dự án Go Travel sử dụng **Next.js với App Router** làm framework React và **TypeScript** là ngôn ngữ lập trình chính. Trọng tâm của tài liệu này là phát triển giao diện người dùng (UI), trải nghiệm người dùng (UX) mượt mà, trực quan và hiệu suất frontend tối ưu.

## Next.js (App Router - Frontend)

### Cấu trúc dự án

- Tuân thủ cấu trúc thư mục của **App Router** (`app/`). Ưu tiên tổ chức các route và component trong thư mục `app/`
- Tổ chức các module UI/Component theo tính năng hoặc miền (domain-driven) để dễ bảo trì và khả năng mở rộng
  - Ví dụ: `app/dashboard/components`, `app/booking/ui`
- Tạo các thư mục riêng cho utilities, hooks tùy chỉnh, và components dùng chung
  - `src/lib`, `src/hooks`, `src/common/components`

### Phát triển Frontend (Components - UI/UX & Hiệu suất)

#### Components

- Sử dụng **Functional Components** với **React Hooks** (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`)
- **Tái cấu trúc & Tái sử dụng Component:**
  - Luôn phân chia component thành các phần nhỏ, có thể tái sử dụng (Atomic Design)
  - Đảm bảo mỗi component có một trách nhiệm duy nhất (Single Responsibility Principle)
  - Ưu tiên tạo các component dùng chung (`src/common/components`) để tối đa hóa việc tái sử dụng
- Sử dụng `key` prop đúng cách khi render danh sách để tối ưu hiệu suất render

#### Styling

- Sử dụng **Tailwind CSS** cho việc tạo kiểu (styling)
  - Tuân thủ các quy ước và utilities của Tailwind để đảm bảo tính nhất quán và khả năng bảo trì
- Sử dụng **Shadcn/ui** cho các component UI dựng sẵn
  - Ưu tiên sử dụng các thành phần và quy ước của Shadcn/ui để đảm bảo giao diện đồng bộ và chất lượng cao

#### Quản lý State

- **State cục bộ component:** Sử dụng `useState` hoặc `useReducer`
- **State toàn cục:** Sử dụng **Zustand** cho việc quản lý state nhẹ, linh hoạt và hiệu quả
- **State bất đồng bộ:** Sử dụng **React Query** để tối ưu hiệu suất và trải nghiệm người dùng
  - Cache dữ liệu, refetch on focus, retry failures, optimistic updates

### Data Fetching & Tối ưu Next.js App Router

#### Phương pháp fetching dữ liệu

- **Server Components (mặc định trong `app/`):**
  - Tận dụng để fetch dữ liệu trực tiếp trên server
  - Giảm tải cho client và cải thiện thời gian hiển thị ban đầu
- **Route Handlers (`app/config/`):**
  - Xây dựng các API endpoint phía server để xử lý các yêu cầu dữ liệu phức tạp
- **`generateStaticParams`:**
  - Sử dụng để tạo các trang tĩnh tại thời điểm build cho các dynamic route
- **Client-side fetching (React Query):**
  - Cho dữ liệu cần tải sau khi component được mount
  - Dữ liệu yêu cầu tương tác của người dùng, đặc biệt trong Client Components

#### Tối ưu hóa hiệu suất

- **Tối ưu hình ảnh:** Sử dụng `<Image>` component của Next.js
  - Lazy loading, responsive sizing, WebP format tự động
- **Tối ưu font:** Sử dụng `next/font` để tối ưu việc tải font
  - Loại bỏ layout shift (CLS) và đảm bảo trải nghiệm đọc mượt mà
- **Tối ưu Script:** Sử dụng `<Script>` component của Next.js
  - Kiểm soát việc tải các script bên thứ ba, tránh chặn render
- **Code Splitting/Lazy Loading:** Sử dụng `React.lazy` và `next/dynamic`
  - Tải các component hoặc module nặng chỉ khi cần thiết

### Forms & Validation

- Sử dụng **React Hook Form** để quản lý trạng thái form, validation và submit form hiệu quả
- Sử dụng **Yup** để định nghĩa schema validation cho form
  - Kết hợp chặt chẽ với React Hook Form để đảm bảo tính an toàn kiểu
  - Cung cấp phản hồi lỗi rõ ràng, tức thì cho người dùng

### Trải nghiệm người dùng (UX) và Accessibility

#### UX Best Practices

- Luôn ưu tiên trải nghiệm người dùng mượt mà, trực quan và phản hồi nhanh chóng
- Cung cấp phản hồi rõ ràng cho người dùng về các hành động
  - Loading states, thông báo lỗi, thông báo thành công
  - Sử dụng UI components thay vì `alert()` truyền thống

#### Accessibility (A11y)

- Đảm bảo khả năng tiếp cận cho tất cả các thành phần UI
- Sử dụng thuộc tính `aria-*` appropriately
- Quản lý focus management
- Điều hướng bằng bàn phím
- Đảm bảo tương phản màu sắc phù hợp

## TypeScript (Frontend-centric)

### Tính an toàn về kiểu (Type Safety)

- Sử dụng TypeScript để đảm bảo tính an toàn về kiểu trong toàn bộ codebase frontend
- Khai báo kiểu rõ ràng cho:
  - Props, state, biến
  - Tham số hàm và giá trị trả về
- Hạn chế tối đa việc sử dụng `any`

### Định nghĩa Interface và Type

#### Quy tắc sử dụng

- Sử dụng `interface` cho định nghĩa hình dạng của các đối tượng (Object Shapes)
  - Đặc biệt cho props của component
  - Cấu trúc dữ liệu nhận từ API
- Sử dụng `type` cho:
  - Các loại kết hợp (union types)
  - Biệt danh kiểu (type aliases)
  - Các loại phức tạp khác

#### Tổ chức Types

- Tổ chức các định nghĩa kiểu liên quan đến UI/Dữ liệu frontend
- Sử dụng các tệp `.d.ts` hoặc `types.ts` phù hợp với cấu trúc component/tính năng

### Thực tiễn tốt với TypeScript

#### Generic Types

- Sử dụng generic để tạo các thành phần, hooks hoặc tiện ích có thể tái sử dụng và linh hoạt hơn

#### Null & Undefined Handling

- Xử lý `null` và `undefined` một cách cẩn thận
- Sử dụng optional chaining (`?.`) và nullish coalescing (`??`) khi thích hợp
- Tránh lỗi runtime

#### Type Assertions

- Hạn chế sử dụng ép kiểu không an toàn (`as Type`)
- Chỉ sử dụng khi hoàn toàn chắc chắn về kiểu dữ liệu
- Không thể suy luận được từ TypeScript

## Best Practices Summary

### Component Organization

- Functional components với proper hooks usage
- Single responsibility principle
- Reusable component patterns
- Proper key props cho lists

### Performance Optimization

- Next.js Image component cho images
- Code splitting với lazy loading
- Proper caching strategies
- Bundle size optimization

### State Management

- Local state: useState/useReducer
- Global state: Zustand
- Server state: React Query
- Form state: React Hook Form

### Code Quality

- TypeScript strict mode
- Proper error handling
- Accessibility compliance
- Consistent naming conventions

### User Experience

- Loading states và error boundaries
- Responsive design
- Accessibility features
- Performance optimization

---
