import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SuggestTour = () => {
  const swiperRef: any = useRef(null);

  // Sample tour data - you should replace this with your actual data
  const tourData = [
    {
      id: 1,
      title: "2D1N",
      level: "Premium package",
      duration: "2 day",
      capacity: "30~200pax",
      location: "Hanoi, NinhBinh",
      description:
        "Experience a journey of contrasts, from Hanoi's cultural landmarks to Ninh Binh's breathtaking beauty—the UNESCO site backdrop for 'Kong: Skull Island'. The tour concludes with immersive visits to traditional craft villages, revealing the timeless soul of Vietnamese artistry",
      image: "/images/homePage/teambuilding7.jpg",
    },
    {
      id: 2,
      title: "3D2N",
      level: "Premium package",
      duration: "2 day",
      capacity: "30~200pax",
      location: "Hanoi, Ha Long",
      description:
        "Discover the soul of Northern Vietnam on a journey from city to sea. First, explore the cultural landmarks of Hanoi, then board a luxury cruise to experience the serene majesty of Ha Long Bay. Your unforgettable day is completed with a lively gala dinner on the water, creating perfect memories of your adventure.",
      image: "/images/homePage/teambuilding6.jpg",
    },
    {
      id: 3,
      title: "4D3N",
      level: "Premium package",
      duration: "2 days",
      capacity: "30~200pax",
      location: "Hanoi, Ninh Binh, Ha Long",
      description:
        "Discover the complete soul of Northern Vietnam on a journey of incredible contrasts. Explore Hanoi's cultural landmarks before witnessing two natural wonders: Ninh Binh's breathtaking beauty—backdrop for 'Kong: Skull Island'—and Ha Long Bay's serene majesty from a luxury cruise. Your adventure culminates with a lively gala dinner on the water and immersive visits to traditional craft villages, blending nature with timeless artistry.",
      image: "/images/homePage/teambuilding5.jpg",
    },
    {
      id: 4,
      title: "Team Building 4D3N",
      level: "Level 4 - Challenging",
      duration: "4 days",
      capacity: "8-12 pax/team",
      location: "Trạ Ang Valley, Trạ Ang Cave",
      description:
        "Advanced team building tour for experienced adventurers. Includes challenging terrain, extended cave exploration, and overnight camping in remote locations.",
      image: "/images/homePage/teambuilding4.jpg",
    },
  ];

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="xl:py-[68px] md:py-[48px] py-[34px] relative max-sm:space-y-5">
      <div className="w-full md:-translate-y-1/2 md:absolute md:top-1/2">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-x-6 xl:gap-x-8">
            <div className="col-span-full md:col-span-4 xl:col-span-3">
              <div className="space-y-4 xl:space-y-8 md:space-y-6">
                <Image
                  width={120}
                  height={120}
                  src="/images/homePage/jb.png"
                  alt="icon jungle boss"
                  className="xl:max-w-[120px] md:max-w-[84px] max-w-[60px] w-full"
                />
                <div className="space-y-2 md:space-y-3 xl:space-y-4">
                  <div className="pre-header text-primary">Our Tour Demo</div>
                  <h2 className="uppercase headline-1 text-text-500">
                    Learn Top Team Building Tour at Jungle Boss
                  </h2>
                  <div className="text-gray-700 body-1">Suggestion for your company trip</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:ml-[42vw] xl:space-y-8 md:space-y-6 space-y-4">
        <div className="tour-slider-container px-4 md:px-0">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.4,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true,
            }}
            pagination={{
              el: ".swiper-pagination",
              type: "fraction",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="tour-swiper"
          >
            {tourData.map((tour) => (
              <SwiperSlide key={tour.id}>
                <article className="w-full max-w-[360px]">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    {/* Temporarily commented out missing leaf images
                    <div className="absolute z-10 leaf-tr">
                      <Image
                        fill
                        src="/images/homePage/leaf-top-right.webp"
                        className="object-cover w-full h-full"
                        alt="leaf right"
                      />
                    </div>
                    <div className="absolute z-10 leaf-bl">
                      <Image
                        fill
                        src="/images/homePage/leaf-bottom-left.webp"
                        className="object-cover w-full h-full"
                        alt="leaf left"
                      />
                    </div>
                    */}
                    <div className="aspect-[3/2] relative">
                      <Image
                        fill
                        className="object-cover w-full h-full"
                        src={tour.image}
                        alt={`${tour.title} image`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-4">
                      <h3 className="text-text-500 title-1 line-clamp-1">{tour.title}</h3>
                      <div className="space-y-1 text-gray-700 body-1">
                        <div>{tour.level}</div>
                        <div className="flex items-center justify-between space-x-3">
                          <div>{tour.duration}</div>
                          <div>{tour.capacity}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M9.08448 4.36711C8.78368 4.04231 8.59008 3.69191 8.56128 3.26471C8.50048 2.38951 9.13728 1.67271 10.0189 1.62471C10.6829 1.58951 11.2845 1.81671 11.8749 2.07911C12.1405 2.19751 12.3869 2.35431 12.6445 2.49031C13.3101 2.83911 13.7101 3.43271 14.0605 4.06151C14.2877 4.47111 14.2221 4.91591 14.1437 5.34791C14.0989 5.58951 13.9997 5.82151 13.9165 6.05511C13.6973 6.67111 13.2157 6.96871 12.6125 7.10471C12.1613 7.20711 11.8269 6.94471 11.4893 6.71591C11.2749 6.57031 11.0829 6.39591 10.8637 6.21991C10.4685 6.67271 10.0973 7.09671 9.73568 7.50951C9.97888 7.86151 10.2221 8.18791 10.4381 8.53191C10.8061 9.11911 10.8749 9.76391 10.7421 10.4327C10.6605 10.8375 10.4301 11.1223 10.0141 11.2215C9.24608 11.4071 8.50528 11.3191 7.80128 10.9607C7.58208 10.8487 7.37088 10.7191 7.15008 10.5927C6.37888 11.1239 5.64928 11.6855 5.05088 12.3911C4.39328 13.1671 3.62048 13.8135 2.82208 14.4327C2.58368 14.6167 2.44608 14.6359 2.32128 14.4983C2.16288 14.3239 2.22688 14.1655 2.34048 13.9847C2.97248 12.9847 3.61568 11.9895 4.21088 10.9671C4.59008 10.3127 4.89088 9.61191 5.22848 8.92871C4.80288 8.40871 4.48128 7.87591 4.35968 7.24071C4.25888 6.71431 4.28448 6.22471 4.69728 5.81831C4.91168 5.60711 5.15808 5.53351 5.45248 5.54791C6.11808 5.57991 6.71328 5.77671 7.19968 6.25031C7.22848 6.27911 7.27008 6.29351 7.31168 6.31911C7.90208 5.67271 8.48608 5.02631 9.08448 4.36711ZM9.27328 7.95591C9.16928 8.04551 9.10368 8.09991 9.03968 8.15591C8.91488 8.26471 8.76928 8.23431 8.68768 8.13351C8.63488 8.06791 8.64288 7.90951 8.68448 7.82311C8.73888 7.70951 8.85728 7.62791 8.94528 7.53031C9.39488 7.03111 9.84768 6.53351 10.2909 6.02791C10.3629 5.94631 10.4045 5.82791 10.4317 5.71911C10.5117 5.40551 10.6461 5.34311 10.9197 5.52231C11.0029 5.57671 11.0653 5.66311 11.1421 5.73031C11.4045 5.96231 11.6653 6.19751 11.9357 6.41991C12.1469 6.59431 12.3693 6.60711 12.6285 6.48551C13.3373 6.15111 13.7885 5.14631 13.5053 4.41191C13.3149 3.91591 13.0061 3.47431 12.5853 3.14791C11.9789 2.67751 11.2733 2.38471 10.5309 2.19751C10.0541 2.07751 9.47648 2.32551 9.20288 2.76871C8.95008 3.17831 9.06688 3.58471 9.28608 3.97191C9.33568 4.05991 9.41408 4.13351 9.46368 4.22311C9.58528 4.44551 9.56448 4.64711 9.40288 4.82791C8.79648 5.50311 8.18848 6.17511 7.58048 6.84711C7.52128 6.91111 7.45728 6.97511 7.38208 7.01831C7.16288 7.14471 6.99168 7.07271 6.99968 6.82631C7.00608 6.59271 6.89088 6.45191 6.72448 6.36871C6.42688 6.21991 6.11968 6.06791 5.79808 5.99911C5.22368 5.87431 4.89088 6.18311 4.92928 6.77031C4.97408 7.46471 5.20608 8.09351 5.72768 8.57191C6.29888 9.09511 6.88768 9.60071 7.48768 10.0919C8.06528 10.5655 8.74688 10.7575 9.48928 10.7383C9.87168 10.7287 10.0301 10.5895 10.1053 10.1975C10.2733 9.30471 9.91648 8.60711 9.27328 7.95591ZM5.63488 9.30791C5.40128 9.83431 5.20288 10.3383 4.95648 10.8167C4.71008 11.2967 4.41408 11.7511 4.14528 12.2183C4.08608 12.3207 4.04768 12.4359 3.99808 12.5447C4.46048 12.1559 4.84768 11.7175 5.27168 11.3191C5.69088 10.9239 6.14528 10.5655 6.62208 10.1591C6.26048 9.84871 5.94688 9.57671 5.63488 9.30791Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <div className="label-2 tracking-[0.28px] flex-1">{tour.location}</div>
                      </div>
                    </div>
                    <hr className="w-full h-px bg-gray-100" />
                    <div className="text-gray-700 body-1 line-clamp-5">{tour.description}</div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex items-center space-x-8 mr-custom max-lg:hidden">
          <div className="flex space-x-2">
            <button className="btn-slider selectNavPrev" onClick={handlePrevClick}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                >
                  <path
                    d="M15.7381 5.66327L4.74043 6.88423L5.70066 8.52629C5.99206 9.02641 5.36291 9.54987 4.92414 9.17411L0.508748 5.38987C0.270357 5.18515 0.270357 4.81573 0.508748 4.61102L4.92414 0.826777C5.36325 0.44902 5.99206 0.974479 5.70066 1.4726L4.74243 3.11666L15.7381 4.33595C16.5269 4.42131 16.5276 5.57758 15.7381 5.66327Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
            <button className="btn-slider selectNavNext" onClick={handleNextClick}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  className="rotate-180"
                >
                  <path
                    d="M15.7381 5.66327L4.74043 6.88423L5.70066 8.52629C5.99206 9.02641 5.36291 9.54987 4.92414 9.17411L0.508748 5.38987C0.270357 5.18515 0.270357 4.81573 0.508748 4.61102L4.92414 0.826777C5.36325 0.44902 5.99206 0.974479 5.70066 1.4726L4.74243 3.11666L15.7381 4.33595C16.5269 4.42131 16.5276 5.57758 15.7381 5.66327Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="relative w-80 flex items-center">
            <div className="w-full h-[1px] bg-gray-200 relative">
              <div className="swiper-scrollbar absolute inset-0"></div>
            </div>
          </div>
          <div className="swiper-pagination text-sm font-medium text-gray-800 flex-shrink-0 w-[60px] text-right flex items-center justify-end"></div>
        </div>
      </div>

      <style jsx>{`
        .tour-swiper {
          overflow: visible;
        }

        .swiper-scrollbar {
          background: transparent !important;
          height: 1px !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
        }

        .swiper-scrollbar-drag {
          background: #10b981 !important;
          height: 1px !important;
        }

        .swiper-pagination {
          position: static !important;
          width: auto !important;
          text-align: right !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #374151 !important;
        }

        .btn-slider {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-slider:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .btn-slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default SuggestTour;
