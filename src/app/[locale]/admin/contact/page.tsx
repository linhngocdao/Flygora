"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TableFlygora from "@/components/ui/TableFlygora";
import { GetContact, DeleteContact } from "@/config/contact/contact.api";
import { Contact, QueryGetContacts } from "@/types/contact.type";
import {
  Trash2,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Eye,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const ContactManager = () => {
  const queryClient = useQueryClient();

  // States
  const [filters, setFilters] = useState<QueryGetContacts>({
    page: 1,
    limit: 10,
    query: undefined,
  });
  const [searchDisplay, setSearchDisplay] = useState("");
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
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
    queryKey: ["contacts", filters],
    queryFn: async () => {
      const response = await GetContact(filters);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: DeleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Xóa liên hệ thành công");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Xóa liên hệ thất bại");
    },
  });

  // Handlers
  const handleView = useCallback((contact: Contact) => {
    setViewingContact(contact);
  }, []);

  const handleDelete = useCallback(
    (contact: Contact) => {
      setConfirmDialog({
        open: true,
        title: "Xác nhận xóa liên hệ",
        description: `Bạn có chắc chắn muốn xóa liên hệ từ "${contact.firstName} ${contact.lastName}"? Hành động này không thể hoàn tác.`,
        onConfirm: () => {
          deleteMutation.mutate(contact.id);
        },
      });
    },
    [deleteMutation]
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleReset = useCallback(() => {
    setSearchDisplay("");
    setFilters({
      page: 1,
      limit: 10,
      query: undefined,
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
      title: "Họ và tên",
      render: (value: any, record: Contact) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            {record.firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-medium text-gray-900 dark:text-white">
              {record.firstName} {record.lastName}
            </span>
            <div className="text-sm text-gray-500 dark:text-gray-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      title: "Số điện thoại",
      render: (value: any, record: Contact) => (
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">
            {record.phonePrefix} {record.phoneNumber}
          </span>
        </div>
      ),
    },
    {
      key: "message",
      title: "Tin nhắn",
      render: (value: string) => (
        <div className="max-w-xs">
          <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {value
              ? value.substring(0, 100) + (value.length > 100 ? "..." : "")
              : "Không có tin nhắn"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: () => (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
        >
          Mới
        </Badge>
      ),
    },
    {
      key: "created_at",
      title: "Ngày gửi",
      render: (value: any, record: Contact) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {record.createdAt
            ? new Date(record.createdAt).toLocaleDateString("vi-VN", {
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
      render: (_: any, record: Contact) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => handleView(record)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
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
        total: data.meta.total || 0,
        totalPages: Math.ceil((data.meta.total || 0) / (filters.limit || 10)),
      }
    : undefined;

  // Loading state
  const isAnyMutationLoading = deleteMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý liên hệ</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý các liên hệ từ khách hàng ({data?.meta?.total || 0} liên hệ)
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchDisplay}
              onChange={(e) => setSearchDisplay(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
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
        emptyText="Không có liên hệ nào được tìm thấy"
        emptyIcon={<Search className="h-12 w-12 text-gray-400" />}
        rowKey="id"
      />

      {/* View Contact Dialog */}
      <Dialog open={!!viewingContact} onOpenChange={() => setViewingContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chi tiết liên hệ
            </DialogTitle>
            <DialogDescription>Thông tin chi tiết về liên hệ từ khách hàng</DialogDescription>
          </DialogHeader>

          {viewingContact && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Họ và tên
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {viewingContact.firstName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">
                      {viewingContact.firstName} {viewingContact.lastName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{viewingContact.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Số điện thoại
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {viewingContact.phonePrefix} {viewingContact.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Tin nhắn
                </label>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[120px]">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {viewingContact.message || "Không có tin nhắn"}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Ngày gửi
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(viewingContact.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>

                {viewingContact.updatedAt && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Cập nhật lần cuối
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(viewingContact.updatedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
            <DialogDescription>{confirmDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
              disabled={isAnyMutationLoading}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                confirmDialog.onConfirm();
                setConfirmDialog((prev) => ({ ...prev, open: false }));
              }}
              disabled={isAnyMutationLoading}
            >
              {isAnyMutationLoading ? "Đang xóa..." : "Xóa"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManager;
