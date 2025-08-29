"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Clock,
  Users,
  FileText,
  Download,
  RefreshCcw,
  Loader2,
} from "lucide-react";
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
            <FileText className="h-16 w-16 mx-auto mb-2" />
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
          <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Chi tiết đặt tour #{booking.booking_code}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Thông tin chi tiết về đơn đặt tour
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Làm mới
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              Xuất PDF
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Trạng thái đơn hàng
                </div>
                {getStatusBadge(booking.status)}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Trạng thái thanh toán
                </div>
                {getPaymentStatusBadge(booking.payment.status)}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Số người tham gia
                </div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                  {booking.number_of_participants} người
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tổng giá trị</div>
                <div className="font-semibold text-lg text-green-600 dark:text-green-400">
                  {formatCurrency(parseFloat(booking.final_price))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin đơn hàng */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <FileText className="mr-2 h-5 w-5" />
                Thông tin đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Mã booking
                  </label>
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    {booking.booking_code}
                  </p>
                </div>
                <div>
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
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ngày khởi hành
                  </label>
                  <p className="font-medium flex items-center text-gray-900 dark:text-white">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(booking.tour_date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Số người tham gia
                  </label>
                  <p className="font-medium flex items-center text-gray-900 dark:text-white">
                    <Users className="mr-1 h-4 w-4" />
                    {booking.number_of_participants} người
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Chi tiết giá</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tổng tiền gốc:</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(parseFloat(booking.total_price))}
                    </span>
                  </div>
                  {booking.discount_amount !== "0.00" && (
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>Giảm giá:</span>
                      <span>-{formatCurrency(parseFloat(booking.discount_amount))}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-green-600 dark:text-green-400">
                    <span>Giá cuối cùng:</span>
                    <span>{formatCurrency(parseFloat(booking.final_price))}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin khách hàng */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <User className="mr-2 h-5 w-5" />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Họ và tên
                </label>
                <p className="font-medium text-lg text-gray-900 dark:text-white">
                  {booking.tour_booker.first_name} {booking.tour_booker.last_name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <p className="font-medium flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <a
                    href={`mailto:${booking.tour_booker.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {booking.tour_booker.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Số điện thoại
                </label>
                <p className="font-medium flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <a
                    href={`tel:${booking.tour_booker.phone_number}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {booking.tour_booker.phone_number}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin tour */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <MapPin className="mr-2 h-5 w-5" />
                Thông tin tour
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tên tour
                </label>
                <p className="font-medium text-lg text-gray-900 dark:text-white">
                  {booking.tour.title}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Mã tour
                </label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {booking.tour.product_code}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Giá gốc
                  </label>
                  <p className="font-medium text-gray-500 dark:text-gray-400 line-through">
                    {formatCurrency(parseFloat(booking.tour.original_price))}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Giá khuyến mại
                  </label>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(parseFloat(booking.tour.sale_price))}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ngày khởi hành
                </label>
                <p className="font-medium flex items-center text-gray-900 dark:text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(booking.tour_date).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin thanh toán */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <CreditCard className="mr-2 h-5 w-5" />
                Thông tin thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Trạng thái
                  </label>
                  <div className="mt-1">{getPaymentStatusBadge(booking.payment.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Số tiền
                  </label>
                  <p className="font-medium text-lg text-green-600 dark:text-green-400">
                    {formatCurrency(parseFloat(booking.payment.amount))} {booking.payment.currency}
                  </p>
                </div>
              </div>

              {booking.payment.paid_at && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ngày thanh toán
                  </label>
                  <p className="font-medium flex items-center text-gray-900 dark:text-white">
                    <Clock className="mr-2 h-4 w-4" />
                    {new Date(booking.payment.paid_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ID thanh toán
                </label>
                <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 p-2 rounded">
                  {booking.payment.id}
                </p>
              </div>

              {booking.payment.stripe_payment_intent_id && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Stripe Payment Intent
                  </label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 p-2 rounded">
                    {booking.payment.stripe_payment_intent_id}
                  </p>
                </div>
              )}

              {booking.payment.transaction_id && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Transaction ID
                  </label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 p-2 rounded">
                    {booking.payment.transaction_id}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Thông tin người tham gia */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="dark:border-gray-700">
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Users className="mr-2 h-5 w-5" />
              Danh sách người tham gia ({booking.participants.length} người)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {booking.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Họ và tên
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.first_name} {participant.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Ngày sinh
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.date_of_birth
                          ? new Date(participant.date_of_birth).toLocaleDateString("vi-VN")
                          : "Chưa cung cấp"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Quốc tịch
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.nationality || "Chưa cung cấp"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Số hộ chiếu
                      </label>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {participant.passport_number || "Chưa cung cấp"}
                      </p>
                    </div>
                    {participant.special_requirements && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Yêu cầu đặc biệt
                        </label>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {participant.special_requirements}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Voucher thông tin (nếu có) */}
        {booking.voucher && (
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader className="dark:border-gray-700">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <FileText className="mr-2 h-5 w-5" />
                Thông tin voucher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Mã voucher
                  </label>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.voucher.code}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Giá trị giảm
                  </label>
                  <p className="font-medium text-red-600 dark:text-red-400">
                    -{formatCurrency(parseFloat(booking.discount_amount))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline / History */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="dark:border-gray-700">
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Clock className="mr-2 h-5 w-5" />
              Lịch sử thay đổi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Booking được tạo</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Cập nhật lần cuối</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
              {booking.payment.paid_at && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Thanh toán thành công
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(booking.payment.paid_at).toLocaleDateString("vi-VN", {
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
