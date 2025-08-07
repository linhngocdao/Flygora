import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

export default function FaqSection() {
  // Hook đa ngôn ngữ cho FAQ section
  const t = useTranslations("common.faq");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Dữ liệu FAQ từ translation
  const faqData = [
    {
      id: "01",
      question: t("question1"),
      answer: t("answer1"),
    },
    {
      id: "02",
      question: t("question2"),
      answer: t("answer2"),
    },
    {
      id: "03",
      question: t("question3"),
      answer: t("answer3"),
    },
    {
      id: "04",
      question: t("question4"),
      answer: t("answer4"),
    },
    {
      id: "05",
      question: t("question5"),
      answer: t("answer5"),
    },
    {
      id: "06",
      question: t("question6"),
      answer: t("answer6"),
    },
    {
      id: "07",
      question: t("question7"),
      answer: t("answer7"),
    },
    {
      id: "08",
      question: t("question8"),
      answer: t("answer8"),
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null && contentRefs.current[activeIndex]) {
      contentRefs.current[activeIndex]!.style.maxHeight =
        contentRefs.current[activeIndex]!.scrollHeight + "px";
    }
    contentRefs.current.forEach((el, idx) => {
      if (idx !== activeIndex && el) {
        el.style.maxHeight = "0px";
      }
    });
  }, [activeIndex]);

  const setContentRef = useCallback((el: HTMLDivElement | null, index: number) => {
    contentRefs.current[index] = el;
  }, []);

  return (
    <section className="container lg:pt-[68px] lg:pb-[60px] md:py-[45px] py-[34px] space-y-8">
      <div className="space-y-4">
        <h3 className="tracking-[1.4px] pre-header text-[#6c8a1f]">{t("preTitle")}</h3>
        <div className="space-y-2">
          <h2 className="uppercase headline-1 text-[#004750]">{t("newTitle")}</h2>
          <div className="text-gray-700 body-1">{t("subtitle")}</div>
        </div>
      </div>

      <div className="xl:flex xl:space-x-[54px] md:space-y-8 space-y-4 xl:space-y-0">
        <div className="xl:w-[481px] flex-shrink-0 flex flex-col justify-between space-y-4">
          <div className="space-y-4 faqs">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className="border-b border-gray-200 pb-2">
                  <div
                    onClick={() => toggleAccordion(index)}
                    className="flex items-center justify-between space-x-2 cursor-pointer group"
                  >
                    <div className="flex space-x-2">
                      <div
                        className={`title-3 duration-150 ${
                          isActive
                            ? "text-[#728C2F] font-semibold"
                            : "text-gray-500 group-hover:text-[#728C2F]"
                        }`}
                      >
                        {item.id}
                      </div>
                      <div
                        className={`title-3 duration-150 ${
                          isActive
                            ? "text-[#728C2F] font-semibold"
                            : "text-[#333] group-hover:text-[#728C2F]"
                        }`}
                      >
                        {item.question}
                      </div>
                    </div>
                    <Image
                      width={16}
                      height={16}
                      src="/images/homePage/ic-arrow-down-black.svg"
                      alt="arrow down"
                      className={`transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    ref={(el) => setContentRef(el, index)}
                    className="overflow-hidden text-gray-700 transition-all duration-500 ease-in-out body-1 faq-prose max-h-0"
                  >
                    <p className="text-justify py-2 px-1">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ButtonPrimary name={t("contactButton")} href="/contact" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex space-x-2 h-[200px]">
            <div className="w-[45%] h-full rounded-[4px] overflow-hidden flex-shrink-0">
              <Image
                src="/images/homePage/faqHome1.jpg"
                width={900}
                height={600}
                quality={100}
                className="object-cover w-full h-full"
                alt="faq-img-1"
              />
            </div>
            <div className="flex-grow h-full rounded-[4px] overflow-hidden">
              <Image
                src="/images/homePage/faqHome2.jpg"
                width={716}
                height={400}
                quality={100}
                className="object-cover w-full h-full"
                alt="faq-img-2"
              />
            </div>
          </div>

          <div className="flex md:space-x-2 md:h-[328.5px] max-md:flex-wrap">
            <div className="w-[49.5%] aspect-1 flex-shrink-0 rounded-[4px] overflow-hidden max-md:mr-2 max-md:mb-2">
              <Image
                src="/images/homePage/faqHome3.jpg"
                width={658}
                height={658}
                quality={100}
                className="object-cover w-full h-full"
                alt="faq-img-3"
              />
            </div>
            <div className="flex flex-col space-y-2 flex-shrink-0 md:w-[160px] w-[48%] max-md:mb-2">
              <div className="h-1/2 aspect-1 rounded-[4px] overflow-hidden">
                <Image
                  src="/images/homePage/faqHome4.jpg"
                  width={320}
                  height={320}
                  quality={100}
                  className="object-cover w-full h-full"
                  alt="faq-img-4"
                />
              </div>
              <div className="flex-grow aspect-1 rounded-[4px] overflow-hidden">
                <Image
                  src="/images/homePage/faqHome5.jpg"
                  width={320}
                  height={320}
                  quality={100}
                  className="object-cover w-full h-full"
                  alt="faq-img-5"
                />
              </div>
            </div>
            <div className="flex-grow h-full rounded-[4px] overflow-hidden max-md:hidden">
              <Image
                src="/images/homePage/faqHome6.jpg"
                width={320}
                height={656}
                quality={100}
                className="object-cover w-full h-full"
                alt="faq-img-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
