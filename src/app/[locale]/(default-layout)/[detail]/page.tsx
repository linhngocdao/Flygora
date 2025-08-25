"use client";
import ButtonPhu from "@/components/Clients/ui/ButtonPhu";
import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import ButtonFancy from "@/components/Clients/ui/ButtonSecondary";
import ImageGalleryModal from "@/components/Clients/ui/ImageGalleryModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BookingTour from "./components/BookingTour";

function useSmoothScroll() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
      return () => {
        document.documentElement.style.scrollBehavior = "";
      };
    }
  }, []);
}

type AccordionItem = {
  title: string;
  content: React.ReactNode;
  id?: string;
};

function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <details
          key={it.title}
          id={`accordion-${idx}`}
          className="border-b border-gray-200 pb-3 group"
        >
          <summary className="flex items-center justify-between py-3 cursor-pointer text-gray-900 hover:text-primary outline-none list-none">
            <span className="uppercase title-2">{it.title}</span>
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              className="transition-transform group-open:rotate-180"
            >
              <path
                d="M15.1657 0.920372C10.6797 0.623372 6.19372 0.537373 1.70772 0.530373C0.862718 0.500373 0.383718 1.62637 1.01172 2.21137C3.24272 4.53637 5.63372 6.95437 7.93072 9.19837C8.28672 9.56037 8.87172 9.56037 9.22672 9.19837C11.3397 7.04937 13.4127 4.86137 15.4197 2.60637C15.7267 2.27337 15.7987 1.96637 15.7217 1.77437C16.2037 1.51237 16.0837 0.989372 15.1657 0.920372ZM8.62872 7.26737C7.12772 5.66737 5.56872 4.03937 4.01372 2.45137C7.55772 2.37137 11.1007 2.22737 14.6447 1.95537C12.5917 3.67937 10.5967 5.45937 8.62872 7.26737Z"
                fill="currentColor"
              />
            </svg>
          </summary>
          <div className="text-gray-700 body-1">{it.content}</div>
        </details>
      ))}
    </div>
  );
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[8px] bg-white p-3 md:p-4 lg:p-6 ${className}`}>{children}</div>;
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode | string;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon && (
        <Image
          style={{ objectFit: "contain", color: "white" }}
          src={icon}
          alt={icon}
          className="brightness-0 invert"
          width={20}
          height={20}
        />
      )}
      <div className="text-gray-100 w-[120px] shrink-0">{label}</div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  );
}

function Feature({ iconUrl, text }: { iconUrl: string; text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-gray-700">
      <div className="relative w-12 h-12">
        <Image src={iconUrl} alt="" fill className="object-contain" />
      </div>
      <div className="flex-1 font-semibold">{text}</div>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      className="transition-transform group-open:rotate-180"
    >
      <path
        d="M15.1657 0.920372C10.6797 0.623372 6.19372 0.537373 1.70772 0.530373C0.862718 0.500373 0.383718 1.62637 1.01172 2.21137C3.24272 4.53637 5.63372 6.95437 7.93072 9.19837C8.28672 9.56037 8.87172 9.56037 9.22672 9.19837C11.3397 7.04937 13.4127 4.86137 15.4197 2.60637C15.7267 2.27337 15.7987 1.96637 15.7217 1.77437C16.2037 1.51237 16.0837 0.989372 15.1657 0.920372ZM8.62872 7.26737C7.12772 5.66737 5.56872 4.03937 4.01372 2.45137C7.55772 2.37137 11.1007 2.22737 14.6447 1.95537C12.5917 3.67937 10.5967 5.45937 8.62872 7.26737Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TourDetailPage() {
  useSmoothScroll();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: "highlight", label: "Highlight" },
      { id: "tour-detail", label: "Tour Details" },
      { id: "photos", label: "Photos" },
      { id: "tour-process", label: "Tour Booking Process" },
      { id: "book-tour", label: "Book Tour" },
      { id: "faqs", label: "Frequently Asked Question" },
    ],
    []
  );

  // Tour images for gallery
  const tourImages = [
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Cuon-Vendor.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Dessert-Bowls.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Mi-Guests.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Mi-Ingredients.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Mi-Sandwiches.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Dishes.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Grilled-Fish-Hotpot.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Grilled-Fish-Pan.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Holding-Bahn-Mi.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Porridge-Tray.jpg",
    "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Rice-Roll-Vendor.jpg",
  ];

  // optional: Intersection to highlight current item later if cần
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sidebar
  useEffect(() => {
    const handleScroll = () => {
      const greenArea = document.querySelector("#green-area");
      if (greenArea) {
        const greenBottom = greenArea.getBoundingClientRect().bottom;
        // Show sidebar once green area is out of view and keep it visible
        if (greenBottom <= 100) {
          setShowSidebar(true);
        }
        // Only hide if we scroll back up above the green area
        if (greenBottom > 200) {
          setShowSidebar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Trigger when section is 20% from top
        threshold: 0,
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <main className="tour-detail pb-20 xl:pb-0">
      {/* Hero */}
      <section>
        <div className="tour-detail-banner md:h-[500px] h-[300px] relative w-full overflow-hidden">
          <Image
            src="/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Cuon-Vendor.jpg"
            alt="Hanoi Old Quarter Evening Food Tour Banh Cuon Vendor"
            loading="eager"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute w-full h-full bottom-[-1px] left-0 tour-detail-banner"></div>
        </div>
      </section>

      <section className="bg-[#34430f] py-8 md:py-11 lg:py-16">
        <div className="container mx-auto grid grid-cols-12 md:gap-x-8">
          {/* Left content - Green area */}
          <div className="col-span-12 xl:col-span-8">
            <div id="green-area" className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <h1 className="text-white uppercase text-2xl md:text-3xl font-bold">
                  Hanoi Exclusive Food Tour
                </h1>
                <p className="text-gray-50">
                  Ditch the guidebook for a night and discover the backstreets of Hanoi’s
                  old-quarter while visiting authentic mom n’ pop eateries and passing by some of
                  the city’s most iconic sights. Make your own bahn mi, stroll through the city’s
                  largest wet market, and try over 10 dishes on this journey through Vietnamese
                  cuisine and culture!
                </p>
              </div>

              <div className="h-px bg-primary/70" />

              <div className="md:flex lg:space-x-16 md:space-x-11 space-y-4 md:space-y-0">
                <div className="space-y-4 md:w-1/2">
                  <InfoRow label="Duration" value="4-6 hours" icon="/images/others/duration.svg" />
                  <InfoRow
                    label="Participant"
                    value="Up to 12 pax"
                    icon="/images/others/participant.svg"
                  />
                  <InfoRow
                    label="Departure Day"
                    value="Everyday"
                    icon="/images/others/departureDay.svg"
                  />
                </div>
                <div className="flex-grow space-y-4">
                  <InfoRow
                    label="Meeting point"
                    value="Flygora Travel Office"
                    icon="/images/others/meetingPoint.svg"
                  />
                  <InfoRow
                    label="Overall rating"
                    value={
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">4.9/5</span>
                        <span className="text-gray-50">(215 reviews)</span>
                      </div>
                    }
                    icon="/images/others/overating.svg"
                  />
                  <InfoRow label="Age" value="From 16 years old" icon="/images/others/age.svg" />
                </div>
              </div>

              <p className="md:w-1/2 text-gray-50">
                Explore Hanoi&apos;s Old Quarter backstreets, visiting authentic local eateries and
                seeing iconic sights. This immersive food tour includes making your own banh mi,
                visiting the largest wet market, and trying over 10 different dishes showcasing
                Vietnam&apos;s incredible cuisine and culture.
              </p>
            </div>
          </div>

          {/* Right sidebar - desktop only */}
          <aside className="hidden xl:block col-span-4 xl:pt-0 xl:pl-8">
            <div className="sticky top-[84px] space-y-4">
              <ButtonFancy
                name="View Image"
                onClick={() => setIsImageModalOpen(true)}
                className="w-full"
              />
              <div
                className={`p-6 rounded-[8px] bg-white xl:space-y-4 max-md:space-y-4 xl:block md:flex md:justify-between transition-all duration-300 ${
                  showSidebar ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-700 label-1">Price</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="title-2 text-primary">USD 35$/pax</div>
                    </div>
                  </div>
                </div>
                <ButtonPrimary name="Book Tour" fullWidth href="#book-tour" />
                {/* <div className="space-y-4 w-fit">
                  <div className="flex space-x-2">
                    <ButtonPrimary name="Give as a Gift" maxWidth="w-full" />
                    <ButtonPrimary name="Choose Private Tour" maxWidth="w-full" />
                  </div>
                </div> */}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative bg-gray-100">
        <div ref={containerRef} className="container mx-auto grid grid-cols-12 md:gap-x-8">
          {/* Left content */}
          <div className="col-span-12 xl:col-span-8">
            <div className="">
              {/* Highlight */}
              <section id="highlight" className="py-4">
                <Card className="space-y-4">
                  <Feature
                    iconUrl="https://cms.junglebosstours.com/assets/ba8628fe-d8fb-4565-b10c-3752e0e1f7ae"
                    text={
                      <>
                        Discover Hanoi’s Old Quarter through{" "}
                        <strong>5 hand-picked local eateries</strong> and a bustling market,
                        indulging in over <strong>10 different dishes</strong> that showcase
                        northern Vietnamese cuisine.
                      </>
                    }
                  />
                  <Feature
                    iconUrl="https://cms.junglebosstours.com/assets/8609130e-5738-43a2-82b4-0da7d95f7bcb"
                    text={
                      <>
                        Get hands-on with food – <strong>make your own Bánh Mì</strong> sandwich
                        with guidance from a local vendor.
                      </>
                    }
                  />
                  <Feature
                    iconUrl="https://cms.junglebosstours.com/assets/32c23792-c5d3-40e4-b52f-393760ba7a3d"
                    text={
                      <>
                        Walk across <strong>Long Biên Bridge</strong> at sunset, visit the city’s
                        largest wet market, and enjoy a true local’s perspective of Hanoi at night.
                      </>
                    }
                  />
                  <Feature
                    iconUrl="https://cms.junglebosstours.com/assets/32c23792-c5d3-40e4-b52f-393760ba7a3d"
                    text={
                      <>
                        Unlimited local beer or soft drinks along the way, plus a{" "}
                        <strong>signature cocktail</strong> at a hidden speakeasy bar.
                      </>
                    }
                  />
                  <Feature
                    iconUrl="https://cms.junglebosstours.com/assets/32c23792-c5d3-40e4-b52f-393760ba7a3d"
                    text={
                      <>
                        Small group (<strong>max 12 guests</strong>) led by a passionate{" "}
                        <strong>English-speaking local foodie guide</strong>.
                      </>
                    }
                  />
                </Card>
              </section>

              {/* Tour Details (Accordion) */}
              <section id="tour-detail" className="py-4">
                <Card className="space-y-6">
                  <h2 className="uppercase text-2xl font-bold text-gray-800">Tour Details</h2>
                  <Accordion
                    items={[
                      {
                        title: "Duration & Schedule",
                        content: (
                          <div className="prose">
                            <p>
                              The tour lasts around <strong>3.5 hours</strong>, starting daily at{" "}
                              <strong>4:30 PM</strong>. A gentle walking pace, covering about 2.5
                              km.
                            </p>
                          </div>
                        ),
                      },
                      {
                        title: "Group Size",
                        content: (
                          <p>
                            <strong>2–12 guests</strong> per tour. Solo travelers are welcome and
                            will join a small group.
                          </p>
                        ),
                      },
                      {
                        title: "Meeting Point",
                        content: (
                          <p>
                            Starts at a local restaurant on the{" "}
                            <strong>north end of Hanoi’s Old Quarter</strong>. Exact address
                            provided after booking. Ends around the <strong>south end</strong>.
                          </p>
                        ),
                      },
                      {
                        title: "Dietary Requirements",
                        content: (
                          <p>
                            We can accommodate{" "}
                            <strong>vegetarian, vegan, gluten-free, nut-free</strong>, or other
                            diets with advance notice.
                          </p>
                        ),
                      },
                      {
                        title: "Cancellation",
                        content: (
                          <p>
                            <strong>Free cancellation</strong> up to 24 hours before tour start for
                            a full refund. Tours run rain or shine.
                          </p>
                        ),
                      },
                    ]}
                  />
                </Card>
              </section>

              {/* Photos */}
              <section id="photos" className="py-4">
                <Card>
                  <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Photos</h2>
                  <div className="grid grid-cols-6 gap-1 md:gap-4">
                    <button
                      type="button"
                      className="relative col-span-6 aspect-[2/1] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsImageModalOpen(true);
                      }}
                    >
                      <Image
                        src="/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Cuon-Vendor.jpg"
                        alt="Photo hero"
                        fill
                        sizes="(min-width: 1024px) 1110px, 100vw"
                        className="object-cover pointer-events-none"
                      />
                    </button>

                    {[
                      "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Dessert-Bowls.jpg",
                      "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Mi-Guests.jpg",
                      "/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Mi-Ingredients.jpg",
                    ].map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsImageModalOpen(true);
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Photo ${i + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                          sizes="33vw"
                        />
                      </button>
                    ))}

                    <button
                      type="button"
                      className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Clicked image 4"); // Debug log
                        setIsImageModalOpen(true);
                      }}
                    >
                      <Image
                        src="/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Banh-Mi-Sandwiches.jpg"
                        alt="Photo 4"
                        fill
                        className="object-cover pointer-events-none"
                        sizes="50vw"
                      />
                    </button>
                    <button
                      type="button"
                      className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Clicked image 5"); // Debug log
                        setIsImageModalOpen(true);
                      }}
                    >
                      <Image
                        src="/images/others/tour1/Hanoi-Old-Quarter-Evening-Food-Tour-Dishes.jpg"
                        alt="Photo 5"
                        fill
                        className="object-cover pointer-events-none"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-black/40 grid place-items-center pointer-events-none">
                        <div className="text-white text-3xl md:text-4xl font-bold">+4</div>
                      </div>
                    </button>
                  </div>
                </Card>
              </section>

              {/* Tour Booking Process */}
              <section id="tour-process" className="py-4">
                <Card>
                  <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">
                    Tour Booking Process
                  </h2>
                  <div className="prose">
                    <p>
                      Kong Collapse Top Adventure requires careful preparation. Please read the
                      booking steps below carefully:
                    </p>
                    <ol>
                      <li>
                        Review Tour Programs and Assess Your Fitness. Carefully examine tour
                        programs to ensure suitability for your fitness. Read{" "}
                        <a
                          href="https://junglebosstours.com/policy/cancellation-policy"
                          target="_blank"
                          rel="noopener"
                          className="text-primary underline"
                        >
                          Online Booking & Cancellation
                        </a>
                        .
                      </li>
                    </ol>
                  </div>
                </Card>
              </section>

              {/* Book Tour */}
              <BookingTour />

              {/* FAQs */}
              <section id="faqs" className="py-4">
                <Card className="space-y-4">
                  <h2 className="uppercase text-2xl font-bold text-gray-800">
                    Frequently Asked Question
                  </h2>

                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-semibold">01</span>
                          <span className="text-gray-900 font-semibold group-hover:text-primary transition-colors">
                            What should I notice during the tours?
                          </span>
                        </div>
                        <Chevron />
                      </summary>
                      <div className="mt-2 text-gray-700">
                        Be responsible for the environment… read the rules and survival guide.
                      </div>
                    </details>

                    <div className="h-px bg-gray-100" />

                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-semibold">06</span>
                          <span className="text-gray-900 font-semibold group-hover:text-primary transition-colors">
                            How to avoid thunderstorms & lightning during the tours?
                          </span>
                        </div>
                        <Chevron />
                      </summary>
                      <div className="mt-2 text-gray-700">
                        Prepare carefully; if entering a thunderstorm area, follow safety tips (see
                        Jungle Boss blog).
                      </div>
                    </details>
                  </div>
                </Card>
              </section>
            </div>
          </div>

          {/* Sticky pricing card - appears when scrolling */}
          <div className="hidden xl:block col-span-12 xl:col-span-4">
            <div
              className={`p-6 rounded-[8px] bg-white xl:space-y-4 max-md:space-y-4 xl:block md:flex md:justify-between sticky top-[84px] mt-[18px] transition-all duration-300 z-20 ${
                showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="text-gray-700 label-1">Price</div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="title-2 text-primary"> USD 35$/pax</div>
                  </div>
                </div>
              </div>
              <ButtonPrimary name="Book Tour" fullWidth href="#book-tour" />
            </div>

            {/* TOC - fade in khi scroll qua hero */}
            <nav
              id="sidebar-menu"
              className={`p-4 rounded-[8px] space-y-2 bg-[#34430f]/95 max-h-[calc(100vh-350px)] overflow-y-auto transition-all duration-300 sticky z-10 mt-4 ${
                showSidebar ? "top-[275px] opacity-100 visible" : "top-[84px] opacity-0 invisible"
              }`}
            >
              {sections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <div key={s.id}>
                    <Link
                      href={`#${s.id}`}
                      className={`block px-3 py-[6px] label-1 transition-colors duration-200 ${
                        isActive
                          ? "text-white bg-[#6C8A1F]/80 rounded-md font-semibold shadow-sm"
                          : "text-gray-100 hover:text-white hover:bg-[#6C8A1F]/50 rounded-md"
                      }`}
                    >
                      {s.label}
                    </Link>
                    <div className="h-px bg-[#34430f]/40 mt-1" />
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* Mobile price card - fixed ở dưới trên mobile */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-gray-700 text-sm">Price</div>
              <div className="title-2 text-primary text-xl font-semibold">USD 35$/pax</div>
            </div>
            <ButtonPhu name="Book Tour" href="#book-tour" />
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={tourImages}
      />
    </main>
  );
}
