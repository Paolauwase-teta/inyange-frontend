"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getAsset } from '@/lib/getAsset';

import { CATEGORIES, BLOG_POSTS, TOP_POSTS } from './data';

const INSTAGRAM_PICS = [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=200',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=200',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=200',
];

function BlogHubContent() {
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('Everything');
    const [searchQuery, setSearchQuery] = useState('');

    // Initialize search from URL query
    useEffect(() => {
        const query = searchParams.get('s');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = activeCategory === 'Everything' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.title.toLowerCase().startsWith(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-white min-h-screen font-inter pb-20">
            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[300px] flex flex-col items-center justify-center overflow-hidden bg-[#0d55a0] pt-32 pb-12">
                {/* Brand Pattern Overlay */}
                <div 
                    className="absolute inset-0 bg-repeat bg-[length:400px] z-0 opacity-[0.08]"
                    style={{ backgroundImage: "url('/pattern.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d55a0]/10 to-[#0d55a0]/40 z-10" />
                
                <div className="relative z-20 text-center px-6">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] font-black uppercase tracking-[0.6em] text-white/70 mb-4"
                    >
                        Inyange Insights
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
                    >
                        {searchQuery ? `Searching: ${searchQuery}` : (activeCategory === 'Everything' ? 'The Blog' : activeCategory)}
                    </motion.h1>
                </div>
            </section>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-[1700px] mx-auto px-16 md:px-48 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
                    
                    {/* LEFT COLUMN: SIDEBAR (1/3) */}
                    <aside className="lg:w-[30%] space-y-16 order-1 lg:order-1">
                        
                        {/* 1. SEARCH */}
                        <div className="relative">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..." 
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3.5 text-[12px] font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#0d55a0]/10 transition-all placeholder:text-zinc-400"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <svg className="w-3.5 h-3.5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                                </svg>
                            </div>
                        </div>

                        {/* 2. CATEGORIES GRID */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Categories</h4>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => setActiveCategory('Everything')}
                                    className={`relative h-14 group overflow-hidden rounded-xl flex items-center px-6 transition-all ${activeCategory === 'Everything' ? 'bg-[#0d55a0] text-white' : 'bg-zinc-50'}`}
                                >
                                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Everything</span>
                                </button>
                                {CATEGORIES.map((cat) => (
                                    <button 
                                        key={cat.name}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className="relative h-14 group overflow-hidden rounded-xl flex items-center px-6"
                                    >
                                        <Image src={cat.image} fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity" alt={cat.name} />
                                        <div className={`absolute inset-0 transition-colors ${activeCategory === cat.name ? 'bg-[#0d55a0]/10' : 'bg-black/5 group-hover:bg-black/10'}`} />
                                        <div className="relative z-10 flex items-center justify-between w-full">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${activeCategory === cat.name ? 'text-[#0d55a0]' : 'text-zinc-500 group-hover:text-black'}`}>{cat.name}</span>
                                            <span className="text-[9px] font-bold text-zinc-400">{cat.count}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. TOP POSTS */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Top Posts</h4>
                            <div className="space-y-8">
                                {TOP_POSTS.map((post, i) => (
                                    <Link key={post.id} href={`/editorial/blog/${post.id}`} className="flex gap-4 group">
                                        <span className="text-2xl font-black text-zinc-100 group-hover:text-[#0d55a0] transition-colors leading-none">{i + 1}</span>
                                        <div>
                                            <h5 className="text-[13px] font-bold text-black leading-tight mb-1 group-hover:text-[#0d55a0] transition-colors line-clamp-2">{post.title}</h5>
                                            <span className="text-[8px] font-black text-[#33a4df] uppercase tracking-widest">{post.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* 4. INSTAGRAM GRID */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Instagram</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {INSTAGRAM_PICS.map((pic, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                                        <Image src={pic} fill className="object-cover group-hover:scale-110 transition-transform duration-500" alt="Instagram" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* RIGHT COLUMN: BLOG FEED (2/3) */}
                    <div className="lg:w-[72%] order-2 lg:order-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.length > 0 ? filteredPosts.map((post, idx) => (
                                    <motion.div 
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="group flex flex-col"
                                    >
                                        <Link href={`/editorial/blog/${post.id}`} className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-zinc-100 block shadow-md">
                                            <Image 
                                                src={post.image} 
                                                alt={post.title} 
                                                fill 
                                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#0d55a0] text-[7px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </Link>
                                        
                                        <div className="flex flex-col px-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{post.date}</span>
                                                <span className="w-0.5 h-0.5 rounded-full bg-zinc-200" />
                                                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{post.author}</span>
                                            </div>
                                            <Link href={`/editorial/blog/${post.id}`}>
                                                <h3 className="text-sm font-black text-black leading-tight mb-2 group-hover:text-[#0d55a0] transition-colors line-clamp-2 uppercase tracking-tight">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <p className="text-[9px] text-zinc-500 font-medium leading-relaxed mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                            <Link href={`/editorial/blog/${post.id}`} className="text-[8px] font-black uppercase tracking-widest text-[#0d55a0] hover:text-[#33a4df] transition-colors inline-flex items-center gap-1.5">
                                                Read More <span>→</span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-20 text-center"
                                    >
                                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                                            <svg className="w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-black text-black uppercase tracking-tight mb-2">No Stories found</h3>
                                        <p className="text-xs text-zinc-500 font-medium tracking-wide">Try searching for something else like "Inyange" or "Milk".</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* --- LOAD MORE --- */}
                        {filteredPosts.length > 0 && searchQuery === '' && (
                            <div className="mt-12 flex justify-center">
                                <button className="bg-[#0d55a0] text-white px-8 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#33a4df] transition-all shadow-md shadow-[#0d55a0]/10">
                                    Load More Stories
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BlogListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#0d55a0] animate-pulse">Loading Hub...</div>
            </div>
        }>
            <BlogHubContent />
        </Suspense>
    );
}
