import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("common.heroSection");
  return (
    <div>
      <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
        <div className="w-full h-full max-md:aspect-w-16 max-md:aspect-h-9">
          <picture>
            <source
              srcSet="/images/homePage/banner-home-mobile.webp"
              media="(max-width: 768px)"
              type="image/webp"
            />
            <source
              srcSet="/images/homePage/banner-home.webp"
              media="(max-width: 1439px)"
              type="image/webp"
            />
            <img
              src="/images/homePage/banner-home.webp"
              alt="home banner"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Search Form Container */}
        <div className="container z-[30] absolute bottom-0 -translate-x-1/2 md:translate-y-1/2 translate-y-[110%] left-1/2">
          {/* Mobile Search Form */}
          <div className="rounded-[16px] border-4 border-primary-400 bg-white xl:px-20 md:px-12 px-8 py-4 relative lg:hidden">
            <div className="flex items-center justify-between button-1">
              <div className="pt-1 text-gray-700 uppercase headline-3">{t("findYourTrip")}</div>
              <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-[#6c8a1f] lg:hover:bg-primary-darker w-10 h-10 md:flex-shrink-0">
                <Image
                  src="/images/homePage/ic-search.svg"
                  width={25}
                  height={25}
                  alt="search icon"
                  style={{
                    filter:
                      "invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Search Form */}
          <div
            className="md:flex rounded-[16px] border-4 bg-white xl:px-20 md:px-12 px-8 py-4 relative max-lg:hidden"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 8px 0px",
              borderColor: "rgb(214 226 80 / 1)",
            }}
          >
            <div className="xl:space-x-16 md:space-x-8 md:flex md:items-center md:flex-grow md:justify-center max-md:space-y-8">
              {/* Tour Selection */}
              <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                <div className="text-gray-900 title-1">{t("tour")}</div>
                <div className="flex items-center justify-between">
                  <div className="body-1 text-gray-500 lg:max-w-[180px] md:max-w-[130px] truncate">
                    {t("chooseYourTour")}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    fill="none"
                    className="text-gray-500"
                  >
                    <path
                      d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>

              {/* Date Selection */}
              <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                <div className="text-gray-900 title-1">{t("bookingDate")}</div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 body-1">{t("datePlaceholder")}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    fill="none"
                    className="text-gray-500"
                  >
                    <path
                      d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>

              {/* Participant Selection */}
              <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                <div className="text-gray-900 title-1">{t("participant")}</div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 body-1">{t("participantPlaceholder")}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    fill="none"
                    className="text-gray-500"
                  >
                    <path
                      d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <div className="max-md:flex max-md:justify-end">
                <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-[#6c8a1f] pointer-events-none w-14 h-14 md:flex-shrink-0 opacity-70">
                  <Image
                    src="/images/homePage/ic-search.svg"
                    width={25}
                    height={25}
                    alt="search icon"
                    style={{
                      filter:
                        "invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
