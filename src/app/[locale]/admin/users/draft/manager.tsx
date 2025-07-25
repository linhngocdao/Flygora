// "use client";

// import React, { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Users,
//   UserPlus,
//   Search,
//   Filter,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   UserCheck,
//   UserX,
//   Key,
//   Eye,
// } from "lucide-react";
// import EditUserModal from "@/components/Admin/Users/EditUserModal";
// import ChangePasswordModal from "@/components/Admin/Users/ChangePasswordModal";
// import DeleteUserModal from "@/components/Admin/Users/DeleteUserModal";
// import AddUserModal from "@/components/Admin/Users/AddUserModal";
// import { toast } from "sonner";
// import { useQuery } from "@tanstack/react-query";
// import { getAllUser } from "@/config/user/user.api";
// import { GetAllUserResponse } from "@/types/user.type";

// const UserManager = () => {
//   const t = useTranslations("admin.users");
//   const router = useRouter();

//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 10,
//     search: undefined as string | undefined,
//     role: undefined as string | undefined,
//     status: undefined as string | undefined,
//   });

//   // Local search states for UI
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Modal states
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<GetAllUserResponse | null>(null);

//   // Fetch users data
//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["users", filters],
//     queryFn: () => getAllUser(filters),
//   });

//   // Update filters when search/filter values change
//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       setFilters((prev) => ({
//         ...prev,
//         page: 1, // Reset to first page when filtering
//         search: searchTerm || undefined,
//         role: roleFilter === "all" ? undefined : roleFilter,
//         status: statusFilter === "all" ? undefined : statusFilter,
//       }));
//     }, 500);

//     return () => clearTimeout(debounce);
//   }, [searchTerm, roleFilter, statusFilter]);

//   // Calculate statistics from real data
//   const totalUsers = data?.meta?.total || 0;
//   const totalPages = data?.meta?.totalPages || 0;
//   const users = data?.data || [];

//   const activeUsers = users.filter((user) => user.status === "active").length;
//   const adminUsers = users.filter((user) => user.role === "admin").length;
//   const seoUsers = users.filter((user) => user.role === "seo").length;

//   const handlePageChange = (newPage: number) => {
//     setFilters((prev) => ({
//       ...prev,
//       page: newPage,
//     }));
//   };

//   const getStatusBadge = (status: string) => {
//     const statusMap = {
//       active: { color: "bg-green-100 text-green-800", text: t("active") },
//       inactive: { color: "bg-yellow-100 text-yellow-800", text: t("inactive") },
//     };
//     return statusMap[status as keyof typeof statusMap] || statusMap.inactive;
//   };

//   const getRoleBadge = (role: string) => {
//     const roleMap = {
//       admin: { color: "bg-purple-100 text-purple-800", text: t("admin") },
//       seo: { color: "bg-blue-100 text-blue-800", text: t("seo") },
//     };
//     return roleMap[role as keyof typeof roleMap] || roleMap.seo;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN");
//   };

//   const viewUserDetail = (userId: string) => {
//     router.push(`/admin/users/${userId}`);
//   };

//   // Modal handlers
//   const handleAddUser = (newUserData: any) => {
//     setIsAddModalOpen(false);
//     refetch(); // Refetch data after adding
//     toast.success("Đã thêm user mới thành công!");
//   };

//   const handleEditUser = (user: GetAllUserResponse) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEditUser = (updatedUser: any) => {
//     setIsEditModalOpen(false);
//     setSelectedUser(null);
//     refetch(); // Refetch data after editing
//     toast.success("Đã cập nhật user thành công!");
//   };

//   const handleChangePassword = (user: GetAllUserResponse) => {
//     setSelectedUser(user);
//     setIsPasswordModalOpen(true);
//   };

//   const handleSavePassword = (newPassword: string) => {
//     setIsPasswordModalOpen(false);
//     setSelectedUser(null);
//     toast.success(`Đã đổi mật khẩu cho ${selectedUser?.name} thành công!`);
//   };

//   const handleDeleteUser = (user: GetAllUserResponse) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedUser) {
//       setIsDeleteModalOpen(false);
//       setSelectedUser(null);
//       refetch(); // Refetch data after deleting
//       toast.success("Đã xóa user thành công!");
//     }
//   };

//   const handleToggleUserStatus = (user: GetAllUserResponse) => {
//     // Call API to toggle status then refetch
//     refetch();
//     const newStatus = user.status === "active" ? "inactive" : "active";
//     toast.success(`Đã ${newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"} user thành công!`);
//   };

//   // Loading skeleton component
//   const TableSkeleton = () => (
//     <div className="space-y-4">
//       {[...Array(5)].map((_, index) => (
//         <div key={index} className="flex items-center space-x-4 p-4">
//           <Skeleton className="h-12 w-12 rounded-full" />
//           <div className="space-y-2 flex-1">
//             <Skeleton className="h-4 w-[200px]" />
//             <Skeleton className="h-4 w-[150px]" />
//           </div>
//           <Skeleton className="h-6 w-[80px]" />
//           <Skeleton className="h-6 w-[80px]" />
//           <Skeleton className="h-4 w-[100px]" />
//           <Skeleton className="h-8 w-8" />
//         </div>
//       ))}
//     </div>
//   );

//   const StatsSkeleton = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {[...Array(4)].map((_, index) => (
//         <Card key={index} className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-[100px]" />
//               <Skeleton className="h-8 w-[60px]" />
//             </div>
//             <Skeleton className="h-12 w-12 rounded-lg" />
//           </div>
//         </Card>
//       ))}
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">{t("subtitle")}</p>
//         </div>
//         <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
//           <UserPlus className="h-4 w-4" />
//           {t("addNew")}
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       {isLoading ? (
//         <StatsSkeleton />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                   {t("totalUsers")}
//                 </p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
//               </div>
//               <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
//                 <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//           </Card>

//           <Card className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                   {t("activeUsers")}
//                 </p>
//                 <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
//               </div>
//               <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
//                 <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </div>
//             </div>
//           </Card>

//           <Card className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                   {t("adminUsers")}
//                 </p>
//                 <p className="text-3xl font-bold text-purple-600">{adminUsers}</p>
//               </div>
//               <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
//                 <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//               </div>
//             </div>
//           </Card>

//           <Card className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("seo")}</p>
//                 <p className="text-3xl font-bold text-blue-600">{seoUsers}</p>
//               </div>
//               <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
//                 <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}

//       {/* Search and Filters */}
//       <Card className="p-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder={t("search")}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <div className="flex gap-3">
//             <Select value={roleFilter} onValueChange={setRoleFilter}>
//               <SelectTrigger className="w-[160px]">
//                 <SelectValue placeholder={t("filterRole")} />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tất cả vai trò</SelectItem>
//                 <SelectItem value="admin">{t("admin")}</SelectItem>
//                 <SelectItem value="seo">{t("seo")}</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[160px]">
//                 <SelectValue placeholder={t("filterStatus")} />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tất cả trạng thái</SelectItem>
//                 <SelectItem value="active">{t("active")}</SelectItem>
//                 <SelectItem value="inactive">{t("inactive")}</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button variant="outline" size="icon">
//               <Filter className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Users Table */}
//       <Card>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {t("name")}
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {t("email")}
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {t("role")}
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {t("status")}
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {t("joinedDate")}
//                 </th>
//                 <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   {t("actions")}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan={6}>
//                     <TableSkeleton />
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <Avatar className="h-10 w-10 mr-3">
//                           <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//                             {user.name.charAt(0).toUpperCase()}
//                           </div>
//                         </Avatar>
//                         <div>
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {user.name}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <Badge variant="secondary" className={getRoleBadge(user.role).color}>
//                         {getRoleBadge(user.role).text}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <Badge variant="secondary" className={getStatusBadge(user.status).color}>
//                         {getStatusBadge(user.status).text}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {formatDate(user.created_at || "")}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => viewUserDetail(user.id)}>
//                             <Eye className="mr-2 h-4 w-4" />
//                             {t("viewDetails")}
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleEditUser(user)}>
//                             <Edit className="mr-2 h-4 w-4" />
//                             {t("edit")}
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleChangePassword(user)}>
//                             <Key className="mr-2 h-4 w-4" />
//                             {t("resetPassword")}
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
//                             {user.status === "active" ? (
//                               <>
//                                 <UserX className="mr-2 h-4 w-4" />
//                                 {t("deactivate")}
//                               </>
//                             ) : (
//                               <>
//                                 <UserCheck className="mr-2 h-4 w-4" />
//                                 {t("activate")}
//                               </>
//                             )}
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             className="text-red-600"
//                             onClick={() => handleDeleteUser(user)}
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             {t("delete")}
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Empty State */}
//         {!isLoading && users.length === 0 && (
//           <div className="text-center py-12">
//             <Users className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
//               Không tìm thấy người dùng
//             </h3>
//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//               Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
//             </p>
//           </div>
//         )}
//       </Card>

//       {/* Pagination */}
//       {!isLoading && users.length > 0 && (
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-700 dark:text-gray-300">
//             Hiển thị <span className="font-medium">{(filters.page - 1) * filters.limit + 1}</span>{" "}
//             đến{" "}
//             <span className="font-medium">
//               {Math.min(filters.page * filters.limit, totalUsers)}
//             </span>{" "}
//             trong tổng số <span className="font-medium">{totalUsers}</span> kết quả
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => handlePageChange(filters.page - 1)}
//               disabled={filters.page === 1}
//             >
//               Trước
//             </Button>
//             <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
//               {filters.page}
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => handlePageChange(filters.page + 1)}
//               disabled={filters.page === totalPages}
//             >
//               Sau
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       <AddUserModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSave={handleAddUser}
//       />

//       {selectedUser && (
//         <>
//           <EditUserModal
//             isOpen={isEditModalOpen}
//             onClose={() => {
//               setIsEditModalOpen(false);
//               setSelectedUser(null);
//             }}
//             user={selectedUser}
//             onSave={handleSaveEditUser}
//           />

//           <ChangePasswordModal
//             isOpen={isPasswordModalOpen}
//             onClose={() => {
//               setIsPasswordModalOpen(false);
//               setSelectedUser(null);
//             }}
//             userId={selectedUser.id}
//             userName={selectedUser.name}
//             onSave={handleSavePassword}
//           />

//           <DeleteUserModal
//             isOpen={isDeleteModalOpen}
//             onClose={() => {
//               setIsDeleteModalOpen(false);
//               setSelectedUser(null);
//             }}
//             user={selectedUser}
//             onConfirm={handleConfirmDelete}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default UserManager;
