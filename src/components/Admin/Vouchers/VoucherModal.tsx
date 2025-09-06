import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { voucherPayloadCreate, voucherResponse } from "@/types/voucher.type";
import { getPrivateTours } from "@/config/tour/tour.api";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema xác thực dữ liệu voucher
const voucherSchema = z.object({
  code: z.string().min(3, "Mã voucher phải có ít nhất 3 ký tự"),
  description: z.string().optional(),
  discount_type: z.enum(["percentage", "fixed_amount"]),
  discount_value: z.number().min(1, "Giá trị giảm phải lớn hơn 0"),
  minimum_order_value: z.number().optional(),
  maximum_discount_amount: z.number().optional(),
  valid_from: z.string(),
  valid_to: z.string(),
  max_uses: z.number().min(1, "Số lượt sử dụng phải lớn hơn 0"),
  is_active: z.boolean().optional(),
  applicable_tour_ids: z.array(z.string()).optional(),
});

export interface VoucherModalRef {
  openModal: (voucher?: voucherResponse) => void;
  openDuplicateModal: (voucher: voucherResponse) => void;
}

interface VoucherModalProps {
  onSave: (data: voucherPayloadCreate, editingVoucher?: voucherResponse) => void;
  duplicateMutation: any;
}

const VoucherModal = forwardRef<VoucherModalRef, VoucherModalProps>(
  ({ onSave, duplicateMutation }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [editingVoucher, setEditingVoucher] = React.useState<voucherResponse | undefined>(
      undefined
    );
    const [isDuplicate, setIsDuplicate] = React.useState(false);
    const [isActiveState, setIsActiveState] = React.useState(true);
    const [validFromDate, setValidFromDate] = React.useState<Date>();
    const [validToDate, setValidToDate] = React.useState<Date>();
    const [selectedTourIds, setSelectedTourIds] = React.useState<string[]>([]);
    const [tourSearchQuery, setTourSearchQuery] = useState("");

    // Fetch tours data
    const { data: toursData, isLoading: toursLoading } = useQuery({
      queryKey: ["tours-for-voucher", tourSearchQuery],
      queryFn: () =>
        getPrivateTours({
          query: tourSearchQuery || undefined,
          limit: 50,
          status: "published",
        }),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const tours = React.useMemo(() => toursData?.data?.tours || [], [toursData?.data?.tours]);

    // Khởi tạo form với react-hook-form và zod
    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors, isSubmitting },
    } = useForm<voucherPayloadCreate>({
      resolver: zodResolver(voucherSchema),
      defaultValues: {
        code: "",
        description: "",
        discount_type: "percentage",
        discount_value: 0,
        minimum_order_value: undefined,
        maximum_discount_amount: undefined,
        valid_from: "",
        valid_to: "",
        max_uses: 1,
        is_active: true,
        applicable_tour_ids: [],
      },
    });

    // Hàm mở modal thêm/sửa
    const openModal = (voucher?: voucherResponse) => {
      setIsDuplicate(false);
      setEditingVoucher(voucher);
      setOpen(true);
      if (voucher) {
        setIsActiveState(voucher.is_active);
        setValidFromDate(voucher.valid_from ? new Date(voucher.valid_from) : undefined);
        setValidToDate(voucher.valid_to ? new Date(voucher.valid_to) : undefined);
        setSelectedTourIds(voucher.applicable_tour_ids || []);
        reset({
          code: voucher.code,
          description: voucher.description || "",
          discount_type: voucher.discount_type,
          discount_value: Number(voucher.discount_value),
          minimum_order_value: voucher.minimum_order_value
            ? Number(voucher.minimum_order_value)
            : undefined,
          maximum_discount_amount: voucher.maximum_discount_amount
            ? Number(voucher.maximum_discount_amount)
            : undefined,
          valid_from: voucher.valid_from,
          valid_to: voucher.valid_to,
          max_uses: voucher.max_uses,
          is_active: voucher.is_active,
          applicable_tour_ids: voucher.applicable_tour_ids || [],
        });
      } else {
        setIsActiveState(true);
        setValidFromDate(undefined);
        setValidToDate(undefined);
        setSelectedTourIds([]);
        reset({
          code: "",
          description: "",
          discount_type: "percentage",
          discount_value: 0,
          minimum_order_value: undefined,
          maximum_discount_amount: undefined,
          valid_from: "",
          valid_to: "",
          max_uses: 1,
          is_active: true,
          applicable_tour_ids: [],
        });
      }
    };

    // Hàm mở modal duplicate
    const openDuplicateModal = (voucher: voucherResponse) => {
      setIsDuplicate(true);
      setEditingVoucher(voucher);
      setOpen(true);
      setIsActiveState(voucher.is_active);
      setValidFromDate(voucher.valid_from ? new Date(voucher.valid_from) : undefined);
      setValidToDate(voucher.valid_to ? new Date(voucher.valid_to) : undefined);
      setSelectedTourIds(voucher.applicable_tour_ids || []);
      reset({
        code: voucher.code + "-copy",
        description: voucher.description || "",
        discount_type: voucher.discount_type,
        discount_value: Number(voucher.discount_value),
        minimum_order_value: voucher.minimum_order_value
          ? Number(voucher.minimum_order_value)
          : undefined,
        maximum_discount_amount: voucher.maximum_discount_amount
          ? Number(voucher.maximum_discount_amount)
          : undefined,
        valid_from: voucher.valid_from,
        valid_to: voucher.valid_to,
        max_uses: voucher.max_uses,
        is_active: voucher.is_active,
        applicable_tour_ids: voucher.applicable_tour_ids || [],
      });
    };

    // expose các hàm cho parent
    useImperativeHandle(ref, () => ({ openModal, openDuplicateModal }));

    const onSubmit = async (data: voucherPayloadCreate) => {
      try {
        const submitData = {
          ...data,
          is_active: isActiveState,
          valid_from: validFromDate ? format(validFromDate, "yyyy-MM-dd") : "",
          valid_to: validToDate ? format(validToDate, "yyyy-MM-dd") : "",
          applicable_tour_ids: selectedTourIds,
        };

        if (isDuplicate && editingVoucher) {
          // Gọi mutation duplicate
          await duplicateMutation.mutateAsync({
            id: editingVoucher.id,
            payload: {
              new_code: submitData.code,
              valid_from: submitData.valid_from,
              valid_to: submitData.valid_to,
            },
          });
          setOpen(false);
          return;
        }
        await onSave(submitData, editingVoucher);
        setOpen(false);
      } catch (error) {
        console.error("Submit error:", error);
      }
    };

    // Đóng modal
    const handleClose = () => {
      setOpen(false);
      setEditingVoucher(undefined);
      setIsDuplicate(false);
      setIsActiveState(true);
      setValidFromDate(undefined);
      setValidToDate(undefined);
      setSelectedTourIds([]);
      setTourSearchQuery("");
      reset();
    };

    // Handle tour selection
    const handleTourToggle = React.useCallback((tourId: string) => {
      setSelectedTourIds((prev) =>
        prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
      );
    }, []);

    const handleSelectAllTours = React.useCallback(() => {
      const allTourIds = tours.map((tour) => tour.id);
      setSelectedTourIds(allTourIds);
    }, [tours]);

    const handleDeselectAllTours = React.useCallback(() => {
      setSelectedTourIds([]);
    }, []);

    const removeTourFromSelection = React.useCallback((tourId: string) => {
      setSelectedTourIds((prev) => prev.filter((id) => id !== tourId));
    }, []);

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        {/* Đảm bảo nội dung modal có thể scroll khi vượt quá chiều cao */}
        <DialogContent
          style={{ maxWidth: "1200px", width: "90vw", maxHeight: "90vh" }}
          className="overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {isDuplicate ? (
                <>Tạo bản sao voucher</>
              ) : editingVoucher ? (
                <>Chỉnh sửa voucher</>
              ) : (
                <>Thêm voucher mới</>
              )}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Thông tin cơ bản */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mã voucher */}
                  <div className="space-y-2">
                    <Label htmlFor="code">Mã voucher *</Label>
                    <Input
                      id="code"
                      placeholder="Nhập mã voucher..."
                      {...register("code")}
                      className={`font-mono ${errors.code ? "border-red-500" : ""}`}
                    />
                    {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
                  </div>

                  {/* Trạng thái */}
                  <div className="space-y-2">
                    <Label htmlFor="is_active">Trạng thái</Label>
                    <div className="flex items-center space-x-2 pt-1">
                      <Switch
                        id="is_active"
                        checked={isActiveState}
                        onCheckedChange={setIsActiveState}
                      />
                      <span className="text-sm">{isActiveState ? "Hoạt động" : "Vô hiệu hóa"}</span>
                    </div>
                  </div>

                  {/* Mô tả */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Nhập mô tả voucher..."
                      {...register("description")}
                      rows={3}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thông tin giảm giá */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  Thông tin giảm giá
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Loại giảm giá */}
                  <div className="space-y-2">
                    <Label htmlFor="discount_type">Loại giảm giá *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("discount_type", value as "percentage" | "fixed_amount")
                      }
                      defaultValue={watch("discount_type")}
                    >
                      <SelectTrigger className={errors.discount_type ? "border-red-500" : ""}>
                        <SelectValue placeholder="Chọn loại giảm giá" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <div className="flex items-center gap-2">Phần trăm (%)</div>
                        </SelectItem>
                        <SelectItem value="fixed_amount">
                          <div className="flex items-center gap-2">Số tiền cố định (₫)</div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.discount_type && (
                      <p className="text-sm text-red-500">{errors.discount_type.message}</p>
                    )}
                  </div>

                  {/* Giá trị giảm */}
                  <div className="space-y-2">
                    <Label htmlFor="discount_value">
                      Giá trị giảm *{watch("discount_type") === "percentage" ? " (%)" : " (₫)"}
                    </Label>
                    <Input
                      id="discount_value"
                      type="number"
                      placeholder={
                        watch("discount_type") === "percentage"
                          ? "Nhập % giảm..."
                          : "Nhập số tiền..."
                      }
                      {...register("discount_value", { valueAsNumber: true })}
                      className={errors.discount_value ? "border-red-500" : ""}
                    />
                    {errors.discount_value && (
                      <p className="text-sm text-red-500">{errors.discount_value.message}</p>
                    )}
                  </div>

                  {/* Giá trị đơn hàng tối thiểu */}
                  <div className="space-y-2">
                    <Label htmlFor="minimum_order_value">Giá trị đơn hàng tối thiểu (₫)</Label>
                    <Input
                      id="minimum_order_value"
                      type="number"
                      placeholder="Nhập giá trị tối thiểu..."
                      {...register("minimum_order_value", {
                        setValueAs: (value) => (value === "" ? undefined : Number(value)),
                      })}
                      className={errors.minimum_order_value ? "border-red-500" : ""}
                    />
                    {errors.minimum_order_value && (
                      <p className="text-sm text-red-500">{errors.minimum_order_value.message}</p>
                    )}
                  </div>

                  {/* Giá trị giảm tối đa */}
                  <div className="space-y-2">
                    <Label htmlFor="maximum_discount_amount">Giá trị giảm tối đa (₫)</Label>
                    <Input
                      id="maximum_discount_amount"
                      type="number"
                      placeholder="Nhập giá trị giảm tối đa..."
                      {...register("maximum_discount_amount", {
                        setValueAs: (value) => (value === "" ? undefined : Number(value)),
                      })}
                      className={errors.maximum_discount_amount ? "border-red-500" : ""}
                    />
                    {errors.maximum_discount_amount && (
                      <p className="text-sm text-red-500">
                        {errors.maximum_discount_amount.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thời gian và sử dụng */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  Thời gian & Sử dụng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Hiệu lực từ */}
                  <div className="space-y-2">
                    <Label>Hiệu lực từ *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !validFromDate && "text-muted-foreground",
                            errors.valid_from && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {validFromDate ? (
                            format(validFromDate, "dd/MM/yyyy", { locale: vi })
                          ) : (
                            <span>Chọn ngày bắt đầu</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={validFromDate}
                          onSelect={setValidFromDate}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.valid_from && (
                      <p className="text-sm text-red-500">{errors.valid_from.message}</p>
                    )}
                  </div>

                  {/* Hiệu lực đến */}
                  <div className="space-y-2">
                    <Label>Hiệu lực đến *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !validToDate && "text-muted-foreground",
                            errors.valid_to && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {validToDate ? (
                            format(validToDate, "dd/MM/yyyy", { locale: vi })
                          ) : (
                            <span>Chọn ngày kết thúc</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={validToDate}
                          onSelect={setValidToDate}
                          initialFocus
                          locale={vi}
                          disabled={(date) => (validFromDate ? date < validFromDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.valid_to && (
                      <p className="text-sm text-red-500">{errors.valid_to.message}</p>
                    )}
                  </div>

                  {/* Số lượt sử dụng tối đa */}
                  <div className="space-y-2">
                    <Label htmlFor="max_uses">Số lượt sử dụng tối đa *</Label>
                    <Input
                      id="max_uses"
                      type="number"
                      min="1"
                      placeholder="Nhập số lượt..."
                      {...register("max_uses", { valueAsNumber: true })}
                      className={errors.max_uses ? "border-red-500" : ""}
                    />
                    {errors.max_uses && (
                      <p className="text-sm text-red-500">{errors.max_uses.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tour Selection */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  Áp dụng cho Tours
                </h3>

                {/* Selected Tours Display */}
                {selectedTourIds.length > 0 && (
                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-2 block">
                      Tours đã chọn ({selectedTourIds.length})
                    </Label>
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg max-h-32 overflow-y-auto">
                      {selectedTourIds.map((tourId) => {
                        const tour = tours.find((t) => t.id === tourId);
                        return (
                          <Badge
                            key={tourId}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <span className="max-w-[200px] truncate">
                              {tour?.title || `Tour ID: ${tourId}`}
                            </span>
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-red-500"
                              onClick={() => removeTourFromSelection(tourId)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Search Tours */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Tìm kiếm tours..."
                        value={tourSearchQuery}
                        onChange={(e) => setTourSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAllTours}
                        disabled={tours.length === 0}
                      >
                        Chọn tất cả
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleDeselectAllTours}
                        disabled={selectedTourIds.length === 0}
                      >
                        Bỏ chọn
                      </Button>
                    </div>
                  </div>

                  {/* Tours List */}
                  <div className="border rounded-lg">
                    <div className="h-64 overflow-y-auto">
                      {toursLoading ? (
                        <div className="flex items-center justify-center h-32">
                          <div className="flex items-center gap-2 text-gray-500">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                            Đang tải tours...
                          </div>
                        </div>
                      ) : tours.length === 0 ? (
                        <div className="flex items-center justify-center h-32 text-gray-500">
                          {tourSearchQuery ? "Không tìm thấy tour nào" : "Không có tour nào"}
                        </div>
                      ) : (
                        <div className="p-2">
                          {tours.map((tour) => (
                            <div
                              key={tour.id}
                              className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                            >
                              <Checkbox
                                checked={selectedTourIds.includes(tour.id)}
                                onCheckedChange={() => handleTourToggle(tour.id)}
                                className="mt-1"
                              />
                              <div
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => handleTourToggle(tour.id)}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-sm truncate">{tour.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {tour.product_code}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {tour.card_description || tour.description}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                  <span>{tour.location}</span>
                                  <span>
                                    {tour.tour_days}D{tour.tour_nights}N
                                  </span>
                                  <span className="font-medium text-green-600">
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(tour.sale_price)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Help Text */}
                  <p className="text-xs text-gray-500">
                    Để trống nếu voucher áp dụng cho tất cả tours. Chọn tours cụ thể nếu muốn giới
                    hạn phạm vi sử dụng.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Đang xử lý...
                  </div>
                ) : isDuplicate ? (
                  "Tạo bản sao"
                ) : editingVoucher ? (
                  "Cập nhật"
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

VoucherModal.displayName = "VoucherModal";

export default VoucherModal;
