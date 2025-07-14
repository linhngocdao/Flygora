'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart3, Users, MapPin, Calendar, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const t = useTranslations('admin.dashboard');

  // Mock data
  const stats = [
    {
      title: t('totalRevenue'),
      value: '2,450,000,000',
      unit: 'VNĐ',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: t('totalBookings'),
      value: '1,234',
      unit: 'booking',
      change: '+8.2%',
      icon: Calendar,
      trend: 'up',
    },
    {
      title: t('newCustomers'),
      value: '456',
      unit: 'người',
      change: '+15.3%',
      icon: Users,
      trend: 'up',
    },
    {
      title: t('activeTours'),
      value: '89',
      unit: 'tour',
      change: '+5.1%',
      icon: MapPin,
      trend: 'up',
    },
  ];

  const recentBookings = [
    {
      id: 'BK001',
      customer: 'Nguyễn Văn A',
      tour: 'Phú Quốc Adventure',
      date: '2025-01-15',
      status: 'confirmed',
      amount: '12,500,000',
    },
    {
      id: 'BK002',
      customer: 'Trần Thị B',
      tour: 'Sapa Trekking',
      date: '2025-01-18',
      status: 'pending',
      amount: '8,900,000',
    },
    {
      id: 'BK003',
      customer: 'Lê Văn C',
      tour: 'Hạ Long Bay Cruise',
      date: '2025-01-20',
      status: 'confirmed',
      amount: '15,700,000',
    },
    {
      id: 'BK004',
      customer: 'Phạm Thị D',
      tour: 'Dalat Cycling',
      date: '2025-01-22',
      status: 'cancelled',
      amount: '6,200,000',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('subtitle')}</p>
        </div>
        <Button>
          <BarChart3 className="mr-2 h-4 w-4" />
          {t('viewReports')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline mt-2">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              {t('recentBookings')}
            </CardTitle>
            <CardDescription>Danh sách booking mới nhất trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã booking</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Số tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customer}</p>
                        <p className="text-sm text-gray-500">{booking.tour}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="font-medium">{booking.amount} VNĐ</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
            <CardDescription>Các chức năng thường sử dụng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              {t('createTour')}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              {t('manageSchedule')}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              {t('addCustomer')}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              {t('viewReports')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
