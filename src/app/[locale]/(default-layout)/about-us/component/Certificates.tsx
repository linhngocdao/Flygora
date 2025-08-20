import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const CERTIFICATE_YEARS = [2020, 2019, 2018, 2017, 2024, 2023, 2022, 2021] as const;

const Certificates = ({ id }: { id: string }) => {
  return (
    <section className="py-16 md:py-20 lg:py-24" id={id}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div>
            <div className="space-y-2 xl:space-y-4 md:space-y-3">
              <div className="pre-header text-primary tracking-[1.4px]">Our Certificates</div>
              <h2 className="uppercase headline-1 text-text-500">Honored for Our Dedication</h2>
            </div>
            <div className="mt-2 text-gray-700 body-1">
              Flygora travel has earned the 2017, 2018 &amp; 2019 this certificate based on
              consistently great reviews!
            </div>
          </div>

          <div className="relative certificates-slider overflow-hidden mt-10">
            <div className="max-w-7xl mx-auto px-4 relative">
              <button
                className="certificates-button-prev hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white rounded-full shadow-xl border-2 border-gray-200 items-center justify-center hover:bg-[#a4c639] hover:border-[#a4c639] hover:shadow-2xl transition-all duration-300 group"
                aria-label="Previous certificates"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-gray-700 group-hover:text-white transition-colors duration-300 -ml-0.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                className="certificates-button-next hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white rounded-full shadow-xl border-2 border-gray-200 items-center justify-center hover:bg-[#a4c639] hover:border-[#a4c639] hover:shadow-2xl transition-all duration-300 group"
                aria-label="Next certificates"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-gray-700 group-hover:text-white transition-colors duration-300 ml-0.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="px-16">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={24}
                  slidesPerView={3}
                  centeredSlides={false}
                  navigation={{
                    nextEl: ".certificates-button-next",
                    prevEl: ".certificates-button-prev",
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                  className="certificates-swiper"
                >
                  {CERTIFICATE_YEARS.map((year) => (
                    <SwiperSlide key={year}>
                      <div className="group text-center hover:text-[#a4c639] rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 select-none p-[50px]">
                        <div>
                          <div className="flex justify-center items-center">
                            <div className="">
                              <Image
                                width={256}
                                height={256}
                                src="https://cms.junglebosstours.com/assets/b3a39df1-b3e0-4441-945d-1fce425be06b?format=webp"
                                alt={`Trip Advisor Certificate of Excellence ${year}`}
                                className="object-contain w-full h-full select-none pointer-events-none"
                                draggable={false}
                              />
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-base lg:text-lg font-bold text-gray-800 group-hover:text-[#a4c639] transition-colors duration-300">
                          Trip Advisor Certificates of Excellence {year}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
