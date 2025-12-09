import React, { useEffect, useRef, useState } from "react";
import { MapPin, Star } from "lucide-react";

const featuredHotels = [
  {
    id: 1,
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    price: 399,
    tag: "Best Seller",
  },
  {
    id: 2,
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    price: 299,
  },
  {
    id: 3,
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    price: 249,
    tag: "Best Seller",
  },
  {
    id: 4,
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    price: 199,
  },
];

// Reusable fade-up hook
function useFadeUp() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function FeaturedHotels() {
  const viewAllHotels = () => {
    window.location.href = "/rooms";
  }
  return (
    <section className="py-20 bg-[#f5f7fa] relative z-0">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl font-semibold text-neutral-900">
          Featured Destination
        </h2>
        <p className="mt-3 text-neutral-500 max-w-2xl mx-auto">
          Discover our handpicked selection of exceptional properties around the
          world, offering unparalleled luxury and unforgettable experiences.
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredHotels.map((hotel, index) => {
            const [ref, visible] = useFadeUp();

            return (
              <div
                key={hotel.id}
                ref={ref}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-500 transform 
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.title}
                    className="h-48 w-full object-cover rounded-t-2xl"
                  />

                  {hotel.tag && (
                    <span className="absolute top-3 left-3 bg-white text-black text-xs px-3 py-1 rounded-full shadow">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {hotel.title}
                  </h3>

                  <div className="flex items-center text-neutral-500 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {hotel.address}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xl font-semibold text-neutral-900">
                      ₹{hotel.price}
                      <span className="text-sm text-neutral-500">/night</span>
                    </p>

                    <div className="flex items-center text-orange-500">
                      <Star size={16} />
                      <span className="ml-1 text-sm font-medium">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2 border rounded-xl border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition">
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Hotels Button */}
        <div className="mt-12">
          <button onClick={viewAllHotels} className="px-8 py-3 bg-black text-white text-lg rounded-xl hover:bg-neutral-800 transition">
            View All Hotels
          </button>
        </div>

      </div>
    </section>
  );
}
