"use client";
import RecommendationBanner from "@/components/Clients/layout/home/RecommendationBanner/page";
import Image from "next/image";
import React, { useState } from "react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("introduce");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      <section className="sticky top-24 md:top-[60px] z-30 w-full" id="tabs">
        <div className="container">
          <div className="relative flex justify-center">
            <div className="flex items-center justify-center w-full px-6 py-3 space-x-2 duration-300 bg-white md:h-20 xl:px-12 md:px-8 md:space-x-4 md:py-0 md:rounded-2xl md:border-[4px] border-[#d6e250] shadow-lg">
              <ul className="flex items-center justify-center w-full space-x-2 overflow-x-auto md:justify-between lg:space-x-4 whitespace-nowrap scroll-hidden">
                {[
                  { id: "introduce", label: "Introduce" },
                  { id: "our-team", label: "Our Team" },
                  { id: "human-of-jungle-boss", label: "Human of Flygora" },
                  { id: "life-at-jungle-boss", label: "Life at Flygora" },
                  { id: "our-certificates", label: "Our Certificates" },
                  { id: "partnership", label: "Partnership" },
                ].map((tab, index) => (
                  <React.Fragment key={tab.id}>
                    <li
                      className={`flex items-center px-3 space-x-2 cursor-pointer lg:space-x-3 md:px-4 xl:px-6 ${
                        activeTab === tab.id ? "text-[#a4c639]" : "text-gray-700"
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      <span className="duration-300 ease-in-out hover:text-[#a4c639] font-medium text-sm md:text-base">
                        {tab.label}
                      </span>
                    </li>
                    {index < 5 && <li className="hidden md:block w-px h-6 bg-gray-200"></li>}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 lg:py-24" id="introduce">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-[#a4c639]/10 rounded-full mb-6">
                <span className="text-[#a4c639] font-semibold text-sm tracking-wide uppercase">
                  Introduce
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 uppercase">
                About Flygora
              </h1>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-xl font-medium text-gray-800">
                  Flygora is one of the leading, certified adventure tourism companies in Vietnam.
                </p>
                <p>
                  We offer exclusive cave exploration and jungle treks for small groups and
                  jungle-style team building activities in the UNESCO-listed Phong Nha-Ke Bang
                  National Park and surrounding areas, including our newest tour to{" "}
                  <a
                    href="https://junglebosstours.com/tour/do-quyen-waterfall-top-adventure-conquering-3d2n"
                    target="_blank"
                    rel="noopener"
                    className="text-[#a4c639] hover:text-[#8fb32a] font-medium underline decoration-2 underline-offset-2"
                  >
                    Conquering Do Quyen Waterfall
                  </a>
                  {" – the highest waterfall in South East Asia, and the legendary "}
                  <a
                    href="/tour/kong-collapse-top-adventure-5d4n"
                    target="_blank"
                    rel="noopener"
                    className="text-[#a4c639] hover:text-[#8fb32a] font-medium underline decoration-2 underline-offset-2"
                  >
                    Kong Collapse
                  </a>
                  {" – one of the deepest sinkholes on the planet."}
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  icon: "/images/about/item-1.png",
                  title: "Unique Experience",
                },
                {
                  icon: "/images/about/item-2.png",
                  title: "Exclusive Tour",
                },
                {
                  icon: "/images/about/item-3.png",
                  title: "Safety Adventure",
                },
                {
                  icon: "/images/about/item-4.png",
                  title: "Sustainable Development",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="max-w-[100px] w-full mx-auto">
                    <Image
                      width={100}
                      height={100}
                      src={feature.icon}
                      alt={feature.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="text-center font-semibold text-[#a4c639] text-lg">
                    {feature.title}
                  </div>
                </div>
              ))}
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
                      Le Luu Dung
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
                    resounding success at Shark Tank Season 5, Mr. Dung continues to assert his
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
      <section className="py-16 md:py-20 lg:py-24" id="our-certificates">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Certificates
              </h2>
              <p className="text-xl text-gray-600 font-medium">Honored for Our Dedication</p>
              <p className="text-lg text-gray-600 mt-4">
                Flygora has earned the 2017, 2018 & 2019 this certificate based on consistently
                great reviews!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[2020, 2019, 2018, 2017].map((year) => (
                <div key={year} className="text-center">
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
                    <Image
                      width={200}
                      height={150}
                      src={`/images/certificates/tripadvisor-${year}.jpg`}
                      alt={`Trip Advisor Certificates of Excellence ${year}`}
                      className="object-contain w-full h-32"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Trip Advisor Certificates of Excellence {year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              {["national-speleological-society", "petzl", "cmi", "vslc", "black-diamond"].map(
                (partner, index) => (
                  <div key={index} className="flex justify-center">
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
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <RecommendationBanner />
    </main>
  );
};

export default AboutPage;
