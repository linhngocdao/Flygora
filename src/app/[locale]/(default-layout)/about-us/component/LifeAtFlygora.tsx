"use client";
import React from "react";
import Image from "next/image";

const LifeAtFlygora = ({ id }: { id: string }) => {
  const images = [
    "https://cms.junglebosstours.com/assets/913fe933-c4a0-4264-9ed3-692adb9431f3?format=webp",
    "https://cms.junglebosstours.com/assets/779691c2-2da3-418e-b552-2e7db063fc99?format=webp",
    "https://cms.junglebosstours.com/assets/7c732b77-d361-47fb-b39d-303053fb479a?format=webp",
    "https://cms.junglebosstours.com/assets/dae9d3ea-5a9c-4998-ba18-7fabeea4b21d?format=webp",
    "https://cms.junglebosstours.com/assets/e1d535dc-b709-48a3-8965-8958aedd09e2?format=webp",
    "https://cms.junglebosstours.com/assets/e9e0f45a-6a54-4efa-be8b-dfd3f1b054d2?format=webp",
    "https://cms.junglebosstours.com/assets/ca872e96-21d9-4562-a918-c88f158895e8?format=webp",
    "https://cms.junglebosstours.com/assets/5bd02b33-a23c-4559-874b-c37a3380312e?format=webp",
    "https://cms.junglebosstours.com/assets/d29f5cf5-1fc7-425c-af82-14c52f48e293?format=webp",
    "https://cms.junglebosstours.com/assets/8dbfed8c-6e0d-4ee2-909d-c8cfc93b99cc?format=webp",
  ];

  const imageWidths = [200, 250, 300, 350, 280, 320, 240, 360];
  const fixedHeight = 250;

  const getRandomWidth = (index: number) => {
    return imageWidths[index % imageWidths.length];
  };

  return (
    <div>
      <section className="relative overflow-hidden section-animation section" id={id}>
        <div className="absolute inset-0">
          <Image
            src="/images/homePage/bg-our-team.webp"
            alt="background our team"
            className="object-cover w-full h-full"
            fill
            quality={100}
            sizes="100vw"
            priority
            style={{
              imageRendering: "crisp-edges",
            }}
          />
        </div>
        <div className="relative xl:pb-[118px] md:pb-[83px] pb-[59px] xl:pt-[68px] md:pt-[48px] pt-[34px] overflow-hidden">
          <div className="container">
            <div>
              <div className="space-y-2 xl:space-y-4 md:space-y-3">
                <div className="pre-header text-primary tracking-[1.4px]">Life At Flygora</div>
                <h2 className="uppercase headline-1 text-text-500">
                  United by Our Love of Jungles and Mountains
                </h2>
              </div>
              <div className="mt-2 text-gray-700 body-1">Skilled, lively nature lovers</div>
            </div>
          </div>
          <div className="mt-16">
            <div className="relative w-[108%] md:w-[105%] -left-5 rotate-[-1deg] md:rotate-[-2deg] space-y-4 overflow-hidden">
              {/* First Row - Moving Left */}
              <div
                className="box box01 left flex animate-scroll-left"
                style={{
                  marginLeft: "-1774px",
                  transform: "translate3d(1705.38px, 0px, 0px)",
                }}
              >
                <div className="item flex space-x-4 items-center">
                  {[...images, ...images].map((src, index) => {
                    const width = getRandomWidth(index);
                    return (
                      <div key={`left-${index}`} className="item_child flex-shrink-0">
                        <div
                          className="rounded-lg overflow-hidden"
                          style={{
                            height: `${fixedHeight}px`,
                            width: `${width}px`,
                          }}
                        >
                          <Image
                            className="object-cover w-full h-full rounded-lg hover:scale-105 transition-transform duration-300"
                            src={src}
                            alt={`Team image ${index + 1}`}
                            width={width}
                            height={fixedHeight}
                            loading="lazy"
                            quality={100}
                            sizes={`${width}px`}
                            style={{
                              imageRendering: "auto",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Second Row - Moving Right */}
              <div
                className="box box02 right flex animate-scroll-right"
                style={{
                  marginLeft: "-1774px",
                  transform: "translate3d(68.6215px, 0px, 0px)",
                }}
              >
                <div className="item flex space-x-4 items-center">
                  {[...images, ...images].map((src, index) => {
                    const width = getRandomWidth(index + 3); // Offset để có kích thước khác với hàng trên
                    return (
                      <div key={`right-${index}`} className="item_child flex-shrink-0">
                        <div
                          className="rounded-lg overflow-hidden"
                          style={{
                            height: `${fixedHeight}px`,
                            width: `${width}px`,
                          }}
                        >
                          <Image
                            className="object-cover w-full h-full rounded-lg hover:scale-105 transition-transform duration-300"
                            src={src}
                            alt={`Team image ${index + 1}`}
                            width={width}
                            height={fixedHeight}
                            loading="lazy"
                            quality={90}
                            sizes={`${width}px`}
                            style={{
                              imageRendering: "auto",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .box {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .item {
          width: max-content;
        }

        .item_child {
          transition: transform 0.3s ease;
          backface-visibility: hidden;
        }

        /* Optimize image rendering */
        .item_child img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
};

export default LifeAtFlygora;
