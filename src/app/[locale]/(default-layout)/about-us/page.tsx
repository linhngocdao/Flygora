"use client";
import RecommendationBanner from "@/components/Clients/layout/home/RecommendationBanner/page";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Certificates from "./component/Certificates";
import LifeAtFlygora from "./component/LifeAtFlygora";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";

const TABS = [
  { id: "introduce", label: "Introduce" },
  { id: "life-at-flygora", label: "Life at Flygora" },
  { id: "our-certificates", label: "Our Certificates" },
  { id: "partnership", label: "Partnership" },
] as const;

const INTERSECTION_CONFIG: IntersectionObserverInit = {
  root: null,
  rootMargin: "-72px 0px -55% 0px",
  threshold: [0.15, 0.3, 0.5, 0.7, 0.9],
};

const SCROLL_TIMEOUT = 600;

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<string>("introduce");
  const clickingRef = useRef(false);
  const clickingTimer = useRef<number | null>(null);
  const mobileNavRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const clearClickingTimeout = useCallback(() => {
    if (clickingTimer.current) {
      window.clearTimeout(clickingTimer.current);
      clickingTimer.current = null;
    }
  }, []);

  const scrollTabIntoView = useCallback((tabId: string) => {
    const container = mobileNavRef.current;
    const mobileTabItem = document.getElementById(`tab-${tabId}`);

    if (container && mobileTabItem) {
      const left =
        mobileTabItem.offsetLeft - container.clientWidth / 2 + mobileTabItem.clientWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }

    const desktopTabItem = document.querySelector(`[data-tab-desktop="${tabId}"]`);
    if (desktopTabItem) {
      desktopTabItem.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  const handleTabClick = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      clickingRef.current = true;

      clearClickingTimeout();
      clickingTimer.current = window.setTimeout(() => {
        clickingRef.current = false;
      }, SCROLL_TIMEOUT);

      const targetSection = document.getElementById(tabId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        scrollTabIntoView(tabId);
      }
    },
    [clearClickingTimeout, scrollTabIntoView]
  );

  useEffect(() => {
    const sections = TABS.map((tab) => document.getElementById(tab.id)).filter(
      Boolean
    ) as Element[];

    if (!sections.length) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (clickingRef.current) return;

      const visibleSections = entries.filter((entry) => entry.isIntersecting);
      if (visibleSections.length === 0) return;

      const mostVisible = visibleSections.reduce((prev, current) =>
        current.intersectionRatio > prev.intersectionRatio ? current : prev
      );

      if (mostVisible.target.id && mostVisible.target.id !== activeTab) {
        setActiveTab(mostVisible.target.id);

        scrollTabIntoView(mostVisible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, INTERSECTION_CONFIG);
    sections.forEach((section) => observerRef.current?.observe(section));

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
          src="/images/aboutUs/green-lake.jpg"
          alt="banner about us"
          className="object-cover w-full h-full"
          priority
        />
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 md:top-[60px] md:mt-[-35px] z-30 w-full" id="tabs">
        {/* Mobile Navigation */}
        <div className="block md:hidden bg-white border-b">
          <ul
            ref={mobileNavRef}
            className="flex items-center w-full overflow-x-auto no-scrollbar whitespace-nowrap px-4 gap-2"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  className={`relative px-4 py-4 cursor-pointer select-none ${
                    isActive ? "text-[#a4c639]" : "text-gray-900"
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <span className="font-semibold text-base">{tab.label}</span>
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[3px] ${
                      isActive ? "bg-[#a4c639]" : "bg-transparent"
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
                          className={`flex items-center px-4 xl:px-6 cursor-pointer ${
                            isActive ? "text-[#a4c639]" : "text-gray-700"
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
      <section
        className="xl:pt-[108px] md:pt-[76px] pt-[54px] xl:pb-[68px] md:pb-[48px] pb-[34px] section"
        id="introduce"
      >
        <div className="container">
          <div className="grid grid-cols-12 xl:gap-x-8 md:gap-x-6 gap-x-4 xl:gap-y-16 md:gap-y-11 gap-y-8">
            <div className="md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3 col-span-full">
              <div className="space-y-2 text-center md:space-y-3 xl:space-y-4">
                <div className="pre-header text-primary tracking-[1.4px]">Introduce</div>
                <h1 className="uppercase headline-1 text-text-500">About Flygora Travel</h1>
                <div className="space-y-4 text-gray-900 body-1">
                  <p>
                    Flygora Travel is Vietnam&apos;s premier provider, specializing in immersive
                    culinary tours and bespoke corporate teambuilding events.
                  </p>
                  <div className="prose introduce">
                    <p>
                      With four years of dedicated experience, we have proudly hosted thousands of
                      international guests, earning a reputation for excellence and reliability. Our
                      commitment to delivering extraordinary experiences was officially recognized
                      when we were honored as one of{" "}
                      <b> Vietnam&apos;s Best Tour Operators for 2024.</b>
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

      {/* Life at Flygora Section */}
      <LifeAtFlygora id="life-at-flygora" />

      {/* Our Certificates Section */}
      <Certificates id="our-certificates" />

      {/* Partnership Section */}
      <section
        className="bg-[#FCFFDF] xl:py-[68px] md:py-[48px] py-[34px] section"
        id="partnership"
      >
        <div className="container space-y-8">
          <div className="space-y-2 xl:space-y-4 md:space-y-3">
            <div className="pre-header text-primary tracking-[1.4px]">Partnership</div>
            <h2 className="uppercase headline-1 text-text-500">
              Our Trusted Networking &amp; Partners
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center w-full space-y-3 lg:justify-between md:space-x-8 xl:space-x-14 lg:space-y-0">
            <Image
              width={110}
              height={110}
              src="/images/aboutUs/partner-1.png"
              alt="national speleological society"
              className="w-full max-w-[110px] xl:max-w-[130px] mr-4 md:mr-0"
            />
            <Image
              width={110}
              height={110}
              src="/images/aboutUs/partner-2.png"
              alt="petzl"
              className="w-full max-w-[110px] xl:max-w-[136px] mr-4 md:mr-0"
            />
            <Image
              width={150}
              height={234}
              src="/images/aboutUs/partner-3.png"
              alt="Cmi"
              className="w-full max-w-[150px] xl:max-w-[234px] mr-4 md:mr-0"
            />
            <Image
              width={68}
              height={100}
              src="/images/aboutUs/partner-4.png"
              alt="Vslc"
              className="w-full max-w-[68px] mr-4 md:mr-0"
            />
            <Image
              width={350}
              height={404}
              src="/images/aboutUs/partner-5.png"
              alt="Black Diamo"
              className="w-full max-w-[350px] xl:max-w-[404px]"
            />
          </div>
        </div>
      </section>
      <RecommendationBanner />
      <SubscribeBanner className="pt-15" />
    </main>
  );
};

export default AboutPage;
