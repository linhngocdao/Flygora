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
            src="/images/teamBuilding/banner.webp"
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
                    Immerse your team in an unparalleled adventure amid the awe-inspiring jungles of
                    Phong Nha – Ke Bang National Park. Jungle Boss Team building is a transformative
                    journey marked by unique and challenging games, setting us apart from the
                    conventional team building landscape in Vietnam...
                  </p>
                  <p>
                    Embrace a one-of-a-kind adventure with us – a promise to not only fortify your
                    team&apos;s bonds but also create lasting memories of an exceptionally
                    extraordinary experience...
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
                  <h3 className="title-1 text-text-500">Trekking Challenges &amp; Camping</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Organize trekking routes of varying difficulty for teams to race and complete
                    using teamwork and navigation skills. End with an overnight campout where groups
                    collaborate to set up camp, cook over a fire, and bond over campfire games.
                  </div>
                </div>
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">Cave Exploration</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    There are many amazing caves to explore in the park. Split teams up and have
                    them navigate through a cave system together using flashlights and teamwork.
                    Offer prizes for teams that make it through fastest or work best together.
                  </div>
                </div>
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">Outdoor Obstacle Course</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Set up a series of challenging outdoor obstacles like rope climbs, balance
                    beams, tire runs, etc. Split the team into smaller groups and have them race
                    through the course. This promotes teamwork, communication and friendly
                    competition.
                  </div>
                </div>
                <div className="space-y-1 duration-300 ease-in-out md:space-y-2 xl:p-6 md:p-3 lg:hover:bg-[#fcffdf] hover:rounded-2xl">
                  <h3 className="title-1 text-text-500">Amazing Race</h3>
                  <hr className="w-full h-px bg-gray-200" />
                  <div className="text-gray-700 body-1">
                    Model this after the TV show by creating a series of challenges and races that
                    teams have to complete across your city. Have checkpoint stops where they get
                    clues and have to problem solve together to find the next location.
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
                  Start Your Journey At Jungle Boss Now!
                </h2>
                <div className="text-gray-700 body-1">
                  Pricing for our team-building tours varies based on group size and tour duration.
                  Additional fees apply for weekends and holidays. We kindly request that large
                  groups book well in advance so we can fulfill your request and meet all needs.
                </div>
              </div>
              <div className="p-4 space-y-2 rounded-lg xl:space-y-4 md:space-y-3 xl:p-8 md:p-6 bg-gray-50">
                <div className="text-gray-700 body-1">
                  To inquire further, please contact Jungle Boss Tours via email at
                  <span>
                    <a
                      href="mailto:contact@junglebosstours.com"
                      className="duration-300 ease-in-out text-primary lg:hover:text-primary-800"
                    >
                      contact@junglebosstours.com
                    </a>
                  </span>
                  or call our hotline:
                </div>
                <div>
                  <a
                    href="tel:(+84) 917 800 805"
                    className="block text-gray-700 duration-300 ease-in-out body-1 lg:hover:text-primary"
                    rel="noopener noreferrer"
                  >
                    (+84) 917 800 805
                  </a>
                  <a
                    href="tel:(+84) 859 100 222"
                    className="block text-gray-700 duration-300 ease-in-out body-1 lg:hover:text-primary"
                    rel="noopener noreferrer"
                  >
                    (+84) 859 100 222
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
