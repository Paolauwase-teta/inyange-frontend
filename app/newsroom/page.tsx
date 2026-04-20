"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

export default function NewsroomPage() {
    const [active, setActive] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
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

    const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))];
    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter((post) => post.category === selectedCategory);

    React.useEffect(() => {
        setActive(0);
        setPage(1);
    }, [selectedCategory]);

    const featured = filteredPosts[active] || filteredPosts[0];
    const sidePosts = filteredPosts.filter((_, idx) => idx !== active).slice(0, 4);
    const foundersPosts = filteredPosts.slice(0, 3);
    const pageCount = Math.max(1, Math.ceil(filteredPosts.length / 3));

    const getCategoryImage = (category: string) => {
        const categoryMap: Record<string, string> = {
            Dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1600&q=80',
            Water: 'https://images.unsplash.com/photo-1564419436560-3df38e63c1c7?auto=format&fit=crop&w=1600&q=80',
            Juice: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1600&q=80',
            Operations: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80',
        };
        return categoryMap[category] || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80';
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f9f9f9] font-sans flex flex-col items-center justify-center">
                <p className="text-zinc-400 font-medium">Loading stories...</p>
            </main>
        );
    }

    if (posts.length === 0) {
        return (
            <main className="min-h-screen bg-[#f9f9f9] font-sans flex flex-col items-center justify-center">
                <p className="text-zinc-400 font-medium">No stories currently available.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f8fa] font-sans pb-14">
            <section className="pt-32 px-6 md:px-10 lg:px-12 max-w-6xl mx-auto">
                <div className="mb-8 md:mb-10 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#1668b2]/60 mb-2">Inyange Newsroom</p>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black">Latest stories and updates</h1>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {categories.map((category) => {
                        const isActiveCategory = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-colors ${isActiveCategory
                                    ? 'bg-[#1668b2] border-[#1668b2] text-white'
                                    : 'bg-white border-[#1668b2]/20 text-[#1668b2] hover:bg-[#00adef]/10'
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {!featured ? (
                    <div className="rounded-2xl border border-black/10 bg-white p-8 text-center text-black/55">
                        No stories available for this category yet.
                    </div>
                ) : (
                <>
                <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="rounded-2xl overflow-hidden border border-black/10 bg-white"
                    >
                        <div className="relative h-[230px] md:h-[320px]">
                            <img src={getCategoryImage(featured.category)} alt={featured.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                            <div className="absolute left-4 right-4 bottom-4">
                                <button
                                    onClick={() => setSelectedCategory(featured.category)}
                                    className="inline-flex items-center gap-1.5 text-[9px] font-bold text-white bg-[#1668b2]/80 px-2 py-1 rounded-full mb-2"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00adef]" />
                                    {featured.category}
                                </button>
                                <h2 className="text-white text-xl md:text-4xl font-black tracking-tight leading-tight mb-2">
                                    {featured.title}
                                </h2>
                                <p className="text-[10px] md:text-xs text-white/80">{featured.date} • {featured.readTime} read</p>
                            </div>
                        </div>
                        <div className="px-4 py-3">
                            <Link href={`/blog/${featured.slug}`} className="text-[11px] font-black uppercase tracking-widest text-[#1668b2] hover:text-[#00adef]">
                                Read full story →
                            </Link>
                        </div>
                    </motion.div>

                    <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-5">
                        <h3 className="text-2xl font-black tracking-tight text-black mb-4">Latest post</h3>
                        <div className="space-y-3">
                            {sidePosts.map((post, idx) => (
                                <button
                                    key={post.id}
                                    onClick={() => setActive(filteredPosts.findIndex(p => p.id === post.id))}
                                    className="w-full text-left flex items-center gap-3 p-2 rounded-xl hover:bg-[#00adef]/5 transition-colors"
                                >
                                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-black/10">
                                        <img src={getCategoryImage(post.category)} alt={post.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-semibold text-black/85 leading-snug line-clamp-2">{post.title}</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCategory(post.category);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setSelectedCategory(post.category);
                                                    }
                                                }}
                                                className="text-[9px] font-bold text-[#1668b2] hover:text-[#00adef]"
                                            >
                                                {post.category}
                                            </span>
                                            <span className="text-[10px] text-black/40">{post.date} • {post.readTime} read</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/8 mt-8 md:mt-10 pt-6 md:pt-8">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-3xl font-black tracking-tight text-black">Founders corner</h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActive(prev => Math.max(0, prev - 1))}
                                className="w-8 h-8 rounded-full border border-[#1668b2]/25 text-[#1668b2]/70 hover:text-[#00adef] hover:border-[#00adef]/40 transition-colors"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => setActive(prev => Math.min(filteredPosts.length - 1, prev + 1))}
                                className="w-8 h-8 rounded-full border border-[#1668b2]/25 text-[#1668b2]/70 hover:text-[#00adef] hover:border-[#00adef]/40 transition-colors"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {foundersPosts.map((post, idx) => (
                            <article key={post.id} className="rounded-2xl border border-black/10 bg-white overflow-hidden">
                                <div className="h-28">
                                    <img src={getCategoryImage(post.category)} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <button
                                        onClick={() => setSelectedCategory(post.category)}
                                        className="inline-flex items-center gap-1.5 text-[9px] font-bold text-[#1668b2]/75 mb-2 hover:text-[#00adef]"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00adef]" />
                                        {post.category}
                                    </button>
                                    <h4 className="text-2xl font-black tracking-tight leading-tight text-black mb-2">{post.title}</h4>
                                    <p className="text-[12px] text-black/55 leading-relaxed line-clamp-3 mb-3">{post.excerpt}</p>
                                    <div className="text-[10px] text-black/45">{post.date} • {post.readTime} read</div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="border-t border-black/8 mt-8 md:mt-10 pt-6 flex items-center justify-between">
                    <button
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-full text-[#1668b2] hover:bg-[#00adef]/10 transition-colors"
                    >
                        ←
                    </button>
                    <div className="flex items-center gap-3">
                        {Array.from({ length: pageCount }).slice(0, 5).map((_, idx) => {
                            const number = idx + 1;
                            const activePage = number === page;
                            return (
                                <button
                                    key={number}
                                    onClick={() => setPage(number)}
                                    className={`w-6 h-6 text-[11px] font-bold rounded-full transition-colors ${activePage
                                        ? 'bg-[#1668b2] text-white'
                                        : 'text-black/60 hover:text-[#1668b2]'
                                        }`}
                                >
                                    {number}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => setPage(prev => Math.min(pageCount, prev + 1))}
                        className="w-8 h-8 rounded-full text-[#1668b2] hover:bg-[#00adef]/10 transition-colors"
                    >
                        →
                    </button>
                </div>
                </>
                )}
            </section>
            <Footer />
        </main>
    );
}
