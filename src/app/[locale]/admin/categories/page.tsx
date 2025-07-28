"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import TableFlygora from "@/components/ui/TableFlygora";
import {
  getCategory,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
} from "@/config/categoryTour/categoryTour.api";
import { Category, QueryGetCategories, CategoryPayload } from "@/types/categories.type";
import { Edit, Plus, Trash2, MoreHorizontal, RefreshCcw, Power, Search } from "lucide-react";
import { CategoryModalRef } from "@/components/Admin/Categories/CategoryModal";
import { CategoryModal } from "@/components/Admin/Categories";
import { ConfirmDialog } from "@/components/Admin/Categories/ConfirmDialog";
import { useDebounce } from "@/hooks/useDebounce";

const CategoryManager = () => {
  const queryClient = useQueryClient();
  const modalRef = useRef<CategoryModalRef>(null);

  // States
  const [filters, setFilters] = useState<QueryGetCategories>({
    page: 1,
    limit: 10,
    query: undefined,
    status: undefined,
  });
  const [searchDisplay, setSearchDisplay] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  // Debounce search term với delay 500ms
  const debouncedSearchTerm = useDebounce(searchDisplay, 500);

  // Queries
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["categories", filters],
    queryFn: async () => {
      const response = await getCategory(filters);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Thêm danh mục thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Thêm danh mục thất bại");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CategoryPayload }) =>
      updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Cập nhật danh mục thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Cập nhật danh mục thất bại");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "inactive" }) =>
      updateCategoryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Cập nhật trạng thái thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Cập nhật trạng thái thất bại");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Xóa danh mục thành công");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // Handlers
  const handleAdd = useCallback(() => {
    modalRef.current?.openModal();
  }, []);

  const handleEdit = useCallback((category: Category) => {
    modalRef.current?.openModal(category);
  }, []);

  const handleSave = useCallback(
    async (data: CategoryPayload, editingCategory?: Category) => {
      if (editingCategory) {
        await updateMutation.mutateAsync({ id: editingCategory.id, payload: data });
      } else {
        await createMutation.mutateAsync(data);
      }
    },
    [createMutation, updateMutation]
  );

  const handleChangeStatus = useCallback(
    (category: Category) => {
      const newStatus = category.status === "active" ? "inactive" : "active";
      updateStatusMutation.mutate({ id: category.id, status: newStatus });
    },
    [updateStatusMutation]
  );

  const handleDelete = useCallback(
    (category: Category) => {
      setConfirmDialog({
        open: true,
        title: "Xác nhận xóa danh mục",
        description: `Bạn có chắc chắn muốn xóa danh mục "${category.name}"? Hành động này không thể hoàn tác và có thể ảnh hưởng đến các tour đang sử dụng danh mục này.`,
        onConfirm: () => {
          deleteMutation.mutate(category.id);
        },
      });
    },
    [deleteMutation]
  );

  const handleStatusFilter = useCallback((status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: status === "all" ? undefined : (status as "active" | "inactive"),
      page: 1,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleReset = useCallback(() => {
    setSearchDisplay("");
    setFilters({
      page: 1,
      limit: 10,
      query: undefined,
      status: undefined,
    });
  }, []);

  // Effect để cập nhật filters khi debouncedSearchTerm thay đổi
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      query: debouncedSearchTerm.trim() || undefined,
      page: 1,
    }));
  }, [debouncedSearchTerm]);

  // Table columns
  const columns = [
    {
      key: "name",
      title: "Tên danh mục",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (value: string, _record: Category) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            {value.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{value}</span>
        </div>
      ),
    },
    {
      key: "description",
      title: "Mô tả",
      render: (value: string) => (
        <div className="max-w-xs">
          <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {value || "Không có mô tả"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: string) => (
        <Badge
          variant={value === "active" ? "default" : "secondary"}
          className={
            value === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300"
          }
        >
          {value === "active" ? "Hoạt động" : "Vô hiệu hóa"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      title: "Ngày tạo",
      render: (value: string) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value
            ? new Date(value).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Hành động",
      align: "right" as const,
      render: (_: any, record: Category) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => handleEdit(record)}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatus(record)}>
              <Power className="mr-2 h-4 w-4" />
              {record.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
              onClick={() => handleDelete(record)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Pagination info
  const pagination = data?.data
    ? {
        current: filters.page || 1,
        pageSize: filters.limit || 10,
        total: data.pagination.total || 0,
        totalPages: Math.ceil((data.pagination.total || 0) / (filters.limit || 10)),
      }
    : undefined;

  // Loading state
  const isAnyMutationLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    updateStatusMutation.isPending ||
    deleteMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý danh mục</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý các danh mục tour trong hệ thống ({data?.pagination?.total || 0} danh mục)
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={handleAdd}
          disabled={isAnyMutationLoading}
        >
          <Plus className="h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchDisplay}
              onChange={(e) => setSearchDisplay(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <Select
              value={filters.status || "all"}
              onValueChange={handleStatusFilter}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              disabled={isLoading}
              title="Reset filters"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Error state */}
      {error && (
        <Card className="p-6">
          <div className="text-center text-red-600">
            <p>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.</p>
          </div>
        </Card>
      )}

      {/* Table */}
      <TableFlygora
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyText="Không có danh mục nào được tìm thấy"
        emptyIcon={<Search className="h-12 w-12 text-gray-400" />}
        rowKey="id"
      />

      {/* Modal */}
      <CategoryModal ref={modalRef} onSave={handleSave} />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />
    </div>
  );
};

export default CategoryManager;
