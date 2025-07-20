"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Key,
  Eye,
  Download,
} from "lucide-react";
import EditUserModal from "@/components/Admin/Users/EditUserModal";
import ChangePasswordModal from "@/components/Admin/Users/ChangePasswordModal";
import DeleteUserModal from "@/components/Admin/Users/DeleteUserModal";
import AddUserModal from "@/components/Admin/Users/AddUserModal";

// Mock data cho demo - trong thực tế sẽ fetch từ API
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
    permissions: ["users.read", "users.write", "tours.read", "tours.write", "bookings.read"],
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
    permissions: ["tours.read", "bookings.read", "bookings.write"],
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "levancuong@example.com",
    phone: "0923456789",
    role: "user",
    status: "inactive",
    lastLogin: "2024-01-10T09:15:00Z",
    createdAt: "2023-09-15T11:20:00Z",
    avatar: "/images/avatar/user3.jpg",
    address: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
    birthday: "1988-12-10",
    permissions: ["tours.read"],
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "phamthidung@example.com",
    phone: "0934567890",
    role: "staff",
    status: "blocked",
    lastLogin: "2024-01-05T14:20:00Z",
    createdAt: "2023-11-30T16:45:00Z",
    avatar: "/images/avatar/user4.jpg",
    address: "321 Hai Bà Trưng, Quận 1, TP.HCM",
    birthday: "1992-03-25",
    permissions: ["tours.read", "bookings.read"],
  },
];

const UserManager = () => {
  const t = useTranslations("admin.users");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null);

  // Users data state (để có thể cập nhật real-time)
  const [users, setUsers] = useState(mockUsers);

  // Tính toán thống kê từ users state
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const adminUsers = users.filter((user) => user.role === "admin").length;
  const staffUsers = users.filter((user) => user.role === "staff").length;

  // Lọc dữ liệu từ users state
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

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
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Hàm điều hướng đến trang chi tiết user
  const viewUserDetail = (userId: number) => {
    router.push(`/admin/users/${userId}`);
  };

  // Các function xử lý modal
  const handleAddUser = (newUserData: any) => {
    const newUser = {
      id: users.length + 1,
      ...newUserData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar: "/images/avatar/default.jpg",
      permissions:
        newUserData.role === "admin"
          ? ["users.read", "users.write", "tours.read", "tours.write", "bookings.read"]
          : newUserData.role === "staff"
            ? ["tours.read", "bookings.read", "bookings.write"]
            : ["tours.read"],
    };

    setUsers((prev) => [...prev, newUser]);
    setIsAddModalOpen(false);
    console.log("Đã thêm user mới:", newUser);
  };

  const handleEditUser = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEditUser = (updatedUser: any) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
    );
    setIsEditModalOpen(false);
    setSelectedUser(null);
    console.log("Đã cập nhật user:", updatedUser);
  };

  const handleChangePassword = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    setIsPasswordModalOpen(true);
  };

  const handleSavePassword = (newPassword: string) => {
    console.log(newPassword);
    setIsPasswordModalOpen(false);
    setSelectedUser(null);
    console.log("Đã đổi mật khẩu cho user:", selectedUser?.id);
  };

  const handleDeleteUser = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      console.log("Đã xóa user:", selectedUser.id);
    }
  };

  const handleToggleUserStatus = (user: (typeof mockUsers)[0]) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
    console.log(`Đã ${newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"} user:`, user.id);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t("subtitle")}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất Excel
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="h-4 w-4" />
            {t("addNew")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("totalUsers")}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("activeUsers")}
              </p>
              <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("adminUsers")}
              </p>
              <p className="text-3xl font-bold text-purple-600">{adminUsers}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("staffUsers")}
              </p>
              <p className="text-3xl font-bold text-blue-600">{staffUsers}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={t("filterRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">{t("admin")}</SelectItem>
                <SelectItem value="staff">{t("staff")}</SelectItem>
                <SelectItem value="user">{t("user")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={t("filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">{t("active")}</SelectItem>
                <SelectItem value="inactive">{t("inactive")}</SelectItem>
                <SelectItem value="blocked">{t("blocked")}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("name")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("email")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("role")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("lastLogin")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("joinedDate")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary" className={getRoleBadge(user.role).color}>
                      {getRoleBadge(user.role).text}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary" className={getStatusBadge(user.status).color}>
                      {getStatusBadge(user.status).text}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewUserDetail(user.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t("edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangePassword(user)}>
                          <Key className="mr-2 h-4 w-4" />
                          {t("resetPassword")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                          {user.status === "active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              {t("deactivate")}
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              {t("activate")}
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t("delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Không tìm thấy người dùng
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </Card>

      {/* Pagination - Mock UI */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Hiển thị <span className="font-medium">1</span> đến{" "}
            <span className="font-medium">{filteredUsers.length}</span> trong tổng số{" "}
            <span className="font-medium">{filteredUsers.length}</span> kết quả
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Sau
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
      />

      {selectedUser && (
        <>
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onSave={handleSaveEditUser}
          />

          <ChangePasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => {
              setIsPasswordModalOpen(false);
              setSelectedUser(null);
            }}
            userId={selectedUser.id}
            userName={selectedUser.name}
            onSave={handleSavePassword}
          />

          <DeleteUserModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
};

export default UserManager;
