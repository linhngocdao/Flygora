"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

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
    title: "Elephant Cave & Ma Da Valley Jungle...",
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
    title: "Phong Huong Adventure 2D1N",
    level: "Level 5 - Strenuous",
    duration: "2 days 1 night",
    rating: 4.9,
    reviews: "See Reviews",
    price: "VND 3,350,000/pax",
    image:
      "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp",
  },
];

const AllAdventureTour = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-8 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 space-y-4">
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

      <div className="relative pt-10">
        {!isMobile && (
          <>
            <button
              className={`cursor-pointer btn-slider advTourNavPrev absolute top-1/2 -translate-y-1/2 left-4 xl:left-8 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isBeginning ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Previous slide"
              disabled={isBeginning}
            >
              <Image src="/images/homePage/pre.svg" alt="Next" width={18} height={12} />
            </button>
            <button
              className={`cursor-pointer btn-slider advTourNavNext absolute top-1/2 -translate-y-1/2 right-4 xl:right-8 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isEnd ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Next slide"
              disabled={isEnd}
            >
              <Image
                src="/images/homePage/pre.svg"
                alt="Next"
                className="rotate-180"
                width={18}
                height={12}
              />
            </button>
          </>
        )}

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".advTourNavNext",
            prevEl: ".advTourNavPrev",
          }}
          onSlideChange={({ isBeginning, isEnd }) => {
            setIsBeginning(isBeginning);
            setIsEnd(isEnd);
          }}
          className="h-[400px] lg:h-[380px] xl:h-[380px] relative"
          slidesPerView={5}
          spaceBetween={0}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 28 },
            1280: { slidesPerView: 5, spaceBetween: 32 },
          }}
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <div className="min-w-[300px] max-w-[360px] flex-shrink-0 snap-start group relative">
                {/* Card */}
                <article className="rounded-xl overflow-hidden shadow-md bg-white w-full h-full relative z-10">
                  <div className="relative aspect-[3/2] w-full overflow-hidden group">
                    {/* Lá trái */}
                    <Image
                      src="/images/homePage/leaf-bg-left.webp"
                      alt="leaf left"
                      width={100}
                      height={100}
                      className="absolute bottom-0 left-[-100] !w-[80px] !h-[80px] z-10 pointer-events-none
  opacity-0 translate-x-[-20px] translate-y-[20px]
  group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0
  transition-all duration-500 ease-out
  object-contain"
                    />

                    {/* Lá phải */}
                    <Image
                      src="/images/homePage/leaf-bg-right.webp"
                      alt="leaf right"
                      width={267}
                      height={267}
                      className="absolute top-0 right-0 w-[80px] h-[80px] max-md:w-[60px] max-md:h-[60px] z-10 pointer-events-none
      opacity-0 translate-x-[20px] translate-y-[-20px]
      group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0
      transition-all duration-500 ease-out"
                    />

                    {/* Ảnh tour */}
                    <Image
                      fill
                      src={tour.image}
                      alt="Tour Image"
                      className="object-cover w-full h-full z-0"
                    />
                  </div>

                  <div className="px-4 sm:px-5 md:px-6 py-4 space-y-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 line-clamp-1 hover:text-primary transition-colors duration-300">
                      {tour.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>{tour.level}</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-1 sm:gap-y-0">
                        <span>{tour.duration}</span>
                        <div className="flex items-center gap-1 text-gray-900">
                          <span className="font-semibold">{tour.rating}/5</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l2.09 6.26L20 9.27l-5 3.64 1.18 6.89L12 16.9l-5.18 2.9L8 12.91 3 9.27l5.91-.91L12 2z" />
                          </svg>
                          <a href="#" className="text-green-600 hover:underline text-xs sm:text-sm">
                            ({tour.reviews})
                          </a>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Price</span>
                        <span className="text-gray-900 font-semibold">{tour.price}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AllAdventureTour;
