import Image from "next/image";
import React from "react";

const OurCustomer = () => {
  // Sample customer images - replace with your actual images
  const customerImages = [
    "https://cms.junglebosstours.com/assets/62637abd-9cf8-4c27-99a9-fdd713943881?format=webp",
    "https://cms.junglebosstours.com/assets/62637abd-9cf8-4c27-99a9-fdd713943881?format=webp",
    "https://cms.junglebosstours.com/assets/62637abd-9cf8-4c27-99a9-fdd713943881?format=webp",
    "https://cms.junglebosstours.com/assets/62637abd-9cf8-4c27-99a9-fdd713943881?format=webp",
    "https://cms.junglebosstours.com/assets/62637abd-9cf8-4c27-99a9-fdd713943881?format=webp",
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          fill
          quality={100}
          src="/images/teamBuilding/bg-customer.webp"
          alt="background team building"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative xl:py-[68px] md:py-[48px] py-[34px] xl:space-y-8 md:space-y-6 space-y-4">
        <div className="container">
          <div className="space-y-4">
            <div className="pre-header !text-[#EDE52A] tracking-[1.4px]">Our Customers</div>
            <h2 className="text-white uppercase text-[2.5rem] leading-[125%] font-bold">
              Create Customer Happiness
            </h2>
          </div>
        </div>

        {/* Infinite Slider Container */}
        <div className="relative overflow-hidden pt-6">
          <div className="flex animate-marquee space-x-6">
            {/* First set of images */}
            {customerImages.map((image, idx) => (
              <div key={`first-${idx}`} className="flex-shrink-0">
                <Image
                  className="object-cover rounded-lg"
                  src={image}
                  alt={`customer review ${idx + 1}`}
                  width={200}
                  height={150}
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {customerImages.map((image, idx) => (
              <div key={`second-${idx}`} className="flex-shrink-0">
                <Image
                  className="object-cover rounded-lg"
                  src={image}
                  alt={`customer review duplicate ${idx + 1}`}
                  width={200}
                  height={150}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default OurCustomer;
