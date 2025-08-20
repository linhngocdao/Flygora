"use client";
import RecommendationBanner from "@/components/Clients/layout/home/RecommendationBanner/page";
import Image from "next/image";
import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import SliderComponent from "./slider";
import Certificates from "./component/Certificates";

// Constants moved outside component to prevent recreation
const TABS = [
  { id: "introduce", label: "Introduce" },
  { id: "our-team", label: "Our Team" },
  { id: "human-of-jungle-boss", label: "Human of Flygora" },
  { id: "life-at-jungle-boss", label: "Life at Flygora" },
  { id: "our-certificates", label: "Our Certificates" },
  { id: "partnership", label: "Partnership" },
] as const;

const INTERSECTION_CONFIG: IntersectionObserverInit = {
  root: null,
  rootMargin: "-72px 0px -55% 0px",
  threshold: [0.15, 0.3, 0.5, 0.7, 0.9],
};

const SCROLL_TIMEOUT = 600;

// Partner logos constant
const PARTNERS = [
  "national-speleological-society",
  "petzl",
  "cmi",
  "vslc",
  "black-diamond"
] as const;

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<string>("introduce");

  // Refs
  const clickingRef = useRef(false);
  const clickingTimer = useRef<number | null>(null);
  const mobileNavRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Utility function to clear timeout
  const clearClickingTimeout = useCallback(() => {
    if (clickingTimer.current) {
      window.clearTimeout(clickingTimer.current);
      clickingTimer.current = null;
    }
  }, []);

  // Scroll tab into view (both mobile and desktop)
  const scrollTabIntoView = useCallback((tabId: string) => {
    // For mobile navigation
    const container = mobileNavRef.current;
    const mobileTabItem = document.getElementById(`tab-${tabId}`);

    if (container && mobileTabItem) {
      const left = mobileTabItem.offsetLeft - container.clientWidth / 2 + mobileTabItem.clientWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }

    // For desktop navigation (if needed in future)
    const desktopTabItem = document.querySelector(`[data-tab-desktop="${tabId}"]`);
    if (desktopTabItem) {
      desktopTabItem.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }, []);

  // Handle tab click
  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
    clickingRef.current = true;

    clearClickingTimeout();
    clickingTimer.current = window.setTimeout(() => {
      clickingRef.current = false;
    }, SCROLL_TIMEOUT);

    // Scroll to section
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      scrollTabIntoView(tabId);
    }
  }, [clearClickingTimeout, scrollTabIntoView]);

  // Setup intersection observer
  useEffect(() => {
    const sections = TABS.map(tab => document.getElementById(tab.id)).filter(Boolean) as Element[];

    if (!sections.length) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (clickingRef.current) return;

      const visibleSections = entries.filter(entry => entry.isIntersecting);
      if (visibleSections.length === 0) return;

      // Find the section with highest intersection ratio
      const mostVisible = visibleSections.reduce((prev, current) =>
        current.intersectionRatio > prev.intersectionRatio ? current : prev
      );

      if (mostVisible.target.id && mostVisible.target.id !== activeTab) {
        setActiveTab(mostVisible.target.id);

        // Auto-scroll tab into view when section changes
        scrollTabIntoView(mostVisible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, INTERSECTION_CONFIG);
    sections.forEach(section => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
      clearClickingTimeout();
    };
  }, [activeTab, clearClickingTimeout, scrollTabIntoView]);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[500px] md:max-h-[810px] overflow-hidden">
        <Image
          width={1920}
          height={1080}
          quality={100}
          src="/images/aboutUs/banner.webp"
          alt="banner about us"
          className="object-cover w-full h-full"
          priority
        />
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 md:top-[60px] md:mt-[-35px] z-30 w-full" id="tabs">
        {/* Mobile Navigation */}
        <div className="block md:hidden bg-white border-b">
          <ul ref={mobileNavRef} className="flex items-center w-full overflow-x-auto no-scrollbar whitespace-nowrap px-4 gap-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  className={`relative px-4 py-4 cursor-pointer select-none ${isActive ? "text-[#a4c639]" : "text-gray-900"
                    }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <span className="font-semibold text-base">{tab.label}</span>
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[3px] ${isActive ? "bg-[#a4c639]" : "bg-transparent"
                      }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="container">
            <div className="relative flex justify-center">
              <div className="flex items-center justify-center w-full px-6 py-3 space-x-2 bg-white md:h-20 xl:px-12 md:px-8 md:space-x-4 md:py-0 md:rounded-2xl md:border-[4px] border-[#d6e250] shadow-lg">
                <ul className="flex items-center justify-between w-full space-x-2 lg:space-x-4 whitespace-nowrap">
                  {TABS.map((tab, index) => {
                    const isActive = activeTab === tab.id;
                    const isLastTab = index === TABS.length - 1;

                    return (
                      <React.Fragment key={tab.id}>
                        <li
                          className={`flex items-center px-4 xl:px-6 cursor-pointer ${isActive ? "text-[#a4c639]" : "text-gray-700"
                            }`}
                          onClick={() => handleTabClick(tab.id)}
                        >
                          <span className="duration-300 hover:text-[#a4c639] font-medium text-base">
                            {tab.label}
                          </span>
                        </li>
                        {!isLastTab && <li className="w-px h-6 bg-gray-200" />}
                      </React.Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Introduction Section */}
      <section className="xl:pt-[108px] md:pt-[76px] pt-[54px] xl:pb-[68px] md:pb-[48px] pb-[34px] section" id="introduce">
        <div className="container">
          <div className="grid grid-cols-12 xl:gap-x-8 md:gap-x-6 gap-x-4 xl:gap-y-16 md:gap-y-11 gap-y-8">
            <div className="md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3 col-span-full">
              <div className="space-y-2 text-center md:space-y-3 xl:space-y-4">
                <div className="pre-header text-primary tracking-[1.4px]">Introduce</div>
                <h1 className="uppercase headline-1 text-text-500">About Flygora Travel</h1>
                <div className="space-y-4 text-gray-900 body-1">
                  <p>
                    Flygora Travel is Vietnam's premier provider, specializing in immersive culinary tours and bespoke corporate teambuilding events.
                  </p>
                  <div className="prose introduce">
                    <p>
                      With four years of dedicated experience, we have proudly hosted thousands of international guests, earning a reputation for excellence and reliability. Our commitment to delivering extraordinary experiences was officially recognized when we were honored as one of <b> Vietnam's Best Tour Operators for 2024.</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 col-span-full xl:gap-x-16 md:gap-x-11 gap-y-8 gap-x-4">
              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    src="/images/homePage/section-3-unique.webp"
                    alt="Unique Experience"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="text-center title-2 !text-[#6c8a1f]">Unique Experience</div>
              </div>

              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    src="/images/homePage/section-3-exclusive.webp"
                    alt="Exclusive Tour"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="text-center title-2 !text-[#6c8a1f]">Exclusive Tour</div>
              </div>

              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    src="/images/homePage/section-3-safety.webp"
                    alt="Safe Adventure"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="text-center title-2 !text-[#6c8a1f]">Safety Adventure</div>
              </div>

              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    src="/images/homePage/section-3-sustainable.webp"
                    alt="Safe Adventure"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="text-center title-2 !text-[#6c8a1f]">Sustainable Development</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Our Team Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50" id="our-team">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Team
              </h2>
              <p className="text-xl text-gray-600 font-medium">Human are our most valuable asset</p>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                At Flygora, our most valuable asset is not property, vehicles or equipment. It is
                our people.
              </p>
            </div>

            {/* Founder Profile */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Bui Ngoc Nam
                    </h3>
                    <p className="text-[#a4c639] font-semibold text-lg">Founder</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Mr. Bui Ngoc Nam - Founder & CEO of Flygora Tours, is an expert in adventure
                    tourism with a solid academic background in Tourism Management and English
                    Linguistics. His journey began in Phong Nha - Ke Bang in 2008, where he gained
                    years of experience in conservation work while nurturing a deep passion for
                    adventure travel. The establishment of Flygora Tours is a culmination of his
                    dedication and expertise, marking a significant milestone in his career. With
                    resounding success at Shark Tank Season 5, Mr. Nam continues to assert his
                    pioneering position, leading Flygora Tours in its mission to connect people with
                    nature and contribute to the development of sustainable tourism in Vietnam.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      width={256}
                      height={256}
                      src="/images/about/founder.jpg"
                      alt="Le Luu Dung - Founder"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human of Jungle Boss Section */}
      <section className="py-16 md:py-20 lg:py-24" id="human-of-jungle-boss">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Human of Flygora
              </h2>
              <p className="text-xl text-gray-600 font-medium">The Hero Behind the Jungle Trip</p>
              <p className="text-lg text-gray-600 mt-4">
                We provide thrilling trips to transcend limits and embrace nature.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image
                    width={400}
                    height={300}
                    src="/images/about/cleanup-environment.jpg"
                    alt="Clean up – A day for saving the environment"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Clean up – A day for saving the environment
                  </h3>
                  <p className="text-[#a4c639] font-medium">Human of Flygora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life at Jungle Boss Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50" id="life-at-jungle-boss">
        <div className="container">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Life At Flygora
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-8">
              United by Our Love of Jungles and Mountains
            </p>
            <p className="text-lg text-gray-600">Skilled, lively nature lovers</p>
          </div>
        </div>
      </section>

      {/* Our Certificates Section */}
      <Certificates />

      {/* Partnership Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50" id="partnership">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Partnership
              </h2>
              <p className="text-xl text-gray-600 font-medium">Our Trusted Networking & Partners</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              {PARTNERS.map((partner, index) => (
                <div key={partner} className="flex justify-center">
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      width={120}
                      height={80}
                      src={`/images/partners/${partner}.png`}
                      alt={partner}
                      className="object-contain w-full h-16 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <RecommendationBanner />

      <SliderComponent />
    </main >
  );
};

export default AboutPage;
