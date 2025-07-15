import Image from "next/image";
import React from "react";

const TourSlider = () => {
  return (
    <div>
      <div className="rounded-lg bg-neutral-100">
        <div>
          <Image
            src="https://cms.junglebosstours.com/assets/d8f4f27a-d570-4fa9-8563-fab2c8df64c3?format=webp"
            width={100}
            height={200}
            className="object-cover w-[50%] h-[50%]"
            alt="img"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 duration-500 ease-in-out title-2 lg:hover:text-primary line-clamp-1">
            Tra Ang Excursion 1D
          </h3>
          <div className="flex items-center justify-between w-full space-x-4">
            <div className="w-1/2 text-gray-700 body-1">1 day </div>
          </div>
          <span className="text-[#648219] font-medium  text-[1rem] ">VNĐ 800,000</span>
          <p className="text-gray-700 font-[400] text-base leading-normal line-clamp-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo neque cum, possimus deb
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourSlider;
