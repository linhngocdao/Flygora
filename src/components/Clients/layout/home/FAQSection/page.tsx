import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const faqData = [
    {
        id: "01",
        question: "What happens if bad weather causes a tour cancellation?",
        answer:
            "If we have to cancel a tour due to weather, we will inform you as soon as possible and provide alternative options without extra costs, such as an alternate tour, new date, or a full refund."
    },
    {
        id: "02",
        question: "How to avoid thunderstorms & lightning during the tours?",
        answer:
            "We acknowledge the potential risks associated with thunderstorms and lightning strikes..."
    },
    {
        id: "03",
        question: "Is there any toilet during the tours?",
        answer:
            "Jungle Boss uses composting toilets for all adventure tours..."
    },
    {
        id: "04",
        question: "What kind of food provided during the tours?",
        answer:
            "During our tours, Jungle Boss offers a diverse range of Vietnamese-style food options..."
    },
    {
        id: "05",
        question: "Do I have to bring my own caving gears and camping gears?",
        answer:
            "You don't need to bring your own caving or camping gear as Jungle Boss provides all necessary safety equipment..."
    },
    {
        id: "06",
        question: "Am I allowed to join tours if I can not swim?",
        answer:
            "Absolutely, you will be provided with a life jacket for your safety during the adventure..."
    },
    {
        id: "07",
        question: "What kind of skills do I need to have?",
        answer:
            "While having prior caving, hiking, and camping experience can be advantageous, it's not mandatory..."
    },
    {
        id: "08",
        question: "What are the different levels of Adventure tours?",
        answer:
            "Our tours span a spectrum from relaxed to highly adventurous..."
    }
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    useEffect(() => {
        if (activeIndex !== null && contentRefs.current[activeIndex]) {
            contentRefs.current[activeIndex].style.maxHeight =
                contentRefs.current[activeIndex].scrollHeight + "px";
        }
        contentRefs.current.forEach((el, idx) => {
            if (idx !== activeIndex && el) {
                el.style.maxHeight = "0px";
            }
        });
    }, [activeIndex]);

    return (
        <section className="container lg:pt-[68px] lg:pb-[60px] md:py-[45px] py-[34px] space-y-8">
            <div className="space-y-4">
                <h3 className="tracking-[1.4px] pre-header text-[#6c8a1f]">Answers Await</h3>
                <div className="space-y-2">
                    <h2 className="uppercase headline-1 text-[#004750]">Frequently Asked Question</h2>
                    <div className="text-gray-700 body-1">Important information for your trip</div>
                </div>
            </div>

            <div className="xl:flex xl:space-x-[54px] md:space-y-8 space-y-4 xl:space-y-0">
                <div className="xl:w-[481px] flex-shrink-0 flex flex-col justify-between space-y-4">
                    <div className="space-y-4 faqs">
                        {faqData.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <div key={index} className="border-b border-gray-200 pb-2">
                                    <div
                                        onClick={() => toggleAccordion(index)}
                                        className="flex items-center justify-between space-x-2 cursor-pointer group"
                                    >
                                        <div className="flex space-x-2">
                                            <div
                                                className={`title-3 duration-150 ${
                                                    isActive
                                                        ? "text-[#728C2F] font-semibold"
                                                        : "text-gray-500 group-hover:text-[#728C2F]"
                                                }`}
                                            >
                                                {item.id}
                                            </div>
                                            <div
                                                className={`title-3 duration-150 ${
                                                    isActive
                                                        ? "text-[#728C2F] font-semibold"
                                                        : "text-[#333] group-hover:text-[#728C2F]"
                                                }`}
                                            >
                                                {item.question}
                                            </div>
                                        </div>
                                        <Image
                                            width={16}
                                            height={16}
                                            src="/images/homePage/ic-arrow-down-black.svg"
                                            alt="arrow down"
                                            className={`transition-transform duration-300 ${
                                                isActive ? "rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                    <div
                                        ref={(el) => (contentRefs.current[index] = el)}
                                        className={`overflow-hidden text-gray-700 transition-all duration-500 ease-in-out body-1 faq-prose max-h-0`}
                                    >
                                        <p className="text-justify py-2 px-1">{item.answer}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ButtonPrimary name="Contact Us" href="/contact" />
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex space-x-2 h-[200px]">
                        <div className="w-[45%] h-full rounded-[4px] overflow-hidden flex-shrink-0">
                            <img
                                src="https://cms.junglebosstours.com/assets/8443e8d8-8192-4f88-923f-9519e5517fe9?format=webp&width=900&height=600&quality=100"
                                className="object-cover w-full h-full"
                                alt="faq-img-1"
                            />
                        </div>
                        <div className="flex-grow h-full rounded-[4px] overflow-hidden">
                            <img
                                src="https://cms.junglebosstours.com/assets/dca70803-5e9d-4dfd-9e38-4e3e620c1274?format=webp&width=716&height=400&quality=100"
                                className="object-cover w-full h-full"
                                alt="faq-img-2"
                            />
                        </div>
                    </div>

                    <div className="flex md:space-x-2 md:h-[328.5px] max-md:flex-wrap">
                        <div className="w-[49.5%] aspect-1 flex-shrink-0 rounded-[4px] overflow-hidden max-md:mr-2 max-md:mb-2">
                            <img
                                src="https://cms.junglebosstours.com/assets/ddc82019-31a0-491d-9343-1d9df8320477?format=webp&width=658&height=658&quality=100"
                                className="object-cover w-full h-full"
                                alt="faq-img-3"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 flex-shrink-0 md:w-[160px] w-[48%] max-md:mb-2">
                            <div className="h-1/2 aspect-1 rounded-[4px] overflow-hidden">
                                <img
                                    src="https://cms.junglebosstours.com/assets/701388c4-561d-4142-8caa-967484222aa8?format=webp&width=320&height=320&quality=100"
                                    className="object-cover w-full h-full"
                                    alt="faq-img-4"
                                />
                            </div>
                            <div className="flex-grow aspect-1 rounded-[4px] overflow-hidden">
                                <img
                                    src="https://cms.junglebosstours.com/assets/8ec88ecb-67c3-40c2-94b6-4dc3e05c73f8?format=webp&width=320&height=320&quality=100"
                                    className="object-cover w-full h-full"
                                    alt="faq-img-5"
                                />
                            </div>
                        </div>
                        <div className="flex-grow h-full rounded-[4px] overflow-hidden max-md:hidden">
                            <img
                                src="https://cms.junglebosstours.com/assets/6a17d45f-d628-4484-819d-2c14e5b1b98b?format=webp&width=320&height=656&quality=100"
                                className="object-cover w-full h-full"
                                alt="faq-img-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
