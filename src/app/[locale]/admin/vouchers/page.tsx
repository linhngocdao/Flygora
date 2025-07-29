"use client";

import ConfirmDialog from "@/components/Admin/Vouchers/ConfirmDialog";
import VoucherModal, { VoucherModalRef } from "@/components/Admin/Vouchers/VoucherModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  createVoucher,
  deleteVoucher,
  duplicateVoucher,
  // getVoucherDetail,
  getVoucherList,
  getVoucherStatistics,
  updateVoucher,
  updateVoucherStatus,
} from "@/config/voucher/voucher.api";
import { useDebounce } from "@/hooks/useDebounce";
import {
  filterVoucher,
  StatisticalVoucher,
  UpdateVoucherRequest,
  voucherPayloadCreate,
  voucherResponse,
} from "@/types/voucher.type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Edit, Eye, MoreHorizontal, Power, RefreshCcw, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// UI quản lý voucher cho admin
const VoucherManager = () => {
  const queryClient = useQueryClient();
  const modalRef = useRef<VoucherModalRef>(null);

  const [filters, setFilters] = useState<filterVoucher>({
    page: 1,
    limit: 10,
    search: undefined,
    status: undefined,
    is_active: undefined,
    discount_type: undefined,
  });
  // Query lấy thống kê voucher bằng react-query
  const { data: statistics } = useQuery<StatisticalVoucher>({
    queryKey: ["voucher-statistics"],
    queryFn: async () => {
      return await getVoucherStatistics();
    },
    refetchOnWindowFocus: false,
  });

  const [searchDisplay, setSearchDisplay] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  // Debounce cho ô tìm kiếm
  const debouncedSearchTerm = useDebounce(searchDisplay, 500);

  // Query lấy danh sách voucher
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["vouchers", filters],
    queryFn: async () => {
      const response = await getVoucherList(filters);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // Mutation tạo mới voucher
  const createMutation = useMutation({
    mutationFn: createVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Thêm voucher thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Thêm voucher thất bại");
    },
  });

  // Mutation cập nhật voucher
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateVoucherRequest }) =>
      updateVoucher(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Cập nhật voucher thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Cập nhật voucher thất bại");
    },
  });

  // Mutation cập nhật trạng thái voucher
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) =>
      updateVoucherStatus(id, is_active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Cập nhật trạng thái thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Cập nhật trạng thái thất bại");
    },
  });

  // Mutation xóa voucher
  const deleteMutation = useMutation({
    mutationFn: deleteVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Xóa voucher thành công");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // Mutation tạo bản sao voucher
  const duplicateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { new_code: string; valid_from: string; valid_to: string };
    }) => duplicateVoucher(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Tạo bản sao voucher thành công");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Tạo bản sao voucher thất bại");
    },
  });

  // Handler mở modal thêm mới
  const handleAdd = useCallback(() => {
    modalRef.current?.openModal();
  }, []);

  // Handler mở modal chỉnh sửa
  const handleEdit = useCallback((voucher: voucherResponse) => {
    modalRef.current?.openModal(voucher);
  }, []);

  // Handler lưu voucher (thêm/sửa)
  const handleSave = useCallback(
    async (data: voucherPayloadCreate, editingVoucher?: voucherResponse) => {
      if (editingVoucher) {
        await updateMutation.mutateAsync({ id: editingVoucher.id, payload: data });
      } else {
        await createMutation.mutateAsync(data);
      }
    },
    [createMutation, updateMutation]
  );

  // Handler cập nhật trạng thái
  const handleChangeStatus = useCallback(
    (voucher: voucherResponse) => {
      updateStatusMutation.mutate({ id: voucher.id, is_active: !voucher.is_active });
    },
    [updateStatusMutation]
  );

  // Handler xóa voucher
  const handleDelete = useCallback(
    (voucher: voucherResponse) => {
      setConfirmDialog({
        open: true,
        title: "Xác nhận xóa voucher",
        description: `Bạn có chắc chắn muốn xóa voucher "${voucher.code}"? Hành động này không thể hoàn tác và có thể ảnh hưởng đến các tour đang sử dụng voucher này.`,
        onConfirm: () => {
          deleteMutation.mutate(voucher.id);
        },
      });
    },
    [deleteMutation]
  );

  // Handler tạo bản sao voucher
  const handleDuplicate = useCallback((voucher: voucherResponse) => {
    // Mở modal hoặc prompt nhập thông tin bản sao
    modalRef.current?.openDuplicateModal(voucher);
  }, []);

  // Handler xem chi tiết voucher
  const handleViewDetail = () => {
    toast.info("Đang thực hiện chức năng xem chi tiết voucher");
  };

  // Handler filter trạng thái
  const handleStatusFilter = useCallback((status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: status === "all" ? undefined : status,
      page: 1,
    }));
  }, []);

  // Handler filter is_active
  const handleIsActiveFilter = useCallback((isActive: string) => {
    setFilters((prev) => ({
      ...prev,
      is_active: isActive === "all" ? undefined : isActive === "active",
      page: 1,
    }));
  }, []);

  // Handler filter discount_type
  const handleDiscountTypeFilter = useCallback((type: string) => {
    setFilters((prev) => ({
      ...prev,
      discount_type: type === "all" ? undefined : type,
      page: 1,
    }));
  }, []);

  // Handler chuyển trang
  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // Handler reset bộ lọc
  const handleReset = useCallback(() => {
    setSearchDisplay("");
    setFilters({
      page: 1,
      limit: 10,
      search: undefined,
      status: undefined,
    });
  }, []);

  // Effect cập nhật filters khi search thay đổi
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearchTerm.trim() || undefined,
      page: 1,
    }));
  }, [debouncedSearchTerm]);

  // Định nghĩa các cột cho TableFlygora
  const columns = [
    {
      key: "code",
      title: "Mã voucher",
      render: (value: string) => (
        <span className="font-semibold text-blue-600 dark:text-blue-400">{value}</span>
      ),
    },
    {
      key: "description",
      title: "Mô tả",
      render: (value: string) => (
        <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
          {value || "Không có mô tả"}
        </span>
      ),
    },
    {
      key: "discount_type",
      title: "Loại giảm giá",
      render: (value: string) => (
        <Badge variant="secondary">{value === "percentage" ? "Phần trăm" : "Số tiền"}</Badge>
      ),
    },
    {
      key: "discount_value",
      title: "Giá trị giảm",
      render: (value: string, record: voucherResponse) => (
        <span>{record.discount_type === "percentage" ? `${value}%` : `${value}₫`}</span>
      ),
    },
    {
      key: "valid_from",
      title: "Hiệu lực từ",
      render: (value: string) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value ? new Date(value).toLocaleDateString("vi-VN") : "-"}
        </span>
      ),
    },
    {
      key: "valid_to",
      title: "Hiệu lực đến",
      render: (value: string) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value ? new Date(value).toLocaleDateString("vi-VN") : "-"}
        </span>
      ),
    },
    {
      key: "is_active",
      title: "Trạng thái",
      render: (value: boolean) => (
        <Badge
          variant={value ? "default" : "secondary"}
          className={
            value
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300"
          }
        >
          {value ? "Hoạt động" : "Vô hiệu hóa"}
        </Badge>
      ),
    },
    {
      key: "actions",
      title: "Hành động",
      align: "right" as const,
      render: (_: any, record: voucherResponse) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetail(record)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(record)}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatus(record)}>
              <Power className="mr-2 h-4 w-4" />
              {record.is_active ? "Vô hiệu hóa" : "Kích hoạt"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDuplicate(record)}>
              <Copy className="mr-2 h-4 w-4" /> Tạo bản sao
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(record)}>
              <Trash2 className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Thông tin phân trang
  const pagination = data?.data
    ? {
        current: filters.page || 1,
        pageSize: filters.limit || 10,
        total: data.pagination.total || 0,
        totalPages: Math.ceil((data.pagination.total || 0) / (filters.limit || 10)),
      }
    : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý voucher</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý các voucher khuyến mãi trong hệ thống ({data?.pagination?.total_items} voucher)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Xuất Excel</Button>
          <Button onClick={handleAdd}>Thêm voucher</Button>
        </div>
      </div>
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng số voucher
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-white mt-2">
                  {statistics?.data?.total_vouchers}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Voucher hoạt động
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-white mt-2">
                  {statistics?.data?.active_vouchers}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Voucher hết hạn
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-white mt-2">
                  {" "}
                  {statistics?.data?.expired_vouchers}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Voucher sử dụng nhiều nhất
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {statistics?.data?.most_used_voucher?.code} (
                  {statistics?.data?.most_used_voucher?.uses_count})
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm voucher..."
              value={searchDisplay}
              onChange={(e) => setSearchDisplay(e.target.value)}
              disabled={isLoading}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            {/* is_active filter */}
            <Select
              value={
                filters.is_active === undefined ? "all" : filters.is_active ? "active" : "inactive"
              }
              onValueChange={handleIsActiveFilter}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
              </SelectContent>
            </Select>

            {/* discount_type filter */}
            <Select
              value={filters.discount_type || "all"}
              onValueChange={handleDiscountTypeFilter}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tất cả loại giảm giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại giảm giá</SelectItem>
                <SelectItem value="percentage">Phần trăm</SelectItem>
                <SelectItem value="fixed_amount">Số tiền</SelectItem>
              </SelectContent>
            </Select>

            {/* status filter */}
            <Select
              value={filters.status || "all"}
              onValueChange={handleStatusFilter}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tất cả trạng thái hệ thống" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái hệ thống</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Button */}
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
        emptyText="Không có voucher nào được tìm thấy"
        emptyIcon={<Search className="h-12 w-12 text-gray-400" />}
        rowKey="id"
      />

      {/* Modal thêm/sửa voucher */}
      <VoucherModal ref={modalRef} onSave={handleSave} duplicateMutation={duplicateMutation} />

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

export default VoucherManager;
