"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Award, Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { LEADERS } from '@/lib/data/leaders';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const HERO_SLIDES = [
  "/Inyange_Industry.jpg",
  "/about_processing.png",
  "/editorial_showcase_2.png"
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const coreValues = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "People First",
      desc: "Empowering our team and the Rwandan community.",
      color: "from-[#0d55a0] to-[#1565c0]"
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Integrity",
      desc: "An unhindered commitment to purity in every drop.",
      color: "from-[#5bb63a] to-[#7ac25d]"
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Excellence",
      desc: "Setting the global standard for quality and taste.",
      color: "from-[#33a4df] to-[#5ec1f1]"
    }
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf7] font-sans overflow-x-hidden relative pb-40">
      {/* ── BACKGROUND TEXTURE ── */}
      <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay"
          style={{ 
              backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard.png')",
              backgroundRepeat: 'repeat'
          }}
      />

      {/* ── SECTION 1: HERO (TRANSFORMED COZY) ── */}
      <section className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[4rem] md:rounded-b-[8rem] shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 2, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" } 
              }}
              className="absolute inset-0 z-0"
            >
              <Image 
                src={HERO_SLIDES[currentSlide]} 
                alt="About Inyange"
                fill
                className="object-cover"
              />
              {/* Editorial Style Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#fcfbf7]" />
              <div className="absolute inset-0 bg-[#0d55a0]/10 mix-blend-multiply" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-8"
            >
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white">Rwanda's Heritage</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-[0.8] mb-10"
            >
                THE <br/> <span className="text-[#33a4df]">STORY</span><span className="text-[#5bb63a]">.</span>
            </motion.h1>
            
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-sm md:text-xl font-medium max-w-xl leading-relaxed"
            >
                Founded in 1997, Inyange Industries has become the pulse of Rwanda's nutrition, building a legacy of purity and trust.
            </motion.p>
          </div>
      </section>

      {/* ── SECTION 2: VALUES GRID (COZY CARDS) ── */}
      <section className="py-32 max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {coreValues.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
                <div className={`absolute -inset-1 bg-gradient-to-r ${val.color} rounded-[3rem] blur-xl opacity-0 group-hover:opacity-20 transition duration-1000`} />
                <div className="relative bg-white p-12 rounded-[3.5rem] shadow-xl border border-black/5 flex flex-col items-center text-center h-full">
                    <div className={`w-20 h-20 bg-gradient-to-br ${val.color} rounded-3xl flex items-center justify-center shadow-2xl mb-10 group-hover:scale-110 transition-transform duration-700`}>
                        {val.icon}
                    </div>
                    <h3 className="text-2xl font-black text-[#0d55a0] uppercase tracking-tighter mb-4">{val.title}</h3>
                    <p className="text-zinc-400 font-bold text-sm leading-relaxed uppercase tracking-widest">{val.desc}</p>
                </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: LEADERSHIP PREVIEW (REVERTED CARD STYLES) ── */}
      <section className="py-40 bg-white/40 backdrop-blur-3xl border-y border-black/[0.03] relative z-10">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-[#33a4df] rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df]">Executive Stewardship</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-[#0d55a0] uppercase tracking-tighter leading-[0.85]">
                        Visionary <br/> <span className="text-[#5bb63a]">Leadership</span>
                    </h2>
                </div>
                <Link href="/leaders">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-[#0d55a0] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 shadow-2xl"
                    >
                        View Full Team <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {LEADERS.slice(0, 4).map((leader, i) => (
                    <Link href={`/leaders/${leader.slug}`} key={i}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <Image 
                                    src={leader.image} 
                                    alt={leader.name} 
                                    fill 
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-[#0d55a0]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-tighter">{leader.name}</h3>
                            <span className="text-[10px] font-bold text-[#5bb63a] uppercase tracking-widest">{leader.title}</span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* ── SECTION 4: IMPACT (REFINED) ── */}
      <section className="py-40 max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-[55%] relative w-full aspect-[16/10] rounded-[5rem] overflow-hidden shadow-[0_60px_100px_-30px_rgba(0,0,0,0.3)] group"
          >
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200"
              alt="Leadership impact"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-2000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0d55a0]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-24 h-24 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-full flex items-center justify-center shadow-2xl transition-all hover:bg-white group"
                >
                    <Play className="w-8 h-8 text-white group-hover:text-[#0d55a0] fill-white group-hover:fill-[#0d55a0] transition-colors" />
                </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-[45%] space-y-10"
          >
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#5bb63a] mb-6 block">Our Impact</span>
                <h2 className="text-4xl md:text-7xl font-black text-[#0d55a0] mb-8 leading-[0.85] uppercase tracking-tighter">
                  Empowering <br/> <span className="text-[#33a4df]">Communities</span>
                </h2>
                <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-[#33a4df] pl-8">
                  "At Inyange, we believe that true leadership is measured by the growth of our partners and the prosperity of Rwanda."
                </p>
            </div>
            <p className="text-zinc-400 text-sm md:text-base font-bold leading-loose uppercase tracking-widest">
              From local farmers to regional distributors, we are building a sustainable ecosystem where excellence is the only standard.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
