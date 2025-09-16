"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  Package,
  BadgeDollarSign,
  BarChart3,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useVerifyToken } from "@/hooks/useVerifyToken";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const isLoginPage = pathname.includes("/admin/login");
  console.log(isLoginPage);
  const { error } = useVerifyToken(!isLoginPage);
  console.log(error);

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (error) {
      const locale = pathname.split("/")[1];
      router.replace(`/${locale}/admin/login`);
    }
  }, [error, pathname, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const navItems = [
    {
      title: "Tổng quan",
      icon: LayoutDashboard,
      href: `/${locale}/admin`,
      isActive: pathname === `/${locale}/admin`,
    },
    {
      title: "Quản lý Tour",
      icon: MapPin,
      href: `/${locale}/admin/tours`,
      isActive: pathname.includes("/admin/tours") || pathname.includes("/admin/categories"),
      items: [
        { title: "Danh sách Tour", href: `/${locale}/admin/tour-manager/tours` },
        { title: "Thêm Tour mới", href: `/${locale}/admin/tour-manager/tours/add` },
        { title: "Danh mục Tour", href: `/${locale}/admin/tour-manager/categories` },
      ],
    },
    {
      title: "Đặt tour",
      icon: Calendar,
      href: `/${locale}/admin/bookings`,
      isActive: pathname.includes("/admin/bookings"),
      items: [
        { title: "Danh sách Booking", href: `/${locale}/admin/bookings` },
        { title: "Khách hàng", href: `/${locale}/admin/customers` },
      ],
    },
    {
      title: "Quản lý Người dùng",
      icon: Users,
      href: `/${locale}/admin/users`,
      isActive: pathname.includes("/admin/users"),
      items: [
        { title: "Nhân viên", href: `/${locale}/admin/users` },
        { title: "Khách hàng", href: `/${locale}/admin/customers` },
      ],
    },
    {
      title: "Nội dung",
      icon: Package,
      href: `/${locale}/admin/content`,
      isActive:
        pathname.includes("/admin/reviews") ||
        pathname.includes("/admin/contact") ||
        pathname.includes("/admin/faq"),
      items: [
        { title: "Đánh giá", href: `/${locale}/admin/reviews` },
        { title: "Liên hệ", href: `/${locale}/admin/contact` },
        { title: "FAQ", href: `/${locale}/admin/faq` },
      ],
    },
    {
      title: "Voucher",
      icon: BadgeDollarSign,
      href: `/${locale}/admin/vouchers`,
      isActive: pathname.includes("/admin/vouchers"),
    },
    {
      title: "Báo cáo",
      icon: BarChart3,
      href: `/${locale}/admin/analytics`,
      isActive: pathname.includes("/admin/analytics"),
    },
    {
      title: "Cài đặt",
      icon: Settings,
      href: `/${locale}/admin/settings`,
      isActive: pathname.includes("/admin/settings"),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              GT
            </div>
            {!collapsed && <span className="font-semibold text-gray-900">Go Travel</span>}
          </div>
        </div>

        {/* Navigation */}
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isOpen = openMenus[item.title] || item.isActive;

              return (
                <div key={item.title} className="py-1">
                  {item.items ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                          item.isActive
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5" />
                          {!collapsed && <span className="ml-3">{item.title}</span>}
                        </div>
                        {!collapsed && (
                          <div className="transition-transform duration-200">
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        )}
                      </button>
                      <div
                        className={cn(
                          "ml-6 mt-1 overflow-hidden transition-all duration-300",
                          !collapsed && isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="space-y-1">
                          {item.items.map((subItem) => {
                            const subActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                                  subActive
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {subItem.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                        item.isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          collapsed ? "ml-[70px]" : "ml-[240px]"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Go Travel Admin</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
