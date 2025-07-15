// import Image from "next/image";
// import Link from "next/link";

const FooterGotravel = () => {
  return (
    <div>
      {/* <footer className="relative py-8 xl:py-16 md:py-12 bg-[url('/images/homePage/background-footer.webp')] lg:bg-cover bg-center">
        <div className="container">
          <div className="pb-6 border-b xl:pb-12 md:pb-8 border-primary">
            <div className="md:flex hidden xl:space-x-[77px] lg:space-x-12 md:space-x-8">
              <div className="w-[311px]">
                <div className="mb-2 font-medium text-white title-1 xl:mb-4 md:mb-3">
                  Adventure Tours
                </div>
                <ul className="flex flex-col space-y-2">
                  <li>
                    <Link
                      href="/tour/do-quyen-waterfall-zipline"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Do Quyen Waterfall Zipline Experience
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/tra-ang-excursion-1d"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Tra Ang Excursion 1D
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/phong-huong-adventure-1d"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Phong Huong Adventure 1D
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/elephant-cave-ma-da-valley-jungle-trek-1d"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Elephant Cave &amp; Ma Da Valley Jungle Trek 1D
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/phong-huong-excursion-2-days-1-night"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Phong Huong Excursion 2D1N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/phong-huong-excursion-2d1n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Phong Huong Adventure 2D1N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/ma-da-valley-jungle-camping-2d1n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Ma Da Valley Jungle Camping 2D1N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/hang-pygmy-exploration-2d1n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Hang Pygmy Exploration 2D1N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/phi-lieng-exploration-2d1n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Phi Lieng Exploration 2D1N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/hung-thoong-exploration-3-days-2-nights"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Hung Thoong Exploration 3 days 2 nights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/tiger-cave-series-adventure-3d2n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Tiger Cave Series Adventure 3D2N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/do-quyen-waterfall-top-adventure-conquering-2d1n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Do Quyen Waterfall Top Adventure Conquering 2D1N
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tour/kong-collapse-top-adventure-5d4n"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Kong Collapse Top Adventure 5D4N
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-[268px]">
                <div className="mb-4 xl:mb-8 md:mb-6">
                  <div className="mb-2 font-medium text-white title-1 xl:mb-4 md:mb-3">
                    Useful Information
                  </div>
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <Link
                        href="/faqs"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/explorer/tourism-blog/safety-gears-and-camping-equipment"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Safety gears and camping equipment
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/explorer/tourism-blog/environment-protection-survival-rules"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Environment Protection &amp; Survival Rules
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/explorer/tourism-blog/safety-rescue-training"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Safety &amp; Rescue Training
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="mb-2 font-medium text-white title-1 xl:mb-4 md:mb-3">
                    Booking Policy
                  </div>
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <Link
                        href="/policy/cancellation-policy"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Cancellation Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/alcohol-drugs-policy"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Alcohol &amp; Drugs Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/privacy-cookie"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Privacy &amp; Cookie
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-[208px]">
                <div className="mb-4 xl:mb-8 md:mb-6">
                  <div className="mb-2 font-medium text-white title-1 xl:mb-4 md:mb-3">
                    Explorer
                  </div>
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <Link
                        href="/explorer/tourism-blog"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        Tourism Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/explorer/news"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                      >
                        News
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="mb-2 font-medium text-white title-1 xl:mb-4 md:mb-3">
                    Follow Us On
                  </div>
                  <div className="flex items-center space-x-4 xl:space-x-4 md:space-x-3">
                    <Link
                      href="https://www.tripadvisor.com/Attraction_Review-g4014591-d8403784-Reviews-Jungle_Boss_Tours-Phong_Nha_Ke_Bang_National_Park_Quang_Binh_Province.html"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <Image
                        fill
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-tripadvisor.png"
                        alt="tripadvisor"
                        loading="lazy"
                      />
                    </Link>
                    <Link
                      href="https://www.facebook.com/junglebosstoursquangbinh"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <Image
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-facebook.png"
                        alt="facebook"
                        loading="lazy"
                      />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@jungleboss73"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <Image
                        fill
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-youtube.png"
                        alt="youtube"
                        loading="lazy"
                      />
                    </Link>
                    <a
                      href="https://www.instagram.com/junglebosstours/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-10 h-10 duration-300 ease-in-out border border-transparent rounded-full lg:hover:border-accent-500"
                    >
                      <Image
                        fill
                        className="object-cover w-full h-full"
                        src="/images/homePage/icon-instagram.png"
                        alt="instagram"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:w-[182px] w-[150px] flex-shrink-0">
                <div className="mb-2 font-medium text-white title-1 xl:mb-4 md:mb-3">
                  About Jungle Boss
                </div>
                <ul className="flex flex-col space-y-2">
                  <li>
                    <Link
                      href="/about-us#introduce"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Introduce
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us#our-team"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us#human-of-jungle-boss"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Human of Jungle Boss
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us#life-at-jungle-boss"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Life At Jungle Boss
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us#our-certificates"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Our Certificates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us#partnership"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Partnership
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us#contact-us"
                      className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:duration-150 after:bg-primary-100 inline-block"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:hidden">
              <div>
                <div className="mb-4 xl:mb-[38px] md:mb-5">
                  <div className="mb-4 md:pt-4 collapsible last:mb-0">
                    <div className="relative transition duration-300 ease-out outline-none cursor-pointer select-none">
                      <div className="flex space-x-4 font-bold title-3">
                        <span className="flex-1 text-white">Adventure Tours</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="rotate-0 duration-150"
                        >
                          <g clip-path="url(#clip0_1363_19069)">
                            <path
                              d="M8.56912 12.1704L15.7619 4.97526C16.0768 4.65954 16.0768 4.14803 15.7619 3.83151C15.4469 3.5158 14.9354 3.5158 14.6205 3.83151L7.99848 10.4559L1.37645 3.83231C1.06153 3.51659 0.550022 3.51659 0.234304 3.83231C-0.080616 4.14803 -0.080616 4.66034 0.234304 4.97606L7.42704 12.1712C7.7387 12.4821 8.25826 12.4821 8.56912 12.1704Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1363_19069">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="flex flex-col pl-4 space-y-4 whitespace-pre-line collapsible-content"
                      style={{ maxHeight: "0px" }}
                    >
                      <Link
                        href="/tour/do-quyen-waterfall-zipline"
                        className="inline-block text-white body-1"
                      >
                        Do Quyen Waterfall Zipline Experience
                      </Link>
                      <Link
                        href="/tour/tra-ang-excursion-1d"
                        className="inline-block text-white body-1"
                      >
                        Tra Ang Excursion 1D
                      </Link>
                      <Link
                        href="/tour/phong-huong-adventure-1d"
                        className="inline-block text-white body-1"
                      >
                        Phong Huong Adventure 1D
                      </Link>
                      <Link
                        href="/tour/elephant-cave-ma-da-valley-jungle-trek-1d"
                        className="inline-block text-white body-1"
                      >
                        Elephant Cave &amp; Ma Da Valley Jungle Trek 1D
                      </Link>
                      <Link
                        href="/tour/phong-huong-excursion-2-days-1-night"
                        className="inline-block text-white body-1"
                      >
                        Phong Huong Excursion 2D1N
                      </Link>
                      <Link
                        href="/tour/phong-huong-excursion-2d1n"
                        className="inline-block text-white body-1"
                      >
                        Phong Huong Adventure 2D1N
                      </Link>
                      <Link
                        href="/tour/ma-da-valley-jungle-camping-2d1n"
                        className="inline-block text-white body-1"
                      >
                        Ma Da Valley Jungle Camping 2D1N
                      </Link>
                      <Link
                        href="/tour/hang-pygmy-exploration-2d1n"
                        className="inline-block text-white body-1"
                      >
                        Hang Pygmy Exploration 2D1N
                      </Link>
                      <Link
                        href="/tour/phi-lieng-exploration-2d1n"
                        className="inline-block text-white body-1"
                      >
                        Phi Lieng Exploration 2D1N
                      </Link>
                      <Link
                        href="/tour/hung-thoong-exploration-3-days-2-nights"
                        className="inline-block text-white body-1"
                      >
                        Hung Thoong Exploration 3 days 2 nights
                      </Link>
                      <Link
                        href="/tour/tiger-cave-series-adventure-3d2n"
                        className="inline-block text-white body-1"
                      >
                        Tiger Cave Series Adventure 3D2N{" "}
                      </Link>
                      <Link
                        href="/tour/do-quyen-waterfall-top-adventure-conquering-2d1n"
                        className="inline-block text-white body-1"
                      >
                        Do Quyen Waterfall Top Adventure Conquering 2D1N
                      </Link>
                      <Link
                        href="/tour/kong-collapse-top-adventure-5d4n"
                        className="inline-block text-white body-1"
                      >
                        Kong Collapse Top Adventure 5D4N
                      </Link>
                    </div>
                  </div>
                  <div className="mb-4 md:pt-4 collapsible last:mb-0">
                    <div className="relative transition duration-300 ease-out outline-none cursor-pointer select-none">
                      <div className="flex space-x-4 font-bold title-3">
                        <span className="flex-1 text-white">Useful Information</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="rotate-0 duration-150"
                        >
                          <g clip-path="url(#clip0_1363_19069)">
                            <path
                              d="M8.56912 12.1704L15.7619 4.97526C16.0768 4.65954 16.0768 4.14803 15.7619 3.83151C15.4469 3.5158 14.9354 3.5158 14.6205 3.83151L7.99848 10.4559L1.37645 3.83231C1.06153 3.51659 0.550022 3.51659 0.234304 3.83231C-0.080616 4.14803 -0.080616 4.66034 0.234304 4.97606L7.42704 12.1712C7.7387 12.4821 8.25826 12.4821 8.56912 12.1704Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1363_19069">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="pl-4 space-y-4 whitespace-pre-line collapsible-content"
                      style={{ maxHeight: "0px" }}
                    >
                      <div>
                        <Link href="/faqs" className="inline-block text-white body-1">
                          FAQs
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/explorer/tourism-blog/safety-gears-and-camping-equipment"
                          className="inline-block text-white body-1"
                        >
                          Safety gears and camping equipment
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/explorer/tourism-blog/environment-protection-survival-rules"
                          className="inline-block text-white body-1"
                        >
                          Environment Protection &amp; Survival Rules
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/explorer/tourism-blog/safety-rescue-training"
                          className="inline-block text-white body-1"
                        >
                          Safety &amp; Rescue Training
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 md:pt-4 collapsible last:mb-0">
                    <div className="relative transition duration-300 ease-out outline-none cursor-pointer select-none">
                      <div className="flex space-x-4 font-bold title-3">
                        <span className="flex-1 text-white">Booking Policy</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="rotate-0 duration-150"
                        >
                          <g clip-path="url(#clip0_1363_19069)">
                            <path
                              d="M8.56912 12.1704L15.7619 4.97526C16.0768 4.65954 16.0768 4.14803 15.7619 3.83151C15.4469 3.5158 14.9354 3.5158 14.6205 3.83151L7.99848 10.4559L1.37645 3.83231C1.06153 3.51659 0.550022 3.51659 0.234304 3.83231C-0.080616 4.14803 -0.080616 4.66034 0.234304 4.97606L7.42704 12.1712C7.7387 12.4821 8.25826 12.4821 8.56912 12.1704Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1363_19069">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="pl-4 space-y-4 whitespace-pre-line collapsible-content"
                      style={{ maxHeight: "0px" }}
                    >
                      <div>
                        <Link
                          href="/policy/cancellation-policy"
                          className="inline-block text-white body-1"
                        >
                          Cancellation Policy
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/policy/alcohol-drugs-policy"
                          className="inline-block text-white body-1"
                        >
                          Alcohol &amp; Drugs Policy
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/policy/privacy-cookie"
                          className="inline-block text-white body-1"
                        >
                          Privacy &amp; Cookie
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 md:pt-4 collapsible last:mb-0">
                    <div className="relative transition duration-300 ease-out outline-none cursor-pointer select-none">
                      <div className="flex space-x-4 font-bold title-3">
                        <span className="flex-1 text-white">Explorer</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="rotate-0 duration-150"
                        >
                          <g clip-path="url(#clip0_1363_19069)">
                            <path
                              d="M8.56912 12.1704L15.7619 4.97526C16.0768 4.65954 16.0768 4.14803 15.7619 3.83151C15.4469 3.5158 14.9354 3.5158 14.6205 3.83151L7.99848 10.4559L1.37645 3.83231C1.06153 3.51659 0.550022 3.51659 0.234304 3.83231C-0.080616 4.14803 -0.080616 4.66034 0.234304 4.97606L7.42704 12.1712C7.7387 12.4821 8.25826 12.4821 8.56912 12.1704Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1363_19069">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="flex flex-col pl-4 space-y-4 whitespace-pre-line collapsible-content"
                      style={{ maxHeight: "0px" }}
                    >
                      <div>
                        <Link
                          href="/explorer/tourism-blog"
                          className="inline-block text-white body-1"
                        >
                          Tourism Blog
                        </Link>
                      </div>
                      <div>
                        <Link href="/explorer/news" className="inline-block text-white body-1">
                          News
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 md:pt-4 collapsible last:mb-0">
                    <div className="relative transition duration-300 ease-out outline-none cursor-pointer select-none">
                      <div className="flex space-x-4 font-bold title-3">
                        <span className="flex-1 text-white">About Jungle Boss</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="rotate-0 duration-150"
                        >
                          <g clip-path="url(#clip0_1363_19069)">
                            <path
                              d="M8.56912 12.1704L15.7619 4.97526C16.0768 4.65954 16.0768 4.14803 15.7619 3.83151C15.4469 3.5158 14.9354 3.5158 14.6205 3.83151L7.99848 10.4559L1.37645 3.83231C1.06153 3.51659 0.550022 3.51659 0.234304 3.83231C-0.080616 4.14803 -0.080616 4.66034 0.234304 4.97606L7.42704 12.1712C7.7387 12.4821 8.25826 12.4821 8.56912 12.1704Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1363_19069">
                              <rect width="16" height="16" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="flex flex-col pl-4 space-y-4 whitespace-pre-line collapsible-content"
                      style={{ maxHeight: "0px" }}
                    >
                      <div>
                        <Link href="/about-us#introduce" className="inline-block text-white body-1">
                          Introduce
                        </Link>
                      </div>
                      <div>
                        <Link href="/about-us#our-team" className="inline-block text-white body-1">
                          Our Team
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/about-us#human-of-jungle-boss"
                          className="inline-block text-white body-1"
                        >
                          Human of Jungle Boss
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/about-us#life-at-jungle-boss"
                          className="inline-block text-white body-1"
                        >
                          Life At Jungle Boss
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/about-us#our-certificates"
                          className="inline-block text-white body-1"
                        >
                          Our Certificates
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/about-us#partnership"
                          className="inline-block text-white body-1"
                        >
                          Partnership
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/about-us#contact-us"
                          className="inline-block text-white body-1"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="active pt-4 xl:pt-12 md:pt-8 collapse-footer">
            <div className="flex justify-between">
              <div className="font-bold headline-1 text-accent-500 max-md:hidden">
                JUNGLE BOSS COMPANY LIMITED
              </div>
              <div className="font-bold headline-3 text-accent-500 md:hidden">
                JUNGLE BOSS COMPANY LIMITED
              </div>
              <div className="max-md:hidden max-w-[160px] w-full">
                <button className="btn btn-solid h-10 !max-w-[160px]">Collapse Footer</button>
              </div>
            </div>
            <div
              className="xl:mt-[34px] md:mt-6 mt-4 collapse-content-footer"
              style={{ maxHeight: "317px" }}
            >
              <div className="grid grid-cols-12 xl:gap-x-8 md:gap-[22px] gap-4">
                <div className="md:col-span-5 col-span-full">
                  <div className="mb-4 space-y-1">
                    <div>
                      <span className="text-white label-1">Tax Identification Number: </span>
                      <span className="text-gray-200 body-1">
                        3101003517 issued by the Department of Planning and Investment of Quang Binh
                        Province on November 27th, 2015
                      </span>
                    </div>
                    <div>
                      <span className="text-white label-1">International Travel License: </span>
                      <span className="text-gray-200 body-1">
                        44-011/2016/TCDL-GPLHQT issued by the Ministry of Culture, Sports and
                        Tourism on January 29th, 2016
                      </span>
                    </div>
                    <div>
                      <span className="text-white label-1">Address: </span>
                      <a
                        href="https://maps.app.goo.gl/evQeMZfPHrcbnaMn8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150"
                      >
                        Phong Nha Town, Bo Trach District, Quang Binh Province, Vietnam
                      </a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 xl:space-x-4 md:space-x-3">
                      <div className="flex items-center space-x-2 lg:w-[103px] w-[94px] flex-shrink-0">
                        <img
                          src="/images/footer/email.png"
                          alt="email icon"
                          width="20"
                          height="20"
                          className="w-5 h-5"
                          loading="lazy"
                        />
                        <div className="text-white label-1">Email</div>
                      </div>
                      <a
                        href="mailto:contact@junglebosstours.com"
                        className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150"
                      >
                        contact@junglebosstours.com
                      </a>
                    </div>
                    <div className="flex items-start space-x-2 xl:space-x-4 md:space-x-3">
                      <div className="flex items-center space-x-2 lg:w-[103px] w-[94px] flex-shrink-0">
                        <img
                          src="/images/footer/phone.png"
                          alt="email icon"
                          className="w-5 h-5"
                          width="20"
                          height="20"
                          loading="lazy"
                        />
                        <div className="text-white label-1">Hotline</div>
                      </div>
                      <div className="space-y-1">
                        <div>
                          <a
                            href="tel:84917800805"
                            className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150"
                          >
                            (+84) 917 800 805
                          </a>
                        </div>
                        <div>
                          <a
                            href="tel:84859100222"
                            className="text-gray-200 body-1 lg:hover:text-primary-100 lg:duration-150"
                          >
                            (+84) 859 100 222
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 col-span-full xl:space-y-[22px] space-y-4 max-md:pt-4 max-md:border-t max-md:border-primary xl:pt-4 md:pt-3">
                  <div className="flex xl:space-x-[22px] space-x-4 items-center md:justify-end">
                    <img
                      src="/images/footer/black-diamond.png"
                      alt="black diamond"
                      width="238"
                      height="40"
                      className="lg:w-[238px] md:w-[200px] w-[143px]"
                      loading="lazy"
                    />
                    <img
                      src="/images/footer/ct.png"
                      alt="ct climbing technology"
                      width="50"
                      height="40"
                      className="md:w-[50px] w-[30px]"
                      loading="lazy"
                    />
                    <img
                      src="/images/footer/cmi.png"
                      alt="cmi"
                      width="96.5"
                      height="28"
                      className="lg:w-[96.5px] md:w-20 w-[69px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex xl:space-x-[22px] md:space-x-4 space-x-[22px] items-center md:justify-end">
                    <img
                      src="/images/footer/national.png"
                      alt="national speleological society"
                      width="76.6"
                      height="40"
                      className="lg:w-[76.6px] md:w-[60px] w-[46px]"
                      loading="lazy"
                    />
                    <img
                      src="/images/footer/vslc.png"
                      alt="vslc"
                      width="40"
                      height="40"
                      className="w-6 md:w-10"
                      loading="lazy"
                    />
                    <img
                      src="/images/footer/simond.png"
                      alt="simond"
                      width="156"
                      height="40"
                      className="lg:w-[156px] md:w-[120px] w-[94px]"
                      loading="lazy"
                    />
                    <img
                      src="/images/footer/italy.png"
                      alt="ckn italy"
                      width="60"
                      height="40"
                      className="lg:w-[60px] md:w-[50px] w-[36px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex space-x-[7px] items-center md:justify-end">
                    <div className="rounded md:w-[100px] w-[60px] md:h-12 h-8 bg-primary-100 flex justify-center items-center">
                      <img
                        src="/images/footer/visa.png"
                        alt="visa"
                        className="md:h-5 h-3.5"
                        width="60"
                        height="20"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded md:w-[100px] w-[60px] md:h-12 h-8 bg-primary-100 flex justify-center items-center">
                      <img
                        src="/images/footer/master-card.png"
                        alt="master card"
                        className="h-4 md:h-7"
                        width="46"
                        height="28"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded md:w-[100px] w-[60px] md:h-12 h-8 bg-primary-100 flex justify-center items-center">
                      <img
                        src="/images/footer/jcb.png"
                        alt="jcb"
                        className="md:h-8 h-[18px]"
                        width="42"
                        height="32"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded md:w-[100px] w-[60px] md:h-12 h-8 bg-primary-100 flex justify-center items-center">
                      <img
                        src="/images/footer/verified.png"
                        alt="verify by visa"
                        className="h-5 md:h-8"
                        width="56"
                        height="32"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded md:w-[100px] w-[60px] md:h-12 h-8 bg-primary-100 flex justify-center items-center">
                      <img
                        src="/images/footer/pay.png"
                        alt="9 pay"
                        className="h-4 md:h-7"
                        width="69"
                        height="28"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="body-2 text-gray-200 tracking-[0.28px] md:text-right xl:w-[557px] md:ml-auto">
                    Photos by Jungle Boss team, Justin Del Boulter, Nguyễn Việt Hùng, Linh Lố,
                    Chuong Acmvn, Lại Hồng Thái, John Le Bin, Ngô Đại Dương, Mai Hoàng Long, Ngô
                    Quang Minh, Đức Thành, Nguyễn Hải, Cao Kỳ Nhân, Trần Linh, Hoàng Táo
                  </div>
                  <div className="body-2 text-gray-200 tracking-[0.28px] md:text-right">
                    © 2025 Jungle Boss Company Limited. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      <h1 className="text-center">Đây là footer</h1>
    </div>
  );
};
export default FooterGotravel;
