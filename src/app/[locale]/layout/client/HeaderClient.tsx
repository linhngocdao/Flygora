"use client";
import React, { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/Clients/ui/LanguageSwitcher";
import SearchHeader from "@/components/Clients/ui/SearchHeader";
import Link from "next/link";

const HeaderGotravel = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuSection, setActiveMenuSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng menu khi nhấn ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setActiveMenuSection(null);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Ngăn scroll khi menu mở
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveMenuSection(null);
    }
  };

  // Xử lý click vào menu item
  const handleMenuItemClick = (section: string) => {
    setActiveMenuSection(section);
  };

  return (
    <div>
      <header>
        <div
          className={`fixed top-0 left-0 z-[1000] flex items-center w-full duration-700 ease-in-out header-wrapper ${isScrolled ? "h-[50px] lg:h-[60px] bg-[#34430f] shadow-lg backdrop-blur-sm" : "h-[70px] lg:h-24 max-lg:bg-[#34430f]"}`}
        >
          {/* Background overlay khi scroll */}
          {isScrolled && (
            <div className="absolute inset-0 w-full h-full opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-green-900/30 via-primary-900/50 to-green-800/30"></div>
              <div className="absolute inset-0 w-full h-full bg-[url('/bg-texture.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
            </div>
          )}
          <div className="relative z-50 w-full">
            <div className="container">
              <div className="flex items-center justify-between w-full">
                {/* Desktop menu button */}
                <button
                  className="hidden md:block text-[#eef4b7] transition-all duration-300"
                  onClick={toggleMenu}
                  aria-label="Mở menu"
                >
                  <svg
                    width={isScrolled ? "28" : "32"}
                    height={isScrolled ? "28" : "32"}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-v-ecb57835=""
                    className="transition-all duration-300"
                  >
                    <path
                      d="M28.0419 8.52177C26.5422 8.39509 25.0336 8.25351 23.5339 8.26842C21.1148 8.29822 18.7046 8.44726 16.2943 8.54413C11.9649 7.68719 7.54613 8.179 3.1631 8.00016C2.96671 7.9927 2.6632 8.25351 2.56501 8.43235C2.37754 8.79748 2.61857 9.103 2.99349 9.334C4.21645 10.1015 5.69829 10.4368 7.20691 10.5263C10.8401 10.7424 14.4733 11.0702 18.1243 10.8243C18.5796 10.8541 19.0259 10.8839 19.4812 10.9063C22.3467 11.033 25.2211 11.0702 28.0687 10.7647C28.881 10.6753 29.5506 10.3325 29.497 9.66187C29.4434 9.05084 28.8721 8.59629 28.0419 8.52177Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M28.0419 15.5218C26.5422 15.3951 25.0336 15.2535 23.5339 15.2684C21.1148 15.2982 18.7046 15.4473 16.2943 15.5441C11.9649 14.6872 7.54613 15.179 3.1631 15.0002C2.96671 14.9927 2.6632 15.2535 2.56501 15.4324C2.37754 15.7975 2.61857 16.103 2.99349 16.334C4.21645 17.1015 5.69829 17.4368 7.20691 17.5263C10.8401 17.7424 14.4733 18.0702 18.1243 17.8243C18.5796 17.8541 19.0259 17.8839 19.4812 17.9063C22.3467 18.033 25.2211 18.0702 28.0687 17.7647C28.881 17.6753 29.5506 17.3325 29.497 16.6619C29.4434 16.0434 28.8721 15.5888 28.0419 15.5218Z"
                      fill="currentColor"
                      className=""
                    ></path>
                    <path
                      d="M28.0419 22.3478C26.5422 22.2634 25.0336 22.169 23.5339 22.1789C21.1148 22.1988 18.7046 22.2982 16.2943 22.3628C11.9649 21.7915 7.54613 22.1193 3.1631 22.0001C2.96671 21.9951 2.6632 22.169 2.56501 22.2882C2.37754 22.5317 2.61857 22.7353 2.99349 22.8893C4.21645 23.401 5.69829 23.6246 7.20691 23.6842C10.8401 23.8282 14.4733 24.0468 18.1243 23.8829C18.5796 23.9028 19.0259 23.9226 19.4812 23.9375C22.3467 24.022 25.2211 24.0468 28.0687 23.8431C28.881 23.7835 29.5506 23.555 29.497 23.1079C29.4434 22.6956 28.8721 22.3926 28.0419 22.3478Z"
                      fill="currentColor"
                      className=""
                    ></path>
                  </svg>
                </button>

                {/* Mobile menu button */}
                <div className="md:hidden ml-4">
                  <button
                    className={`text-[#eef4b7] transition-all duration-300 ${isScrolled ? "w-7" : "w-8"}`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Đóng menu mobile" : "Mở menu mobile"}
                  >
                    {isMenuOpen ? (
                      // Close icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                      >
                        <path
                          d="M17.9396 2.00303C16.8419 3.03276 15.7273 4.05914 14.7349 5.1836C13.1383 7.00133 11.6363 8.89219 10.0955 10.7482C6.5617 13.3922 3.97048 17.005 0.904753 20.1426C0.767805 20.2835 0.758536 20.6836 0.825735 20.8762C0.971644 21.2599 1.35996 21.2852 1.7825 21.1611C3.1712 20.7659 4.41194 19.889 5.48786 18.8277C8.07952 16.2724 10.7543 13.7918 13.0145 10.914C13.3413 10.5956 13.6621 10.2838 13.9834 9.96047C15.9949 7.91576 17.9459 5.80459 19.6243 3.48395C20.1014 2.82044 20.2947 2.09354 19.7605 1.68459C19.2705 1.31553 18.5505 1.43594 17.9396 2.00303Z"
                          fill="#EEF4B7"
                        />
                        <path
                          d="M19.813 19.4298C18.8422 18.2798 17.8755 17.1129 16.8045 16.063C15.0729 14.3735 13.2632 12.7746 11.4904 11.1388C9.03496 7.47148 5.56268 4.69472 2.58986 1.46899C2.45627 1.32485 2.05723 1.29466 1.86134 1.35168C1.4706 1.47732 1.42499 1.86378 1.52676 2.29223C1.84881 3.69971 2.65952 4.98464 3.66305 6.11463C6.07929 8.83648 8.4165 11.6374 11.1721 14.0452C11.4729 14.3882 11.7674 14.7248 12.0735 15.0626C14.0102 17.1784 16.0163 19.2372 18.246 21.0348C18.8836 21.5459 19.5994 21.777 20.0357 21.2649C20.4352 20.7897 20.3526 20.0643 19.813 19.4298Z"
                          fill="#EEF4B7"
                        />
                      </svg>
                    ) : (
                      // Menu icon
                      <svg
                        data-v-ecb57835=""
                        width={isScrolled ? "28" : "32"}
                        height={isScrolled ? "28" : "32"}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28.0419 8.52177C26.5422 8.39509 25.0336 8.25351 23.5339 8.26842C21.1148 8.29822 18.7046 8.44726 16.2943 8.54413C11.9649 7.68719 7.54613 8.179 3.1631 8.00016C2.96671 7.9927 2.6632 8.25351 2.56501 8.43235C2.37754 8.79748 2.61857 9.103 2.99349 9.334C4.21645 10.1015 5.69829 10.4368 7.20691 10.5263C10.8401 10.7424 14.4733 11.0702 18.1243 10.8243C18.5796 10.8541 19.0259 10.8839 19.4812 10.9063C22.3467 11.033 25.2211 11.0702 28.0687 10.7647C28.881 10.6753 29.5506 10.3325 29.497 9.66187C29.4434 9.05084 28.8721 8.59629 28.0419 8.52177Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M28.0419 15.5218C26.5422 15.3951 25.0336 15.2535 23.5339 15.2684C21.1148 15.2982 18.7046 15.4473 16.2943 15.5441C11.9649 14.6872 7.54613 15.179 3.1631 15.0002C2.96671 14.9927 2.6632 15.2535 2.56501 15.4324C2.37754 15.7975 2.61857 16.103 2.99349 16.334C4.21645 17.1015 5.69829 17.4368 7.20691 17.5263C10.8401 17.7424 14.4733 18.0702 18.1243 17.8243C18.5796 17.8541 19.0259 17.8839 19.4812 17.9063C22.3467 18.033 25.2211 18.0702 28.0687 17.7647C28.881 17.6753 29.5506 17.3325 29.497 16.6619C29.4434 16.0434 28.8721 15.5888 28.0419 15.5218Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M28.0419 22.3478C26.5422 22.2634 25.0336 22.169 23.5339 22.1789C21.1148 22.1988 18.7046 22.2982 16.2943 22.3628C11.9649 21.7915 7.54613 22.1193 3.1631 22.0001C2.96671 21.9951 2.6632 22.169 2.56501 22.2882C2.37754 22.5317 2.61857 22.7353 2.99349 22.8893C4.21645 23.401 5.69829 23.6246 7.20691 23.6842C10.8401 23.8282 14.4733 24.0468 18.1243 23.8829C18.5796 23.9028 19.0259 23.9226 19.4812 23.9375C22.3467 24.022 25.2211 24.0468 28.0687 23.8431C28.881 23.7835 29.5506 23.555 29.497 23.1079C29.4434 22.6956 28.8721 22.3926 28.0419 22.3478Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Logo */}
                <div>
                  <Link href="/vi" aria-current="page">
                    <div className="relative w-full">
                      <div
                        className={`duration-500 ease-in-out xl:max-w-[265px] md:max-w-[186px] max-w-[170px] ${isScrolled ? "scale-100 opacity-0" : "scale-100 opacity-100"}`}
                      >
                        <picture>
                          <source media="(max-width: 767px)" srcSet="/images/homePage/logo.webp" />
                          <source media="(max-width: 1439px)" srcSet="/images/homePage/logo.webp" />
                          <img
                            className="xl:max-w-[180px] md:max-w-[160px] max-w-[180px]"
                            src="/images/homePage/logo.webp"
                            alt="logo"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div
                        className={`absolute flex items-center justify-center w-full mx-auto duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${isScrolled ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                      >
                        <picture>
                          <source
                            media="(max-width: 767px)"
                            srcSet="/images/homePage/logo-mobile.webp"
                          />
                          <source
                            media="(max-width: 1439px)"
                            srcSet="/images/homePage/logo-mobile.webp"
                          />
                          <img
                            className="xl:max-w-[50px] md:max-w-[60px] max-w-[40px]"
                            src="/images/homePage/logo-mobile.webp"
                            alt="logo mobile"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center justify-between space-x-[22px]">
                  {/* search component */}
                  <SearchHeader isScrolled={isScrolled} />

                  {/* Language switcher */}
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Menu Overlay */}
        <div
          className={`fixed top-[70px] md:top-0 z-50 w-screen h-screen overflow-hidden duration-500 ease-in-out bg-white transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${isScrolled ? "top-[60px] h-[calc(100vh-60px)]" : "top-[70px] h-[calc(100vh-70px)]"}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <picture>
              <source media="(max-width: 767px)" srcSet="/images/homePage/bg-overlay-main.webp" />
              <source media="(max-width: 1439px)" srcSet="/images/homePage/bg-overlay-main.webp" />
              <img
                className="object-cover w-full h-full"
                src="/images/homePage/bg-overlay-main.webp"
                alt="background menu"
                loading="lazy"
              />
            </picture>
          </div>

          {/* Left Panel - Menu Content */}
          <div className="absolute inset-0 z-10 w-full h-full xl:max-w-[453px] lg:max-w-[325px] md:max-w-[260px] duration-500 ease-in-out md:delay-500">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 hidden w-full h-full md:block">
                <img
                  className="object-cover w-full h-full"
                  src="/images/homePage/bg-overlay-sub.webp"
                  alt="background menu"
                  loading="lazy"
                />
              </div>
              <div className="relative xl:py-[68px] md:py-[48px] py-[34px] xl:px-[120px] lg:pr-[20px] lg:pl-[80px] px-8 md:px-[32px] h-full flex flex-col justify-between xl:space-y-14 md:space-y-10 space-y-7 overflow-y-auto scroll-custom">
                {/* Close Button (Desktop) */}
                <button
                  aria-label="Đóng menu"
                  className="items-center hidden space-x-2 duration-300 ease-in-out md:flex text-accent-500 lg:hover:text-primary-100"
                  onClick={toggleMenu}
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
                  <div className="uppercase title-2">Close</div>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden space-y-8 text-center xl:space-y-16 md:space-y-11 md:text-left md:block w-full xl:max-w-[213px]">
                  <ul className="space-y-4">
                    <li>
                      <button
                        onClick={() => handleMenuItemClick("adventure-tours")}
                        className={`block uppercase duration-300 ease-in-out headline-3 text-primary lg:hover:text-primary-100 ${
                          activeMenuSection === "adventure-tours" ? "text-primary-100" : ""
                        }`}
                      >
                        Adventure Tours
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleMenuItemClick("team-building")}
                        className={`block uppercase duration-300 ease-in-out headline-3 text-primary lg:hover:text-primary-100 ${
                          activeMenuSection === "team-building" ? "text-primary-100" : ""
                        }`}
                      >
                        Team Building
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleMenuItemClick("about-us")}
                        className={`block uppercase duration-300 ease-in-out headline-3 text-primary lg:hover:text-primary-100 ${
                          activeMenuSection === "about-us" ? "text-primary-100" : ""
                        }`}
                      >
                        About Us
                      </button>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/explorer/tourism-blog"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Explorer
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faqs"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/booking-policy"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Booking Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-8 text-center md:text-left md:hidden">
                  <ul className="space-y-5">
                    <li>
                      <button
                        onClick={() => handleMenuItemClick("adventure-tours")}
                        className={`uppercase duration-300 ease-in-out cursor-pointer headline-3 text-primary lg:hover:text-primary-100 ${
                          activeMenuSection === "adventure-tours" ? "text-primary-100" : ""
                        }`}
                      >
                        Adventure Tours
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleMenuItemClick("team-building")}
                        className={`uppercase duration-300 ease-in-out cursor-pointer headline-3 text-primary lg:hover:text-primary-100 ${
                          activeMenuSection === "team-building" ? "text-primary-100" : ""
                        }`}
                      >
                        Team Building
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleMenuItemClick("about-us")}
                        className={`uppercase duration-300 ease-in-out cursor-pointer headline-3 text-primary lg:hover:text-primary-100 ${
                          activeMenuSection === "about-us" ? "text-primary-100" : ""
                        }`}
                      >
                        About Us
                      </button>
                    </li>
                  </ul>
                  <ul className="space-y-5">
                    <li>
                      <Link
                        href="/explorer/tourism-blog"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Explorer
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faqs"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/booking-policy"
                        className="duration-300 ease-in-out title-1 text-primary lg:hover:text-primary-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Booking Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Language & Social Links */}
                <div className="flex flex-col space-y-4 max-sm:justify-center max-sm:items-center">
                  <div className="flex md:grid md:grid-cols-2 max-md:flex-wrap max-md:items-center gap-x-4 gap-y-2 text-primary md:gap-x-6 max-md:justify-center">
                    <div className="flex items-center gap-x-3">
                      <Link
                        href="/en"
                        className="text-primary-50 flex-1 block label-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        English
                      </Link>
                      <span className="w-px h-4 bg-gray-300 md:inline"></span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Link
                        href="/vi"
                        className="lg:hover:text-primary-50 duration-300 ease-in-out flex-1 block label-1"
                        onClick={() => setIsMenuOpen(false)}
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
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <img
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-tripadvisor.png"
                        alt="tripadvisor"
                        loading="lazy"
                      />
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <img
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-facebook.png"
                        alt="facebook"
                        loading="lazy"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <img
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-youtube.png"
                        alt="youtube"
                        loading="lazy"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <img
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-instagram.png"
                        alt="instagram"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Content Detail */}
          <div
            className={`absolute z-10 top-0 right-0 h-full ml-auto max-w-[calc(100vw-260px)] lg:max-w-[calc(100vw-325px)] xl:max-w-[calc(100vw-453px)] w-full duration-300 ease-in-out md:block hidden transform transition-transform ${
              activeMenuSection
                ? "opacity-100 translate-x-0 visible"
                : "opacity-0 translate-x-20 invisible"
            }`}
          >
            <div className="xl:px-[120px] md:px-[48px] px-[60px] xl:pt-[68px] md:pt-[48px] pt-[34px] pb-[45px] flex items-center h-full overflow-y-auto scroll-custom">
              <div className="w-full space-y-5 xl:space-y-8 md:space-y-6">
                {/* Dynamic Content Based on Active Section */}
                {activeMenuSection === "adventure-tours" && (
                  <>
                    <div className="space-y-2 text-white xl:space-y-4 md:space-y-3 max-sm:text-center">
                      <div className="uppercase whitespace-pre-line headline-1">
                        ADVENTURE TOURS
                      </div>
                      <div className="body-1">
                        Jungle Boss builds teamwork through adventure in Phong Nha – Ke Bang
                        National Park. Challenge your team with games in the jungle.
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg md:aspect-w-11 md:aspect-h-5 aspect-w-3 aspect-h-2">
                      <img
                        src="/images/homePage/section-3-exclusive.webp"
                        alt="ADVENTURE TOURS"
                        className="object-cover w-full h-full duration-300 ease-in-out lg:hover:scale-105"
                      />
                    </div>
                    <div>
                      <Link
                        href="/tour"
                        className="max-sm:flex max-sm:items-center max-sm:justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="px-6 py-3 text-white border border-white rounded-lg bg-transparent hover:bg-white hover:text-primary transition-all duration-300">
                          <span className="font-medium">Explore Now</span>
                        </button>
                      </Link>
                    </div>
                  </>
                )}

                {activeMenuSection === "team-building" && (
                  <>
                    <div className="space-y-2 text-white xl:space-y-4 md:space-y-3 max-sm:text-center">
                      <div className="uppercase whitespace-pre-line headline-1">
                        Unique & Different Team Building
                      </div>
                      <div className="body-1">
                        Jungle Boss builds teamwork through adventure in Phong Nha – Ke Bang
                        National Park. Challenge your team with games in the jungle.
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg md:aspect-w-11 md:aspect-h-5 aspect-w-3 aspect-h-2">
                      <img
                        src="/images/homePage/section-3-safety.webp"
                        alt="unique different team building"
                        className="object-cover w-full h-full duration-300 ease-in-out lg:hover:scale-105"
                      />
                    </div>
                    <div>
                      <Link
                        href="/team-building"
                        className="max-sm:flex max-sm:items-center max-sm:justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="px-6 py-3 text-white border border-white rounded-lg bg-transparent hover:bg-white hover:text-primary transition-all duration-300">
                          <span className="font-medium">Explore Now</span>
                        </button>
                      </Link>
                    </div>
                  </>
                )}

                {activeMenuSection === "about-us" && (
                  <>
                    <div className="space-y-2 text-white xl:space-y-4 md:space-y-3 max-sm:text-center">
                      <div className="uppercase whitespace-pre-line headline-1">
                        Leading & Certificated Adventure Tourism Company in Vietnam
                      </div>
                      <div className="body-1">
                        Jungle Boss Exclusive guides to Vietnam&apos;s Phong Nha – Ke Bang Park.
                        Discovering awe-inspiring caves, jungles & sinkholes with few access.
                        Sustainable adventures!
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg md:aspect-w-11 md:aspect-h-5 aspect-w-3 aspect-h-2">
                      <img
                        src="/images/homePage/section-2-welcome.webp"
                        alt="leading certificated adventure tourism company in vietnam"
                        className="object-cover w-full h-full duration-300 ease-in-out lg:hover:scale-105"
                      />
                    </div>
                    <div>
                      <Link
                        href="/about-us"
                        className="max-sm:flex max-sm:items-center max-sm:justify-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="px-6 py-3 text-white border border-white rounded-lg bg-transparent hover:bg-white hover:text-primary transition-all duration-300">
                          <span className="font-medium">Explore Now</span>
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Black Overlay */}
        <div
          className={`fixed top-0 left-0 z-[999] w-screen h-screen duration-300 ease-in-out bg-black cursor-pointer transition-opacity ${
            isMenuOpen ? "opacity-50 visible" : "opacity-0 invisible"
          }`}
          onClick={toggleMenu}
        ></div>
      </header>
    </div>
  );
};

export default HeaderGotravel;
