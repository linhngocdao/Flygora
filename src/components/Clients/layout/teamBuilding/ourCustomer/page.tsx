import Image from "next/image";
import React from "react";

const OurCustomer = () => {
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
            <h2 className="text-white uppercase text-[2.5rem] heading-[125%] font-bold">
              Create Customer Happiness
            </h2>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden pt-6">
          <div className="slider-track marquee">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="slider-item">
                <Image
                  className="object-cover"
                  src="https://cms.junglebosstours.com/assets/62637abd-9cf8-4c27-99a9-fdd713943881?format=webp"
                  alt="customer review 1"
                  width={400}
                  height={300}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCustomer;
