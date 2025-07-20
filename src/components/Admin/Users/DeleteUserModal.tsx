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
import { Trash2, AlertTriangle, X } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  totalBookings?: number;
  totalRevenue?: number;
}

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  onConfirm: () => void;
}

export interface DeleteUserModalRef {
  openModal: () => void;
  closeModal: () => void;
  resetForm: () => void;
}

const DeleteUserModal = forwardRef<DeleteUserModalRef, DeleteUserModalProps>(
  ({ isOpen, onClose, user, onConfirm }, ref) => {
    const [confirmText, setConfirmText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    // Text cần nhập để xác nhận xóa
    const confirmationText = `DELETE ${user.name}`;

    // Expose methods thông qua ref
    useImperativeHandle(ref, () => ({
      openModal: () => {},
      closeModal: onClose,
      resetForm: () => {
        setConfirmText("");
        setShowWarning(false);
      },
    }));

    // Kiểm tra user có dữ liệu quan trọng không
    const hasImportantData = () => {
      return (
        (user.totalBookings && user.totalBookings > 0) ||
        (user.totalRevenue && user.totalRevenue > 0) ||
        user.role === "admin"
      );
    };

    // Xử lý xác nhận xóa
    const handleConfirm = async () => {
      if (confirmText !== confirmationText) {
        setShowWarning(true);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        onConfirm();

        // Reset form after successful delete
        setConfirmText("");
        setShowWarning(false);
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Xử lý đóng modal
    const handleClose = () => {
      if (!isLoading) {
        setConfirmText("");
        setShowWarning(false);
        onClose();
      }
    };

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Xóa người dùng
            </DialogTitle>
            <DialogDescription>
              Hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ trước khi thực hiện.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Cảnh báo nghiêm trọng */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-800 mb-2">
                    Cảnh báo: Xóa người dùng vĩnh viễn
                  </p>
                  <p className="text-red-700 mb-3">
                    Bạn đang cố gắng xóa người dùng <strong>{user.name}</strong> (ID: #{user.id})
                  </p>
                  <ul className="text-red-700 space-y-1">
                    <li>• Tất cả dữ liệu của người dùng sẽ bị xóa vĩnh viễn</li>
                    <li>• Lịch sử booking và giao dịch sẽ bị mất</li>
                    <li>• Không thể khôi phục sau khi xóa</li>
                    {user.role === "admin" && (
                      <li>
                        • <strong>Đây là tài khoản ADMIN - Hãy thật cẩn thận!</strong>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Thông tin user sẽ bị xóa */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Thông tin sẽ bị xóa:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vai trò:</span>
                  <span className="font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="font-medium">{user.status}</span>
                </div>
                {user.totalBookings && user.totalBookings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số booking:</span>
                    <span className="font-medium text-orange-600">{user.totalBookings}</span>
                  </div>
                )}
                {user.totalRevenue && user.totalRevenue > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng doanh thu:</span>
                    <span className="font-medium text-orange-600">
                      {formatCurrency(user.totalRevenue)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thông báo đặc biệt nếu có dữ liệu quan trọng */}
            {hasImportantData() && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-800 mb-1">
                      Người dùng có dữ liệu quan trọng!
                    </p>
                    <p className="text-orange-700">
                      Khuyến nghị: Hãy cân nhắc vô hiệu hóa thay vì xóa để bảo toàn dữ liệu lịch sử.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form xác nhận */}
            <div className="space-y-3">
              <Label htmlFor="confirmText" className="text-sm font-medium">
                Để xác nhận xóa, vui lòng nhập chính xác:
                <code className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-xs ml-1">
                  {confirmationText}
                </code>
              </Label>
              <Input
                id="confirmText"
                value={confirmText}
                onChange={(e) => {
                  setConfirmText(e.target.value);
                  setShowWarning(false);
                }}
                placeholder={`Nhập: ${confirmationText}`}
                className={showWarning ? "border-red-500" : ""}
              />
              {showWarning && (
                <p className="text-sm text-red-500">
                  Vui lòng nhập chính xác: &quot;{confirmationText}&quot;
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isLoading || confirmText !== confirmationText}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isLoading ? "Đang xóa..." : "Xóa vĩnh viễn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

DeleteUserModal.displayName = "DeleteUserModal";

export default DeleteUserModal;
