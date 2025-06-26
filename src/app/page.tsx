"use client";
import HeaderComponent from "@/components/Clients/layout/header/page";
import PartnerCarousel from "@/components/Clients/ui/slider";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <HeaderComponent />
      <main className="homepage max-lg:pt-[68px]">
        {/* section 1 */}
        <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
          <div className="w-full h-full max-md:aspect-w-16 max-md:aspect-h-9">
            <picture>
              <source srcSet="/banner-home-mobile.webp" media="(max-width: 768px)" type="image/webp" />
              <source srcSet="/banner-home.webp" media="(max-width: 1439px)" type="image/webp" />
              <img
                src="/banner-home.webp"
                alt="home banner"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="container z-[30] absolute bottom-0 -translate-x-1/2 md:translate-y-1/2 translate-y-[110%] left-1/2" >
            <div className="rounded-[16px] border-4 border-primary-400 bg-white xl:px-20 md:px-12 px-8 py-4 relative lg:hidden" >
              <div className="flex items-center justify-between button-1">
                <div className="pt-1 text-gray-700 uppercase headline-3">Find your trip</div>
                <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-[#6c8a1f] lg:hover:bg-primary-darker w-10 h-10 md:flex-shrink-0">
                  <Image src="/ic-search.svg" width={25} height={25} alt="search icon" style={{ filter: 'invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)' }} />
                </div>
              </div>
            </div>
            <div className="md:flex rounded-[16px] border-4 bg-white xl:px-20 md:px-12 px-8 py-4 relative max-lg:hidden" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 8px 0px", borderColor: 'rgb(214 226 80 / 1)' }}>
              <div className="xl:space-x-16 md:space-x-8 md:flex md:items-center md:flex-grow md:justify-center max-md:space-y-8">
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Tour</div>
                  <div className="flex items-center justify-between">
                    <div className="body-1 text-gray-500 lg:max-w-[180px] md:max-w-[130px] truncate">Choose your Tour</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none"
                      className="text-gray-500">
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Booking Date</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 body-1">--/--/--</div><svg xmlns="http://www.w3.org/2000/svg" width="15"
                      height="10" viewBox="0 0 15 10" fill="none" className="text-gray-500">
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Participant</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 body-1">--- pax</div><svg xmlns="http://www.w3.org/2000/svg" width="15"
                      height="10" viewBox="0 0 15 10" fill="none" className="text-gray-500">
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="max-md:flex max-md:justify-end">
                  <div
                    className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-[#6c8a1f] pointer-events-none w-14 h-14 md:flex-shrink-0 opacity-70">
                    <Image src="/ic-search.svg" width={25} height={25} alt="search icon" style={{ filter: 'invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end section 1 */}
        {/* section 2 */}
        <section ref={sectionRef} className="relative section-animation">
          <div className="relative overflow-hidden max-lg:pt-16 max-md:pb-8 max-md:pt-20 bg-section-2">
            <div className="flex max-md:flex-col-reverse items-center container md:space-x-[37px] xl:pt-[119px] lg:pt-[100px] md:py-8 relative z-30">
              <div className="flex flex-col justify-center flex-grow space-y-2">
                <h1 className="display-1 uppercase tracking-[-1.2px] text-text-500">Jungle Boss</h1>
                <div className="space-y-4">
                  <div className="uppercase headline-2 text-text-500">
                    Leading certified adventure travel company
                  </div>
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-900 title-1">Excellent</div>
                      <div className="flex items-center space-x-1">
                        {/* 5 stars icon, có thể tạo component riêng hoặc import icon */}
                        {Array(5).fill(0).map((_, idx) => (
                          <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mb-1 md:w-6 md:h-6 text-primary">
                            <path d="M8.29602 0.75L5.79602 6L1.29602 6.25L4.79602 9.75L3.04602 15.25L8.29602 12.25L12.796 15.5L11.796 9.25L15.046 6H10.296L8.29602 0.75Z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-gray-900 title-1">on</div>
                      <Image
                        src="/section-2-tripadvisor.png"
                        alt="tripadvisor"
                        className="h-7"
                        width={100}
                        height={28}
                        loading="lazy"
                      />
                    </div>
                    <a
                      href="https://www.tripadvisor.com/Attraction_Review-g4014591-d8403784-Reviews-Jungle_Boss_Tours-Phong_Nha_Ke_Bang_National_Park_Quang_Binh_Province.html"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-gray-900 label-1 lg:hover:text-primary lg:duration-150"
                    >
                      View 995 (reviews)
                    </a>
                  </div>
                  <div className="prose introduce">
                    <p>
                      We offer exclusive cave exploration and jungle treks for small groups and jungle style team building activities in the UNESCO-listed Phong Nha-Ke Bang National Park and surrounding areas, including our newest tour to{" "}
                      <a href="https://junglebosstours.com/tour/do-quyen-waterfall-top-adventure-conquering-3d2n" target="_blank" rel="noopener">
                        Conquering Do Quyen Waterfall
                      </a>
                      – the highest waterfall in South East Asia, and the legendary{" "}
                      <a href="/tour/kong-collapse-top-adventure-5d4n" target="_blank" rel="noopener">
                        Kong Collapse
                      </a>
                      – one of the deepest sinkholes on the planet.
                    </p>
                  </div>
                  <a href="/about-us" className="block">
                    <button className="btn btn-solid">
                      <span className="relative z-20 flex items-center justify-center w-full font-medium button-1">
                        About Us
                      </span>
                    </button>
                  </a>
                </div>
              </div>
              <div className="lg:w-[432px] md:w-1/3 w-1/2 max-lg:mx-auto flex-shrink-0 flex items-center max-md:my-4">
                <Image
                  src="/section-2-welcome.webp"
                  alt="welcome"
                  width={432}
                  height={432}
                  className="duration-500 lg:hover:translate-x-10 lg:hover:-translate-y-10"
                  loading="eager"
                />
              </div>
            </div>
            <Image
              src="/leaf-bg-right.webp"
              alt="leaf"
              width={267}
              height={267}
              className={`absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
    w-[267px] h-[267px]
    max-md:w-[150px] max-md:h-[150px]
    ${isVisible
                  ? "translate-x-0 translate-y-0"
                  : "translate-x-full -translate-y-full"
                }`}
              loading="eager"
            />

            <Image
              src="/leaf-bg-left.webp"
              alt="leaf"
              width={267}
              height={267}
              className={`absolute bottom-[-100px] left-[-90px] transition-transform duration-700 ease-out
    w-[267px] h-[267px]
    max-md:w-[150px] max-md:h-[150px]
    ${isVisible
                  ? "translate-x-0 translate-y-0"
                  : "-translate-x-full translate-y-full"
                }`}
              loading="eager"
            />


          </div>
        </section>
        {/* end section 2 */}
        {/* section 3 - slider */}
        <section className="relative pt-7 md:pb-[72px] pb-[64px]">
          <Image
            src="/partner-background.webp"
            alt="partner background"
            className="absolute inset-0 object-cover w-full h-full lg:object-bottom max-lg:object-right max-md:hidden"
            loading="lazy"
            fill
          />
          <Image
            src="/partner-background-mobile.webp"
            alt="partner background mobile"
            className="absolute inset-0 object-cover w-full h-full md:hidden"
            loading="lazy"
            fill
          />
          <div className="relative overflow-hidden">
            <div className="box box01 left" style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              transform: "translate3d(-2737.82px, 0px, 0px)"
            }}
            >
              <div className="item_child"> nơi chứa ảnh ở đây</div>
            </div>
          </div>
        </section>
        {/* end section 3 */}

        <PartnerCarousel autoPlay={true} />
      </main>
    </div>
  );
}
