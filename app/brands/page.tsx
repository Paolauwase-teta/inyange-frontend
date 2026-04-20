'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const BRANDS = [
    { 
        slug: 'milk', 
        name: 'Dairy', 
        title: 'Full Cream', 
        subname: 'Milk', 
        description: 'Sourced from local Rwandan farmers, our milk is processed under the strictest hygienic conditions to ensure purity, nutrition, and that rich natural taste you love.', 
        image: '/milk1.png', 
        accent: '#0d55a0',
        features: ['100% locally sourced', 'Rich in natural calcium', 'Strict hygienic processing', 'No artificial preservatives']
    },
    { 
        slug: 'juice', 
        name: 'Nectar', 
        title: 'Premium', 
        subname: 'Fruit Juices', 
        description: 'Experience the vibrant flavors of real fruit. Our juices are the perfect blend of natural sweetness and essential vitamins, crafted for those who demand excellence in every sip.', 
        image: '/juice1.png', 
        accent: '#5bb63a',
        features: ['Real fruit extracts', 'Vital daily vitamins', 'Naturally sweetened', 'Refreshing taste profiles']
    },
    { 
        slug: 'water', 
        name: 'Mineral', 
        title: 'Absolute', 
        subname: 'Spring Water', 
        description: 'Filtered through Rwanda\'s pristine landscapes, Inyange Water is the gold standard for purity. Crisp, clean, and revitalizing—hydration in its most perfect form.', 
        image: '/water1.png', 
        accent: '#33a4df',
        features: ['Natural spring filtration', 'Optimal mineral balance', '100% pure and crisp', 'Perfect for daily hydration']
    },
    { 
        slug: 'milk-products', 
        name: 'Yoghurt', 
        title: 'Velvety', 
        subname: 'Greek Yoghurt', 
        description: 'A creamy masterpiece of balance and flavor. High in protein and rich in texture, our yoghurt collection is designed to nourish your body and delight your palate.', 
        image: '/yoghurt1.png', 
        accent: '#1668b2',
        features: ['High protein content', 'Probiotic active cultures', 'Thick, creamy texture', 'Perfect breakfast base']
    },
];

export default function BrandsLandingPage() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % BRANDS.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + BRANDS.length) % BRANDS.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const active = BRANDS[index];

    return (
        <main className="min-h-screen w-full bg-[#fcfbf7] font-sans">
            
            {/* ── HERO SLIDESHOW (100vh) ── */}
            <section className="h-[100svh] w-full bg-white relative overflow-hidden flex flex-col-reverse md:flex-row border-b border-black/5">
            

            {/* ── LEFT PANEL (CONTENT) ── */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-white flex flex-col justify-center px-10 md:px-32 relative pt-20 md:pt-0">
                

                <div className="relative z-10">
                    <motion.p 
                        key={`eyebrow-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#33a4df] mb-6"
                    >
                        Our Products
                    </motion.p>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.slug}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-4xl md:text-7xl font-black text-[#0d55a0] leading-[0.85] uppercase tracking-tighter mb-8">
                                {active.title} <br />
                                <span className="text-zinc-200">{active.subname}</span>
                            </h2>
                            <p className="text-sm md:text-base text-zinc-500 font-medium leading-relaxed max-w-sm mb-12">
                                {active.description}
                            </p>

                            <Link 
                                href={`/brands/${active.slug}`}
                                className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-[#0d55a0] group"
                            >
                                <span className="relative">
                                    Explore Entire Collection
                                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#33a4df]/20 group-hover:bg-[#33a4df] transition-all" />
                                </span>
                                <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── RIGHT PANEL (VISUAL) ── */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={active.slug}
                        custom={direction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                        style={{ backgroundColor: active.accent }}
                    >
                        {/* Dynamic Floating Bubbles / Shapes (Reference style) */}
                        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                            <motion.div 
                                animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
                                transition={{ repeat: Infinity, duration: 8 }}
                                className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full border border-white/20" 
                            />
                            <motion.div 
                                animate={{ y: [0, 30, 0], x: [0, -20, 0] }} 
                                transition={{ repeat: Infinity, duration: 12 }}
                                className="absolute bottom-[10%] left-[20%] w-96 h-96 rounded-full border border-white/10" 
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.slug}
                            initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -50, rotate: -5 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-[200px] h-[300px] md:w-[450px] md:h-[600px]"
                        >
                            <Image 
                                src={active.image} 
                                alt={active.name} 
                                fill 
                                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)]" 
                                priority
                            />
                            
                            {/* Floating Badge (Milk/Juice/Water label) */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -left-4 md:-left-8 top-[40%] bg-white rounded-full w-16 h-16 md:w-28 md:h-28 flex flex-col items-center justify-center shadow-2xl border border-black/5"
                            >
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#0d55a0]">Inyange</span>
                                <span className="text-[10px] md:text-[16px] font-black text-black leading-none">{active.name}</span>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── VERTICAL NAVIGATION (RIGHT EDGE) ── */}
                <div className="absolute right-0 top-0 bottom-0 w-20 z-50 hidden md:flex flex-col items-center justify-center gap-6 pr-4">
                    {BRANDS.map((brand, i) => (
                        <button
                            key={brand.slug}
                            onClick={() => setIndex(i)}
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className={`w-[2px] transition-all duration-500 rounded-full ${index === i ? 'h-12 bg-white' : 'h-4 bg-white/20 group-hover:h-8 group-hover:bg-white/50'}`} />
                            <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${index === i ? 'text-white' : 'text-white/20 group-hover:text-white/60'}`}>
                                {brand.name}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Mobile Navigation Arrows */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 md:hidden z-50">
                    <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">←</button>
                    <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white text-[#0d55a0] flex items-center justify-center">→</button>
                </div>
                </div>
            </section>

            {/* ── PRODUCT CATEGORY ZIG-ZAG OVERVIEW ── */}
            <div className="max-w-6xl mx-auto px-8 relative z-10 space-y-24 py-24 pb-32">
                {BRANDS.map((category, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                        <section 
                            key={category.slug} 
                            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className={`relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden bg-white border border-black/5 flex items-center justify-center p-12 shadow-sm`}>
                                    {/* Subtle colored glow matching category */}
                                    <div 
                                        className="absolute inset-0 opacity-[0.03]" 
                                        style={{ backgroundColor: category.accent }} 
                                    />
                                    
                                    <Image 
                                        src={category.image} 
                                        alt={category.name} 
                                        fill 
                                        className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700 p-16" 
                                    />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                                {/* Pill Label */}
                                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 mb-8 bg-white shadow-sm">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{category.subname}</span>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6 text-black">
                                    Experience excellence in every serving of pure <span style={{ color: category.accent }}>{category.name.toLowerCase()}</span>.
                                </h3>

                                <p className="text-zinc-500 font-medium leading-relaxed mb-10 max-w-lg">
                                    {category.description}
                                </p>

                                {/* Features Grid based on Mockup */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 w-full max-w-lg mb-10">
                                    {category.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-3">
                                            {/* Blue Checkmark SVG */}
                                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1668b2] flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-[12px] font-medium text-[#1668b2]">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <Link 
                                    href={`/brands/${category.slug}`}
                                    className="inline-flex items-center gap-3 bg-white border border-[#1668b2]/20 text-[#1668b2] hover:bg-[#1668b2] hover:text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-xl"
                                >
                                    Explore {category.name} <span className="text-lg leading-none">→</span>
                                </Link>
                            </div>
                        </section>
                    );
                })}
            </div>

        </main>
    );
}
