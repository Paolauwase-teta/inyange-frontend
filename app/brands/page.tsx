'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const BRAND_CATEGORIES = [
    { slug: 'milk', name: 'Milk', image: '/products/milk1.png', accent: '#0d55a0' },
    { slug: 'juice', name: 'Juice', image: '/products/juice1.png', accent: '#5bb63a' },
    { slug: 'water', name: 'Water', image: '/products/water1.png', accent: '#33a4df' },
    { slug: 'milk-products', name: 'Yoghurt', image: '/products/yoghurt1.png', accent: '#0d55a0' },
];

export default function BrandsLandingPage() {
    return (
        <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">
            <Navbar />

            {/* Background Pattern */}
            <div 
                className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                style={{ backgroundImage: "url('/pattern.png')" }}
            />

            <section className="relative z-10 pt-32 pb-20 px-8 flex-1">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df] mb-4 block">Our Portfolio</span>
                        <h1 className="text-4xl md:text-7xl font-black text-[#0d55a0] uppercase tracking-tighter leading-none mb-6">
                            EXPLORE <br /> <span className="text-[#5bb63a]">OUR BRANDS</span>.
                        </h1>
                        <p className="text-zinc-500 font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            From the purest spring water to the freshest dairy products, discover the excellence that makes Inyange a household name across Rwanda and the region.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {BRAND_CATEGORIES.map((category, idx) => (
                            <motion.div
                                key={category.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link href={`/brands/${category.slug}`} className="group relative block bg-[#fcfbf7] rounded-[3rem] p-10 border border-black/5 hover:border-[#5bb63a]/30 hover:shadow-2xl transition-all h-full">
                                    <div className="relative aspect-square w-full mb-8">
                                        <Image 
                                            src={category.image} 
                                            alt={category.name} 
                                            fill 
                                            className="object-contain group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">{category.name} Collection</span>
                                        <h3 className="text-2xl font-black text-[#0d55a0] uppercase tracking-tighter group-hover:text-[#5bb63a] transition-all">{category.name}</h3>
                                    </div>
                                    
                                    {/* Abstract corner decoration */}
                                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full border-2 border-[#0d55a0]/5 flex items-center justify-center group-hover:bg-[#5bb63a] group-hover:border-[#5bb63a] transition-all">
                                        <span className="text-zinc-300 group-hover:text-white transition-all text-xl">→</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
