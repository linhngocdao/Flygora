/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface PolicyItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

const Policy = () => {
  const t = useTranslations("common.policy");

  // State để quản lý policy item đang active
  const [activePolicy, setActivePolicy] = useState("special-launch-offer");
  // State để quản lý dropdown trên mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const policyItems: PolicyItem[] = [
    {
      id: "special-launch-offer",
      title: "Special launch offer – New version of Do Quyen",
      content: (
        <div className="prose-policy">
          <p className="font-bold text-lg mb-4">
            10% OFF – UPGRADED ADVENTURE WITH 4 BRAND NEW EXTREME EXPERIENCES
          </p>

          <h2 className="text-xl font-bold mb-3">I. PROMOTION NAME</h2>
          <p className="mb-4">
            Launch promotion for the 2025 upgraded version of &#34;DO QUYEN WATERFALL TOP ADVENTURE
            CONQUERING 2D1N&quot;
          </p>

          <h2 className="text-xl font-bold mb-3">II. PROGRAM DETAILS</h2>
          <p className="mb-4">
            Jungle Boss officially introduces the <strong>upgraded version</strong> of the iconic Do
            Quyen Waterfall Top Adventure Conquering – a new journey packed with{" "}
            <strong>4 times more challenges</strong>, optimized in{" "}
            <strong>duration and cost</strong>, while staying true to Jungle Boss&apos;s signature
            of <strong>safe and authentic adventure travel</strong>.
          </p>
          <p className="mb-2">
            <strong>Original price:</strong> 11,250,000 VND/person
          </p>
          <p className="mb-2">
            <strong>10% OFF for all customers</strong> booking during the promotion → Discounted
            price: 10,125,000 VND/person
          </p>
          <p className="mb-2">
            <strong>
              10% OFF from discounted price for returning Jungle Boss Explorers → Only 9,112,000
              VND/person
            </strong>
          </p>
          <p className="mb-4">
            <strong>
              5% OFF from discounted price for friends of Jungle Boss Explorers → Only 9,618,000
              VND/person
            </strong>
          </p>
          <p className="mb-4">
            <strong className="text-primary-600">
              <Link
                href="/tour/do-quyen-waterfall-top-adventure-conquering-3d2n"
                className="text-primary-600 hover:underline"
              >
                [Click here for full itinerary and tour details]
              </Link>
            </strong>
          </p>

          <h2 className="text-xl font-bold mb-3">III. PROMOTION PERIOD</h2>
          <p className="mb-4">
            This promotion is valid for bookings from <strong>June 9, 2025</strong> to{" "}
            <strong>June 22, 2025</strong>.
          </p>

          <h2 className="text-xl font-bold mb-3">IV. TERMS & CONDITIONS</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Offer is valid for all adventurers (Vietnamese and international)</li>
            <li>Discount applies to all members in a booking – no group size limit</li>
            <li>
              Valid for <strong>new bookings only</strong>, made within the promotional period
            </li>
            <li>
              Offer is <strong>exclusive to direct bookings</strong> via Jungle Boss website,
              fanpage, or hotline
            </li>
            <li>Full payment (100%) must be completed within the promotion period</li>
            <li>
              Valid bookings can choose any departure date <strong>within 2 years</strong> from
              registration
            </li>
            <li>
              Fully paid bookings may be <strong>transferred</strong> to another person in case of
              cancellation, or processed according to{" "}
              <Link href="/policy/cancellation-policy" className="text-primary-600 hover:underline">
                Jungle Boss&apos;s current Cancellation policy
              </Link>
            </li>
            <li>
              <strong>Cannot be combined</strong> with other promotions or discount vouchers.
            </li>
          </ul>
          <p className="mt-4">
            Jungle Boss wishes all Explorers an unforgettable journey with the new 2025 version of
            Do Quyen – <strong>shorter, bolder, and more intense than ever before!</strong>
          </p>
        </div>
      ),
    },
    {
      id: "jungle-boss-race-jungle",
      title: "Jungle Boss x Race Jungle: Exclusive Privileges!",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">
            Jungle Boss x Race Jungle: Exclusive Privileges!
          </h2>
          <p className="mb-4">
            Join the ultimate adventure collaboration between Jungle Boss and Race Jungle for
            exclusive privileges and experiences.
          </p>
          <h3 className="text-lg font-semibold mb-2">Special Benefits:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Priority booking access</li>
            <li>Exclusive race tracks</li>
            <li>Professional equipment included</li>
            <li>Expert guidance throughout</li>
          </ul>
        </div>
      ),
    },
    {
      id: "show-off-moments",
      title: "Show Off Your Moments - Win An Awesome Tour Minigame Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Show Off Your Moments - Win An Awesome Tour</h2>
          <p className="mb-4">
            Share your adventure moments and win amazing tour packages through our exciting
            minigame.
          </p>
          <h3 className="text-lg font-semibold mb-2">How to Participate:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Share photos from your Jungle Boss adventure</li>
            <li>Use official hashtags</li>
            <li>Tag friends to increase your chances</li>
            <li>Winners announced monthly</li>
          </ul>
        </div>
      ),
    },
    {
      id: "speed-puzzle",
      title: "Speed Puzzle - Win A Super Hot Tour Minigame Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Speed Puzzle Challenge</h2>
          <p className="mb-4">
            Test your skills in our speed puzzle challenge and win exciting tour packages.
          </p>
          <h3 className="text-lg font-semibold mb-2">Game Rules:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete puzzles within time limit</li>
            <li>Multiple difficulty levels available</li>
            <li>Daily challenges with rewards</li>
            <li>Leaderboard competitions</li>
          </ul>
        </div>
      ),
    },
    {
      id: "celebrating-9-years",
      title: "Jungle Boss: Celebrating 9 Years Of Adventure - Up To 19% Off!",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">9 Years Anniversary Celebration</h2>
          <p className="mb-4">
            Join us in celebrating 9 amazing years of adventure with exclusive discounts up to 19%
            off!
          </p>
          <h3 className="text-lg font-semibold mb-2">Anniversary Offers:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Up to 19% discount on selected tours</li>
            <li>Limited time anniversary packages</li>
            <li>Special commemorative gifts</li>
            <li>Loyalty rewards for returning customers</li>
          </ul>
        </div>
      ),
    },
    {
      id: "vietnam-national-day",
      title: "Happy Vietnam National Day - 29 Slot With 20% Off Promotion Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Vietnam National Day Special</h2>
          <p className="mb-4">
            Celebrate Vietnam National Day with our special promotion - 29 slots available with 20%
            discount!
          </p>
          <h3 className="text-lg font-semibold mb-2">Promotion Details:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Limited to 29 slots only</li>
            <li>20% discount on all tour packages</li>
            <li>Valid for Vietnamese citizens</li>
            <li>Booking period: September 1-15</li>
          </ul>
        </div>
      ),
    },
    {
      id: "expert-talk-show",
      title: "Expert Talk Show Giveaway Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Expert Talk Show Giveaway</h2>
          <p className="mb-4">
            Join our expert talk shows and participate in exciting giveaways with valuable prizes.
          </p>
          <h3 className="text-lg font-semibold mb-2">Giveaway Terms:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Attend live talk shows</li>
            <li>Interactive Q&A sessions</li>
            <li>Random prize drawings</li>
            <li>Expert adventure tips included</li>
          </ul>
        </div>
      ),
    },
    {
      id: "flash-sale",
      title: "Flash Sale Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">I. EVENT NAME</h2>
          <p className="mb-4">MONTHLY FLASH SALES</p>

          <h2 className="text-xl font-bold mb-3">II. PRODUCT STRUCTURE</h2>
          <p className="mb-4">
            We offer a limited number of discounts on our adventure tours each month. The discounts
            vary, so please be sure to check our{" "}
            <Link href="/jungle-boss-tours-fanpage" className="text-primary-600 hover:underline">
              Jungle Boss Tours fanpage
            </Link>{" "}
            for updates.
          </p>

          <h2 className="text-xl font-bold mb-3">III. ELIGIBLE PARTICIPANTS</h2>
          <p className="mb-4">Eligible participants must meet the following conditions:</p>
          <p className="mb-2">2.1. Must be a Vietnamese citizen or foreigner, aged 16 or over.</p>
          <p className="mb-4">
            2.2. Participants must NOT be employees or sales agents/travel agents of Jungle Boss
            Tours.
          </p>

          <h2 className="text-xl font-bold mb-3">III. TIME FRAME</h2>
          <p className="mb-4">
            The program takes place during the golden hours from 8:00 PM to 9:00 PM on days with
            matching day and month numbers (e.g., 1/1, 2/2...).
          </p>

          <h2 className="text-xl font-bold mb-3">IV. HOW TO PARTICIPATE</h2>
          <p className="mb-4">You can participate with a few simple steps:</p>
        </div>
      ),
    },
    {
      id: "cancellation-policy",
      title: "Cancellation Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Cancellation Policy</h2>
          <p className="mb-4">
            Understanding our cancellation terms ensures a smooth booking experience for all
            customers.
          </p>
          <h3 className="text-lg font-semibold mb-2">Cancellation Terms:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>48+ hours before tour: Full refund</li>
            <li>24-48 hours before: 50% refund</li>
            <li>Less than 24 hours: No refund</li>
            <li>Weather cancellations: Full refund or reschedule</li>
          </ul>
        </div>
      ),
    },
    {
      id: "alcohol-drugs-policy",
      title: "Alcohol & Drugs Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Alcohol & Drugs Policy</h2>
          <p className="mb-4">
            For the safety of all participants, we maintain strict policies regarding alcohol and
            substance use.
          </p>
          <h3 className="text-lg font-semibold mb-2">Safety Guidelines:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>No alcohol consumption during activities</li>
            <li>Zero tolerance for illegal substances</li>
            <li>Safety briefings mandatory</li>
            <li>Right to refuse service if violated</li>
          </ul>
        </div>
      ),
    },
    {
      id: "privacy-cookie",
      title: "Privacy & Cookie",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Privacy & Cookie Policy</h2>
          <p className="mb-4">
            We respect your privacy and are committed to protecting your personal information.
          </p>
          <h3 className="text-lg font-semibold mb-2">Data Protection:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Secure data collection and storage</li>
            <li>Cookie usage for improved experience</li>
            <li>No sharing with third parties</li>
            <li>Right to data deletion upon request</li>
          </ul>
        </div>
      ),
    },
  ];

  // Function để lấy current policy content
  const getCurrentPolicy = () => {
    return policyItems.find((item) => item.id === activePolicy) || policyItems[0];
  };

  const currentPolicy = getCurrentPolicy();

  // Handle mobile dropdown selection
  const handleMobileSelect = (policyId: string) => {
    setActivePolicy(policyId);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <main>
        {/* header policy */}
        <section className="relative md:h-[500px] h-[400px] max-h-screen">
          <div className="absolute inset-0">
            <Image
              fill
              src="/images/GoTravel_policy/banner-policy.webp"
              alt="Người leo núi đá gần thác nước"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 w-full h-full bg-black/50"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="container">
              <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
                {t("banner.title")}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="xl:py-[68px] md:py-[48px] py-[34px] md:space-y-0 space-y-8">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <div className="bg-[#4c5d36]  overflow-hidden">
              {/* Dropdown Header */}
              <div
                className="flex cursor-pointer items-center justify-between bg-[#34430f] px-4 py-5 text-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex-1 text-[#FCFFDF] font-medium">{currentPolicy.title}</div>
                <Image
                  width={15}
                  height={15}
                  src="/images/homePage/ic-arrow-down.svg"
                  alt="arrow down"
                  className={`
      object-cover transition-all duration-300
      ${isDropdownOpen ? "rotate-180" : ""}
    `}
                />
              </div>

              {/* Dropdown Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
              >
                <div className="border-t border-primary-700">
                  {policyItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => handleMobileSelect(item.id)}
                      className={`px-4 py-3 border-b border-primary-700 last:border-b-0 cursor-pointer transition-colors duration-200 ${
                        activePolicy === item.id
                          ? "bg-white text-[#4c5d36] font-medium"
                          : "text-[#99BB40] hover:bg-primary-700 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm leading-tight">{item.title}</span>
                        <ChevronRight />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="grid grid-cols-12 gap-y-5 xl:gap-x-8 md:gap-x-6">
              {/* Desktop Sidebar Menu */}
              <div className="hidden col-span-full md:block md:col-span-4">
                <div className="xl:px-6 md:px-4 px-4 xl:py-8 md:py-6 py-5 rounded-lg bg-[#4c5d36] sticky top-[80px]">
                  <ul className="space-y-0">
                    {policyItems.map((item, _index) => (
                      <li key={item.id} className="border-b border-[#99BB40] last:border-b-0">
                        <div
                          onClick={() => setActivePolicy(item.id)}
                          className={`
    group flex cursor-pointer items-center justify-between px-3 py-4
    font-medium transition-all duration-200
    ${
      activePolicy === item.id
        ? "text-[#FCFFDF]" // Trạng thái active
        : "text-[#99BB40] hover:text-[#FCFFDF]" // Trạng thái mặc định và hover
    }
  `}
                        >
                          <div className="flex-1 pr-3 text-[15px] leading-snug">{item.title}</div>
                          <ChevronRight />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Content Area */}
              <div className="col-span-full md:col-span-8">
                <div className="md:border-l md:border-gray-200 xl:pl-8 md:pl-6">
                  <h2 className="mb-5 text-gray-900 title-1">{currentPolicy.title}</h2>
                  <div className="prose-policy">{currentPolicy.content}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SubscribeBanner />
      </main>
    </>
  );
};

export default Policy;
