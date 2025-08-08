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
    switch (section) {
      case "food-tours":
        return {
          title: "ADVENTURE TOURS",
          description:
            "Jungle Boss builds teamwork through adventure in Phong Nha – Ke Bang National Park. Challenge your team with games in the jungle.",
          image: "https://junglebosstours.com/images/banner/banner-tour.webp",
          alt: "Adventure Tours in Phong Nha Ke Bang",
          href: "/tour",
        };
      case "team-building":
        return {
          title: "TEAM BUILDING",
          description:
            "Transform your team dynamics with our unique team building experiences in the heart of Vietnam's pristine jungle landscape.",
          image: "https://junglebosstours.com/images/banner/banner-tour.webp",
          alt: "Team Building Activities in Vietnam",
          href: "/team-building",
        };
      case "about-us":
        return {
          title: "ABOUT US",
          description:
            "Discover our story and mission to provide safe, sustainable, and unforgettable adventures in Phong Nha-Ke Bang National Park.",
          image: "https://junglebosstours.com/images/banner/banner-tour.webp",
          alt: "Vietnam Adventure Tourism Company",
          href: "/about-us",
        };
      default:
        return null;
    }
  };

  const contentData = getContentData(activeMenuSection);

  if (!contentData) return null;

  return (
    <div className="hidden md:block w-2/3 lg:w-3/5 h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMenuSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12 space-y-8"
        >
          {/* Title and Description Section - Top */}
          <div className="space-y-6 text-left">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider leading-tight"
            >
              {contentData.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/90 text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-4xl"
            >
              {contentData.description}
            </motion.p>
          </div>

          {/* Image Section - Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="overflow-hidden rounded-2xl aspect-[16/9] shadow-2xl">
              <Image
                width={1200}
                height={675}
                src={contentData.image}
                alt={contentData.alt}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* Button Section - Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-start"
          >
            <Link href={contentData.href} onClick={onCloseMenu}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#a4c639",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-10 py-4 text-white border-2 border-white rounded-lg bg-transparent transition-all duration-300 text-lg font-medium tracking-wider shadow-lg hover:shadow-xl"
              >
                Explore Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuContent;
