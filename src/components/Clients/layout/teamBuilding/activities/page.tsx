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
  "/images/homePage/teambuilding1.jpg",
  "/images/homePage/teambuilding2.jpg",
  "/images/homePage/teambuilding3.jpg",
  "/images/homePage/teambuilding4.jpg",
  "/images/homePage/teambuilding5.jpg",
  "/images/homePage/teambuilding6.jpg",
  "/images/homePage/teambuilding7.jpg",
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

  const getTransform = () => {
    if (isMobile) {
      return `translate(-50%, 0%) translate3d(${scrollPosition * 0.3}px, 0px, 0px)`;
    } else {
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
