"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getVoucherDetail } from "@/config/voucher/voucher.api";
import { voucherResponse } from "@/types/voucher.type";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Trang chi tiết voucher cho admin
const VoucherDetailPage = () => {
  // Lấy id voucher từ params
  const params = useParams();
  const id = params?.id as string;

  // Query lấy chi tiết voucher
  const { data, isLoading, error, refetch } = useQuery<voucherResponse>({
    queryKey: ["voucher-detail", id],
    queryFn: () => getVoucherDetail(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <Card className="p-6 text-center">Đang tải dữ liệu...</Card>;
  }

  if (error || !data) {
    return (
      <Card className="p-6 text-center text-red-600">
        <p>Có lỗi xảy ra khi tải chi tiết voucher.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Thử lại
        </Button>
      </Card>
    );
  }

  // Giao diện chi tiết voucher
  return (
    <Card className="p-6 max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Chi tiết voucher: {data.code}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <strong>Mô tả:</strong> {data.description || "Không có mô tả"}
        </div>
        <div>
          <strong>Loại giảm giá:</strong>{" "}
          {data.discount_type === "percentage" ? "Phần trăm" : "Số tiền"}
        </div>
        <div>
          <strong>Giá trị giảm:</strong>{" "}
          {data.discount_type === "percentage"
            ? `${data.discount_value}%`
            : `${data.discount_value}₫`}
        </div>
        <div>
          <strong>Đơn hàng tối thiểu:</strong> {data.minimum_order_value || "-"}
        </div>
        <div>
          <strong>Giá trị giảm tối đa:</strong> {data.maximum_discount_amount || "-"}
        </div>
        <div>
          <strong>Hiệu lực từ:</strong> {data.valid_from}
        </div>
        <div>
          <strong>Hiệu lực đến:</strong> {data.valid_to}
        </div>
        <div>
          <strong>Số lượt sử dụng tối đa:</strong> {data.max_uses}
        </div>
        <div>
          <strong>Số lượt đã sử dụng:</strong> {data.uses_count}
        </div>
        <div>
          <strong>Trạng thái:</strong>{" "}
          <Badge variant={data.is_active ? "default" : "secondary"}>
            {data.is_active ? "Hoạt động" : "Vô hiệu hóa"}
          </Badge>
        </div>
        <div>
          <strong>Người tạo:</strong> {data.creator?.name || "-"}
        </div>
        <div>
          <strong>Người cập nhật:</strong> {data.updater?.name || "-"}
        </div>
        <div>
          <strong>Ngày tạo:</strong> {data.created_at}
        </div>
        <div>
          <strong>Ngày cập nhật:</strong> {data.updated_at}
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          Quay lại
        </Button>
        <Button variant="default" onClick={() => refetch()}>
          Làm mới
        </Button>
      </div>
    </Card>
  );
};

export default VoucherDetailPage;
