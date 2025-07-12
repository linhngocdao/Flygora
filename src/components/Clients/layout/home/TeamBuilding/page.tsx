"use client"
import React, { useEffect, useRef } from 'react'
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";

const TeamBuilding = () => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const gallery = galleryRef.current;
        const section = sectionRef.current;

        if (!gallery || !section) return;

        // Tạo wrapper container cho horizontal scroll
        const wrapper = document.createElement('div');
        wrapper.className = 'overflow-x-auto overflow-y-hidden scrollbar-hide';
        wrapper.style.scrollbarWidth = 'none';
        // Fix TypeScript error for msOverflowStyle
        (wrapper.style as any).msOverflowStyle = 'none';

        // Wrap gallery trong scrollable container
        const parentNode = gallery.parentNode;
        if (parentNode) {
            parentNode.insertBefore(wrapper, gallery);
            wrapper.appendChild(gallery);
        }

        // Auto scroll horizontal khi scroll vertical
        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Kiểm tra nếu section đang visible
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Tính toán progress scroll (0 to 1)
                const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));

                // Tính toán horizontal scroll position
                const maxScrollLeft = gallery.scrollWidth - wrapper.clientWidth;
                const targetScrollLeft = progress * maxScrollLeft;

                // Smooth scroll to position
                wrapper.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth'
                });
            }
        };

        // Manual horizontal scroll với mouse wheel
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const scrollAmount = e.deltaY * 2;
            wrapper.scrollLeft += scrollAmount;
        };

        // Add CSS để ẩn webkit scrollbar
        const style = document.createElement('style');
        style.textContent = `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);

        // Event listeners
        window.addEventListener('scroll', handleScroll);
        wrapper.addEventListener('wheel', handleWheel, { passive: false });

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            wrapper.removeEventListener('wheel', handleWheel);
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);

    return (
        <div>
            <section
                ref={sectionRef}
                className="space-y-8 lg:py-[68px] md:py-[45px] py-[34px] bg-gray-50 overflow-hidden"
                id="needToMoveSection"
            >
                {/* Section Header */}
                <div className="container space-y-4">
                    <h2 className="text-center pre-header text-[#6c8a1f]">Team Building Tour</h2>
                    <div
                        className="text-center uppercase text-[1.5rem] font-[600] leading-[125%] lg:text-[2.5rem] text-[#004750]">
                        Jumpstart Team Synergy <br/> with Exhilarating Challenges
                    </div>

                    {/* Team Building Description */}
                    <div
                        className="text-center pb-[50px] text-[#666] leading-[145%] text-[0.8rem] lg:text-[1rem] max-w-[800px] mx-auto">
                        <p>
                            Immerse your team in an unparalleled adventure amid the awe-inspiring jungles of Phong
                            Nha – Ke Bang National Park. Jungle Boss Team building is a transformative journey marked by
                            unique
                            and challenging games, setting us apart from the conventional team building landscape in
                            Vietnam. Escape
                            the mundane and seize the extraordinary as your team engages in missions that demand
                            collaboration,
                            creativity, and camaraderie. Our jungle setting serves as the ultimate canvas for fostering
                            teamwork, creating an atmosphere that is not only thrilling but also indelibly
                            unforgettable.
                        </p>
                        <p>
                            Embrace a one-of-a-kind adventure with us – a promise to not only fortify your team
                            bonds but also create lasting memories of an exceptionally extraordinary experience. At
                            Jungle Boss, we
                            redefine team building, making it an immersive and thrilling escapade that transcends the
                            ordinary,
                            leaving an enduring mark on your team collective journey. There are different team building
                            options from 1 day to multiple days. Leave us a request and we can help you tailor a unique
                            Jungle Team
                            building that suits your needs!
                        </p>
                    </div>
                </div>

                {/* Team Building Image Gallery */}
                <div
                    ref={galleryRef}
                    className="w-max lg:h-[330px] md:h-[200px] h-[120px] flex gap-x-4"
                    id="needToMove"
                >
                    {["83bd39bf-107a-474f-95d2-561a9950b543", "af730d8d-dbd1-4991-a6f6-96a763a99baa", "043ca800-98fc-46da-a7e4-9161dad21989", "fe88327e-7382-49e2-b320-d3f637a6e0fe", "279ed19c-0f05-4d18-909c-d7f0fd10454c", "dace4dff-255e-4197-8b7a-5d0c7260583e", "501c8981-a4cd-43f4-a3d8-962b96433382", "145a9bc5-473f-406c-bb53-37dcdac8f333"].map((id, index) => (
                        <div
                            key={index}
                            className={`lg:w-[400px] md:w-[300px] lg:h-[266px] md:h-[150px] w-[175px] h-[95px] rounded-[8px] overflow-hidden ${index % 2 !== 0 ? "self-end" : ""}`}
                        >
                            <picture>
                                <source
                                    media="(max-width: 767px)"
                                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=350&height=190&quality=100`}
                                    type="image/webp"
                                />
                                <source
                                    media="(max-width: 767px)"
                                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=jpeg&width=350&height=190&quality=100`}
                                    type="image/jpeg"
                                />
                                <source
                                    media="(max-width: 1439px)"
                                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=800&height=512&quality=100`}
                                    type="image/webp"
                                />
                                <source
                                    media="(max-width: 1439px)"
                                    srcSet={`https://cms.junglebosstours.com/assets/${id}?format=jpeg&width=800&height=512&quality=100`}
                                    type="image/jpeg"
                                />
                                <img
                                    className="object-cover w-full h-full"
                                    src={`https://cms.junglebosstours.com/assets/${id}?format=webp&width=800&height=512&quality=100`}
                                    alt={`team building image ${index}`}
                                    loading="lazy"
                                    width={400}
                                    height={266}
                                />
                            </picture>
                        </div>
                    ))}
                </div>

                {/* Button căn giữa */}
                <div className="text-center">
                    <ButtonPrimary name="Explore Now"/>
                </div>
            </section>
        </div>
    )
}

export default TeamBuilding