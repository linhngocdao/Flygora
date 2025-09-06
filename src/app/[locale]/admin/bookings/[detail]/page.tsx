"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCcw, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DetailBookingByAdmin } from "@/config/booking/booking.api";
import { formatCurrency } from "@/utilities/currency";
import { toast } from "sonner";

export default function BookingDetailPage() {
  const t = useTranslations("admin.bookings");
  const params = useParams();
  const router = useRouter();
  const bookingId = params.detail as string;

  // Query chi tiết booking
  const {
    data: bookingDetail,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookingDetail", bookingId],
    queryFn: () => DetailBookingByAdmin(bookingId),
    enabled: !!bookingId,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Handlers
  const handleBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Đã làm mới thông tin booking");
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    toast.info("Tính năng xuất PDF đang được phát triển");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {t("confirmed")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            {t("pending")}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            {t("cancelled")}
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {t("completed")}
          </Badge>
        );
      default:
        return <Badge className="dark:bg-gray-800 dark:text-gray-300">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
      case "succeeded":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {t("paid")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            {t("unpaid")}
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {t("refunded")}
          </Badge>
        );
      default:
        return <Badge className="dark:bg-gray-800 dark:text-gray-300">{status}</Badge>;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Đang tải thông tin booking...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Không thể tải thông tin booking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Vui lòng thử lại sau hoặc kiểm tra ID booking
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <Button onClick={handleRefresh}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!bookingDetail?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Không tìm thấy booking
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Booking với ID này không tồn tại hoặc đã bị xóa
          </p>
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  const booking = bookingDetail.data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                onClick={handleBack}
                className="px-6 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                ← Quay lại
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Đặt tour #{booking.booking_code}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Thông tin chi tiết về đơn đặt tour
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="px-6 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Làm mới
              </Button>
              <Button
                variant="outline"
                onClick={handleExportPDF}
                className="px-6 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Xuất PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tổng quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Trạng thái đơn hàng
              </div>
              {getStatusBadge(booking.status)}
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Trạng thái thanh toán
              </div>
              {getPaymentStatusBadge(booking.stripe_session_id ? "succeeded" : "pending")}
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Số người tham gia
              </div>
              <div className="font-bold text-2xl text-gray-900 dark:text-white">
                {booking.number_of_participants}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">người</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Tổng giá trị
              </div>
              <div className="font-bold text-2xl text-green-600 dark:text-green-400">
                {formatCurrency(booking.final_price)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin đơn hàng */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Thông tin đơn hàng
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Mã booking
                  </label>
                  <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                    {booking.booking_code}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ngày đặt
                  </label>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(booking.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ngày khởi hành
                  </label>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(booking.tour_date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Số người tham gia
                  </label>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.number_of_participants} người
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                  Chi tiết giá
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tổng tiền gốc:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(booking.total_price)}
                    </span>
                  </div>
                  {booking.discount_amount && booking.discount_amount !== "0.00" && (
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>Giảm giá:</span>
                      <span className="font-medium">
                        -{formatCurrency(booking.discount_amount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-green-600 dark:text-green-400 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span>Giá cuối cùng:</span>
                    <span>{formatCurrency(booking.final_price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin khách hàng */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Thông tin khách hàng
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Họ và tên
                </label>
                <p className="font-semibold text-xl text-gray-900 dark:text-white">
                  {booking.booker.first_name} {booking.booker.last_name}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <p className="font-medium">
                  <a
                    href={`mailto:${booking.booker.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                  >
                    {booking.booker.email}
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Số điện thoại
                </label>
                <p className="font-medium">
                  <a
                    href={`tel:${booking.booker.phone_number}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                  >
                    {booking.booker.phone_number}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin tour */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Thông tin tour</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tên tour
                </label>
                <p className="font-semibold text-xl text-gray-900 dark:text-white leading-relaxed">
                  {booking.tour.title}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Mã tour
                </label>
                <p className="font-medium text-blue-600 dark:text-blue-400">
                  {booking.tour.product_code}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Giá gốc
                  </label>
                  <p className="font-medium text-gray-500 dark:text-gray-400 line-through">
                    {formatCurrency(booking.tour.original_price)}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Giá khuyến mại
                  </label>
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(booking.tour.sale_price)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ngày khởi hành
                </label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(booking.tour_date).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin thanh toán */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Thông tin thanh toán
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Trạng thái
                  </label>
                  <div>
                    {getPaymentStatusBadge(booking.stripe_session_id ? "succeeded" : "pending")}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Số tiền
                  </label>
                  <p className="font-bold text-2xl text-green-600 dark:text-green-400">
                    {formatCurrency(booking.final_price)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phương thức thanh toán
                </label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {booking.stripe_session_id ? "Stripe (Thẻ tín dụng/Debit)" : "Chưa thanh toán"}
                </p>
              </div>

              {booking.stripe_session_id && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Stripe Session ID
                  </label>
                  <p className="font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-3 rounded-lg border">
                    {booking.stripe_session_id}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thông tin người tham gia */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Danh sách người tham gia ({booking.participants.length} người)
          </h3>
          <div>
            <div className="space-y-6">
              {booking.participants.map((participant, index) => (
                <div
                  key={participant.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    Người tham gia #{index + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Họ và tên
                      </label>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {participant.first_name} {participant.last_name}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Ngày sinh
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.date_of_birth
                          ? new Date(participant.date_of_birth).toLocaleDateString("vi-VN")
                          : "Chưa cung cấp"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Quốc tịch
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.nationality || "Chưa cung cấp"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Số hộ chiếu
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.passport_number || "Chưa cung cấp"}
                      </p>
                    </div>
                    {participant.special_requirements && (
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Yêu cầu đặc biệt
                        </label>
                        <p className="font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-700 p-3 rounded border">
                          {participant.special_requirements}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Voucher thông tin (nếu có) */}
        {booking.voucher_id && booking.discount_amount && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Thông tin voucher
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Voucher ID
                </label>
                <p className="font-semibold text-gray-900 dark:text-white">{booking.voucher_id}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Giá trị giảm
                </label>
                <p className="font-bold text-xl text-red-600 dark:text-red-400">
                  -{formatCurrency(booking.discount_amount)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline / History */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lịch sử thay đổi</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Booking được tạo</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(booking.created_at).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            {booking.updated_at !== booking.created_at && (
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Cập nhật lần cuối</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(booking.updated_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )}
            {booking.stripe_session_id && (
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Thanh toán đã được xử lý
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Phương thức: Stripe Payment
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
