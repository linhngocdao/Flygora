import React, {useEffect, useRef, useState} from 'react'
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import Image from "next/image";
import PartnerCarousel from "@/components/Clients/layout/home/WhyChooseUs/PartnerCarousel";

const WhychooseUsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const anyVisible = entries.some(entry => entry.isIntersecting);
                setIsVisible(anyVisible);
            },
            {
                threshold: 0.3,
            }
        );

        // Observe the section for animation
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return (
        <div>
            <section ref={sectionRef} className="relative section-animation">
                <div className="relative overflow-hidden max-lg:pt-16 max-md:pb-8 max-md:pt-20 bg-section-2">
                    <div className="flex max-md:flex-col-reverse items-center container md:space-x-[37px] xl:pt-[119px] lg:pt-[100px] md:py-8 relative z-30">
                        {/* Content */}
                        <div className="flex flex-col justify-center flex-grow space-y-2">
                            <h1 className="text-[4.75rem] text-[#004750] uppercase tracking-[-1.2px] font-[700]">
                                Jungle Boss
                            </h1>
                            <div className="space-y-4">
                                <div className="uppercase headline-2 text-[1.75rem] text-[#004750] font-medium">
                                    Leading certified adventure travel company
                                </div>

                                {/* Reviews Section */}
                                <div className="flex flex-wrap items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-gray-900 title-1">Excellent</div>
                                        <div className="flex items-center space-x-1">
                                            {/* Star Rating */}
                                            {Array(5).fill(0).map((_, idx) => (
                                                <svg
                                                    key={idx}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="w-4 h-4 mb-1 md:w-6 md:h-6 text-primary"
                                                >
                                                    <path d="M8.29602 0.75L5.79602 6L1.29602 6.25L4.79602 9.75L3.04602 15.25L8.29602 12.25L12.796 15.5L11.796 9.25L15.046 6H10.296L8.29602 0.75Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="text-gray-900 title-1">on</div>
                                        <Image
                                            src="/images/homePage/section-2-tripadvisor.png"
                                            alt="tripadvisor"
                                            className="h-7"
                                            width={100}
                                            height={28}
                                            loading="lazy"
                                        />
                                    </div>
                                    <a
                                        href="https://www.tripadvisor.com/Attraction_Review-g4014591-d8403784-Reviews-Jungle_Boss_Tours-Phong_Nha_Ke_Bang_National_Park_Quang_Binh_Province.html"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="text-gray-900 label-1 lg:hover:text-primary lg:duration-150"
                                    >
                                        View 995 (reviews)
                                    </a>
                                </div>

                                {/* Description */}
                                <div className="prose introduce">
                                    <p>
                                        We offer exclusive cave exploration and jungle treks for small groups and
                                        jungle style team building activities in the UNESCO-listed Phong Nha-Ke Bang
                                        National Park and surrounding areas, including our newest tour to{" "}
                                        <a
                                            href="https://junglebosstours.com/tour/do-quyen-waterfall-top-adventure-conquering-3d2n"
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            Conquering Do Queen Waterfall
                                        </a>
                                        – the highest waterfall in South East Asia, and the legendary{" "}
                                        <a href="/tour/kong-collapse-top-adventure-5d4n" target="_blank" rel="noopener">
                                            Kong Collapse
                                        </a>
                                        – one of the deepest sinkholes on the planet.
                                    </p>
                                </div>

                                <ButtonPrimary name="About Us" href="/about-us" />
                            </div>
                        </div>

                        {/* Welcome, Image */}
                        <div className="lg:w-[432px] md:w-1/3 w-1/2 max-lg:mx-auto flex-shrink-0 flex items-center max-md:my-4">
                            <Image
                                src="/images/homePage/section-2-welcome.webp"
                                alt="welcome"
                                width={432}
                                height={432}
                                className="duration-500 lg:hover:translate-x-10 lg:hover:-translate-y-10"
                                loading="eager"
                            />
                        </div>
                    </div>

                    {/* Decorative Leaves */}
                    <Image
                        src="/images/homePage/leaf-bg-right.webp"
                        alt="leaf"
                        width={267}
                        height={267}
                        className={`absolute top-[-100px] right-[-80px] transition-transform duration-700 ease-out
                                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                                ${isVisible ? "translate-x-0 translate-y-0" : "translate-x-full -translate-y-full"}`}
                        loading="eager"
                    />
                    <Image
                        src="/images/homePage/leaf-bg-left.webp"
                        alt="leaf"
                        width={267}
                        height={267}
                        className={`absolute bottom-[-100px] left-[-90px] transition-transform duration-700 ease-out
                                w-[267px] h-[267px] max-md:w-[150px] max-md:h-[150px]
                                ${isVisible ? "translate-x-0 translate-y-0" : "-translate-x-full translate-y-full"}`}
                        loading="eager"
                    />
                </div>
            </section>
            <PartnerCarousel />
            <section>
                <div className="lg:py-[68px] md:py-[47px] py-[34px]">
                    <div className="container space-y-8">
                        {/* Section Header */}
                        <div className="space-y-4">
                            <h3 className="pre-header text-[#6c8a1f] tracking-[1.4px] text-center">
                                Our Advantage
                            </h3>
                            <h2 className="text-center uppercase headline-1 text-[#004750] text-[32px] font-bold max-xl:w-[80%] max-md:w-full mx-auto">
                                Why Jungle Boss Is The Top Choice For Adventure Tourism?
                            </h2>
                        </div>

                        {/* Advantages Grid */}
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-x-[64px] md:gap-x-45 max-md:gap-y-8 max-md:w-[70%] max-md:mx-auto">
                            {/* Unique Experience */}
                            <div className="space-y-[14px]">
                                <div className="flex justify-center">
                                    <Image
                                        src="/images/homePage/section-3-unique.webp"
                                        alt="Unique Experience"
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="md:space-y-2">
                                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                                        Unique Experience
                                    </div>
                                    <div className="text-center text-gray-700 body-1">
                                        Discover thrilling adventures tailored by Jungle Boss to explore the best of
                                        jungle trekking and caving experience!
                                    </div>
                                </div>
                            </div>

                            {/* Exclusive Tour */}
                            <div className="space-y-[14px]">
                                <div className="flex justify-center">
                                    <Image
                                        src="/images/homePage/section-3-exclusive.webp"
                                        alt="Exclusive Tour"
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                                        Exclusive Tour
                                    </div>
                                    <div className="text-center text-gray-700 body-1">
                                        Every adventure tours of Jungle Boss is exclusive and unique. Includes the
                                        Kong Collapse Adventure, the #1 adventurous tour in Vietnam!
                                    </div>
                                </div>
                            </div>

                            {/* Safe Adventure */}
                            <div className="space-y-[14px]">
                                <div className="flex justify-center">
                                    <Image
                                        src="/images/homePage/section-3-safety.webp"
                                        alt="Safe Adventure"
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                                        Safe Adventure
                                    </div>
                                    <div className="text-center text-gray-700 body-1">
                                        All tours adhere to strict safety protocols & are led by expert guides to
                                        ensure a safe jungle experience.
                                    </div>
                                </div>
                            </div>

                            {/* Sustainable Development */}
                            <div className="space-y-[14px]">
                                <div className="flex justify-center">
                                    <Image
                                        src="/images/homePage/section-3-sustainable.webp"
                                        alt="Sustainable Development"
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-center text-[18px] title-2 text-[#6c8a1f]">
                                        Sustainable Development
                                    </div>
                                    <div className="text-center text-gray-700 body-1">
                                        We strive to protect the environment and support local communities through
                                        sustainable practices.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default WhychooseUsSection
