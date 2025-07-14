'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Search, Eye, Download, Filter } from 'lucide-react';

interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  tour: {
    name: string;
    date: string;
    duration: string;
  };
  participants: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export default function BookingsManagement() {
  const t = useTranslations('admin.bookings');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const bookings: Booking[] = [
    {
      id: 'BK001',
      customer: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0901234567',
      },
      tour: {
        name: 'Phú Quốc Adventure Tour',
        date: '2025-01-15',
        duration: '3 ngày 2 đêm',
      },
      participants: 2,
      totalAmount: 5000000,
      status: 'confirmed',
      bookingDate: '2024-12-20',
      paymentStatus: 'paid',
    },
    {
      id: 'BK002',
      customer: {
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        phone: '0902345678',
      },
      tour: {
        name: 'Sapa Trekking Experience',
        date: '2025-01-18',
        duration: '2 ngày 1 đêm',
      },
      participants: 4,
      totalAmount: 7200000,
      status: 'pending',
      bookingDate: '2024-12-22',
      paymentStatus: 'pending',
    },
    {
      id: 'BK003',
      customer: {
        name: 'Lê Văn C',
        email: 'levanc@email.com',
        phone: '0903456789',
      },
      tour: {
        name: 'Hạ Long Bay Cruise',
        date: '2025-01-20',
        duration: '1 ngày',
      },
      participants: 1,
      totalAmount: 3200000,
      status: 'confirmed',
      bookingDate: '2024-12-25',
      paymentStatus: 'paid',
    },
    {
      id: 'BK004',
      customer: {
        name: 'Phạm Thị D',
        email: 'phamthid@email.com',
        phone: '0904567890',
      },
      tour: {
        name: 'Dalat Cycling Tour',
        date: '2025-01-22',
        duration: '1 ngày',
      },
      participants: 3,
      totalAmount: 3600000,
      status: 'cancelled',
      bookingDate: '2024-12-18',
      paymentStatus: 'refunded',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">{t('confirmed')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('pending')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">{t('cancelled')}</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">{t('completed')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">{t('paid')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('unpaid')}</Badge>;
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-800">{t('refunded')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = bookings
    .filter((booking) => booking.paymentStatus === 'paid')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const stats = [
    {
      title: t('totalBookings'),
      value: bookings.length,
      color: 'blue',
    },
    {
      title: t('confirmed'),
      value: bookings.filter((b) => b.status === 'confirmed').length,
      color: 'green',
    },
    {
      title: t('pending'),
      value: bookings.filter((b) => b.status === 'pending').length,
      color: 'yellow',
    },
    {
      title: 'Doanh thu',
      value: `${totalRevenue.toLocaleString('vi-VN')} VNĐ`,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('subtitle')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t('exportExcel')}
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            {t('calendar')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
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
                placeholder="Tìm kiếm theo tên khách hàng, tour hoặc mã booking..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Lọc theo trạng thái
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Lọc theo ngày
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>Tổng quan tất cả các booking trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã booking</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Số người</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customer.name}</p>
                      <p className="text-sm text-gray-500">{booking.customer.email}</p>
                      <p className="text-sm text-gray-500">{booking.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.tour.name}</p>
                      <p className="text-sm text-gray-500">{booking.tour.date}</p>
                      <p className="text-sm text-gray-500">{booking.tour.duration}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{booking.participants}</TableCell>
                  <TableCell className="font-medium">
                    {booking.totalAmount.toLocaleString('vi-VN')} VNĐ
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(booking.paymentStatus)}</TableCell>
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
