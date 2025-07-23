"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      case "adventure-tours":
        return {
          title: "ADVENTURE TOURS",
          description:
            "Jungle Boss builds teamwork through adventure in Phong Nha – Ke Bang National Park. Challenge your team with games in the jungle.",
          image: "https://junglebosstours.com/images/banner/banner-tour.webp", // Sử dụng hình jungle phù hợp
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
    <div
      className={`hidden md:block w-2/3 lg:w-3/5 duration-300 ease-in-out transform transition-all ${
        activeMenuSection
          ? "opacity-100 translate-x-0 visible"
          : "opacity-0 translate-x-10 invisible"
      }`}
    >
      {/* Content Container với padding tối ưu */}
      <div className="h-full flex items-center justify-center px-8 lg:px-12 xl:px-16 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Title Section */}
          <div className="space-y-4">
            <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider leading-tight">
              {contentData.title}
            </h2>
            <p className="text-white/90 text-base lg:text-lg xl:text-xl leading-relaxed max-w-xl mx-auto">
              {contentData.description}
            </p>
          </div>

          {/* Image Section - Compact size */}
          <div className="mx-auto max-w-lg lg:max-w-xl">
            <div className="overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
              <Image
                width={500}
                height={375}
                src={contentData.image}
                alt={contentData.alt}
                className="object-cover w-full h-full duration-300 ease-in-out hover:scale-105 transition-transform"
                priority
              />
            </div>
          </div>

          {/* Button Section */}
          <div>
            <Link href={contentData.href} onClick={onCloseMenu}>
              <button className="px-8 py-3 text-white border-2 border-white rounded-lg bg-transparent hover:bg-white hover:text-[#004750] transition-all duration-300 text-base font-medium tracking-wider">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuContent;
