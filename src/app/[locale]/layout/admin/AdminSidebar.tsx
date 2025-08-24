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
    icon: BadgeDollarSign,
    label: "vouchers",
    href: "/admin/vouchers",
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
    icon: Package,
    label: "categories",
    href: "/admin/categories",
  },
  {
    icon: Phone,
    label: "contact",
    href: "/admin/contact",
  },
  {
    icon: Star,
    label: "reviews",
    href: "/admin/reviews",
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
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={() => handleCollapseChange(false)}
      onMouseLeave={() => handleCollapseChange(true)}
    >
      <nav className={cn("p-4 space-y-2", isCollapsed && "px-2")}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg transition-all duration-200 relative group",
                isCollapsed ? "px-2 py-3 justify-center" : "px-4 py-3 space-x-3",
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span
                className={cn(
                  "font-medium capitalize transition-all duration-200",
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}
              >
                {t(item.label)}
              </span>

              {/* Tooltip khi collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
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
