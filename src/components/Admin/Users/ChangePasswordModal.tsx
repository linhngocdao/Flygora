"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Key, Save, X, Eye, EyeOff, AlertTriangle } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  onSave: (newPassword: string) => void;
}

export interface ChangePasswordModalRef {
  openModal: () => void;
  closeModal: () => void;
  resetForm: () => void;
}

const ChangePasswordModal = forwardRef<ChangePasswordModalRef, ChangePasswordModalProps>(
  ({ isOpen, onClose, userId, userName, onSave }, ref) => {
    // State cho form data
    const [formData, setFormData] = useState({
      newPassword: "",
      confirmPassword: "",
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Expose methods thông qua ref
    useImperativeHandle(ref, () => ({
      openModal: () => {},
      closeModal: onClose,
      resetForm: () => {
        setFormData({
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        setShowNewPassword(false);
        setShowConfirmPassword(false);
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

    // Validate password strength
    const validatePasswordStrength = (password: string) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const errors = [];

      if (password.length < minLength) {
        errors.push(`Ít nhất ${minLength} ký tự`);
      }
      if (!hasUpperCase) {
        errors.push("Ít nhất 1 chữ hoa");
      }
      if (!hasLowerCase) {
        errors.push("Ít nhất 1 chữ thường");
      }
      if (!hasNumbers) {
        errors.push("Ít nhất 1 số");
      }
      if (!hasSpecialChar) {
        errors.push("Ít nhất 1 ký tự đặc biệt");
      }

      return errors;
    };

    // Validate form
    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.newPassword) {
        newErrors.newPassword = "Mật khẩu mới không được để trống";
      } else {
        const passwordErrors = validatePasswordStrength(formData.newPassword);
        if (passwordErrors.length > 0) {
          newErrors.newPassword = `Mật khẩu phải có: ${passwordErrors.join(", ")}`;
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
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

        onSave(formData.newPassword);

        // Reset form after successful save
        setFormData({
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Lỗi khi đổi mật khẩu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Xử lý đóng modal
    const handleClose = () => {
      if (!isLoading) {
        setFormData({
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        onClose();
      }
    };

    // Tạo mật khẩu ngẫu nhiên
    const generateRandomPassword = () => {
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

      setFormData({
        newPassword: password,
        confirmPassword: password,
      });
      setErrors({});
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Đặt lại mật khẩu
            </DialogTitle>
            <DialogDescription>
              Đặt lại mật khẩu cho người dùng <strong>{userName}</strong> (ID: #{userId})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Cảnh báo bảo mật */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">Lưu ý bảo mật:</p>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Mật khẩu mới sẽ được gửi qua email đã đăng ký</li>
                    <li>• Người dùng sẽ bị đăng xuất khỏi tất cả thiết bị</li>
                    <li>• Khuyến khích người dùng đổi lại mật khẩu sau lần đăng nhập đầu tiên</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form đổi mật khẩu */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">
                  Mật khẩu mới <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    className={errors.newPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
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
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
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
                  <Key className="h-4 w-4 mr-2" />
                  Tạo mật khẩu ngẫu nhiên
                </Button>
              </div>
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
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

ChangePasswordModal.displayName = "ChangePasswordModal";

export default ChangePasswordModal;
