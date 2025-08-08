"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AllAdventureTour = () => {
  const t = useTranslations("common.adventureTours");
  const router = useRouter();

  const tours = [
    {
      id: 1,
      title: "Hanoi Exclusive Food Tour",
      duration: "4-6 hours",
      rating: 4.9,
      reviews: t("seeReviews"),
      price: "USD 35/person",
      image: "/images/homePage/foodtour1.jpg",
      url: "/food-tours", // URL cho food tour
    },
    {
      id: 2,
      title: "Team building Ha Noi",
      duration: "2-5 days",
      rating: 4.9,
      reviews: t("seeReviews"),
      price: "Negotiation",
      image: "/images/homePage/teambuilding3.jpg",
      url: "/team-building", // URL cho team building
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý navigation buttons
  const handlePrevClick = () => {
    if (swiperInstance && !isBeginning) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperInstance && !isEnd) {
      swiperInstance.slideNext();
    }
  };

  // Xử lý click vào tour card
  const handleTourClick = (url: string) => {
    router.push(url);
  };

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-4 space-y-4 text-center lg:text-left pb-8">
        <h2 className="text-[#6c8a1f] pre-header text-xl font-semibold italic">{t("preTitle")}</h2>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#004750]">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>
      </div>

      <div className="relative">
        {/* Navigation Buttons - Chỉ hiển thị trên desktop */}
        {!isMobile && (
          <>
            <button
              onClick={handlePrevClick}
              className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 rounded-full border border-gray-300 bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 left-4 xl:left-8 w-12 h-12 ${
                isBeginning ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"
              }`}
              aria-label="Previous slide"
              disabled={isBeginning}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextClick}
              className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 rounded-full border border-gray-300 bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 right-4 xl:right-8 w-12 h-12 ${
                isEnd ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"
              }`}
              aria-label="Next slide"
              disabled={isEnd}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Swiper */}
        <div className="px-4 lg:px-16">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={setSwiperInstance}
            onSlideChange={({ isBeginning, isEnd }) => {
              setIsBeginning(isBeginning);
              setIsEnd(isEnd);
            }}
            className="overflow-visible h-[407px] lg:h-[420px]"
            slidesPerView="auto"
            spaceBetween={20}
            centeredSlides={isMobile}
            grabCursor={true}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 12,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 16,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 16,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 16,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 5.5,
                spaceBetween: 16,
                centeredSlides: false,
              },
            }}
          >
            {tours.map((tour) => (
              <SwiperSlide key={tour.id} className="!w-auto">
                <div className="w-[320px] mx-auto">
                  <article
                    className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => handleTourClick(tour.url)}
                  >
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src="/images/homePage/leaf-bg-left.webp"
                        alt="leaf decoration"
                        width={120}
                        height={120}
                        className="absolute bottom-[-20px] left-[-30px] w-[120px] h-[120px] z-10 pointer-events-none opacity-0 translate-x-[-10px] translate-y-[10px] object-contain transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      />

                      <Image
                        src="/images/homePage/leaf-bg-right.webp"
                        alt="leaf decoration"
                        width={120}
                        height={120}
                        className="absolute top-[-50px] right-[-30px] w-[120px] h-[120px] z-10 pointer-events-none opacity-0 translate-x-[10px] translate-y-[-10px] object-contain transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      />

                      {/* Tour image */}
                      <Image
                        fill
                        src={tour.image}
                        alt={tour.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        sizes="240px"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-1 hover:text-[#6c8a1f] transition-colors duration-300 min-h-[2.5rem]">
                        {tour.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="font-medium text-gray-700">{tour.duration}</p>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-gray-900 text-sm">
                                {tour.rating}/5
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 text-yellow-400 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l2.09 6.26L20 9.27l-5 3.64 1.18 6.89L12 16.9l-5.18 2.9L8 12.91 3 9.27l5.91-.91L12 2z" />
                              </svg>
                            </div>
                          </div>
                          <span
                            className="text-[#6c8a1f] hover:underline text-xs font-medium cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // Ngăn event bubble lên card
                              // Có thể thêm logic xử lý reviews ở đây
                              console.log("View reviews for:", tour.title);
                            }}
                          >
                            ({tour.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-gray-600 font-medium text-sm">Price</span>
                        <span className="text-gray-900 font-bold text-sm">{tour.price}</span>
                      </div>
                    </div>
                  </article>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AllAdventureTour;
