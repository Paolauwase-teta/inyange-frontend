'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams, notFound } from 'next/navigation';

// SVG Icons
const Icons = {
    Bone: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>, // Replacing with simple crosses/stars for generic features
    Sun: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    Cow: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    Shield: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    Farm: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>,
    Drop: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    Fruit: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4c0-2 2-2 2-2s2 0 2 2" /></svg>,
    Leaf: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 0v7" /></svg>,
    Sparkles: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    Ice: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Mountain: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    CircleZero: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path d="M12 8v8" /></svg>,
    Diamond: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l-6 6v8l6 6 6-6V8l-6-6z" /></svg>,
    Microscope: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21H3M12 3v14" /></svg>,
    Running: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l2 2m0 0l-2 2m2-2H9m12 10a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Bacteria: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" /><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /></svg>,
    Muscle: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    Bowl: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 8a8 8 0 0016 0M4 8v4a8 8 0 0016 0V8" /></svg>,
    MilkGlass: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v12a4 4 0 01-4 4H8a4 4 0 01-4-4V4z" /></svg>,
    Clock: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
};

const BRAND_DATA: Record<string, any> = {
    'milk': {
        title: 'Full Cream',
        subtitle: 'Milk',
        description: 'Using high-quality, locally sourced milk ensures your family gets the freshest dairy every morning. Rich in natural calcium and essential vitamins to nourish growing children and active adults.',
        image: '/milk1.png',
        accent: '#DCEAFA', // Light blueish right side
        bgLeft: '#FFFFFF', // White left side
        ingredientsLeft: [
            { name: 'Calcium', icon: <Icons.Bone /> },
            { name: 'Vitamin D', icon: <Icons.Sun /> },
            { name: 'Pure', icon: <Icons.Cow /> },
        ],
        ingredientsRight: [
            { name: 'Pasteurized', icon: <Icons.Shield /> },
            { name: 'Local Farm', icon: <Icons.Farm /> },
            { name: 'No Additives', icon: <Icons.Drop /> },
        ],
        recommendations: [
            { id: 1, name: 'Greek Yoghurt', size: '250g', image: '/yoghurt1.png', link: '/brands/milk-products' },
            { id: 2, name: 'Low Fat Milk', size: '1L', image: '/milk1.png', link: '/brands/milk' }
        ]
    },
    'juice': {
        title: 'Premium',
        subtitle: 'Mango Nectar',
        description: 'Using real fruits as the basis for your morning boost takes the idea of fresh-squeezed juice to a whole new plane. Experience vibrant, natural sweet flavors packed with daily vitamins.',
        image: '/juice1.png',
        accent: '#FDE4B3', // Orangey-yellow right side
        bgLeft: '#F5F6F0', // Beige left side
        ingredientsLeft: [
            { name: 'Mango', icon: <Icons.Fruit /> },
            { name: 'Vitamin C', icon: <Icons.Sun /> },
            { name: 'Sweet', icon: <Icons.Fruit /> },
        ],
        ingredientsRight: [
            { name: 'Natural', icon: <Icons.Leaf /> },
            { name: 'Antioxidants', icon: <Icons.Sparkles /> },
            { name: 'Fresh', icon: <Icons.Ice /> },
        ],
        recommendations: [
            { id: 1, name: 'Apple Nectar', size: '500ml', image: '/juice1.png', link: '/brands/juice' },
            { id: 2, name: 'Mixed Fruit', size: '1L', image: '/juice1.png', link: '/brands/juice' }
        ]
    },
    'water': {
        title: 'Absolute',
        subtitle: 'Spring Water',
        description: 'Filtered through Rwanda\'s pristine landscapes, Inyange Water is the gold standard for purity. Crisp, clean, and revitalizing—hydration in its most perfect form for your active lifestyle.',
        image: '/water1.png',
        accent: '#D0EEFD', // Light cyan
        bgLeft: '#FFFFFF', // White
        ingredientsLeft: [
            { name: 'Spring Source', icon: <Icons.Mountain /> },
            { name: '0 Calories', icon: <Icons.CircleZero /> },
            { name: 'Minerals', icon: <Icons.Diamond /> },
        ],
        ingredientsRight: [
            { name: 'Purified', icon: <Icons.Microscope /> },
            { name: 'Refreshing', icon: <Icons.Ice /> },
            { name: 'Hydration', icon: <Icons.Running /> },
        ],
        recommendations: [
            { id: 1, name: 'Still Water', size: '500ml', image: '/water1.png', link: '/brands/water' },
            { id: 2, name: 'Sparkling', size: '1L', image: '/water1.png', link: '/brands/water' }
        ]
    },
    'milk-products': {
        title: 'Velvety',
        subtitle: 'Greek Yoghurt',
        description: 'A creamy masterpiece of balance and flavor. High in protein and rich in texture, our yoghurt collection is designed to nourish your body and delight your palate every single day.',
        image: '/yoghurt1.png',
        accent: '#E6E9FE', // Light purple/blue
        bgLeft: '#FCFBF7', 
        ingredientsLeft: [
            { name: 'Probiotics', icon: <Icons.Bacteria /> },
            { name: 'Protein', icon: <Icons.Muscle /> },
            { name: 'Creamy', icon: <Icons.Bowl /> },
        ],
        ingredientsRight: [
            { name: 'Real Milk', icon: <Icons.MilkGlass /> },
            { name: 'Calcium', icon: <Icons.Bone /> },
            { name: 'Snack', icon: <Icons.Clock /> },
        ],
        recommendations: [
            { id: 1, name: 'Strawberry', size: '250g', image: '/yoghurt1.png', link: '/brands/milk-products' },
            { id: 2, name: 'Vanilla', size: '500g', image: '/yoghurt1.png', link: '/brands/milk-products' }
        ]
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
        <main className="min-h-screen relative overflow-hidden flex font-sans">
            
            {/* Background Split */}
            <div className="absolute inset-0 flex z-0">
                <div className="w-full lg:w-[60%] h-full transition-colors duration-1000" style={{ backgroundColor: data.bgLeft }}></div>
                <div className="hidden lg:block w-[40%] h-full transition-colors duration-1000" style={{ backgroundColor: data.accent }}></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row pt-[120px] lg:pt-[160px] pb-16 lg:pb-32">
                
                {/* ── LEFT COLUMN (INFO) ── */}
                <div className="w-full lg:w-[55%] px-8 lg:px-20 flex flex-col pt-4">
                    
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[1.05] tracking-tight mb-8">
                            {data.title}<br/>{data.subtitle}
                        </h1>

                        {/* Description */}
                        <p className="text-zinc-600 font-medium leading-relaxed max-w-[420px] text-sm md:text-[15px] mb-12">
                            {data.description}
                        </p>
                    </motion.div>

                    {/* Recommendations (You might also like) */}
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6, delay:0.2}} className="flex flex-col mt-auto pt-16 lg:pt-32">
                        <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-6">You might also like :</h4>
                        <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 scrollbar-hide">
                            {data.recommendations.map((rec: any, idx: number) => (
                                <Link href={rec.link} key={rec.id} className="group bg-white rounded-3xl p-4 pr-12 min-w-[200px] flex gap-4 items-center shadow-[0_5px_15px_rgba(0,0,0,0.03)] border border-black/5 relative hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all">
                                    <div className="w-8 h-12 relative shrink-0">
                                        <Image src={rec.image} alt={rec.name} fill className="object-contain group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h5 className="text-[11px] font-bold leading-tight text-black mb-1.5">{rec.name}</h5>
                                        <span className="text-[9px] text-zinc-400 font-black tracking-widest">{rec.size}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── RIGHT COLUMN (VISUAL) ── */}
                <div className="w-full lg:w-[45%] h-[400px] md:h-[500px] lg:h-auto relative flex items-center justify-center mt-6 lg:mt-0 lg:pb-24">
                    
                    {/* The bottle */}
                    <div className="relative w-[140px] h-[280px] md:w-[180px] md:h-[360px] lg:w-[200px] lg:h-[400px] z-20">
                        <motion.div 
                            animate={{y: [0, -10, 0]}} 
                            transition={{repeat: Infinity, duration: 4, ease: "easeInOut"}} 
                            className="w-full h-full"
                        >
                            <Image 
                                src={data.image} 
                                alt={data.title} 
                                fill 
                                className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)]" 
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Left Ingredients Tags (Now spaced more compactly) */}
                    <div className="absolute left-[5%] lg:-left-[5%] top-[15%] md:top-[15%] lg:top-[25%] flex flex-col gap-8 lg:gap-10 z-30 pointer-events-none">
                        {data.ingredientsLeft.map((ing: any, i: number) => (
                            <motion.div 
                                key={i} 
                                className="flex items-center gap-3 lg:gap-4 ml-[-10px] lg:ml-0" 
                                initial={{opacity:0, x:-20}} 
                                animate={{opacity:1, x:0}} 
                                transition={{delay: i*0.2 + 0.5}}
                            >
                                <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#1c1c1c] bg-white/40 lg:bg-transparent px-2 py-1 rounded lg:p-0">{ing.name}</span>
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white shadow-xl shadow-black/5 flex items-center justify-center border border-black/5 text-zinc-500">
                                    {ing.icon}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Ingredients Tags */}
                    <div className="absolute right-[5%] lg:right-[15%] top-[15%] md:top-[15%] lg:top-[25%] flex flex-col gap-8 lg:gap-10 z-30 pointer-events-none">
                        {data.ingredientsRight.map((ing: any, i: number) => (
                            <motion.div 
                                key={i} 
                                className="flex items-center flex-row-reverse gap-3 lg:gap-4 mr-[-10px] lg:mr-0" 
                                initial={{opacity:0, x:20}} 
                                animate={{opacity:1, x:0}} 
                                transition={{delay: i*0.2 + 0.5}}
                            >
                                <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#1c1c1c] bg-white/40 lg:bg-transparent px-2 py-1 rounded lg:p-0">{ing.name}</span>
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white shadow-xl shadow-black/5 flex items-center justify-center border border-black/5 text-[#0d55a0]">
                                    {ing.icon}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Background circular highlight to separate bottle from background slightly */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-white/20 rounded-full blur-[80px] z-0 pointer-events-none" />

                </div>

            </div>
        </main>
    );
}
