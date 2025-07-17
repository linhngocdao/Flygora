"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import Image from "next/image";

const RecommendationBanner = () => {
  // Hook đa ngôn ngữ cho Recommendation Banner
  const t = useTranslations("common");

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
      <section
        ref={sectionRef}
        className="bg-[url('/images/homePage/section-10-bg.webp')] bg-cover relative section-animation overflow-hidden h-[300px] flex items-center"
      >
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
        <div className="container space-y-4">
          <div className="space-y-2">
            <h2 className="text-center text-white uppercase text-[1.375rem] font-semibold">
              {t("title")}
            </h2>
            <h2 className="text-center uppercase text-[0.5rem] headline-[125%] font-[600] lg:text-[1.9rem] text-[#ede52a]">
              {t("subtitle")}
            </h2>
          </div>
          <div className="flex justify-center space-x-4">
            <ButtonPrimary name={t("callButton")} href="/contact" />
            <ButtonPrimary name={t("callbackButton")} href="/contact" />
          </div>
        </div>
      </section>
    </div>
  );
};
export default RecommendationBanner;
