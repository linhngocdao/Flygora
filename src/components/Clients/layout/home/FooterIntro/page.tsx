import React from "react";
import { useTranslations } from "next-intl";

const FooterIntroPage = () => {
  // Hook đa ngôn ngữ cho phần giới thiệu cuối trang
  const t = useTranslations("common.footerIntro");

  return (
    <div>
      <section className="bg-[url('/images/homePage/section-11.webp')] lg:bg-cover bg-center bg-primary-900">
        <div className="container lg:min-h-screen min-h-[710px] md:grid md:grid-cols-12 md:gap-x-8 flex items-center">
          <div className="p-8 md:col-start-2 md:col-span-10 md:p-0">
            <div className="lg:text-[36px] md:text-[25px] text-[18px] font-medium leading-[150%] text-[#ede52a] tracking-[-0.72px] text-justify">
              {t("description")}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterIntroPage;
