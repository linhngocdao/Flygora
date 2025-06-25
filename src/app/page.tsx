"use client"

import HeaderComponent from "@/components/Clients/layout/header/page";
import React from "react";

export default function Home() {
  const searchOptions = [
    {
      key: "tour",
      title: "Tour",
      placeholder: "Chọn Tour"
    },
    {
      key: "date",
      title: "Thời gian đặt lịch",
      placeholder: "--/--/--"
    },
    {
      key: "people",
      title: "Người tham gia",
      placeholder: "--- người"
    }
  ];
  return (
    <div>
      <HeaderComponent />
      <main className="homepage max-lg:pt-[68px]">
        <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
          <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
            <div className="w-full h-full max-md:aspect-w-16 max-md:aspect-h-9">
              <picture>
                <source srcSet="/banner-home-mobile.webp" media="(max-width: 768px)" type="image/webp" />
                <source srcSet="/banner-home.webp" media="(max-width: 1439px)" type="image/webp" />
                <img
                  src="/banner-home.webp"
                  alt="home banner"
                  className="object-cover w-full h-full"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </div>

            <div className="container z-[30] absolute bottom-0 -translate-x-1/2 md:translate-y-1/2 translate-y-[110%] left-1/2">
              {/* Mobile search box */}
              <div
                className="rounded-[16px] border-4 border-primary-400 bg-white xl:px-20 md:px-12 px-8 py-4 relative lg:hidden"
                style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex items-center justify-between button-1">
                  <div className="pt-1 text-gray-700 uppercase headline-3">Tìm kiếm Tour</div>
                  <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-primary lg:hover:bg-primary-darker w-10 h-10 md:flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none" className="text-white">
                      <path d="M6.6979 1.12156C4.59338...Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Desktop search box */}
              <div
                className="md:flex rounded-[16px] border-4 border-primary-400 bg-white xl:px-20 md:px-12 px-8 py-4 relative max-lg:hidden"
                style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="xl:space-x-16 md:space-x-8 md:flex md:items-center md:flex-grow md:justify-center max-md:space-y-8">
                  {searchOptions.map((option, index) => (
                    <React.Fragment key={option.key}>
                      <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                        <div className="text-gray-900 title-1">{option.title}</div>
                        <div className="flex items-center justify-between">
                          <div className="body-1 text-gray-500 lg:max-w-[180px] md:max-w-[130px] truncate">{option.placeholder}</div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none" className="text-gray-500">
                            <path d="M14.3332 1.27945C14.3556...Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                      {index < searchOptions.length - 1 && <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>}
                    </React.Fragment>
                  ))}

                  <div className="max-md:flex max-md:justify-end">
                    <div className="flex items-center justify-center duration-300 ease-in-out rounded-full bg-primary pointer-events-none w-14 h-14 md:flex-shrink-0 opacity-50 !cursor-default">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none" className="text-white">
                        <path d="M6.6979 1.12156C4.59338...Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
