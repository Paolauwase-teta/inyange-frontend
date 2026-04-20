'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams, notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';

const BRAND_DATA: Record<string, any> = {
    'milk': {
        title: 'Pasteurized Milk',
        watermark: 'PURE MILK',
        image: '/products/milk1.png',
        leftStats: [
            { label: 'Quality', value: 'Farm Fresh' },
            { label: 'Process', value: 'Hygienic' },
        ],
        rightStats: [
            { label: 'Mineral', value: 'High Calcium' },
            { label: 'Vitamin', value: 'A & D' },
        ],
        description: 'Naturally sourced and pasteurized to perfection, our milk ensures the highest nutritional value for your family.',
        extendedDescription: 'For generations, Inyange Milk has been a cornerstone of the Rwandan family breakfast. We source our milk from dedicated local farmers, ensuring that every carton supports our community while providing the essential nutrients for growing children and active adults. Our commitment to high calcium and vitamins A & D makes us more than just a beverage; we are a partner in your family\'s long-term health and vitality.',
        communityImage: 'https://images.unsplash.com/photo-1510444983656-7ba67b438258?auto=format&fit=crop&q=80&w=1200',
        awards: ['East African Dairy Excellence 2023', 'National Health Choice Award']
    },
    'juice': {
        title: 'Premium Juice',
        watermark: '100% PURE',
        image: '/products/juice1.png',
        leftStats: [
            { label: 'Source', value: 'Natural Fruit' },
            { label: 'Pure', value: 'No Preservatives' },
        ],
        rightStats: [
            { label: 'Boost', value: 'Vitamin C' },
            { label: 'Rich', value: 'Antioxidants' },
        ],
        description: 'Squeezed from the finest hand-picked fruits, our juices offer a refreshing burst of nature in every sip.',
        extendedDescription: 'Inyange Juices are crafted to bring the vibrant flavors of the sun-drenched orchards directly to your table. By choosing 100% pure fruit with no added preservatives, we ensure that your family receives a natural boost of Vitamin C and essential antioxidants. Whether sharing a meal or celebrating a milestone, Inyange Juice is the authentic taste of joy and refreshment in our community.',
        communityImage: 'https://images.unsplash.com/photo-1574914629385-46448b767aec?auto=format&fit=crop&q=80&w=1200',
        awards: ['Best Natural Beverage 2024', 'Consumer Choice: Purity Grade A']
    },
    'water': {
        title: 'Mineral Water',
        watermark: 'CRYSTAL CLEAR',
        image: '/products/water1.png',
        leftStats: [
            { label: 'Depth', value: 'Natural Spring' },
            { label: 'Filter', value: 'Multi-Stage' },
        ],
        rightStats: [
            { label: 'Balance', value: 'Minerals' },
            { label: 'Calories', value: 'Zero' },
        ],
        description: 'Purified through advanced technology while retaining essential minerals for ultimate hydration and health.',
        extendedDescription: 'Hydration is the foundation of a thriving community. Inyange Mineral Water is sourced from protected deep-water springs and processed through multiple stages of filtration to ensure crystal clarity and a perfect mineral balance. From the workplace to the sports field, we provide the clean, refreshing hydration that allows our people to perform at their best every single day.',
        communityImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
        awards: ['Pure Water Standards 2023', 'Sustainability Innovation Award']
    },
    'milk-products': {
        title: 'Premium Yoghurt',
        watermark: 'RICH CREAMY',
        image: '/products/yoghurt1.png',
        leftStats: [
            { label: 'Texture', value: 'Smooth' },
            { label: 'Flavor', value: 'Natural' },
        ],
        rightStats: [
            { label: 'Gut Health', value: 'Probiotics' },
            { label: 'Protein', value: 'High' },
        ],
        description: 'A creamy delight crafted with live cultures and the freshest milk for a healthy, delicious treat.',
        extendedDescription: 'Inyange Yoghurt is where health meets indulgence. Crafted with the same high-quality milk that has made us a household name, our yoghurt is enriched with probiotics to support gut health and high protein for natural energy. It is the perfect, wholesome snack for busy students, active professionals, and families seeking a delicious way to stay nourished throughout the day.',
        communityImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1200',
        awards: ['Dairy Innovation Finalist 2024', 'Healthy Snack of the Year']
    }
};

export default function BrandDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const data = BRAND_DATA[slug];

    if (!data) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white relative overflow-hidden flex flex-col">
            <Navbar />

            {/* Background Pattern */}
            <div 
                className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                style={{ backgroundImage: "url('/pattern.png')" }}
            />

            {/* Main Showcase Section */}
            <section className="relative flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-8 overflow-hidden min-h-screen">
                
                {/* 1. Watermark Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-[18vw] font-black text-black/[0.03] leading-none whitespace-nowrap tracking-tighter uppercase"
                    >
                        {data.watermark}
                    </motion.h2>
                </div>

                {/* 2. Interactive Product Display */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
                    
                    {/* Left Flank: Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hidden md:flex flex-col gap-12 w-1/4"
                    >
                        {data.leftStats.map((stat: any, i: number) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df]">{stat.label}</span>
                                <div className="h-[2px] w-8 bg-[#5bb63a] mb-2" />
                                <h3 className="text-2xl lg:text-3xl font-black text-[#0d55a0] uppercase tracking-tighter">{stat.value}</h3>
                            </div>
                        ))}
                    </motion.div>

                    {/* Center: Floating Product Image */}
                    <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] lg:w-[500px] lg:h-[700px] shrink-0">
                        <motion.div
                            animate={{ 
                                y: [0, -20, 0],
                            }}
                            transition={{ 
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-full h-full drop-shadow-[0_50px_80px_rgba(13,85,160,0.15)]"
                        >
                            <Image 
                                src={data.image} 
                                alt={data.title} 
                                fill 
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                        
                        {/* Glow/Shadow base */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#0d55a0]/5 blur-2xl rounded-full scale-x-[3]" />
                    </div>

                    {/* Right Flank: Nutrition */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="hidden md:flex flex-col gap-12 items-end w-1/4 text-right"
                    >
                        {data.rightStats.map((stat: any, i: number) => (
                            <div key={i} className="flex flex-col gap-2 items-end">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df]">{stat.label}</span>
                                <div className="h-[2px] w-8 bg-[#5bb63a] mb-2" />
                                <h3 className="text-2xl lg:text-3xl font-black text-[#0d55a0] uppercase tracking-tighter">{stat.value}</h3>
                            </div>
                        ))}
                    </motion.div>

                    {/* Content for Mobile */}
                    <div className="flex md:hidden flex-col items-center gap-8 text-center mt-8">
                        <h1 className="text-4xl font-black text-[#0d55a0] uppercase tracking-tighter">{data.title}</h1>
                        <div className="grid grid-cols-2 gap-8 px-4">
                            {[...data.leftStats, ...data.rightStats].map((stat: any, i: number) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-[#33a4df]">{stat.label}</span>
                                    <span className="text-sm font-black text-[#0d55a0] uppercase">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Center Info */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="relative z-20 mt-12 md:mt-0 text-center max-w-xl mx-auto"
                >
                    <h1 className="hidden md:block text-5xl font-black text-[#0d55a0] uppercase tracking-tighter mb-4 leading-none">{data.title}</h1>
                    <p className="text-zinc-500 font-medium leading-relaxed italic text-xs md:text-sm">
                        "{data.description}"
                    </p>
                </motion.div>
            </section>

            {/* ── SECTION 2: COMMUNITY APPRECIATION & AWARDS ── */}
            <section className="relative z-10 bg-[#fcfbf7] py-24 px-8 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Awards Ribbon */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24 pb-12 border-b border-[#0d55a0]/5"
                    >
                        {data.awards.map((award: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 group-hover:bg-[#5bb63a] transition-all">
                                    <span className="text-[#5bb63a] group-hover:text-white text-xl">🏆</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0d55a0]">{award}</span>
                                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">Recognized Quality</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        
                        {/* Left: Authentic Lifestyle Image */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="lg:w-1/2 relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-2xl"
                        >
                            <Image 
                                src={data.communityImage} 
                                alt="Community Appreciation" 
                                fill 
                                className="object-cover"
                            />
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-[#0d55a0]/5 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            
                            <div className="absolute bottom-12 left-12 right-12">
                                <p className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-2">
                                    Trusted by <br /> <span className="text-[#33a4df]">Generations</span>.
                                </p>
                                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Inyange in the Community</p>
                            </div>
                        </motion.div>

                        {/* Right: Deep Dive Content */}
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df] mb-4 block">Product Philosophy</span>
                                <h2 className="text-4xl md:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter leading-[0.95] mb-8">
                                    Nourishing the <br /> <span className="text-[#5bb63a]">Heart of Rwanda</span>.
                                </h2>
                                
                                <div className="space-y-6">
                                    <p className="text-zinc-600 font-medium text-lg leading-relaxed">
                                        {data.extendedDescription}
                                    </p>
                                    <div className="pt-8">
                                        <div className="grid grid-cols-2 gap-8 border-t border-[#0d55a0]/10 pt-8">
                                            <div>
                                                <h4 className="text-[10px] font-black text-[#0d55a0] uppercase tracking-widest mb-2">Health First</h4>
                                                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">Strict adherence to national nutritional standards ensuring 100% safety for all ages.</p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black text-[#0d55a0] uppercase tracking-widest mb-2">Social Bond</h4>
                                                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">Supporting over 5,000 local farming households through sustainable procurement chains.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
