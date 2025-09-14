"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Users,
  Star,
  MoreHorizontal,
  ChevronsUpDown,
} from "lucide-react";

// Components
import TableFlygora from "@/components/ui/TableFlygora";
import { Button } from "@/components/ui/button";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// APIs và Types
import { getPrivateTours, deleteTour, updateTourStatus } from "@/config/tour/tour.api";
import { Tour } from "@/types/tour.type";
import { useTourStore } from "@/store/tour.store";
import { toast } from "sonner";

// Utils
import { formatCurrency } from "@/utilities/currency";
import { getErrorMessage } from "@/lib/utils";

const TourManager = () => {
  const locale = useLocale();
  const queryClient = useQueryClient();

  // Store state
  const { filters, pagination, setPagination, setTours } = useTourStore();

  // Local state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [tourToDelete, setTourToDelete] = React.useState<Tour | null>(null);

  // Fetch tours data
  const { data: toursData, isLoading } = useQuery({
    queryKey: ["private-tours", filters],
    queryFn: () => getPrivateTours(filters),
  });

  // Effect để cập nhật store khi có data mới
  React.useEffect(() => {
    if (toursData?.data) {
      // Kiểm tra nếu data là mảng (dựa vào API mới)
      if (Array.isArray(toursData.data)) {
        setTours(toursData.data);
      }
      // Kiểm tra meta tồn tại trước khi sử dụng
      if (toursData.meta) {
        setPagination({
          page: toursData.meta.page,
          limit: toursData.meta.limit,
          total: toursData.meta.total,
          totalPages: toursData.meta.totalPages,
        });
      }
    }
  }, [toursData, setTours, setPagination]);

  // Delete tour mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["private-tours"] });
      toast.success("Xóa tour thành công!");
      setDeleteDialogOpen(false);
      setTourToDelete(null);
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error, "Có lỗi xảy ra khi xóa tour");
      toast.error(errorMessage);
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "published" | "unpublished" }) =>
      updateTourStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["private-tours"] });
      toast.success("Cập nhật trạng thái thành công!");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error, "Có lỗi xảy ra khi cập nhật trạng thái");
      toast.error(errorMessage);
    },
  });

  // Handle actions

  const handleDelete = (tour: Tour) => {
    setTourToDelete(tour);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (tourToDelete) {
      deleteMutation.mutate(tourToDelete.id);
    }
  };

  const handleStatusToggle = (tour: Tour) => {
    const newStatus = tour.meta_data.status === "published" ? "unpublished" : "published";
    updateStatusMutation.mutate({ id: tour.id, status: newStatus });
  };

  const handlePageChange = (page: number) => {
    useTourStore.getState().setFilters({ page });
  };

  // Table columns configuration
  const columns = [
    {
      key: "cover",
      title: "Hình ảnh",
      width: "80px",
      render: (value: string, record: Tour) => (
        <Avatar className="h-12 w-12 rounded-md">
          <AvatarImage
            src={value || "/images/homePage/placeholder-tour.jpg"}
            alt={record.title}
            className="object-cover"
          />
          <AvatarFallback className="rounded-md bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
            {record.title.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "title",
      title: "Thông tin tour",
      render: (value: string, record: Tour) => (
        <div className="space-y-1">
          <div className="font-semibold text-gray-900 leading-tight">{value}</div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            {record.location || "Chưa cập nhật"}
          </div>
          <div className="text-xs text-gray-500 font-mono">#{record.product_code}</div>
        </div>
      ),
    },
    {
      key: "duration",
      title: "Thời gian",
      width: "120px",
      align: "center" as const,
      render: (_: any, record: Tour) => (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm font-medium">
            <Calendar className="h-3 w-3" />
            {record.tour_days ? `${record.tour_days}N` : ""}
            {record.tour_nights ? `${record.tour_nights}Đ` : ""}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {record.tour_days || record.tour_nights ? "" : "Chưa cập nhật"}
          </div>
        </div>
      ),
    },
    {
      key: "pricing",
      title: "Giá tour",
      width: "130px",
      align: "right" as const,
      render: (_: any, record: Tour) => (
        <div className="text-right space-y-1">
          {record.sale_price !== record.original_price && (
            <div className="text-xs text-gray-400 line-through">
              {formatCurrency(record.original_price)}
            </div>
          )}
          <div className="font-semibold text-green-600">{formatCurrency(record.sale_price)}</div>
          {record.sale_price !== record.original_price && (
            <BadgeComponent variant="destructive" className="text-xs">
              -
              {Math.round(
                ((record.original_price - record.sale_price) / record.original_price) * 100
              )}
              %
            </BadgeComponent>
          )}
        </div>
      ),
    },
    {
      key: "participants",
      title: "Số người",
      width: "100px",
      align: "center" as const,
      render: (_: any, record: Tour) => (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm">
            <Users className="h-3 w-3" />
            {record.participant_min || 0}-{record.participant_max || 0}
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "Danh mục",
      width: "120px",
      render: (value: any, record: Tour) => (
        <BadgeComponent variant="outline" className="text-xs">
          {record.category?.name || "Chưa phân loại"}
        </BadgeComponent>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      width: "110px",
      align: "center" as const,
      render: (_: any, record: Tour) => (
        <div className="flex flex-col items-center gap-1">
          <BadgeComponent
            variant={record.meta_data.status === "published" ? "default" : "secondary"}
            className="text-xs"
          >
            {record.meta_data.status === "published" ? "Đã xuất bản" : "Nháp"}
          </BadgeComponent>

          {/* Hiển thị các badges đặc biệt */}
          <div className="flex gap-1 flex-wrap justify-center">
            {record.meta_data.is_featured && (
              <BadgeComponent variant="destructive" className="text-xs px-1 py-0">
                <Star className="h-2 w-2 mr-1" />
                Nổi bật
              </BadgeComponent>
            )}
            {record.meta_data.is_top && (
              <BadgeComponent variant="default" className="text-xs px-1 py-0">
                TOP
              </BadgeComponent>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      title: "Thao tác",
      width: "80px",
      align: "center" as const,
      render: (_: any, record: Tour) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${locale}/admin/tours/${record.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Xem chi tiết
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/${locale}/admin/tour-manager/tours/${record.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleStatusToggle(record)}>
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              {record.meta_data.status === "published" ? "Chuyển về nháp" : "Xuất bản"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleDelete(record)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa tour
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const paginationInfo = {
    current: pagination.page,
    pageSize: pagination.limit,
    total: pagination.total,
    totalPages: pagination.totalPages,
  };

  return (
    <>
      <TableFlygora
        columns={columns}
        data={toursData?.data || []}
        loading={isLoading}
        pagination={paginationInfo}
        onPageChange={handlePageChange}
        emptyText="Chưa có tour nào được tạo"
        emptyIcon={
          <div className="p-4 bg-gray-50 rounded-full">
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
        }
        onRow={() => ({
          className: "cursor-pointer hover:bg-gray-50",
        })}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tour</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tour &ldquo;<strong>{tourToDelete?.title}</strong>&rdquo;?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa tour"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TourManager;
