"use client";

import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  address: string;
  birthday: string;
  permissions: string[];
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  onSave: (updatedUser: UserData) => void;
}

export interface EditUserModalRef {
  openModal: () => void;
  closeModal: () => void;
  resetForm: () => void;
}

const EditUserModal = forwardRef<EditUserModalRef, EditUserModalProps>(
  ({ isOpen, onClose, user, onSave }, ref) => {
    const t = useTranslations("admin.users");

    // State cho form data
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      address: "",
      birthday: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Khởi tạo form data khi user thay đổi
    useEffect(() => {
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          address: user.address,
          birthday: user.birthday,
        });
        setErrors({});
      }
    }, [user]);

    // Expose methods thông qua ref
    useImperativeHandle(ref, () => ({
      openModal: () => {},
      closeModal: onClose,
      resetForm: () => {
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          role: user?.role || "",
          status: user?.status || "",
          address: user?.address || "",
          birthday: user?.birthday || "",
        });
        setErrors({});
      },
    }));

    // Xử lý thay đổi input
    const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Xóa error khi user bắt đầu nhập
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

    // Validate form
    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) {
        newErrors.name = "Tên không được để trống";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email không được để trống";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email không hợp lệ";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Số điện thoại không được để trống";
      } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ";
      }

      if (!formData.role) {
        newErrors.role = "Vui lòng chọn vai trò";
      }

      if (!formData.status) {
        newErrors.status = "Vui lòng chọn trạng thái";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Xử lý submit form
    const handleSubmit = async () => {
      if (!validateForm()) return;

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const updatedUser: UserData = {
          ...user,
          ...formData,
        };

        onSave(updatedUser);
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

          <div className="space-y-6 py-4">
            {/* Thông tin cơ bản */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {t("name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Nhập họ và tên"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Nhập địa chỉ email"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t("phone")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday">Ngày sinh</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => handleInputChange("birthday", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Nhập địa chỉ"
                  rows={3}
                />
              </div>
            </div>

            {/* Thông tin hệ thống */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin hệ thống</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">
                    {t("role")} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t("admin")}</SelectItem>
                      <SelectItem value="staff">{t("staff")}</SelectItem>
                      <SelectItem value="user">{t("user")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">
                    {t("status")} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("active")}</SelectItem>
                      <SelectItem value="inactive">{t("inactive")}</SelectItem>
                      <SelectItem value="blocked">{t("blocked")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

EditUserModal.displayName = "EditUserModal";

export default EditUserModal;
