"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Eye,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Clock,
  Image as ImageIcon,
  Video,
  List,
  CheckCircle,
  Lightbulb,
  Tag,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// APIs & Types
import { getTourById } from "@/config/tour/tour.api";
import { formatCurrency } from "@/utilities/currency";
import Image from "next/image";

const TourDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const tourId = params.id as string;

  // Fetch tour detail
  const {
    data: tourData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tour-detail", tourId],
    queryFn: () => getTourById(tourId),
    enabled: !!tourId,
  });

  const tour = tourData?.data?.tour;

  const handleEdit = () => {
    if (tour) {
      router.push(`/${locale}/admin/tour-manager/tours/${tour.id}/edit`);
    }
  };

  const handlePreview = () => {
    if (tour) {
      // Mở trang detail của web trong tab mới
      window.open(`/${locale}/tours/${tour.slug}`, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
        <div className="text-center bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Đang tải thông tin tour...</h3>
          <p className="text-sm text-gray-500 mt-1">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 ">Tour không tồn tại</h1>
          <p className="text-gray-600 mb-6">Không tìm thấy tour với ID: {tourId}</p>
          <Link href={`/${locale}/admin/tour-manager/tours`}>
            <Button className="shadow-md hover:shadow-lg transition-shadow">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/${locale}/admin/tour-manager/tours`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chi tiết tour</h1>
              <p className="text-gray-600 mt-1">Xem thông tin chi tiết và quản lý tour</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
            <Button onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              Xem trước
            </Button>
          </div>
        </div>

        {/* Tour Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 rounded-lg">
                <AvatarImage
                  src={tour.cover || "/images/homePage/placeholder-tour.jpg"}
                  alt={tour.title}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl font-bold">
                  {tour.title.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
                    <Badge
                      variant={tour.meta_data.status === "published" ? "default" : "secondary"}
                    >
                      {tour.meta_data.status === "published" ? "Đã xuất bản" : "Nháp"}
                    </Badge>
                    {tour.meta_data.is_featured && (
                      <Badge variant="destructive">
                        <Star className="h-3 w-3 mr-1" />
                        Nổi bật
                      </Badge>
                    )}
                    {tour.meta_data.is_top && <Badge variant="outline">TOP</Badge>}
                  </div>
                  <p className="text-gray-600 text-sm font-mono">#{tour.product_code}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{tour.location || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {tour.tour_days ? `${tour.tour_days}N` : ""}
                      {tour.tour_nights ? `${tour.tour_nights}Đ` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {tour.participant_min}-{tour.participant_max} người
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-green-600">
                      {formatCurrency(tour.sale_price)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 line-clamp-3">
                  {tour.card_description || tour.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="details">Chi tiết</TabsTrigger>
            <TabsTrigger value="itinerary">Lịch trình</TabsTrigger>
            <TabsTrigger value="inclusions">Bao gồm</TabsTrigger>
            <TabsTrigger value="highlights">Nổi bật</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Thông tin giá
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Giá gốc:</span>
                    <span
                      className={
                        tour.sale_price !== tour.original_price ? "line-through text-gray-400" : ""
                      }
                    >
                      {formatCurrency(tour.original_price)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Giá bán:</span>
                    <span className="text-green-600">{formatCurrency(tour.sale_price)}</span>
                  </div>
                  {tour.sale_price !== tour.original_price && (
                    <div className="flex justify-between text-red-600">
                      <span>Giảm giá:</span>
                      <span>
                        -
                        {Math.round(
                          ((tour.original_price - tour.sale_price) / tour.original_price) * 100
                        )}
                        %
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Thông tin nhóm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tối thiểu:</span>
                    <span>{tour.participant_min || 0} người</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tối đa:</span>
                    <span>{tour.participant_max || 0} người</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Độ tuổi:</span>
                    <span>{tour.age_requirement}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Phân loại
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Danh mục:</span>
                    <Badge variant="outline">{tour.category?.name || "Chưa phân loại"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sắp xếp:</span>
                    <span>{tour.meta_data.sort || "Không"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hiển thị footer:</span>
                    <Badge variant={tour.meta_data.show_in_footer ? "default" : "secondary"}>
                      {tour.meta_data.show_in_footer ? "Có" : "Không"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Thời gian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tạo:</span>
                    <span>{new Date(tour.meta_data.date_created).toLocaleDateString("vi-VN")}</span>
                  </div>
                  {tour.meta_data.date_updated && (
                    <div className="flex justify-between">
                      <span>Cập nhật:</span>
                      <span>
                        {new Date(tour.meta_data.date_updated).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mô tả tour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>{tour.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.tour_detail?.the_area && (
                <Card>
                  <CardHeader>
                    <CardTitle>Khu vực</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.tour_detail.the_area}</p>
                  </CardContent>
                </Card>
              )}

              {tour.tour_detail?.weather_condition && (
                <Card>
                  <CardHeader>
                    <CardTitle>Điều kiện thời tiết</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.tour_detail.weather_condition}</p>
                  </CardContent>
                </Card>
              )}

              {tour.tour_detail?.food && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ăn uống</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.tour_detail.food}</p>
                  </CardContent>
                </Card>
              )}

              {tour.tour_detail?.logistics && (
                <Card>
                  <CardHeader>
                    <CardTitle>Hậu cần</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.tour_detail.logistics}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {(tour.tour_detail?.kitlist || tour.tour_detail?.title_kitlist) && (
              <Card>
                <CardHeader>
                  <CardTitle>{tour.tour_detail.title_kitlist || "Danh sách đồ cần mang"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tour.tour_detail.kitlist}</p>
                </CardContent>
              </Card>
            )}

            {tour.meeting_point && (
              <Card>
                <CardHeader>
                  <CardTitle>Điểm hẹn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tour.meeting_point}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-6">
            {tour.tour_intenerary && tour.tour_intenerary.length > 0 ? (
              <div className="space-y-4">
                {tour.tour_intenerary
                  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                  .map((item, index) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          {item.session} - {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <List className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Chưa có lịch trình nào được thêm</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Inclusions Tab */}
          <TabsContent value="inclusions" className="space-y-6">
            {tour.tour_include && tour.tour_include.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.tour_include
                  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                  .map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Chưa có thông tin bao gồm nào</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Highlights Tab */}
          <TabsContent value="highlights" className="space-y-6">
            {tour.tour_highlights && tour.tour_highlights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tour.tour_highlights
                  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                  .map((item) => (
                    <Card key={item.id} className="text-center">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">{getIconByName(item.icon)}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Lightbulb className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Chưa có điểm nổi bật nào</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Hình ảnh ({tour.tour_detail_images?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tour.tour_detail_images && tour.tour_detail_images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {tour.tour_detail_images.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="w-full h-24 bg-gray-200 rounded-md overflow-hidden">
                            <Image
                              fill
                              src={image.image_url}
                              alt={image.caption || "Tour image"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {image.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-md">
                              {image.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Chưa có hình ảnh</p>
                  )}
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video ({tour.videos?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tour.videos && tour.videos.length > 0 ? (
                    <div className="space-y-2">
                      {tour.videos.map((video) => (
                        <div key={video.id} className="flex items-center gap-2 p-2 border rounded">
                          <Video className="h-4 w-4" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{video.title || "Untitled"}</p>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {video.url}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Chưa có video</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper function để hiển thị icon
const getIconByName = (iconName: string) => {
  const iconMap: Record<string, string> = {
    mountain: "🏔️",
    tent: "⛺",
    water: "💧",
    cave: "🕳️",
    light: "💡",
    spa: "🧘‍♀️",
    hotel: "🏨",
    tree: "🌳",
    binoculars: "🔭",
    default: "⭐",
  };
  return iconMap[iconName] || iconMap.default;
};

export default TourDetailPage;
