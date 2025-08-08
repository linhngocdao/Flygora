"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import ActivitiesPage from "@/components/Clients/layout/teamBuilding/activities/page";
import SuggestTour from "@/components/Clients/layout/teamBuilding/suggestTour/page";
import OurCustomer from "@/components/Clients/layout/teamBuilding/ourCustomer/page";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";

const TeamBuildingPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    // Observe the section for animation
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <main>
      <section className="relative md:h-[500px] h-[400px] max-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/homePage/teambuilding7.jpg"
            alt="Người leo núi đá gần thác nước"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/20 to-black/70"></div>

        <div className="relative flex items-center justify-center h-full">
          <div className="container">
            <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
              Team Building
            </h1>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="relative overflow-hidden section-animation">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/teamBuilding/bg-overview.webp"
            alt="background overview"
            fill
            priority
            quality={90}
            className="object-cover w-full h-full"
            sizes="100vw"
          />
        </div>

        <div className="relative xl:py-[68px] md:py-[48px] py-[34px]">
          <div className="container max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 items-start">
              {/* Text Block */}
              <div className="md:col-span-6 space-y-3 xl:space-y-4">
                <div className="pre-header text-primary">Tour Overview</div>
                <h2 className="uppercase headline-1 text-text-500">
                  Unique &amp; Different Team Building
                </h2>
                <div className="text-gray-700 body-1 prose prose-overview max-w-none">
                  <p>
                    Transform your next teambuilding event from a trip into a lasting investment
                    with Flygora Travel. We merge five years of proven expertise in the Indian
                    market with an exceptional package of value and luxury. Our seamless execution
                    is guaranteed by a dedicated, 24/7 support team that allows your group to focus
                    purely on connection and growth. By rewarding them with 5-star accommodations
                    and authentic native cuisine, you reinforce a culture of excellence. We make
                    this premium experience attainable with pricing at least 15% below competitors
                    and a transparent no-tipping policy, saving you up to $2,000 and delivering an
                    unmatched return on your investment in team morale.
                  </p>
                </div>
              </div>

              {/* Image Block */}
              <div className="md:col-span-6">
                <div className="relative w-full h-full min-h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src="https://cms.junglebosstours.com/assets/c6fde3fd-4e48-4661-873d-fe4d0e2cfe9a?format=webp"
                    alt="image tour overview"
                    fill
                    priority
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaf decorations */}
        <Image
          src="/images/homePage/leaf-bg-right.webp"
          alt="leaf right"
          width={267}
          height={267}
          loading="eager"
          className={`absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                ${isVisible ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"}`}
        />
        <Image
          src="/images/homePage/leaf-bg-left.webp"
          alt="leaf left"
          width={267}
          height={267}
          loading="eager"
          className={`absolute bottom-[-100px] left-[-90px] transition-transform duration-700 ease-out
                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                ${isVisible ? "translate-x-0 translate-y-0" : "-translate-x-full translate-y-full"}`}
        />
      </section>

      <section className="xl:py-[68px] md:py-[48px] py-[34px]">
        <div className="container">
          <div className="grid grid-cols-12 xl:gap-x-8 md:gap-x-6 gap-y-5">
            <div className="flex items-center justify-center col-span-full lg:col-span-3">
              <div className="space-y-3 xl:space-y-4 max-lg:text-center">
                <div className="pre-header text-primary">Designed Ideas</div>
                <h2 className="uppercase headline-1 text-text-500 max-sm:w-[80%] max-sm:mx-auto">
                  Explore <br className="hidden xl:block" />
                  Team Building Activities
                </h2>
                <div className="text-gray-700 body-1">
                  Some ideal activities your team can check out
                </div>
                <div className="flex items-center justify-center lg:hidden">
                  <ButtonPrimary name="See More Activities" />
                </div>
              </div>
            </div>
            <div className="space-y-4 col-span-full lg:col-span-9 xl:space-y-8 md:space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:gap-8 md:gap-5 gap-y-5">
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">The Essence of Hanoi</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Explore Hanoi&apos;s key highlights, from the historic Ho Chi Minh Mausoleum and
                    serene Tran Quoc Pagoda to the vibrant Old Quarter. We&apos;ll then dive into
                    local life at Dong Xuan Market before capping the day with the unique spectacle
                    of Train Street.
                  </div>
                </div>
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">Trang An Landscape</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Embark on a boat trip in Trang An, a UNESCO site, gliding on a sampan through
                    caves and past limestone karsts. Discover ancient temples and visit the iconic
                    &apos;Kong: Skull Island&apos; film set—a unique highlight for unforgettable
                    photos
                  </div>
                </div>
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">The Incense Village</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Discover the traditional art of incense making in an authentic local village. A
                    photographer&apos;s paradise, it offers stunning visuals of vibrant incense
                    bundles drying in the sun—a perfect opportunity to capture the colorful spirit
                    of Vietnamese craftsmanship in lively photos.
                  </div>
                </div>
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">Ha Long Bay Cruise</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Aboard our 5-star cruise, enjoy a welcome buffet lunch before exploring Ha
                    Long&apos;s highlights. We&apos;ll visit the magnificent Surprise Cave and
                    ascend Ti Top Island for panoramic views, concluding the day with a spectacular
                    sunset tea break on the sundeck.
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <ButtonPrimary name="See More Activities" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ActivitiesPage />
      <SuggestTour />
      <OurCustomer />
      <section className="xl:py-[68px] md:py-[48px] py-[34px]">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-x-6 xl:gap-x-8 gap-y-5">
            <div className="col-span-full md:col-span-5">
              <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                  src="/images/teamBuilding/connect-us.webp"
                  alt="team working"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 col-span-full md:col-span-7 md:space-y-6 xl:space-y-8">
              <div className="space-y-2 xl:space-y-4 md:space-y-3">
                <div className="pre-header text-primary tracking-[1.4px]">Connect With Us</div>
                <h2 className="uppercase headline-1 text-text-500">
                  Start Your Journey with Flygora Now !
                </h2>
                <div className="text-gray-700 body-1">
                  Pricing for our team-building tours varies based on group size and tour duration.
                  Additional fees apply for weekends and holidays. We kindly request that large
                  groups book well in advance so we can fulfill your request and meet all needs.
                </div>
              </div>
              <div className="p-4 space-y-2 rounded-lg xl:space-y-4 md:space-y-3 xl:p-8 md:p-6 bg-gray-50">
                <div className="text-gray-700 body-1">
                  To inquire further, please contact Flygora Travel via email at
                  <span>
                    <a
                      href="mailto:advisor@flygora.com"
                      className="duration-300 ease-in-out text-primary lg:hover:text-primary-800"
                    >
                      advisor@flygora.com
                    </a>
                  </span>
                  or call our hotline:
                </div>
                <div>
                  <a
                    href="tel:(+84) 397897222"
                    className="block text-gray-700 duration-300 ease-in-out body-1 lg:hover:text-primary"
                    rel="noopener noreferrer"
                  >
                    (+84) 397 897 222
                  </a>
                  <a
                    href="tel:(+84) 793946789"
                    className="block text-gray-700 duration-300 ease-in-out body-1 lg:hover:text-primary"
                    rel="noopener noreferrer"
                  >
                    (+84) 793 946 789
                  </a>
                </div>
              </div>
              <div className="flex items-center w-full space-x-1 max-sm:justify-center md:space-x-6 xl:space-x-8">
                <ButtonPrimary name="Contact Us" />
                <ButtonPrimary name="Get a Quote" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SubscribeBanner />
    </main>
  );
};

export default TeamBuildingPage;
