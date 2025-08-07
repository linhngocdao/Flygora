"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/app/[locale]/layout/admin/AdminSidebar";
import AdminHeader from "@/app/[locale]/layout/admin/AdminHeader";
import { useVerifyToken } from "@/hooks/useVerifyToken";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Kiểm tra xem có phải trang login không
  const isLoginPage = pathname.includes("/admin/login");

  const { error } = useVerifyToken(!isLoginPage);

  useEffect(() => {
    if (error) {
      const locale = pathname.split("/")[1];
      router.replace(`/${locale}/admin/login`);
    }
  }, [error, pathname, router]);

  // Nếu là trang login, chỉ render children không có header/sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Nếu không phải trang login, render layout đầy đủ
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <AdminHeader />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar onCollapseChange={setSidebarCollapsed} />

        {/* Main Content */}
        <main
          className={`flex-1 p-6 mt-16 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <div className="scroll-auto mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
