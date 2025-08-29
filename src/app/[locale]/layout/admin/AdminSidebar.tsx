"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  Star,
  Settings,
  BarChart3,
  Package,
  UserCog,
  BadgeDollarSign,
  Phone,
} from "lucide-react";

const sidebarItems = [
  // Tổng quan
  {
    icon: LayoutDashboard,
    label: "dashboard",
    href: "/admin",
  },

  // Quản lý dữ liệu chính
  {
    icon: MapPin,
    label: "tours",
    href: "/admin/tours",
  },
  {
    icon: Calendar,
    label: "bookings",
    href: "/admin/bookings",
  },

  // Quản lý người dùng
  {
    icon: Users,
    label: "customers",
    href: "/admin/customers",
  },
  {
    icon: UserCog,
    label: "users",
    href: "/admin/users",
  },

  // Quản lý nội dung
  {
    icon: Package,
    label: "categories",
    href: "/admin/categories",
  },
  {
    icon: Star,
    label: "reviews",
    href: "/admin/reviews",
  },
  {
    icon: Phone,
    label: "contact",
    href: "/admin/contact",
  },

  // Công cụ kinh doanh
  {
    icon: BadgeDollarSign,
    label: "vouchers",
    href: "/admin/vouchers",
  },

  // Báo cáo và thiết lập
  {
    icon: BarChart3,
    label: "analytics",
    href: "/admin/analytics",
  },
  {
    icon: Settings,
    label: "settings",
    href: "/admin/settings",
  },
];

interface AdminSidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function AdminSidebar({ onCollapseChange }: AdminSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("admin.sidebar");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCollapseChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapseChange?.(collapsed);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-all duration-300 ease-in-out z-40 shadow-sm",
        isCollapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={() => handleCollapseChange(false)}
      onMouseLeave={() => handleCollapseChange(true)}
    >
      <nav className={cn("space-y-2", isCollapsed ? "p-2" : "p-4")}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg transition-all duration-200 relative group",
                isCollapsed ? "px-3 py-3 justify-center" : "px-4 py-3 space-x-3",
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0 dark:text-white" />
              {!isCollapsed && (
                <span className="font-medium capitalize transition-all duration-200 dark:text-white">
                  {t(item.label)}
                </span>
              )}

              {/* Tooltip khi collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                  {t(item.label)}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
