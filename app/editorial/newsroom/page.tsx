'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, CATEGORIES, TOP_POSTS } from '../blog/data';

// --- SUB-COMPONENTS ---

const TrendingTicker = () => (
    <div className="bg-[#0d55a0]/10 py-1 overflow-hidden flex items-center group">
        <div className="flex gap-12 animate-marquee whitespace-nowrap min-w-full">
            {[...BLOG_POSTS, ...BLOG_POSTS].map((post, idx) => (
                <Link 
                    key={`${post.id}-${idx}`} 
                    href={`/editorial/blog/${post.id}`} 
                    className="text-[8px] font-black uppercase tracking-widest text-[#0d55a0]/50 hover:text-[#0d55a0] transition-colors flex items-center gap-2"
                >
                    <span className="w-1 h-1 rounded-full bg-[#0d55a0]/30" />
                    {post.title}
                </Link>
            ))}
        </div>
    </div>
);

const SectionHeader = ({ label, title, light = false }: { label: string; title: string; light?: boolean }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-1.5">
            <span className={`text-[7px] font-black uppercase tracking-[0.3em] ${light ? 'text-white/60' : 'text-[#0d55a0] opacity-40'} whitespace-nowrap`}>{label}</span>
        </div>
        <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tighter leading-none ${light ? 'text-white' : 'text-[#0d55a0]'}`}>
            {title}
        </h2>
    </div>
);

export default function NewsroomPage() {
    const [activeCategory, setActiveCategory] = useState('Everything');

    const filteredPosts = useMemo(() => {
        return activeCategory === 'Everything' 
            ? BLOG_POSTS 
            : BLOG_POSTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const featured = filteredPosts[0] || BLOG_POSTS[0];
    const secondary = filteredPosts.slice(1, 4).length > 0 ? filteredPosts.slice(1, 4) : BLOG_POSTS.slice(1, 4);

    return (
        <main className="min-h-screen bg-white font-inter relative">
            {/* Global Brand Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" 
                style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '600px', backgroundAttachment: 'fixed' }} 
            />
            
            {/* Header / Hero Section (Integrated Style) */}
            <header className="relative pt-20 md:pt-28 pb-8 bg-[#0d55a0]/5 overflow-hidden">
                {/* Brand Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '400px' }} 
                />
                
                {/* Brand Blobs */}
                <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#0d55a0]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <SectionHeader label="Latest Insights" title="Newsroom" />
                    <p className="text-[#0d55a0]/60 text-[10px] leading-relaxed font-medium max-w-xs mb-8">
                        Stay connected with our community events, factory tours, and sustainable farming initiatives globally.
                    </p>
                </div>
                
                <TrendingTicker />
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* LEFT CONTENT (8 cols) */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* FEATURED STORY (Overlapping Pattern) */}
                        <section className="relative group">
                            <div className="relative aspect-[16/9] rounded-xl md:rounded-[24px] overflow-hidden shadow-xl">
                                <Image src={featured.image} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" alt={featured.title} />
                            </div>
                            
                            {/* Overlapping Card */}
                            <div className="mt-[-15%] ml-[5%] relative z-20 w-[92%] md:w-[65%] md:ml-[8%]">
                                <motion.div 
                                    whileHover={{ y: -3 }}
                                    className="bg-white p-4 md:p-5 rounded-xl md:rounded-[24px] shadow-[0_15px_40px_rgba(13,85,160,0.1)] border border-white/50 backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <span className="bg-[#0d55a0] text-white px-1.5 py-0.5 rounded-full text-[5px] font-black uppercase tracking-widest">
                                            {featured.category}
                                        </span>
                                        <span className="text-[7px] font-bold text-zinc-300 uppercase tracking-widest">{featured.date}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-black mb-2 leading-tight group-hover:text-[#0d55a0] transition-colors">
                                        {featured.title}
                                    </h3>
                                    <p className="text-zinc-500 text-[9.5px] leading-relaxed mb-5 line-clamp-2">
                                        {featured.excerpt}
                                    </p>
                                    <Link 
                                        href={`/editorial/blog/${featured.id}`}
                                        className="flex items-center gap-1.5 text-[#0d55a0] font-black text-[8px] uppercase tracking-widest group/link"
                                    >
                                        READ STORY
                                        <div className="w-7 h-7 rounded-full bg-[#0d55a0]/5 text-[#0d55a0] flex items-center justify-center transition-all group-hover/link:bg-[#0d55a0] group-hover/link:text-white">
                                            <span className="text-xs">→</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            </div>
                        </section>

                        {/* SECONDARY FEED */}
                        <section className="space-y-10">
                            <SectionHeader label="More Stories" title="Inyange Updates" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {secondary.map(post => (
                                    <Link key={post.id} href={`/editorial/blog/${post.id}`} className="group flex flex-col">
                                        <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-4 shadow-md">
                                            <Image src={post.image} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} />
                                            <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md">
                                                <span className="text-[#0d55a0] text-[5px] font-black uppercase tracking-[0.1em]">{post.category}</span>
                                            </div>
                                        </div>
                                        <h4 className="text-[13px] font-black text-black mb-1.5 leading-tight group-hover:text-[#0d55a0] transition-colors uppercase tracking-tight">
                                            {post.title}
                                        </h4>
                                        <p className="text-zinc-500 text-[9px] leading-relaxed mb-3 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-[#0d55a0] font-black text-[6px] uppercase tracking-[0.2em]">
                                            Full Story <span className="text-xs">→</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* RIGHT SIDEBAR (4 cols) */}
                    <aside className="lg:col-span-4 space-y-12">
                        
                        {/* CATEGORIES GRID */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Explore Topics</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORIES.map(cat => (
                                    <button 
                                        key={cat.name} 
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`relative h-20 rounded-xl overflow-hidden group transition-all ${activeCategory === cat.name ? 'ring-2 ring-[#0d55a0] ring-offset-2' : ''}`}
                                    >
                                        <Image src={cat.image} fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity" alt={cat.name} />
                                        <div className="absolute inset-0 bg-[#0d55a0]/20" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest">{cat.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* TOP POSTS (Standard Integrated Style) */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Top performing</h4>
                            <div className="space-y-8">
                                {TOP_POSTS.map((post, i) => (
                                    <Link key={post.id} href={`/editorial/blog/${post.id}`} className="flex gap-5 group">
                                        <span className="text-3xl font-black text-[#0d55a0]/10 group-hover:text-[#0d55a0]/30 transition-colors leading-none italic">{i + 1}</span>
                                        <div className="flex flex-col pt-1">
                                            <h5 className="text-[12px] font-bold text-black leading-snug mb-1.5 group-hover:text-[#0d55a0] transition-colors line-clamp-2 uppercase tracking-tight">{post.title}</h5>
                                            <span className="text-[7px] font-black text-[#33a4df] uppercase tracking-widest">{post.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* SUBSCRIBE BOX (Integrated Branding) */}
                        <div className="bg-[#0d55a0] rounded-[32px] p-8 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2 relative z-10">Subscribe</h4>
                            <p className="text-[10px] text-white/70 font-medium mb-8 relative z-10 leading-relaxed mx-auto max-w-[180px]">
                                Join our monthly insight letter from the heart of Rwanda.
                            </p>
                            <div className="space-y-2 relative z-10">
                                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-[9px] text-white placeholder:text-white/40 focus:outline-none" />
                                <button className="w-full bg-white text-[#0d55a0] py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#f7f8fa] transition-colors">Join Now</button>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </main>
    );
}
