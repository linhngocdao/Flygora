"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const tours = [
  {
    id: 1,
    title: "Tra Ang Excursion 1D",
    level: "Level 1 - Easy",
    duration: "1 day",
    rating: 4.9,
    reviews: "See Reviews",
    price: "VND 800,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
  {
    id: 2,
    title: "Phong Huong Adventure 1D",
    level: "Level 3 - Moderate",
    duration: "1 day",
    rating: 4.9,
    reviews: "See Reviews",
    price: "VND 1,350,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
  {
    id: 3,
    title: "Elephant Cave & Ma Da Valley Jungle Trek 1D",
    level: "Level 2 - Easy to Moderate",
    duration: "1 day 1 night",
    rating: 4.9,
    reviews: "See Reviews",
    price: "VND 1,950,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
  {
    id: 4,
    title: "Phong Huong Excursion 2D1N",
    level: "Level 1 - Easy",
    duration: "2 days 1 night",
    rating: 4.9,
    reviews: "See Reviews",
    price: "VND 1,950,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
  {
    id: 5,
    title: "Phong Huong Adventure 2D1N",
    level: "Level 5 - Strenuous",
    duration: "2 days 1 night",
    rating: 4.9,
    reviews: "See Reviews",
    price: "VND 3,350,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
  {
    id: 6,
    title: "Ma Da Valley Adventure 2D1N",
    level: "Level 4 - Challenging",
    duration: "2 days 1 night",
    rating: 4.8,
    reviews: "See Reviews",
    price: "VND 2,850,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
];

const AllAdventureTour = () => {
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

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      {/* Header */}
      <div className="container mx-auto px-4 space-y-4 text-center lg:text-left">
        <h2 className="text-[#6c8a1f] pre-header text-xl font-semibold italic">
          All Adventure Tour
        </h2>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#004750]">
            Start Your Ideal Adventure Tour!
          </h1>
          <p className="text-gray-600">For a day trip, overnighter or longer</p>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative pt-10">
        {/* Navigation Buttons - Chỉ hiển thị trên desktop (≥768px) */}
        {!isMobile && (
          <>
            <button
              onClick={handlePrevClick}
              className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 left-4 xl:left-8 w-12 h-12 ${
                isBeginning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label="Previous slide"
              disabled={isBeginning}
            >
              <Image
                src="/images/homePage/pre.svg"
                alt="Previous"
                width={18}
                height={12}
                className="object-contain"
              />
            </button>

            <button
              onClick={handleNextClick}
              className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 right-4 xl:right-8 w-12 h-12 ${
                isEnd ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label="Next slide"
              disabled={isEnd}
            >
              <Image
                src="/images/homePage/pre.svg"
                alt="Next"
                className="rotate-180 object-contain"
                width={18}
                height={12}
              />
            </button>
          </>
        )}

        {/* Swiper với padding responsive - Giảm khoảng cách trên mobile */}
        <div className="px-1 sm:px-4 lg:px-0">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={setSwiperInstance}
            onSlideChange={({ isBeginning, isEnd }) => {
              setIsBeginning(isBeginning);
              setIsEnd(isEnd);
            }}
            className="overflow-visible h-[450px] sm:h-[430px] lg:h-[400px] xl:h-[420px] 2xl:h-[450px] relative"
            slidesPerView="auto"
            spaceBetween={isMobile ? 8 : 16}
            centeredSlides={isMobile}
            grabCursor={true}
            breakpoints={{
              // Mobile nhỏ: 1 card + peek, khoảng cách nhỏ để tiết kiệm không gian
              320: {
                slidesPerView: 1.4,
                spaceBetween: 2,
                centeredSlides: true,
              },
              // Mobile trung: 1 card + peek nhiều hơn, vẫn giữ khoảng cách nhỏ
              480: {
                slidesPerView: 1.4,
                spaceBetween: 4,
                centeredSlides: true,
              },
              // Tablet nhỏ: 1.8 card
              640: {
                slidesPerView: 1.8,
                spaceBetween: 16,
                centeredSlides: false,
              },
              // Tablet: 2.2 card
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              // Desktop nhỏ: 3 card
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
                centeredSlides: false,
              },
              // Desktop: 3.5 card
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 28,
                centeredSlides: false,
              },
              // Desktop lớn: 4 card
              1536: {
                slidesPerView: 4,
                spaceBetween: 32,
                centeredSlides: false,
              },
            }}
          >
            {tours.map((tour) => (
              <SwiperSlide key={tour.id}>
                <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[300px] xl:max-w-[320px] 2xl:max-w-[340px] mx-auto">
                  <article className="rounded-xl overflow-hidden shadow-md bg-white w-full h-full relative group">
                    {/* Image Section */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      {/* Decorative leaves với Tailwind CSS hover effects - Nhỏ hơn trên mobile */}
                      <Image
                        src="/images/homePage/leaf-bg-left.webp"
                        alt="leaf decoration"
                        width={80}
                        height={80}
                        className="absolute bottom-0 left-0 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] z-10 pointer-events-none opacity-0 translate-x-[-15px] translate-y-[15px] object-contain transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      />

                      <Image
                        src="/images/homePage/leaf-bg-right.webp"
                        alt="leaf decoration"
                        width={80}
                        height={80}
                        className="absolute top-0 right-0 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] z-10 pointer-events-none opacity-0 translate-x-[15px] translate-y-[-15px] object-contain transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      />

                      {/* Tour image */}
                      <Image
                        fill
                        src={tour.image}
                        alt={tour.title}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                      />
                    </div>

                    {/* Content Section - Tối ưu padding cho mobile */}
                    <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 space-y-2 sm:space-y-3">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 line-clamp-1 hover:text-[#6c8a1f] transition-colors duration-300 min-h-[2rem] sm:min-h-[2.5rem] lg:min-h-[3rem]">
                        {tour.title}
                      </h3>

                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                        <p className="font-medium">{tour.level}</p>

                        <div className="flex flex-col gap-y-1 sm:gap-y-2">
                          <span className="font-medium">{tour.duration}</span>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 text-gray-900">
                              <span className="font-semibold text-xs sm:text-sm">
                                {tour.rating}/5
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2l2.09 6.26L20 9.27l-5 3.64 1.18 6.89L12 16.9l-5.18 2.9L8 12.91 3 9.27l5.91-.91L12 2z" />
                              </svg>
                            </div>
                            <a
                              href="#"
                              className="text-green-600 hover:underline text-xs sm:text-sm"
                            >
                              ({tour.reviews})
                            </a>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-1 sm:pt-2 border-t border-gray-100">
                          <span className="text-gray-600 font-medium text-xs sm:text-sm">
                            Price
                          </span>
                          <span className="text-gray-900 font-semibold text-xs sm:text-sm lg:text-base">
                            {tour.price}
                          </span>
                        </div>
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
