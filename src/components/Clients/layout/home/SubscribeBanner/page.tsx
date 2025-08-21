"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const SubscribeBanner = ({ className }: { className?: string }) => {
  // Sử dụng hook đa ngôn ngữ
  const t = useTranslations("common.subscribe");

  // Định nghĩa schema validation cho form đăng ký bằng zod
  const subscribeSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("form.validation.emailRequired") })
      .email({ message: t("form.validation.emailInvalid") }),
  });

  // Trích xuất kiểu dữ liệu từ schema zod
  type SubscribeFormData = z.infer<typeof subscribeSchema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Khởi tạo React Hook Form với validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    // Xác định schema sau khi đã có biến t
    context: { t },
  });

  // Xử lý khi form được submit
  const onSubmit = async (data: SubscribeFormData) => {
    try {
      setIsSubmitting(true);
      // TODO: Gửi dữ liệu đăng ký đến API
      console.log("Form submitted with email:", data.email);

      // Giả lập API call thành công
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      reset(); // Reset form sau khi submit thành công

      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`email-signup mb-8 lg:mb-16 md:mb-12 ${className}`}>
      <div className="container">
        <div
          className="lg:p-8 p-6 bg-cover rounded-lg"
          style={{ backgroundImage: "url('/images/homePage/section-10-bg.webp')" }}
        >
          {/* Tiêu đề và mô tả */}
          <h2 className="mb-4 text-2xl font-bold headline-[125%] text-[#ede52a]">{t("title")}</h2>
          <p className="mb-6 text-[#ede52a]">{t("description")}</p>

          {/* Form đăng ký nhận thông tin */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
              <div className="flex-grow">
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  placeholder={t("form.emailPlaceholder")}
                  className={`w-full px-4 py-2 border bg-white ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-green-300 focus:ring-green-500"
                  } rounded-md focus:outline-none focus:ring-2`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message as string}</p>
                )}
              </div>
              <div className="max-md:flex max-md:justify-center">
                <ButtonPrimary
                  name={isSubmitting ? t("form.submitting") : t("form.submit")}
                  className="!w-[279px]"
                />
              </div>
            </div>

            {/* Thông báo đăng ký thành công */}
            {submitSuccess && (
              <div className="mt-2 text-center text-green-600 font-medium">
                {t("form.successMessage")}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBanner;
