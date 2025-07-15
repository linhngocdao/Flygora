import Image from "next/image";
import React from "react";

const TourPageGoTravel = () => {
  return (
    <div>
      <main>
        {/* header */}
        <section className="h-screen max-h-[500px] md:max-h-[560px] xl:max-h-[710px] relative">
          <Image
            fill
            src="/images/tour/banner-hero.webp"
            alt="banner tour"
            className="relative object-cover w-full h-full"
            loading="eager"
            priority
          />
          <div className="absolute inset-x-0 z-10 xl:bottom-20 md:bottom-14 bottom-10">
            <div className="container space-y-1 text-center md:space-y-2 xl:space-y-2.5">
              <h1 className="text-2xl font-bold text-[#ede52a] md:text-5xl lg:text-6xl">
                ADVENTURE TOURS
              </h1>
              <div className="body-1 text-base text-white md:text-lg">
                Jungle Boss builds teamwork through adventure in Phong Nha-Ke Bang National Park.
                Challenge your team with games in the jungle.
              </div>
            </div>
          </div>
        </section>

        {/* Tour*/}
        <section>
          <div className="md:container xl:py-[68px] md:py-10 py-7 xl:space-y-[68px] md:space-y-10 space-y-7">
            <div className="space-y-4 xl:space-y-8 md:space-y-6">
              <div className="flex items-center space-x-2 xl:space-x-4 md:space-x-3 max-md:px-4">
                <div className="w-[54px] h-[54px] overflow-hidden">
                  <Image
                    width={54}
                    height={54}
                    className="object-cover w-full h-full"
                    src="https://cms.junglebosstours.com/assets/139db6a2-b8bd-44d3-bfa1-c652e0cb0fa4?format=webp"
                    alt="day tours"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h2 className="uppercase headline-1 text-primary-darker">Day Tours</h2>
                  <div className="text-gray-700 body-1">For a day trip, overnighter or longer</div>
                </div>
              </div>
              <div className="relative max-md:pl-4">dsadsads</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TourPageGoTravel;
