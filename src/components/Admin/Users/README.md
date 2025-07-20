# User Management Components

Thư mục này chứa các component dành cho quản lý người dùng trong Admin Dashboard.

## Cấu trúc Components

### 1. EditUserModal

Component modal để chỉnh sửa thông tin người dùng với các tính năng:

- Form validation với React Hook Form
- Support multi-language với next-intl
- useForwardRef để expose methods từ parent component
- Responsive design với Tailwind CSS

**Props:**

- `isOpen`: boolean - Trạng thái mở/đóng modal
- `onClose`: () => void - Callback khi đóng modal
- `user`: UserData - Thông tin người dùng cần chỉnh sửa
- `onSave`: (updatedUser: UserData) => void - Callback khi lưu thành công

**Ref Methods:**

- `openModal()`: Mở modal
- `closeModal()`: Đóng modal
- `resetForm()`: Reset form về trạng thái ban đầu

### 2. ChangePasswordModal

Component modal để đặt lại mật khẩu người dùng với các tính năng:

- Validation mật khẩu mạnh (8+ ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt)
- Tạo mật khẩu ngẫu nhiên tự động
- Show/hide password với toggle
- Cảnh báo bảo mật rõ ràng

**Props:**

- `isOpen`: boolean - Trạng thái mở/đóng modal
- `onClose`: () => void - Callback khi đóng modal
- `userId`: number - ID người dùng
- `userName`: string - Tên người dùng để hiển thị
- `onSave`: (newPassword: string) => void - Callback khi đặt lại mật khẩu thành công

### 3. DeleteUserModal

Component modal để xóa người dùng với các tính năng:

- Confirmation bằng cách nhập chính xác tên user
- Cảnh báo chi tiết về dữ liệu sẽ bị mất
- Highlight đặc biệt cho admin user
- Hiển thị thống kê booking và doanh thu

**Props:**

- `isOpen`: boolean - Trạng thái mở/đóng modal
- `onClose`: () => void - Callback khi đóng modal
- `user`: UserData - Thông tin người dùng cần xóa
- `onConfirm`: () => void - Callback khi xác nhận xóa

## Pages

### 1. /admin/users - Danh sách người dùng

- Hiển thị bảng danh sách với pagination
- Filter theo role và status
- Search theo tên và email
- Stats cards hiển thị tổng quan
- Actions: View, Edit, Reset Password, Activate/Deactivate, Delete

### 2. /admin/users/[id] - Chi tiết người dùng

- Hiển thị thông tin chi tiết người dùng
- Thống kê hoạt động (booking, doanh thu)
- Lịch sử đăng nhập
- Quản lý quyền hạn
- Quick actions sidebar

## Cách sử dụng useForwardRef

```tsx
import { useRef } from "react";
import { EditUserModal, EditUserModalRef } from "@/components/Admin/Users";

const MyComponent = () => {
  const editModalRef = useRef<EditUserModalRef>(null);

  const handleOpenEditModal = () => {
    editModalRef.current?.openModal();
  };

  const handleResetForm = () => {
    editModalRef.current?.resetForm();
  };

  return (
    <EditUserModal
      ref={editModalRef}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      user={selectedUser}
      onSave={handleSaveUser}
    />
  );
};
```

## Technologies Used

- **React 19**: Functional Components với Hooks
- **TypeScript**: Strong typing cho props và state
- **Next.js 15**: App Router với dynamic routes
- **next-intl**: Internationalization
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Component library
- **Lucide Icons**: Icon set
- **React Hook Form**: Form handling và validation

## File Structure

```
src/components/Admin/Users/
├── EditUserModal.tsx       # Modal chỉnh sửa user
├── ChangePasswordModal.tsx # Modal đổi mật khẩu
├── DeleteUserModal.tsx     # Modal xóa user
├── index.ts               # Export tất cả components
└── README.md             # Documentation

src/app/[locale]/admin/users/
├── page.tsx              # Danh sách users
├── [id]/
│   └── page.tsx         # Chi tiết user động
└── loading.tsx          # Loading state (optional)
```

## Notes

- Tất cả component đều support đa ngôn ngữ (Tiếng Việt/Tiếng Anh)
- Form validation tuân thủ UX best practices
- Responsive design cho mobile và desktop
- Loading states và error handling đầy đủ
- Type safety với TypeScript strict mode
