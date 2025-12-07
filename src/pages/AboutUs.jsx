import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Shield, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Components ---

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 w-full h-[88px] flex items-center justify-between px-10 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
//       {/* Logo */}
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//           <div className="w-3 h-3 bg-black rounded-full" />
//         </div>
//         <span className="text-white font-bold text-xl tracking-widest font-sans">NEONSTAYS</span>
//       </div>

//       {/* Links */}
//       <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
//         <a href="#" className="hover:text-white transition-colors">Home</a>
//         <a href="#" className="hover:text-white transition-colors">Hotels</a>
//         <a href="#" className="hover:text-white transition-colors">Experience</a>
//         <a href="#" className="text-white border-b border-white pb-1">About</a>
//       </div>

//       {/* Actions */}
//       <div className="flex items-center gap-4">
//         <button className="px-6 py-2 rounded-full border border-white/30 text-white text-sm hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md">
//           Dashboard
//         </button>
//         <button className="px-6 py-2 rounded-lg bg-[#111] text-white text-sm hover:bg-black border border-transparent hover:border-gray-800 transition-all duration-300">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  const navigate = useNavigate();
    const handleMainPageNavigation = () => {    
    navigate("/");
    window.scrollTo(0, 0);  
    };
  return (
    <div className="bg-[#050507] min-h-screen text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* --- Hero Section --- */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-cyan-400 mb-6 backdrop-blur-md"
          >
            The Future of Hospitality
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500"
          >
            Beyond <br /> Accommodation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            We curate the world's most exclusive stays, blending modern
            technology with timeless luxury to create unforgettable gateways.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent opacity-50" />
        </motion.div>
      </section>

      {/* --- Our Story (Split Layout) --- */}
      <section className="py-32 relative px-6 md:px-20 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Crafting the <span className="text-cyan-400">Neon</span> Standard
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Founded in 2024, NeonStays began with a simple question: Why does
              booking luxury feel so archaic? We stripped away the noise to
              build a platform that feels as elegant as the destinations we
              serve.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              From hidden villas in Bali to penthouse suites in New York, every
              property is hand-picked. We don't just offer beds; we offer
              experiences illuminated by comfort and design.
            </p>
            <button className="group flex items-center gap-2 text-white font-medium border-b border-white/30 pb-1 hover:border-white transition-all">
              Read our full manifesto{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay z-10" />
              {/* Placeholder for an interior image - using a colored div for demo */}
              <div className="w-full h-full bg-gray-900 border border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Interior"
                  className="object-cover w-full h-full opacity-60 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Values (Glass Cards) --- */}
      <section className="py-32 bg-black/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <h2 className="text-4xl font-bold max-w-md">
                Designed for the <br />
                Discerning Traveler
              </h2>
              <p className="text-gray-500 mt-4 md:mt-0 max-w-xs text-right">
                Our core pillars define every decision we make.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: "Curated Luxury",
                desc: "We reject 98% of properties. Only the absolute best make it to NeonStays.",
              },
              {
                icon: Shield,
                title: "Seamless Privacy",
                desc: "Your data and your stay are protected by industry-leading security protocols.",
              },
              {
                icon: MapPin,
                title: "Global Access",
                desc: "Unlock doors in 45+ countries with a single membership pass.",
              },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-cyan-200" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Stats / Big Typography --- */}
      <section className="py-40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: "Destinations", value: "120+" },
            { label: "Travelers", value: "45k" },
            { label: "Countries", value: "42" },
            { label: "Rating", value: "4.9" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <h3 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700">
                {stat.value}
              </h3>
              <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- Team / Culture --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">
              The Architects of Experience
            </h2>
            <p className="text-gray-400">
              A diverse team of explorers, designers, and concierges.
            </p>
          </div>
        </FadeIn>

        <div className="flex justify-center">
          <FadeIn delay={0.1}>
            <div className="relative group overflow-hidden rounded-xl aspect-[3/4] w-80 md:w-96">
              <img
                src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop"}
                alt="Team Member"
                className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold">Divyansh Deep</p>
                <p className="text-cyan-400 text-xs uppercase tracking-wider">
                  Founder
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="py-32 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-white/20" />
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to disappear?
          </h2>
          <button
            onClick={handleMainPageNavigation}
            className="px-10 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
          >
            Start Your Journey
          </button>
        </FadeIn>
      </section>

      {/* Simple Footer Links */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>&copy; 2025 NeonStays. Defined by Luxury.</p>
      </footer>
    </div>
  );
}
