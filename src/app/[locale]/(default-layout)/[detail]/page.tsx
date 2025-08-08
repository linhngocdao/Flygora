import Image from "next/image";

const TourDetail = () => {
  return (
    <main>
      <section>
        <div className="bbg-cover md:h-[500px] h-[300px] relative">
          <Image
            src="https://cms.junglebosstours.com/assets/56aa81c6-abff-47a4-bf78-fdc92769b70f?format=webp"
            alt="56aa81c6 abff 47a4 bf78 fdc92769b70fformatwebp"
            loading="eager"
            width="1440"
            height="500"
          />
          <div className="absolute w-full h-full bottom-[-1px] left-0 tour-detail-banner"></div>
        </div>
      </section>

      <section className="relative bg-[#34430f]">
        <div className="container relative z-20 grid h-full grid-cols-12 md:gap-x-8">
          <div className="col-span-12 xl:col-span-8">
            <div className="py-8 space-y-4 lg:space-y-8 md:space-y-6 lg:py-16 md:py-11">
              <div className="space-y-2">
                <h1 className="text-white uppercase headline-1">
                  Elephant Cave &amp; Ma Da Valley Jungle Trek 1D
                </h1>
                <div className="body-1 text-gray-50">
                  <p>
                    Enjoy a day of exploring majestic caves at Elephant cave, then go through Ma Da
                    valley, swimming in the clear blue water of Ma Da lake. The tour ends with a
                    600m swim to explore Tra Ang cave.
                  </p>
                </div>
              </div>
              <div className="h-[1px] bg-primary"></div>
              <div className="space-x-0 md:flex lg:space-x-16 md:space-x-11 max-md:space-y-4">
                <div className="space-y-4 md:w-1/2">
                  <div className="flex items-center space-x-3">
                    <div className="label-1 text-gray-100 w-[120px] flex-shrink-0">Duration</div>
                    <div className="text-white title-3">1 day </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="label-1 text-gray-100 w-[120px] flex-shrink-0">Participant</div>
                    <div className="text-white title-3">Up to 60 pax</div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="label-1 text-gray-100 w-[120px] flex-shrink-0">
                      Departure Day
                    </div>
                    <div className="text-white title-3">Daily</div>
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div className="flex space-x-3 lg:space-x-8 md:space-x-6">
                    <div className="label-1 text-gray-100 w-[120px] !ml-3">Age</div>
                    <div className="text-white title-3">From 9 years old</div>
                  </div>
                </div>
              </div>
              <div className="!ml-0 mt-4 md:w-1/2 space-y-4 w-full">
                <div className="flex items-center w-full space-x-3">
                  <div className="label-1 text-gray-100 w-[120px]">Difficulty</div>
                  <div className="flex-grow items-end grid grid-cols-4 relative gap-x-[2px]">
                    <div className="bg-[#B3E250] h-2"></div>
                    <div className="bg-[#EDC22A] h-3"></div>
                    <div className="bg-[#ED932A] h-2"></div>
                    <div className="bg-[#ED4D2A] h-2"></div>
                    <div
                      className="absolute w-6 h-6 -translate-x-1/2 top-1/2 -translate-y-3/4"
                      style={{ left: "calc(37.5%)" }}
                    ></div>
                  </div>
                </div>
                <div className="tracking-[0.28px] body-2 text-gray-50">
                  This trek is perfect for those with little hiking background but want to get a
                  true jungle and cave experience.{" "}
                </div>
              </div>
            </div>

            <div className="py-8 space-y-4 xl:py-16 md:py-11 lg:space-y-8 md:space-y-6"></div>
          </div>
          <div className="relative col-span-12 xl:col-span-4 xl:space-y-4 xl:pt-16"></div>
        </div>
      </section>
    </main>
  );
};
export default TourDetail;
