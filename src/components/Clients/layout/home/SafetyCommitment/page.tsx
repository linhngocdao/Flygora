import React from 'react'
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const SafetyCommitment = () => {
    return (
        <div>
            <section className="lg:py-[65px] xl:h-[598px] md:py-[45px] py-[34px] bg-[url('/images/homePage/section-7-bg.webp')] bg-cover">
                <div className="container xl:px-[113px]">
                    <div className="bg-[#4c5d36]/50 lg:p-8 md:p-6 p-4 rounded-[8px] space-y-4"><h2
                        className="text-center pre-header text-[#eef4b7]">Safety In Adventure Tours</h2>
                        <div className="text-center uppercase  text-[1.5rem] font-[600] leading-[125%] lg:text-[2rem] text-[#ede52a]">"Your safety is our priority"
                        </div>
                        <div className="text-justify whitespace-pre-line text-gray-50 body-1">Jungle Boss has
                            established strategic collaborations with esteemed organizations like the British Caves Research
                            Association, National Speleological Society, and Vietnam Swimming &amp; Life Saving. These partnerships
                            aim to elevate Jungle Boss employees proficiency in caving techniques and rescue operations. Through an
                            extensive training regimen, inclusive of tour guides, safety assistants, and the porter team, Jungle
                            Boss ensures their readiness to tackle potential challenges. Notably, all Jungle Boss crew members and
                            guests receive high-quality European-standard safety gear, prioritizing their safety throughout the
                            adventure. Stringent maintenance protocols are consistently applied to all safety equipment housed
                            within the caves and at the technical store. This proactive approach minimizes potential risks,
                            upholding the highest safety standards.

                            Specifically designed for the Kong Collapse Top Adventure, Jungle Boss has collaborated with global
                            organizations to institute a comprehensive Safety Process. This meticulously crafted process has
                            received official endorsement from the Quang Binh People Committee, validating its reliability and
                            unwavering commitment to safety.
                        </div>
                        <div className="flex flex-wrap justify-center md:space-x-4 gap-y-2">
                            <ButtonPrimary name="Environment Protection & Survival Rules"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default SafetyCommitment
