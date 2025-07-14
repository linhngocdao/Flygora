"use client";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";

const LanguageSwitcher = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Thông tin ngôn ngữ
  const languages = {
    vi: {
      flag: "/images/homePage/flag-vi.webp",
      code: "VI",
      name: "Tiếng Việt",
    },
    en: {
      flag: "/images/homePage/flag-en.webp",
      code: "EN",
      name: "English",
    },
  };

  // Ngôn ngữ hiện tại và ngôn ngữ khác
  const currentLang = languages[locale as keyof typeof languages];
  const otherLang = locale === "vi" ? languages.en : languages.vi;
  const otherLocale = locale === "vi" ? "en" : "vi";

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative languages" ref={dropdownRef}>
      {/* Current Language Button - IMPROVED UI */}
      <div
        className="items-center hidden space-x-2 cursor-pointer md:flex group"
        onClick={handleToggleDropdown}
      >
        {/* Flag Container with hover effect */}
        <div className="max-w-[27px] w-full border border-primary-100 rounded overflow-hidden transition-all duration-300 group-hover:border-primary-200 group-hover:shadow-lg">
          <Image
            width={30}
            height={30}
            src={currentLang.flag}
            alt={`flag ${locale}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Arrow with smooth rotation */}
        <div className="transition-transform duration-300 group-hover:scale-110">
          <Image
            width={16}
            height={16}
            src="/images/homePage/ic-arrow-down.svg"
            alt="arrow down"
            className={`object-cover w-full h-full transition-all duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            } group-hover:opacity-80`}
          />
        </div>
      </div>

      {/* Dropdown với background đẹp */}
      <div
        className={`absolute top-0 w-[80px] -translate-x-1/2 left-1/2 duration-300 ease-in-out pt-12 z-50 ${
          isDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {/* Dropdown Content với background đẹp */}
        <div className="overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
          <Link
            href={pathname}
            locale={otherLocale}
            className="flex items-center px-4 py-3 space-x-3 text-gray-700 duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-900 transition-all group/item"
            onClick={handleLanguageChange}
          >
            <div className="w-6 h-6 border border-gray-200 rounded overflow-hidden transition-all duration-300 group-hover/item:border-primary-300 group-hover/item:shadow-sm">
              <Image
                width={24}
                height={24}
                src={otherLang.flag}
                alt={`flag ${otherLocale}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover/item:scale-110"
              />
            </div>
            <span className="flex-1 font-medium text-sm transition-colors duration-300">
              {otherLang.code}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Language Switcher - Enhanced */}
      <div className="md:hidden">
        <Link
          href={pathname}
          locale={otherLocale}
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          onClick={handleLanguageChange}
        >
          <div className="w-6 h-6 border border-white/30 rounded overflow-hidden">
            <Image
              width={24}
              height={24}
              src={otherLang.flag}
              alt={`flag ${otherLocale}`}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
