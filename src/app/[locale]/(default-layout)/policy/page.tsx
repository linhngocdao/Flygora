import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Policy = () => {
  const t = useTranslations("common.policy");
  return (
    <>
      <main>
        {/* header policy */}
        <section className="relative md:h-[500px] h-[400px] max-h-screen">
          <div className="absolute inset-0">
            <Image
              fill
              src="/images/GoTravel_policy/banner-policy.webp"
              alt="Người leo núi đá gần thác nước"
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="absolute inset-0 w-full h-full bg-black/50"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="container">
              <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
                {t("banner.title")}
              </h1>
            </div>
          </div>
        </section>
        {/* Content Section */}
        <section className="xl:py-[68px] md:py-[48px] py-[34px] md:space-y-0 space-y-8">
          <div className="md:hidden">
            <div className="flex items-center justify-between px-4 py-5 bg-primary-900 text-primary-50">
              <div className="title-2">Special launch offer – New version of Do Quyen</div>
            </div>
          </div>
          <div className="container">
            <div className="grid grid-cols-12 gap-y-5 xl:gap-x-8 md:gap-x-6">
              <div className="hidden col-span-full md:block md:col-span-4">
                <div className="xl:px-8 md:px-6 px-4 xl:py-10 md:py-7 py-5 rounded-lg bg-[#4c5d36] sticky top-[80px]">
                  <ul className="space-y-1">
                    <li>
                      <div className="flex items-center justify-between h-12 space-x-2 duration-300 ease-in-out border-b cursor-pointer text-primary-50 border-primary-50">
                        <div className="flex items-center space-x-2 xl:pl-2">
                          <div className="text-[1rem] headline-[125%]">
                            Special launch offer – New version of Do Quyen
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M13.75 9.99996C13.75 10.1598 13.6889 10.3198 13.5669 10.4418L7.31691 16.6918C7.0727 16.9361 6.67723 16.9361 6.43316 16.6918C6.1891 16.4476 6.18895 16.0521 6.43316 15.8081L12.2413 9.99996L6.43316 4.19183C6.18894 3.94762 6.18894 3.55215 6.43316 3.30808C6.67738 3.06402 7.07285 3.06386 7.31691 3.30808L13.5669 9.55808C13.6889 9.68012 13.75 9.84012 13.75 9.99996Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between h-12 space-x-2 duration-300 ease-in-out border-b cursor-pointer text-primary-50 border-primary-50">
                        <div className="flex items-center space-x-2 xl:pl-2">
                          <div className="text-[1rem] headline-[125%]">
                            Special launch offer – New version of Do Quyen
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M13.75 9.99996C13.75 10.1598 13.6889 10.3198 13.5669 10.4418L7.31691 16.6918C7.0727 16.9361 6.67723 16.9361 6.43316 16.6918C6.1891 16.4476 6.18895 16.0521 6.43316 15.8081L12.2413 9.99996L6.43316 4.19183C6.18894 3.94762 6.18894 3.55215 6.43316 3.30808C6.67738 3.06402 7.07285 3.06386 7.31691 3.30808L13.5669 9.55808C13.6889 9.68012 13.75 9.84012 13.75 9.99996Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between h-12 space-x-2 duration-300 ease-in-out border-b cursor-pointer text-primary-50 border-primary-50">
                        <div className="flex items-center space-x-2 xl:pl-2">
                          <div className="text-[1rem] headline-[125%]">
                            Special launch offer – New version of Do Quyen
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M13.75 9.99996C13.75 10.1598 13.6889 10.3198 13.5669 10.4418L7.31691 16.6918C7.0727 16.9361 6.67723 16.9361 6.43316 16.6918C6.1891 16.4476 6.18895 16.0521 6.43316 15.8081L12.2413 9.99996L6.43316 4.19183C6.18894 3.94762 6.18894 3.55215 6.43316 3.30808C6.67738 3.06402 7.07285 3.06386 7.31691 3.30808L13.5669 9.55808C13.6889 9.68012 13.75 9.84012 13.75 9.99996Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between h-12 space-x-2 duration-300 ease-in-out border-b cursor-pointer text-primary-50 border-primary-50">
                        <div className="flex items-center space-x-2 xl:pl-2">
                          <div className="text-[1rem] headline-[125%]">
                            Special launch offer – New version of Do Quyen
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M13.75 9.99996C13.75 10.1598 13.6889 10.3198 13.5669 10.4418L7.31691 16.6918C7.0727 16.9361 6.67723 16.9361 6.43316 16.6918C6.1891 16.4476 6.18895 16.0521 6.43316 15.8081L12.2413 9.99996L6.43316 4.19183C6.18894 3.94762 6.18894 3.55215 6.43316 3.30808C6.67738 3.06402 7.07285 3.06386 7.31691 3.30808L13.5669 9.55808C13.6889 9.68012 13.75 9.84012 13.75 9.99996Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between h-12 space-x-2 duration-300 ease-in-out border-b cursor-pointer text-primary-50 border-primary-50">
                        <div className="flex items-center space-x-2 xl:pl-2">
                          <div className="text-[1rem] headline-[125%]">
                            Special launch offer – New version of Do Quyen
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M13.75 9.99996C13.75 10.1598 13.6889 10.3198 13.5669 10.4418L7.31691 16.6918C7.0727 16.9361 6.67723 16.9361 6.43316 16.6918C6.1891 16.4476 6.18895 16.0521 6.43316 15.8081L12.2413 9.99996L6.43316 4.19183C6.18894 3.94762 6.18894 3.55215 6.43316 3.30808C6.67738 3.06402 7.07285 3.06386 7.31691 3.30808L13.5669 9.55808C13.6889 9.68012 13.75 9.84012 13.75 9.99996Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-span-full md:col-span-8">
                <div className="md:border-l md:border-gray-200 xl:pl-8 md:pl-6">
                  <h2 className="mb-5 text-gray-900 title-1">
                    Special launch offer – New version of Do Quyen
                  </h2>
                  <div className="prose-policy">
                    <p>đây là content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <SubscribeBanner />
      </main>
    </>
  );
};

export default Policy;
