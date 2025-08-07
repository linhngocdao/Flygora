"use client";

import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const TopAdventureTour = () => {
  const t = useTranslations("common.featuredTour");
  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible);
  const section5Ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiperRef = useRef<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // Framer Motion hooks
  const isInView = useInView(section5Ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: section5Ref,
    offset: ["start end", "end start"],
  });

  const leafY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
  };

  const slideVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants: any = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  };

  // High quality images matching the design
  const images = [
    {
      id: "1",
      alt: "Kong Collapse Cave Adventure",
      src: "/images/homePage/foodtour1.jpg",
    },
    {
      id: "2",
      alt: "Underground Cave Exploration",
      src: "/images/homePage/foodtour2.jpg",
    },
    {
      id: "3",
      alt: "Cave Water Adventure",
      src: "/images/homePage/foodtour3.jpg",
    },
    {
      id: "4",
      alt: "Rock Formation Climbing",
      src: "/images/homePage/foodtour4.jpg",
    },
    {
      id: "5",
      alt: "Cave Rappelling Adventure",
      src: "/images/homePage/foodtour5.jpg",
    },
    {
      id: "6",
      alt: "Underground River Exploration",
      src: "/images/homePage/foodtour6.jpg",
    },
    {
      id: "7",
      alt: "Cave Adventure Team",
      src: "/images/homePage/foodtour17.jpg",
    },
    {
      id: "8",
      alt: "Cave Adventure Team",
      src: "/images/homePage/foodtour8.jpg",
    },
  ];

  const tourDetails = [
    {
      icon: "/images/homePage/duration.svg",
      label: "Duration",
      value: "4-6 hours",
    },
    {
      icon: "/images/homePage/participant.svg",
      label: "Participant",
      value: "Up to 12 pax",
    },
    {
      icon: "/images/homePage/difficulty.svg",
      label: "Service",
      value: "Vietnamese food, drink",
    },
    {
      icon: "/images/homePage/departureDay.svg",
      label: "Departure Day",
      value: "Everyday",
    },
    {
      icon: "/images/homePage/meetingPoint.svg",
      label: "Meeting point",
      value: "In tour detail",
    },
  ];

  return (
    <section
      ref={section5Ref}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 lg:py-16 xl:py-20"
    >
      {/* Animated decorative background leaf */}
      <motion.div
        className="absolute top-4 right-4 z-10 pointer-events-none"
        style={{ y: leafY, rotate: leafRotate }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50, y: -50 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3,
          }}
        >
          <Image
            src="/images/homePage/leaf-bg-right.webp"
            alt="leaf decoration"
            width={200}
            height={200}
            className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 opacity-80"
            loading="eager"
          />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Side - Image Section */}
          <motion.div className="w-full lg:w-3/5 xl:w-2/3 space-y-4" variants={slideVariants}>
            {/* Main Image */}
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2] relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-xl">
              <Swiper
                loop={true}
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={0}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                className="h-full w-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Slider */}
            <div className="relative">
              <Swiper
                loop={true}
                onSwiper={setThumbsSwiper}
                slidesPerView={8}
                spaceBetween={8}
                watchSlidesProgress
                className="thumbnail-swiper"
                breakpoints={{
                  320: { slidesPerView: 4, spaceBetween: 6 },
                  480: { slidesPerView: 5, spaceBetween: 6 },
                  640: { slidesPerView: 6, spaceBetween: 8 },
                  768: { slidesPerView: 7, spaceBetween: 8 },
                  1024: { slidesPerView: 8, spaceBetween: 8 },
                  1280: { slidesPerView: 8, spaceBetween: 10 },
                }}
              >
                {images.map((img, index) => (
                  <SwiperSlide key={img.id}>
                    <motion.button
                      className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentSlide === index
                          ? "border-[#6c8a1f] scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => swiperRef.current?.slideTo(index)}
                      whileHover={{ scale: currentSlide === index ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Image
                        fill
                        src={img.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover"
                        sizes="(max-width: 768px) 12vw, 8vw"
                      />
                    </motion.button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Controls */}
            <motion.div className="flex items-center justify-center gap-4" variants={slideVariants}>
              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-[#6c8a1f] hover:bg-[#6c8a1f] group transition-all duration-200 shadow-sm flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors"
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
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-[#6c8a1f] hover:bg-[#6c8a1f] group transition-all duration-200 shadow-sm flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors"
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
                </motion.button>
              </div>

              {/* Progress indicator */}
              <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                <span className="text-[#6c8a1f] font-bold">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-400">{String(images.length).padStart(2, "0")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content Section */}
          <motion.div className="w-full lg:w-2/5 xl:w-1/3" variants={contentVariants}>
            {/* Header Section */}
            <div className="mb-6">
              <motion.h2
                className="text-xs sm:text-sm text-[#6c8a1f] tracking-wider font-semibold uppercase mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {t("title")}
              </motion.h2>

              <motion.h1
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#004750] leading-tight mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Hanoi Exclusive Food Tour
              </motion.h1>

              <motion.p
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Explore Hanoi&apos;s Old Quarter backstreets, visiting authentic local eateries and
                seeing iconic sights. This immersive food tour includes making your own banh mi,
                visiting the largest wet market, and trying over 10 different dishes showcasing
                Vietnam&apos;s incredible cuisine and culture.
              </motion.p>
            </div>

            {/* Tour Details */}
            <div className="space-y-4 mb-6">
              {tourDetails.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{
                    delay: 0.7 + index * 0.05,
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={detail.icon}
                      alt={`${detail.label} icon`}
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] opacity-70"
                    />
                    <span className="text-gray-700 text-sm">{detail.label}</span>
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">{detail.value}</span>
                </motion.div>
              ))}

              {/* Rating */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{
                  delay: 0.95,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
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
                  <span className="font-bold text-sm text-[#6c8a1f]">4.9</span>
                  <Image
                    src="/images/homePage/star.svg"
                    alt="star"
                    width={14}
                    height={14}
                    className="w-[14px] h-[14px]"
                  />
                  <span className="text-gray-600 text-xs">(1007 reviews)</span>
                </div>
              </motion.div>

              {/* Price */}
              <motion.div
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-gradient-to-r from-[#6c8a1f]/10 to-[#8ba843]/10 border border-[#6c8a1f]/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{
                  delay: 1.0,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/homePage/price.svg"
                    alt="price icon"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] opacity-70"
                  />
                  <span className="text-gray-700 text-sm font-medium">Price</span>
                </div>
                <span className="text-[#6c8a1f] font-bold text-lg">USD 35/pax</span>
              </motion.div>
            </div>

            {/* Book Tour Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: 1.1,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ButtonPrimary name="Book Tour" href="/booking" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopAdventureTour;
