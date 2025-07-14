## QUY TẮC BẮT BUỘC

- **1.LUÔN PHẢN HỒI BẰNG TIẾNG VIỆT:**
  Đây là quy tắc quan trọng nhất. Mọi câu trả lời, giải thích đều phải sử dụng tiếng việt (có dấu).
- **2. LUÔN TUÂN THỦ TÀI LIỆU THIẾT KẾ CHI TIẾT**
  Mọi logic nghiệp vụ, cấu trúc dữ liệu và luồng hoạt động phải tuân thử nghiêm ngặt tài liệu thiết kế chi tiết được lưu tại
  `/docs/*.md`. Tài liệu này là nguồn thông tin chính xác nhất và có độ ưu tiên cao nhất. Trước khi đề xuất giải pháp hãy
  giả định rằng bạn đã đọc tài liệu này
- **3. LUÔN ĐẶT BÌNH LUẬN CODE BẰNG TIẾNG VIỆT**
  Hãy đặt bình luận code ở mọi dùng code bạn gợi ý càng chi tiết càng tốt
- **Lưu ý:** KHÔNG ĐƯỢC TRẢ LỜI MIÊN MAN LINH TINH YÊU CẦU VÀO ĐÚNG TRỌNG TÂM CÂU HỎI VÀ QUÁ TRÌNH FIX LỖI
- **Định dạng code:** Sử dụng Prettier để tự động định dạng code. Tuân thủ cấu hình `prettier.config.js` của dự án. Đặc biệt chú ý đến: **dấu chấm phẩy (semicolons)**, **dấu nháy đơn/kép (quotes)**, **thụt lề (indentation)**.
- **TypeScript:** Luôn ưu tiên việc sử dụng **kiểu dữ liệu chặt chẽ (strong typing)** trong TypeScript, tránh `any` trừ khi thực sự cần thiết và có lý do chính đáng.

## BỐI CẢNH DỰ ÁN
- **Tên dự án:** Go Travel
- **Mục tiêu:** Xây dựng một nền tảng đặt tour du lịch, vé máy bay và khách sạn.
- **Vai trò của tôi:** Kỹ sư phần mềm Full-stack, chịu trách nhiệm thiết kế và triển khai cả kiến trúc frontend và backend.
- **Ngôn ngữ chính:** TypeScript.
- **Tầm nhìn kỹ thuật:** Chúng ta đang xây dựng một hệ thống bền vững cho tương lai. Mọi quyết định kỹ thuật phải ưu tiên sự **rõ ràng, khả năng bảo trì và khả năng kiểm thử (testability)** hơn là các giải pháp nhanh chóng nhưng phức tạp. Copilot phải hoạt động như một người đồng hành lập trình (pair programmer) có kinh nghiệm, luôn đưa ra các giải pháp tuân thủ tầm nhìn này.

## NGUYÊN TẮC CODE LÕI

- **Cách đặt tên biến tên hàm** Component dùng PascalCase, hook & state dùng camelCase

1.  **TUÂN THỦ THIẾT KẾ CHI TIẾT:** Mọi gợi ý về code (UI, logic, API) phải tuân thủ nghiêm ngặt các tài liệu thiết kế chi tiết đã được cung cấp (ví dụ: mockups Figma, spec API, diagrams kiến trúc). Nếu không có thông tin, hãy ưu tiên các giải pháp đơn giản, dễ mở rộng, chỉ tập trung vào việc giải quyết yêu cầu hiện tại (YAGNI).
2.  **Nguyên tắc SOLID:**
    - **S (Single Responsibility):** Mỗi component, hàm, hoặc class chỉ nên có một trách nhiệm duy nhất.
    - **O (Open/Closed):** Code phải dễ dàng mở rộng (thêm tính năng mới) nhưng hạn chế sửa đổi (thay đổi code hiện có).
    - **L (Liskov Substitution):** Các class con phải có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.
    - **I (Interface Segregation):** Tạo các interface nhỏ, chuyên biệt thay vì một interface lớn và chung chung.
    - **D (Dependency Inversion):** Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào một abstraction (ví dụ: interface hoặc type).
    - **KISS (Keep It Simple, Stupid):** Ưu tiên các giải pháp đơn giản, dễ hiểu. Tránh sự phức tạp không cần thiết (over-engineering). Nếu có hai giải pháp, hãy chọn giải pháp đơn giản hơn.
    - **YAGNI (You Ain't Gonna Need It):** Không triển khai các tính năng hoặc sự trừu tượng hóa (abstraction) mà hiện tại chưa cần đến. Chỉ viết code giải quyết các yêu cầu hiện tại.

### 2.2. Kiến trúc Phân lớp (Layered Architecture)

Dự án áp dụng kiến trúc phân lớp để tách biệt các mối quan tâm (separation of concerns):

- **Presentation Layer (Tầng trình diễn - Next.js Components):** Chịu trách nhiệm về UI/UX. Tầng này nên "mỏng" và chỉ chứa logic hiển thị. Nó gọi đến Application Layer để thực thi các hành động.
- **Application Layer (Tầng ứng dụng - API Routes, Service Classes):** Điều phối các trường hợp sử dụng (use cases) của ứng dụng. Tầng này không chứa logic nghiệp vụ cốt lõi mà chỉ điều phối luồng dữ liệu, gọi các services từ Domain Layer và xử lý giao dịch.
- **Domain Layer (Tầng nghiệp vụ - `src/domain/`):** Là trái tim của ứng dụng. Chứa tất cả logic nghiệp vụ, các thực thể (entities), và quy tắc. Tầng này hoàn toàn độc lập với framework (Next.js) và cơ sở dữ liệu. Nó không biết gì về HTTP hay UI.
- **Infrastructure Layer (Tầng hạ tầng - `src/lib/`, `src/services/`):** Chứa các triển khai cụ thể cho các hoạt động bên ngoài như: truy vấn cơ sở dữ liệu (Prisma Client), gọi API bên thứ ba (Axios/Fetch), gửi email, ghi log. Tầng này triển khai các interfaces được định nghĩa ở Domain hoặc Application Layer.

**Yêu cầu cho Copilot:** Khi tạo code, hãy xác định rõ nó thuộc về tầng nào và đảm bảo sự phụ thuộc chỉ đi theo một chiều: `Presentation -> Application -> Domain <- Infrastructure`.

3.  **Nguyên tắc DRY (Don't Repeat Yourself):**
    - Tránh lặp lại code. Thay vào đó, hãy tạo các hàm, component hoặc tiện ích có thể tái sử dụng.
    - Tái sử dụng các `type` và `interface` trong TypeScript để đảm bảo tính nhất quán.

## 3. Quy trình Phát triển và Git

- **Mô hình nhánh (Branching Model):** Sử dụng **GitFlow**.
  - `main`: Nhánh chính, chứa code production đã được kiểm thử. Chỉ merge từ `release/*` hoặc `hotfix/*`.
  - `develop`: Nhánh tích hợp chính cho các tính năng. Đây là nguồn cho các nhánh `release`.
  - `feature/<ticket-id>-<short-description>`: Nhánh để phát triển tính năng mới. Luôn được tạo từ `develop`.
  - `release/<version>`: Nhánh chuẩn bị cho việc phát hành phiên bản mới.
  - `hotfix/<ticket-id>-<description>`: Nhánh sửa lỗi khẩn cấp trên production. Tạo từ `main`.
- **Quy ước Commit Message:** Bắt buộc tuân theo **Conventional Commits**. Điều này rất quan trọng để tự động tạo changelog và quản lý phiên bản.
  - Ví dụ: `feat(booking): add flight reservation feature`, `fix(auth): resolve token expiration issue`, `docs(api): update user endpoints documentation`.
- **Pull Requests (PRs):**
  - PR phải có mô tả rõ ràng: mục đích, các thay đổi chính, và cách kiểm thử.
  - PR phải liên kết đến ticket/issue tương ứng.
  - PR phải được ít nhất một người khác review và tất cả các pipeline CI/CD (lint, test, build) phải vượt qua mới được merge.

---
### HƯỚNG DẪN CHI TIẾT CÔNG NGHỆ
Để có file hướng dẫn chi tiết cho dự án, hãy tham khảo các file sau:
Frontend Hướng dẫn cho nextjs typescript D:\Workspace\NextJs\GoTravel\docs\.github\copilot\nextjs_typescript.md
