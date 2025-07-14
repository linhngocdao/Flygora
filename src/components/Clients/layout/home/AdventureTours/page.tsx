"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const AllAdventureTour = () => {
  // Sample tour data - replace with your actual data
  const tours = [
    {
      id: 1,
      title: "Tra Ang Excursion 1D",
      level: "Level 1 - Easy",
      duration: "1 day",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 800,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 2,
      title: "Phong Huong Adventure 1D",
      level: "Level 3 - Moderate",
      duration: "1 day",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 1,350,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 3,
      title: "Elephant Cave & Ma Da Valley Jungle...",
      level: "Level 2 - Easy to Moderate",
      duration: "1 day 1 night",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 1,950,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 4,
      title: "Phong Huong Excursion 2D1N",
      level: "Level 1 - Easy",
      duration: "2 days 1 night",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 1,950,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 5,
      title: "Phong Huong Adventure 2D1N",
      level: "Level 5 - Strenuous",
      duration: "2 days 1 night",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 3,350,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 6,
      title: "Ma Da Valley Jungle Camping 2D1N",
      level: "Level 2 - Easy to Moderate",
      duration: "2 days 1 night",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 4,500,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 7,
      title: "Hang Pygmy Exploration 2D1N",
      level: "Level 6 - Very Strenuous",
      duration: "2 days 1 night",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 7,900,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    },
    {
      id: 8,
      title: "Phi Lieng Exploration 2D1N",
      level: "Level 6 - Very Strenuous",
      duration: "2 days 1 night",
      rating: 4.9,
      reviews: "See Reviews",
      price: "VND 8,500,000/pax",
      image: "https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
    }
  ];

  return (
      <section className="py-8 lg:py-16 bg-gray-50">
        {/* Header */}
        <div className="container mx-auto px-4 space-y-4 pb-10">
          <h2 className="text-[#6c8a1f] pre-header text-xl font-semibold italic">All Adventure Tour</h2>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#004750]">Start Your Ideal Adventure Tour!</h1>
            <p className="text-gray-600">For a day trip, overnighter or longer</p>
          </div>
        </div>

        {/* Full Width Swiper Container */}
        <div className="relative">
          {/* Desktop Navigation Buttons */}
          <button className="btn-slider cursor-pointer advTourNavPrev absolute top-1/2 -translate-y-1/2 left-4 xl:left-8 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300" aria-label="Previous slide">
            <Image src="/images/homePage/pre.svg" alt="Previous" width={18} height={12} />
          </button>
          <button className="btn-slider cursor-pointer advTourNavNext absolute top-1/2 -translate-y-1/2 right-4 xl:right-8 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300" aria-label="Next slide">
            <Image src="/images/homePage/pre.svg" alt="Next" className="rotate-180" width={18} height={12} />
          </button>

          {/* Swiper */}
          <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              navigation={{
                nextEl: ".advTourNavNext",
                prevEl: ".advTourNavPrev",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom"
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                1536: {
                  slidesPerView: 6,
                  spaceBetween: 0,
                },
              }}
              className="w-full"
          >
            {tours.map((tour) => (
                <SwiperSlide key={tour.id}>
                  <article className="rounded-2xl mr-[16px] bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
                    <Link href="/tour/do-quyen-waterfall-zipline">
                      <div className="relative w-full h-[180px]">
                        <Image
                            src="https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
                            alt="Tour"
                            fill
                            className="object-cover rounded-t-2xl"
                        />
                      </div>
                    </Link>
                    <div className="p-4 space-y-2 text-sm">
                      <Link href="/tour/do-quyen-waterfall-zipline">
                        <h3 className="font-semibold text-base text-gray-900 hover:text-[#6c8a1f] transition line-clamp-1">
                          {tour.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600">{tour.level}</p>
                      <p className="text-gray-600">{tour.duration}</p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <span>{tour.rating}/5</span>
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
                        <span className="text-gray-900">VND {tour.price} /pax</span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination for Mobile */}
          <div className="swiper-pagination-custom flex justify-center mt-6 lg:hidden"></div>
        </div>

        {/* Custom Styles */}
        <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          border-radius: 50%;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #6c8a1f;
          transform: scale(1.2);
        }

        .btn-slider:hover {
          transform: scale(1.05);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      </section>
  );
};

export default AllAdventureTour;
