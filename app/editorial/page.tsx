"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogPost {
    id: number;
    slug: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    readTime: string;
}

export default function EditorialPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

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

            {/* ── SECTION 1: HERO (PRESERVED) ── */}
            <section className="relative w-full h-[45vh] md:h-[55vh] bg-[#0d55a0] overflow-hidden flex items-center justify-center">
                <div 
                    className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                    style={{ backgroundImage: "url('/pattern.png')" }}
                />

                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <div className="flex-1 text-left">
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-4"
                        >
                            The Inyange Newsroom
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-[12px] font-medium text-zinc-500 leading-relaxed mb-6 max-w-xs"
                        >
                        </motion.p>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                        >
                            NEWS & <br /> <span className="text-[#33a4df]">EDITORIAL</span>.
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: CONTENT FEED ── */}
            <div className="max-w-6xl mx-auto px-8 py-10">
                
                {/* Redesigned Header & Filters */}
                <div className="mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0d55a0]/50 mb-2">Inyange Newsroom</p>
                    <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter mb-8">Latest stories and updates</h2>
                    
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeCategory === cat 
                                    ? 'bg-[#1668b2] text-white shadow-lg' 
                                    : 'bg-white text-zinc-400 border border-black/5 hover:border-[#1668b2]/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Featured Column (Left) */}
                    <div className="lg:col-span-8">
                        {featuredPost ? (
                            <Link href={`/blog/${featuredPost.slug}`} className="group block bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 transition-all hover:shadow-[0_40px_80px_rgba(13,85,160,0.1)]">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image 
                                        src={getCategoryImage(featuredPost.category)} 
                                        alt={featuredPost.title} 
                                        fill 
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-8 left-8">
                                        <span className="px-5 py-2 bg-[#1668b2] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                                            {featuredPost.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 md:p-10">
                                    <h3 className="text-2xl md:text-4xl font-black text-[#0d55a0] uppercase tracking-tighter leading-[0.95] mb-6 group-hover:text-[#33a4df] transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#0d55a0]/40 mb-8">
                                        <span>{featuredPost.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-200" />
                                        <span>{featuredPost.readTime} read</span>
                                    </div>
                                    <div className="flex items-center text-[#1668b2] text-[11px] font-black uppercase tracking-[0.3em] group-hover:gap-5 gap-3 transition-all">
                                        READ FULL STORY <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-[2.5rem]">
                                <p className="text-zinc-400 font-medium tracking-tight">No featured stories available in this category.</p>
                            </div>
                        )}
                    </div>

                    {/* Latest Posts Column (Right) */}
                    <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col h-fit">
                        <div className="mb-6">
                            <h3 className="text-lg font-black text-black tracking-tight flex items-center gap-3">
                                Latest post
                                <div className="h-[2px] flex-1 bg-black/5" />
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                            {latestPosts.length > 0 ? latestPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="group flex gap-5">
                                    <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-zinc-100 border border-black/5">
                                        <Image src={getCategoryImage(post.category)} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-[14px] font-black text-black leading-tight group-hover:text-[#1668b2] transition-colors mb-2 line-clamp-2">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#1668b2]/60">
                                            <span>{post.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-100" />
                                            <span className="text-zinc-400">{post.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            )) : (
                                <p className="text-zinc-400 text-sm font-medium">No recent news available.</p>
                            )}
                        </div>

                        {/* Optional See More link */}
                        <div className="mt-auto pt-10">
                            <button className="w-full py-4 rounded-2xl border border-black/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-[#f7f8fa] hover:text-[#0d55a0] transition-all">
                                Load more articles
                            </button>
                        </div>
                    </div>

                </div>

                {/* ── SECTION 3: IN THE MEDIA (MINIMAL VERSION) ── */}
                <div className="mt-28 py-20 border-t border-black/5">
                    <div className="flex flex-col mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0d55a0]/50 mb-3 block">In the Spotlight</span>
                        <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase">
                            MEDIA & <span className="text-[#1668b2]">PRESS</span>.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { source: 'The New Times', date: 'Dec 12, 2023', title: 'Inyange remains leader in dairy sector innovation', type: 'Newspaper' },
                          { source: 'Rwanda Today', date: 'Nov 05, 2023', title: 'New processing plant to double Inyange juice production', type: 'Press' },
                          { source: 'Agri-Business Blog', date: 'Oct 20, 2023', title: 'How Inyange is transforming local dairy farming', type: 'Blog' },
                          { source: 'Forbes Africa', date: 'Sep 15, 2023', title: 'Sustainability at the core of Inyange industry', type: 'Magazine' },
                        ].map((media, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-black/5 hover:shadow-xl transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#33a4df] bg-[#33a4df]/5 px-3 py-1 rounded-full">{media.type}</span>
                                    <span className="text-[10px] font-bold text-zinc-300">{media.date}</span>
                                </div>
                                <h4 className="text-lg font-black text-[#0d55a0] leading-tight mb-8 group-hover:text-[#33a4df] transition-colors">{media.title}</h4>
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
                                    <span className="text-[10px] font-black text-black uppercase tracking-tighter">{media.source}</span>
                                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-[#0d55a0] group-hover:bg-[#0d55a0] group-hover:text-white transition-all text-sm">
                                        →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
