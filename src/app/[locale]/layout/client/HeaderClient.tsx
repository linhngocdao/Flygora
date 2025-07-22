"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/Clients/ui/LanguageSwitcher";
import SearchHeader from "@/components/Clients/ui/SearchHeader";
import FullScreenMenu from "./FullScreenMenu";

const HeaderGotravel: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng menu khi nhấn ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Toggle menu
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Đóng menu
  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header>
        <div
          className={`fixed top-0 left-0 z-[1000] flex items-center w-full duration-700 ease-in-out header-wrapper ${
            isScrolled
              ? "h-[50px] lg:h-[60px] bg-[#34430f] shadow-lg backdrop-blur-sm"
              : "h-[70px] lg:h-24 max-lg:bg-[#34430f]"
          }`}
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
                  className="cursor-pointer hidden md:block text-[#eef4b7] transition-all duration-300 hover:text-white"
                  onClick={toggleMenu}
                  aria-label="Mở menu"
                >
                  <svg
                    width={isScrolled ? "28" : "32"}
                    height={isScrolled ? "28" : "32"}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-all duration-300"
                  >
                    <path
                      d="M28.0419 8.52177C26.5422 8.39509 25.0336 8.25351 23.5339 8.26842C21.1148 8.29822 18.7046 8.44726 16.2943 8.54413C11.9649 7.68719 7.54613 8.179 3.1631 8.00016C2.96671 7.9927 2.6632 8.25351 2.56501 8.43235C2.37754 8.79748 2.61857 9.103 2.99349 9.334C4.21645 10.1015 5.69829 10.4368 7.20691 10.5263C10.8401 10.7424 14.4733 11.0702 18.1243 10.8243C18.5796 10.8541 19.0259 10.8839 19.4812 10.9063C22.3467 11.033 25.2211 11.0702 28.0687 10.7647C28.881 10.6753 29.5506 10.3325 29.497 9.66187C29.4434 9.05084 28.8721 8.59629 28.0419 8.52177Z"
                      fill="currentColor"
                    />
                    <path
                      d="M28.0419 15.5218C26.5422 15.3951 25.0336 15.2535 23.5339 15.2684C21.1148 15.2982 18.7046 15.4473 16.2943 15.5441C11.9649 14.6872 7.54613 15.179 3.1631 15.0002C2.96671 14.9927 2.6632 15.2535 2.56501 15.4324C2.37754 15.7975 2.61857 16.103 2.99349 16.334C4.21645 17.1015 5.69829 17.4368 7.20691 17.5263C10.8401 17.7424 14.4733 18.0702 18.1243 17.8243C18.5796 17.8541 19.0259 17.8839 19.4812 17.9063C22.3467 18.033 25.2211 18.0702 28.0687 17.7647C28.881 17.6753 29.5506 17.3325 29.497 16.6619C29.4434 16.0434 28.8721 15.5888 28.0419 15.5218Z"
                      fill="currentColor"
                    />
                    <path
                      d="M28.0419 22.3478C26.5422 22.2634 25.0336 22.169 23.5339 22.1789C21.1148 22.1988 18.7046 22.2982 16.2943 22.3628C11.9649 21.7915 7.54613 22.1193 3.1631 22.0001C2.96671 21.9951 2.6632 22.169 2.56501 22.2882C2.37754 22.5317 2.61857 22.7353 2.99349 22.8893C4.21645 23.401 5.69829 23.6246 7.20691 23.6842C10.8401 23.8282 14.4733 24.0468 18.1243 23.8829C18.5796 23.9028 19.0259 23.9226 19.4812 23.9375C22.3467 24.022 25.2211 24.0468 28.0687 23.8431C28.881 23.7835 29.5506 23.555 29.497 23.1079C29.4434 22.6956 28.8721 22.3926 28.0419 22.3478Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {/* Mobile menu button */}
                <div className="md:hidden ml-4">
                  <button
                    className={`text-[#eef4b7] transition-all duration-300 hover:text-white ${
                      isScrolled ? "w-7" : "w-8"
                    }`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Đóng menu mobile" : "Mở menu mobile"}
                  >
                    {isMenuOpen ? (
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
                      <svg
                        width={isScrolled ? "28" : "32"}
                        height={isScrolled ? "28" : "32"}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28.0419 8.52177C26.5422 8.39509 25.0336 8.25351 23.5339 8.26842C21.1148 8.29822 18.7046 8.44726 16.2943 8.54413C11.9649 7.68719 7.54613 8.179 3.1631 8.00016C2.96671 7.9927 2.6632 8.25351 2.56501 8.43235C2.37754 8.79748 2.61857 9.103 2.99349 9.334C4.21645 10.1015 5.69829 10.4368 7.20691 10.5263C10.8401 10.7424 14.4733 11.0702 18.1243 10.8243C18.5796 10.8541 19.0259 10.8839 19.4812 10.9063C22.3467 11.033 25.2211 11.0702 28.0687 10.7647C28.881 10.6753 29.5506 10.3325 29.497 9.66187C29.4434 9.05084 28.8721 8.59629 28.0419 8.52177Z"
                          fill="currentColor"
                        />
                        <path
                          d="M28.0419 15.5218C26.5422 15.3951 25.0336 15.2535 23.5339 15.2684C21.1148 15.2982 18.7046 15.4473 16.2943 15.5441C11.9649 14.6872 7.54613 15.179 3.1631 15.0002C2.96671 14.9927 2.6632 15.2535 2.56501 15.4324C2.37754 15.7975 2.61857 16.103 2.99349 16.334C4.21645 17.1015 5.69829 17.4368 7.20691 17.5263C10.8401 17.7424 14.4733 18.0702 18.1243 17.8243C18.5796 17.8541 19.0259 17.8839 19.4812 17.9063C22.3467 18.033 25.2211 18.0702 28.0687 17.7647C28.881 17.6753 29.5506 17.3325 29.497 16.6619C29.4434 16.0434 28.8721 15.5888 28.0419 15.5218Z"
                          fill="currentColor"
                        />
                        <path
                          d="M28.0419 22.3478C26.5422 22.2634 25.0336 22.169 23.5339 22.1789C21.1148 22.1988 18.7046 22.2982 16.2943 22.3628C11.9649 21.7915 7.54613 22.1193 3.1631 22.0001C2.96671 21.9951 2.6632 22.169 2.56501 22.2882C2.37754 22.5317 2.61857 22.7353 2.99349 22.8893C4.21645 23.401 5.69829 23.6246 7.20691 23.6842C10.8401 23.8282 14.4733 24.0468 18.1243 23.8829C18.5796 23.9028 19.0259 23.9226 19.4812 23.9375C22.3467 24.022 25.2211 24.0468 28.0687 23.8431C28.881 23.7835 29.5506 23.555 29.497 23.1079C29.4434 22.6956 28.8721 22.3926 28.0419 22.3478Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Logo */}
                <div>
                  <Link href="/vi" aria-current="page">
                    <div className="relative w-full">
                      <div
                        className={`duration-500 ease-in-out xl:max-w-[265px] md:max-w-[186px] max-w-[170px] ${
                          isScrolled ? "scale-100 opacity-0" : "scale-100 opacity-100"
                        }`}
                      >
                        <Image
                          className="xl:max-w-[180px] md:max-w-[160px] max-w-[180px]"
                          src="/images/homePage/logo.webp"
                          alt="Jungle Boss Logo"
                          width={180}
                          height={60}
                          priority
                          loading="eager"
                        />
                      </div>
                      <div
                        className={`absolute flex items-center justify-center w-full mx-auto duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                          isScrolled ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      >
                        <Image
                          className="xl:max-w-[50px] md:max-w-[60px] max-w-[40px]"
                          src="/images/homePage/logo-mobile.webp"
                          alt="Jungle Boss Mobile Logo"
                          width={50}
                          height={50}
                          priority
                        />
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center justify-between space-x-[22px]">
                  <SearchHeader isScrolled={isScrolled} />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Component */}
      <FullScreenMenu isMenuOpen={isMenuOpen} onCloseMenu={closeMenu} />
    </div>
  );
};

export default HeaderGotravel;
