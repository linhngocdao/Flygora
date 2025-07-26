"use client";

import AddUserModal from "@/components/Admin/Users/AddUserModal";
import ChangePasswordModal from "@/components/Admin/Users/ChangePasswordModal";
import DeleteUserModal from "@/components/Admin/Users/DeleteUserModal";
import EditUserModal from "@/components/Admin/Users/EditUserModal";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  changePasswordUserApi,
  changeStatusUser,
  deleteUser,
  getAllUser,
} from "@/config/user/user.api";
import { useDebounce } from "@/hooks/useDebounce";
import { GetAllUserResponse } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Edit,
  Eye,
  Key,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserManager = () => {
  const t = useTranslations("admin.users");
  const router = useRouter();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 7,
    search: undefined as string | undefined,
    role: undefined as string | undefined,
    status: undefined as string | undefined,
  });
  const [searchDisplay, setSearchDisplay] = useState("");
  const debouncedSearch = useDebounce(searchDisplay, 500);

  // Add CSS for highlighting search terms
  const searchHighlightStyle = `
    mark {
      background-color: #fef08a;
      color: #000;
      padding: 0 2px;
      border-radius: 2px;
    }
  `;

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<GetAllUserResponse | null>(null);

  // Update filters when debounced search changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      search: debouncedSearch || undefined,
    }));
  }, [debouncedSearch]);

  // Fetch users data
  const { data, isLoading } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getAllUser(filters),
  });

  // Calculate statistics from real data
  const totalUsers = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPages || 0;
  const users = data?.data || [];

  // Mutation to change user status
  const { mutate: toggleUserStatus, isPending: isTogglingStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "inactive" }) =>
      changeStatusUser(id, status),
    onSuccess: (data, variables) => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // You can also update the cache optimistically
      queryClient.setQueryData(["users", filters], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((user: GetAllUserResponse) =>
            user.id === variables.id ? { ...user, status: variables.status } : user
          ),
        };
      });

      toast.success("Trạng thái người dùng đã được cập nhật thành công!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Đã xảy ra lỗi khi thay đổi trạng thái người dùng."
      );
    },
  });

  // Mutation to delete user
  const { mutate: deleteUsers } = useMutation({
    mutationFn: async (id: string) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Xóa người dùng thành công!");
      setIsDeleteModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // Mutation to change user password
  const { mutate: changeUserPassword } = useMutation({
    mutationFn: async ({ id, new_password }: { id: string; new_password: string }) =>
      await changePasswordUserApi(id, new_password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Đổi mật khẩu thành công!");
      setIsPasswordModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleReset = () => {
    setSearchDisplay("");
    setFilters({
      page: 1,
      limit: 10,
      search: undefined,
      role: undefined,
      status: undefined,
    });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleRoleChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      role: value === "all" ? undefined : value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      status: value === "all" ? undefined : value,
    }));
  };

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
    };
    return roleMap[role as keyof typeof roleMap] || roleMap.seo;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const viewUserDetail = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  // Modal handlers
  const handleAddUser = (newUserData: any) => {
    // setIsAddModalOpen(false);
    // queryClient.invalidateQueries({ queryKey: ["users"] });
    // toast.success("Đã thêm user mới thành công!");
    console.log(newUserData);
  };

  const handleEditUser = (user: GetAllUserResponse) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEditUser = (updatedUser: any) => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("Đã cập nhật user thành công!");
  };

  const handleChangePassword = (user: GetAllUserResponse) => {
    setSelectedUser(user);
    setIsPasswordModalOpen(true);
  };

  const handleSavePassword = (newPassword: string) => {
    if (selectedUser) {
      changeUserPassword({ id: selectedUser.id, new_password: newPassword });
    }
  };

  const handleDeleteUser = (user: GetAllUserResponse) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      deleteUsers(selectedUser.id);
    }
  };

  const handleToggleUserStatus = (user: GetAllUserResponse) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    toggleUserStatus({
      id: user.id,
      status: newStatus,
    });
  };

  // Function để tạo array các trang cần hiển thị
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const delta = 2; // Số trang hiển thị ở mỗi bên của trang hiện tại
    const range = [];
    const rangeWithDots = [];

    // Nếu tổng số trang <= 7, hiển thị tất cả
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        rangeWithDots.push(i);
      }
      return rangeWithDots;
    }

    // Tính toán range cơ bản
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Thêm trang đầu
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    // Thêm range chính
    rangeWithDots.push(...range);

    // Thêm trang cuối
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Component Pagination mới
  const PaginationComponent = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = generatePageNumbers(filters.page, totalPages);

    return (
      <div className="flex items-center justify-between">
        {/* Thông tin hiển thị */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Hiển thị <span className="font-medium">{(filters.page - 1) * filters.limit + 1}</span> đến{" "}
          <span className="font-medium">{Math.min(filters.page * filters.limit, totalUsers)}</span>{" "}
          trong tổng số <span className="font-medium">{totalUsers}</span> kết quả
        </div>

        {/* Điều khiển phân trang */}
        <div className="flex items-center gap-1">
          {/* Nút Previous */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="flex items-center gap-1 px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            Trước
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {pageNumbers.map((pageNumber, index) => {
              if (pageNumber === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-500 dark:text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              const isCurrentPage = pageNumber === filters.page;

              return (
                <Button
                  key={pageNumber}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(Number(pageNumber))}
                  className={`
                    min-w-[30px] h-8
                    ${
                      isCurrentPage
                        ? "bg-primary text-white "
                        : "hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          {/* Nút Next */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="flex items-center gap-1 px-3"
          >
            Sau
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Loading skeleton component
  const TableSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-6 w-[80px]" />
          <Skeleton className="h-6 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: searchHighlightStyle }} />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t("subtitle")}</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          {t("addNew")}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("search")}
              value={searchDisplay}
              onChange={(e) => setSearchDisplay(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3">
            <Select value={filters.role || "all"} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={t("filterRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">{t("admin")}</SelectItem>
                <SelectItem value="seo">{t("seo")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder={t("filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">{t("active")}</SelectItem>
                <SelectItem value="inactive">{t("inactive")}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
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
                  {t("joinedDate")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6}>
                    <TableSkeleton />
                  </td>
                </tr>
              ) : (
                users.map((user) => (
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
                            {/* Add highlighting for search term if needed */}
                            {debouncedSearch ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: user.name.replace(
                                    new RegExp(`(${debouncedSearch})`, "gi"),
                                    "<mark>$1</mark>"
                                  ),
                                }}
                              />
                            ) : (
                              user.name
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {/* Add highlighting for search term if needed */}
                      {debouncedSearch ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: user.email.replace(
                              new RegExp(`(${debouncedSearch})`, "gi"),
                              "<mark>$1</mark>"
                            ),
                          }}
                        />
                      ) : (
                        user.email
                      )}
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
                      {formatDate(user.created_at || "")}
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
                          <DropdownMenuItem
                            onClick={() => handleToggleUserStatus(user)}
                            disabled={isTogglingStatus}
                          >
                            {user.status === "active" ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                {isTogglingStatus ? "Đang vô hiệu hóa..." : t("deactivate")}
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                {isTogglingStatus ? "Đang kích hoạt..." : t("activate")}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!isLoading && users.length === 0 && (
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

      {!isLoading && users.length > 0 && <PaginationComponent />}

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
