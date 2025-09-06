"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Plus, Search, Eye, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  status: "active" | "inactive";
  lastBooking: string;
  avatar?: string;
}

export default function CustomersManagement() {
  const t = useTranslations("admin.customers");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const customers: Customer[] = [
    {
      id: "CUS001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      address: "Hà Nội",
      joinDate: "2024-01-15",
      totalBookings: 5,
      totalSpent: 25000000,
      status: "active",
      lastBooking: "2024-12-20",
    },
    {
      id: "CUS002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0902345678",
      address: "TP.HCM",
      joinDate: "2024-03-22",
      totalBookings: 3,
      totalSpent: 15500000,
      status: "active",
      lastBooking: "2024-12-22",
    },
    {
      id: "CUS003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0903456789",
      address: "Đà Nẵng",
      joinDate: "2024-06-10",
      totalBookings: 2,
      totalSpent: 8700000,
      status: "active",
      lastBooking: "2024-12-25",
    },
    {
      id: "CUS004",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0904567890",
      address: "Cần Thơ",
      joinDate: "2024-08-18",
      totalBookings: 1,
      totalSpent: 3600000,
      status: "inactive",
      lastBooking: "2024-09-15",
    },
    {
      id: "CUS005",
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      phone: "0905678901",
      address: "Hải Phòng",
      joinDate: "2024-11-05",
      totalBookings: 7,
      totalSpent: 42300000,
      status: "active",
      lastBooking: "2024-12-28",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">{t("active")}</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">{t("inactive")}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageSpending = totalRevenue / totalCustomers;

  const stats = [
    {
      title: t("totalCustomers"),
      value: totalCustomers,
      color: "blue",
    },
    {
      title: t("activeCustomers"),
      value: activeCustomers,
      color: "green",
    },
    {
      title: t("totalRevenue"),
      value: `${totalRevenue.toLocaleString("vi-VN")} VNĐ`,
      color: "purple",
    },
    {
      title: t("averageSpending"),
      value: `${Math.round(averageSpending).toLocaleString("vi-VN")} VNĐ`,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 ">{t("title")}</h1>
          <p className="text-gray-600 mt-1">{t("subtitle")}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("addNew")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khách hàng mới</DialogTitle>
              <DialogDescription>Thêm thông tin khách hàng mới vào hệ thống</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Họ và tên..." />
              <Input placeholder="Email..." />
              <Input placeholder="Số điện thoại..." />
              <Input placeholder="Địa chỉ..." />
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Hủy</Button>
                <Button>Thêm khách hàng</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc mã khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Khách hàng ({filteredCustomers.length})</CardTitle>
          <CardDescription>Thông tin chi tiết về tất cả khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {customer.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {new Date(customer.joinDate).toLocaleDateString("vi-VN")}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {customer.totalBookings}
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer.totalSpent.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
