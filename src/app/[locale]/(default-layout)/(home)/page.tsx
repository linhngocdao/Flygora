"use client";
import AllAdventureTour from "@/components/Clients/layout/home/section6/page";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import PartnerCarousel from "@/components/Clients/ui/slider";
import TopAdventureTour from "@/components/Clients/ui/TopAdventureTour";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import HeaderGotravel from "@/app/[locale]/layout/client/header/page";

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    // Observe section for animation
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <HeaderGotravel />
      <main className="homepage max-lg:pt-[68px]">
        {/* HeroSection */}
        <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
          <div className="w-full h-full max-md:aspect-w-16 max-md:aspect-h-9">
            <picture>
              <source srcSet="/images/homePage/banner-home-mobile.webp" media="(max-width: 768px)" type="image/webp" />
              <source srcSet="/images/homePage/banner-home.webp" media="(max-width: 1439px)" type="image/webp" />
              <img
                src="/images/homePage/banner-home.webp"
                alt="home banner"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </picture>
          </div>

          {/* Search Form Container */}
          <div className="container z-[30] absolute bottom-0 -translate-x-1/2 md:translate-y-1/2 translate-y-[110%] left-1/2">
            {/* Mobile Search Form */}
            <div className="rounded-[16px] border-4 border-primary-400 bg-white xl:px-20 md:px-12 px-8 py-4 relative lg:hidden">
              <div className="flex items-center justify-between button-1">
                <div className="pt-1 text-gray-700 uppercase headline-3">Find your trip</div>
                <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-[#6c8a1f] lg:hover:bg-primary-darker w-10 h-10 md:flex-shrink-0">
                  <Image
                    src="/images/homePage/ic-search.svg"
                    width={25}
                    height={25}
                    alt="search icon"
                    style={{
                      filter: 'invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Search Form */}
            <div
              className="md:flex rounded-[16px] border-4 bg-white xl:px-20 md:px-12 px-8 py-4 relative max-lg:hidden"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 8px 0px",
                borderColor: 'rgb(214 226 80 / 1)'
              }}
            >
              <div className="xl:space-x-16 md:space-x-8 md:flex md:items-center md:flex-grow md:justify-center max-md:space-y-8">
                {/* Tour Selection */}
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Tour</div>
                  <div className="flex items-center justify-between">
                    <div className="body-1 text-gray-500 lg:max-w-[180px] md:max-w-[130px] truncate">
                      Choose your Tour
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="10"
                      viewBox="0 0 15 10"
                      fill="none"
                      className="text-gray-500"
                    >
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>

                {/* Date Selection */}
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Booking Date</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 body-1">--/--/--</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="10"
                      viewBox="0 0 15 10"
                      fill="none"
                      className="text-gray-500"
                    >
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                <div className="w-[1px] h-8 bg-gray-200 max-md:hidden"></div>

                {/* Participant Selection */}
                <div className="flex-1 space-y-1 cursor-pointer max-md:border-b max-md:border-gray-200 max-md:pb-1">
                  <div className="text-gray-900 title-1">Participant</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 body-1">--- pax</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="10"
                      viewBox="0 0 15 10"
                      fill="none"
                      className="text-gray-500"
                    >
                      <path
                        d="M14.3332 1.27945C14.3556 0.853839 13.9009 0.500244 13.3329 0.500244L1.33368 0.500244C0.557122 0.500244 0.0760421 1.13574 0.475538 1.63514L6.47517 9.13513C6.86407 9.6213 7.80255 9.6213 8.19146 9.13513L14.1911 1.63514C14.2774 1.52732 14.3266 1.40508 14.3332 1.27945Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                {/* Search Button */}
                <div className="max-md:flex max-md:justify-end">
                  <div className="flex items-center justify-center duration-300 ease-in-out rounded-full cursor-pointer bg-[#6c8a1f] pointer-events-none w-14 h-14 md:flex-shrink-0 opacity-70">
                    <Image
                      src="/images/homePage/ic-search.svg"
                      width={25}
                      height={25}
                      alt="search icon"
                      style={{
                        filter: 'invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhyChooseUs */}
        <section ref={sectionRef} className="relative section-animation">
          <div className="relative overflow-hidden max-lg:pt-16 max-md:pb-8 max-md:pt-20 bg-section-2">
            <div className="flex max-md:flex-col-reverse items-center container md:space-x-[37px] xl:pt-[119px] lg:pt-[100px] md:py-8 relative z-30">
              {/* Content */}
              <div className="flex flex-col justify-center flex-grow space-y-2">
                <h1 className="text-[4.75rem] text-[#004750] uppercase tracking-[-1.2px] font-[700]">
                  Jungle Boss
                </h1>
                <div className="space-y-4">
                  <div className="uppercase headline-2 text-[1.75rem] text-[#004750] font-medium">
                    Leading certified adventure travel company
                  </div>

                  {/* Reviews Section */}
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-900 title-1">Excellent</div>
                      <div className="flex items-center space-x-1">
                        {/* Star Rating */}
                        {Array(5).fill(0).map((_, idx) => (
                          <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 mb-1 md:w-6 md:h-6 text-primary"
                          >
                            <path d="M8.29602 0.75L5.79602 6L1.29602 6.25L4.79602 9.75L3.04602 15.25L8.29602 12.25L12.796 15.5L11.796 9.25L15.046 6H10.296L8.29602 0.75Z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-gray-900 title-1">on</div>
                      <Image
                        src="/images/homePage/section-2-tripadvisor.png"
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

                  {/* Description */}
                  <div className="prose introduce">
                    <p>
                      We offer exclusive cave exploration and jungle treks for small groups and
                      jungle style team building activities in the UNESCO-listed Phong Nha-Ke Bang
                      National Park and surrounding areas, including our newest tour to{" "}
                      <a
                        href="https://junglebosstours.com/tour/do-quyen-waterfall-top-adventure-conquering-3d2n"
                        target="_blank"
                        rel="noopener"
                      >
                        Conquering Do Quyen Waterfall
                      </a>
                      – the highest waterfall in South East Asia, and the legendary{" "}
                      <a href="/tour/kong-collapse-top-adventure-5d4n" target="_blank" rel="noopener">
                        Kong Collapse
                      </a>
                      – one of the deepest sinkholes on the planet.
                    </p>
                  </div>

                  <ButtonPrimary name="About Us" href="/about-us" />
                </div>
              </div>

              {/* Welcome Image */}
              <div className="lg:w-[432px] md:w-1/3 w-1/2 max-lg:mx-auto flex-shrink-0 flex items-center max-md:my-4">
                <Image
                  src="/images/homePage/section-2-welcome.webp"
                  alt="welcome"
                  width={432}
                  height={432}
                  className="duration-500 lg:hover:translate-x-10 lg:hover:-translate-y-10"
                  loading="eager"
                />
              </div>
            </div>

            {/* Decorative Leaves */}
            <Image
              src="/images/homePage/leaf-bg-right.webp"
              alt="leaf"
              width={267}
              height={267}
              className={`absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
                                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                                ${isVisible ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"}`}
              loading="eager"
            />
            <Image
              src="/images/homePage/leaf-bg-left.webp"
              alt="leaf"
              width={267}
              height={267}
              className={`absolute bottom-[-100px] left-[-90px] transition-transform duration-700 ease-out
                                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                                ${isVisible ? "translate-x-0 translate-y-0" : "-translate-x-full translate-y-full"}`}
              loading="eager"
            />
          </div>
        </section>

        {/* Partners Section */}
        <PartnerCarousel />

        {/* Advantages Section */}
        <section>
          <div className="lg:py-[68px] md:py-[47px] py-[34px]">
            <div className="container space-y-8">
              {/* Section Header */}
              <div className="space-y-4">
                <h3 className="pre-header text-[#6c8a1f] tracking-[1.4px] text-center">
                  Our Advantage
                </h3>
                <h2 className="text-center uppercase headline-1 text-[#004750] text-[32px] font-bold max-xl:w-[80%] max-md:w-full mx-auto">
                  Why Jungle Boss Is The Top Choice For Adventure Tourism?
                </h2>
              </div>

              {/* Advantages Grid */}
              <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-x-[64px] md:gap-x-45 max-md:gap-y-8 max-md:w-[70%] max-md:mx-auto">
                {/* Unique Experience */}
                <div className="space-y-[14px]">
                  <div className="flex justify-center">
                    <Image
                      src="/images/homePage/section-3-unique.webp"
                      alt="Unique Experience"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="md:space-y-2">
                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                      Unique Experience
                    </div>
                    <div className="text-center text-gray-700 body-1">
                      Discover thrilling adventures tailored by Jungle Boss to explore the best of
                      jungle trekking and caving experience!
                    </div>
                  </div>
                </div>

                {/* Exclusive Tour */}
                <div className="space-y-[14px]">
                  <div className="flex justify-center">
                    <Image
                      src="/images/homePage/section-3-exclusive.webp"
                      alt="Exclusive Tour"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                      Exclusive Tour
                    </div>
                    <div className="text-center text-gray-700 body-1">
                      Every adventure tours of Jungle Boss is exclusive and unique. Includes the
                      Kong Collapse Adventure, the #1 adventurous tour in Vietnam!
                    </div>
                  </div>
                </div>

                {/* Safe Adventure */}
                <div className="space-y-[14px]">
                  <div className="flex justify-center">
                    <Image
                      src="/images/homePage/section-3-safety.webp"
                      alt="Safe Adventure"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                      Safe Adventure
                    </div>
                    <div className="text-center text-gray-700 body-1">
                      All tours adhere to strict safety protocols & are led by expert guides to
                      ensure a safe jungle experience.
                    </div>
                  </div>
                </div>

                {/* Sustainable Development */}
                <div className="space-y-[14px]">
                  <div className="flex justify-center">
                    <Image
                      src="/images/homePage/section-3-sustainable.webp"
                      alt="Sustainable Development"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                      Sustainable Development
                    </div>
                    <div className="text-center text-gray-700 body-1">
                      We strive to protect the environment and support local communities through
                      sustainable practices.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Adventure Tours */}
        <TopAdventureTour />

        {/* All Adventure Tours */}
        <AllAdventureTour />

        {/* Team Building Section */}
        <section
          className="space-y-8 lg:py-[68px] md:py-[45px] py-[34px] bg-gray-50 overflow-hidden"
          id="needToMoveSection"
        >
          {/* Section Header */}
          <div className="container space-y-4">
            <h2 className="text-center pre-header text-[#6c8a1f]">Team Building Tour</h2>
            <div className="text-center uppercase headline-1 text-[#004750]">
              Jumpstart Team Synergy <br /> with Exhilarating Challenges
            </div>

            {/* Team Building Description */}
            <div className="prose team-building-tour">
              <p>
                Immerse your team in an unparalleled adventure amid the awe-inspiring jungles of Phong
                Nha – Ke Bang National Park. Jungle Boss Team building is a transformative journey marked by unique
                and challenging games, setting us apart from the conventional team building landscape in Vietnam. Escape
                the mundane and seize the extraordinary as your team engages in missions that demand collaboration,
                creativity, and camaraderie. Our jungle setting serves as the ultimate canvas for fostering
                teamwork, creating an atmosphere that is not only thrilling but also indelibly unforgettable.
              </p>
              <p>
                Embrace a one-of-a-kind adventure with us – a promise to not only fortify your team
                bonds but also create lasting memories of an exceptionally extraordinary experience. At Jungle Boss, we
                redefine team building, making it an immersive and thrilling escapade that transcends the ordinary,
                leaving an enduring mark on your team collective journey. There are different team building
                options from 1 day to multiple days. Leave us a request and we can help you tailor a unique Jungle Team
                building that suits your needs!
              </p>
            </div>
          </div>

          {/* Team Building Image Gallery */}
          <div className="w-max lg:h-[330px] md:h-[200px] h-[120px] flex gap-x-4" id="needToMove">
            {[
              "83bd39bf-107a-474f-95d2-561a9950b543",
              "af730d8d-dbd1-4991-a6f6-96a763a99baa",
              "043ca800-98fc-46da-a7e4-9161dad21989",
              "fe88327e-7382-49e2-b320-d3f637a6e0fe",
              "279ed19c-0f05-4d18-909c-d7f0fd10454c",
              "dace4dff-255e-4197-8b7a-5d0c7260583e",
              "501c8981-a4cd-43f4-a3d8-962b96433382",
              "145a9bc5-473f-406c-bb53-37dcdac8f333"
            ].map((id, index) => (
              <div
                key={index}
                className={`lg:w-[400px] md:w-[300px] lg:h-[266px] md:h-[150px] w-[175px] h-[95px] rounded-[8px] overflow-hidden ${index % 2 !== 0 ? "self-end" : ""
                  }`}
              >
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=350&height=190&quality=100`}
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=jpeg&width=350&height=190&quality=100`}
                    type="image/jpeg"
                  />
                  <source
                    media="(max-width: 1439px)"
                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=800&height=512&quality=100`}
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 1439px)"
                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=jpeg&width=800&height=512&quality=100`}
                    type="image/jpeg"
                  />
                  <img
                    className="object-cover w-full h-full"
                    src={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=800&height=512&quality=100`}
                    alt={`team building image ${index}`}
                    loading="lazy"
                    width={400}
                    height={266}
                  />
                </picture>
              </div>
            ))}
          </div>

          <ButtonPrimary name="About us" />
        </section>
      </main>
    </div>
  );
}
