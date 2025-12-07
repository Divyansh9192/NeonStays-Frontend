import { HomeIcon } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f8fc] pt-24 pb-10 mt-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center">
            <div className="bg-white  text-black p-1.5 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <HomeIcon size={22} fill="currentColor" strokeWidth={0} />
            </div>
            <span
              className={`text-2xl  font-bold tracking-wider text-white}
          `}
            >
              NEONSTAYS
            </span>
          </div>

          <p className="text-neutral-500 mt-4 leading-relaxed">
            Discover the world’s most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>

          <div className="flex gap-4 mt-6 text-neutral-700 text-xl">
            <i className="ri-instagram-line"></i>
            <i className="ri-facebook-fill"></i>
            <i className="ri-twitter-x-line"></i>
            <i className="ri-linkedin-fill"></i>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-neutral-600">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Partners</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-neutral-600">
            <li>Help Center</li>
            <li>Safety Information</li>
            <li>Cancellation Options</li>
            <li>Contact Us</li>
            <li>Accessibility</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-neutral-600 mb-4">
            Subscribe to our newsletter for travel inspiration and special
            offers.
          </p>

          <div className="flex items-center w-full">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-l-lg border border-neutral-300 bg-white w-full outline-none"
            />
            <button className="bg-black text-white px-4 py-3 rounded-r-lg">
              ➜
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-14 pt-6 border-t border-neutral-300/50 flex flex-col md:flex-row justify-between text-neutral-500 text-sm">
        <p>© 2025 NeonStay. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
