"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
    '/editorial_hero.png',
    '/editorial_showcase_1.png',
    '/editorial_showcase_2.png'
];

interface BlogPost {
    id: number;
    slug: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    readTime: string;
}

interface EventData {
    id: number;
    date: string;
    day: string;
    title: string;
    excerpt: string;
    image: string;
}

const EVENTS: EventData[] = [
    {
        id: 1,
        date: "Dimanche 25 mai 2025",
        day: "25 MAI",
        title: "Fête du village - Édition 2025",
        excerpt: "Repas champêtre, concert, bal en plein air et feu d'artifice pour célébrer l'été ensemble.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        date: "Dimanche 15 juin 2025",
        day: "15 JUIN",
        title: "Randonnée découverte",
        excerpt: "Sortie accompagnée par un guide local, accessible à tous. Prévoir de bonnes...",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        date: "Samedi 12 juillet 2025",
        day: "12 JUIL",
        title: "Marché des Producteurs",
        excerpt: "Découvrez les meilleurs produits locaux directement de nos fermes partenaires Inyange.",
        image: "https://images.unsplash.com/photo-1488459739019-19e53f17822d?auto=format&fit=crop&w=800&q=80"
    }
];

export default function EditorialPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [currImg, setCurrImg] = useState(0);

    // Auto-cycle background images
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrImg((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => {
                setPosts(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getCategoryImage = (category: string) => {
        const categoryMap: Record<string, string> = {
            Dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
            Water: 'https://images.unsplash.com/photo-1564419436560-3df38e63c1c7?auto=format&fit=crop&w=800&q=80',
            Juice: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
            Operations: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
        };
        return categoryMap[category] || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80';
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#fcfbf7] font-sans flex flex-col items-center justify-center">
                <p className="text-[#0d55a0] font-black uppercase tracking-widest text-[10px]">Loading Newsroom...</p>
            </main>
        );
    }

    const categories = ['All', 'Dairy', 'Water', 'Juice', 'Operations'];
    
    // Filter posts based on active category
    const filteredPosts = activeCategory === 'All' 
        ? posts 
        : posts.filter(p => p.category === activeCategory);

    const featuredPost = filteredPosts[0];
    const latestPosts = filteredPosts.slice(1, 4);

    return (
        <main className="min-h-screen bg-[#f7f8fa] font-sans">

            {/* ── SECTION 1: EDITORIAL HERO ── */}
            <section className="relative w-full h-[50vh] md:h-[60vh] bg-black flex items-center justify-center">
                
                {/* Cinematic Background Slider */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currImg}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image 
                                src={HERO_IMAGES[currImg]} 
                                alt={`Inyange Editorial Background ${currImg + 1}`} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Dark Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#f7f8fa]" />
                    <div className="absolute inset-0 bg-[#0d55a0]/10 mix-blend-multiply" />
                </div>

                {/* Giant Background Typography - Watermark Layer */}
                <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 overflow-hidden px-4">
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 0.85, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-[8px] font-black uppercase tracking-[0.4em] text-white mb-4 drop-shadow-md opacity-85"
                    >
                        The Inyange Newsroom
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-[10vw] font-black text-white/[0.98] uppercase tracking-tighter leading-none"
                    >
                        INSIGHT
                    </motion.h1>
                </div>

                {/* Floating Search Card (Tied to the bottom edge) - Top Layer */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-30 translate-y-1/2">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-white rounded-xl md:rounded-2xl shadow-[0_15px_40px_rgba(13,85,160,0.1)] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/50 backdrop-blur-sm"
                    >
                        <div className="flex-1">
                            <p className="text-[8px] font-black uppercase tracking-widest text-[#0d55a0] mb-1">Editor's Note</p>
                            <h3 className="text-[10px] md:text-xs font-bold text-black tracking-tight leading-tight">
                                Give All You Need. <br /> <span className="text-zinc-400">Discover everything about Inyange.</span>
                            </h3>
                        </div>

                        <div className="w-full md:w-[40%] relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0d55a0]/40">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <input 
                                type="text"
                                placeholder="Search..."
                                className="w-full h-10 md:h-12 pl-10 pr-24 bg-zinc-50 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-[#0d55a0]/10 border border-zinc-100 transition-all"
                            />
                            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#0d55a0] text-white px-4 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#33a4df] transition-colors shadow-md">
                                Search
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 2: NEWSROOM (Actualités Style) ── */}
            <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-[#f7f8fa]">
                {/* Organic Background Blobs */}
                <div className="absolute top-5 -left-10 w-48 h-48 bg-[#fcfbf7] rounded-full blur-3xl opacity-60 z-0" />
                <div className="absolute bottom-5 -right-10 w-[15rem] h-[15rem] bg-[#fcfbf7] rounded-full blur-3xl opacity-60 z-0" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                        <div className="max-w-xl flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#0d55a0] opacity-40 whitespace-nowrap">Latest Insights</span>
                                <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#0d55a0] leading-none mb-3">
                                Inyange Stories
                            </h2>
                            <p className="text-zinc-500 text-[11px] leading-relaxed font-medium max-w-sm">
                                Deep dives into our heritage, sustainability efforts, and the voices behind our products.
                            </p>
                        </div>
                        <Link 
                            href="/newsroom" 
                            className="bg-[#0d55a0] text-white px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-[#33a4df] transition-colors shadow-sm mb-1"
                        >
                            View All News
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Featured News (Overlapping Layout) */}
                        <div className="lg:col-span-7 relative group">
                            <div className="relative aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden shadow-md">
                                <Image 
                                    src={featuredPost ? getCategoryImage(featuredPost.category) : '/editorial_hero.png'}
                                    alt={featuredPost?.title || 'Featured News'}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            
                            {/* Overlapping Card */}
                            <div className="mt-[-8%] ml-[4%] relative z-20 w-[90%] md:w-[65%]">
                                <motion.div 
                                    whileHover={{ y: -3 }}
                                    className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg border border-zinc-50"
                                >
                                    <span className="bg-[#0d55a0] text-white px-2 py-0.5 rounded-full text-[6px] font-black uppercase tracking-widest mb-2 inline-block">
                                        Published {featuredPost?.date || 'Today'}
                                    </span>
                                    <h3 className="text-base md:text-lg font-black text-black mb-1.5 leading-tight group-hover:text-[#0d55a0] transition-colors">
                                        {featuredPost?.title}
                                    </h3>
                                    <p className="text-zinc-500 text-[10px] leading-relaxed mb-4 line-clamp-2">
                                        {featuredPost?.excerpt}
                                    </p>
                                    <Link 
                                        href={`/editorial/post/${featuredPost?.slug}`}
                                        className="flex items-center gap-1.5 text-[#0d55a0] font-black text-[8px] uppercase tracking-widest group/link"
                                    >
                                        READ STORY
                                        <div className="w-6 h-6 rounded-full bg-[#0d55a0]/5 text-[#0d55a0] flex items-center justify-center transition-all group-hover/link:bg-[#0d55a0] group-hover/link:text-white">
                                            <span className="text-xs">→</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Column: Secondary Stories (Timeline List) */}
                        <div className="lg:col-span-5 space-y-6 pt-4 md:pt-0">
                            {latestPosts.map((post, idx) => (
                                <div key={post.id} className="relative pl-6 group">
                                    {/* Timeline Marker Line */}
                                    <div className="absolute top-0 left-0 w-[1px] h-full bg-zinc-200 group-hover:bg-[#0d55a0]/15 transition-colors" />
                                    <div className="absolute top-0 left-[-2px] w-[5px] h-[5px] rounded-full bg-[#0d55a0] shadow-sm group-hover:scale-125 transition-transform border border-white" />
                                    
                                    <div className="pt-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="bg-[#0d55a0]/5 text-[#0d55a0] px-1.5 py-0.5 rounded-full text-[6px] font-black uppercase tracking-widest">
                                                {post.date}
                                            </span>
                                        </div>
                                        <h4 className="text-[14px] font-bold text-black mb-1 leading-snug group-hover:text-[#0d55a0] transition-colors">
                                            {post.title}
                                        </h4>
                                        <p className="text-zinc-500 text-[11px] leading-relaxed mb-2 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <Link 
                                            href={`/editorial/post/${post.slug}`}
                                            className="inline-flex items-center gap-1 text-[#0d55a0] font-bold text-[7px] uppercase tracking-[0.2em] group/link"
                                        >
                                            Read More
                                            <span className="text-xs group-hover/link:translate-x-0.5 transition-transform">→</span>
                                        </Link>
                                    </div>
                                    {idx < latestPosts.length - 1 && <div className="mt-6 h-[1px] w-full bg-zinc-50" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: COMMUNITY AGENDA (Slider Design) ── */}
            <section className="bg-white py-12 md:py-16 relative overflow-hidden">
                {/* Organic Background Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-white rounded-full blur-[50px] opacity-40 z-0" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                        <div className="max-w-xl flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#0d55a0] opacity-40 whitespace-nowrap">Calendar</span>
                                <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#0d55a0] leading-none mb-3">
                                Agenda
                            </h2>
                            <p className="text-zinc-500 text-[11px] leading-relaxed font-medium max-w-sm">
                                Stay connected with our community events, factory tours, and sustainable farming initiatives globally.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-1">
                            <Link 
                                href="/events" 
                                className="bg-[#0d55a0] text-white px-4 py-1.5 rounded-full text-[7px] font-black uppercase tracking-widest hover:bg-[#33a4df] transition-colors shadow-sm"
                            >
                                All Events
                            </Link>
                            <div className="flex gap-1">
                                <button className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center text-[#0d55a0] hover:bg-white transition-all text-[10px]">
                                    ←
                                </button>
                                <button className="w-7 h-7 rounded-full bg-[#0d55a0] text-white flex items-center justify-center shadow-sm hover:bg-[#33a4df] transition-all text-[10px]">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Card Slider */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {EVENTS.map((event) => (
                            <motion.div 
                                key={event.id}
                                whileHover={{ y: -4 }}
                                className="flex flex-col group"
                            >
                                <div className="relative aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden mb-4 shadow-md">
                                    <Image 
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Date Sticker */}
                                    <div className="absolute bottom-3 left-3 bg-[#0d55a0] text-white px-2 py-0.5 rounded-md text-[6px] font-black uppercase tracking-widest shadow-lg">
                                        {event.day}
                                    </div>
                                </div>
                                <div className="px-1">
                                    <p className="text-[6px] font-black text-[#0d55a0] uppercase tracking-widest mb-1">
                                        {event.date}
                                    </p>
                                    <h4 className="text-base font-bold text-black mb-1 leading-tight group-hover:text-[#0d55a0] transition-colors">
                                        {event.title}
                                    </h4>
                                    <p className="text-zinc-500 text-[10px] leading-relaxed mb-3 line-clamp-2">
                                        {event.excerpt}
                                    </p>
                                    <Link 
                                        href="#" 
                                        className="inline-flex items-center gap-1 text-[#0d55a0] font-black text-[7px] uppercase tracking-[0.1em] group/link"
                                    >
                                        Details
                                        <span className="text-xs group-hover/link:translate-x-0.5 transition-transform">→</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
