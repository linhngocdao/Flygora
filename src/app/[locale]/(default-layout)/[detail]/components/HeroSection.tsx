import React from "react";

interface HeroSectionProps {
  coverImage: string;
  title: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ coverImage, title }) => {
  return (
    <section className="relative h-screen">
      {/* Hero Image - Full screen */}
      <div className="relative h-full overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/api/placeholder/1440/800";
          }}
        />
        {/* Backdrop overlay - gradient from transparent to dark green */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/80"></div>

        {/* Logo at top center */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-yellow-400 font-bold text-2xl tracking-wider">JUNGLE BOSS</div>
          <div className="text-white text-xs text-center tracking-widest">
            ADVENTURE TOURS - TEAM BUILDING
          </div>
        </div>

        {/* Menu button top left */}
        <button className="absolute top-6 left-6 z-10 text-white">
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        </button>

        {/* Search and language buttons top right */}
        <div className="absolute top-6 right-6 z-10 flex items-center space-x-4">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="bg-red-600 text-white px-2 py-1 rounded text-sm">🇻🇳</button>
        </div>
      </div>
    </section>
  );
};
