"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export const testimonials = [
  { 
    id: 1,
    name: "Emma Rodriguez",
    address: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that NeonStays provides."
  },
  { 
    id: 2,
    name: "Liam Johnson",
    address: "New York, USA",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 4,
    review: "NeonStays exceeded my expectations. The booking process was seamless, and the hotels were absolutely top-notch. Highly recommended!"
  },
  { 
    id: 3,
    name: "Sophia Lee",
    address: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review: "Amazing service! I always find the best luxury accommodations through NeonStays. Their recommendations never disappoint!"
  },

  // ⭐ NEW TESTIMONIALS (added now)
  { 
    id: 4,
    name: "Oliver Martinez",
    address: "Buenos Aires, Argentina",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200",
    rating: 5,
    review: "NeonStays helped me find the perfect romantic getaway. The hotel was stunning, and the service was world-class. Will definitely book again!"
  },
  { 
    id: 5,
    name: "Ava Thompson",
    address: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=200",
    rating: 4,
    review: "I love how easy it is to explore luxury hotels on NeonStays. The interface is clean and beautiful, and the recommendations feel curated."
  },
  { 
    id: 6,
    name: "Noah Williams",
    address: "London, United Kingdom",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    rating: 5,
    review: "The attention to detail is unmatched. NeonStays has changed the way I book hotels forever — premium experience from start to finish!"
  }
];

export default function InfiniteTestimonialCards({ speed = 60 }) {
  const baseX = useRef(0);
  const containerRef = useRef(null);

  useAnimationFrame((t, delta) => {
    if (!containerRef.current) return;

    const totalWidth = containerRef.current.scrollWidth / 2;

    baseX.current -= (speed * delta) / 1000;

    if (baseX.current <= -totalWidth) {
      baseX.current = 0;
    }

    containerRef.current.style.transform = `translateX(${baseX.current}px)`;
  });

  return (
    <div className="overflow-hidden w-full py-10 bg-[#0f0f0f]">
      <div
        ref={containerRef}
        className="flex gap-6 w-max will-change-transform"
      >
        {[...testimonials, ...testimonials].map((item, i) => (
          <div
            key={i}
            className="w-[350px] shrink-0 rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.address}</p>
              </div>
            </div>

            <div className="flex mt-3">
              {Array.from({ length: item.rating }).map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>

            <p className="mt-4 text-gray-700">{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
