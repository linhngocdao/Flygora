"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useTranslations } from "next-intl";
import Image from "next/image";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

const TeamBuilding = () => {
  const t = useTranslations("common.teamBuilding");
  const scrollPosition = useScrollPosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Logic transform đơn giản
  const getTransform = () => {
    if (isMobile) {
      return `translate(-110%, 0%) translate3d(${scrollPosition * 0.2}px, 0px, 0px)`;
    } else {
      return `translate(-90%, 0%) translate3d(${scrollPosition * 0.5}px, 0px, 0px)`;
    }
  };

  const imageIds = [
    "83bd39bf-107a-474f-95d2-561a9950b543",
    "af730d8d-dbd1-4991-a6f6-96a763a99baa",
    "043ca800-98fc-46da-a7e4-9161dad21989",
    "fe88327e-7382-49e2-b320-d3f637a6e0fe",
    "279ed19c-0f05-4d18-909c-d7f0fd10454c",
    "dace4dff-255e-4197-8b7a-5d0c7260583e",
    "501c8981-a4cd-43f4-a3d8-962b96433382",
    "145a9bc5-473f-406c-bb53-37dcdac8f333",
  ];

  return (
    <div>
      <section className="space-y-8 lg:py-[68px] md:py-[45px] py-[34px] bg-gray-50 overflow-hidden">
        {/* Section Header */}
        <div className="container space-y-4">
          <h2 className="text-center pre-header text-[#6c8a1f]">{t("title")}</h2>
          <div className="text-center uppercase text-[1.5rem] font-[600] leading-[125%] lg:text-[2.5rem] text-[#004750]">
            {t("subtitle")}
          </div>

          {/* Team Building Description */}
          <div className="text-center pb-[50px] text-[#666] leading-[145%] text-[0.8rem] lg:text-[1rem] max-w-[800px] mx-auto">
            <p>{t("description.paragraph1")}</p>
            <p>{t("description.paragraph2")}</p>
          </div>
        </div>

        {/* Team Building Image Gallery */}
        <div className="relative">
          <div
            className="w-max lg:h-[330px] md:h-[200px] h-[120px] flex gap-x-4"
            style={{
              transform: getTransform(),
            }}
          >
            {imageIds.map((id, index) => (
              <div
                key={index}
                className={`lg:w-[400px] md:w-[300px] lg:h-[266px] md:h-[150px] w-[175px] h-[95px] rounded-[8px] overflow-hidden flex-shrink-0 ${
                  index % 2 !== 0 ? "self-end" : ""
                }`}
              >
                <Image
                  className="object-cover w-full h-full"
                  src={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=800&height=512&quality=100`}
                  alt={`team building image ${index}`}
                  loading="lazy"
                  width={400}
                  height={266}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Button căn giữa */}
        <div className="flex justify-center mt-8">
          <ButtonPrimary name="Explore Now" />
        </div>
      </section>
    </div>
  );
};

export default TeamBuilding;
