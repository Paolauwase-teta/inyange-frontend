"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import OnboardingGuide from './components/OnboardingGuide';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 }
  }
};

const PATH_D_SERVICES =
  "M 180 120 C 350 120, 350 120, 480 120 C 600 120, 750 120, 820 120 C 950 120, 950 320, 820 320 C 700 320, 600 320, 480 320 C 350 320, 150 320, 180 320 C 50 320, 50 520, 340 520 C 450 520, 500 520, 660 520";

// SVG viewBox dimensions for references if needed
const VB_W_REF = 900;
const VB_H_REF = 340;

// Milestone and Service interfaces
interface Milestone {
  id: number;
  label: string;
  year: string;
  title: string;
  description: string;
}

interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  number: string;
}

const HERO_SLIDES = [
  {
    video: "/videos/milkpouring.mp4",
    giantText: "INYANGE INDUSTRIES",
    tagline: "Premium Dairy & Beverages",
    heading: "PURITY IN EVERY DROP",
    cardTitle: "Crafted for Quality",
    cardText: "We transform the finest ingredients into refreshing dairy and beverage products your family can trust."
  },
  {
    video: "/videos/cooking.mp4",
    giantText: "EVERYDAY MEALS",
    tagline: "Versatile Ingredients",
    heading: "ELEVATE YOUR COOKING",
    cardTitle: "Perfect for Every Recipe",
    cardText: "From breakfast to baking, our products are the perfect companion to use in your everyday meals."
  }
];

const FEATURED_RECIPES = [
  { title: 'French Onion Soup', image: '/food/recipe_soup.png', desc: 'Delicious classic comfort', stats: { prep: '1h', serves: '4', skill: 'Easy' } },
  { title: 'Chicken Corn Chowder', image: '/food/recipe_chowder.png', desc: 'Creamy and hearty delight', stats: { prep: '30m', serves: '6', skill: 'Easy' } },
  { title: 'Lemon Basil Fish', image: '/food/recipe_fish.png', desc: 'Fresh and zesty grilled fillet', stats: { prep: '20m', serves: '2', skill: 'Medium' } },
  { title: 'Classic Banana Bread', image: '/food/recipe_bread.png', desc: 'Perfectly moist homemade treat', stats: { prep: '1h 15m', serves: '10', skill: 'Easy' } },
];

const HOME_LEADERS = [
  { name: 'Marcus Mango', title: 'CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Sarah Chen', title: 'CFO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Jean-Paul Kagabo', title: 'COO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Elena Rodriguez', title: 'CMO', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500' },
];

const CERTIFICATIONS = [
  { name: 'Quality Standard 01', image: '/certify/quality1.png' },
  { name: 'Quality Standard 02', image: '/certify/quality2.jpg' },
  { name: 'Quality Standard 03', image: '/certify/quality3.jpg' },
  { name: 'Quality Standard 04', image: '/certify/quality4.png' },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000); // Rotate every 8 seconds
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
      // Logic for services removal (already implemented in section)
      setLoading(false);
  }, []);



  return (
    <div className="bg-white min-h-screen">

      {/* ── SECTION 1: HERO ── */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden bg-black">
        {/* Background Videos Slider */}
        {HERO_SLIDES.map((slide, index) => (
          <video
            key={slide.video}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
        
        {/* Dark overlay for lower brightness */}
        <div className="absolute inset-0 bg-black/65 z-0" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col justify-end"
          >
            {/* Giant background title */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none px-12 z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="text-[9vw] lg:text-[11vw] font-black uppercase text-white/10 leading-none tracking-tighter text-center"
                >
                    {HERO_SLIDES[currentSlide].giantText}
                </motion.span>
            </div>

            {/* Floating White Card and Title */}
            <div className="relative z-10 px-8 pb-16 pt-32 md:pt-40 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-end justify-between gap-8 pointer-events-auto">
                {/* Left: Title */}
                <div className="flex-1">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white/70 mb-4"
                    >
                        {HERO_SLIDES[currentSlide].tagline}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-tight max-w-2xl"
                    >
                        {HERO_SLIDES[currentSlide].heading}
                    </motion.h1>
                </div>

                {/* Right: Floating Utility Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
                    className="w-full md:w-[420px] bg-white rounded-[2rem] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                >
                    <h2 className="text-xl font-black tracking-tighter mb-2 text-[#0d55a0]">{HERO_SLIDES[currentSlide].cardTitle}</h2>
                    <p className="text-[13px] font-medium text-zinc-500 mb-8 leading-relaxed">
                        {HERO_SLIDES[currentSlide].cardText}
                    </p>

                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3">
                            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Find a product..." 
                                className="bg-transparent border-none outline-none text-[12px] font-medium text-zinc-600 w-full placeholder:text-zinc-400"
                            />
                        </div>
                        <Link href="/services" className="bg-[#5bb63a] text-white text-[10px] md:text-[12px] font-black uppercase tracking-widest px-6 rounded-xl hover:bg-[#5bb63a]/90 transition-colors flex items-center justify-center">
                            Explore
                        </Link>

                    </div>
                </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="brands" className="bg-[#fcfbf7] py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Column: Text & CTA */}
            <div className="lg:w-1/2">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0d55a0] mb-4"
              >
                Inyange Product Universe
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#0d55a0] leading-tight mb-8"
              >
                OUR <span className="text-[#33a4df]">BRANDS</span>.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 font-medium text-lg mb-10 leading-relaxed max-w-xl"
              >
                Experience the pure essence of Rwanda through our premium selection of dairy, refreshing juices, and crystal-clear mineral water. Each Inyange brand represents our unwavering commitment to quality, nutrition, and the well-being of our community.
              </motion.p>
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
              >
                <Link href="/brands" className="group flex items-center gap-4 bg-[#5bb63a] text-white px-8 py-4 rounded-2xl hover:bg-[#5bb63a]/90 transition-all w-fit shadow-xl shadow-[#5bb63a]/20">
                  <span className="text-xs font-black uppercase tracking-widest">Discover our brands</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#5bb63a] transition-colors">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full"
            >
              <Image 
                src="/inyangebrand.png" 
                alt="Inyange Brands Collection" 
                fill 
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative Element: Bird */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 0.4, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 right-0 w-32 md:w-48 h-32 md:h-48 pointer-events-none select-none overflow-hidden"
        >
          <Image 
            src="/decorations/decobird.png" 
            alt="Decoration Bird" 
            fill 
            className="object-contain translate-x-1/4 translate-y-1/4 rotate-[-15deg]"
          />
        </motion.div>
      </section>

      {/* ── SECTION 3: RECIPES (OVERVIEW) ── */}
      <section id="recipes-overview" className="bg-white py-24 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-8 mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0d55a0] mb-4 leading-tight">
                OUR <span className="text-[#33a4df]">PICKS</span>
              </h2>
              <p className="text-zinc-500 font-medium text-sm max-w-2xl leading-relaxed">
                Delicious recipes we chose for you. Discover how Inyange's premium dairy, juices, and mineral water can elevate your everyday meals.
              </p>
            </motion.div>
        </div>

        {/* ... (Carousel code remains same) ... */}


        {/* Continuous Moving Carousel */}
        <div className="relative w-full flex overflow-hidden">
          <motion.div 
            className="flex gap-8 whitespace-nowrap py-10 px-8"
            animate={{ x: [0, -1600] }} // Adjust based on card width + gap
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{ width: "fit-content" }}
            whileHover={{ transition: { duration: 10000 } }} // Hacky way to "pause" or slow down significantly
          >
            {[...FEATURED_RECIPES, ...FEATURED_RECIPES, ...FEATURED_RECIPES, ...FEATURED_RECIPES].map((recipe, idx) => (
              <motion.div 
                key={idx}
                className="inline-flex w-[450px] bg-white border border-[#0d55a0]/10 rounded-3xl p-6 items-center gap-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:border-[#33a4df]/30 transition-all cursor-pointer group"
              >
                {/* Circle Image */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-[#fcfbf7] group-hover:border-[#33a4df]/20 transition-all">
                  <Image src={recipe.image} alt={recipe.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col text-left">
                  <h3 className="text-xl font-black text-[#0d55a0] mb-1 uppercase tracking-tight">{recipe.title}</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 truncate w-56">{recipe.desc}</p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-6 border-t border-[#0d55a0]/5 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase text-zinc-300 tracking-tighter">Prep Time</span>
                      <span className="text-xs font-black text-[#0d55a0]">{recipe.stats.prep}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase text-zinc-300 tracking-tighter">Serves</span>
                        <span className="text-xs font-black text-[#0d55a0]">{recipe.stats.serves}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase text-zinc-300 tracking-tighter">Skill</span>
                        <span className="text-xs font-black text-[#33a4df]">{recipe.stats.skill}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Link href="/recipes" className="group flex items-center gap-3 bg-[#5bb63a] text-white px-7 py-3.5 rounded-xl hover:bg-[#5bb63a]/90 transition-all shadow-lg shadow-[#5bb63a]/10">
            <span className="text-[10px] font-black uppercase tracking-widest">See More Recipes</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">→</span>
          </Link>
        </div>
      </section>

      {/* ── SECTION 4: TRUSTED BY WORLDWIDE (NEW) ── */}
      <section id="certifications" className="bg-white py-24 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-8 mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df] mb-4">Quality & Standards</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0d55a0] mb-6 leading-tight">
                TRUSTED BY PEOPLE <span className="text-[#33a4df]">WORLDWIDE</span>
              </h2>
              <p className="text-zinc-500 font-medium text-sm max-w-2xl leading-relaxed">
                Inyange Industries operates with uncompromising dedication to international food safety and quality management standards.
              </p>
            </motion.div>
        </div>

        {/* Global Certifications Carousel */}
        <div className="relative w-full overflow-hidden py-10">
            <motion.div 
                className="flex gap-16 w-fit items-center"
                animate={{ 
                    x: [0, -1000],
                }}
                transition={{ 
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {/* Duplicate items for infinite effect */}
                {[...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, idx) => (
                    <div 
                        key={idx}
                        className="flex flex-col items-center gap-6 shrink-0 w-36"
                    >
                        <div className="relative w-24 h-24 bg-white rounded-3xl p-4 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
                            <Image 
                                src={cert.image} 
                                alt={cert.name} 
                                fill 
                                className="object-contain p-2 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100" 
                            />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#0d55a0] text-center opacity-40 hover:opacity-100 transition-all">
                            {cert.name}
                        </span>
                    </div>
                ))}
            </motion.div>
            
            {/* Gradient Fades for Smooth Edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* ── SECTION 5: ABOUT US (NEW) ── */}
      <section id="about" className="bg-[#fcfbf7] py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df] mb-4 block">About Us</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter leading-[0.95] mb-6">
              The Pride of Rwanda's <br /> <span className="text-[#33a4df]">Beverage Industry</span>.
            </h2>
            <div className="w-16 h-1 bg-[#0d55a0]/10 mb-6" />
            
            <p className="text-zinc-500 font-medium leading-relaxed mb-8 max-w-lg text-sm">
              Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products under its household brand name—"Inyange". Known for high-quality mineral water, fruit juices, and dairy products, we have become the regional standard for modern and hygienic production.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-[#0d55a0] font-black uppercase tracking-widest text-[11px] mb-3">Vision</h3>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                  To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value.
                </p>
              </div>
              <div>
                <h3 className="text-[#0d55a0] font-black uppercase tracking-widest text-[11px] mb-3">Mission</h3>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                  To secure the highest value for all stakeholders while enriching lives through nutritious and tasty dairy and beverage choices.
                </p>
              </div>
            </div>

            {/* Visionary Leaders Subsection */}
            <div className="pt-8 border-t border-[#0d55a0]/5">
              <h3 className="text-[#0d55a0] font-black uppercase tracking-widest text-[10px] mb-6 block opacity-50">Visionary Leaders</h3>
              <div className="grid grid-cols-4 gap-4 mb-10">
                {HOME_LEADERS.map((leader, i) => (
                  <motion.div 
                    key={leader.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="relative aspect-square rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border-2 border-white shadow-lg">
                      <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-[#0d55a0] truncate">{leader.name}</span>
                      <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-tighter">{leader.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/about" className="group inline-flex items-center gap-3 bg-[#5bb63a] text-white px-6 py-3 rounded-xl hover:bg-[#5bb63a]/90 transition-all shadow-lg shadow-[#5bb63a]/10">
                <span className="text-[9px] font-black uppercase tracking-widest">Learn More About Inyange</span>
                <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Capsule Images */}
          <div className="lg:w-1/2 flex items-center justify-center gap-3 md:gap-4 pt-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-24 md:w-36 h-[280px] md:h-[380px] rounded-[5rem] overflow-hidden shadow-xl relative translate-y-8"
            >
              <Image src="/food/about_processing.png" fill className="object-cover" alt="Processing" />
              <div className="absolute inset-0 bg-[#0d55a0]/10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: -40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-24 md:w-36 h-[320px] md:h-[420px] rounded-[5rem] overflow-hidden shadow-xl relative"
            >
              <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400" fill className="object-cover" alt="Lifestyle" />
              <div className="absolute inset-0 bg-[#33a4df]/10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-24 md:w-36 h-[250px] md:h-[350px] rounded-[5rem] overflow-hidden shadow-xl relative translate-y-16"
            >
              <Image src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=400" fill className="object-cover" alt="Water Flowing" />
              <div className="absolute inset-0 bg-[#0d55a0]/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: EDITORIAL (OVERVIEW) ── */}
      <section id="editorial-overview" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
              From our <span className="text-[#0d55a0]">newsroom</span>.
            </h2>
            <Link href="/editorial" className="group flex items-center gap-3 bg-black text-white px-6 py-2.5 rounded-full w-fit hover:bg-[#0d55a0] transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest">News Room</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                date: 'Oct 12, 2023', 
                title: 'Sustainable Farming: Our Commitment to the Future', 
                excerpt: 'Inyange remains at the forefront of agricultural innovation, supporting local farmers with modern techniques.',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600',
                tag: 'Sustainability' 
              },
              { 
                date: 'Sep 28, 2023', 
                title: 'Awarded Best Beverage Producer of the Year', 
                excerpt: 'We are honored to receive the 2023 Excellence Award for our consistent quality and safety standards.',
                image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600',
                tag: 'Awards' 
              },
              { 
                date: 'Sep 15, 2023', 
                title: 'New Fortified Milk Range: Nutrition Redefined', 
                excerpt: 'Introducing our latest product line designed to meet the growing nutritional needs of the East African market.',
                image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800',
                tag: 'Innovation' 
              },
              { 
                date: 'Aug 30, 2023', 
                title: 'Community Outreach: Supporting Local Schools', 
                excerpt: 'Our recent initiative provided nutritional dairy products to school children across Rwanda villages.',
                image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600',
                tag: 'Community' 
              },
            ].map((news, idx) => (
              <motion.div
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#0d55a0] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {news.tag}
                    </span>
                  </div>
                </div>
                
                <span className="text-[10px] font-bold text-zinc-400 mb-2">{news.date}</span>
                <h3 className="text-lg font-black text-black leading-tight mb-3 group-hover:text-[#0d55a0] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed line-clamp-3">
                  {news.excerpt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: REACH OUT (OVERVIEW) ── */}
      <section id="reach-out-overview" className="relative py-20 bg-[#0d55a0] overflow-hidden">
        {/* Background Pattern Overlay */}
        <div 
            className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
            style={{ backgroundImage: "url('/pattern.png')" }}
        />

        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[50px] border-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-[30px] border-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
              WANT TO GET <br /> <span className="text-[#33a4df]">IN TOUCH?</span>
            </h2>
            <p className="text-white/70 font-medium mb-10 max-w-2xl mx-auto leading-loose text-sm md:text-base">
              Whether you're a customer, a potential partner, or looking for a career, we're here to listen and grow together. Reach out to our dedicated support teams today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reach-out" className="bg-[#5bb63a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#0d55a0] transition-all">
                Contact Us Now
              </Link>
              <Link href="/about/careers" className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-white transition-all">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <OnboardingGuide />
    </div>
  );
}
