# Hướng dẫn Next.js và TypeScript cho Dự án Go Travel - Phát triển Frontend (UI/UX & Trải nghiệm Người dùng)

## Ngữ cảnh kỹ thuật Frontend

Dự án Go Travel sử dụng **Next.js với App Router** làm framework React và **TypeScript** là ngôn ngữ lập trình chính. Trọng tâm của tài liệu này là phát triển giao diện người dùng (UI), trải nghiệm người dùng (UX) mượt mà, trực quan và hiệu suất frontend tối ưu.

## Next.js (Chỉ Frontend - Sử dụng App Router)

### Cấu trúc dự án
-   Tuân thủ cấu trúc thư mục của **App Router** (`app/`). Ưu tiên tổ chức các route và component trong thư mục `app/`.
-   Tổ chức các module UI/Component theo tính năng hoặc miền (domain-driven) để dễ bảo trì và khả năng mở rộng. Ví dụ: `app/dashboard/components`, `app/booking/ui`.
-   Tạo các thư mục riêng cho các tiện ích (utilities), hooks tùy chỉnh, và các thành phần dùng chung (`src/lib`, `src/hooks`, `src/common/components`).

### Phát triển Frontend (Next.js Components - UI/UX & Hiệu suất)
-   **Components:**
    -   Sử dụng **Functional Components** với **React Hooks** (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`, v.v.).
    -   **Tái cấu trúc & Tái sử dụng Component:** Luôn tìm cách phân chia component thành các phần nhỏ, có thể tái sử dụng (Atomic Design nếu phù hợp). Đảm bảo mỗi component có một trách nhiệm duy nhất (Single Responsibility Principle). Ưu tiên tạo các component dùng chung (`src/common/components`) để tối đa hóa việc tái sử dụng.
    -   Sử dụng `key` prop đúng cách khi render danh sách để tối ưu hiệu suất render.
-   **Styling:**
    -   Sử dụng **Tailwind CSS** cho việc tạo kiểu (styling). Tuân thủ các quy ước và tiện ích (utilities) của Tailwind để đảm bảo tính nhất quán và khả năng bảo trì.
    -   Sử dụng **Shadcn/ui** cho các component UI dựng sẵn. Khi tạo hoặc tùy chỉnh component, hãy ưu tiên sử dụng các thành phần và quy ước của Shadcn/ui để đảm bảo giao diện đồng bộ và chất lượng cao.
-   **Quản lý State:**
    -   Đối với state cục bộ của component, sử dụng `useState` hoặc `useReducer`.
    -   Đối với state toàn cục, sử dụng **Zustand** cho việc quản lý state nhẹ, linh hoạt và hiệu quả.
    -   Đối với state bất đồng bộ (data fetching, caching, đồng bộ hóa server state), sử dụng **React Query** để tối ưu hiệu suất và trải nghiệm người dùng (ví dụ: cache dữ liệu, refetch on focus, retry failures, optimistic updates).
-   **Lấy Dữ liệu (Data Fetching & Tối ưu Next.js - App Router):**
    -   Sử dụng các phương pháp fetching dữ liệu của Next.js App Router để tối ưu thời gian tải và hiển thị:
        -   **Server Components (mặc định trong `app/`):** Tận dụng Server Components để fetch dữ liệu trực tiếp trên server, giảm tải cho client và cải thiện thời gian hiển thị ban đầu.
        -   **Route Handlers (`app/api/`):** Xây dựng các API endpoint phía server để xử lý các yêu cầu dữ liệu phức tạp hoặc tương tác với backend.
        -   **`generateStaticParams`:** Sử dụng để tạo các trang tĩnh tại thời điểm build cho các dynamic route, tối ưu hóa hiệu suất.
        -   **Client-side fetching (React Query):** Cho dữ liệu cần tải sau khi component được mount hoặc dữ liệu yêu cầu tương tác của người dùng, đặc biệt trong Client Components.
    -   **Tối ưu hình ảnh:** Sử dụng `<Image>` component của Next.js để tự động tối ưu hóa hình ảnh (lazy loading, responsive sizing, WebP), giảm kích thước tệp và cải thiện tốc độ tải trang.
    -   **Tối ưu font:** Sử dụng `next/font` để tối ưu việc tải font, loại bỏ layout shift (CLS) và đảm bảo trải nghiệm đọc mượt mà.
    -   **Tối ưu Script:** Sử dụng `<Script>` component của Next.js để kiểm soát việc tải các script bên thứ ba, tránh chặn render và cải thiện hiệu suất tải trang.
    -   **Code Splitting / Lazy Loading:** Sử dụng `React.lazy` và `next/dynamic` để tải các component hoặc module nặng chỉ khi chúng cần thiết, cải thiện thời gian tải ban đầu và giảm kích thước bundle.

### Forms & Validation
-   Sử dụng **React Hook Form** để quản lý trạng thái form, validation và submit form một cách hiệu quả và tối ưu về hiệu suất.
-   Sử dụng **Yup** để định nghĩa schema validation cho form. Kết hợp chặt chẽ với React Hook Form để đảm bảo tính an toàn kiểu và cung cấp phản hồi lỗi rõ ràng, tức thì cho người dùng.

### Trải nghiệm người dùng (UX) và Khả năng tiếp cận (Accessibility - A11y)
-   Luôn ưu tiên trải nghiệm người dùng mượt mà, trực quan và phản hồi nhanh chóng.
-   Đảm bảo khả năng tiếp cận (Accessibility - A11y) cho tất cả các thành phần UI (ví dụ: sử dụng thuộc tính `aria-*`, quản lý focus, điều hướng bằng bàn phím, tương phản màu sắc).
-   Cung cấp phản hồi rõ ràng cho người dùng về các hành động (loading states, thông báo lỗi, thông báo thành công) thông qua UI thay vì `alert()` truyền thống.

## TypeScript (Frontend-centric)

### Tính an toàn về kiểu (Type Safety)
-   Sử dụng TypeScript để đảm bảo tính an toàn về kiểu trong toàn bộ codebase frontend.
-   Khai báo kiểu rõ ràng cho props, state, biến, tham số hàm và giá trị trả về.
-   Hạn chế tối đa việc sử dụng `any`.

### Định nghĩa Interface và Type
-   Sử dụng `interface` cho định nghĩa hình dạng của các đối tượng (Object Shapes), đặc biệt cho props của component, cấu trúc dữ liệu nhận từ API.
-   Sử dụng `type` cho các loại kết hợp (union types), biệt danh kiểu (type aliases), hoặc các loại phức tạp khác.
-   Tổ chức các định nghĩa kiểu liên quan đến UI/Dữ liệu frontend trong các tệp `.d.ts` hoặc `types.ts` phù hợp với cấu trúc component/tính năng.

### Thực tiễn tốt với TypeScript
-   **Generic Types:** Sử dụng generic để tạo các thành phần, hooks hoặc tiện ích có thể tái sử dụng và linh hoạt hơn.
-   **Null & Undefined Handling:** Xử lý `null` và `undefined` một cách cẩn thận, sử dụng optional chaining (`?.`) và nullish coalescing (`??`) khi thích hợp để tránh lỗi runtime.
-   **Type Assertions:** Hạn chế sử dụng ép kiểu không an toàn (`as Type`). Chỉ sử dụng khi bạn hoàn toàn chắc chắn về kiểu dữ liệu và không thể suy luận được từ TypeScript.
