import Image from 'next/image';
import { useEffect, useRef } from 'react';

const PartnerCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const translateXRef = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const speed = 1; // Tốc độ scroll

    const animate = () => {
      translateXRef.current -= speed;

      if (translateXRef.current <= -carousel.scrollWidth / 2) {
        translateXRef.current = 0;
      }

      carousel.style.transform = `translate3d(${translateXRef.current}px, 0px, 0px)`;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const partners = [
    {
      id: 'eda30eb9-a86d-4858-83fc-263ee6fd21b8',
      alt: 'Partner Logo 1'
    },
    {
      id: '15b3d4bb-9ab1-4ddc-a5f6-78b9bd8300d5',
      alt: 'Partner Logo 2'
    },
    {
      id: '65331343-46b9-4485-a527-9d21ecd1642d',
      alt: 'Partner Logo 3'
    },
    {
      id: '70feea7d-fb32-4fea-b3c5-cd06c69d82f5',
      alt: 'Partner Logo 4'
    },
    {
      id: '8d93adcb-1b3f-47e7-9f45-5d3ccf302b26',
      alt: 'Partner Logo 5'
    },
    {
      id: 'd3b8a3c3-c221-4bc9-87b9-e2475350d2ef',
      alt: 'Partner Logo 6'
    },
    {
      id: '19a94065-d49b-4f97-855e-5d05871cdc36',
      alt: 'Partner Logo 7'
    },
    {
      id: '16be3b74-84ce-4784-ad99-f883705196cc',
      alt: 'Partner Logo 8'
    },
    {
      id: 'dbad0364-b891-43cd-8815-6a167a7a40d1',
      alt: 'Partner Logo 9'
    },
    {
      id: 'a44fcd79-0a48-4415-9d84-44c5e29f7128',
      alt: 'Partner Logo 10'
    }
  ];

  return (
    <section className="relative pt-7 md:pb-[72px] pb-[64px] group">
      {/* Background Images */}
      <div className="absolute inset-0">
        <Image
          src="/images/homePage/partner-background.webp"
          alt="partner background"
          className="absolute inset-0 object-cover w-full h-full lg:object-bottom max-lg:object-right max-md:hidden"
          fill
          priority
        />
        <Image
          src="/images/homePage/partner-background-mobile.webp"
          alt="partner background mobile"
          className="absolute inset-0 object-cover w-full h-full md:hidden"
          fill
          priority
        />
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex items-center gap-8 w-fit transition-transform duration-300 ease-out"
          style={{ willChange: 'transform' }}
        >
          {/* Render logos twice for seamless loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`https://cms.junglebosstours.com/assets/${partner.id}?format=webp`}
                  alt={partner.alt}
                  className="object-contain w-full h-full filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;
