"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isPending } = useLogin();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (token) {
      const locale = pathname.split("/")[1];
      router.replace(`/${locale}/admin`);
    }
  }, [token, pathname, router]);

  // Hiển thị thông tin user hiện tại (nếu có)
  useEffect(() => {
    if (user) {
      console.log("User hiện tại:", user);
    }
  }, [user]);

  const onSubmit = async (values: LoginForm) => {
    try {
      const response = await mutateAsync(values);

      // Lấy thông tin từ response
      const { access_token, user } = response;

      // KHÔNG log sensitive data trong production
      if (process.env.NODE_ENV === "development") {
        console.log("Đăng nhập thành công:", {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          tokenPresent: !!access_token, // Chỉ log có token hay không
        });
      }

      // Hiển thị thông báo với tên user
      toast.success(`Chào mừng ${user.name}! Đăng nhập thành công.`);

      // Tự động chuyển về admin dashboard
      const locale = pathname.split("/")[1];
      router.replace(`/${locale}/admin`);
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error("Lỗi đăng nhập:", error);
      }

      // Xử lý error message từ backend response
      const errorMessage =
        error?.response?.data?.message || error?.message || "Đã xảy ra lỗi khi đăng nhập";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">GoTravel Admin</CardTitle>
            <CardDescription className="mt-2">Đăng nhập vào hệ thống quản trị</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gotravel.com"
                  className="pl-10"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300">Email: admin@gotravel.com</p>
            <p className="text-xs text-blue-600 dark:text-blue-300">Password: admin123</p>
          </div>

          {/* Development Debug Info - CHỈ hiển thị thông tin an toàn */}
          {process.env.NODE_ENV === "development" && user && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-1">
                Debug - User Info (Safe):
              </p>
              <p className="text-xs text-green-600 dark:text-green-300">ID: {user.id}</p>
              <p className="text-xs text-green-600 dark:text-green-300">Tên: {user.name}</p>
              <p className="text-xs text-green-600 dark:text-green-300">Email: {user.email}</p>
              <p className="text-xs text-green-600 dark:text-green-300">Role: {user.role}</p>
              <p className="text-xs text-green-600 dark:text-green-300">
                Token Status: {token ? "Authenticated ✓" : "Not Authenticated ✗"}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                ⚠️ Token details ẩn for security
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
