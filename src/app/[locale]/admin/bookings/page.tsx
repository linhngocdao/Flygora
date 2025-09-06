"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableFlygora from "@/components/ui/TableFlygora";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Search, Eye, Download, RefreshCcw, MoreHorizontal, Filter } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { BookingParam, ListBooking, UpdateStatus } from "@/config/booking/booking.api";
import { formatCurrency } from "@/utilities/currency";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function BookingsManagement() {
  const t = useTranslations("admin.bookings");
  const router = useRouter();
  const [searchDisplay, setSearchDisplay] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "pending" | "confirmed" | "cancelled" | "completed" | null
  >(null);
  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<BookingParam>({
    page: 1,
    limit: 10,
  });

  // Debounce search term với delay 500ms
  const debouncedSearchTerm = useDebounce(searchDisplay, 500);

  // Queries
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bookings", filters],
    queryFn: () => ListBooking(filters),
    refetchOnWindowFocus: false,
  });
  console.log("data", data);

  // Tính toán thống kê từ dữ liệu API
  const bookingsData = useMemo(() => data?.data || [], [data?.data]);

  // Effect để cập nhật filters khi debouncedSearchTerm thay đổi
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearchTerm.trim() || undefined,
      page: 1,
    }));
  }, [debouncedSearchTerm]);

  // Handler function
  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleReset = useCallback(() => {
    setSearchDisplay("");
    setFilters({
      page: 1,
      limit: 10,
      status: undefined,
      search: undefined,
    });
  }, []);

  // Điều hướng đến trang chi tiết booking
  const handleViewBooking = useCallback(
    (bookingId: string) => {
      router.push(`/admin/bookings/${bookingId}`);
    },
    [router]
  );

  // Mở modal cập nhật trạng thái
  const handleOpenUpdateStatus = useCallback(
    (bookingId: string) => {
      const booking = bookingsData.find((b) => b.id === bookingId);
      setSelectedBookingId(bookingId);
      setSelectedStatus(booking?.status || null);
      setIsStatusUpdateModalOpen(true);
    },
    [bookingsData]
  );

  // Đóng modal cập nhật trạng thái
  const handleCloseUpdateStatusModal = useCallback(() => {
    setIsStatusUpdateModalOpen(false);
    setSelectedBookingId(null);
    setSelectedStatus(null);
  }, []);

  // Cập nhật trạng thái booking
  const handleUpdateStatus = useCallback(
    async (status: "pending" | "confirmed" | "cancelled" | "completed") => {
      if (!selectedBookingId) return;

      try {
        await UpdateStatus(selectedBookingId, { status });
        refetch(); // Làm mới dữ liệu sau khi cập nhật
        setIsStatusUpdateModalOpen(false);
        setSelectedBookingId(null);
        toast.success("Cập nhật trạng thái booking thành công!");
      } catch (error: any) {
        console.error("Lỗi khi cập nhật trạng thái:", error);

        // Xử lý lỗi từ API response
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Có lỗi xảy ra khi cập nhật trạng thái booking";

        toast.error(errorMessage);
      }
    },
    [selectedBookingId, refetch]
  );

  const rowTable = [
    {
      key: "booking_code",
      title: "Mã booking",
      render: (value: string) => (
        <div className="font-medium text-blue-600 transition-colors">{value}</div>
      ),
    },
    {
      key: "booker",
      title: "Khách hàng",
      render: (value: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
      }) => (
        <div>
          <p className="font-medium text-gray-900">
            {value.first_name} {value.last_name}
          </p>
          <p className="text-sm text-gray-500">{value.email}</p>
          <p className="text-sm text-gray-500">{value.phone_number}</p>
        </div>
      ),
    },
    {
      key: "tour",
      title: "Tour",
      render: (value: { title: string; product_code: string }, record: { tour_date: string }) => (
        <div>
          <p className="font-medium text-gray-900">{value.title}</p>
          <p className="text-sm text-gray-500">{value.product_code}</p>
          <p className="text-sm text-gray-500">
            Ngày tour: {new Date(record.tour_date).toLocaleDateString("vi-VN")}
          </p>
        </div>
      ),
    },
    {
      key: "number_of_participants",
      title: "Số người",
      render: (value: number) => (
        <div className="text-center font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "final_price",
      title: "Tổng tiền",
      render: (value: string) => (
        <div className="font-medium text-gray-900">{formatCurrency(value)}</div>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: "stripe_session_id",
      title: "Thanh toán",
      render: (value: string | null) => {
        // Since payment info is not in the API response, we'll determine status based on stripe_session_id
        const paymentStatus = value ? "succeeded" : "pending";
        return getPaymentStatusBadge(paymentStatus);
      },
    },
    {
      key: "created_at",
      title: "Ngày đặt",
      render: (value: string) => (
        <div className="text-sm text-gray-900">{new Date(value).toLocaleDateString("vi-VN")}</div>
      ),
    },
    {
      key: "actions",
      title: "Thao tác",
      render: (_: any, record: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => handleViewBooking(record.id)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenUpdateStatus(record.id)}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Cập nhật trạng thái
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">{t("confirmed")}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">{t("pending")}</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">{t("cancelled")}</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">{t("completed")}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
      case "succeeded":
        return <Badge className="bg-green-100 text-green-800">{t("paid")}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">{t("unpaid")}</Badge>;
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800">{t("refunded")}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const totalBookings = data?.meta?.total || 0;

  // Đếm số lượng booking theo trạng thái
  const confirmedBookings = bookingsData.filter((booking) => booking.status === "confirmed").length;
  const pendingBookings = bookingsData.filter((booking) => booking.status === "pending").length;

  // Tính tổng doanh thu từ các booking có stripe_session_id (đã thanh toán)
  const totalRevenue = bookingsData
    .filter((booking) => booking.stripe_session_id && booking.status !== "cancelled")
    .reduce((sum, booking) => sum + parseFloat(booking.final_price || "0"), 0);

  // Stats cards
  const stats = [
    {
      title: t("totalBookings"),
      value: totalBookings,
      color: "blue",
    },
    {
      title: t("confirmed"),
      value: confirmedBookings,
      color: "green",
    },
    {
      title: t("pending"),
      value: pendingBookings,
      color: "yellow",
    },
    {
      title: "Doanh thu",
      value: formatCurrency(totalRevenue),
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200">
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 transition-colors">{t("title")}</h1>
            <p className="text-gray-600 mt-1 transition-colors">{t("subtitle")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="">
              <Download className="mr-2 h-4 w-4" />
              {t("exportExcel")}
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Calendar className="mr-2 h-4 w-4" />
              {t("calendar")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-colors hover:shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 transition-colors">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2 transition-colors">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="transition-colors">
          <div className="p-6 space-y-4">
            {/* Tìm kiếm */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên khách hàng, tour hoặc mã booking..."
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
                  title="Xóa bộ lọc"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>

                <Button
                  variant={Object.keys(filters).length > 2 ? "default" : "outline"}
                  className={`flex items-center ${
                    Object.keys(filters).length > 2
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-600 hover:bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Bộ lọc {Object.keys(filters).length > 2 && `(${Object.keys(filters).length - 2})`}
                </Button>
              </div>
            </div>

            {/* Bộ lọc nâng cao */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                {/* Trạng thái booking */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Trạng thái đặt tour</label>
                  <Select
                    value={filters.status || "all"}
                    onValueChange={(value) => {
                      setFilters((prev) => ({
                        ...prev,
                        status:
                          value === "all"
                            ? undefined
                            : (value as "pending" | "confirmed" | "cancelled" | "completed"),
                        page: 1,
                      }));
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="all" className="dark:text-gray-300 dark:hover:bg-gray-700">
                        Tất cả trạng thái
                      </SelectItem>
                      <SelectItem value="pending" className="">
                        Chờ xác nhận
                      </SelectItem>
                      <SelectItem value="confirmed" className="">
                        Đã xác nhận
                      </SelectItem>
                      <SelectItem value="cancelled" className="">
                        Đã hủy
                      </SelectItem>
                      <SelectItem value="completed" className="">
                        Hoàn thành
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Trạng thái thanh toán */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Trạng thái thanh toán</label>
                  <Select
                    value={filters.payment_status || "all"}
                    onValueChange={(value) => {
                      setFilters((prev) => ({
                        ...prev,
                        payment_status:
                          value === "all"
                            ? undefined
                            : (value as "pending" | "succeeded" | "failed" | "refunded"),
                        page: 1,
                      }));
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Tất cả trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="all" className="dark:text-gray-300 dark:hover:bg-gray-700">
                        Tất cả trạng thái
                      </SelectItem>
                      <SelectItem value="pending" className="">
                        Chưa thanh toán
                      </SelectItem>
                      <SelectItem value="succeeded" className="">
                        Đã thanh toán
                      </SelectItem>
                      <SelectItem value="failed" className="">
                        Thanh toán thất bại
                      </SelectItem>
                      <SelectItem value="refunded" className="">
                        Đã hoàn tiền
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ngày từ */}
                <div className="space-y-2">
                  <label htmlFor="date-from" className="text-sm font-medium text-gray-700">
                    Từ ngày
                  </label>
                  <div className="relative">
                    <Input
                      id="date-from"
                      type="date"
                      value={filters.date_from || ""}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          date_from: e.target.value || undefined,
                          page: 1,
                        }));
                      }}
                      disabled={isLoading}
                      className=""
                    />
                  </div>
                </div>

                {/* Ngày đến */}
                <div className="space-y-2">
                  <label htmlFor="date-to" className="text-sm font-medium text-gray-700">
                    Đến ngày
                  </label>
                  <div className="relative">
                    <Input
                      id="date-to"
                      type="date"
                      value={filters.date_to || ""}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          date_to: e.target.value || undefined,
                          page: 1,
                        }));
                      }}
                      disabled={isLoading}
                      className=""
                    />
                  </div>
                </div>

                {/* Sắp xếp */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sắp xếp theo</label>
                  <Select
                    value={filters.sort_by || "createdAt"}
                    onValueChange={(value) => {
                      setFilters((prev) => ({
                        ...prev,
                        sort_by: value,
                        page: 1,
                      }));
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn trường sắp xếp" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="createdAt" className="">
                        Ngày đặt
                      </SelectItem>
                      <SelectItem value="tourDate" className="">
                        Ngày tour
                      </SelectItem>
                      <SelectItem value="finalPrice" className="">
                        Giá trị đơn hàng
                      </SelectItem>
                      <SelectItem value="numberOfParticipants" className="">
                        Số người tham gia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Thứ tự sắp xếp */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Thứ tự sắp xếp</label>
                  <Select
                    value={filters.sort_order || "desc"}
                    onValueChange={(value) => {
                      setFilters((prev) => ({
                        ...prev,
                        sort_order: value as "asc" | "desc",
                        page: 1,
                      }));
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn thứ tự sắp xếp" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="asc" className="dark:text-gray-300 dark:hover:bg-gray-700">
                        Tăng dần
                      </SelectItem>
                      <SelectItem value="desc" className="">
                        Giảm dần
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Error state */}
        {error && (
          <Card className="">
            <div className="p-6 text-center text-red-600 dark:text-red-400">
              <p>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.</p>
            </div>
          </Card>
        )}

        {/* Bookings Table */}
        <Card className="transition-colors">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Danh sách Bookings ({bookingsData.length})
            </CardTitle>
            <CardDescription className="text-gray-600">
              Tổng quan tất cả các booking trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableFlygora
              columns={rowTable}
              data={bookingsData}
              loading={isLoading}
              pagination={{
                current: filters.page || 1,
                pageSize: filters.limit || 10,
                total: data?.meta?.total || 0,
                totalPages: data?.meta?.totalPages || 0,
              }}
              onPageChange={handlePageChange}
              emptyText="Không có booking nào được tìm thấy"
              emptyIcon={<Search className="h-12 w-12 text-gray-400" />}
              rowKey="id"
            />
          </CardContent>
        </Card>

        {/* Modal Cập Nhật Trạng Thái */}
        <Dialog open={isStatusUpdateModalOpen} onOpenChange={setIsStatusUpdateModalOpen}>
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">
                Cập nhật trạng thái đặt tour
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Chọn trạng thái mới cho đơn đặt tour này
              </DialogDescription>
            </DialogHeader>

            {bookingsData.find((booking) => booking.id === selectedBookingId) && (
              <div className="py-4">
                <div className="mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Thông tin đơn hàng hiện tại:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Mã booking:</span>
                      <span className="font-medium ml-1 text-gray-900 dark:text-white">
                        {
                          bookingsData.find((booking) => booking.id === selectedBookingId)
                            ?.booking_code
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Khách hàng:</span>
                      <span className="font-medium ml-1 text-gray-900 dark:text-white">
                        {(() => {
                          const booking = bookingsData.find(
                            (booking) => booking.id === selectedBookingId
                          );
                          return booking
                            ? `${booking.booker.first_name} ${booking.booker.last_name}`
                            : "";
                        })()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Trạng thái hiện tại:</span>
                      <span className="ml-1">
                        {getStatusBadge(
                          bookingsData.find((booking) => booking.id === selectedBookingId)
                            ?.status || ""
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Tour:</span>
                      <span className="font-medium ml-1 text-gray-900 dark:text-white">
                        {
                          bookingsData.find((booking) => booking.id === selectedBookingId)?.tour
                            .title
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Trạng thái mới:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={selectedStatus === "pending" ? "default" : "outline"}
                        className={`justify-start ${
                          selectedStatus === "pending"
                            ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                            : "dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedStatus("pending");
                          handleUpdateStatus("pending");
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                        Chờ xác nhận
                      </Button>
                      <Button
                        variant={selectedStatus === "confirmed" ? "default" : "outline"}
                        className={`justify-start ${
                          selectedStatus === "confirmed"
                            ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                            : "dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedStatus("confirmed");
                          handleUpdateStatus("confirmed");
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Đã xác nhận
                      </Button>
                      <Button
                        variant={selectedStatus === "cancelled" ? "default" : "outline"}
                        className={`justify-start ${
                          selectedStatus === "cancelled"
                            ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                            : "dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedStatus("cancelled");
                          handleUpdateStatus("cancelled");
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        Đã hủy
                      </Button>
                      <Button
                        variant={selectedStatus === "completed" ? "default" : "outline"}
                        className={`justify-start ${
                          selectedStatus === "completed"
                            ? "dark:bg-blue-600 dark:hover:bg-blue-700"
                            : "dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedStatus("completed");
                          handleUpdateStatus("completed");
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        Hoàn thành
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleCloseUpdateStatusModal}
                className="dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
