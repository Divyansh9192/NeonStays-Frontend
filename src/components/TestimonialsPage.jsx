import React from "react";
import InfiniteTestimonialCards from "./InfiniteTestimonialCards";

export default function TestimonialsPage() {
  return (
    <>
      <div className="w-full min-h-screen bg-[#f5f7fa] pt-5 pb-24">
        <div className="w-full max-w-4xl mx-auto my-20">
          <div className="h-px bg-neutral-300/50"></div>
        </div>

        {/* Top Section Heading */}
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-5xl font-semibold text-neutral-900">
            What Our Guests Say
          </h1>
          <p className="mt-4 text-neutral-500 text-lg leading-relaxed">
            Discover why discerning travelers consistently choose NeonStay for
            their exclusive and luxurious accommodations around the world.
          </p>
        </div>

        {/* Testimonial Cards Section */}
        <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                className="w-14 h-14 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">Emma Rodriguez</h3>
            </div>

            <div className="flex mt-3 text-orange-500 space-x-1">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              "I've used many booking platforms before, but none compare to the
              personalized experience and attention to detail that NeonStays
              provides. Their curated selection of hotels is unmatched."
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-14 h-14 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">Liam Johnson</h3>
            </div>

            <div className="flex mt-3 text-orange-500 space-x-1">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              "The booking experience was seamless, and the level of luxury
              exceeded expectations. NeonStays’s attention to detail is evident
              in every stay."
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-14 h-14 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">Sophia Lee</h3>
            </div>

            <div className="flex mt-3 text-orange-500 space-x-1">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              "NeonStays provides some of the most luxurious stays I've ever
              experienced. Every property felt handpicked, and the service was
              flawless."
            </p>
          </div>
        </div>

        {/* ⬇️ InfiniteFramerCard goes here */}
        <div className="max-w-7xl mx-auto mt-28 px-6">
          <InfiniteTestimonialCards />
        </div>
      </div>
    </>
  );
}
