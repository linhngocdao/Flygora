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

  // Language data với TypeScript typing
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
      id: "team-building",
      label: "Team Building",
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
    } else if (pathname.includes("/team-building")) {
      setActiveMenuSection("team-building");
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
        className={`hidden md:block fixed inset-0 z-[1001] w-screen h-screen overflow-hidden transition-all duration-400 ease-out ${
          isMenuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
        style={{
          backgroundImage: "url('/images/homePage/bg-overlay-main.webp')",
          backgroundSize: "cover",
        }}
      >
        {/* Content Layer - Cả khối chạy vào cùng lúc */}
        <div className="relative z-20 flex w-full h-full">
          {/* Sidebar - Responsive width */}
          <div className="w-1/4 lg:w-1/5 xl:w-1/6 bg-transparent relative">
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 w-full h-full"
                style={{ backgroundImage: "url(/images/homePage/bg-overlay-sub.webp)" }}
              />
              <div
                className={`relative px-3 md:px-4 lg:px-6 xl:px-8 py-8 md:py-12 h-full flex flex-col transition-all duration-300 ease-out ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? "100ms" : "0ms",
                }}
              >
                {/* Close Button */}
                <button
                  aria-label="Đóng menu"
                  className="cursor-pointer items-center flex space-x-2 duration-300 ease-in-out text-yellow-400 hover:text-[#a4c639] transition-colors group mb-6 md:mb-8"
                  onClick={onCloseMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    className="w-3 h-4 md:w-4 md:h-5"
                  >
                    <path
                      d="M3.5756 17.3878C3.34963 17.6761 3.0282 17.8742 2.66915 17.9466C2.31011 18.019 1.93702 17.9608 1.61705 17.7825C1.35573 17.6475 1.15489 17.419 1.05454 17.1425C0.954195 16.866 0.961712 16.5618 1.0756 16.2906C2.2414 13.9803 3.86255 11.2784 5.0056 9.44939C5.58315 8.52534 5.78725 8.35789 5.145 7.51284C4.61075 6.80984 3.9017 5.94719 3.44685 5.39654C2.65685 4.44049 1.5162 3.12259 1.21445 2.41564C1.08905 2.06418 1.07938 1.68183 1.18684 1.32449C1.2943 0.967139 1.51325 0.65354 1.8117 0.429539C2.4267 -0.0221607 2.9967 0.130389 3.69625 0.824089C4.15005 1.27409 6.8019 4.64764 7.16715 5.12634C7.6081 5.70434 7.71895 5.68929 8.18555 5.04324C8.65945 4.38699 10.5472 1.97049 11.0329 1.32294C11.9058 0.159039 12.9012 -0.317061 13.527 0.283739C13.6754 0.399258 13.7995 0.542949 13.8921 0.706561C13.9848 0.870173 14.0443 1.05048 14.0671 1.23713C14.0899 1.42379 14.0756 1.6131 14.025 1.79421C13.9744 1.97532 13.8886 2.14465 13.7723 2.29249C12.9067 3.65249 11.8436 4.88489 10.8828 6.17684C10.6141 6.49856 10.3676 6.8382 10.145 7.19339C9.6684 8.04564 9.6172 8.08229 10.1147 8.93634C10.4605 9.53004 11.0894 10.3463 11.4505 10.86C12.4467 12.2777 13.5269 13.8341 14.6311 15.1656C15.5755 16.3045 14.6253 17.24 14.0911 17.5159C13.7708 17.7032 13.3899 17.7576 13.0299 17.6677C12.67 17.5777 12.3595 17.3505 12.1649 17.0345C11.5187 16.1771 10.9888 15.223 10.3873 14.3332C9.89615 13.6064 9.29414 12.5132 8.77004 11.8045C7.97289 10.7266 7.82145 10.3311 7.4796 10.9385C6.29425 13.045 4.2235 16.5121 3.5756 17.3878Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="uppercase text-xs md:text-sm font-semibold tracking-wider">
                    Close
                  </div>
                </button>

                {/* Main Menu Items - Slide in nhanh từng item */}
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 mt-12 md:mt-16 lg:mt-20">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`group transition-all duration-400 ease-out ${
                        isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${200 + index * 80}ms` : "0ms",
                      }}
                    >
                      <button
                        className={`block cursor-pointer w-full text-left text-xs md:text-sm lg:text-base xl:text-lg font-bold tracking-wider transition-all duration-300 py-1 hover:translate-x-2 ${
                          activeMenuSection === item.id
                            ? "text-[#a4c639]"
                            : "text-white hover:text-[#a4c639]"
                        }`}
                        onClick={() => handleMenuItemClick(item.id, item.href)}
                        onMouseEnter={() => setActiveMenuSection(item.id)}
                        type="button"
                      >
                        {item.label.toUpperCase()}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Sub Menu - Slide in nhanh với delay */}
                <div className="space-y-2 md:space-y-3 mb-auto">
                  {subMenuItems.map((item, index) => (
                    <div
                      key={item.href}
                      className={`transition-all duration-400 ease-out ${
                        isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${440 + index * 60}ms` : "0ms",
                      }}
                    >
                      <Link
                        href={item.href}
                        className="block text-left duration-300 ease-in-out text-xs md:text-sm lg:text-base text-yellow-200 hover:text-white hover:translate-x-1 transition-all py-1"
                        onClick={onCloseMenu}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Bottom Section - Language & Social */}
                <div
                  className={`space-y-3 md:space-y-4 mt-auto transition-all duration-400 ease-out ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? "680ms" : "0ms",
                  }}
                >
                  {/* Language Switcher */}
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <span className="text-white text-xs md:text-sm lg:text-base font-medium">
                      {currentLang.name}
                    </span>
                    <span className="text-white/60">|</span>
                    <Link
                      href={pathname}
                      locale={otherLocale}
                      className="text-[#a4c639] hover:text-white transition-colors duration-300 text-xs md:text-sm lg:text-base font-medium"
                      onClick={onCloseMenu}
                    >
                      {otherLang.name}
                    </Link>
                  </div>

                  {/* Social Media Icons - Responsive sizing */}
                  <div className="flex space-x-1 lg:space-x-2">
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
                        className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:scale-110 transition-all duration-400 ease-out ${
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
                          width={40}
                          height={40}
                          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Content Detail (Desktop only) - Responsive width */}
          <div
            className={`w-3/4 lg:w-4/5 xl:w-5/6 relative z-30 transition-all duration-400 ease-out ${
              isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
            style={{
              transitionDelay: isMenuOpen ? "150ms" : "0ms",
            }}
          >
            <MenuContent activeMenuSection={activeMenuSection} onCloseMenu={onCloseMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu - Non-fullscreen */}
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
