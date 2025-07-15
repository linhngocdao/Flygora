"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, MapPin, Calendar, Users, Star } from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

interface Tour {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  maxParticipants: number;
  currentBookings: number;
  status: "active" | "inactive" | "draft";
  rating: number;
  location: string;
}

export default function ToursManagement() {
  const t = useTranslations("admin.tours");
  const [searchTerm, setSearchTerm] = useState("");

  //TODO: viết cho tôi 1 đoạn call api sử dụng react query

  // Mock data
  const tours: Tour[] = [
    {
      id: "T001",
      name: "Phú Quốc Adventure Tour",
      category: "Beach & Islands",
      duration: "3 ngày 2 đêm",
      price: 2500000,
      maxParticipants: 20,
      currentBookings: 15,
      status: "active",
      rating: 4.8,
      location: "Phú Quốc",
    },
    {
      id: "T002",
      name: "Sapa Trekking Experience",
      category: "Mountain Trekking",
      duration: "2 ngày 1 đêm",
      price: 1800000,
      maxParticipants: 15,
      currentBookings: 12,
      status: "active",
      rating: 4.9,
      location: "Sapa",
    },
    {
      id: "T003",
      name: "Hạ Long Bay Cruise",
      category: "Cruise & Marine",
      duration: "1 ngày",
      price: 3200000,
      maxParticipants: 25,
      currentBookings: 8,
      status: "active",
      rating: 4.7,
      location: "Hạ Long",
    },
    {
      id: "T004",
      name: "Dalat Cycling Tour",
      category: "Cycling",
      duration: "1 ngày",
      price: 1200000,
      maxParticipants: 10,
      currentBookings: 0,
      status: "draft",
      rating: 0,
      location: "Đà Lạt",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">{t("active")}</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">{t("inactive")}</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">{t("draft")}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t("subtitle")}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("createNew")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo tour mới</DialogTitle>
              <DialogDescription>Tạo một tour du lịch mới cho hệ thống</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Tên tour..." />
              <Input placeholder="Địa điểm..." />
              <Input placeholder="Thời gian..." />
              <Input placeholder="Giá tiền..." />
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Hủy</Button>
                <Button>Tạo tour</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên tour hoặc địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Lọc theo danh mục</Button>
            <Button variant="outline">Lọc theo trạng thái</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tours Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Tours ({filteredTours.length})</CardTitle>
          <CardDescription>Tổng quan tất cả các tour trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thông tin tour</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tour.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {tour.location}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tour.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {tour.duration}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {tour.price.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      {tour.currentBookings}/{tour.maxParticipants}
                    </div>
                  </TableCell>
                  <TableCell>
                    {tour.rating > 0 ? (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        {tour.rating}
                      </div>
                    ) : (
                      <span className="text-gray-400">Chưa có</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(tour.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
