"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, Save, X, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";

// Zod Schema validation
const addUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "Họ và tên không được để trống")
      .min(2, "Họ và tên phải có ít nhất 2 ký tự")
      .max(255, "Họ và tên không được vượt quá 255 ký tự"),

    email: z
      .string()
      .min(1, "Email không được để trống")
      .email("Email không hợp lệ")
      .max(255, "Email không được vượt quá 255 ký tự"),

    role: z.enum(["admin", "seo"], {
      required_error: "Vui lòng chọn vai trò",
    }),

    status: z.enum(["active", "inactive"]).default("active"),

    password: z
      .string()
      .min(1, "Mật khẩu không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(255, "Mật khẩu không được vượt quá 255 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
      .regex(/\d/, "Mật khẩu phải có ít nhất 1 số")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),

    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type AddUserFormData = z.infer<typeof addUserSchema>;

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: AddUserFormData) => void;
}

export interface AddUserModalRef {
  openModal: () => void;
  closeModal: () => void;
  resetForm: () => void;
}

const AddUserModal = forwardRef<AddUserModalRef, AddUserModalProps>(
  ({ isOpen, onClose, onSave }, ref) => {
    const t = useTranslations("admin.users");

    // State cho show/hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
      reset,
      trigger,
    } = useForm<AddUserFormData>({
      resolver: zodResolver(addUserSchema),
      defaultValues: {
        name: "",
        email: "",
        role: "admin", // Fix: Provide default value instead of undefined
        status: "active",
        password: "",
        confirmPassword: "",
      },
      mode: "onChange",
    });

    // Watch role value for Select component
    const selectedRole = watch("role");
    const selectedStatus = watch("status");

    // Expose methods thông qua ref
    useImperativeHandle(ref, () => ({
      openModal: () => {
        // Fix: Add actual implementation or remove if not needed
        console.log("Opening modal");
      },
      closeModal: handleClose,
      resetForm: () => {
        reset({
          name: "",
          email: "",
          role: "admin", // Fix: Provide default value instead of undefined
          status: "active",
          password: "",
          confirmPassword: "",
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
      },
    }));

    // Xử lý submit form
    const onSubmit = async (data: AddUserFormData) => {
      setIsLoading(true);
      try {
        await onSave(data); // Fix: Add await if onSave is async
        reset({
          name: "",
          email: "",
          role: "admin", // Fix: Provide default value instead of undefined
          status: "active",
          password: "",
          confirmPassword: "",
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Xử lý đóng modal
    const handleClose = () => {
      if (!isLoading) {
        reset({
          name: "",
          email: "",
          role: "admin", // Fix: Provide default value instead of undefined
          status: "active",
          password: "",
          confirmPassword: "",
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
        onClose();
      }
    };

    // Tạo mật khẩu ngẫu nhiên
    const generateRandomPassword = async () => {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let password = "";

      // Đảm bảo có ít nhất 1 ký tự từ mỗi loại
      password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
      password += "0123456789"[Math.floor(Math.random() * 10)];
      password += "!@#$%^&*"[Math.floor(Math.random() * 8)];

      // Thêm 8 ký tự ngẫu nhiên nữa
      for (let i = 4; i < 12; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
      }

      // Trộn lại password
      password = password
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");

      // Set values theo pattern của bạn
      setValue("password", password, { shouldValidate: true });
      setValue("confirmPassword", password, { shouldValidate: true });

      // Trigger validation
      await trigger(["password", "confirmPassword"]);
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Thêm người dùng mới
            </DialogTitle>
            <DialogDescription>Tạo tài khoản mới cho người dùng trong hệ thống</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Thông báo quan trọng */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Lưu ý:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Email sẽ được sử dụng làm tên đăng nhập</li>
                    <li>• Thông tin đăng nhập sẽ được gửi qua email</li>
                    <li>• Người dùng nên đổi mật khẩu sau lần đăng nhập đầu tiên</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Thông tin cơ bản */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" placeholder="Nhập họ và tên" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Thông tin hệ thống */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin hệ thống</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Role Field */}
                <div className="space-y-2">
                  <Label htmlFor="role">
                    Vai trò <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedRole}
                    onValueChange={(
                      value: string // Fix: Add type annotation
                    ) => setValue("role", value as "admin" | "seo", { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t("admin")}</SelectItem>
                      <SelectItem value="seo">{t("seo")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                  )}
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={selectedStatus}
                    onValueChange={(
                      value: string // Fix: Add type annotation
                    ) =>
                      setValue("status", value as "active" | "inactive", { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("active")}</SelectItem>
                      <SelectItem value="inactive">{t("inactive")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin đăng nhập</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      className="pr-10"
                      {...register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      className="pr-10"
                      {...register("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Nút tạo mật khẩu ngẫu nhiên */}
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateRandomPassword}
                  className="text-sm"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Tạo mật khẩu ngẫu nhiên
                </Button>
              </div>

              {/* Yêu cầu mật khẩu */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Yêu cầu mật khẩu:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ít nhất 8 ký tự</li>
                  <li>• Ít nhất 1 chữ hoa (A-Z)</li>
                  <li>• Ít nhất 1 chữ thường (a-z)</li>
                  <li>• Ít nhất 1 số (0-9)</li>
                  <li>• Ít nhất 1 ký tự đặc biệt (!@#$%^&*)</li>
                </ul>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Đang tạo..." : "Tạo người dùng"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

AddUserModal.displayName = "AddUserModal";

export default AddUserModal;
