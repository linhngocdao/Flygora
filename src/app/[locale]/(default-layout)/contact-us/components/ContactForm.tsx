"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useMutation } from "@tanstack/react-query";
import { SendContact } from "@/config/contact/contact.api";
import { toast } from "sonner";

// Danh sách mã quốc gia phổ biến
const POPULAR_COUNTRY_CODES = [
  { code: "VN", prefix: "+84", name: "Việt Nam" },
  { code: "US", prefix: "+1", name: "United States" },
  { code: "GB", prefix: "+44", name: "United Kingdom" },
  { code: "AU", prefix: "+61", name: "Australia" },
];

// Component chính
const ContactForm = () => {
  const t = useTranslations("common.contact");
  const contactFormSchema = z.object({
    firstName: z.string().min(1, { message: "form.firstNameRequired" }),
    lastName: z.string().min(1, { message: "form.lastNameRequired" }),
    email: z.string().email({ message: "form.emailInvalid" }),
    phonePrefix: z.string().min(1, { message: "form.phonePrefixRequired" }),
    phoneNumber: z.string().min(6, { message: "form.phoneNumberRequired" }),
    message: z.string().optional(),
    recaptcha: z.string().min(1, { message: "form.recaptchaRequired" }),
  });
  type ContactFormValues = z.infer<typeof contactFormSchema>;

  // Ref cho reCAPTCHA
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // State cho dropdown mã quốc gia
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("");
  const [searchPhoneCode, setSearchPhoneCode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phonePrefix: "",
      phoneNumber: "",
      message: "",
      recaptcha: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: SendContact,
    onSuccess: () => {
      toast.success(t("form.submitSuccess"));
      // Reset reCAPTCHA sau khi gửi thành công
      recaptchaRef.current?.reset();
    },
    onError: (error: any) => {
      toast.error(error?.message || t("form.submitError"));
      // Reset reCAPTCHA khi có lỗi
      recaptchaRef.current?.reset();
    },
  });

  // Xử lý chọn mã quốc gia
  const handleSelectPhonePrefix = (prefix: string) => {
    setValue("phonePrefix", prefix);
    setPhonePrefix(prefix);
    setIsPhoneDropdownOpen(false);
  };

  // Xử lý thay đổi reCAPTCHA
  const handleRecaptchaChange = (token: string | null) => {
    setValue("recaptcha", token || "");
  };

  // Xử lý gửi form
  const onSubmit = async (data: any) => {
    // Kiểm tra reCAPTCHA trước khi gửi
    if (!data.recaptcha) {
      toast.error(t("form.recaptchaRequired"));
      return;
    }

    createMutation.mutate(data);
    reset();
    // Reset reCAPTCHA sau khi reset form
    recaptchaRef.current?.reset();
  };

  return (
    <div>
      <section className="xl:py-[68px] md:py-14 py-8">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 xl:gap-8 md:gap-6">
            <div className="lg:col-span-6 col-span-full max-lg:h-[400px] max-md:h-[500px] max-md:max-h-screen lg:order-1 order-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.688794099867!2d105.79177647492841!3d21.005108380638386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad59ba8a498b%3A0x5cce59ee4c7fe07d!2sC3%20D&#39;capitale!5e0!3m2!1svi!2s!4v1755698970009!5m2!1svi!2s"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full overflow-hidden rounded-2xl"
                style={{ border: 0 }}
              />
            </div>
            <div className="order-1 lg:col-span-6 col-span-full lg:order-2">
              <div className="mb-4 space-y-2 xl:space-y-4 md:spacey-3 xl:mb-8 md:mb-6">
                <h2 className="pre-header text-primary">{t("keepInTouch")}</h2>
                <div className="headline-1 text-text-500">{t("connectWithJungleBoss")}</div>
                <div className="text-gray-900 body-1">
                  <div>{t("infoAboutTours")}</div>
                  <div>{t("fillFormBelow")}</div>
                </div>
              </div>

              {/* Form liên hệ */}
              <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4 xl:mb-8 md:mb-6">
                {/* Họ và tên */}
                <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-x-8 md:gap-x-[22px] max-md:gap-y-6">
                  {/* Họ */}
                  <fieldset>
                    <label htmlFor="firstName">
                      <span className="label">
                        {t("form.firstName")}
                        <span className="required">*</span>
                      </span>
                      <div className="field relative">
                        <input
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300 focus:border-primary"
                          } bg-white outline-none transition text-gray-900`}
                          id="firstName"
                          {...register("firstName")}
                          type="text"
                          autoComplete="off"
                          placeholder={t("form.firstNamePlaceholder")}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {t(errors.firstName.message || "")}
                          </p>
                        )}
                      </div>
                    </label>
                  </fieldset>

                  {/* Tên */}
                  <fieldset>
                    <label htmlFor="lastName">
                      <span className="label">
                        {t("form.lastName")}
                        <span className="required">*</span>
                      </span>
                      <div className="field relative">
                        <input
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300 focus:border-primary"
                          } bg-white outline-none transition text-gray-900`}
                          id="lastName"
                          {...register("lastName")}
                          type="text"
                          autoComplete="off"
                          placeholder={t("form.lastNamePlaceholder")}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {t(errors.lastName.message || "")}
                          </p>
                        )}
                      </div>
                    </label>
                  </fieldset>
                </div>

                {/* Email */}
                <div>
                  <fieldset>
                    <label htmlFor="email">
                      <span className="label">
                        {t("form.email")}
                        <span className="required">*</span>
                      </span>
                      <div className="field relative">
                        <input
                          className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300 focus:border-primary"} bg-white outline-none transition text-gray-900`}
                          id="email"
                          {...register("email")}
                          type="email"
                          autoComplete="off"
                          placeholder={t("form.emailPlaceholder")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {t(errors.email.message || "")}
                          </p>
                        )}
                      </div>
                    </label>
                  </fieldset>
                </div>

                {/* Số điện thoại */}
                <div>
                  <div className="body-2 text-gray-900 tracking-[0.28px] mb-1">
                    {t("form.mobilePhone")} *
                  </div>
                  <div className="flex space-x-1">
                    {/* Dropdown mã quốc gia */}
                    <div className="flex-shrink-0 relative w-[124px] h-10">
                      <div
                        className={`w-full h-full px-4 py-2.5 rounded-lg border flex items-center justify-between ${errors.phonePrefix ? "border-red-500" : "border-gray-300 hover:border-primary"} bg-white outline-none transition text-gray-500 cursor-pointer`}
                        onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                      >
                        <span className="truncate">{phonePrefix || t("form.select")}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          className="ml-1 text-gray-500"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Dropdown menu */}
                      <div
                        className="absolute left-0 w-full top-[100%] mt-1 z-50 bg-white rounded-lg shadow-md"
                        style={{ display: isPhoneDropdownOpen ? "block" : "none" }}
                      >
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-300 focus:border-primary bg-white outline-none transition text-gray-900 rounded-t-lg"
                            id="contact-prefix"
                            value={searchPhoneCode}
                            onChange={(e) => setSearchPhoneCode(e.target.value)}
                            placeholder={t("form.search")}
                            autoComplete="off"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="w-4 h-4 text-gray-500"
                            >
                              <path
                                d="M11.7417 10.3429L13.0425 11.6692C13.2126 11.8377 13.368 12.034 13.4878 12.2505C13.5882 12.4108 13.6433 12.5966 13.6458 12.786C13.6482 12.9754 13.598 13.1625 13.5013 13.3257C13.4305 13.4616 13.3094 13.5687 13.1651 13.6363C13.0208 13.7039 12.8549 13.7285 12.6919 13.7063C12.3266 13.5047 11.9874 13.2584 11.6991 12.9727C10.8326 12.1401 10.1168 11.1578 9.4146 10.4556C9.3363 10.3829 9.3311 10.3933 9.1966 10.4582C6.98746 11.5202 4.24054 11.5039 2.77054 9.40944C2.0995 8.24234 1.90812 6.8501 2.27439 5.54504C2.64067 4.23998 3.54682 3.12572 4.71054 2.43108C5.90319 1.77575 7.47095 1.5608 8.6795 2.22438C9.6795 2.78128 10.4493 3.66016 10.8093 4.70084C11.2083 5.9891 11.1903 7.4211 10.6693 8.6965C10.5707 8.91434 10.4561 9.12784 10.3936 9.27368C10.348 9.3815 10.5841 9.58544 10.6419 9.6473C10.7909 9.8041 11.2341 10.2131 11.2961 10.2794L11.7417 10.3429ZM6.3533 9.75318C7.8013 9.91903 9.07793 8.77734 9.5419 7.4889C10.0309 5.85039 8.9037 3.31843 6.9981 3.32094C5.4519 3.323 4.0887 4.6225 3.7943 6.1103C3.4639 7.7865 4.5473 9.8996 6.3533 9.75318Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="border-t border-gray-200">
                          <ul className="max-h-60 overflow-y-auto py-1">
                            {/* Hiển thị các mã quốc gia phổ biến trước */}
                            {POPULAR_COUNTRY_CODES.map((country) => (
                              <li
                                key={country.code}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                                onClick={() => handleSelectPhonePrefix(country.prefix)}
                              >
                                {country.name} ({country.prefix})
                              </li>
                            ))}
                            <li className="px-4 py-2 font-semibold border-t border-b border-gray-200 text-sm">
                              {t("form.allCountries")}
                            </li>

                            {/* Danh sách mã quốc gia */}
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+84")}
                            >
                              Việt Nam (+84)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+1")}
                            >
                              United States (+1)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+44")}
                            >
                              United Kingdom (+44)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+86")}
                            >
                              China (+86)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+81")}
                            >
                              Japan (+81)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+82")}
                            >
                              South Korea (+82)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+66")}
                            >
                              Thailand (+66)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+65")}
                            >
                              Singapore (+65)
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                              onClick={() => handleSelectPhonePrefix("+60")}
                            >
                              Malaysia (+60)
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Hiển thị lỗi cho phonePrefix */}
                      {errors.phonePrefix && (
                        <p className="text-red-500 text-xs mt-1 absolute">
                          {t(errors.phonePrefix.message || "")}
                        </p>
                      )}
                    </div>

                    {/* Input số điện thoại */}
                    <fieldset className="w-full">
                      <label htmlFor="phoneNumber">
                        <div className="field relative">
                          <input
                            className={`w-full px-4 py-2.5 rounded-lg border ${errors.phoneNumber ? "border-red-500" : "border-gray-300 focus:border-primary"} bg-white outline-none transition text-gray-900`}
                            id="phoneNumber"
                            {...register("phoneNumber")}
                            type="tel"
                            autoComplete="off"
                            placeholder={t("form.phoneNumberPlaceholder")}
                            inputMode="numeric"
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">
                              {t(errors.phoneNumber.message || "")}
                            </p>
                          )}
                        </div>
                      </label>
                    </fieldset>
                  </div>
                </div>

                {/* Tin nhắn */}
                <div>
                  <fieldset>
                    <label htmlFor="message">
                      <span className="label">{t("form.message")}</span>
                      <div className="field relative">
                        <textarea
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary bg-white outline-none transition text-gray-900"
                          rows={5}
                          id="message"
                          {...register("message")}
                          autoComplete="off"
                          placeholder={t("form.messagePlaceholder")}
                        />
                      </div>
                    </label>
                  </fieldset>
                </div>

                {/* reCAPTCHA */}
                <div>
                  <div className="mb-2">
                    <span className="label">
                      {t("form.captcha")}
                      <span className="required">*</span>
                    </span>
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={handleRecaptchaChange}
                    onExpired={() => setValue("recaptcha", "")}
                    onError={() => setValue("recaptcha", "")}
                    theme="light"
                    size="normal"
                  />
                  {errors.recaptcha && (
                    <p className="text-red-500 text-xs mt-1">{t(errors.recaptcha.message || "")}</p>
                  )}
                </div>

                {/* Nút gửi */}
                <ButtonPrimary
                  name={isSubmitting ? t("form.sending") : t("form.sendRequest")}
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
