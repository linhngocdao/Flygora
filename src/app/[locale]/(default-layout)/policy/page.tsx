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
      id: "flash-sale",
      title: "Flash Sale Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">I. EVENT NAME</h2>
          <p className="mb-4">
            <strong>FLYGORA MONTHLY FLASH SALE</strong>
          </p>

          <h2 className="text-xl font-bold mb-3">II. PRODUCT SCOPE</h2>
          <p className="mb-4">
            Applies to <strong>Flygora tours labeled “Flash Sale”</strong> on our website during the
            promotional period. The number of discounted slots is
            <strong> limited</strong> and may vary each month.
          </p>

          <h2 className="text-xl font-bold mb-3">III. ELIGIBLE PARTICIPANTS</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              Open to both Vietnamese and international customers aged <strong>16+</strong>.
            </li>
            <li>Not applicable to Flygora employees, sales agents, or travel agents.</li>
            <li>
              Valid for <strong>new bookings only</strong> made during the Flash Sale period.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-3">IV. TIME FRAME</h2>
          <p className="mb-4">
            Conducted in promotional “<strong>golden hours 20:00–21:00</strong>” on specific dates
            announced on Flygora’s official channels (website / fanpage). Please follow the latest
            updates directly on our tour pages or fanpage.
          </p>

          <h2 className="text-xl font-bold mb-3">V. HOW TO PARTICIPATE</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Open the tour page labeled <strong>Flash Sale</strong> during the promotional period.
            </li>
            <li>
              Select an available departure date, fill in traveler information, and confirm booking.
            </li>
            <li>
              Complete <strong>100% payment within the Flash Sale timeframe</strong> to secure the
              discount.
            </li>
            <li>Receive booking confirmation from Flygora once payment is successful.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">VI. PAYMENT & CONFIRMATION</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Applies to payment methods supported on Flygora’s website.</li>
            <li>
              Bookings without completed payment during the Flash Sale timeframe will{" "}
              <strong>not</strong> retain the promotional price.
            </li>
            <li>
              Discount slots are allocated on a <strong>“first paid, first served”</strong> basis.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">VII. RESCHEDULE & CANCELLATION</h2>
          <p className="mb-2">
            Flash Sale bookings follow Flygora’s official <strong>Cancellation Policy</strong>.
            Please see the “Cancellation Policy” section for details.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Rescheduling is subject to seat availability and possible fare differences.</li>
            <li>
              Cannot be combined with <strong>other promotions or vouchers</strong>.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">VIII. NOTES</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              The discount rate, slot quantity, and applicable tours will be announced for each
              Flash Sale round.
            </li>
            <li>
              Flygora reserves the right to adjust the program based on actual conditions while
              ensuring customer benefits.
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: "cancellation-policy",
      title: "Cancellation Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Cancellation Policy</h2>

          <p className="mb-4">All Flygora food tours require payment in advance.</p>

          <h3 className="text-lg font-semibold mb-2">I. ONE-DAY TOURS</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>100% Refund:</strong> If the customer cancels the service
              <strong> 3 days</strong> before the tour departure date.
            </li>
            <li>
              <strong>50% Refund:</strong> If the customer cancels the service
              <strong> 24 hours</strong> before the tour departure date.
            </li>
            <li>
              <strong>No Refund:</strong> If the customer cancels the service within{" "}
              <strong>24 hours</strong> of the tour departure date.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Change of service:</strong> Customers can change their service selection if the
            change request is submitted <strong>3 days</strong> before the departure date, subject
            to tour availability.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">II. TOURS OF TWO DAYS OR MORE</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>100% Refund:</strong> If the customer cancels the service
              <strong> 7 days</strong> before the tour departure date.
            </li>
            <li>
              <strong>50% Refund:</strong> If the customer cancels the service
              <strong> 3 days</strong> before the tour departure date.
            </li>
            <li>
              <strong>No Refund:</strong> If the customer cancels the service within{" "}
              <strong>3 days</strong> of the tour departure date.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Change of service:</strong> Customers can change their service selection if the
            change request is submitted <strong>7 days</strong> before the departure date, subject
            to tour availability.
          </p>
        </div>
      ),
    },
    {
      id: "alcohol-drugs-policy",
      title: "Alcohol & Drugs Policy",
      content: (
        <div className="prose-policy">
          <h2 className="text-xl font-bold mb-3">Alcohol &amp; Drugs Policy</h2>
          <p className="mb-4">
            Our policy is simple: Flygora has a <strong>zero-tolerance</strong> stance on illegal
            drugs and excessive alcohol consumption to ensure a safe and enjoyable experience for
            everyone. Responsible drinking is permitted, but disruptive behavior will result in
            removal from the tour without a refund.
          </p>

          <h3 className="text-lg font-semibold mb-2">Alcohol 🍺</h3>
          <p className="mb-2">
            While some of our tours include curated alcoholic beverage pairings like local beer or
            rice wine, your safety and the enjoyment of all guests are our top priorities.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Responsible Consumption:</strong> Enjoy the included tastings, but please
              drink responsibly. Excessive intoxication is not permitted.
            </li>
            <li>
              <strong>Behavior:</strong> Guests whose behavior becomes disruptive, disrespectful, or
              unsafe due to alcohol consumption will be asked to leave the tour immediately at their
              own expense, with no refund provided.
            </li>
            <li>
              <strong>Age Limit:</strong> You must be of legal drinking age in Vietnam (
              <strong>18+</strong>) to consume alcoholic beverages on the tour.
            </li>
            <li>
              <strong>Outside Alcohol:</strong> Please do not bring your own alcoholic beverages.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">Drugs &amp; Illegal Substances 💊</h3>
          <p>
            Our policy regarding drugs and illegal substances is strict and straightforward.
            Possession, use, or distribution of illegal substances is prohibited. Any violation may
            result in immediate removal from the tour without refund.
          </p>
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
