import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const FAQPage = () => {
  const t = useTranslations("common.faq");
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
            priority
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
    </div>
  );
};

export default FAQPage;
