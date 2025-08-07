import React from "react";
import ButtonSecondary from "@/components/Clients/ui/ButtonSecondary";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

const GuestReviewSection = () => {
  const t = useTranslations("common.guestReview");

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div>
      <section>
        <div className="bg-[url('/images/homePage/main-bg.webp')] bg-cover">
          <motion.div
            className="container lg:pt-[68px] lg:pb-[60px] md:py-[45px] py-[34px] xl:px-[143px] md:flex lg:space-x-[79px] md:space-x-5 max-md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="md:w-[372px] w-full max-lg:mx-auto h-[327px] flex-shrink-0 relative lg:my-[55.5px]"
              variants={imageVariants}
            >
              <motion.div
                className="absolute top-[37px] left-0 w-3/4 rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    alt="jungle boss travelodge"
                    height="279"
                    loading="lazy"
                    src={"/images/homePage/Hanoi-Old-Quarter-Evening-Food-Tour-Alley-Walk.jpg"}
                    width="279"
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-0 right-0 w-1/2 overflow-hidden rounded-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="aspect-w-6 aspect-h-7">
                  <Image
                    alt="a wonderful stopover when visiting phong nha ke bang"
                    height="217"
                    loading="lazy"
                    src={"/images/homePage/cot-co-ha-noi.jpg"}
                    width="186"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4" variants={textVariants}>
              <motion.h2 className="pre-header !text-[#ede52a]" variants={itemVariants}>
                {t("title")}
              </motion.h2>

              <motion.div className="space-y-2" variants={itemVariants}>
                <h3 className="text-white uppercase lg:whitespace-pre-line max-md:hidden  text-[1.5rem] font-[600] leading-[125%] lg:text-[2rem]">
                  {t("subtitle")}
                </h3>
                <div className="text-white uppercase md:hidden title-dropline  text-[1.5rem] font-[600] leading-[125%] lg:text-[2rem]">
                  {t("subtitle")}
                </div>
              </motion.div>

              <motion.div
                className="text-[#e0e0e0] leading-[155%] text-[0.8rem] lg:text-[1rem] experience"
                variants={itemVariants}
              >
                <p style={{ textAlign: "justify" }}>{t("description")}</p>
              </motion.div>

              <motion.div
                className="relative items-center space-x-2 max-md:justify-center xl:space-x-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <ButtonSecondary name={t("exploreButton")} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GuestReviewSection;
