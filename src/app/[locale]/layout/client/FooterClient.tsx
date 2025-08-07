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
  address: string;
  email: string;
  hotlines: string[];
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
      adventureTours: ["Hanoi Traditional foods", "Team building"],
      usefulInfo: ["FAQs", "Allergic"],
      bookingPolicy: ["Cancellation Policy", "Alcohol & Drugs Policy", "Privacy & Cookie"],
      explorer: ["Tourism Blog", "News"],
      aboutJungleBoss: ["Introduce", "Our Team", "Contact Us"],
    }),
    []
  );

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        name: "Facebook",
        color: "bg-blue-600",
        href: "https://www.facebook.com/flygora",
        icon: "/images/homePage/icon-facebook.png",
      },
      {
        name: "Instagram",
        color: "bg-pink-500",
        href: "https://www.instagram.com/flygora",
        icon: "/images/homePage/icon-instagram.png",
      },
    ],
    []
  );

  const companyInfo: CompanyInfo = useMemo(
    () => ({
      name: "FLYGORA TRAVEL COMPANY LIMITED",
      taxId: "0110183388",
      taxIssuer: "issued by the Department of Planning and Investment of HaNoi on",
      taxDate: "16/11/2022.",
      address: "Tran Duy Hung, Yen Hoa, HaNoi",
      email: "Advisor@flygora.com",
      hotlines: ["(+84) 793 946 789", "(+84) 397 897 222"],
    }),
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
              <h3 className="text-lg font-semibold mb-4 text-white">Local Foodtours</h3>
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
                      className={`w-10 h-10  rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent`}
                      title={`Follow us on ${social.name}`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={54}
                        height={54}
                        className="w-10 h-10 text-white"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* About FLYGORA TRAVEL */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-white">About Flygora</h3>
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
                            “All payments are secured by Stripe”
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
            <p>&copy; 2025 Flygora Travel Limited Company. All rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGotravel;
