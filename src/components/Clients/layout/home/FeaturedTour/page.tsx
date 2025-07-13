"use client"
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, Thumbs} from "swiper/modules";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const TopAdventureTour = () => {
    const [isVisible, setIsVisible] = useState(false);
    const section5Ref = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const anyVisible = entries.some(entry => entry.isIntersecting);
            setIsVisible(anyVisible);
        }, {
            threshold: 0.3,
        });
        if (section5Ref.current) {
            observer.observe(section5Ref.current);
        }
        return () => observer.disconnect();
    }, []);
    const images = [{
        id: '1',
        alt: 'Image 1',
        src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop'
    }, {
        id: '2',
        alt: 'Image 2',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    }, {
        id: '3',
        alt: 'Image 3',
        src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    }, {
        id: '4',
        alt: 'Image 4',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    }, {
        id: '5',
        alt: 'Image 5',
        src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    }, {
        id: '6',
        alt: 'Image 6',
        src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop'
    }, {
        id: '7',
        alt: 'Image 7',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },];

    return (<>
            <section ref={section5Ref} className="relative overflow-hidden section-animation">
                <div className="relative z-10 items-center lg:flex bg-gray-50">
                    {/* view image */}
                    <div className=" lg:w-[48.5%] lg:h-full aspect-1 lg:absolute top-0 left-0 overflow-hidden">
                        <Swiper
                            loop={true}
                            modules={[Navigation, Pagination, Scrollbar, Thumbs]}
                            spaceBetween={10}
                            thumbs={{swiper: thumbsSwiper}}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                            pagination={{clickable: true}}
                            className="h-full"
                        >
                            {images.map((img) => (<SwiperSlide key={img.id}>
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>))}
                        </Swiper>
                    </div>

                    {/* slider image */}
                    <div
                        className="w-full md:w-[63%] md:absolute right-0 lg:bottom-[14%] md:bottom-[45%] max-lg:mt-8 px-6">
                        <Swiper
                            loop={true}
                            onSwiper={setThumbsSwiper}
                            slidesPerView={5}
                            spaceBetween={16}
                            watchSlidesProgress
                            breakpoints={{
                                320: {slidesPerView: 2.3},
                                480: {slidesPerView: 3},
                                768: {slidesPerView: 4},
                                1024: {slidesPerView: 5},
                            }}
                            grabCursor
                            className="!overflow-visible"
                        >
                            {images.map((img, index) => (<SwiperSlide key={img.id}>
                                    <button
                                        className={`w-[160px] h-[110px] md:w-[170px] md:h-[120px] rounded-lg overflow-hidden border-2 transition-all duration-200
            ${currentSlide === index ? 'border-[#6c8a1f] scale-105 shadow-lg' : 'border-transparent'}`}
                                    >
                                        <img
                                            src={img.src}
                                            alt={`Thumb ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                </SwiperSlide>))}
                        </Swiper>
                    </div>


                    {/* content */}
                    <div
                        className="container flex lg:flex-col flex-col-reverse lg:items-end justify-between h-full pt-[27px] max-lg:py-8 relative">
                        <div className="xl:w-[568px] lg:w-1/2 space-y-4 lg:pl-4 xl:pl-0 lg:pb-[300px]">
                            <h2 className="pre-header text-[#6c8a1f] tracking-[1.4px]">Top Adventure Tour</h2>
                            <div className="space-y-4">
                                <h3 className="uppercase headline-1 text-[#004750] ">Kong Collapse Top Adventure
                                    5D4N</h3>
                                <div className="text-gray-700 body-1 line-clamp-2">
                                    <p>The 05-day, 04-night journey to conquer Kong collapse will take you on an
                                        adventurous and challenging
                                        expedition. This is one of the most exciting adventure tours in Vietnam, with
                                        the highlight being the
                                        thrilling experience of rappel down a 100-meter deep sinkhole. In addition, you
                                        will swim and explore the
                                        Tiger cave, admire the magnificent beauty of the stalactite formations in Hang
                                        Over cave, and camp
                                        overnight in Pygmy cave – the 4th largest cave in the world.</p>
                                </div>
                                <div className="space-y-2 !mt-6">
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/duration.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Duration</div>
                                        </div>
                                        <div className="space-x-1 text-right text-gray-900 title-3">
                                            <span>5 days 4 nights</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/participant.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Participant</div>
                                        </div>
                                        <div className="space-x-1 text-right text-gray-900 title-3">
                      <span>Up to
                        10 pax</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/difficulty.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Difficulty</div>
                                        </div>
                                        <div className="space-x-1 text-right text-gray-900 title-3">
                                            <span>Level 7 - Extremely Strenuous </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/departureDay.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Departure Day</div>
                                        </div>
                                        <div className="space-x-1 text-right text-gray-900 title-3">
                                            <span>Tuesday, Friday</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/meetingPoint.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Meeting point</div>
                                        </div>
                                        <div className="space-x-1 text-right text-gray-900 title-3">
                                            <span>Jungle Boss Office</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/duration.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Overall rating</div>
                                        </div>
                                        <div
                                            className="space-x-1 text-right text-gray-900 title-3 flex flex-grow items-center justify-end">
                                            <span>4.9</span>
                                            <Image
                                                src="/images/homePage/star.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="tracking-[0.28px] body-2 text-gray-700"> (995 reviews)</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
                                        <div className="flex w-[162px] space-x-2 items-center">
                                            <Image
                                                src="/images/homePage/price.svg"
                                                alt="calendar icon"
                                                width={20}
                                                height={20}
                                            />
                                            <div className="text-gray-700 label-1">Price</div>
                                        </div>
                                        <div className="space-x-1 text-right text-gray-900 title-3">
                                            <span>VND 35,000,000/pax</span>
                                        </div>
                                    </div>
                                    <ButtonPrimary name="Book Tour"/>
                                </div>
                            </div>
                            {/* slider button, pagination, scroll bar */}
                            <div className="lg:w-1/2 pb-[37px] space-x-8 flex items-center xl:pl-8 max-lg:hidden">
                                {/* Buttons */}
                                <div className="flex space-x-2">
                                    <button onClick={prevSlide}
                                            className="btn-slider selectNavPrev swiper-button-disabled">
                                        <Image
                                            src="/images/homePage/pre.svg"
                                            alt="arrow left"
                                            width={17}
                                            height={10}
                                        />
                                    </button>
                                    <button onClick={nextSlide}
                                            className="btn-slider selectNavNext rounded-full p-5 bg-amber-200">
                                        <Image
                                            src="/images/homePage/pre.svg"
                                            alt="arrow left"
                                            className="rotate-180"
                                            width={17}
                                            height={10}
                                        />
                                    </button>
                                </div>

                                {/* Scrollbar */}
                                <div className="flex-1 mx-6">
                                    <div className="h-0.5 bg-gray-200 rounded-full">
                                        <div
                                            className="h-full bg-gray-400 rounded-full transition-all duration-300"
                                            style={{width: `${((currentSlide + 1) / images.length) * 100}%`}}
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

                            {/* end slider, button, pagination, scroll bar */}
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src="/leaf-bg-right.webp"
                        alt="leaf"
                        width={267}
                        height={267}
                        className={`z-20 absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
    w-[267px] h-[267px]
    max-md:w-[150px] max-md:h-[150px]
    ${isVisible ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"}`}
                        loading="eager"
                    />
                </div>
            </section>
        </>)
}
export default TopAdventureTour;
