"use client";

import AddUserModal from "@/components/Admin/Users/AddUserModal";
import ChangePasswordModal from "@/components/Admin/Users/ChangePasswordModal";
import DeleteUserModal from "@/components/Admin/Users/DeleteUserModal";
import EditUserModal from "@/components/Admin/Users/EditUserModal";
import { MultipleImageUpload } from "@/components/ui/MultipleImageUpload";
import { SingleImageUpload } from "@/components/ui/SingleImageUpload";
import TableFlygora from "@/components/ui/TableFlygora"; // Import TableFlygora component
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addUserApi,
  changePasswordUserApi,
  changeStatusUser,
  deleteUser,
  editUserApi,
  getAllUser,
} from "@/config/user/user.api";
import { useDebounce } from "@/hooks/useDebounce";
import { GetAllUserResponse } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
  const { data, isLoading } = useQuery<any>({
    queryKey: ["users", filters],
    queryFn: () => getAllUser(filters as any),
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
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
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

  // Mutation to add new user
  const { mutate: addUser } = useMutation({
    mutationFn: async (newUserData: any) => {
      const { name, email, password, role } = newUserData;
      return await addUserApi(name, email, password, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Đã thêm user mới thành công!");
      setIsAddModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // Mutation to edit user
  const { mutate: editUser } = useMutation({
    mutationFn: async (updatedUserData: any) => {
      const { id, name, email, role, status } = updatedUserData;
      return await editUserApi(id, name, email, role, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Cập nhật người dùng thành công!");
      setIsEditModalOpen(false);
      setSelectedUser(null);
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
    addUser(newUserData);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (user: GetAllUserResponse) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEditUser = (updatedUser: any) => {
    editUser(updatedUser);
    setIsEditModalOpen(false);
    setSelectedUser(null);
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

  // Define table columns
  const columns = [
    {
      key: "name",
      title: t("name"),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (value: string, _record: GetAllUserResponse) => (
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {value.charAt(0).toUpperCase()}
            </div>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {debouncedSearch ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: value.replace(
                      new RegExp(`(${debouncedSearch})`, "gi"),
                      "<mark>$1</mark>"
                    ),
                  }}
                />
              ) : (
                value
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      title: t("email"),
      render: (value: string) => (
        <span className="text-sm text-gray-900 dark:text-white">
          {debouncedSearch ? (
            <span
              dangerouslySetInnerHTML={{
                __html: value.replace(new RegExp(`(${debouncedSearch})`, "gi"), "<mark>$1</mark>"),
              }}
            />
          ) : (
            value
          )}
        </span>
      ),
    },
    {
      key: "role",
      title: t("role"),
      render: (value: string) => (
        <Badge variant="secondary" className={getRoleBadge(value).color}>
          {getRoleBadge(value).text}
        </Badge>
      ),
    },
    {
      key: "status",
      title: t("status"),
      render: (value: string) => (
        <Badge variant="secondary" className={getStatusBadge(value).color}>
          {getStatusBadge(value).text}
        </Badge>
      ),
    },
    {
      key: "created_at",
      title: t("joinedDate"),
      render: (value: string) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(value || "")}</span>
      ),
    },
    {
      key: "actions",
      title: t("actions"),
      align: "right" as const,
      render: (_: any, record: GetAllUserResponse) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => viewUserDetail(record.id)}>
              <Eye className="mr-2 h-4 w-4" />
              {t("viewDetails")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditUser(record)}>
              <Edit className="mr-2 h-4 w-4" />
              {t("edit")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangePassword(record)}>
              <Key className="mr-2 h-4 w-4" />
              {t("resetPassword")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleUserStatus(record)}
              disabled={isTogglingStatus}
            >
              {record.status === "active" ? (
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
            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(record)}>
              <Trash2 className="mr-2 h-4 w-4" />
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Pagination data
  const pagination = {
    current: filters.page,
    pageSize: filters.limit,
    total: totalUsers,
    totalPages: totalPages,
  };

  const FormSchema = z.object({
    imageUrl: z.string().min(2, {
      message: "Image URL must be at least 2 characters.",
    }),
    name: z.string().min(2, {
      message: "Image URL must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: searchHighlightStyle }} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <MultipleImageUpload {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <MultipleImageUpload {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <SingleImageUpload
        label="Ảnh đại diện"
        value=""
        onChange={() => {
          console.log("Image changed");
        }}
      />

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

      {/* Table with TableFlygora component */}
      <TableFlygora
        columns={columns}
        data={users}
        loading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyText="Không tìm thấy người dùng"
        emptyIcon={<Users className="h-12 w-12 text-gray-400" />}
        rowKey="id"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onRow={(record, _) => ({
          onClick: () => {
            router.push(`/admin/users/${record.id}`);
          },
          className: "cursor-pointer ",
        })}
      />

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
