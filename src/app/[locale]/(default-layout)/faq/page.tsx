"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** ===== Types ===== */
type Inline = Array<string | { bold?: string; italic?: string }>;
type Paragraph = { type: "p"; children: Inline };
type BulletedList = { type: "ul"; items: Inline[] };

interface FAQItem {
  id: string;
  question: string;
  answer: Array<Paragraph | BulletedList>;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

/** ===== Small helpers: parse inline **bold** and *italic* ===== */
function renderInline(inline: Inline) {
  return inline.map((chunk, i) => {
    if (typeof chunk === "string") return <span key={i}>{chunk}</span>;
    if (chunk.bold) return <strong key={i}>{chunk.bold}</strong>;
    if (chunk.italic) return <em key={i}>{chunk.italic}</em>;
    return null;
  });
}

/** Answer renderer: paragraph spacing + list spacing */
function AnswerRenderer({ answer }: { answer: FAQItem["answer"] }) {
  return (
    <div className="text-gray-700 text-sm leading-relaxed space-y-3">
      {answer.map((block, idx) => {
        if (block.type === "p") {
          return (
            <p key={idx} className="[&_strong]:font-semibold [&_em]:italic">
              {renderInline(block.children)}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1">
              {block.items.map((li, j) => (
                <li key={j} className="[&_strong]:font-semibold [&_em]:italic">
                  {renderInline(li)}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

const FAQ = () => {
  // Sidebar state
  const [activeCategory, setActiveCategory] = useState("food-tour-experience");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  /** ===== Data (2 categories) ===== */
  const faqCategories: FAQCategory[] = [
    {
      id: "food-tour-experience",
      title: "FOOD & TOUR EXPERIENCE",
      items: [
        {
          id: "dietary-allergies",
          question:
            "01. Can you accommodate dietary restrictions or allergies (e.g., vegetarian, vegan, gluten-free, nut allergies)?",
          answer: [
            {
              type: "p",
              children: [
                "Yes, we do our best to accommodate most dietary needs! Please inform us of any specific restrictions or allergies at the time of booking so we can prepare accordingly.",
              ],
            },
          ],
        },
        {
          id: "walking-accessibility",
          question:
            "02. How much walking is involved, and is the tour accessible for people with mobility issues?",
          answer: [
            {
              type: "p",
              children: [
                "Our tour involves a leisurely walk of approximately ",
                { bold: "3 kilometers (about 2 miles)" },
                " through the bustling streets of the Hanoi Old Quarter over ",
                { bold: "3 hours" },
                ". We walk at a relaxed pace, with plenty of stops for food and rest.",
              ],
            },
          ],
        },
        {
          id: "what-is-included",
          question:
            "03. What is included in the tour price? Are drinks and tips for the vendors covered?",
          answer: [
            {
              type: "p",
              children: [
                "The tour price is ",
                { bold: "all-inclusive" },
                "! It covers all of the food and drinks on our itinerary. You can expect:",
              ],
            },
            {
              type: "ul",
              items: [
                ["All food items from our ", { bold: "6–8" }, " different stops."],
                [
                  "A selection of local beverages, which may include Vietnamese beer (",
                  { italic: "bia hơi" },
                  "), egg coffee, sugarcane juice, or bottled water.",
                ],
                ["The services of a passionate, English-speaking local guide."],
              ],
            },
          ],
        },
        {
          id: "rain-policy",
          question: "04. What happens if it rains on the day of my tour?",
          answer: [
            {
              type: "p",
              children: [
                "Our tours run ",
                { bold: "rain or shine" },
                "! Hanoi's weather can be unpredictable, and a little rain doesn't stop the city's amazing food scene.",
              ],
            },
            {
              type: "p",
              children: [
                "Many of our stops are covered; we provide disposable ponchos if needed. Wear comfortable shoes. In case of ",
                { bold: "extreme weather" },
                ", we will reschedule or provide a full refund.",
              ],
            },
          ],
        },
        {
          id: "how-much-food",
          question: "05. How much food is served on the tour? Should I eat beforehand?",
          answer: [
            {
              type: "p",
              children: [
                "Please come with an ",
                { bold: "empty stomach" },
                "! Our tour is designed to be a complete and satisfying meal.",
              ],
            },
            {
              type: "p",
              children: [
                "We will be sampling over ",
                { bold: "8 different signature Hanoi dishes" },
                ".",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "tour-information",
      title: "TOUR INFORMATION",
      items: [
        {
          id: "cultural-customs",
          question:
            "01. Are there any cultural customs or etiquette I should be aware of at the food stalls?",
          answer: [
            {
              type: "p",
              children: [
                "Hanoi's street food culture is wonderfully informal and welcoming! Your guide will handle all ordering and payments—just relax and enjoy.",
              ],
            },
          ],
        },
        {
          id: "food-safety",
          question: "02. Is the street food safe to eat? What are the hygiene standards?",
          answer: [
            {
              type: "p",
              children: [
                "Your safety is our ",
                { bold: "absolute priority" },
                ". We've spent years vetting vendors and only visit trusted, long-standing stalls that we and our families eat at regularly.",
              ],
            },
          ],
        },
        {
          id: "kids-and-seniors",
          question: "03. Is the tour suitable for children and seniors?",
          answer: [
            {
              type: "p",
              children: ["Yes, we are a ", { bold: "family-friendly" }, " tour."],
            },
          ],
        },
        {
          id: "what-to-wear",
          question: "04. What should I wear and bring with me on the tour?",
          answer: [
            {
              type: "p",
              children: [
                "We recommend dressing for ",
                { bold: "maximum comfort" },
                ": breathable clothing, comfy walking shoes, and a small bottle of water. Light rain gear is helpful in rainy months.",
              ],
            },
          ],
        },
      ],
    },
  ];

  // Helpers
  const getCurrentCategory = () =>
    faqCategories.find((c) => c.id === activeCategory) || faqCategories[0];

  const scrollToSection = (categoryId: string) => {
    const el = sectionRefs.current[categoryId];
    if (!el) return;
    const headerOffset = 100;
    const y = el.offsetTop - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const setSectionRef = (categoryId: string) => (el: HTMLElement | null) => {
    sectionRefs.current[categoryId] = el;
  };

  const currentCategory = getCurrentCategory();

  return (
    <main>
      {/* Hero */}
      <section className="relative md:h-[500px] h-[400px] max-h-screen">
        <div className="absolute inset-0">
          <Image
            fill
            src="/images/GoTravel_policy/banner-policy.webp"
            alt="FAQ banner"
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute inset-0 w-full h-full bg-black/50" />
        <div className="relative flex items-center justify-center h-full">
          <div className="container">
            <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="xl:py-[68px] md:py-[48px] py-[34px] md:space-y-0 space-y-8">
        {/* Mobile dropdown */}
        <div className="md:hidden">
          <div className="bg-[#4c5d36] overflow-hidden">
            <div
              className="flex cursor-pointer items-center justify-between bg-[#34430f] px-4 py-5 text-white"
              onClick={() => setIsDropdownOpen((s) => !s)}
            >
              <div className="flex-1 text-[#FCFFDF] font-medium">{currentCategory.title}</div>
              <ChevronRight
                className={`transition-transform ${isDropdownOpen ? "rotate-90" : ""}`}
              />
            </div>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isDropdownOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="border-t border-primary-700">
                {faqCategories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setActiveCategory(category.id);
                      scrollToSection(category.id);
                    }}
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
            {/* Sidebar */}
            <aside className="hidden col-span-full md:block md:col-span-4">
              <div className="xl:px-6 md:px-4 px-4 xl:py-8 md:py-6 py-5 rounded-lg bg-[#4c5d36] sticky top-[80px]">
                <ul>
                  {faqCategories.map((category) => (
                    <li key={category.id} className="border-b border-[#99BB40] last:border-b-0">
                      <button
                        onClick={() => {
                          setActiveCategory(category.id);
                          scrollToSection(category.id);
                        }}
                        className={`group w-full text-left flex items-center justify-between px-3 py-4 font-medium transition-all duration-200 ${
                          activeCategory === category.id
                            ? "text-[#FCFFDF]"
                            : "text-[#99BB40] hover:text-[#FCFFDF]"
                        }`}
                      >
                        <span className="flex-1 pr-3 text-[15px] leading-snug">
                          {category.title}
                        </span>
                        <ChevronRight />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Content area */}
            <div className="col-span-full md:col-span-8">
              <div className="md:border-l md:border-gray-200 xl:pl-8 md:pl-6">
                {faqCategories.map((category) => (
                  <section
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
                          <AccordionContent>
                            <AnswerRenderer answer={item.answer} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
