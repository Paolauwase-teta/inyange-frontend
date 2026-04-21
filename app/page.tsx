"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const OnboardingGuide = dynamic(() => import('./components/OnboardingGuide'), { ssr: false });
import Link from 'next/link';
import Image from 'next/image';
import { getAsset } from '@/lib/getAsset';

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
    video: getAsset("/milkpouring.mp4"),
    giantText: "INYANGE INDUSTRIES",
    tagline: "Premium Dairy & Beverages",
    heading: "PURITY IN EVERY DROP",
    cardTitle: "Crafted for Quality",
    cardText: "We transform the finest ingredients into refreshing dairy and beverage products your family can trust."
  },
  {
    video: getAsset("/fruity_juice.mp4"),
    giantText: "EVERYDAY MEALS",
    tagline: "Versatile Ingredients",
    heading: "ELEVATE YOUR COOKING",
    cardTitle: "Perfect for Every Recipe",
    cardText: "From breakfast to baking, our products are the perfect companion to use in your everyday meals."
  }
];

const FEATURED_RECIPES = [
  { title: 'French Onion Soup', image: getAsset('/recipe_soup.png'), desc: 'Delicious classic comfort', stats: { prep: '1h', serves: '4', skill: 'Easy' } },
  { title: 'Chicken Corn Chowder', image: getAsset('/recipe_chowder.png'), desc: 'Creamy and hearty delight', stats: { prep: '30m', serves: '6', skill: 'Easy' } },
  { title: 'Lemon Basil Fish', image: getAsset('/recipe_fish.png'), desc: 'Fresh and zesty grilled fillet', stats: { prep: '20m', serves: '2', skill: 'Medium' } },
  { title: 'Classic Banana Bread', image: getAsset('/recipe_bread.png'), desc: 'Perfectly moist homemade treat', stats: { prep: '1h 15m', serves: '10', skill: 'Easy' } },
];

const HOME_LEADERS = [
  { name: 'Marcus Mango', title: 'CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Sarah Chen', title: 'CFO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Jean-Paul Kagabo', title: 'COO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Elena Rodriguez', title: 'CMO', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500' },
];

const CERTIFICATIONS = [
  { name: 'Quality Standard 01', image: getAsset('/quality1.png') },
  { name: 'Quality Standard 02', image: getAsset('/quality2.jpg') },
  { name: 'Quality Standard 03', image: getAsset('/quality3.jpg') },
  { name: 'Quality Standard 04', image: getAsset('/quality4.png') },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000); // Rotate every 8 seconds
    return () => clearInterval(timer);
  }, []);




  return (
    <div className="bg-white min-h-screen">

      {/* ── SECTION 1: HERO ── */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden bg-black">
        {/* Background Videos Slider: Optimized to render only the active video for performance */}
        {HERO_SLIDES.map((slide, index) => (
          currentSlide === index && (
            <video
              key={slide.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          )
        ))}
        
        {/* Dark overlay for lower brightness - reduced opacity to make it less dim */}
        <div className="absolute inset-0 bg-black/45 z-10" />

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
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none px-12 z-20 opacity-90 md:opacity-20">
                <motion.span
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="text-[9vw] lg:text-[11vw] font-black uppercase text-white/30 leading-none tracking-tighter text-center"
                >
                    {HERO_SLIDES[currentSlide].giantText}
                </motion.span>
            </div>

            {/* Floating White Card and Title */}
            <div className="relative z-10 px-8 pb-10 md:pb-16 pt-32 md:pt-40 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-8 pointer-events-auto">
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

                {/* Right: Floating Utility Card - Hidden on Mobile to prioritize video and lead title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
                    className="hidden md:block w-full md:w-[420px] bg-white rounded-[2rem] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
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

      {/* ── SECTION 2: OUR BRANDS (REFINED & ALIGNED) ── */}
      <section id="brands" className="bg-white pt-20 pb-12 md:pt-24 md:pb-12 overflow-hidden relative">
        {/* Giant Subtle Background Typography - Even lighter */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
            <span className="text-[20vw] font-black uppercase text-[#0d55a0] leading-none tracking-tighter">
                BRANDS
            </span>
        </div>

        <div className="relative z-10 px-12 md:px-24 xl:px-32 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            
            {/* Left Side: Editorial Narrative */}
            <div className="lg:w-[45%] flex flex-col gap-10">
              <div className="max-w-sm">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0] opacity-40">Inyange Universe</span>
                  <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#0d55a0] leading-[0.95] mb-8"
                >
                  OUR <span className="text-[#33a4df]">BRAND</span> <br /> RANGE.
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-zinc-500 font-medium text-xs md:text-sm leading-relaxed"
                >
                  Experience Rwanda's pure essence through our premium selection of dairy, juices, and essential hydration.
                </motion.p>
              </div>

              {/* Heroes Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full aspect-[4/3] max-w-[400px]"
              >
                <Image 
                  src="/inyangebrand.png" 
                  alt="Inyange Brands Collection" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
                  priority
                />
              </motion.div>
            </div>

            {/* Right Side: Compact Methodology Timeline - Widened to allow text to flow horizontally */}
            <div className="lg:w-[55%] flex justify-start">
              <div className="relative pl-10 w-full max-w-xl">
                {/* Thin Vertical Axis Line - Positioned precisely at 20px from left (centered on points) */}
                <div className="absolute left-[20px] top-6 bottom-6 w-[1px] bg-zinc-200" />
                
                <div className="flex flex-col gap-6 md:gap-8 relative font-inter">
                  {[
                    { id: '01', title: 'Milk', desc: 'Sourced directly from local farmers and processed using state-of-the-art technology for pure, natural quality.' },
                    { id: '02', title: 'Milk Products', desc: 'Our diverse dairy range, including yogurts and butter, captures the authentic essence of Rwanda.' },
                    { id: '03', title: 'Juice', desc: "Refreshing tropical flavors made from the finest local fruit harvests, packed with natural vitamins." },
                    { id: '04', title: 'Water', desc: 'Bottled at the source, Inyange Water provides pure refreshment with a mineral-rich purification process.' }
                  ].map((brand, i) => (
                    <motion.div 
                      key={brand.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      {/* Methodology Stylized Node - Center aligned with line at 20px left of container start */}
                      <div className="absolute -left-[27px] top-[14px] w-[14px] h-[14px] rounded-full bg-white border border-zinc-200 flex items-center justify-center transition-all duration-500 group-hover:border-black group-hover:scale-110 shadow-sm z-20">
                          <div className="w-[4px] h-[4px] rounded-full bg-black group-hover:bg-[#33a4df] transition-colors" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-zinc-300 tracking-[0.2em] mb-1 uppercase group-hover:text-black transition-colors">{brand.id}</span>
                        <h3 className="text-base md:text-lg font-black text-[#0d55a0] uppercase tracking-tighter leading-none mb-1.5 group-hover:text-[#33a4df] transition-colors">{brand.title}</h3>
                        <p className="text-[10px] md:text-[11px] text-zinc-500 font-medium max-w-lg leading-relaxed italic opacity-80">{brand.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-14"
                >
                  <Link href="/brands" className="group flex items-center gap-4 text-[#0d55a0]/40 hover:text-[#33a4df] transition-all">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Explore collection →</span>
                  </Link>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Element: Minimalist Bird */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className="absolute bottom-6 right-6 w-20 h-20 pointer-events-none grayscale opacity-30"
        >
          <Image 
            src="/decorations/decobird.png" 
            alt="Decoration" 
            fill 
            className="object-contain"
          />
        </motion.div>
      </section>

      {/* ── SECTION 3: RECIPES (OVERVIEW) ── */}
      <section id="recipes-overview" className="bg-white pt-10 pb-20 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-12 md:px-24 xl:px-32 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            {/* Left Side: Editorial Heading (Matches Brand Range Style) */}
            <div className="max-w-xl">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="flex items-center gap-3 mb-6"
               >
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0] opacity-40 whitespace-nowrap">Our Selection</span>
                 <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
               </motion.div>

               <motion.h2 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#0d55a0] leading-[0.95] mb-8"
               >
                 OUR <span className="text-[#33a4df]">PICKS</span>
               </motion.h2>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 font-medium text-[11px] leading-relaxed max-w-sm"
              >
                Signature recipes crafted to elevate your everyday meals.
              </motion.p>
            </div>

            {/* Right Side: CTA Button - Integrated into header for cleaner mobile flow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-2 w-fit"
            >
              <Link href="/recipes" className="group flex items-center gap-2.5 bg-[#0d55a0] text-white px-6 py-3 md:px-7 md:py-3.5 rounded-xl hover:bg-[#0d55a0]/90 transition-all shadow-lg shadow-[#0d55a0]/10">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">See More Recipes</span>
                <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px] md:text-[10px] font-bold transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Full-Width Carousel Wrapper */}
        <div className="relative w-full overflow-hidden">
          <motion.div 
              className="flex gap-4 md:gap-6 whitespace-nowrap py-6"
              animate={{ x: [0, -1136] }} // Perfect loop logic: 4 cards * (260px + 24px gap)
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
              style={{ width: "fit-content" }}
              whileHover={{ x: -1136, transition: { duration: 180, ease: "linear" } }} // Slow down significantly on hover
            >
              {[...FEATURED_RECIPES, ...FEATURED_RECIPES, ...FEATURED_RECIPES, ...FEATURED_RECIPES].map((recipe, idx) => (
                <motion.div 
                  key={idx}
                  className="inline-flex flex-col w-[220px] md:w-[260px] bg-white border border-[#0d55a0]/5 rounded-[1.5rem] p-4 shadow-xl shadow-black/5 hover:shadow-2xl hover:border-[#0d55a0]/20 transition-all cursor-pointer group"
                >
                  {/* Rounded Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-zinc-50">
                    <Image src={recipe.image} alt={recipe.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-white/90 backdrop-blur-sm text-[#0d55a0] text-[6.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">
                        {recipe.stats.skill}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col text-left whitespace-normal">
                    <h3 className="text-base font-black text-[#0d55a0] mb-1 uppercase tracking-tight">{recipe.title}</h3>
                    <p className="text-[9px] font-medium text-zinc-500 leading-relaxed mb-5 line-clamp-2">{recipe.desc}</p>
                    
                    {/* Simplified Stats Footer */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[#0d55a0]/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#33a4df]" />
                        <span className="text-[7.5px] font-black uppercase text-zinc-400 tracking-tighter">Prep: <span className="text-[#0d55a0]">{recipe.stats.prep}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#5bb63a]" />
                        <span className="text-[7.5px] font-black uppercase text-zinc-400 tracking-tighter">Serves: <span className="text-[#0d55a0]">{recipe.stats.serves}</span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          {/* Edge Gradient Fades for Infinite Look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* ── SECTION 4: TRUSTED BY WORLDWIDE (NEW) ── */}
      <section id="certifications" className="bg-white py-16 md:py-24 overflow-hidden relative">
        {/* Soft Background Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f2f9ff_0%,_#ffffff_70%)] opacity-70" />

        <div className="max-w-3xl mx-auto px-8 mb-16 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#0d55a0]/10" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0] opacity-40 whitespace-nowrap">Quality & Standards</span>
                <div className="w-12 h-[1px] bg-[#0d55a0]/10" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#0d55a0] mb-6 leading-[0.95]">
                TRUSTED BY PEOPLE <br /> <span className="text-[#33a4df]">WORLDWIDE</span>
              </h2>
            </motion.div>
        </div>

        {/* Hanging Cards Carousel Wrapper */}
        <div className="relative w-full py-10">
            {/* Subtle Arc / String decoration */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-100 -translate-y-1/2 hidden md:block" />

            <motion.div 
                className="flex gap-8 md:gap-10 w-fit px-[10vw]"
                animate={{ 
                    x: [0, -1000],
                }}
                transition={{ 
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 35,
                        ease: "linear",
                    },
                }}
            >
                {/* Quadruple items for perfectly seamless infinite effect */}
                {[...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, idx) => (
                    <div 
                        key={idx}
                        className={`relative p-4 md:p-5 bg-white rounded-2xl md:rounded-[2rem] shadow-[0_15px_50px_rgba(13,85,160,0.06)] border border-white/50 shrink-0 w-40 md:w-52 transition-transform duration-700 hover:scale-105 hover:z-20 group cursor-pointer ${
                            idx % 4 === 0 ? 'rotate-[-2deg] -translate-y-3' : 
                            idx % 4 === 1 ? 'rotate-[1deg] translate-y-2' : 
                            idx % 4 === 2 ? 'rotate-[-1deg] translate-y-4' : 
                            'rotate-[2deg] -translate-y-1'
                        }`}
                    >
                        {/* Hanging Clip decoration */}
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-6 md:w-4 md:h-7 bg-[#5bb63a] rounded-b-md shadow-md z-10 flex flex-col items-center justify-center gap-0.5">
                            <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                            <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                        </div>

                        {/* Polaroid Body */}
                        <div className="relative w-full aspect-square bg-zinc-50 rounded-xl md:rounded-[1.2rem] overflow-hidden mb-4">
                            <Image 
                                src={cert.image} 
                                alt={cert.name} 
                                fill 
                                className="object-contain p-6 md:p-8 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100 group-hover:scale-110 duration-700" 
                            />
                        </div>
                        
                        <div className="text-center px-4">
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter text-[#0d55a0]">
                                {cert.name}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
            
            {/* Gradient Fades for depth and focus */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-56 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 md:w-56 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />
        </div>
      </section>


      {/* ── SECTION 5: ABOUT US (NEW) ── */}
      <section id="about" className="bg-white py-16 md:py-24 overflow-hidden relative border-t border-[#0d55a0]/5">
        <div className="max-w-screen-2xl mx-auto px-12 md:px-24 xl:px-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-32 relative z-10">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0] opacity-40 whitespace-nowrap">About Us</span>
                <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter leading-[0.95] mb-8">
              The Pride of Rwanda's <br /> <span className="text-[#33a4df]">Beverage Industry</span>.
            </h2>
            
            <p className="text-zinc-500 font-medium leading-relaxed mb-10 max-w-lg text-xs md:text-sm">
              Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products under its household brand name—"Inyange". Known for high-quality mineral water, fruit juices, and dairy products, we have become the regional standard for modern and hygienic production.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
              <div>
                <h3 className="text-[#0d55a0] font-black uppercase tracking-widest text-[9px] mb-3">Vision</h3>
                <p className="text-[10px] md:text-[11px] text-zinc-400 font-medium leading-relaxed italic opacity-80">
                  To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value.
                </p>
              </div>
              <div>
                <h3 className="text-[#0d55a0] font-black uppercase tracking-widest text-[9px] mb-3">Mission</h3>
                <p className="text-[10px] md:text-[11px] text-zinc-400 font-medium leading-relaxed italic opacity-80">
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

              <Link href="/about" className="group inline-flex items-center gap-3 bg-[#0d55a0] text-white px-6 py-3 rounded-xl hover:bg-[#0d55a0]/90 transition-all shadow-lg shadow-[#0d55a0]/10">
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
              <Image src={getAsset("/about_processing.png")} fill className="object-cover" alt="Processing" />
              <div className="absolute inset-0 bg-[#0d55a0]/10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: -40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-24 md:w-36 h-[320px] md:h-[420px] rounded-[5rem] overflow-hidden shadow-xl relative"
            >
              <Image src={getAsset("/home_about_middle.jpg")} fill className="object-cover" alt="Refreshing Orange Juice" />
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
      <section id="editorial-overview" className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-12 md:px-24 xl:px-32 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            {/* Left Sides Heading */}
            <div className="max-w-xl">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="flex items-center gap-3 mb-6"
               >
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0] opacity-40 whitespace-nowrap">Inyange Stories</span>
                 <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
               </motion.div>

               <motion.h2 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#0d55a0] leading-[0.95]"
               >
                 FROM OUR <br /> <span className="text-[#33a4df]">NEWSROOM</span>.
               </motion.h2>
            </div>

            {/* Right Side: CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <Link href="/editorial" className="group inline-flex items-center gap-3 bg-[#0d55a0] text-white px-6 py-3 rounded-xl hover:bg-[#0d55a0]/90 transition-all shadow-lg shadow-[#0d55a0]/10">
                <span className="text-[9px] font-black uppercase tracking-widest">Explore Newsroom</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
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
      <section id="reach-out-overview" className="relative py-16 bg-[#0d55a0] overflow-hidden">
        {/* Background Pattern Overlay */}
        <div 
            className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
            style={{ backgroundImage: `url('${getAsset('/pattern.png')}')` }}
        />

        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[50px] border-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-[30px] border-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
              WANT TO GET <br /> <span className="text-[#33a4df]">IN TOUCH?</span>
            </h2>
            <p className="text-white/70 font-medium mb-8 max-w-xl mx-auto leading-relaxed text-[11px] md:text-[13px]">
              Whether you're a customer, a potential partner, or looking for a career, we're here to listen and grow together. Reach out to our dedicated support teams today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/reach-out" className="bg-[#5bb63a] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#0d55a0] transition-all">
                Contact Us Now
              </Link>
              <Link href="/about/careers" className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-white transition-all">
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
