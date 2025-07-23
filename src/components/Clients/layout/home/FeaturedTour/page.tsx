"use client";

import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TopAdventureTour = () => {
  const t = useTranslations("common.featuredTour");
  const [isVisible, setIsVisible] = useState(false);
  const section5Ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiperRef = useRef<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsVisible(anyVisible);
      },
      {
        threshold: 0.3,
      }
    );
    if (section5Ref.current) {
      observer.observe(section5Ref.current);
    }
    return () => observer.disconnect();
  }, []);

  // High quality images matching the design
  const images = [
    {
      id: "1",
      alt: "Kong Collapse Cave Adventure",
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=90",
    },
    {
      id: "2",
      alt: "Underground Cave Exploration",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=90",
    },
    {
      id: "3",
      alt: "Cave Water Adventure",
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=90",
    },
    {
      id: "4",
      alt: "Rock Formation Climbing",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=90",
    },
    {
      id: "5",
      alt: "Cave Rappelling Adventure",
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=90",
    },
    {
      id: "6",
      alt: "Underground River Exploration",
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&q=90",
    },
    {
      id: "7",
      alt: "Cave Adventure Team",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=90",
    },
  ];

  return (
    <section ref={section5Ref} className="relative overflow-hidden bg-gray-50 py-8 lg:py-16">
      {/* Decorative background leaf */}
      <div className="absolute top-0 right-0 z-30 pointer-events-none">
        <Image
          src="/images/homePage/leaf-bg-right.webp"
          alt="leaf decoration"
          width={267}
          height={267}
          className={`transition-transform duration-700 ease-out w-[150px] h-[150px] lg:w-[267px] lg:h-[267px] ${
            isVisible ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"
          }`}
          loading="eager"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          {/* Left Side - Image Section */}
          <div className="lg:w-[65%] space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] lg:aspect-[3/2] relative rounded-2xl overflow-hidden">
              <Swiper
                loop={true}
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={0}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                className="h-full w-full"
              >
                {images.map((img) => (
                  <SwiperSlide key={img.id}>
                    <div className="relative h-full w-full">
                      <Image
                        fill
                        src={img.src}
                        alt={img.alt}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        priority={img.id === "1"}
                        quality={95}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Slider & Navigation */}
            <div className="space-y-4">
              {/* Thumbnail Slider */}
              <div className="relative">
                <Swiper
                  loop={true}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={6}
                  spaceBetween={12}
                  watchSlidesProgress
                  className="thumbnail-swiper"
                  breakpoints={{
                    320: { slidesPerView: 3, spaceBetween: 8 },
                    480: { slidesPerView: 4, spaceBetween: 10 },
                    768: { slidesPerView: 5, spaceBetween: 12 },
                    1024: { slidesPerView: 6, spaceBetween: 12 },
                    1280: { slidesPerView: 7, spaceBetween: 12 },
                  }}
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={img.id}>
                      <button
                        className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          currentSlide === index
                            ? "border-[#6c8a1f] scale-105 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 shadow-sm"
                        }`}
                        onClick={() => swiperRef.current?.slideTo(index)}
                      >
                        <Image
                          fill
                          src={img.src}
                          alt={`Thumbnail ${index + 1}`}
                          className="object-cover"
                          sizes="(max-width: 768px) 20vw, 12vw"
                        />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-6">
                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
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
                    onClick={nextSlide}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
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
                </div>

                {/* Progress Bar */}
                <div className="w-32">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6c8a1f] rounded-full transition-all duration-300"
                      style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Pagination */}
                <div className="text-sm text-gray-600 font-medium">
                  <span className="text-gray-900">{String(currentSlide + 1).padStart(2, "0")}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-400">{String(images.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content Section */}
          <div className="lg:w-[35%] bg-white rounded-2xl p-6 lg:p-8 shadow-sm h-fit">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h2 className="pre-header text-[#6c8a1f] tracking-[1.4px]">{t("title")}</h2>
                <h1 className="text-2xl lg:text-3xl font-bold uppercase text-[#004750] leading-tight">
                  KONG COLLAPSE TOP ADVENTURE 5D4N
                </h1>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  The 05-day, 04-night journey to conquer Kong collapse will take you on an
                  adventurous and challenging expedition. This is one of the most exciting...
                </p>
              </div>

              {/* Tour Details */}
              <div className="space-y-3">
                {/* Duration */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/duration.svg"
                      alt="duration icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Duration</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">5 days 4 nights</span>
                </div>

                {/* Participant */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/participant.svg"
                      alt="participant icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Participant</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">Up to 10 pax</span>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/difficulty.svg"
                      alt="difficulty icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Difficulty</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">
                    Level 7 - Extremely Strenuous
                  </span>
                </div>

                {/* Departure Day */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/departureDay.svg"
                      alt="departure icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Departure Day</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">Tuesday, Friday</span>
                </div>

                {/* Meeting Point */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/meetingPoint.svg"
                      alt="meeting point icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Meeting point</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">Jungle Boss Office</span>
                </div>

                {/* Overall Rating */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/star.svg"
                      alt="rating icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Overall rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-semibold text-sm">4.9</span>
                    <Image
                      src="/images/homePage/star.svg"
                      alt="star"
                      width={14}
                      height={14}
                      className="w-[14px] h-[14px]"
                    />
                    <span className="text-gray-600 text-xs">(1007 reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/homePage/price.svg"
                      alt="price icon"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">Price</span>
                  </div>
                  <span className="text-gray-900 font-bold text-base">VND 35,000,000/pax</span>
                </div>
              </div>

              {/* Book Tour Button */}
              <div className="pt-4">
                <ButtonPrimary name="Book Tour" href="/booking" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopAdventureTour;
