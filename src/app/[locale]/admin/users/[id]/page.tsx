"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Edit,
  Key,
  UserCheck,
  UserX,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
} from "lucide-react";
import EditUserModal from "@/components/Admin/Users/EditUserModal";
import ChangePasswordModal from "@/components/Admin/Users/ChangePasswordModal";
import DeleteUserModal from "@/components/Admin/Users/DeleteUserModal";

const getUserDetails = (id: string) => {
  const mockUsers = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "nguyenvanan@example.com",
      phone: "0901234567",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2023-05-10T08:00:00Z",
      avatar: "/images/avatar/user1.jpg",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      birthday: "1990-05-15",
      totalBookings: 25,
      totalRevenue: 125000000,
      loginHistory: [
        { date: "2024-01-15T10:30:00Z", ip: "192.168.1.1", device: "Chrome/Windows" },
        { date: "2024-01-14T16:45:00Z", ip: "192.168.1.1", device: "Chrome/Windows" },
        { date: "2024-01-13T09:20:00Z", ip: "192.168.1.2", device: "Safari/MacOS" },
      ],
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      email: "tranthibibh@example.com",
      phone: "0912345678",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-14T16:45:00Z",
      createdAt: "2023-07-22T14:30:00Z",
      avatar: "/images/avatar/user2.jpg",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      birthday: "1995-08-20",
      totalBookings: 15,
      totalRevenue: 75000000,
      loginHistory: [
        { date: "2024-01-14T16:45:00Z", ip: "192.168.1.3", device: "Chrome/Windows" },
        { date: "2024-01-13T14:20:00Z", ip: "192.168.1.3", device: "Chrome/Windows" },
      ],
    },
  ];

  return mockUsers.find((user) => user.id === parseInt(id));
};

const UserDetailPage = () => {
  const t = useTranslations("admin.users");
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Lấy thông tin user theo ID
  const user = getUserDetails(userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Không tìm thấy người dùng
        </h2>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: "bg-green-100 text-green-800", text: t("active") },
      inactive: { color: "bg-yellow-100 text-yellow-800", text: t("inactive") },
      blocked: { color: "bg-red-100 text-red-800", text: t("blocked") },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.inactive;
  };

  const getRoleBadge = (role: string) => {
    const roleMap = {
      admin: { color: "bg-purple-100 text-purple-800", text: t("admin") },
      staff: { color: "bg-blue-100 text-blue-800", text: t("staff") },
      user: { color: "bg-gray-100 text-gray-800", text: t("user") },
    };
    return roleMap[role as keyof typeof roleMap] || roleMap.user;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header với nút quay lại */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Chi tiết người dùng
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thông tin chi tiết và hoạt động của người dùng
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {t("edit")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            {t("resetPassword")}
          </Button>
          {user.status === "active" ? (
            <Button variant="outline" className="flex items-center gap-2">
              <UserX className="h-4 w-4" />
              {t("deactivate")}
            </Button>
          ) : (
            <Button variant="outline" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              {t("activate")}
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {t("delete")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin cơ bản */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Thông tin cơ bản
            </h2>

            <div className="flex items-start gap-6 mb-6">
              <Avatar className="h-20 w-20">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="secondary" className={getRoleBadge(user.role).color}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getRoleBadge(user.role).text}
                  </Badge>
                  <Badge variant="secondary" className={getStatusBadge(user.status).color}>
                    {getStatusBadge(user.status).text}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Sinh ngày: {new Date(user.birthday).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{user.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Thông tin hệ thống
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">ID:</span>
                  <span className="ml-2 font-mono">#{user.id}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Ngày tham gia:</span>
                  <span className="ml-2">{formatDate(user.createdAt)}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Đăng nhập lần cuối:</span>
                  <span className="ml-2">{formatDate(user.lastLogin)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Lịch sử đăng nhập */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Lịch sử đăng nhập gần đây
            </h2>
            <div className="space-y-4">
              {user.loginHistory.map((login, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(login.date)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{login.device}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">IP: {login.ip}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar thống kê */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Thống kê hoạt động
            </h2>

            <div className="space-y-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">{user.totalBookings}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số booking</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {formatCurrency(user.totalRevenue)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng doanh thu</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-1">
                  {Math.floor(
                    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
                  )}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ngày hoạt động</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Thao tác nhanh
            </h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa thông tin
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                <Key className="h-4 w-4 mr-2" />
                Đặt lại mật khẩu
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Gửi email
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={(updatedUser) => {
          console.log("Cập nhật user:", updatedUser);
          setIsEditModalOpen(false);
        }}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userId={user.id}
        userName={user.name}
        onSave={(newPassword) => {
          console.log("Đổi mật khẩu cho user:", user.id, newPassword);
          setIsPasswordModalOpen(false);
        }}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={user}
        onConfirm={() => {
          console.log("Xóa user:", user.id);
          setIsDeleteModalOpen(false);
          router.back();
        }}
      />
    </div>
  );
};

export default UserDetailPage;
