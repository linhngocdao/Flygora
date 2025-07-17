import React from "react";
import ButtonSecondary from "@/components/Clients/ui/ButtonSecondary";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GuestReviewSection = () => {
  const t = useTranslations("common.guestReview");
  return (
    <div>
      <section>
        <div className="bg-[url('/images/homePage/main-bg.webp')] bg-cover">
          <div className="container lg:pt-[68px] lg:pb-[60px] md:py-[45px] py-[34px] xl:px-[143px] md:flex lg:space-x-[79px] md:space-x-5 max-md:space-y-8">
            <div className="md:w-[372px] w-full max-lg:mx-auto h-[327px] flex-shrink-0 relative lg:my-[55.5px]">
              <div className="absolute top-[37px] left-0 w-3/4 rounded-lg overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    alt="jungle boss travelodge"
                    height="279"
                    loading="lazy"
                    src="https://cms.junglebosstours.com/assets/0727d81a-a66e-4e01-b981-6d6f39266508?format=webp&amp;width=558&amp;height=558&amp;quality=100"
                    width="279"
                  />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 overflow-hidden rounded-lg">
                <div className="aspect-w-6 aspect-h-7">
                  <Image
                    alt="a wonderful stopover when visiting phong nha ke bang"
                    height="217"
                    loading="lazy"
                    src="https://cms.junglebosstours.com/assets/b961610f-c941-4b3f-b741-dc43b843acd1?format=webp&amp;width=372&amp;height=434&amp;quality=100"
                    width="186"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="pre-header text-[#ede52a]">{t("title")}</h2>
              <div className="space-y-2">
                <h3 className="text-white uppercase lg:whitespace-pre-line max-md:hidden  text-[1.5rem] font-[600] leading-[125%] lg:text-[2rem]">
                  {t("subtitle")}
                </h3>
                <div className="text-white uppercase md:hidden title-dropline  text-[1.5rem] font-[600] leading-[125%] lg:text-[2rem]">
                  {t("subtitle")}
                </div>
              </div>
              <div className="text-[#e0e0e0] leading-[155%] text-[0.8rem] lg:text-[1rem] experience">
                <p style={{ textAlign: "justify" }}>{t("description")}</p>
              </div>
              <div className="relative items-center space-x-2 max-md:justify-center xl:space-x-4">
                <ButtonSecondary name={t("exploreButton")} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default GuestReviewSection;
