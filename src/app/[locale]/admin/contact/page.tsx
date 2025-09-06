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

type ContactType = "contact" | "marketing";

interface TabItem {
  key: ContactType;
  label: string;
  count?: number;
}
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
import { getErrorMessage } from "@/lib/utils";

const ContactManager = () => {
  const queryClient = useQueryClient();

  // States
  const [activeTab, setActiveTab] = useState<ContactType>("contact");
  const [filters, setFilters] = useState<QueryGetContacts>({
    page: 1,
    limit: 10,
    query: undefined,
    type: "contact", // Add type filter
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

  // Query for contact counts
  const { data: contactCounts } = useQuery<any>({
    queryKey: ["contact-counts"],
    queryFn: async () => {
      const [contactResponse, marketingResponse] = await Promise.all([
        GetContact({ page: 1, limit: 1, type: "contact" }),
        GetContact({ page: 1, limit: 1, type: "marketing" }),
      ]);
      return {
        contact: contactResponse?.meta?.total || 0,
        marketing: marketingResponse?.meta?.total || 0,
      };
    },
    refetchOnWindowFocus: false,
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: DeleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact-counts"] });
      toast.success("Xóa liên hệ thành công");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error, "Xóa liên hệ thất bại");
      toast.error(errorMessage);
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
      type: activeTab,
    });
  }, [activeTab]);

  const handleTabChange = useCallback((tab: ContactType) => {
    setActiveTab(tab);
    setSearchDisplay("");
    setFilters({
      page: 1,
      limit: 10,
      query: undefined,
      type: tab,
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

  // Table columns - different for each contact type
  const getColumns = () => {
    if (activeTab === "marketing") {
      // Marketing tab - chỉ hiển thị email
      return [
        {
          key: "email",
          title: "Email Marketing",
          render: (value: any, record: Contact) => (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                {record.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-medium text-gray-900">{record.email}</span>
                <div className="text-sm text-gray-500 ">
                  {record.firstName && record.lastName
                    ? `${record.firstName} ${record.lastName}`
                    : "Marketing Subscriber"}
                </div>
              </div>
            </div>
          ),
        },
        {
          key: "status",
          title: "Trạng thái",
          render: () => (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 hover:bg-purple-200 "
            >
              Đăng ký
            </Badge>
          ),
        },
        {
          key: "created_at",
          title: "Ngày đăng ký",
          render: (value: any, record: Contact) => (
            <span className="text-sm text-gray-500 ">
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
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 "
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
    }

    // Contact tab - hiển thị đầy đủ thông tin
    return [
      {
        key: "name",
        title: "Họ và tên",
        render: (value: any, record: Contact) => (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              {record.firstName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-medium text-gray-900 ">
                {record.firstName} {record.lastName}
              </span>
              <div className="text-sm text-gray-500 ">{record.email}</div>
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
            <span className="text-gray-700 ">
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
            <span className="text-sm text-gray-700  line-clamp-2">
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
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 ">
            Mới
          </Badge>
        ),
      },
      {
        key: "created_at",
        title: "Ngày gửi",
        render: (value: any, record: Contact) => (
          <span className="text-sm text-gray-500 ">
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
                className="text-red-600 focus:text-red-600 focus:bg-red-50 "
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
  };

  // Pagination info
  const pagination = data?.data
    ? {
        current: filters.page || 1,
        pageSize: filters.limit || 10,
        total: data.meta.total || 0,
        totalPages: Math.ceil((data.meta.total || 0) / (filters.limit || 10)),
      }
    : undefined;

  // Tab data
  const tabs: TabItem[] = [
    {
      key: "contact",
      label: "Liên hệ",
      count: contactCounts?.contact,
    },
    {
      key: "marketing",
      label: "Marketing",
      count: contactCounts?.marketing,
    },
  ];

  // Loading state
  const isAnyMutationLoading = deleteMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 ">Quản lý liên hệ</h1>
          <p className="text-gray-600 mt-2">
            Quản lý các liên hệ từ khách hàng ({data?.meta?.total || 0} liên hệ)
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 ">
        <div className="flex border-b border-gray-200 ">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                ${
                  activeTab === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 "
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 "
                }
              `}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`
                  px-2 py-1 text-xs rounded-full
                  ${
                    activeTab === tab.key
                      ? "bg-blue-100 text-blue-600 "
                      : "bg-gray-100 text-gray-600 "
                  }
                `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={
                activeTab === "marketing"
                  ? "Tìm kiếm theo tên, email marketing..."
                  : "Tìm kiếm theo tên, email, số điện thoại..."
              }
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
        columns={getColumns()}
        data={data?.data || []}
        loading={isLoading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyText={`Không có ${activeTab === "marketing" ? "đăng ký marketing" : "liên hệ"} nào được tìm thấy`}
        emptyIcon={<Search className="h-12 w-12 text-gray-400" />}
        rowKey="id"
      />

      {/* View Contact Dialog */}
      <Dialog open={!!viewingContact} onOpenChange={() => setViewingContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {activeTab === "marketing" ? "Chi tiết đăng ký Marketing" : "Chi tiết liên hệ"}
            </DialogTitle>
            <DialogDescription>
              {activeTab === "marketing"
                ? "Thông tin chi tiết về đăng ký marketing từ khách hàng"
                : "Thông tin chi tiết về liên hệ từ khách hàng"}
            </DialogDescription>
          </DialogHeader>

          {viewingContact && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 ">Họ và tên</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
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
                  <label className="text-sm font-medium text-gray-900 ">Email</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 ">{viewingContact.email}</span>
                  </div>
                </div>

                {/* Chỉ hiển thị số điện thoại cho contact tab */}
                {activeTab === "contact" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 ">Số điện thoại</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 ">
                        {viewingContact.phonePrefix} {viewingContact.phoneNumber}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message - only show for contact type */}
              {activeTab === "contact" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 ">Tin nhắn</label>
                  <div className="p-4 bg-gray-50 rounded-lg min-h-[120px]">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {viewingContact.message || "Không có tin nhắn"}
                    </p>
                  </div>
                </div>
              )}

              {/* Marketing interests - only show for marketing type */}
              {activeTab === "marketing" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 ">Quan tâm Marketing</label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        Newsletter
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Tour Updates
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Promotions
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-900 ">
                    {activeTab === "marketing" ? "Ngày đăng ký" : "Ngày gửi"}
                  </label>
                  <p className="text-sm text-gray-600 ">
                    {new Date(viewingContact.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>

                {viewingContact.updatedAt && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-900 ">Cập nhật lần cuối</label>
                    <p className="text-sm text-gray-600 ">
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
