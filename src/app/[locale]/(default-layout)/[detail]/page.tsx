"use client";
import Image from "next/image";
import { useState } from "react";

const TourDetail = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [participants, setParticipants] = useState(1);

  const tourData = {
    title: "Hanoi Exclusive Food Tour",
    description:
      "Ditch the guidebook for a night and discover the backstreets of Hanoi's old-quarter while visiting authentic mom n' pop eateries and passing by some of the city's most iconic sights. Make your own bánh mì, stroll through the city's largest wet market, and try over 10 dishes on this journey through Vietnamese cuisine and culture!",
    price: "$45 USD",
    duration: "4-6 hours",
    participants: "Up to 12 pax",
    service: "Vietnamese food, drink",
    departureDay: "Everyday",
    meetingPoint: "In tour detail",
    rating: "4.9/5",
    reviews: "500+ reviews",
    age: "Ages 4-15 (child pricing), 3 & under free",
    difficulty:
      "This walking food tour covers approximately 1.5 miles / 2.5 km. We recommend comfortable walking shoes as we'll explore the authentic backstreets and hidden corners of Hanoi's old quarter.",
    image: "/images/homePage/foodtour1.jpg",
  };

  const highlights = [
    {
      image: "/images/homePage/foodtour1.jpg",
      title: "Bánh Cuốn: Steamed Rice Rolls",
      description:
        "Meet Mrs. Xuan, the third-generation owner, and watch her steam rice sheets and roll them with minced pork, mushrooms, and secret seasonings.",
    },
    {
      image: "/images/homePage/teambuilding6.jpg",
      title: "Make Your Own Bánh Mì!",
      description:
        "Discover the fascinating story of bánh mì with a hands-on mini cooking class led by Mrs. Huyền, a seasoned local vendor.",
    },
    {
      image: "/images/homePage/teambuilding7.jpg",
      title: "Cháo Sườn Sụn: Creamy Rice Porridge",
      description:
        "Every Hanoian's favorite comfort food. Famous for its silky texture and nostalgic flavors, simmered all day in rich broth.",
    },
  ];

  return (
    <main>
      {/* Hero Section with Overlay Info */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image src={tourData.image} alt={tourData.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Left Side - Tour Info */}
            <div className="text-white space-y-6">
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 uppercase">{tourData.title}</h1>
                <p className="text-lg text-gray-200 leading-relaxed">{tourData.description}</p>
              </div>

              {/* Tour Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⏱</span>
                    <span>Duration</span>
                  </div>
                  <div className="text-white font-semibold">{tourData.duration}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">👥</span>
                    <span>Participant</span>
                  </div>
                  <div className="text-white font-semibold">{tourData.participants}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">🍽️</span>
                    <span>Service</span>
                  </div>
                  <div className="text-white font-semibold">{tourData.service}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">📅</span>
                    <span>Departure Day</span>
                  </div>
                  <div className="text-white font-semibold">{tourData.departureDay}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">📍</span>
                    <span>Meeting point</span>
                  </div>
                  <div className="text-white font-semibold">{tourData.meetingPoint}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span>Overall rating</span>
                  </div>
                  <div className="text-white font-semibold flex items-center space-x-2">
                    <span>{tourData.rating}</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-300">({tourData.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Difficulty */}
              <div className="bg-green-900/50 p-4 rounded-lg border border-green-700/50">
                <h3 className="text-yellow-400 font-semibold mb-2">Difficulty</h3>
                <p className="text-gray-200 text-sm">{tourData.difficulty}</p>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">{tourData.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Participants
                    </label>
                    <select
                      value={participants}
                      onChange={(e) => setParticipants(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total</span>
                      <span className="text-xl font-bold text-green-600">
                        VND {(800000 * participants).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Book Tour
                  </button>

                  <button className="w-full border border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    Book Private Tour
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>*Note: The price of private tour is higher than the listed price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Tour Details</h2>

            {/* Itinerary */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">What You&apos;ll Do</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-green-800">
                    4:30pm - Bánh Cuốn: Steamed Rice Rolls
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Meet Mrs. Xuan, the third-generation owner of this restaurant, and watch her
                    steam rice sheets and roll them with minced pork, mushrooms, and a secret blend
                    seasonings. Then learn why the dipping sauce and garnishes are the staple of
                    Vietnamese cuisine.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-blue-800">
                    5:15pm - Visit Long Biên Bridge & Hanoi&apos;s Central Market
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Hanoi&apos;s &quot;Horizontal Eiffel Tower&quot; was the first bridge to span
                    the Red River in Hanoi and was a groundbreaking engineering feat when
                    constructed by the French over 100 years ago. Stroll across the tracks to grab
                    some sunset pics, and then visit Hanoi&apos;s largest wet market to try some
                    street snacks.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-orange-800">
                    6:00pm - Make Your Own Bánh Mì!
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Discover the fascinating story of bánh mì with a hands-on mini cooking class led
                    by Mrs. Huyền, a seasoned local vendor. This is a unique opportunity to
                    personalize your sandwich with fresh, authentic ingredients while connecting to
                    the special people behind Hanoi&apos;s vibrant street food culture.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-purple-800">
                    6:45pm - Cháo Sườn Sụn: Creamy Rice Porridge
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    This is every Hanoian&apos;s favorite comfort food. Famous for its silky texture
                    and nostalgic flavors, this beloved eatery simmers their porridge all day in a
                    rich broth, and serves each bowl with a variety of toppings (and a side of
                    childhood memories).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-red-800">
                    7:30pm - Chả Cá: Grilled Turmeric Fish & Chè Dessert
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Prepared directly on your table, marinated fish is cooked in a sizzling pan with
                    fresh dill and green onions, then enjoyed with rice noodles and a unique dipping
                    sauce. We&apos;ll finish with Chè, a traditional Vietnamese dessert, and a
                    premium cocktail at a speakeasy bar.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">What&apos;s Included</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-4 text-green-800 flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Included
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Far more than a meal&apos;s worth of food (10+ dishes)</li>
                    <li>• Local beer and soft drinks throughout the tour</li>
                    <li>• Premium cocktail at a speakeasy bar</li>
                    <li>• Hands-on bánh mì cooking class</li>
                    <li>• Local market visit with street snacks</li>
                    <li>• English-speaking local food guide</li>
                    <li>• Small group experience (2-12 people)</li>
                    <li>• Cultural insights and food stories</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-4 text-red-800 flex items-center">
                    <span className="text-red-600 mr-2">✗</span>
                    Not included
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Hotel pickup and drop-off</li>
                    <li>• Gratuities for guide (optional)</li>
                    <li>• Personal expenses</li>
                    <li>• Additional drinks beyond what&apos;s included</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What to Bring */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">What to Bring</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
                  <li>• Comfortable walking shoes (we&apos;ll walk ~1.5 miles)</li>
                  <li>• Camera for food photos and sunset shots</li>
                  <li>• Light jacket (evenings can be cool)</li>
                  <li>• Umbrella (if rain is possible)</li>
                  <li>• Appetite - come hungry!</li>
                  <li>• Open mind for new flavors</li>
                  <li>• Cash for any additional purchases</li>
                </ul>
              </div>
            </div>

            {/* Dietary Accommodations */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Dietary Accommodations</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-4">
                  We can accommodate various dietary requirements when communicated at time of
                  booking. All requests must be made in advance as same-day requests cannot be
                  guaranteed.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-800">We Can Accommodate:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Vegetarian</li>
                      <li>• Gluten Free</li>
                      <li>• Dairy Free</li>
                      <li>• No Spicy</li>
                      <li>• No Nuts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-800">Please Note:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Vietnamese cuisine features fish sauce</li>
                      <li>• Vegan options are extremely limited</li>
                      <li>• Cross-contamination may occur</li>
                      <li>• Not recommended for severe allergies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Reviews</h2>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-green-600 mb-2">{tourData.rating}</div>
              <div className="flex justify-center items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <div className="text-gray-600">Based on {tourData.reviews}</div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  rating: 5,
                  comment:
                    "Amazing experience! The cave swimming was incredible and the guides were very professional and safety-conscious.",
                  date: "2 weeks ago",
                  avatar: "/images/homePage/teambuilding1.jpg",
                },
                {
                  name: "Mike Chen",
                  rating: 5,
                  comment:
                    "Perfect day trip! The BBQ lunch by the stream was delicious and the whole experience was well organized.",
                  date: "1 month ago",
                  avatar: "/images/homePage/teambuilding2.jpg",
                },
                {
                  name: "Emma Wilson",
                  rating: 5,
                  comment:
                    "Unforgettable adventure! Swimming through the cave was magical and the guides made us feel completely safe.",
                  date: "3 weeks ago",
                  avatar: "/images/homePage/teambuilding3.jpg",
                },
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{review.name}</div>
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">&quot;{review.comment}&quot;</p>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Tour Cancellation Policy</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Cancellation Policy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Full Refund:</strong> Reservations cancelled 24 hours or more before
                    your tour start time are fully refundable (100% refund).
                  </li>
                  <li>
                    • <strong>No Refund:</strong> Bookings canceled within 24 hours notice are not
                    refundable.
                  </li>
                  <li>
                    • <strong>Rescheduling:</strong> If you would like to reschedule your tour with
                    less than 24 hours notice, we will charge 50% of your total since we are unable
                    to fill your spots at short notice.
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Important Information</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>
                    • <strong>Group Size:</strong> Minimum 2 people, maximum 12 people per tour for
                    an intimate experience.
                  </li>
                  <li>
                    • <strong>Weather Policy:</strong> Tours run rain or shine. In extreme weather
                    conditions, we will provide full refund.
                  </li>
                  <li>
                    • <strong>Dietary Requirements:</strong> Must be communicated at time of
                    booking. Same-day requests cannot be guaranteed.
                  </li>
                  <li>
                    • <strong>Meeting Point:</strong> Exact location details will be sent
                    immediately after booking confirmation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Question</h2>

            <div className="space-y-4">
              {[
                {
                  question: "How much food and drink will I get?",
                  answer:
                    "This is not a tasting tour - you should come hungry! You will get more than a full meal of food with 10+ dishes. We also provide local beer, soft drinks, and bottled water throughout the tour, plus a specialty cocktail at a speakeasy bar. If you need more food, just let your guide know.",
                },
                {
                  question: "Will I need to walk very far?",
                  answer:
                    "This is a walking tour covering about 1.5 miles / 2.5 km by foot, so we recommend comfortable walking shoes. The distance is split between 5+ stops, so it's roughly a 5-10 minute walk between each stop - a great chance to digest before the next stop!",
                },
                {
                  question: "Where does the tour start and end?",
                  answer:
                    "The tour starts at 4:30pm at our first restaurant located on the north boundary of Hanoi's old-quarter. You'll get the exact address immediately after booking. Our last stop is on the south boundary of the old-quarter with plenty of options to continue exploring.",
                },
                {
                  question: "What if it's raining or there is inclement weather?",
                  answer:
                    "All of our tours are rain-or-shine, so dress for the weather. If rain is possible, bring an umbrella and shoes that can get wet. In rare cases of extreme weather, your guide will cancel the tour and provide a full refund.",
                },
                {
                  question: "Can I book a private tour?",
                  answer:
                    "Yes! This food tour can be booked privately for yourself or for groups/special occasions. We've hosted birthdays, corporate events, and more. Private tours with 8+ people typically won't incur an extra fee. Contact us directly to arrange!",
                },
                {
                  question: "What ages qualify for child pricing?",
                  answer:
                    "Child pricing is valid for ages 4-15. Children ages 3 and under are free. Our tours are family-friendly and we can adjust the experience for younger guests.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                  <h4 className="font-medium mb-3 text-gray-800">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Start Your Next Adventure Tour
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Do Quyen Waterfall Zipline Experience",
                  duration: "1 day",
                  price: "VND 1,200,000",
                  image: "/images/homePage/teambuilding1.jpg",
                },
                {
                  title: "Phong Huong Adventure 1D",
                  duration: "1 day",
                  price: "VND 900,000",
                  image: "/images/homePage/teambuilding2.jpg",
                },
                {
                  title: "Elephant Cave & Ma Da Valley Jungle Trek 1D",
                  duration: "1 day",
                  price: "VND 800,000",
                  image: "/images/homePage/teambuilding3.jpg",
                },
                {
                  title: "Phong Huong Excursion 2D1N",
                  duration: "2 days",
                  price: "VND 1,800,000",
                  image: "/images/homePage/teambuilding4.jpg",
                },
              ].map((tour, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 text-gray-800 line-clamp-2">
                      {tour.title}
                    </h3>
                    <div className="text-xs text-gray-600 mb-2">{tour.duration}</div>
                    <div className="font-bold text-green-600">{tour.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TourDetail;
