"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
      const errorData = error?.response?.data;
      let errorMessage = errorData?.message || error?.message || "Đã xảy ra lỗi khi đăng nhập";
      if (errorData?.errors && errorData.errors.length > 0) {
        errorMessage = errorData.errors[0].message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6c8a1f]/5 via-white to-[#004750]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Panel - Image and branding */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-[#004750] to-[#6c8a1f]">
          <div className="absolute inset-0 bg-opacity-80 flex flex-col justify-between p-8 text-white">
            <div className="pt-8">
              <h1 className="text-3xl font-bold mb-2">Flygora Travel Admin</h1>
              <p className="text-white/80">Hệ thống quản lý tour du lịch mạo hiểm</p>
            </div>

            <div className="relative h-full flex items-center justify-center py-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-white/10 absolute animate-pulse"></div>
                <div
                  className="w-64 h-64 rounded-full bg-white/5 absolute animate-pulse"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
              <div className="z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2">Quản trị viên</h2>
                <p className="text-sm text-white/70">Đăng nhập để truy cập vào hệ thống quản lý</p>
              </div>
            </div>

            <div className="text-white/60 text-sm">
              <p className="mb-1">© 2025 Flygora Travel Adventure. All rights reserved.</p>
              <p>Được phát triển bởi Flygora Team.</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-white py-8 px-6 lg:px-12">
          {/* Mobile Logo - only visible on small screens */}
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <div className="w-14 h-14 bg-gradient-to-br from-[#004750] to-[#6c8a1f] rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-[#004750]">Flygora</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
            <p className="text-gray-500 mt-2">Nhập thông tin đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@flygora.com"
                  className="pl-10 py-6 border-gray-300 focus:border-[#6c8a1f] focus:ring-[#6c8a1f]"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Mật khẩu
                </Label>
                <Button
                  tabIndex={-1}
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm font-medium text-[#6c8a1f] hover:text-[#004750]"
                  onClick={() => router.push("/forgot-password")}
                >
                  Quên mật khẩu?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10 py-6 border-gray-300 focus:border-[#6c8a1f] focus:ring-[#6c8a1f]"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-[#004750] to-[#6c8a1f] hover:from-[#003a42] hover:to-[#5a7319] transition-all duration-300 text-white font-medium text-base"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang đăng nhập...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Thông tin khác</span>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              className="py-5 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              onClick={() => router.push("/register")}
            >
              <span>Tạo tài khoản mới</span>
            </Button>

            {/* Demo Credentials */}
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-amber-500 mr-3 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>
                  <h4 className="font-medium text-amber-800">Demo đăng nhập:</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Email:{" "}
                    <span className="font-mono bg-amber-100 px-1 rounded">admin@flygora.com</span>
                  </p>
                  <p className="text-sm text-amber-700">
                    Mật khẩu: <span className="font-mono bg-amber-100 px-1 rounded">admin123</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Development Debug Info - CHỈ hiển thị thông tin an toàn */}
            {process.env.NODE_ENV === "development" && user && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-green-800">Thông tin người dùng:</h4>
                    <p className="text-sm text-green-700 mt-1">
                      ID: <span className="font-medium">{user.id}</span>
                    </p>
                    <p className="text-sm text-green-700">
                      Tên: <span className="font-medium">{user.name}</span>
                    </p>
                    <p className="text-sm text-green-700">
                      Email: <span className="font-medium">{user.email}</span>
                    </p>
                    <p className="text-sm text-green-700">
                      Quyền: <span className="font-medium">{user.role}</span>
                    </p>
                    <p className="text-sm text-green-700">
                      Trạng thái:
                      <span
                        className={`ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${token ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {token ? "Đã xác thực ✓" : "Chưa xác thực ✗"}
                      </span>
                    </p>
                    <p className="text-xs text-amber-600 mt-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Chi tiết token được ẩn vì lý do bảo mật
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
