"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
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
import { UserPlus, Save, X, Eye, EyeOff, AlertCircle } from "lucide-react";

interface NewUserData {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  address: string;
  birthday: string;
  password: string;
  confirmPassword: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: NewUserData) => void;
}

export interface AddUserModalRef {
  openModal: () => void;
  closeModal: () => void;
  resetForm: () => void;
}

const AddUserModal = forwardRef<AddUserModalRef, AddUserModalProps>(
  ({ isOpen, onClose, onSave }, ref) => {
    const t = useTranslations("admin.users");

    // State cho form data
    const [formData, setFormData] = useState<NewUserData>({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "active",
      address: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Expose methods thông qua ref
    useImperativeHandle(ref, () => ({
      openModal: () => {},
      closeModal: onClose,
      resetForm: () => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "",
          status: "active",
          address: "",
          birthday: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
      },
    }));

    // Xử lý thay đổi input
    const handleInputChange = (field: keyof NewUserData, value: string) => {
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

    // Validate email format
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
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

      // Validate required fields
      if (!formData.name.trim()) {
        newErrors.name = "Họ và tên không được để trống";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email không được để trống";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Email không hợp lệ";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Số điện thoại không được để trống";
      } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
      }

      if (!formData.role) {
        newErrors.role = "Vui lòng chọn vai trò";
      }

      if (!formData.password) {
        newErrors.password = "Mật khẩu không được để trống";
      } else {
        const passwordErrors = validatePasswordStrength(formData.password);
        if (passwordErrors.length > 0) {
          newErrors.password = `Mật khẩu phải có: ${passwordErrors.join(", ")}`;
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (formData.password !== formData.confirmPassword) {
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
        await new Promise((resolve) => setTimeout(resolve, 1500));

        onSave(formData);

        // Reset form after successful save
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "",
          status: "active",
          address: "",
          birthday: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
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
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "",
          status: "active",
          address: "",
          birthday: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setShowPassword(false);
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

      setFormData((prev) => ({
        ...prev,
        password: password,
        confirmPassword: password,
      }));
      setErrors((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
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

          <div className="space-y-6 py-4">
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
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Họ và tên <span className="text-red-500">*</span>
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
                    Email <span className="text-red-500">*</span>
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
                    Số điện thoại <span className="text-red-500">*</span>
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
                    Vai trò <span className="text-red-500">*</span>
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
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("active")}</SelectItem>
                      <SelectItem value="inactive">{t("inactive")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Thông tin đăng nhập</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mật khẩu <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className={errors.password ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
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
                      placeholder="Nhập lại mật khẩu"
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Đang tạo..." : "Tạo người dùng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

AddUserModal.displayName = "AddUserModal";

export default AddUserModal;
