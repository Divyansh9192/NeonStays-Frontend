import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wine, Compass, Music, Moon, ArrowRight, Play } from 'lucide-react';

// --- Shared Components (Consistency) ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Main Page ---

export default function ExperiencePage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { id: 0, title: "Culinary", desc: "Michelin-star private dining.", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" },
    { id: 1, title: "Wellness", desc: "Spas hidden in nature.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Adventure", desc: "Helicopter tours & diving.", image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop" },
    { id: 3, title: "Nightlife", desc: "Exclusive rooftop access.", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1740&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-[#050507] min-h-screen text-white font-sans overflow-x-hidden selection:bg-purple-500/30">

      {/* --- Hero Section --- */}
      <section className="relative h-[90vh] flex items-center px-6 md:px-20 overflow-hidden">
        {/* Dynamic Background Image based on hover could go here, currently static dark video vibe */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=2000&auto=format&fit=crop"
            alt="Experience Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mt-20">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-purple-500"></span>
              <span className="text-purple-400 text-xs uppercase tracking-[0.3em]">Curated Moments</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
              Life, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Unscripted.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-10">
              We don't just offer a place to sleep. We provide the keys to the city's best kept secrets.
            </p>
            
            <div className="flex items-center gap-6">
              <button className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                <Play className="w-4 h-4 fill-current" /> 
                <span className="text-sm font-medium">Watch Film</span>
              </button>
              <span className="text-xs text-gray-500 tracking-widest uppercase">01:45 min</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- Interactive Slider Section --- */}
      <section className="py-20 relative z-20 -mt-20 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id}
              onMouseEnter={() => setActiveCategory(cat.id)}
              className={`relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-white/10 group ${activeCategory === cat.id ? 'md:col-span-2' : 'md:col-span-1 opacity-60 hover:opacity-100'}`}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: activeCategory === cat.id ? 'auto' : 0, opacity: activeCategory === cat.id ? 1 : 0 }}
                    className="overflow-hidden"
                >
                    <p className="text-gray-300 text-sm">{cat.desc}</p>
                    <button className="mt-4 text-xs uppercase tracking-widest border-b border-white pb-1">Explore</button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Feature: Concierge --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute right-0 top-20 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <FadeIn>
                <div className="relative">
                    <div className="absolute -inset-4 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-black relative z-10">
                        <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop" 
                            alt="Concierge" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
            </FadeIn>

            <FadeIn delay={0.2}>
                <div className="flex items-center gap-2 mb-4">
                    <Moon className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 text-xs uppercase tracking-widest">Neon Concierge</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Whatever you need.<br />Whenever you need it.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    Forget scrolling through reviews. Our local experts curate your itinerary based on your mood. From securing last-minute reservations at booked-out venues to arranging private jet transfers.
                </p>
                
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                    <div>
                        <h4 className="text-white font-bold text-lg">24/7</h4>
                        <p className="text-sm text-gray-500">Support Access</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg">100%</h4>
                        <p className="text-sm text-gray-500">Discretion</p>
                    </div>
                </div>
            </FadeIn>
        </div>
      </section>

      {/* --- Iconic Activities Grid --- */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
            <FadeIn>
                <h2 className="text-3xl font-bold mb-12">Signature Experiences</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Wine, title: "The Sommelier's Vault", price: "From $400/pp" },
                    { icon: Compass, title: "Private Yacht Charter", price: "From $1200/day" },
                    { icon: Music, title: "Backstage VIP Access", price: "Invite Only" },
                ].map((item, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1}>
                        <div className="group p-8 bg-[#0A0A0C] border border-white/5 hover:border-purple-500/30 rounded-xl transition-all duration-300 hover:-translate-y-2">
                            <item.icon className="w-8 h-8 text-gray-400 group-hover:text-purple-400 mb-6 transition-colors" />
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <div className="flex justify-between items-center mt-8">
                                <span className="text-xs text-gray-500 uppercase tracking-wider">{item.price}</span>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10" />
        <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Taste the extraordinary.</h2>
            <p className="text-gray-400 mb-10">Access is limited. Experiences are limitless.</p>
            <button className="px-10 py-4 border border-white/20 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-300">
                View Experience Calendar
            </button>
        </FadeIn>
      </section>

       {/* Simple Footer Links */}
       <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-sm bg-[#050507]">
        <p>&copy; 2025 NeonStays. Defined by Luxury.</p>
      </footer>
    </div>
  );
}