import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const TourSlider = () => {
  const t = useTranslations("common.tourSlider");
  return (
    <div>
      <div className="rounded-lg bg-neutral-100">
        <div>
          <Image
            src="https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
            width={100}
            height={200}
            className="object-cover w-[50%] h-[50%]"
            alt={t("tourImage")}
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 duration-500 ease-in-out title-2 lg:hover:text-primary line-clamp-1">
            {t("tourName")}
          </h3>
          <div className="flex items-center justify-between w-full space-x-4">
            <div className="w-1/2 text-gray-700 body-1">{t("duration")} </div>
          </div>
          <span className="text-[#648219] font-medium text-[1rem]">
            {t("price", { amount: "800,000" })}
          </span>
          <p className="text-gray-700 font-[400] text-base leading-normal line-clamp-6">
            {t("description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourSlider;
