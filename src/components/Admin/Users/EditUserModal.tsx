"use client";

import React, { forwardRef, useImperativeHandle, useEffect } from "react";
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
import { User, Save, X } from "lucide-react";
import { useState } from "react";

// Zod Schema validation cho edit user
const editUserSchema = z.object({
  id: z.string().uuid("ID không hợp lệ"),
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
  status: z.enum(["active", "inactive"], {
    required_error: "Vui lòng chọn trạng thái",
  }),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  onSave: (updatedUser: EditUserFormData) => void;
}

export interface EditUserModalRef {
  openModal: () => void;
  closeModal: () => void;
  resetForm: () => void;
}

const EditUserModal = forwardRef<EditUserModalRef, EditUserModalProps>(
  ({ isOpen, onClose, user, onSave }, ref) => {
    const t = useTranslations("admin.users");
    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
      reset,
    } = useForm<EditUserFormData>({
      resolver: zodResolver(editUserSchema),
      defaultValues: {
        id: "",
        name: "",
        email: "",
        role: "seo",
        status: "active",
      },
      mode: "onChange",
    });

    // Watch values for Select components
    const selectedRole = watch("role");
    const selectedStatus = watch("status");

    // Effect để cập nhật form khi user data thay đổi
    useEffect(() => {
      if (user && isOpen) {
        reset({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as "admin" | "seo",
          status: user.status as "active" | "inactive",
        });
      }
    }, [user, isOpen, reset]);

    // Expose methods thông qua ref
    useImperativeHandle(ref, () => ({
      openModal: () => {
        console.log("Opening edit modal");
      },
      closeModal: handleClose,
      resetForm: () => {
        if (user) {
          reset({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as "admin" | "seo",
            status: user.status as "active" | "inactive",
          });
        }
      },
    }));

    // Handle form submission
    const onSubmit = async (data: EditUserFormData) => {
      setIsLoading(true);
      try {
        await onSave(data);
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Xử lý đóng modal
    const handleClose = () => {
      if (!isLoading) {
        onClose();
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Chỉnh sửa thông tin người dùng
            </DialogTitle>
            <DialogDescription>
              Cập nhật thông tin chi tiết của người dùng trong hệ thống
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Hidden ID field */}
            <input type="hidden" {...register("id")} />

            {/* Thông tin cơ bản */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="edit-name">
                    {t("name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    placeholder="Nhập họ và tên"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name?.message && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
                  )}
                </div>

                {/* Email Field - Disabled for edit */}
                <div className="space-y-2">
                  <Label htmlFor="edit-email">
                    {t("email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    disabled={true}
                    placeholder="Địa chỉ email"
                    {...register("email")}
                    className={`${errors.email ? "border-red-500" : ""} bg-gray-50`}
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
                  )}
                  <p className="text-xs text-gray-500">Email không thể thay đổi</p>
                </div>
              </div>
            </div>

            {/* Thông tin hệ thống */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin hệ thống</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Role Field */}
                <div className="space-y-2">
                  <Label htmlFor="edit-role">
                    {t("role")} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedRole}
                    onValueChange={(value: string) =>
                      setValue("role", value as "admin" | "seo", { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t("admin")}</SelectItem>
                      <SelectItem value="seo">{t("seo")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role?.message && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.role.message)}</p>
                  )}
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                  <Label htmlFor="edit-status">
                    {t("status")} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedStatus}
                    onValueChange={(value: string) =>
                      setValue("status", value as "active" | "inactive", { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("active")}</SelectItem>
                      <SelectItem value="inactive">{t("inactive")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status?.message && (
                    <p className="text-red-500 text-sm mt-1">{String(errors.status.message)}</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

EditUserModal.displayName = "EditUserModal";

export default EditUserModal;
