"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const AllAdventureTour = () => {
  return (
    <section className="py-10 lg:py-16">
      <div className="container mx-auto px-4 space-y-4">
        <h2 className="text-[#6c8a1f] text-xl font-semibold italic">All Adventure Tour</h2>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#004750]">Start Your Ideal Adventure Tour!</h1>
          <p className="text-gray-600">For a day trip, overnighter or longer</p>
        </div>
      </div>

      <div className="relative mt-8">
        {/* Navigation buttons */}
        <button className="btn-slider advTourNavPrev absolute top-[115px] xl:left-12 lg:left-2 z-10 hidden lg:block" aria-label="prev button">
          <Image src="/images/home/pre.svg" alt="arrow left" width={17} height={10} />
        </button>
        <button className="btn-slider advTourNavNext absolute top-[115px] xl:right-12 lg:right-2 z-10 hidden lg:block" aria-label="next button">
          <Image src="/images/home/pre.svg" alt="arrow right" className="rotate-180" width={17} height={10} />
        </button>


        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation={{
            nextEl: ".advTourNavNext",
            prevEl: ".advTourNavPrev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SwiperSlide key={i}>
              <article className="rounded-2xl bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
                <a href="/tour/do-quyen-waterfall-zipline">
                  <div className="relative w-full h-[180px]">
                    <Image
                      src="https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
                      alt="Tour"
                      fill
                      className="object-cover rounded-t-2xl"
                    />
                  </div>
                </a>
                <div className="p-4 space-y-2 text-sm">
                  <a href="/tour/do-quyen-waterfall-zipline">
                    <h3 className="font-semibold text-base text-gray-900 hover:text-[#6c8a1f] transition line-clamp-2">
                      Phi Lieng Exploration 2D1N
                    </h3>
                  </a>
                  <p className="text-gray-600">Level 6 - Very Strenuous</p>
                  <p className="text-gray-600">2 days 1 night</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <span>4.9/5</span>
                      <span className="text-black">★</span>
                    </div>
                    <a
                      href="https://www.tripadvisor.com/Attraction_Review-g4014591-d8403784-Reviews-Jungle_Boss_Tours-Phong_Nha_Ke_Bang_National_Park_Quang_Binh_Province.html"
                      className="text-green-600 hover:underline text-xs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (See Reviews)
                    </a>
                  </div>

                  <div className="flex justify-between items-center pt-2 font-semibold text-sm">
                    <span className="text-gray-800">Price</span>
                    <span className="text-gray-900">VND 8,500,000/pax</span>
                  </div>
                </div>
              </article>
            </SwiperSlide>

          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default AllAdventureTour;
