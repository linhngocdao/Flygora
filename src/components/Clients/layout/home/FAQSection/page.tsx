import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

export default function FaqSection() {
  // Hook đa ngôn ngữ cho FAQ section
  const t = useTranslations("common.faq");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const faqItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.section
      className="container lg:pt-[68px] lg:pb-[60px] md:py-[45px] py-[34px] space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="space-y-3"
        variants={itemVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h3
          className="tracking-[1.4px] pre-header text-[#6c8a1f]"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("preTitle")}
        </motion.h3>
        <div className="space-y-2">
          <motion.h2
            className="uppercase headline-1 text-[#004750]"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t("newTitle")}
          </motion.h2>
          <motion.div
            className="text-gray-700 body-1"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t("subtitle")}
          </motion.div>
        </div>
      </motion.div>

      <div className="xl:flex xl:space-x-[54px] md:space-y-6 space-y-4 xl:space-y-0">
        <motion.div
          className="xl:w-[481px] flex-shrink-0 flex flex-col justify-between space-y-6"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-3 faqs">
            <AnimatePresence>
              {faqData.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    key={index}
                    className="border-b border-gray-200 pb-2"
                    variants={faqItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      onClick={() => toggleAccordion(index)}
                      className="flex items-center justify-between space-x-2 cursor-pointer group py-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex space-x-2">
                        <motion.div
                          className={`title-3 duration-150 ${
                            isActive
                              ? "text-[#728C2F] font-semibold"
                              : "text-gray-500 group-hover:text-[#728C2F]"
                          }`}
                          animate={{
                            color: isActive ? "#728C2F" : "#6B7280",
                          }}
                        >
                          {item.id}
                        </motion.div>
                        <motion.div
                          className={`title-3 duration-150 ${
                            isActive
                              ? "text-[#728C2F] font-semibold"
                              : "text-[#333] group-hover:text-[#728C2F]"
                          }`}
                          animate={{
                            color: isActive ? "#728C2F" : "#333333",
                          }}
                        >
                          {item.question}
                        </motion.div>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Image
                          width={16}
                          height={16}
                          src="/images/homePage/ic-arrow-down-black.svg"
                          alt="arrow down"
                        />
                      </motion.div>
                    </motion.div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="overflow-hidden text-gray-700 body-1 faq-prose"
                        >
                          <motion.p
                            className="text-justify py-2 px-1"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {item.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1, ease: "easeOut" },
            }}
          >
            <ButtonPrimary name={t("contactButton")} href="/contact-us" />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 space-y-2"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex space-x-2 h-[200px]"
            variants={imageVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="w-[45%] h-full rounded-[4px] overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/homePage/faqHome1.jpg"
                width={900}
                height={600}
                quality={100}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                alt="faq-img-1"
              />
            </motion.div>
            <motion.div
              className="flex-grow h-full rounded-[4px] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/homePage/faqHome2.jpg"
                width={716}
                height={400}
                quality={100}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                alt="faq-img-2"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex md:space-x-2 md:h-[328.5px] max-md:flex-wrap"
            variants={imageVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="w-[49.5%] aspect-1 flex-shrink-0 rounded-[4px] overflow-hidden max-md:mr-2 max-md:mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/homePage/faqHome3.jpg"
                width={658}
                height={658}
                quality={100}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                alt="faq-img-3"
              />
            </motion.div>
            <div className="flex flex-col space-y-2 flex-shrink-0 md:w-[160px] w-[48%] max-md:mb-2">
              <motion.div
                className="h-1/2 aspect-1 rounded-[4px] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/homePage/faqHome4.jpg"
                  width={320}
                  height={320}
                  quality={100}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  alt="faq-img-4"
                />
              </motion.div>
              <motion.div
                className="flex-grow aspect-1 rounded-[4px] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/homePage/faqHome5.jpg"
                  width={320}
                  height={320}
                  quality={100}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  alt="faq-img-5"
                />
              </motion.div>
            </div>
            <motion.div
              className="flex-grow h-full rounded-[4px] overflow-hidden max-md:hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/homePage/faqHome6.jpg"
                width={320}
                height={656}
                quality={100}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                alt="faq-img-6"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
