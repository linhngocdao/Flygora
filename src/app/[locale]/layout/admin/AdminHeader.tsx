"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminLanguageSwitcher from "@/components/ui/AdminLanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/hooks/useLogout";
import { toast } from "sonner";

export default function AdminHeader() {
  const t = useTranslations("admin.header");
  const router = useRouter();
  const pathname = usePathname();

  // Lấy thông tin user từ store
  const user = useAuthStore((state) => state.user);

  // Hook logout với loading state
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout(undefined, {
        onSuccess: () => {
          toast.success("Đăng xuất thành công!");
          const locale = pathname.split("/")[1] || "vi";
          router.replace(`/${locale}/admin/login`);
        },
        onError: (error: any) => {
          console.error("Lỗi đăng xuất:", error);
          toast.error("Có lỗi xảy ra khi đăng xuất");
          const locale = pathname.split("/")[1] || "vi";
          router.replace(`/${locale}/admin/login`);
        },
      });
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">GoTravel Admin</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <AdminLanguageSwitcher />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://graph.facebook.com/100052698851470/picture?access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662&amp;width=1000&amp;height=1000"
                    alt={user?.name || "Admin"}
                  />
                  <AvatarFallback>
                    {user?.name ? user.name.charAt(0).toUpperCase() : "AD"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "Admin User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "admin@gotravel.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t("profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer"
              >
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                <span>{isLoggingOut ? "Đang đăng xuất..." : t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
