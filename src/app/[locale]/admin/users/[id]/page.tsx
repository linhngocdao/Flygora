"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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
import { toast } from "sonner";
import {
  changeStatusUser,
  getDetailUserApi,
  editUserApi,
  changePasswordUserApi,
  deleteUser,
} from "@/config/user/user.api";

const UserDetailPage = () => {
  const t = useTranslations("admin.users");
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = params.id as string;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch user details with React Query
  const {
    data: userResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ["user-detail", userId],
    queryFn: () => getDetailUserApi(userId),
    enabled: !!userId,
    retry: 1,
  });

  // Mutation for changing user status
  const { mutate: toggleUserStatus, isPending: isTogglingStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "inactive" }) =>
      changeStatusUser(id, status),
    onSuccess: (data, variables) => {
      // Update local cache
      queryClient.setQueryData(["user-detail", userId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            status: variables.status,
            updated_at: new Date().toISOString(),
          },
        };
      });

      // Invalidate users list if exists
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("Trạng thái người dùng đã được cập nhật thành công!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Đã xảy ra lỗi khi thay đổi trạng thái người dùng."
      );
    },
  });

  // Mutation to edit user
  const { mutate: editUser, isPending: isEditingUser } = useMutation({
    mutationFn: async (updatedUserData: any) => {
      const { id, name, email, role, status } = updatedUserData;
      return await editUserApi(id, name, email, role, status);
    },
    onSuccess: (data, variables) => {
      // Update local cache
      queryClient.setQueryData(["user-detail", userId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            name: variables.name,
            role: variables.role,
            status: variables.status,
            updated_at: new Date().toISOString(),
          },
        };
      });

      // Invalidate users list if exists
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("Cập nhật người dùng thành công!");
      setIsEditModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Đã xảy ra lỗi khi cập nhật người dùng.");
    },
  });

  // Mutation to change user password
  const { mutate: changeUserPassword, isPending: isChangingPassword } = useMutation({
    mutationFn: async ({ id, new_password }: { id: string; new_password: string }) =>
      await changePasswordUserApi(id, new_password),
    onSuccess: () => {
      // Update cache để trigger re-render
      queryClient.setQueryData(["user-detail", userId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            updated_at: new Date().toISOString(),
          },
        };
      });

      // Invalidate users list if exists
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("Đổi mật khẩu thành công!");
      setIsPasswordModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Đã xảy ra lỗi khi đổi mật khẩu.");
    },
  });

  // Mutation to delete user
  const { mutate: deleteUsers, isPending: isDeletingUser } = useMutation({
    mutationFn: async (id: string) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      // Invalidate all user queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["user-detail", userId] });

      toast.success("Xóa người dùng thành công!");
      setIsDeleteModalOpen(false);
      router.back();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Đã xảy ra lỗi khi xóa người dùng.");
    },
  });

  const user = userResponse?.data;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-6" />
              <div className="flex items-start gap-6 mb-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-48" />
                  <div className="flex gap-3">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-6" />
              <div className="space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Không tìm thấy người dùng
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error?.message || "Người dùng này không tồn tại hoặc đã bị xóa."}
        </p>
        <div className="flex gap-3">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <Button onClick={() => refetch()} variant="outline">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: "bg-green-100 text-green-800", text: t("active") },
      inactive: { color: "bg-yellow-100 text-yellow-800", text: t("inactive") },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.inactive;
  };

  const getRoleBadge = (role: string) => {
    const roleMap = {
      admin: { color: "bg-purple-100 text-purple-800", text: t("admin") },
      seo: { color: "bg-blue-100 text-blue-800", text: t("seo") },
      staff: { color: "bg-blue-100 text-blue-800", text: t("seo") },
    };
    return roleMap[role as keyof typeof roleMap] || roleMap.seo;
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

  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //   }).format(amount);
  // };

  const handleToggleStatus = () => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    toggleUserStatus({ id: user.id, status: newStatus });
  };

  const handleSaveEditUser = (updatedUser: any) => {
    editUser(updatedUser);
  };

  const handleSavePassword = (newPassword: string) => {
    changeUserPassword({ id: user.id, new_password: newPassword });
  };

  const handleConfirmDelete = () => {
    deleteUsers(user.id);
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
            disabled={isEditingUser}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditingUser ? "Đang sửa..." : t("edit")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsPasswordModalOpen(true)}
            disabled={isChangingPassword}
            className="flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            {isChangingPassword ? "Đang đổi..." : t("resetPassword")}
          </Button>
          <Button
            variant="outline"
            onClick={handleToggleStatus}
            disabled={isTogglingStatus}
            className="flex items-center gap-2"
          >
            {user.status === "active" ? (
              <>
                <UserX className="h-4 w-4" />
                {isTogglingStatus ? "Đang vô hiệu hóa..." : t("deactivate")}
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4" />
                {isTogglingStatus ? "Đang kích hoạt..." : t("activate")}
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeletingUser}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeletingUser ? "Đang xóa..." : t("delete")}
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
                    <span>đang cập nhật</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    {/* {new Date(user.birthday).toLocaleDateString("vi-VN")} */}
                    <span>Sinh ngày: đang cập nhật</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>đang cập nhật</span>
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
                  <span className="ml-2">{formatDate(user.created_at)}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Cập nhật lần cuối:</span>
                  <span className="ml-2">{formatDate(user.updated_at)}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Đăng nhập lần cuối:</span>
                  <span className="ml-2">đang cập nhật</span>
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
              {/* {user.loginHistory.map((login, index) => ( */}
              <div
                // key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    lúc 23:45 14 tháng 1, 2024
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Chrome/Windows</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">IP: 192.168.1.3</div>
              </div>
              {/* ))} */}
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">đang cập nhật</p>
              </div>
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
                <p className="text-3xl font-bold text-blue-600 mb-1">Đang cập nhật</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng số booking</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {/* {formatCurrency(user.totalRevenue)} */}
                  đang cập nhật
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tổng doanh thu</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-1">
                  {Math.floor(
                    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
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
                disabled={isEditingUser}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditingUser ? "Đang sửa..." : "Chỉnh sửa thông tin"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsPasswordModalOpen(true)}
                disabled={isChangingPassword}
              >
                <Key className="h-4 w-4 mr-2" />
                {isChangingPassword ? "Đang đổi..." : "Đặt lại mật khẩu"}
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
        onSave={handleSaveEditUser}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userId={user.id}
        userName={user.name}
        onSave={handleSavePassword}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={user}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserDetailPage;
