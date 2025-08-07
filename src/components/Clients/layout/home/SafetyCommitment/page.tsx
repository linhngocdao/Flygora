import React from "react";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

const SafetyCommitment = () => {
  const t = useTranslations("common.safetyCommitment");

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.2,
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
      <section className="relative lg:py-[65px] xl:h-[598px] md:py-[45px] py-[34px] bg-[url('/images/homePage/indian-city-buildings-scene.jpg')] bg-cover">
        {/* Background overlay - đặt ở đây với z-index thấp */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20 container xl:px-[113px] pt-20">
          <motion.div
            className="bg-[#4c5d36]/50 lg:p-8 md:p-6 p-4 rounded-[8px] space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-center pre-header !text-[#eef4b7] text-lg sm:text-xl md:text-2xl lg:text-3xl"
              variants={itemVariants}
            >
              {t("title")}
            </motion.h2>

            <motion.div
              className="text-center uppercase text-[1.2rem] md:text-[1rem] lg:text-[1.5rem] xl:text-[1.5rem] sm:text-[1rem] font-[600] leading-[125%] text-[#ede52a]"
              variants={itemVariants}
            >
              &quot;{t("quote")}&quot;
            </motion.div>

            <motion.div
              className="text-[20px] sm:text-[18px] md:text-[20px] lg:text-[20px] text-center whitespace-pre-line text-gray-50 body-1"
              variants={itemVariants}
            >
              {t("description")}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SafetyCommitment;
