"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

const imageGallery = [
  "https://cms.junglebosstours.com/assets/83bd39bf-107a-474f-95d2-561a9950b543?format=webp",
  "https://cms.junglebosstours.com/assets/af730d8d-dbd1-4991-a6f6-96a763a99baa?format=webp",
  "https://cms.junglebosstours.com/assets/043ca800-98fc-46da-a7e4-9161dad21989?format=webp",
  "https://cms.junglebosstours.com/assets/fe88327e-7382-49e2-b320-d3f637a6e0fe?format=webp",
  "https://cms.junglebosstours.com/assets/279ed19c-0f05-4d18-909c-d7f0fd10454c?format=webp",
  "https://cms.junglebosstours.com/assets/dace4dff-255e-4197-8b7a-5d0c7260583e?format=webp",
  "https://cms.junglebosstours.com/assets/501c8981-a4cd-43f4-a3d8-962b96433382?format=webp",
  "https://cms.junglebosstours.com/assets/145a9bc5-473f-406c-bb53-37dcdac8f333?format=webp",
];

const ActivitiesPage = () => {
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

  // Tính toán transform dựa trên kích thước màn hình
  const getTransform = () => {
    if (isMobile) {
      // Mobile: điều chỉnh cho phù hợp với viewport nhỏ
      return `translate(-50%, 0%) translate3d(${scrollPosition * 0.3}px, 0px, 0px)`;
    } else {
      // Desktop: giữ nguyên logic cũ
      return `translate(-61.3136%, 0%) translate3d(${892.726 + scrollPosition * 0.5}px, 0px, 0px)`;
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            fill
            src="/images/teamBuilding/bg-team-building.webp"
            alt="background team building"
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="relative xl:py-[68px] md:py-[48px] py-[34px]" id="needToMoveSection">
          <div
            className="w-max lg:h-[330px] md:h-[200px] h-[140px] flex gap-x-4"
            id="needToMove"
            style={{
              transform: getTransform(),
            }}
          >
            {imageGallery.map((image, idx) => (
              <div
                key={idx}
                className={`lg:w-[400px] md:w-[300px] lg:h-[266px] md:h-[150px] w-[175px] h-[110px] rounded-[8px] overflow-hidden flex-shrink-0 ${
                  idx % 2 === 0 ? "" : "self-end"
                }`}
              >
                <Image
                  className="object-cover w-full h-full"
                  src={image}
                  alt={`image team building ${idx}`}
                  width={400}
                  height={266}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
