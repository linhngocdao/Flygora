import React from "react";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useTranslations } from "next-intl";

const SafetyCommitment = () => {
  const t = useTranslations("common.safetyCommitment");
  return (
    <div>
      <section className="lg:py-[65px] xl:h-[598px] md:py-[45px] py-[34px] bg-[url('/images/homePage/section-7-bg.webp')] bg-cover">
        <div className="container xl:px-[113px]">
          <div className="bg-[#4c5d36]/50 lg:p-8 md:p-6 p-4 rounded-[8px] space-y-4">
            <h2 className="text-center pre-header text-[#eef4b7]">{t("title")}</h2>
            <div className="text-center uppercase  text-[1.5rem] font-[600] leading-[125%] lg:text-[2rem] text-[#ede52a]">
              &quot;{t("quote")}&quot;
            </div>
            <div className="text-justify whitespace-pre-line text-gray-50 body-1">
              {t("description")}
            </div>
            <div className="flex flex-wrap justify-center md:space-x-4 gap-y-2">
              <ButtonPrimary name={t("buttonText")} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SafetyCommitment;
