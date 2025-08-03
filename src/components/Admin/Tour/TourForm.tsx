"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, DollarSign, MapPin, Save, Upload, X } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// APIs & Types
import { getAllCategories } from "@/config/categoryTour/categoryTour.api";
import { createTour, getTourById, updateTour } from "@/config/tour/tour.api";
import { uploadImage } from "@/config/upload/upload.api";
import { TourPayload } from "@/types/tour.type";

// Schema validation
const tourSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  card_description: z.string().optional(),
  cover: z.string().optional(),
  location: z.string().optional(),
  meeting_point: z.string().optional(),
  age_requirement: z.string().optional(),
  tour_days: z.number().min(1, "Số ngày phải lớn hơn 0"),
  tour_nights: z.number().min(0, "Số đêm phải lớn hơn hoặc bằng 0"),
  participant_min: z.number().min(1, "Số người tối thiểu phải lớn hơn 0"),
  participant_max: z.number().min(1, "Số người tối đa phải lớn hơn 0"),
  original_price: z.number().min(0, "Giá gốc phải lớn hơn hoặc bằng 0"),
  sale_price: z.number().min(0, "Giá bán phải lớn hơn hoặc bằng 0"),
  product_code: z.string().min(1, "Mã sản phẩm không được để trống"),
  category_id: z.string().optional(),
  meta_data: z.object({
    status: z.enum(["draft", "published"]),
    is_featured: z.boolean(),
    is_top: z.boolean(),
    show_in_footer: z.boolean(),
    sort: z.number().optional(),
  }),
});

type TourFormData = z.infer<typeof tourSchema>;

interface TourFormProps {
  tourId?: string;
  onSuccess?: () => void;
}

const TourForm: React.FC<TourFormProps> = ({ tourId, onSuccess }) => {
  const isEdit = !!tourId;
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = React.useState(false);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      description: "",
      card_description: "",
      cover: "",
      location: "",
      meeting_point: "",
      age_requirement: "",
      tour_days: 1,
      tour_nights: 0,
      participant_min: 1,
      participant_max: 20,
      original_price: 0,
      sale_price: 0,
      product_code: "",
      category_id: "",
      meta_data: {
        status: "draft",
        is_featured: false,
        is_top: false,
        show_in_footer: false,
        sort: 0,
      },
    },
  });

  // Fetch tour data if editing
  const { data: tourData, isLoading: isLoadingTour } = useQuery({
    queryKey: ["tour-detail", tourId],
    queryFn: () => getTourById(tourId!),
    enabled: isEdit,
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Fill form when editing
  React.useEffect(() => {
    if (isEdit && tourData?.data?.tour) {
      const tour = tourData.data.tour;
      reset({
        title: tour.title,
        description: tour.description,
        card_description: tour.card_description || "",
        cover: tour.cover || "",
        location: tour.location || "",
        meeting_point: tour.meeting_point || "",
        age_requirement: tour.age_requirement || "",
        tour_days: tour.tour_days,
        tour_nights: tour.tour_nights,
        participant_min: tour.participant_min,
        participant_max: tour.participant_max,
        original_price: tour.original_price,
        sale_price: tour.sale_price,
        product_code: tour.product_code,
        category_id: tour.category?.id || "",
        meta_data: {
          status: tour.meta_data.status as "draft" | "published",
          is_featured: tour.meta_data.is_featured,
          is_top: tour.meta_data.is_top,
          show_in_footer: tour.meta_data.show_in_footer,
          sort: tour.meta_data.sort || 0,
        },
      });
    }
  }, [isEdit, tourData, reset]);

  // Create/Update mutations
  const createMutation = useMutation({
    mutationFn: createTour,
    onSuccess: () => {
      toast.success("Tạo tour thành công!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Có lỗi xảy ra khi tạo tour");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TourPayload }) => updateTour(id, data),
    onSuccess: () => {
      toast.success("Cập nhật tour thành công!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      queryClient.invalidateQueries({ queryKey: ["tour-detail", tourId] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Có lỗi xảy ra khi cập nhật tour");
    },
  });

  // File upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File không được vượt quá 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadImage(formData);
      if (response?.data?.url) {
        setValue("cover", response.data.url);
        toast.success("Upload ảnh thành công!");
      }
    } catch (error) {
      toast.error("Upload ảnh thất bại");
    } finally {
      setIsUploading(false);
    }
  };

  // Form submission
  const onSubmit = (data: TourFormData) => {
    const payload: TourPayload = {
      ...data,
      meta_data: {
        ...data.meta_data,
        date_created: isEdit
          ? tourData?.data?.tour?.meta_data?.date_created
          : new Date().toISOString(),
        date_updated: new Date().toISOString(),
      },
    };

    if (isEdit && tourId) {
      updateMutation.mutate({ id: tourId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const watchedCover = watch("cover");
  const watchedOriginalPrice = watch("original_price");
  const watchedSalePrice = watch("sale_price");

  if (isEdit && isLoadingTour) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="details">Chi tiết</TabsTrigger>
          <TabsTrigger value="pricing">Giá & Thời gian</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề tour *</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập tiêu đề tour"
                      className={errors.title ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Nhập mô tả tour"
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              {/* Card Description */}
              <div className="space-y-2">
                <Label htmlFor="card_description">Mô tả ngắn</Label>
                <Controller
                  name="card_description"
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} placeholder="Mô tả ngắn hiển thị trên card" rows={2} />
                  )}
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label htmlFor="cover">Ảnh đại diện</Label>
                <div className="flex items-center gap-4">
                  {watchedCover && (
                    <div className="relative">
                      <img
                        src={watchedCover}
                        alt="Cover"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => setValue("cover", "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label htmlFor="cover-upload">
                      <Button type="button" variant="outline" disabled={isUploading} asChild>
                        <span className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          {isUploading ? "Đang upload..." : "Chọn ảnh"}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Code */}
              <div className="space-y-2">
                <Label htmlFor="product_code">Mã sản phẩm *</Label>
                <Controller
                  name="product_code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="VD: TOUR001"
                      className={errors.product_code ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.product_code && (
                  <p className="text-sm text-red-500">{errors.product_code.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category_id">Danh mục</Label>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData?.data?.categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Thông tin chi tiết
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Địa điểm</Label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="VD: Hà Nội, Việt Nam" />}
                />
              </div>

              {/* Meeting Point */}
              <div className="space-y-2">
                <Label htmlFor="meeting_point">Điểm hẹn</Label>
                <Controller
                  name="meeting_point"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Mô tả điểm hẹn và thời gian tập trung"
                      rows={3}
                    />
                  )}
                />
              </div>

              {/* Age Requirement */}
              <div className="space-y-2">
                <Label htmlFor="age_requirement">Yêu cầu độ tuổi</Label>
                <Controller
                  name="age_requirement"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="VD: 16+ tuổi" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing & Time Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Thời gian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tour_days">Số ngày *</Label>
                    <Controller
                      name="tour_days"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          className={errors.tour_days ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.tour_days && (
                      <p className="text-sm text-red-500">{errors.tour_days.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tour_nights">Số đêm *</Label>
                    <Controller
                      name="tour_nights"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className={errors.tour_nights ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.tour_nights && (
                      <p className="text-sm text-red-500">{errors.tour_nights.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="participant_min">Số người tối thiểu *</Label>
                    <Controller
                      name="participant_min"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          className={errors.participant_min ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.participant_min && (
                      <p className="text-sm text-red-500">{errors.participant_min.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participant_max">Số người tối đa *</Label>
                    <Controller
                      name="participant_max"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          className={errors.participant_max ? "border-red-500" : ""}
                        />
                      )}
                    />
                    {errors.participant_max && (
                      <p className="text-sm text-red-500">{errors.participant_max.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Giá cả
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="original_price">Giá gốc *</Label>
                  <Controller
                    name="original_price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        step="1000"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        className={errors.original_price ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.original_price && (
                    <p className="text-sm text-red-500">{errors.original_price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sale_price">Giá bán *</Label>
                  <Controller
                    name="sale_price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        step="1000"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        className={errors.sale_price ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.sale_price && (
                    <p className="text-sm text-red-500">{errors.sale_price.message}</p>
                  )}
                </div>

                {/* Discount Display */}
                {watchedOriginalPrice > 0 &&
                  watchedSalePrice > 0 &&
                  watchedSalePrice !== watchedOriginalPrice && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-700">
                        Giảm giá:{" "}
                        <span className="font-semibold">
                          {Math.round(
                            ((watchedOriginalPrice - watchedSalePrice) / watchedOriginalPrice) * 100
                          )}
                          %
                        </span>
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hiển thị</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Controller
                  name="meta_data.status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Nháp</SelectItem>
                        <SelectItem value="published">Đã xuất bản</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_featured">Tour nổi bật</Label>
                    <p className="text-sm text-gray-500">Hiển thị tour ở vị trí nổi bật</p>
                  </div>
                  <Controller
                    name="meta_data.is_featured"
                    control={control}
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_top">Tour TOP</Label>
                    <p className="text-sm text-gray-500">Đánh dấu là tour TOP</p>
                  </div>
                  <Controller
                    name="meta_data.is_top"
                    control={control}
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show_in_footer">Hiển thị ở footer</Label>
                    <p className="text-sm text-gray-500">Hiển thị tour trong footer website</p>
                  </div>
                  <Controller
                    name="meta_data.show_in_footer"
                    control={control}
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label htmlFor="sort">Thứ tự sắp xếp</Label>
                <Controller
                  name="meta_data.sort"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="0"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  )}
                />
                <p className="text-sm text-gray-500">Số càng nhỏ càng hiển thị trước</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess?.()}
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
          <Save className="mr-2 h-4 w-4" />
          {createMutation.isPending || updateMutation.isPending
            ? "Đang lưu..."
            : isEdit
              ? "Cập nhật"
              : "Tạo mới"}
        </Button>
      </div>
    </form>
  );
};

export default TourForm;
