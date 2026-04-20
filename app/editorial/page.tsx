"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
                <Navbar />
                <p className="text-[#1668b2] font-black uppercase tracking-widest text-[10px]">Loading Newsroom...</p>
            </main>
        );
    }

    // Prepare data for the complex layouts
    // If we have fewer than 10 posts, we might repeat or just handle gracefully
    const safePosts = posts.length > 0 ? posts : [];
    
    // IMAGE 1 SLOTS:
    const spotlight_cards = safePosts.slice(0, 2); // Left column (2 small cards)
    const spotlight_main = safePosts[2] || safePosts[0]; // Center main
    const spotlight_trending = safePosts.slice(3, 7); // Right trending list
    const spotlight_secondary = safePosts[7] || safePosts[1]; // Right secondary card

    // IMAGE 2 SLOTS:
    const feed_main = safePosts[8] || safePosts[2]; // Left big news
    const feed_list = safePosts.slice(0, 5); // Center list (can overlap for "Latest" feel)
    const feed_sidebar_img = safePosts[5] || safePosts[3]; // Right sidebar feature

    return (
        <main className="min-h-screen bg-[#f7f8fa] font-sans">
            <Navbar />

            {/* ── SECTION 1: HERO (LEADERS STYLE) ── */}
            <section className="relative w-full h-[45vh] md:h-[55vh] bg-[#1668b2] overflow-hidden flex items-center justify-center">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                    <span className="font-black uppercase tracking-tighter leading-none whitespace-nowrap text-white/5 text-[15vw] md:text-[18vw]">
                        EDITORIAL
                    </span>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <div className="flex-1 text-left">
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-4"
                        >
                            The Inyange Newsroom
                        </motion.p>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                        >
                            NEWS & <br /> <span className="text-[#00adef]">EDITORIAL</span>.
                        </motion.h1>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-8 py-16">
                
                {/* ── SECTION 2: MAGAZINE SPOTLIGHT (IMAGE 1 STYLE) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-20">
                    
                    {/* Left: 2 Small Visual Cards */}
                    <div className="hidden lg:flex flex-col gap-6">
                        {spotlight_cards.map((post, i) => (
                            <Link href={`/blog/${post.slug}`} key={i} className="group relative flex-1 rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm">
                                <Image src={getCategoryImage(post.category)} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute inset-x-5 bottom-5">
                                    <span className="text-[7px] font-black uppercase text-[#00adef] tracking-widest block mb-2">{post.category}</span>
                                    <h3 className="text-xs font-black text-white leading-tight line-clamp-2">{post.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Center: Main Featured Card */}
                    <div className="lg:col-span-2">
                        {spotlight_main && (
                            <Link href={`/blog/${spotlight_main.slug}`} className="group relative block h-[500px] rounded-3xl overflow-hidden bg-[#1668b2] text-white shadow-2xl">
                                <Image src={getCategoryImage(spotlight_main.category)} alt={spotlight_main.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1668b2]/90 via-transparent to-transparent" />
                                <div className="absolute inset-10 flex flex-col justify-end">
                                    <span className="bg-[#1668b2] text-[9.5px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full w-fit mb-6 shadow-xl">
                                        Major Story
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                                        {spotlight_main.title}
                                    </h2>
                                    <p className="text-sm text-white/70 font-medium leading-relaxed max-w-lg mb-8 line-clamp-3">
                                        {spotlight_main.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#00adef]">
                                        <span>{spotlight_main.date}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        <span>Read Story →</span>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Right: Trending List + Post */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1668b2]/40 mb-6 border-b pb-4">Trending Posts</h3>
                            <div className="space-y-6">
                                {spotlight_trending.map((post, i) => (
                                    <Link href={`/blog/${post.slug}`} key={i} className="flex gap-4 group">
                                        <span className="text-2xl font-black text-[#1668b2]/10 group-hover:text-[#00adef] transition-colors">{i + 1}</span>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[8px] font-bold text-[#1668b2] uppercase tracking-widest">{post.category}</span>
                                            <h4 className="text-[11px] font-black text-black leading-tight group-hover:text-[#1668b2] transition-colors">{post.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {spotlight_secondary && (
                            <Link href={`/blog/${spotlight_secondary.slug}`} className="group relative flex-1 rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm min-h-[120px]">
                                <Image src={getCategoryImage(spotlight_secondary.category)} alt={spotlight_secondary.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                                    <h3 className="text-sm font-black text-white uppercase tracking-tighter leading-tight drop-shadow-lg">
                                        {spotlight_secondary.title}
                                    </h3>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* ── SECTION 3: LATEST NEWS GRID (IMAGE 2 STYLE) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-16 border-t border-black/5">
                    
                    {/* Main Column: Big News Card */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1668b2]">Latest News</h3>
                            <div className="h-[1px] flex-1 bg-black/5" />
                        </div>
                        {feed_main && (
                            <Link href={`/blog/${feed_main.slug}`} className="group block">
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 bg-zinc-100 border border-black/5 shadow-md">
                                    <Image src={getCategoryImage(feed_main.category)} alt={feed_main.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#00adef] mb-3 block">{feed_main.category}</span>
                                <h3 className="text-3xl font-black text-black uppercase tracking-tighter leading-none mb-6 group-hover:text-[#1668b2] transition-colors">
                                    {feed_main.title}
                                </h3>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 line-clamp-4">
                                    {feed_main.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase text-zinc-400">
                                    <span>{feed_main.date}</span>
                                    <span>•</span>
                                    <span>By Editorial Team</span>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Center Column: Feed List */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="h-10 lg:block hidden" /> {/* Spacer to align with titles */}
                        <div className="space-y-8">
                            {feed_list.map((post, i) => (
                                <Link href={`/blog/${post.slug}`} key={i} className="flex gap-6 group">
                                    <div className="relative w-28 h-20 shrink-0 rounded-2xl overflow-hidden bg-zinc-100 border border-black/5">
                                        <Image src={getCategoryImage(post.category)} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[8px] font-black uppercase text-[#1668b2] tracking-widest">{post.category}</span>
                                            {i === 1 && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                                        </div>
                                        <h4 className="text-[13px] font-black text-black leading-tight group-hover:text-[#1668b2] transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-3">
                         <div className="flex items-center gap-3 mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300">Featured</h3>
                            <div className="h-[1px] flex-1 bg-black/5" />
                        </div>
                        {feed_sidebar_img && (
                            <Link href={`/blog/${feed_sidebar_img.slug}`} className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 border border-black/5 shadow-sm">
                                <Image src={getCategoryImage(feed_sidebar_img.category)} alt={feed_sidebar_img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute inset-6 flex flex-col justify-end">
                                    <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-tight mb-2">
                                        {feed_sidebar_img.title}
                                    </h3>
                                    <p className="text-[10px] text-white/60 line-clamp-2">{feed_sidebar_img.excerpt}</p>
                                </div>
                            </Link>
                        )}

                        <div className="mt-10 pt-10 border-t border-black/5">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1668b2] mb-6">Must Read</h4>
                            <div className="space-y-4">
                                {safePosts.slice(0, 3).map((post, i) => (
                                    <Link href={`/blog/${post.slug}`} key={i} className="block text-[11px] font-medium text-zinc-500 hover:text-[#1668b2] transition-colors">
                                        • {post.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            
            <Footer />
        </main>
    );
}
