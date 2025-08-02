import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <main>
      <section className="h-screen max-h-[500px] md:max-h-[810px] relative ">
        <Image
          width={1920}
          height={1080}
          quality={100}
          src="/images/aboutUs/banner.webp"
          alt="banner about us"
          className="object-cover w-full h-full"
        />
      </section>

      {/* Centered Tab Navigation */}
      <section className="sticky top-24 md:top-[60px] z-30 w-full" id="tabs">
        <div className="container">
          <div className="relative flex justify-center">
            <div className="">
              <div className="flex border-[#d6e250] items-center justify-center w-full px-6 py-3 space-x-2 duration-300 bg-white md:h-20 xl:px-12 md:px-8 md:space-x-4 md:py-0 md:rounded-2xl md:border-[4px] border-primary-400 shadow-lg">
                <ul className="flex items-center justify-center w-full space-x-2 overflow-x-auto md:justify-between lg:space-x-4 whitespace-nowrap scroll-hidden">
                  <li
                    data-id="introduce"
                    className="flex items-center px-3 space-x-2 cursor-pointer title-2 lg:space-x-3 tab md:px-4 xl:px-6"
                  >
                    <span className="duration-300 ease-in-out lg:hover:text-primary title">
                      Introduce
                    </span>
                  </li>
                  <li className="hidden md:block w-px h-6 bg-gray-200"></li>
                  <li
                    data-id="our-team"
                    className="flex items-center px-3 space-x-2 cursor-pointer title-2 lg:space-x-3 tab md:px-4 xl:px-6"
                  >
                    <span className="duration-300 ease-in-out lg:hover:text-primary title">
                      Our Team
                    </span>
                  </li>
                  <li className="hidden md:block w-px h-6 bg-gray-200"></li>
                  <li
                    data-id="human-of-jungle-boss"
                    className="flex items-center px-3 space-x-2 cursor-pointer title-2 lg:space-x-3 tab md:px-4 xl:px-6"
                  >
                    <span className="duration-300 ease-in-out lg:hover:text-primary title">
                      Human of Jungle Boss
                    </span>
                  </li>
                  <li className="hidden md:block w-px h-6 bg-gray-200"></li>
                  <li
                    data-id="life-at-jungle-boss"
                    className="flex items-center px-3 space-x-2 cursor-pointer title-2 lg:space-x-3 tab md:px-4 xl:px-6"
                  >
                    <span className="duration-300 ease-in-out lg:hover:text-primary title">
                      Life at Jungle Boss
                    </span>
                  </li>
                  <li className="hidden md:block w-px h-6 bg-gray-200"></li>
                  <li
                    data-id="our-certificates"
                    className="flex items-center px-3 space-x-2 cursor-pointer title-2 lg:space-x-3 tab md:px-4 xl:px-6"
                  >
                    <span className="duration-300 ease-in-out lg:hover:text-primary title">
                      Our Certificates
                    </span>
                  </li>
                  <li className="hidden md:block w-px h-6 bg-gray-200"></li>
                  <li
                    data-id="partnership"
                    className="flex items-center px-3 space-x-2 cursor-pointer title-2 lg:space-x-3 tab md:px-4 xl:px-6"
                  >
                    <span className="duration-300 ease-in-out lg:hover:text-primary title">
                      Partnership
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="xl:pt-[108px] md:pt-[76px] pt-[54px] xl:pb-[68px] md:pb-[48px] pb-[34px] section"
        id="introduce"
      >
        <div className="container">
          <div className="grid grid-cols-12 xl:gap-x-8 md:gap-x-6 gap-x-4 xl:gap-y-16 md:gap-y-11 gap-y-8">
            <div className="md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3 col-span-full">
              <div className="space-y-2 text-center md:space-y-3 xl:space-y-4">
                <div className="pre-header text-primary tracking-[1.4px]">Introduce</div>
                <h1 className="uppercase headline-1 text-text-500">About Jungle Boss</h1>
                <div className="space-y-4 text-gray-900 body-1">
                  <p>
                    Jungle Boss is one of the leading, certified adventure tourism companies in
                    Vietnam.
                  </p>
                  <div className="prose introduce">
                    <p>
                      We offer exclusive cave exploration and jungle treks for small groups and
                      jungle style team building activities in the UNESCO-listed Phong Nha-Ke Bang
                      National Park and surrounding areas, including our newest tour to
                      <a
                        href="https://junglebosstours.com/tour/do-quyen-waterfall-top-adventure-conquering-3d2n"
                        target="_blank"
                        rel="noopener"
                      >
                        Conquering Do Quyen Waterfall
                      </a>
                      – the highest waterfall in South East Asia, and the legendary
                      <a
                        href="/tour/kong-collapse-top-adventure-5d4n"
                        target="_blank"
                        rel="noopener"
                      >
                        Kong Collapse
                      </a>
                      – one of the deepest sinkholes on the planet.&nbsp;
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 col-span-full xl:gap-x-16 md:gap-x-11 gap-y-8 gap-x-4">
              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    fill
                    src="/images/about/item-1.png"
                    alt="unique experience"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center title-2 text-primary">Unique Experience</div>
              </div>
              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    fill
                    src="/images/about/item-2.png"
                    alt="exclusive tour"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center title-2 text-primary">Exclusive Tour</div>
              </div>
              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    fill
                    src="/images/about/item-3.png"
                    alt="safety adventure"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center title-2 text-primary">Safety Adventure</div>
              </div>
              <div className="xl:space-y-[14px] md:space-y-[10px] space-y-[7px]">
                <div className="max-w-[100px] w-full mx-auto">
                  <Image
                    fill
                    src="/images/about/item-4.png"
                    alt="sustainable development"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center title-2 text-primary">Sustainable Development</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
