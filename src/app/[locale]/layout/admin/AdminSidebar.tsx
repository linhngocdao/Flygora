"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  FileText,
  Star,
  Settings,
  BarChart3,
  Package,
  UserCog,
} from "lucide-react";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "dashboard",
    href: "/admin",
  },
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
  {
    icon: Star,
    label: "reviews",
    href: "/admin/reviews",
  },
  {
    icon: Package,
    label: "categories",
    href: "/admin/categories",
  },
  {
    icon: FileText,
    label: "content",
    href: "/admin/content",
  },
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

export default function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations("admin.sidebar");

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium capitalize">{t(item.label)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
