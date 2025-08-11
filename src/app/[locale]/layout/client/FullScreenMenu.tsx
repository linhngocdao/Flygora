"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import MenuContent from "./MenuContent";
import Image from "next/image";

export interface MenuItemType {
  id: string;
  label: string;
  href: string;
}

interface FullScreenMenuProps {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isMenuOpen, onCloseMenu }) => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [activeMenuSection, setActiveMenuSection] = useState<string>("adventure-tours");

  // Language configuration
  const languages = {
    vi: {
      flag: "/images/homePage/flag-vi.webp",
      code: "VI",
      name: "Vietnamese",
    },
    en: {
      flag: "/images/homePage/flag-en.webp",
      code: "EN",
      name: "English",
    },
  } as const;

  const currentLang = languages[locale as keyof typeof languages];
  const otherLang = locale === "vi" ? languages.en : languages.vi;
  const otherLocale = locale === "vi" ? "en" : "vi";

  const menuItems: MenuItemType[] = [
    {
      id: "adventure-tours",
      label: "Adventure Tours",
      href: "/tour",
    },
    {
      id: "multiday-tours",
      label: "Multiday Tours",
      href: "/team-building",
    },
    {
      id: "about-us",
      label: "About Us",
      href: "/about-us",
    },
  ];

  const subMenuItems = [
    { label: "Explorer", href: "/explorer" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Booking Policy", href: "/policy" },
  ];

  // Set active section based on current path
  useEffect(() => {
    if (pathname.includes("/tour")) {
      setActiveMenuSection("adventure-tours");
    } else if (pathname.includes("/multiday-tours")) {
      setActiveMenuSection("multiday-tours");
    } else if (pathname.includes("/about")) {
      setActiveMenuSection("about-us");
    }
  }, [pathname]);

  const handleMenuItemClick = (itemId: string, href: string): void => {
    setActiveMenuSection(itemId);
    router.push(href);
    onCloseMenu();
  };

  return (
    <>
      {/* Desktop Fullscreen Menu */}
      <div
        className={`hidden md:block fixed inset-0 z-[1001] w-screen h-screen overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
        style={{
          backgroundImage: "url('/images/homePage/bg-overlay-main.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Backdrop overlay */}
        {/* <div
          className={`absolute inset-0  transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        /> */}

        {/* Content Layer */}
        <div className="relative z-20 flex w-full h-full">
          {/* Sidebar */}
          <div className="w-80 lg:w-96 bg-transparent relative">
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 w-full h-full bg-black/20 backdrop-blur-md"
                style={{
                  backgroundImage: "url(/images/homePage/bg-overlay-sub.webp)",
                  backgroundBlendMode: "overlay",
                }}
              />
              <div
                className={`relative px-6 lg:px-8 py-8 h-full flex flex-col transition-all duration-400 ease-out ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? "150ms" : "0ms",
                }}
              >
                {/* Close Button */}
                <button
                  aria-label="Close menu"
                  className="group flex items-center space-x-3 text-white/80 hover:text-[#a4c639] transition-all duration-300 mb-8"
                  onClick={onCloseMenu}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 group-hover:border-[#a4c639] transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium tracking-wide uppercase">Close</span>
                </button>

                {/* Main Menu Items */}
                <div className="space-y-2 mb-8 flex-1">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`transition-all duration-400 ease-out ${
                        isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${250 + index * 100}ms` : "0ms",
                      }}
                    >
                      <button
                        className={`group relative w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 ${
                          activeMenuSection === item.id
                            ? "text-[#a4c639] bg-white/10"
                            : "text-white hover:text-[#a4c639]"
                        }`}
                        onClick={() => handleMenuItemClick(item.id, item.href)}
                        onMouseEnter={() => setActiveMenuSection(item.id)}
                        type="button"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-1 h-6 rounded-full transition-all duration-300 ${
                              activeMenuSection === item.id
                                ? "bg-[#a4c639]"
                                : "bg-transparent group-hover:bg-white/30"
                            }`}
                          />
                          <span className="text-base lg:text-lg font-semibold tracking-wide">
                            {item.label}
                          </span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Sub Menu */}
                <div className="space-y-1 mb-8">
                  {subMenuItems.map((item, index) => (
                    <div
                      key={item.href}
                      className={`transition-all duration-400 ease-out ${
                        isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${550 + index * 50}ms` : "0ms",
                      }}
                    >
                      <Link
                        href={item.href}
                        className="block text-left py-2 px-4 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-all duration-300"
                        onClick={onCloseMenu}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div
                  className={`space-y-4 transition-all duration-400 ease-out ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? "750ms" : "0ms",
                  }}
                >
                  {/* Language Switcher */}
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg backdrop-blur-sm">
                    <span className="text-white text-sm font-medium">{currentLang.name}</span>
                    <Link
                      href={pathname}
                      locale={otherLocale}
                      className="text-[#a4c639] hover:text-white transition-colors duration-300 text-sm font-medium"
                      onClick={onCloseMenu}
                    >
                      Switch to {otherLang.name}
                    </Link>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-3">
                    {[
                      {
                        href: "https://www.facebook.com/flygora",
                        icon: "icon-facebook.png",
                        label: "Facebook",
                      },
                      {
                        href: "https://www.instagram.com/flygora",
                        icon: "icon-instagram.png",
                        label: "Instagram",
                      },
                    ].map((social, index) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#a4c639] hover:scale-110 transition-all duration-300 ${
                          isMenuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isMenuOpen ? `${800 + index * 50}ms` : "0ms",
                        }}
                        aria-label={social.label}
                      >
                        <Image
                          src={`/images/homePage/${social.icon}`}
                          alt={`${social.label} Icon`}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <MenuContent activeMenuSection={activeMenuSection} onCloseMenu={onCloseMenu} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[70px] left-0 right-0 bottom-0 z-[999] overflow-hidden transition-all duration-400 ease-out ${
          isMenuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
      >
        {/* Mobile Background */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/images/homePage/bg-overlay-main.webp')",
              backgroundSize: "cover",
            }}
          />
        </div>

        {/* Mobile Content - Nhanh hơn với delay ngắn */}
        <div
          className={`relative z-20 h-full flex flex-col p-6 sm:p-8 transition-all duration-300 ease-out ${
            isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
          style={{
            transitionDelay: isMenuOpen ? "100ms" : "0ms",
          }}
        >
          {/* Mobile Menu Items */}
          <div className="flex-1 flex flex-col justify-center space-y-6 sm:space-y-8">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-400 ease-out ${
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${200 + index * 80}ms` : "0ms",
                }}
              >
                <button
                  className={`block w-full text-center text-lg sm:text-xl font-bold tracking-[0.15em] transition-all duration-300 py-3 ${
                    activeMenuSection === item.id
                      ? "text-[#a4c639] scale-110"
                      : "text-white hover:text-[#a4c639] hover:scale-105"
                  }`}
                  onClick={() => handleMenuItemClick(item.id, item.href)}
                  type="button"
                >
                  {item.label.toUpperCase()}
                </button>
              </div>
            ))}

            {/* Mobile Sub Menu */}
            <div className="pt-6 sm:pt-8 space-y-3 sm:space-y-4">
              {subMenuItems.map((item, index) => (
                <div
                  key={item.href}
                  className={`transition-all duration-400 ease-out ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${440 + index * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    className="block w-full text-center text-sm sm:text-base text-white/70 hover:text-[#a4c639] hover:scale-105 transition-all duration-300 py-2"
                    onClick={onCloseMenu}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Bottom Section */}
          <div
            className={`space-y-4 sm:space-y-6 pb-4 transition-all duration-400 ease-out ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isMenuOpen ? "680ms" : "0ms",
            }}
          >
            {/* Language Switcher */}
            <div className="flex items-center justify-center space-x-4">
              <span className="text-white text-sm sm:text-base font-medium">
                {currentLang.name}
              </span>
              <span className="text-white/60 text-lg">|</span>
              <Link
                href={pathname}
                locale={otherLocale}
                className="text-[#a4c639] hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium"
                onClick={onCloseMenu}
              >
                {otherLang.name}
              </Link>
            </div>

            {/* Social Media Icons - Mobile responsive */}
            <div className="flex justify-center space-x-3 sm:space-x-4">
              {[
                {
                  href: "https://tripadvisor.com/junglebosstours",
                  icon: "icon-tripadvisor.png",
                  label: "TripAdvisor",
                },
                {
                  href: "https://facebook.com/junglebosstours",
                  icon: "icon-facebook.png",
                  label: "Facebook",
                },
                {
                  href: "https://youtube.com/@junglebosstours",
                  icon: "icon-youtube.png",
                  label: "YouTube",
                },
                {
                  href: "https://instagram.com/junglebosstours",
                  icon: "icon-instagram.png",
                  label: "Instagram",
                },
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:scale-110 transition-all duration-400 ease-out ${
                    isMenuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${720 + index * 40}ms` : "0ms",
                  }}
                  aria-label={social.label}
                >
                  <Image
                    src={`/images/homePage/${social.icon}`}
                    alt={`${social.label} Icon`}
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullScreenMenu;
