"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const MILESTONES = [
  {
    id: 1,
    year: '1997',
    tag: 'FOUNDATION',
    title: 'The Inyange Vision',
    description: 'Inyange Industries was founded as a private enterprise with a visionary goal: to become Rwanda\'s leading food and beverage processor.',
    cx: 100,
    cy: 280,
  },
  {
    id: 2,
    year: '1999',
    tag: 'DAIRY START',
    title: 'Pasteurized Milk & Yoghurt',
    description: 'Operations expanded to include processing and selling high-quality pasteurized milk and yoghurt for the Rwandan market.',
    cx: 280,
    cy: 220,
  },
  {
    id: 3,
    year: '2001',
    tag: 'WATER',
    title: 'Mineral Water Processing',
    description: 'The plant introduced mineral water processing and packaging, quickly becoming a standard for hygienic drinking water.',
    cx: 460,
    cy: 160,
  },
  {
    id: 4,
    year: '2010',
    tag: 'MASAKA PLANT',
    title: 'USD 27M Expansion',
    description: 'Construction of a state-of-the-art production plant in Masaka, increasing production capacity tenfold to meet rising domestic demand.',
    cx: 640,
    cy: 220,
  },
  {
    id: 5,
    year: 'PRESENT',
    tag: 'REGIONAL REACH',
    title: 'EAC Expansion',
    description: 'Leveraging Rwanda\'s position in the East African Community to export premium quality dairy, juices, and water to neighboring countries.',
    cx: 820,
    cy: 100,
  },
];

const CERTIFICATIONS = [
  { name: 'Quality Standard 01', image: '/certify/quality1.png' },
  { name: 'Quality Standard 02', image: '/certify/quality2.jpg' },
  { name: 'Quality Standard 03', image: '/certify/quality3.jpg' },
  { name: 'Quality Standard 04', image: '/certify/quality4.png' },
];

const VB_W = 900;
const VB_H = 400;

export default function AboutUsPage() {
    const [activeMilestone, setActiveMilestone] = useState(MILESTONES[0]);

    return (
        <main className="min-h-screen bg-[#fcfbf7] font-sans">
            <Navbar />

            {/* ── SECTION 1: HERO ── */}
            <section className="relative w-full h-[50vh] md:h-[65vh] bg-[#0d55a0] overflow-hidden flex items-center justify-center">
                {/* Background Watermark */}
                {/* Background Pattern Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                    style={{ backgroundImage: "url('/pattern.png')" }}
                />

                <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex flex-col items-start">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-4"
                    >
                        Legacy of Excellence
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                    >
                        OUR <span className="text-[#33a4df]">STORY</span>.
                    </motion.h1>
                </div>
            </section>

            {/* ── SECTION 2: BRAND STORY ── */}
            <div className="max-w-6xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df] mb-4 block">The Brand</span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter leading-[0.95] mb-8">
                        The Pride of Rwanda's <br /> <span className="text-[#33a4df]">Dairy Industry</span>.
                    </h2>
                    <p className="text-zinc-500 font-medium leading-relaxed mb-8 text-sm md:text-base">
                        Operating in modern and hygienic production facilities, Inyange manufactures a wide range of products and has quickly become a household name in Rwanda's fast-moving consumer goods industry. We are renowned for our high-quality mineral drinking water, fruit juices, milk, and dairy products that set the standard for excellence.
                    </p>
                    <div className="grid grid-cols-2 gap-8 border-t border-black/5 pt-8">
                        <div>
                            <span className="text-3xl font-black text-[#0d55a0]">1997</span>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Year Founded</p>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-[#33a4df]">100%</span>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Quality Guaranteed</p>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <Image 
                        src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80" 
                        alt="Inyange Industry" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0d55a0]/10 mix-blend-overlay" />
                </motion.div>
            </div>

            {/* ── SECTION 3: EVOLUTION JOURNEY (LIGHT SLEEK REDESIGN) ── */}
            <section className="bg-white py-32 overflow-hidden relative border-y border-black/5">
                {/* Evolution Watermark - Background */}
                {/* Background Pattern Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                    style={{ backgroundImage: "url('/pattern.png')" }}
                />

                <div className="max-w-6xl mx-auto px-8 mb-20 relative z-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5bb63a]">Our Journey</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#0d55a0]">
                            THE <span className="text-[#5bb63a]">CHRONOLOGY</span>.
                        </h2>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-8 relative h-[500px]">
                    {/* SVG Path - Sleek Cubic Bezier */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none">
                        <path 
                            d="M 100 320 C 250 320, 300 180, 350 180 C 450 180, 500 280, 600 240 C 700 200, 750 100, 800 100" 
                            stroke="rgba(0,0,0,0.05)" 
                            strokeWidth="3" 
                        />
                        <motion.path 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M 100 320 C 250 320, 300 180, 350 180 C 450 180, 500 280, 600 240 C 700 200, 750 100, 800 100" 
                            stroke="#0d55a0" 
                            strokeWidth="3" 
                        />
                    </svg>

                    {/* Milestone Points */}
                    {MILESTONES.map((milestone) => (
                        <div 
                            key={milestone.id}
                            className="absolute z-20 group cursor-pointer"
                            style={{ 
                                left: `${(milestone.cx / VB_W) * 100}%`, 
                                top: `${(milestone.cy / VB_H) * 100}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            onClick={() => setActiveMilestone(milestone)}
                        >
                            {/* Milestone Label (Below) */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                                <span className="text-[10px] font-black text-[#5bb63a] block leading-none mb-1 opacity-40 group-hover:opacity-100 transition-opacity">0{milestone.id}.</span>
                                <span className={`text-[11px] font-black uppercase tracking-tighter transition-colors ${activeMilestone.id === milestone.id ? 'text-[#0d55a0]' : 'text-[#0d55a0]/20 group-hover:text-[#0d55a0]/60'}`}>
                                    {milestone.tag}
                                </span>
                            </div>

                            {/* Dot */}
                            <div className={`relative w-4 h-4 rounded-full transition-all duration-500 ${activeMilestone.id === milestone.id ? 'bg-[#0d55a0] scale-150 shadow-[0_0_20px_rgba(22,104,178,0.2)]' : 'bg-white border-2 border-[#0d55a0]/20 group-hover:border-[#0d55a0]'}`}>
                                {activeMilestone.id === milestone.id && (
                                    <motion.div 
                                        layoutId="glow"
                                        className="absolute inset-0 rounded-full bg-[#0d55a0] blur-md opacity-30" 
                                    />
                                )}
                            </div>

                            {/* Floating Popup Card */}
                            <AnimatePresence>
                                {activeMilestone.id === milestone.id && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 md:w-80 bg-white border border-black/5 rounded-2xl p-6 shadow-2xl z-30 mb-2"
                                    >
                                        <div className="relative">
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#5bb63a] mb-2 block">{milestone.year}</span>
                                            <h3 className="text-lg font-black text-[#0d55a0] uppercase tracking-tighter leading-tight mb-3">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                                                {milestone.description}
                                            </p>
                                            
                                            {/* Pointer/Tail - White for light theme */}
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 4: AWARDS & CERTIFICATIONS ── */}
            <section className="py-24 bg-[#fcfbf7]">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5bb63a] mb-4 block">Quality Standards</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter">
                            AWARDS & <span className="text-[#5bb63a]">CERTIFICATIONS</span>.
                        </h2>
                    </div>

                    {/* Moving Carousel Wrapper */}
                    <div className="relative w-full overflow-hidden py-10">
                        <motion.div 
                            className="flex gap-12 w-fit"
                            animate={{ 
                                x: [0, -1000],
                            }}
                            transition={{ 
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 20,
                                    ease: "linear",
                                },
                            }}
                        >
                            {/* Duplicate items for infinite effect */}
                            {[...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, idx) => (
                                <div 
                                    key={idx}
                                    className="flex flex-col items-center gap-6 shrink-0 w-32"
                                >
                                    <div className="relative w-24 h-24 bg-white rounded-3xl p-4 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                        <Image 
                                            src={cert.image} 
                                            alt={cert.name} 
                                            fill 
                                            className="object-contain p-2 grayscale hover:grayscale-0 transition-all" 
                                        />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-[#0d55a0] text-center opacity-40 hover:opacity-100 transition-all">
                                        {cert.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                        
                        {/* Gradient Fades for Smooth Edges */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fcfbf7] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fcfbf7] to-transparent z-10 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: VISION & MISSION ── */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-[#0d55a0] p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 -translate-y-10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5bb63a] mb-6 block">The Goal</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight mb-6">Our Vision</h3>
                        <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed">
                            To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value for all our stakeholders across the globe.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-[#fcfbf7] p-12 rounded-[3rem] border border-[#0d55a0]/10 shadow-xl relative overflow-hidden text-[#0d55a0]"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d55a0]/5 rounded-full translate-x-10 -translate-y-10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5bb63a] mb-6 block">The Mission</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight mb-6">Our Mission</h3>
                        <p className="text-sm md:text-base text-zinc-500 font-medium leading-relaxed">
                            To secure the highest value for all stakeholders while enriching lives through nutritious and tasty dairy and beverage choices, delivered with absolute purity and excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
