/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

const FAQ = () => {
  const t = useTranslations("common.faq");

  // State để quản lý category đang active
  const [activeCategory, setActiveCategory] = useState("security-management");
  // State để quản lý dropdown trên mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Refs cho scroll functionality
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Dữ liệu FAQ categories với đa ngôn ngữ
  const faqCategories: FAQCategory[] = [
    {
      id: "security-management",
      title: t("categories.security-management.title"),
      items: [
        {
          id: "thunderstorms-lightning",
          question: t("categories.security-management.items.thunderstorms-lightning.question"),
          answer: t("categories.security-management.items.thunderstorms-lightning.answer"),
        },
        {
          id: "departure-cancellation",
          question: t("categories.security-management.items.departure-cancellation.question"),
          answer: t("categories.security-management.items.departure-cancellation.answer"),
        },
        {
          id: "join-cannot-swim",
          question: t("categories.security-management.items.join-cannot-swim.question"),
          answer: t("categories.security-management.items.join-cannot-swim.answer"),
        },
        {
          id: "skills-needed",
          question: t("categories.security-management.items.skills-needed.question"),
          answer: t("categories.security-management.items.skills-needed.answer"),
        },
        {
          id: "adventure-levels",
          question: t("categories.security-management.items.adventure-levels.question"),
          answer: t("categories.security-management.items.adventure-levels.answer"),
        },
      ],
    },
    {
      id: "general-faq",
      title: t("categories.general-faq.title"),
      items: [
        {
          id: "chemical-shampoo",
          question: t("categories.general-faq.items.chemical-shampoo.question"),
          answer: t("categories.general-faq.items.chemical-shampoo.answer"),
        },
        {
          id: "shower-place",
          question: t("categories.general-faq.items.shower-place.question"),
          answer: t("categories.general-faq.items.shower-place.answer"),
        },
        {
          id: "toilet-facilities",
          question: t("categories.general-faq.items.toilet-facilities.question"),
          answer: t("categories.general-faq.items.toilet-facilities.answer"),
        },
        {
          id: "food-provided",
          question: t("categories.general-faq.items.food-provided.question"),
          answer: t("categories.general-faq.items.food-provided.answer"),
        },
        {
          id: "bring-camping-gear",
          question: t("categories.general-faq.items.bring-camping-gear.question"),
          answer: t("categories.general-faq.items.bring-camping-gear.answer"),
        },
      ],
    },
    {
      id: "tour-information",
      title: t("categories.tour-information.title"),
      items: [
        {
          id: "what-to-notice",
          question: t("categories.tour-information.items.what-to-notice.question"),
          answer: t("categories.tour-information.items.what-to-notice.answer"),
        },
        {
          id: "leeches-jungle",
          question: t("categories.tour-information.items.leeches-jungle.question"),
          answer: t("categories.tour-information.items.leeches-jungle.answer"),
        },
        {
          id: "medical-condition",
          question: t("categories.tour-information.items.medical-condition.question"),
          answer: t("categories.tour-information.items.medical-condition.answer"),
        },
        {
          id: "what-to-pack",
          question: t("categories.tour-information.items.what-to-pack.question"),
          answer: t("categories.tour-information.items.what-to-pack.answer"),
        },
      ],
    },
    {
      id: "policy",
      title: t("categories.policy.title"),
      items: [
        {
          id: "bad-weather-cancellation",
          question: t("categories.policy.items.bad-weather-cancellation.question"),
          answer: t("categories.policy.items.bad-weather-cancellation.answer"),
        },
        {
          id: "payment-booking",
          question: t("categories.policy.items.payment-booking.question"),
          answer: t("categories.policy.items.payment-booking.answer"),
        },
        {
          id: "change-departure-date",
          question: t("categories.policy.items.change-departure-date.question"),
          answer: t("categories.policy.items.change-departure-date.answer"),
        },
      ],
    },
  ];

  // Function để lấy current category
  const getCurrentCategory = () => {
    return faqCategories.find((category) => category.id === activeCategory) || faqCategories[0];
  };

  const currentCategory = getCurrentCategory();

  // Handle mobile dropdown selection
  const handleMobileSelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsDropdownOpen(false);
    scrollToSection(categoryId);
  };

  // Handle desktop sidebar selection
  const handleDesktopSelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    scrollToSection(categoryId);
  };

  // Scroll to section function
  const scrollToSection = (categoryId: string) => {
    const element = sectionRefs.current[categoryId];
    if (element) {
      const headerOffset = 100; // Offset for fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Set ref for sections
  const setSectionRef = (categoryId: string) => (el: HTMLElement | null) => {
    sectionRefs.current[categoryId] = el;
  };

  return (
    <>
      <main>
        {/* Header FAQ */}
        <section className="relative md:h-[500px] h-[400px] max-h-screen">
          <div className="absolute inset-0">
            <Image
              fill
              src="/images/GoTravel_policy/banner-policy.webp"
              alt="Người leo núi đá gần thác nước"
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="absolute inset-0 w-full h-full bg-black/50"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="container">
              <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
                {t("title")}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="xl:py-[68px] md:py-[48px] py-[34px] md:space-y-0 space-y-8">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <div className="bg-[#4c5d36] overflow-hidden">
              {/* Dropdown Header */}
              <div
                className="flex cursor-pointer items-center justify-between bg-[#34430f] px-4 py-5 text-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex-1 text-[#FCFFDF] font-medium">{currentCategory.title}</div>
                <Image
                  width={15}
                  height={15}
                  src="/images/homePage/ic-arrow-down.svg"
                  alt="arrow down"
                  className={`object-cover transition-all duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isDropdownOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="border-t border-primary-700">
                  {faqCategories.map((category, index) => (
                    <div
                      key={category.id}
                      onClick={() => handleMobileSelect(category.id)}
                      className={`px-4 py-3 border-b border-primary-700 last:border-b-0 cursor-pointer transition-colors duration-200 ${
                        activeCategory === category.id
                          ? "bg-white text-[#4c5d36] font-medium"
                          : "text-[#99BB40] hover:bg-primary-700 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm leading-tight">{category.title}</span>
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
                    {faqCategories.map((category, _index) => (
                      <li key={category.id} className="border-b border-[#99BB40] last:border-b-0">
                        <div
                          onClick={() => handleDesktopSelect(category.id)}
                          className={`group flex cursor-pointer items-center justify-between px-3 py-4 font-medium transition-all duration-200 ${
                            activeCategory === category.id
                              ? "text-[#FCFFDF]"
                              : "text-[#99BB40] hover:text-[#FCFFDF]"
                          }`}
                        >
                          <div className="flex-1 pr-3 text-[15px] leading-snug">
                            {category.title}
                          </div>
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
                  {faqCategories.map((category) => (
                    <div
                      key={category.id}
                      ref={setSectionRef(category.id)}
                      className={`${activeCategory === category.id ? "block" : "hidden"}`}
                    >
                      <h2 className="mb-5 text-gray-900 text-2xl font-bold">{category.title}</h2>
                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item) => (
                          <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:text-[#6c8a1f]">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
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

export default FAQ;
