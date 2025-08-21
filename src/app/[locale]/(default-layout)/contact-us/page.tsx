"use client";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ContactForm from "./components/ContactForm";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const ContactGotravel = () => {
  const t = useTranslations("common.contact");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsVisible(anyVisible);
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div>
      {/* Header */}
      <section className="relative md:h-[500px] h-[400px] max-h-screen">
        <div className="absolute inset-0">
          <Image
            fill
            src="/images/GoTravel_policy/banner-policy.webp"
            alt="Người leo núi đá gần thác nước"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 w-full h-full bg-black/50"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="container">
            <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>
      <ContactForm />
      {/* More Supportive */}
      <section className="relative overflow-hidden mb-20">
        <div ref={sectionRef} className="xl:py-[68px] md:py-14 py-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/homepage/section-2-bg.webp"
              alt="background our team"
              className="object-cover w-full h-full"
              fill
              quality={100}
              sizes="100vw"
              priority
              style={{
                imageRendering: "crisp-edges",
              }}
            />
          </div>
          <Image
            src="/images/homePage/leaf-bg-right.webp"
            alt="leaf"
            width={267}
            height={267}
            className={`absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
                                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                                ${isVisible ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"}`}
            loading="eager"
          />
          <Image
            src="/images/homePage/leaf-bg-left.webp"
            alt="leaf"
            width={267}
            height={267}
            className={`absolute bottom-[-100px] left-[-90px] transition-transform duration-700 ease-out
                                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                                ${isVisible ? "translate-x-0 translate-y-0" : "-translate-x-full translate-y-full"}`}
            loading="eager"
          />
          <div className="container relative z-10">
            <div className="mb-4 xl:mb-8 md:mb-6">
              <h2 className="mb-2 pre-header xl:mb-4 md:mb-3 text-primary">
                {t("moreSupportive.title")}
              </h2>
              <div className="mb-2 font-bold headline-1 text-text-500 xl:mb-4 md:mb-3">
                {t("moreSupportive.subtitle")}
              </div>
              <div className="text-gray-900 body-1">{t("moreSupportive.description")}</div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-4 md:gap-3">
              <div className="flex flex-col justify-between p-4 bg-white rounded-lg xl:p-6 md:p-5">
                <div>
                  <div className="mb-2 font-bold text-gray-900 headline-2">
                    {t("moreSupportive.office.title")}
                  </div>
                  <div className="mb-4 text-gray-900 body-1">
                    {t("moreSupportive.office.description")}
                  </div>
                  <div className="flex mb-4 space-x-2">
                    <Image
                      src="/images/contactUs/location.png"
                      alt="location"
                      width="20"
                      height="20"
                      className="flex-shrink-0 w-5 h-5"
                    />
                    <div className="text-primary label-1">{t("moreSupportive.office.address")}</div>
                  </div>
                </div>
                <ButtonPrimary
                  name={t("moreSupportive.office.button")}
                  onClick={() => {
                    window.open("https://maps.app.goo.gl/hxivrcrqv36Dvfrv8", "_blank");
                  }}
                  fullWidth
                />
              </div>
              <div className="flex flex-col justify-between p-4 rounded-lg bg-[#e6ee95] xl:p-6 md:p-5">
                <div>
                  <div className="mb-2 font-bold text-gray-900 headline-2">
                    {t("moreSupportive.support.title")}
                  </div>
                  <div className="mb-4 text-gray-900 body-1">
                    {t("moreSupportive.support.description")}
                  </div>
                  <div className="flex items-center mb-4 space-x-2">
                    <Image
                      src="/images/contactUs/mail.png"
                      alt="mail"
                      width="20"
                      height="20"
                      className="flex-shrink-0 w-5 h-5"
                    />
                    <div className="break-all text-primary label-1">
                      {t("moreSupportive.support.email")}
                    </div>
                  </div>
                </div>
                <ButtonPrimary
                  name={t("moreSupportive.support.button")}
                  onClick={() => {
                    window.open("mailto:advisor@flygora.com", "_blank");
                  }}
                  fullWidth
                />
              </div>
              <div className="flex flex-col justify-between p-4 rounded-lg bg-[#4c5d36] xl:p-6 md:p-5">
                <div>
                  <div className="mb-2 font-bold text-accent-500 headline-2 text-white">
                    {t("moreSupportive.call.title")}
                  </div>
                  <div className="mb-4 text-gray-50 body-1">
                    {t("moreSupportive.call.description")}
                  </div>
                  <div className="flex items-center mb-4 space-x-2">
                    <Image
                      src="/images/contactUs/phone.png"
                      alt="location"
                      width="20"
                      height="20"
                      className="flex-shrink-0 w-5 h-5"
                    />
                    <div className="flex flex-wrap text-white">
                      <div className="mr-1.5 text-accent-500 label-1 last:mr-0">
                        {t("moreSupportive.call.phone1")} /
                      </div>
                      <div className="mr-1.5 text-accent-500 label-1 last:mr-0">
                        {t("moreSupportive.call.phone2")}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tạo sự kiện gọi chọn 1 trong 2 số */}
                <ButtonPrimary
                  name={t("moreSupportive.call.button")}
                  onClick={() => {
                    window.open("tel:+84793946789", "_blank");
                  }}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SubscribeBanner />
    </div>
  );
};

export default ContactGotravel;
