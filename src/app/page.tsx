"use client";
import HeaderComponent from "@/components/Clients/layout/header/page";
import React from "react";

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <main className="homepage max-lg:pt-[68px]">
        <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
          <div className="w-full h-full max-md:aspect-w-16 max-md:aspect-h-9">
            <picture>
              <source srcSet="/banner-home-mobile.webp" media="(max-width: 768px)" type="image/webp" />
              <source srcSet="/banner-home.webp" media="(max-width: 1439px)" type="image/webp" />
              <img
                src="/banner-home.webp"
                alt="home banner"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="container z-[30] absolute bottom-0 -translate-x-1/2 md:translate-y-1/2 translate-y-[110%] left-1/2" >
            <div className="rounded-[16px] border-4 border-primary-400 bg-white xl:px-20 md:px-12 px-8 py-4 relative lg:hidden" >
              <div className="flex items-center justify-between button-1">
                <div className="pt-1 text-gray-700 uppercase headline-3">Find your trip</div>
                <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-primary lg:hover:bg-primary-darker w-10 h-10 md:flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none"
                    className="text-white">
                    <path
                      d="M6.6979 1.12156C4.59338 1.66512 2.71318 3.22604 1.70593 5.15345C0.552054 7.36147 0.487662 10.1184 1.53717 12.379C3.47436 16.5516 8.59573 18.359 12.9533 16.0008C13.95 17.6361 15.1954 19.1822 16.4236 20.5391C17.03 21.2091 18.1258 21.6574 18.9996 21.3069C19.7452 21.1427 20.277 20.4958 20.277 19.7223C20.277 19.331 20.1377 18.9531 19.885 18.6577C18.4329 16.9642 17.055 15.252 15.7756 13.561C16.3974 12.7187 16.8509 11.762 17.0696 10.7346C19.0956 4.59833 12.8579 -1.28273 6.6979 1.12156ZM19.5106 18.9788C20.1731 19.7522 19.5604 20.9407 18.5506 20.8506C18.22 20.8217 17.9201 20.6499 17.7287 20.3799C16.5553 18.7161 15.2848 17.0335 13.9533 15.3679C14.5107 14.9603 15.0197 14.4881 15.4613 13.962C16.7249 15.6274 18.0816 17.3121 19.5106 18.9788ZM16.8599 9.53634C16.3684 12.5662 13.8127 15.1219 10.7832 15.6137C7.63689 16.1253 4.20934 14.3608 2.89075 11.333C1.17511 7.15604 3.27976 2.29263 7.99029 1.23851C12.8865 0.142925 17.6963 4.37901 16.8599 9.53634Z"
                      fill="currentColor"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* style="box-shadow:0px 4px 8px 0px rgba(0, 0, 0, 0.15);" */}
            <div className="md:flex rounded-[16px] border-4 border-[#6c8a1f] bg-white xl:px-20 md:px-12 px-8 py-4 relative max-lg:hidden">
              <div className="xl:space-x-16 md:space-x-8 md:flex md:items-center md:flex-grow md:justify-center max-md:space-y-8">
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Tour</div>
                  <div className="flex items-center justify-between">
                    <div className="body-1 text-gray-500 lg:max-w-[180px] md:max-w-[130px] truncate">Choose your Tour</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none"
                      className="text-gray-500">
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Booking Date</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 body-1">--/--/--</div><svg xmlns="http://www.w3.org/2000/svg" width="15"
                      height="10" viewBox="0 0 15 10" fill="none" className="text-gray-500">
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Participant</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 body-1">--- pax</div><svg xmlns="http://www.w3.org/2000/svg" width="15"
                      height="10" viewBox="0 0 15 10" fill="none" className="text-gray-500">
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="max-md:flex max-md:justify-end">
                  <div
                    className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-primary pointer-events-none w-14 h-14 md:flex-shrink-0 opacity-50">
                      <div className=""></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
