"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export interface MenuContentType {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

interface MenuContentProps {
  activeMenuSection: string;
  onCloseMenu: () => void;
}

const MenuContent: React.FC<MenuContentProps> = ({ activeMenuSection, onCloseMenu }) => {
  const getContentData = (section: string): MenuContentType | null => {
    const contentMap: Record<string, MenuContentType> = {
      "food-tours": {
        title: "FOOD TOURS",
        description:
          "Discover the best food tours in Vietnam. Experience the taste of Vietnam with our food tours.",
        image: "https://junglebosstours.com/images/banner/banner-tour.webp",
        alt: "Food Tours in Vietnam",
        href: "/food-tours",
      },
      "multiday-tours": {
        title: "MULTIDAY TOURS",
        description:
          "Immerse yourself in extended journeys that combine adventure, culture, and unforgettable experiences across multiple destinations.",
        image: "https://junglebosstours.com/images/banner/banner-tour.webp",
        alt: "Multiday Adventure Tours",
        href: "/team-building",
      },
      "about-us": {
        title: "ABOUT US",
        description:
          "Learn about our passion for creating sustainable, safe, and transformative travel experiences that connect people with nature.",
        image: "https://junglebosstours.com/images/banner/banner-tour.webp",
        alt: "About Our Food Tourism Company",
        href: "/about-us",
      },
    };

    return contentMap[section] || null;
  };

  const contentData = getContentData(activeMenuSection);

  if (!contentData) return null;

  return (
    <div className="hidden md:block h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMenuSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="h-full flex flex-col justify-center px-6 lg:px-8 xl:px-10 py-6 space-y-4"
        >
          {/* Content Container */}
          <div className="max-w-4xl mx-auto w-full space-y-5">
            {/* Title and Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3 text-left"
            >
              <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide leading-tight">
                {contentData.title}
              </h2>

              <p className="text-white/90 text-sm lg:text-base xl:text-lg leading-relaxed max-w-2xl">
                {contentData.description}
              </p>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full mx-auto"
            >
              <div className="overflow-hidden rounded-lg aspect-[21/10] shadow-lg">
                <Image
                  width={600}
                  height={275}
                  src={contentData.image}
                  alt={contentData.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-start"
            >
              <Link href={contentData.href} onClick={onCloseMenu}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-2.5 text-white border-2 border-white/80 rounded-lg bg-transparent overflow-hidden transition-all duration-300 text-sm font-semibold tracking-wide hover:border-[#a4c639] hover:text-[#a4c639]"
                >
                  <span className="relative z-10">Explore Now</span>
                  <motion.div
                    className="absolute inset-0 bg-white/5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuContent;
