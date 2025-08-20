import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Certificate years constant
const CERTIFICATE_YEARS = [2020, 2019, 2018, 2017, 2024, 2023, 2022, 2021] as const;

const Certificates = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24" id="our-certificates">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-[#a4c639] font-script text-2xl md:text-3xl mb-4">
              Our Certificates
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              HONORED FOR OUR DEDICATION
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Jungle Boss has earned the 2017, 2018 & 2019 this certificate based on consistently great reviews!
            </p>
          </div>

          {/* Certificates Slider */}
          <div className="relative certificates-slider overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative">
              {/* Custom Navigation Arrows */}
              <button
                className="certificates-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-300 flex items-center justify-center hover:shadow-xl transition-all duration-300"
                aria-label="Previous certificates"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-600 -ml-0.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                className="certificates-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-300 flex items-center justify-center hover:shadow-xl transition-all duration-300"
                aria-label="Next certificates"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-600 ml-0.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="px-16">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={3}
                  centeredSlides={false}
                  navigation={{
                    nextEl: '.certificates-button-next',
                    prevEl: '.certificates-button-prev',
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
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
                      <div className="group text-center hover:text-[#a4c639] rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 select-none">
                        <div >
                          <div className="flex justify-center items-center">
                            <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
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
                        <div className="space-y-1">
                          <h3 className="text-base lg:text-lg font-bold text-gray-800 group-hover:text-[#a4c639] transition-colors duration-300">
                            Trip Advisor Certificates of
                          </h3>
                          <p className="text-base lg:text-lg font-bold text-gray-800 group-hover:text-[#a4c639] transition-colors duration-300">
                            Excellence {year}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Custom Pagination */}
              <div className="certificates-pagination flex justify-center mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
