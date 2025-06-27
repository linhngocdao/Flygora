import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import ButtonPrimary from './buttonPrimary';

const AdventureTourSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

  // Sample images data - replace with your actual images
  const images = [
    {
      id: '1d18331f-a8e6-4a29-b61f-dd6dcabacaed',
      alt: 'Adventure caving tour - rappelling down cave',
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop'
    },
    {
      id: '895c5fb7-0f5a-4d46-b39b-ee85bfdc7d08',
      alt: 'Cave exploration adventure',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
      id: '9cd0c1c7-a7ac-4cd4-9c72-673790e40787',
      alt: 'Underground cave formations',
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    },
    {
      id: 'c8762423-5dc4-4c0a-b508-fda4b0f20b27',
      alt: 'Adventure group in cave',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
      id: 'ad67831d-c48b-4297-8026-18be682145f6',
      alt: 'Cave swimming adventure',
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
    },
    {
      id: '8ede5042-5977-46c1-a632-35ff3c568c1d',
      alt: 'Stalactite formations',
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop'
    },
    {
      id: '497434c4-5943-4b1d-9d56-548f19c68364',
      alt: 'Cave camping adventure',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-animation">
      <div className="flex h-screen">
        {/* Main Image Display */}
        <div className="w-1/2 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={images[currentSlide].src}
              alt={images[currentSlide].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-1/2 bg-gray-50 flex flex-col justify-center px-12 py-8 relative">
          {/* Header */}
          <div className="mb-8">
            <h2 className="pre-header text-[#6c8a1f] tracking-[1.4px]">Top Adventure Tour</h2>
            <div className="space-y-4">
              <h3 className="uppercase headline-1 text-[#004750] ">Kong Collapse Top Adventure 5D4N</h3>
              <div className="text-gray-700 body-1 line-clamp-2">
                <p>The 05-day, 04-night journey to conquer Kong collapse will take you on an adventurous and challenging
                  expedition. This is one of the most exciting adventure tours in Vietnam, with the highlight being the
                  thrilling experience of rappel down a 100-meter deep sinkhole. In addition, you will swim and explore the
                  Tiger cave, admire the magnificent beauty of the stalactite formations in Hang Over cave, and camp
                  overnight in Pygmy cave – the 4th largest cave in the world.</p>
              </div>
            </div>

          </div>
          <div className='space-y-2 !mt-6'>
            <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
              <div className="flex w-[162px] space-x-2 items-center">
                <Image
                  src="/images/home/duration.svg"
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
                  src="/images/home/participant.svg"
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
                  src="/images/home/difficulty.svg"
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
                  src="/images/home/departureDay.svg"
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
                  src="/images/home/meetingPoint.svg"
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
                  src="/images/home/duration.svg"
                  alt="calendar icon"
                  width={20}
                  height={20}
                />
                <div className="text-gray-700 label-1">Overall rating</div>
              </div>
              <div className="space-x-1 text-right text-gray-900 title-3 flex flex-grow items-center justify-end">
                <span>4.9</span>
                <Image
                  src="/images/home/star.svg"
                  alt="calendar icon"
                  width={20}
                  height={20}
                />
                <div className="tracking-[0.28px] body-2 text-gray-700"> (995 reviews) </div>
              </div>
            </div>
            <div className="flex justify-between space-x-4 lg:space-x-8 md:space-x-6">
              <div className="flex w-[162px] space-x-2 items-center">
                <Image
                  src="/images/home/price.svg"
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
            <div className='py-4'>
              <ButtonPrimary name="Book Tour" />
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto">
              {images.slice(0, 7).map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentSlide === index ? 'border-green-500 scale-105' : 'border-transparent'
                    }`}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                disabled={currentSlide === 0}
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 mx-6">
              <div className="h-0.5 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gray-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Page Counter */}
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

      {/* Decorative leaf */}
      <div>
        <Image
          src="/leaf-bg-right.webp"
          alt="leaf"
          width={267}
          height={267}
          className={`z-20 absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
    w-[267px] h-[267px]
    max-md:w-[150px] max-md:h-[150px]
    ${isVisible
              ? "translate-x-0 translate-y-0"
              : "translate-x-full -translate-y-full"
            }`}
          loading="eager"
        />
      </div>
    </section>
  );
};

export default AdventureTourSwiper;
