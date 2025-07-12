"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const FeaturedTour = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const anyVisible = entries.some(entry => entry.isIntersecting);
                setIsVisible(anyVisible);
            },
            {
                threshold: 0.3,
            }
        );
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const images = [
        {
            id: 1,
            src: "/images/homePage/tour1.webp",
            alt: "Kong Collapse Adventure 1"
        },
        {
            id: 2,
            src: "/images/homePage/tour2.webp",
            alt: "Kong Collapse Adventure 2"
        },
        {
            id: 3,
            src: "/images/homePage/tour3.webp",
            alt: "Kong Collapse Adventure 3"
        },
        {
            id: 4,
            src: "/images/homePage/tour4.webp",
            alt: "Kong Collapse Adventure 4"
        },
        {
            id: 5,
            src: "/images/homePage/tour5.webp",
            alt: "Kong Collapse Adventure 5"
        },
        {
            id: 6,
            src: "/images/homePage/tour6.webp",
            alt: "Kong Collapse Adventure 6"
        },
        {
            id: 7,
            src: "/images/homePage/tour7.webp",
            alt: "Kong Collapse Adventure 7"
        }
    ];

    const nextSlide = () => {
        if (thumbsSwiper) {
            thumbsSwiper.slideNext();
        }
    };

    const prevSlide = () => {
        if (thumbsSwiper) {
            thumbsSwiper.slidePrev();
        }
    };

    return (
        <>
            <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen">
                {/* Leaf Decoration with Animation */}
                <div className="absolute top-0 right-0 z-20">
                    <Image
                        src="/images/homePage/leaf-bg-right.webp"
                        alt="leaf decoration"
                        width={267}
                        height={267}
                        className={`transition-transform duration-700 ease-out w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px] ${isVisible
                            ? "translate-x-0 translate-y-0"
                            : "translate-x-full -translate-y-full"
                        }`}
                        loading="eager"
                    />
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-[#6c8a1f] pre-header font-medium text-sm tracking-wider uppercase mb-2">
                            Top Adventure Tour
                        </p>
                        <h3 className="uppercase headline-1 text-[#004750] ">Kong Collapse Top Adventure 5D4N</h3>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Desktop Layout: Left Image, Right Info */}
                        <div className="hidden lg:grid lg:grid-cols-5 gap-8">
                            {/* Main Image Section - Takes 3/5 of space */}
                            <div className="lg:col-span-3 relative">
                                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                                    <Swiper
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                                        className="h-full rounded-2xl"
                                    >
                                        {images.map((img) => (
                                            <SwiperSlide key={img.id}>
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src="https://cms.junglebosstours.com/assets/1d18331f-a8e6-4a29-b61f-dd6dcabacaed?format=webp&width=700&height=905&quality=100"
                                                        alt={img.alt}
                                                        fill
                                                        className="object-cover"
                                                        priority={img.id === 1}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Navigation arrows */}
                                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all group">
                                        <svg className="w-5 h-5 text-gray-700 group-hover:text-[#6c8a1f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all group">
                                        <svg className="w-5 h-5 text-gray-700 group-hover:text-[#6c8a1f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Desktop Info Section */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        The 05-day, 04-night journey to conquer Kong collapse will take you on an adventurous and challenging expedition. This is one of the most exciting...
                                    </p>

                                    {/* Tour Details */}
                                    <div className="space-y-4 mb-8">
                                        {/* Duration */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Duration</span>
                                            </div>
                                            <span className="text-gray-900 font-semibold text-sm">5 days 4 nights</span>
                                        </div>

                                        {/* Participants */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Participants</span>
                                            </div>
                                            <span className="text-gray-900 font-semibold text-sm">Up to 10 pax</span>
                                        </div>

                                        {/* Difficulty */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Difficulty</span>
                                            </div>
                                            <span className="text-red-600 font-semibold text-sm">Level 7 - Extremely Strenuous</span>
                                        </div>

                                        {/* Departure Day */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Departure Day</span>
                                            </div>
                                            <span className="text-gray-900 font-semibold text-sm">Tuesday, Friday</span>
                                        </div>

                                        {/* Meeting Point */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Meeting point</span>
                                            </div>
                                            <span className="text-gray-900 font-semibold text-sm">Jungle Boss Office</span>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Overall rating</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-gray-900 font-semibold text-sm">4.9</span>
                                                <span className="text-yellow-400 text-sm">★</span>
                                                <span className="text-gray-500 text-xs">(1000 reviews)</span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center justify-between py-3 border-t pt-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                                <span className="text-gray-700 text-sm font-medium">Price</span>
                                            </div>
                                            <span className="text-[#6c8a1f] font-bold text-base">VND 35,000,000/pax</span>
                                        </div>
                                    </div>

                                    {/* Book Button */}
                                    <ButtonPrimary name="Book Tour" className="w-full py-3 bg-[#6c8a1f] hover:bg-[#5a7419] text-white font-semibold rounded-xl transition-colors" />
                                </div>

                                {/* Desktop Thumbnail Gallery */}
                                <div className="space-y-4">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={12}
                                        slidesPerView={3.5}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="gallery-thumbs"
                                    >
                                        {images.map((img, index) => (
                                            <SwiperSlide key={img.id}>
                                                <div
                                                    className={`relative w-full h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${currentSlide === index
                                                        ? 'ring-2 ring-[#6c8a1f] ring-offset-1 scale-105'
                                                        : 'hover:scale-102'
                                                    }`}
                                                >
                                                    <Image
                                                        src="https://cms.junglebosstours.com/assets/1d18331f-a8e6-4a29-b61f-dd6dcabacaed?format=webp&width=700&height=905&quality=100"
                                                        alt={`Thumbnail ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {currentSlide !== index && (
                                                        <div className="absolute inset-0 bg-black/20"></div>
                                                    )}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Progress Bar and Pagination */}
                                    <div className="flex items-center space-x-4">
                                        {/* Navigation Buttons */}
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={prevSlide}
                                                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="flex-1">
                                            <div className="h-1 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-full bg-gray-400 rounded-full transition-all duration-300"
                                                    style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Pagination */}
                                        <div className="text-sm text-gray-600">
                      <span className="font-medium">
                        {String(currentSlide + 1).padStart(2, '0')}
                      </span>
                                            <span className="text-gray-400 mx-1">/</span>
                                            <span className="text-gray-400">
                        {String(images.length).padStart(2, '0')}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Layout: Stack Vertically */}
                        <div className="lg:hidden space-y-6">
                            {/* Mobile Main Image */}
                            <div className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Swiper
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={{
                                        nextEl: '.swiper-button-next-mobile',
                                        prevEl: '.swiper-button-prev-mobile',
                                    }}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                                    className="h-full rounded-2xl"
                                >
                                    {images.map((img) => (
                                        <SwiperSlide key={img.id}>
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src="https://cms.junglebosstours.com/assets/1d18331f-a8e6-4a29-b61f-dd6dcabacaed?format=webp&width=700&height=905&quality=100"
                                                    alt={img.alt}
                                                    fill
                                                    className="object-cover"
                                                    priority={img.id === 1}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Mobile Navigation arrows */}
                                <button className="swiper-button-prev-mobile absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button className="swiper-button-next-mobile absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Thumbnail Gallery */}
                            <div className="px-4">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={8}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="gallery-thumbs"
                                >
                                    {images.map((img, index) => (
                                        <SwiperSlide key={img.id}>
                                            <div
                                                className={`relative w-full h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${currentSlide === index
                                                    ? 'ring-2 ring-[#6c8a1f] ring-offset-1'
                                                    : ''
                                                }`}
                                            >
                                                <Image
                                                    src="https://cms.junglebosstours.com/assets/1d18331f-a8e6-4a29-b61f-dd6dcabacaed?format=webp&width=700&height=905&quality=100"
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {currentSlide !== index && (
                                                    <div className="absolute inset-0 bg-black/20"></div>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Mobile Info Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mx-4">
                                <p className="text-[#6c8a1f] pre-header font-medium text-sm tracking-wider uppercase mb-2">
                                    Top Adventure Tour
                                </p>
                                <h3 className="uppercase headline-1 text-[#004750] ">Kong Collapse Top Adventure 5D4N</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    The 05-day, 04-night journey to conquer Kong collapse will take you on an adventurous and challenging expedition. This is one of the most exciting adventure tours in Vietnam, with the...
                                </p>

                                {/* Tour Details */}
                                <div className="space-y-3 mb-6">
                                    {/* Duration */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                            <span className="text-gray-700 text-sm font-medium">Duration</span>
                                        </div>
                                        <span className="text-gray-900 font-semibold text-sm">5 days 4 nights</span>
                                    </div>

                                    {/* Participants */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                            <span className="text-gray-700 text-sm font-medium">Participants</span>
                                        </div>
                                        <span className="text-gray-900 font-semibold text-sm">Up to 10 pax</span>
                                    </div>

                                    {/* Difficulty */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                            <span className="text-gray-700 text-sm font-medium">Difficulty</span>
                                        </div>
                                        <span className="text-red-600 font-semibold text-sm">Level 7 - Extremely Strenuous</span>
                                    </div>

                                    {/* Departure Day */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-[#6c8a1f] rounded-full"></div>
                                            <span className="text-gray-700 text-sm font-medium">Departure Day</span>
                                        </div>
                                        <span className="text-gray-900 font-semibold text-sm">Tuesday, Friday</span>
                                    </div>
                                </div>

                                {/* Book Button */}
                                <ButtonPrimary name="Book Tour" className="w-full py-3 bg-[#6c8a1f] hover:bg-[#5a7419] text-white font-semibold rounded-xl transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturedTour;
