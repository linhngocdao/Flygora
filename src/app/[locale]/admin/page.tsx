"use client";

import React, { JSX, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  DollarSign,
  Download,
  Eye,
  Filter,
  LucideIcon,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  unit: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
  color: "emerald" | "blue" | "purple" | "orange";
  description: string;
}

interface Booking {
  id: string;
  customer: string;
  tour: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
  avatar: string;
}

interface QuickAction {
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
  onClick?: () => void;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
}

type TimePeriod = "thisMonth" | "lastMonth" | "thisQuarter" | "thisYear";

// Custom table components with proper TypeScript
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children, className = "", ...props }) => (
  <table className={`w-full ${className}`} {...props}>
    {children}
  </table>
);

const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => (
  <thead {...props}>{children}</thead>
);

const TableBody: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => (
  <tbody {...props}>{children}</tbody>
);

const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <tr className={`transition-colors ${className}`} {...props}>
    {children}
  </tr>
);

const TableHead: React.FC<TableHeadProps> = ({ children, className = "", ...props }) => (
  <th className={`px-4 py-3 text-left ${className}`} {...props}>
    {children}
  </th>
);

const TableCell: React.FC<TableCellProps> = ({ children, className = "", ...props }) => (
  <td className={`px-4 py-3 ${className}`} {...props}>
    {children}
  </td>
);

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("thisMonth");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stats: StatCard[] = [
    {
      title: "Tổng doanh thu",
      value: "2,450,000,000",
      unit: "VNĐ",
      change: "+12.5%",
      changeType: "increase",
      icon: DollarSign,
      color: "emerald",
      description: "So với tháng trước",
    },
    {
      title: "Tổng số booking",
      value: "1,234",
      unit: "booking",
      change: "+8.2%",
      changeType: "increase",
      icon: Calendar,
      color: "blue",
      description: "So với tháng trước",
    },
    {
      title: "Khách hàng mới",
      value: "456",
      unit: "người",
      change: "+15.3%",
      changeType: "increase",
      icon: Users,
      color: "purple",
      description: "So với tháng trước",
    },
    {
      title: "Tour đang hoạt động",
      value: "89",
      unit: "tour",
      change: "-2.1%",
      changeType: "decrease",
      icon: MapPin,
      color: "orange",
      description: "So với tháng trước",
    },
  ];

  const recentBookings: Booking[] = [
    {
      id: "BK001",
      customer: "Nguyễn Văn A",
      tour: "Phú Quốc Adventure",
      date: "2025-01-15",
      status: "confirmed",
      amount: "12500000",
      avatar: "NA",
    },
    {
      id: "BK002",
      customer: "Trần Thị B",
      tour: "Sapa Trekking",
      date: "2025-01-18",
      status: "pending",
      amount: "8900000",
      avatar: "TB",
    },
    {
      id: "BK003",
      customer: "Lê Văn C",
      tour: "Hạ Long Bay Cruise",
      date: "2025-01-20",
      status: "confirmed",
      amount: "15700000",
      avatar: "LC",
    },
    {
      id: "BK004",
      customer: "Phạm Thị D",
      tour: "Dalat Cycling",
      date: "2025-01-22",
      status: "cancelled",
      amount: "6200000",
      avatar: "PD",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      label: "Tạo tour mới",
      icon: MapPin,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Tạo và quản lý tour du lịch",
      onClick: () => console.log("Create tour clicked"),
    },
    {
      label: "Quản lý lịch trình",
      icon: Calendar,
      color: "bg-green-500 hover:bg-green-600",
      description: "Xem và điều chỉnh lịch trình",
      onClick: () => console.log("Manage schedule clicked"),
    },
    {
      label: "Thêm khách hàng",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Thêm thông tin khách hàng mới",
      onClick: () => console.log("Add customer clicked"),
    },
    {
      label: "Xem báo cáo",
      icon: BarChart3,
      color: "bg-orange-500 hover:bg-orange-600",
      description: "Phân tích dữ liệu kinh doanh",
      onClick: () => console.log("View reports clicked"),
    },
  ];

  const notifications: Notification[] = [
    {
      id: "notif-1",
      title: "3 booking mới cần xác nhận",
      description: "Vừa mới • Cần xử lý ngay",
      type: "info",
      timestamp: new Date().toISOString(),
    },
    {
      id: "notif-2",
      title: "Doanh thu tháng này tăng 12.5%",
      description: "1 giờ trước • Tin tốt",
      type: "success",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  // Helper functions with proper typing
  const getStatusBadge = (status: Booking["status"]): JSX.Element => {
    const statusConfig = {
      confirmed: {
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dotColor: "bg-emerald-500",
        label: "Đã xác nhận",
      },
      pending: {
        className: "bg-amber-50 text-amber-700 border-amber-200",
        dotColor: "bg-amber-500",
        label: "Chờ xử lý",
      },
      cancelled: {
        className: "bg-red-50 text-red-700 border-red-200",
        dotColor: "bg-red-500",
        label: "Đã hủy",
      },
    };

    const config = statusConfig[status];

    return (
      <Badge className={`${config.className} font-medium`}>
        <div className={`w-1.5 h-1.5 ${config.dotColor} rounded-full mr-1.5`}></div>
        {config.label}
      </Badge>
    );
  };

  const getColorClasses = (color: StatCard["color"]): string => {
    const colorMap: Record<StatCard["color"], string> = {
      emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700",
      blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700",
      purple: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700",
      orange: "bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700",
    };
    return colorMap[color];
  };

  const getNotificationBgColor = (type: Notification["type"]): string => {
    const typeMap: Record<Notification["type"], string> = {
      info: "bg-blue-50 border-blue-200",
      success: "bg-green-50 border-green-200",
      warning: "bg-amber-50 border-amber-200",
      error: "bg-red-50 border-red-200",
    };
    return typeMap[type];
  };

  const getNotificationTextColor = (type: Notification["type"]): string => {
    const typeMap: Record<Notification["type"], string> = {
      info: "text-blue-800",
      success: "text-green-800",
      warning: "text-amber-800",
      error: "text-red-800",
    };
    return typeMap[type];
  };

  const formatCurrency = (amount: string): string => {
    return parseInt(amount).toLocaleString("vi-VN");
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPeriod(e.target.value as TimePeriod);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleViewReports = (): void => {
    console.log("Viewing reports for period:", selectedPeriod);
  };

  const handleBookingAction = (bookingId: string): void => {
    console.log("Viewing booking:", bookingId);
  };

  return (
    <div className="min-h-screen  transition-all duration-300">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Enhanced Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Dashboard Quản trị
              </h1>
            </div>
            <p className="text-lg text-gray-600 ml-4">
              Tổng quan hoạt động kinh doanh và quản lý hệ thống
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            >
              <option value="thisMonth">Tháng này</option>
              <option value="lastMonth">Tháng trước</option>
              <option value="thisQuarter">Quý này</option>
              <option value="thisYear">Năm này</option>
            </select>

            <Button
              onClick={handleViewReports}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Xem báo cáo
            </Button>

            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
              disabled={isLoading}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isIncrease = stat.changeType === "increase";

            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50"></div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <div
                          className={`w-12 h-12 rounded-xl ${getColorClasses(stat.color)} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold tracking-tight text-gray-900">
                            {formatCurrency(stat.value)}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">{stat.unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isIncrease ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-semibold ${isIncrease ? "text-emerald-600" : "text-red-600"}`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">{stat.description}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Booking gần đây
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Danh sách booking mới nhất trong hệ thống
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <Search className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Filter className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 bg-slate-50/50">
                        <TableHead className="font-semibold text-gray-700 py-4">
                          Booking ID
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Khách hàng</TableHead>
                        <TableHead className="font-semibold text-gray-700">Trạng thái</TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right">
                          Số tiền
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 text-center">
                          Thao tác
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking, index) => (
                        <TableRow
                          key={booking.id}
                          className={`border-slate-200 hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                        >
                          <TableCell className="font-mono text-sm font-semibold text-blue-600 py-4">
                            {booking.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                {booking.avatar}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{booking.customer}</p>
                                <p className="text-sm text-gray-600">{booking.tour}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell className="text-right">
                            <span className="font-bold text-gray-900">
                              {formatCurrency(booking.amount)} VNĐ
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleBookingAction(booking.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  Thao tác nhanh
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Các chức năng thường sử dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={action.onClick}
                      className={`w-full justify-start h-auto p-4 ${action.color} text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold">{action.label}</div>
                          <div className="text-xs opacity-90">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  Thông báo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${getNotificationBgColor(notification.type)}`}
                  >
                    <p
                      className={`text-sm font-medium ${getNotificationTextColor(notification.type)}`}
                    >
                      {notification.title}
                    </p>
                    <p
                      className={`text-xs mt-1 ${getNotificationTextColor(notification.type)} opacity-75`}
                    >
                      {notification.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
