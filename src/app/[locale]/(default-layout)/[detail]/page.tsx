// app/tours/[slug]/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

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
        <details key={it.title} className="border-b border-gray-200 pb-3 group">
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

export default function TourDetailPage() {
  useSmoothScroll();

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

  // optional: Intersection to highlight current item later if cần
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="tour-detail">
      {/* Hero */}
      <section>
        <div className="relative h-[300px] md:h-[500px]">
          <Image
            src="https://cms.junglebosstours.com/assets/d4cfa964-da02-47f0-9033-77366d447a38?format=webp"
            alt="Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </section>

      <section className="relative bg-gray-100">
        <div ref={containerRef} className="container mx-auto grid grid-cols-12 md:gap-x-8">
          {/* Left content */}
          <div className="col-span-12 xl:col-span-8">
            {/* Green area */}
            <div
              id="green-area"
              className="bg-green-800 py-8 md:py-11 lg:py-16 space-y-6 lg:space-y-8"
            >
              <div className="space-y-2">
                <h1 className="text-white uppercase text-2xl md:text-3xl font-bold">
                  Kong Collapse Top Adventure 5D4N
                </h1>
                <p className="text-gray-50">
                  The 05-day, 04-night journey to conquer Kong collapse will take you on an
                  adventurous and challenging expedition. This is one of the
                </p>
              </div>

              <div className="h-px bg-primary/70" />

              <div className="md:flex lg:space-x-16 md:space-x-11 space-y-4 md:space-y-0">
                <div className="space-y-4 md:w-1/2">
                  <InfoRow label="Duration" value="5 days 4 nights" />
                  <InfoRow label="Participant" value="Up to 10 pax" />
                  <InfoRow label="Departure Day" value="Tuesday, Friday" />
                </div>
                <div className="flex-grow space-y-4">
                  <InfoRow label="Meeting point" value="Jungle Boss Office" />
                  <InfoRow
                    label="Overall rating"
                    value={
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">4.9/5</span>
                        <span className="text-gray-50">(1015 reviews)</span>
                      </div>
                    }
                  />
                  <InfoRow label="Age" value="From 16 years old" />
                </div>
              </div>

              <p className="md:w-1/2 text-gray-50">
                This is a strenuous adventure. You will be required to provide a health statement
                report and undergo a health check conducted by Jungle Boss Medical Experts before
                departure.
              </p>
            </div>

            {/* Highlight */}
            <section id="highlight" className="py-8 md:py-11 xl:py-16 space-y-6 lg:space-y-8">
              <Card className="space-y-4">
                <Feature
                  iconUrl="https://cms.junglebosstours.com/assets/ba8628fe-d8fb-4565-b10c-3752e0e1f7ae"
                  text={
                    <>
                      This expedition leads you into the depth of the primary jungle where you will
                      explore the whole system of Tiger Cave including Kong sinkhole, Pygmy cave,
                      hang Over cave and Tiger cave.
                    </>
                  }
                />
                <Feature
                  iconUrl="https://cms.junglebosstours.com/assets/8609130e-5738-43a2-82b4-0da7d95f7bcb"
                  text={
                    <>
                      Experience camping amidst the cave&#39;s natural surroundings, adjacent to the
                      plantation inside.
                    </>
                  }
                />
                <Feature
                  iconUrl="https://cms.junglebosstours.com/assets/32c23792-c5d3-40e4-b52f-393760ba7a3d"
                  text={
                    <>
                      You will be one of the very first people to step into this untouched
                      underground secret.
                    </>
                  }
                />
              </Card>
            </section>

            {/* Tour Details (Accordion) */}
            <section id="tour-detail" className="py-8 md:py-11 xl:py-16 space-y-6 lg:space-y-8">
              <Card className="space-y-6">
                <h2 className="uppercase text-2xl font-bold text-gray-800">Tour Details</h2>
                <Accordion
                  items={[
                    {
                      title: "Food",
                      content: (
                        <div className="prose">
                          <p>
                            Meals on the tour are freshly cooked by Jungle Boss Chef & Porter Team.
                            The food is fresh and healthy. Example menu (seasonal changes apply):
                          </p>
                          <ul>
                            <li>
                              <strong>Breakfast:</strong> Noodles, pancakes, fruit
                            </li>
                            <li>
                              <strong>Lunch:</strong> Fresh spring rolls… (veg options available)
                            </li>
                            <li>
                              <strong>Dinner:</strong> Steamed rice, beef soup, tuna stew, pork
                              ribs, eggs, chicken, vegetables…
                            </li>
                          </ul>
                        </div>
                      ),
                    },
                    {
                      title: "GETTING TO PHONG NHA",
                      content: (
                        <div className="space-y-4">
                          <div>
                            <div className="title-2 text-gray-900">The Area</div>
                            <div className="mt-2">
                              <Image
                                src="https://cms.junglebosstours.com/assets/5f106623-cac7-47fb-a778-51e3a24ac1cb?width=800&height=533"
                                alt="Map QB"
                                width={800}
                                height={533}
                                className="rounded-md w-full h-auto"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="title-2 text-gray-900">Logistics</div>
                            <div className="prose">
                              <h3>Travel options to Phong Nha</h3>
                              <p>Private cars, sleeping bus, train, or flights.</p>
                              <h3>Flights</h3>
                              <p>
                                Land at Dong Hoi airport (~40km South). Use Jungle Boss private car
                                or taxi.
                              </p>
                              <h3>Train</h3>
                              <p>
                                Arrive at Dong Hoi station. Options: private car, taxi, or Dong Hoi
                                – Phong Nha bus (hourly).
                              </p>
                              <h3>Sleeping buses</h3>
                              <p>Multiple routes (Hue, Da Nang, Ninh Binh, Ha Noi…).</p>
                            </div>
                          </div>
                          <div>
                            <div className="title-2 text-gray-900">Transfers</div>
                            <p>
                              FREE 2-way transportation within Phong Nha and Dong Hoi before and
                              after the tour.
                            </p>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </Card>
            </section>

            {/* Photos */}
            <section id="photos" className="py-8 md:py-11 xl:py-16 space-y-6 lg:space-y-8">
              <Card>
                <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Photos</h2>
                <div className="grid grid-cols-6 gap-1 md:gap-4 cursor-pointer">
                  <div className="relative col-span-6 aspect-[2/1] overflow-hidden rounded-md">
                    <Image
                      src="https://cms.junglebosstours.com/assets/79f3cfd7-fe10-4663-99d9-4fb52d03ee10?format=webp&width=1110&quality=100"
                      alt="Photo hero"
                      fill
                      sizes="(min-width: 1024px) 1110px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {[
                    "https://cms.junglebosstours.com/assets/caa85d0d-e5c4-49a2-8d58-6e0c41199a70?format=webp&width=360&quality=100",
                    "https://cms.junglebosstours.com/assets/a0746f1c-3a2b-4b43-8984-908effa6af26?format=webp&width=360&quality=100",
                    "https://cms.junglebosstours.com/assets/654f2cb7-e017-4478-a7bb-7ae68042e38e?format=webp&width=360&quality=100",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-md"
                    >
                      <Image
                        src={src}
                        alt={`Photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                    </div>
                  ))}

                  <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src="https://cms.junglebosstours.com/assets/1e2c666f-f6ec-4b1c-a4f1-77a12cf97394?format=webp&width=543&quality=100"
                      alt="Photo 4"
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                  <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src="https://cms.junglebosstours.com/assets/5dd98fe6-3737-4724-86b0-af08f78aed79?format=webp&width=543&quality=100"
                      alt="Photo 5"
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black/40 grid place-items-center">
                      <div className="text-white text-3xl md:text-4xl font-bold">+4</div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Tour Booking Process */}
            <section id="tour-process" className="py-8 md:py-11 xl:py-16">
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
                      Review Tour Programs and Assess Your Fitness. Carefully examine tour programs
                      to ensure suitability for your fitness. Read{" "}
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
            <section id="book-tour" className="py-8 md:py-11 xl:py-16">
              <Card className="space-y-4">
                <h2 className="uppercase text-2xl font-bold text-gray-800">Book Tour lih</h2>
                <div className="rounded-[8px] bg-gray-50 md:flex md:gap-6 p-3 md:p-6">
                  {/* Calendar mock (static from input) */}
                  <div className="md:w-1/2 bg-white p-4 rounded-[8px] relative">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-900 font-semibold">August 10, 2025</div>
                      </div>
                      {/* Rút gọn lưới cho demo */}
                      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-700">
                        {Array.from({ length: 31 }).map((_, i) => (
                          <div
                            key={i}
                            className={[
                              "aspect-square border border-gray-100 grid place-items-center rounded-sm",
                              i + 1 === 12 ? "bg-primary/10 border-primary" : "",
                              [
                                1, 2, 3, 4, 6, 7, 9, 10, 11, 13, 14, 16, 17, 18, 20, 21, 23, 24, 25,
                                27, 28, 30, 31,
                              ].includes(i + 1)
                                ? "opacity-50 pointer-events-none text-gray-400"
                                : "",
                            ].join(" ")}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-gray-700 text-sm">Availability</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking summary */}
                  <div className="flex-1 flex flex-col justify-between gap-4 mt-4 md:mt-0">
                    <div className="space-y-4">
                      <div className="text-gray-900 text-sm">Tue, August 12, 2025</div>
                      <label className="inline-flex items-center gap-2 px-4 py-1 rounded border border-primary w-fit">
                        <input type="radio" name="slot" defaultChecked />
                        <span className="text-sm">All day</span>
                        <span className="w-1 h-1 bg-gray-900 rounded-full" />
                        <span className="text-sm text-gray-900">10 Available</span>
                      </label>

                      <div className="text-gray-900 font-semibold">
                        Select Number of Participants *
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">Participant</div>
                        <div className="text-sm">1</div>
                        <div className="text-sm">VND 35,000,000/pax</div>
                      </div>

                      <div className="h-px bg-gray-100" />
                      <div className="flex items-center justify-between">
                        <div className="text-gray-900 font-semibold">Total</div>
                        <div className="text-primary font-medium">VND 35,000,000</div>
                      </div>
                    </div>

                    <button className="btn btn-solid mt-4 md:mt-0 w-full rounded-md bg-primary text-white py-3 font-medium">
                      Book Now
                    </button>
                  </div>
                </div>

                <p className="text-primary text-sm">
                  *Please note: This product is on request. We will confirm availability within the
                  shortest possible time after we receive your order.
                </p>
              </Card>
            </section>

            {/* FAQs */}
            <section id="faqs" className="py-8 md:py-11 xl:py-16">
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

          {/* Right sidebar */}
          <aside className="col-span-12 xl:col-span-4 xl:pt-16 xl:pl-8 sticky top-[84px] h-fit space-y-4 pb-8">
            <Card className="flex items-center justify-between md:flex-row gap-4">
              <div>
                <div className="text-gray-700 text-sm">Price</div>
                <div className="title-2 text-primary text-xl font-semibold">VND 35,000,000/pax</div>
              </div>

              <Link
                href="#book-tour"
                className="inline-flex items-center justify-center rounded-md bg-primary text-white px-5 py-3 font-medium"
              >
                Book Tour
              </Link>
            </Card>

            <nav
              id="sidebar-menu"
              className="p-4 rounded-[8px] space-y-2 bg-green-600/90 max-h-[calc(100vh-255px-80px-32px)] overflow-y-auto"
            >
              {sections.map((s) => (
                <div key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    className="block px-3 py-[6px] text-gray-100 label-1 hover:text-white"
                  >
                    {s.label}
                  </Link>
                  <div className="h-px bg-green-700" />
                </div>
              ))}
            </nav>
          </aside>
        </div>
      </section>
    </main>
  );
}

// ------ Tiny UI atoms ------
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[8px] bg-white p-3 md:p-4 lg:p-6 ${className}`}>{children}</div>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode | string }) {
  return (
    <div className="flex items-center gap-3">
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
