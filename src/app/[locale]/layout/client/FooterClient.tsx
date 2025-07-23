"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";

// Types
interface SocialLink {
  name: string;
  color: string;
  icon: any;
  href: string;
}

interface CompanyInfo {
  name: string;
  taxId: string;
  taxIssuer: string;
  taxDate: string;
  license: string;
  licenseIssuer: string;
  licenseDate: string;
  address: string;
  email: string;
  hotlines: string[];
}

interface CertificationItem {
  name: string;
  logo: string;
}

interface PaymentMethod {
  name: string;
  logo: string;
}

const FooterGotravel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Memoized data để tránh re-render không cần thiết
  const footerData = useMemo(
    () => ({
      adventureTours: [
        "Do Quyen Waterfall Zipline Experience",
        "Tra Ang Excursion 1D",
        "Phong Huong Adventure 1D",
        "Elephant Cave & Ma Da Valley Jungle Trek 1D",
        "Phong Huong Excursion 2D1N",
        "Phong Huong Adventure 2D1N",
        "Ma Da Valley Jungle Camping 2D1N",
        "Hang Pygmy Exploration 2D1N",
        "Phi Lieng Exploration 2D1N",
        "Do Quyen Waterfall Top Adventure Conquering 2D1N",
        "Hung Thoong Exploration 3 days 2 nights",
        "Tiger Cave Series Adventure 3D2N",
        "Kong Collapse Top Adventure 5D4N",
      ],
      usefulInfo: [
        "FAQs",
        "Safety gears and camping equipment",
        "Environment Protection & Survival Rules",
        "Safety & Rescue Training",
      ],
      bookingPolicy: ["Cancellation Policy", "Alcohol & Drugs Policy", "Privacy & Cookie"],
      explorer: ["Tourism Blog", "News"],
      aboutJungleBoss: [
        "Introduce",
        "Our Team",
        "Human of Jungle Boss",
        "Life At Jungle Boss",
        "Our Certificates",
        "Partnership",
        "Contact Us",
      ],
    }),
    []
  );

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        name: "TripAdvisor",
        color: "bg-green-500",
        href: "https://tripadvisor.com/junglebosstours",
        icon: (
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
          </svg>
        ),
      },
      {
        name: "Facebook",
        color: "bg-blue-600",
        href: "https://facebook.com/junglebosstours",
        icon: (
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        ),
      },
      {
        name: "YouTube",
        color: "bg-red-600",
        href: "https://youtube.com/@junglebosstours",
        icon: (
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
      },
      {
        name: "Instagram",
        color: "bg-pink-500",
        href: "https://instagram.com/junglebosstours",
        icon: (
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
      },
    ],
    []
  );

  const companyInfo: CompanyInfo = useMemo(
    () => ({
      name: "JUNGLE BOSS COMPANY LIMITED",
      taxId: "3101003517",
      taxIssuer: "Department of Planning and Investment of Quang Binh Province",
      taxDate: "November 27th, 2015",
      license: "44-011/2016/TCDL-GPLHQT",
      licenseIssuer: "Ministry of Culture, Sports and Tourism",
      licenseDate: "January 29th, 2016",
      address: "Phong Nha Town, Bo Trach District, Quang Binh Province, Vietnam",
      email: "contact@junglebosstours.com",
      hotlines: ["(+84) 917 800 805", "(+84) 859 100 222"],
    }),
    []
  );

  const certifications: CertificationItem[] = useMemo(
    () => [
      {
        name: "Black Diamond",
        logo: "https://junglebosstours.com/images/footer/black-diamond.png",
      },
      { name: "CTD", logo: "https://junglebosstours.com/images/footer/ct.png" },
      { name: "Cmi", logo: "https://junglebosstours.com/images/footer/cmi.png" },
      { name: "National", logo: "https://junglebosstours.com/images/footer/national.png" },
      { name: "VSLC", logo: "https://junglebosstours.com/images/footer/vslc.png" },
      { name: "Simond", logo: "https://junglebosstours.com/images/footer/simond.png" },
      { name: "Italy", logo: "https://junglebosstours.com/images/footer/italy.png" },
    ],
    []
  );

  const paymentMethods: PaymentMethod[] = useMemo(
    () => [
      { name: "Visa", logo: "https://junglebosstours.com/images/footer/visa.png" },
      { name: "MasterCard", logo: "https://junglebosstours.com/images/footer/master-card.png" },
      { name: "JCB", logo: "https://junglebosstours.com/images/footer/jcb.png" },
      { name: "Verified by Visa", logo: "https://junglebosstours.com/images/footer/verified.png" },
      { name: "9Pay", logo: "https://junglebosstours.com/images/footer/pay.png" },
    ],
    []
  );

  // Memoized toggle function
  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <footer
      className="relative py-8 xl:py-16 md:py-12 text-white"
      style={{
        backgroundImage: "url(/images/footer/background-footer.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay để làm tối background */}
      <div className="absolute inset-0" />

      <div className="container relative z-10">
        <div className="pb-6 xl:pb-12 md:pb-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Adventure Tours */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-white">Adventure Tours</h3>
              <nav>
                <ul className="space-y-2">
                  {footerData.adventureTours.map((tour, index) => (
                    <li key={index}>
                      <a
                        href={`/tours/${tour.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm leading-relaxed block hover:translate-x-1 transform transition-transform"
                      >
                        {tour}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>

            {/* Useful Information & Booking Policy */}
            <section>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-white">Useful Information</h3>
                <nav>
                  <ul className="space-y-2">
                    {footerData.usefulInfo.map((info, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm leading-relaxed block hover:translate-x-1 transform transition-transform"
                        >
                          {info}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Booking Policy</h3>
                <nav>
                  <ul className="space-y-2">
                    {footerData.bookingPolicy.map((policy, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm leading-relaxed block hover:translate-x-1 transform transition-transform"
                        >
                          {policy}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </section>

            {/* Explorer & Social Links */}
            <section>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-white">Explorer</h3>
                <nav>
                  <ul className="space-y-2">
                    {footerData.explorer.map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm leading-relaxed block hover:translate-x-1 transform"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Follow Us On</h3>
                <div className="flex space-x-3" role="list">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent`}
                      title={`Follow us on ${social.name}`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* About Jungle Boss */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-white">About Jungle Boss</h3>
              <nav>
                <ul className="space-y-2">
                  {footerData.aboutJungleBoss.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm leading-relaxed block hover:translate-x-1 transform transition-transform"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          </div>
        </div>

        {/* Collapsible Company Information Section */}
        <div className="pt-6 xl:pt-8 md:pt-6">
          <div className="border-t border-gray-600 pt-6">
            <div className="flex justify-between items-start">
              {/* Company Information */}
              <div className="flex-1">
                <div
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"}`}
                >
                  <div className="pb-4">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6">{companyInfo.name}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Company Details */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold">Tax Identification Number:</span>{" "}
                            {companyInfo.taxId} issued by the {companyInfo.taxIssuer} on{" "}
                            {companyInfo.taxDate}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold">International Travel License:</span>{" "}
                            {companyInfo.license} issued by the {companyInfo.licenseIssuer} on{" "}
                            {companyInfo.licenseDate}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold">Address:</span> {companyInfo.address}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <a
                            href={`mailto:${companyInfo.email}`}
                            className="text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                          >
                            {companyInfo.email}
                          </a>
                        </div>

                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <div className="text-gray-300 text-sm">
                            {companyInfo.hotlines.map((hotline, index) => (
                              <a
                                key={index}
                                href={`tel:${hotline.replace(/[^\d+]/g, "")}`}
                                className="block hover:text-yellow-400 transition-colors"
                              >
                                {hotline}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Certifications and Payment */}
                      <div className="space-y-6">
                        {/* Certifications */}
                        <div>
                          <div className="grid grid-cols-4 gap-3">
                            {certifications.map((cert, index) => (
                              <div
                                key={index}
                                className="bg-white/10 rounded-lg p-3 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
                              >
                                <Image
                                  src={cert.logo}
                                  alt={cert.name}
                                  width={40}
                                  height={40}
                                  className="max-w-full max-h-8 object-contain filter brightness-0 invert"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div>
                          <div className="grid grid-cols-5 gap-2">
                            {paymentMethods.map((payment, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-2 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                              >
                                <Image
                                  src={payment.logo}
                                  alt={payment.name}
                                  width={30}
                                  height={30}
                                  className="max-w-full max-h-6 object-contain"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Photo Credits */}
                        <div>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            Photos by Jungle Boss team, Justin Del Boulter, Nguyễn Việt Hùng, Linh
                            Lê, Chuong Acmn, Lai Hồng Thái, John Le Bin, Ngô Đại Dương, Mai Hoàng
                            Long, Ngô Quang Minh, Đức Thành, Nguyễn Hải, Cao Kỳ Nhân, Trần Linh,
                            Hoàng Tạo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapse Button */}
              <button
                onClick={handleToggleCollapse}
                className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-expanded={!isCollapsed}
                aria-controls="company-info"
              >
                <span>{isCollapsed ? "Expand Footer" : "Collapse Footer"}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-500 ease-in-out ${isCollapsed ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm mt-6">
            <p>&copy; 2025 {companyInfo.name}. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGotravel;
