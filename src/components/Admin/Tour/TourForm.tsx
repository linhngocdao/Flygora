"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  DollarSign,
  ImagePlus,
  MapPin,
  Plus,
  Save,
  Star,
  Trash2,
  Video,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconUpload } from "@/components/ui/IconUpload";
import { Input } from "@/components/ui/input";
import { MultipleImageUpload } from "@/components/ui/MultipleImageUpload";
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
import { VideoUpload } from "@/components/ui/VideoUpload";
import { CategorySelect } from "@/components/ui/CategorySelect";
import { TourFormSchema } from "@/lib/validations/tour.validation";

type TourFormValues = z.infer<typeof TourFormSchema>;

const TourForm = () => {
  const form = useForm<TourFormValues>({
    resolver: zodResolver(TourFormSchema),
    defaultValues: {
      title: "",
      description: "",
      age_requirement: "",
      original_price: 0,
      sale_price: 0,
      product_code: "",
      tour_category_id: "",
      status: "unpublished",
      tour_images: [{ image_url: "", caption: "", sort_order: 1 }],
      tour_intenerary: [{ session: "", title: "", description: "", sort_order: 1 }],
      tour_inclusions: [{ title: "", description: "", sort_order: 1 }],
      videos: [{ url: "", title: "", sort_order: 1 }],
      tour_highlights: [{ icon: "", title: "", sort_order: 1 }],
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "tour_images",
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control: form.control,
    name: "tour_intenerary",
  });

  const {
    fields: inclusionFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control: form.control,
    name: "tour_inclusions",
  });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control: form.control,
    name: "videos",
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: "tour_highlights",
  });

  const onSubmit = (data: TourFormValues) => {
    console.log("Submitted Data:", data);
    console.log("Form Data:", JSON.stringify(data, null, 2));
  };

  const watchedValues = form.watch();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="pricing">Giá & Thời gian</TabsTrigger>
              <TabsTrigger value="details">Chi tiết tour</TabsTrigger>
              <TabsTrigger value="content">Nội dung & Media</TabsTrigger>
              <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt hiển thị</TabsTrigger>
            </TabsList>

            {/* Tab 1: Thông tin cơ bản */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản của tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề tour *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: Tour Sapa 3 ngày 2 đêm - Chinh phục Fansipan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả chi tiết tour *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mô tả đầy đủ về tour, các hoạt động, địa điểm..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="card_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả ngắn cho card</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mô tả ngắn gọn hiển thị trên card tour"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="product_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã sản phẩm *</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: TOUR001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tour_category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh mục tour *</FormLabel>
                          <FormControl>
                            <CategorySelect
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Mời bạn chọn danh mục"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cover"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh đại diện tour</FormLabel>
                        <FormControl>
                          <MultipleImageUpload {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_header"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh header trang chi tiết</FormLabel>
                        <FormControl>
                          <MultipleImageUpload {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_in_menu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh hiển thị trong menu</FormLabel>
                        <FormControl>
                          <MultipleImageUpload {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Giá & Thời gian */}
            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" /> Thời gian & Số lượng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="tour_days"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số ngày tour</FormLabel>
                            <FormControl>
                              <Input placeholder="VD: 3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tour_nights"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số đêm</FormLabel>
                            <FormControl>
                              <Input placeholder="VD: 2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="participant_min"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số người tối thiểu</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="VD: 2"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="participant_max"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số người tối đa</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="VD: 20"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" /> Giá cả
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="original_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá gốc (VNĐ) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="VD: 2000000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sale_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá bán (VNĐ) *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="VD: 1800000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Chi tiết tour */}
            <TabsContent value="details" className="space-y-6">
              {/* Thông tin địa điểm & Yêu cầu */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Thông tin địa điểm & Yêu cầu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa điểm tour *</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: Sapa, Lào Cai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age_requirement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yêu cầu độ tuổi</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: 18+ hoặc 12-65 tuổi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="the_area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Khu vực hoạt động</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả khu vực diễn ra tour..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weather_condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Điều kiện thời tiết</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Thông tin về thời tiết khu vực..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="meeting_point"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Điểm hẹn & thời gian tập trung</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="VD: 8:00 sáng tại văn phòng công ty, 123 Đường ABC, Quận 1, TP.HCM"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Dịch vụ & Logistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Dịch vụ & Logistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="languages_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngôn ngữ hướng dẫn</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: Tiếng Việt, English" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transfers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Điểm đón trả khách</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Danh sách các điểm đón trả khách..."
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="food"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ẩm thực</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả về ẩm thực trong tour..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="logistics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logistics & Vận chuyển</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Thông tin về logistics và vận chuyển..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="optional_extra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dịch vụ kèm thêm (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Các dịch vụ tùy chọn có thể đặt thêm..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="campsites"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Khu cắm trại</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả về khu vực cắm trại (nếu có)..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Chuẩn bị & Đồ dùng */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Chuẩn bị & Đồ dùng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title_kitlist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề danh sách đồ dùng</FormLabel>
                        <FormControl>
                          <Input placeholder="VD: Đồ dùng cần mang theo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kitlist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh sách đồ dùng cần mang</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Liệt kê các đồ dùng khách cần chuẩn bị..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Chính sách & Quy trình */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Chính sách & Quy trình
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tour_booking_process"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quy trình đặt tour</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả các bước đặt tour..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tour_cancellation_policy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chính sách hủy tour</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Các điều khoản và điều kiện hủy tour..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Bản đồ & Hiển thị */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Bản đồ & Hiển thị
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="map_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề bản đồ</FormLabel>
                        <FormControl>
                          <Input placeholder="Tiêu đề hiển thị trên bản đồ tour" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 4: Nội dung & Media */}
            <TabsContent value="content" className="space-y-6">
              {/* Hình ảnh */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImagePlus className="h-5 w-5" /> Album hình ảnh tour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Hình ảnh {index + 1}</h4>
                        {imageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name={`tour_images.${index}.image_url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL hình ảnh</FormLabel>
                            <FormControl>
                              <MultipleImageUpload
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Upload hoặc nhập URL hình ảnh"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tour_images.${index}.caption`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chú thích hình ảnh</FormLabel>
                              <FormControl>
                                <Input placeholder="VD: Cảnh đẹp núi rừng Sapa" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tour_images.${index}.sort_order`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thứ tự hiển thị</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="VD: 1"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendImage({
                        image_url: "",
                        caption: "",
                        sort_order: imageFields.length + 1,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm hình ảnh
                  </Button>
                </CardContent>
              </Card>

              {/* Video */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" /> Video giới thiệu tour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {videoFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Video {index + 1}</h4>
                        {videoFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeVideo(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name={`videos.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link video</FormLabel>
                            <FormControl>
                              <VideoUpload
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="VD: https://youtube.com/watch?v=..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`videos.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tiêu đề video</FormLabel>
                              <FormControl>
                                <Input placeholder="VD: Video giới thiệu tour Sapa" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`videos.${index}.sort_order`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thứ tự hiển thị</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="VD: 1"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendVideo({ url: "", title: "", sort_order: videoFields.length + 1 })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm video
                  </Button>
                </CardContent>
              </Card>

              {/* Điểm nổi bật */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" /> Điểm nổi bật của tour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {highlightFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Điểm nổi bật {index + 1}</h4>
                        {highlightFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeHighlight(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`tour_highlights.${index}.icon`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <FormControl>
                                <IconUpload
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                  placeholder="VD: fas fa-mountain"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tour_highlights.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tiêu đề nổi bật</FormLabel>
                              <FormControl>
                                <Input placeholder="VD: Chinh phục đỉnh Fansipan" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tour_highlights.${index}.sort_order`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thứ tự hiển thị</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="VD: 1"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendHighlight({
                        icon: "",
                        title: "",
                        sort_order: highlightFields.length + 1,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm điểm nổi bật
                  </Button>
                </CardContent>
              </Card>

              {/* Hành trình */}
              <Card>
                <CardHeader>
                  <CardTitle>Hành trình chi tiết (Itinerary)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {itineraryFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Hành trình {index + 1}</h4>
                        {itineraryFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItinerary(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tour_intenerary.${index}.session`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Buổi / Session</FormLabel>
                              <FormControl>
                                <Input placeholder="VD: Ngày 1 - Sáng" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tour_intenerary.${index}.sort_order`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thứ tự hành trình</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="VD: 1"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`tour_intenerary.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tiêu đề hành trình</FormLabel>
                            <FormControl>
                              <Input placeholder="VD: Khởi hành đến Sapa" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`tour_intenerary.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả chi tiết hành trình</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Mô tả chi tiết các hoạt động trong hành trình này..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendItinerary({
                        session: "",
                        title: "",
                        description: "",
                        sort_order: itineraryFields.length + 1,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm hành trình
                  </Button>
                </CardContent>
              </Card>

              {/* Dịch vụ bao gồm */}
              <Card>
                <CardHeader>
                  <CardTitle>Dịch vụ bao gồm (Inclusions)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inclusionFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Dịch vụ {index + 1}</h4>
                        {inclusionFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeInclusion(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tour_inclusions.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tiêu đề dịch vụ</FormLabel>
                              <FormControl>
                                <Input placeholder="VD: Bảo hiểm du lịch" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tour_inclusions.${index}.sort_order`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Thứ tự hiển thị</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="VD: 1"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`tour_inclusions.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả chi tiết dịch vụ</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Mô tả chi tiết về dịch vụ này..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendInclusion({
                        title: "",
                        description: "",
                        sort_order: inclusionFields.length + 1,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm dịch vụ
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 5: SEO & Meta */}
            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin SEO & Meta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="meta_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề SEO (Meta Title)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: Tour Sapa 3 ngày 2 đêm - Chinh phục Fansipan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả SEO (Meta Description)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mô tả ngắn gọn cho tìm kiếm Google (160 ký tự)"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_keyword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Từ khóa SEO (Meta Keywords)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: tour sapa, fansipan, du lịch sapa, tour miền bắc"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh SEO (Meta Image)</FormLabel>
                        <FormControl>
                          <MultipleImageUpload {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 6: Cài đặt hiển thị */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt hiển thị & Trạng thái</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trạng thái tour</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái tour" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="published">Đã xuất bản</SelectItem>
                            <SelectItem value="unpublished">Chưa xuất bản</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="label_hot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label Hot</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: HOT" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="label_discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label giảm giá</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: -20%" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="is_featured"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Tour nổi bật</FormLabel>
                          <p className="text-sm text-gray-500">
                            Hiển thị ở vị trí nổi bật trên trang chủ
                          </p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_top"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Tour TOP</FormLabel>
                          <p className="text-sm text-gray-500">Đánh dấu là tour TOP chất lượng</p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="show_in_footer"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Hiển thị ở footer</FormLabel>
                          <p className="text-sm text-gray-500">
                            Hiển thị tour trong footer website
                          </p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thứ tự sắp xếp</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="VD: 1 (càng nhỏ càng ưu tiên hiển thị)"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button type="button" variant="outline">
                Hủy
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Lưu tour
              </Button>
            </div>
          </Tabs>
        </form>
      </Form>

      {/* Debug Panel */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-medium mb-2">Form Values (Debug):</h3>
        <pre className="text-xs overflow-auto max-h-96">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TourForm;
