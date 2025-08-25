"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useMutation } from "@tanstack/react-query";
import { SendContact } from "@/config/contact/contact.api";
import { toast } from "sonner";

const SubscribeBanner = ({ className }: { className?: string }) => {
  // Sử dụng hook đa ngôn ngữ
  const t = useTranslations("common.subscribe");

  // Định nghĩa schema validation cho form đăng ký bằng zod
  const subscribeSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("form.validation.emailRequired") })
      .email({ message: t("form.validation.emailInvalid") }),
    type: z.enum(["contact", "marketing"]),
  });

  // Trích xuất kiểu dữ liệu từ schema zod
  type SubscribeFormData = z.infer<typeof subscribeSchema>;

  // Khởi tạo React Hook Form với validation schema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
      type: "marketing",
    },
    // Xác định schema sau khi đã có biến t
    context: { t },
  });

  const createMutation = useMutation({
    mutationFn: SendContact,
    onSuccess: () => {
      toast.success(t("form.successMessage"));
      reset(); // Reset form sau khi submit thành công
    },
    onError: (error: any) => {
      toast.error(error?.message || t("form.errorMessage"));
    },
  });

  // Xử lý khi form được submit
  const onSubmit = async (data: SubscribeFormData) => {
    const subscribeData = {
      email: data.email,
      type: "marketing" as const,
    };

    createMutation.mutate(subscribeData);
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

              {/* Hidden field cho type */}
              <input type="hidden" {...register("type")} value="marketing" />

              <div className="max-md:flex max-md:justify-center">
                <ButtonPrimary
                  name={isSubmitting ? t("form.submitting") : t("form.submit")}
                  type="submit"
                  disabled={isSubmitting}
                  className="!w-[279px]"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBanner;
