"use client";
import React from "react";
import Link from "next/link";

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
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=450&fit=crop",
          alt: "Adventure Tours in Phong Nha Ke Bang",
          href: "/tour",
        };
      case "team-building":
        return {
          title: "Unique & Different Team Building",
          description:
            "Jungle Boss builds teamwork through adventure in Phong Nha – Ke Bang National Park. Challenge your team with games in the jungle.",
          image:
            "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=450&fit=crop",
          alt: "Team Building Activities in Vietnam",
          href: "/team-building",
        };
      case "about-us":
        return {
          title: "Leading & Certificated Adventure Tourism Company in Vietnam",
          description:
            "Jungle Boss Exclusive guides to Vietnam's Phong Nha – Ke Bang Park. Discovering awe-inspiring caves, jungles & sinkholes with few access. Sustainable adventures!",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
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
      <div className="xl:px-[120px] md:px-[80px] px-[60px] xl:pt-[68px] md:pt-[48px] pt-[34px] pb-[45px] flex items-center h-full overflow-y-auto">
        <div className="w-full space-y-6 xl:space-y-10 md:space-y-8">
          <div className="space-y-4 text-white xl:space-y-6 md:space-y-5">
            <h2 className="uppercase whitespace-pre-line text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              {contentData.title}
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-4xl">
              {contentData.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl aspect-video max-w-4xl">
            <img
              src={contentData.image}
              alt={contentData.alt}
              className="object-cover w-full h-full duration-300 ease-in-out hover:scale-105 transition-transform"
            />
          </div>

          <div>
            <Link href={contentData.href} onClick={onCloseMenu}>
              <button className="px-10 py-4 text-white border-2 border-white rounded-lg bg-transparent hover:bg-white hover:text-green-800 transition-all duration-300 text-lg font-medium">
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
