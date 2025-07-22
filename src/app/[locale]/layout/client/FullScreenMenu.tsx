"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MenuContent from "./MenuContent";

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
  const [activeMenuSection, setActiveMenuSection] = useState<string>("adventure-tours"); // Mặc định chọn adventure-tours

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

  const handleMenuItemClick = (itemId: string, href: string): void => {
    // Điều hướng đến trang
    router.push(href);
    onCloseMenu();
  };

  return (
    <>
      {/* Main Menu Overlay - FULL SCREEN */}
      <div
        className={`fixed inset-0 z-[1001] w-screen h-screen overflow-hidden duration-500 ease-in-out transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Background Image for full screen */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            className=" w-full h-full"
            src="/images/homePage/bg-overlay-main.webp"
            alt="Jungle Boss Background Menu"
            fill
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Flex container for full screen layout */}
        <div className="relative z-20 flex w-full h-full">
          {/* Left Panel - Menu Content (1/3 screen) */}
          <div className="w-full md:w-1/3 lg:w-2/5 bg-black/60 md:bg-transparent relative">
            <div className="relative w-full h-full">
              {/* Left background overlay with different color */}
              <div
                className="absolute inset-0 w-full h-full md:block "
                style={{ backgroundImage: "url(/images/homePage/bg-overlay-sub.webp)" }}
              ></div>

              <div className="relative xl:py-[68px] md:py-[48px] py-[34px] xl:px-[80px] lg:px-[60px] px-8 md:px-[40px] h-full flex flex-col justify-between xl:space-y-14 md:space-y-10 space-y-7 overflow-y-auto">
                {/* Close Button (Desktop) */}
                <button
                  aria-label="Đóng menu"
                  className="items-center hidden space-x-2 duration-300 ease-in-out md:flex text-yellow-400 hover:text-white"
                  onClick={onCloseMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                  >
                    <path
                      d="M3.5756 17.3878C3.34963 17.6761 3.0282 17.8742 2.66915 17.9466C2.31011 18.019 1.93702 17.9608 1.61705 17.7825C1.35573 17.6475 1.15489 17.419 1.05454 17.1425C0.954195 16.866 0.961712 16.5618 1.0756 16.2906C2.2414 13.9803 3.86255 11.2784 5.0056 9.44939C5.58315 8.52534 5.78725 8.35789 5.145 7.51284C4.61075 6.80984 3.9017 5.94719 3.44685 5.39654C2.65685 4.44049 1.5162 3.12259 1.21445 2.41564C1.08905 2.06418 1.07938 1.68183 1.18684 1.32449C1.2943 0.967139 1.51325 0.65354 1.8117 0.429539C2.4267 -0.0221607 2.9967 0.130389 3.69625 0.824089C4.15005 1.27409 6.8019 4.64764 7.16715 5.12634C7.6081 5.70434 7.71895 5.68929 8.18555 5.04324C8.65945 4.38699 10.5472 1.97049 11.0329 1.32294C11.9058 0.159039 12.9012 -0.317061 13.527 0.283739C13.6754 0.399258 13.7995 0.542949 13.8921 0.706561C13.9848 0.870173 14.0443 1.05048 14.0671 1.23713C14.0899 1.42379 14.0756 1.6131 14.025 1.79421C13.9744 1.97532 13.8886 2.14465 13.7723 2.29249C12.9067 3.65249 11.8436 4.88489 10.8828 6.17684C10.6141 6.49856 10.3676 6.8382 10.145 7.19339C9.6684 8.04564 9.6172 8.08229 10.1147 8.93634C10.4605 9.53004 11.0894 10.3463 11.4505 10.86C12.4467 12.2777 13.5269 13.8341 14.6311 15.1656C15.5755 16.3045 14.6253 17.24 14.0911 17.5159C13.7708 17.7032 13.3899 17.7576 13.0299 17.6677C12.67 17.5777 12.3595 17.3505 12.1649 17.0345C11.5187 16.1771 10.9888 15.223 10.3873 14.3332C9.89615 13.6064 9.29414 12.5132 8.77004 11.8045C7.97289 10.7266 7.82145 10.3311 7.4796 10.9385C6.29425 13.045 4.2235 16.5121 3.5756 17.3878Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="uppercase text-sm font-semibold tracking-wider">Close</div>
                </button>

                {/* Desktop Navigation */}
                <div
                  className="hidden space-y-8 text-left md:block w-full"
                  onMouseLeave={() => setActiveMenuSection("adventure-tours")} // Reset về mặc định
                >
                  <ul className="space-y-4">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onMouseEnter={() => setActiveMenuSection(item.id)}
                          onClick={() => handleMenuItemClick(item.id, item.href)}
                          className={`block uppercase duration-300 ease-in-out text-2xl lg:text-3xl font-bold text-yellow-400 hover:text-white transition-colors cursor-pointer ${
                            activeMenuSection === item.id ? "text-white" : ""
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/explorer/tourism-blog"
                        className="duration-300 ease-in-out text-lg text-yellow-200 hover:text-white transition-colors"
                        onClick={onCloseMenu}
                      >
                        Explorer
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faqs"
                        className="duration-300 ease-in-out text-lg text-yellow-200 hover:text-white transition-colors"
                        onClick={onCloseMenu}
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="duration-300 ease-in-out text-lg text-yellow-200 hover:text-white transition-colors"
                        onClick={onCloseMenu}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/booking-policy"
                        className="duration-300 ease-in-out text-lg text-yellow-200 hover:text-white transition-colors"
                        onClick={onCloseMenu}
                      >
                        Booking Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Mobile Navigation */}
                <div
                  className="space-y-8 text-center md:text-left md:hidden"
                  onMouseLeave={() => setActiveMenuSection("adventure-tours")} // Reset về mặc định
                >
                  <ul className="space-y-5">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onMouseEnter={() => setActiveMenuSection(item.id)}
                          onClick={() => handleMenuItemClick(item.id, item.href)}
                          className={`uppercase duration-300 ease-in-out cursor-pointer text-xl font-bold text-white hover:text-yellow-300 transition-colors ${
                            activeMenuSection === item.id ? "text-yellow-300" : ""
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <ul className="space-y-5">
                    <li>
                      <Link
                        href="/explorer/tourism-blog"
                        className="duration-300 ease-in-out text-lg text-white hover:text-yellow-300 transition-colors"
                        onClick={onCloseMenu}
                      >
                        Explorer
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faqs"
                        className="duration-300 ease-in-out text-lg text-white hover:text-yellow-300 transition-colors"
                        onClick={onCloseMenu}
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="duration-300 ease-in-out text-lg text-white hover:text-yellow-300 transition-colors"
                        onClick={onCloseMenu}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/booking-policy"
                        className="duration-300 ease-in-out text-lg text-white hover:text-yellow-300 transition-colors"
                        onClick={onCloseMenu}
                      >
                        Booking Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Language & Social Links */}
                <div className="flex flex-col space-y-4 max-sm:justify-center max-sm:items-center">
                  <div className="flex md:grid md:grid-cols-2 max-md:flex-wrap max-md:items-center gap-x-4 gap-y-2 text-yellow-200 md:gap-x-6 max-md:justify-center">
                    <div className="flex items-center gap-x-3">
                      <Link
                        href="/en"
                        className="text-yellow-200 flex-1 block text-sm hover:text-white transition-colors"
                        onClick={onCloseMenu}
                      >
                        English
                      </Link>
                      <span className="w-px h-4 bg-gray-300 md:inline"></span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Link
                        href="/vi"
                        className="hover:text-white duration-300 ease-in-out flex-1 block text-sm text-yellow-200"
                        onClick={onCloseMenu}
                      >
                        Vietnamese
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 xl:space-x-4 md:space-x-3">
                    <a
                      href="https://www.tripadvisor.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full hover:border-yellow-400 transition-colors bg-green-600 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full hover:border-yellow-400 transition-colors bg-blue-600 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full hover:border-yellow-400 transition-colors bg-red-600 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full hover:border-yellow-400 transition-colors bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Content Detail (2/3 screen) */}
          <MenuContent activeMenuSection={activeMenuSection} onCloseMenu={onCloseMenu} />
        </div>

        {/* Mobile Content Detail */}
        {activeMenuSection && (
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 bg-black/80 backdrop-blur-sm md:hidden">
            <div className="space-y-3 text-center text-white">
              {activeMenuSection === "adventure-tours" && (
                <>
                  <h3 className="text-lg font-bold uppercase">Adventure Tours</h3>
                  <p className="text-sm">Explore thrilling jungle adventures in Phong Nha</p>
                  <button
                    onClick={() => handleMenuItemClick("adventure-tours", "/tour")}
                    className="px-6 py-2 mt-2 text-sm text-white border border-white rounded hover:bg-white hover:text-black transition-all"
                  >
                    Explore Now
                  </button>
                </>
              )}
              {activeMenuSection === "team-building" && (
                <>
                  <h3 className="text-lg font-bold uppercase">Team Building</h3>
                  <p className="text-sm">Build stronger teams through jungle challenges</p>
                  <button
                    onClick={() => handleMenuItemClick("team-building", "/team-building")}
                    className="px-6 py-2 mt-2 text-sm text-white border border-white rounded hover:bg-white hover:text-black transition-all"
                  >
                    Explore Now
                  </button>
                </>
              )}
              {activeMenuSection === "about-us" && (
                <>
                  <h3 className="text-lg font-bold uppercase">About Us</h3>
                  <p className="text-sm">Leading adventure tourism company in Vietnam</p>
                  <button
                    onClick={() => handleMenuItemClick("about-us", "/about-us")}
                    className="px-6 py-2 mt-2 text-sm text-white border border-white rounded hover:bg-white hover:text-black transition-all"
                  >
                    Explore Now
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Black Overlay */}
      <div
        className={`fixed top-0 left-0 z-[1000] w-screen h-screen duration-300 ease-in-out bg-black cursor-pointer transition-opacity ${
          isMenuOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={onCloseMenu}
      />
    </>
  );
};

export default FullScreenMenu;
