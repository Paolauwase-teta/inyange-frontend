'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { BLOG_POSTS } from '../data';

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [headerSearch, setHeaderSearch] = React.useState('');

    // Find the current post
    const post = useMemo(() => {
        return BLOG_POSTS.find(p => p.id === Number(id)) || BLOG_POSTS[0];
    }, [id]);

    // Filtered articles for the sidebar (Search-aware)
    const filteredSidebarArticles = useMemo(() => {
        const otherPosts = BLOG_POSTS.filter(p => p.id !== post.id);
        
        if (!headerSearch.trim()) {
            // Default: Show posts from same category, or just latest
            return otherPosts
                .filter(p => p.category === post.category || true)
                .slice(0, 3);
        }

        // Search Case: Filter across all other posts
        return otherPosts.filter(p => 
            p.title.toLowerCase().includes(headerSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(headerSearch.toLowerCase())
        );
    }, [post, headerSearch]);

    return (
        <div className="bg-white min-h-screen font-inter pb-16 pt-24 md:pt-32">
            {/* --- TOP NAV BAR --- */}
            <header className="border-b border-zinc-100 bg-white sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
                    <Link href="/editorial/blog" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black hover:text-[#0d55a0] transition-colors">
                        <span>←</span> Back to Blog
                    </Link>
                    
                    <div className="relative w-full max-w-[160px] md:max-w-[240px] group">
                        <input 
                            type="text" 
                            value={headerSearch}
                            onChange={(e) => setHeaderSearch(e.target.value)}
                            placeholder="Search articles..." 
                            className="w-full bg-white border border-zinc-200 rounded-full px-4 py-2 text-[10px] font-bold text-black focus:outline-none placeholder:text-zinc-400 transition-all focus:ring-2 focus:ring-[#0d55a0]/5 focus:border-[#0d55a0]/30 shadow-sm"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
                            <svg className="w-3.5 h-3.5 text-[#0d55a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
                    
                    {/* LEFT CONTENT: ARTICLE (2/3) */}
                    <div className="lg:w-[65%]">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={post.id} // Trigger animation on post change
                        >
                            <h1 className="text-2xl md:text-4xl font-black text-black leading-[1.1] mb-6 tracking-tighter uppercase">
                                {post.title}
                            </h1>
                            
                            {/* Meta */}
                            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-100">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white shadow-sm">
                                    <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200" fill className="object-cover" alt="Author" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-black">{post.author}</p>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400">
                                        <span className="text-[#0d55a0] uppercase tracking-widest">{post.category}</span>
                                        <span className="w-0.5 h-0.5 rounded-full bg-zinc-200" />
                                        <span className="uppercase tracking-widest">{post.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-zinc-50 border border-zinc-100">
                                <Image 
                                    src={post.image} 
                                    fill 
                                    className="object-cover" 
                                    alt={post.title} 
                                    priority
                                />
                            </div>

                            {/* Content */}
                            <div className="prose prose-zinc max-w-none">
                                <div 
                                    className="text-[14px] md:text-[15px] leading-relaxed text-zinc-600 font-medium space-y-6"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDEBAR (1/3) */}
                    <aside className="lg:w-[35%] space-y-12">
                        
                        {/* SHARE TO */}
                        <div>
                            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-5">Share Story</h4>
                            <div className="flex gap-2.5">
                                {[
                                    { icon: 'LI' },
                                    { icon: 'WH' },
                                    { icon: 'TW' },
                                    { icon: 'FA' },
                                ].map((social) => (
                                    <button 
                                        key={social.icon}
                                        className="w-10 h-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-[#0d55a0] hover:border-[#0d55a0]/30 transition-all shadow-sm group"
                                    >
                                        <span className="text-[9px] font-black group-hover:scale-110 transition-transform">{social.icon}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SIDEBAR ARTICLES (RELATED OR SEARCH RESULTS) */}
                        <div>
                            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
                                {headerSearch ? 'Search Results' : 'Related Articles'}
                            </h4>
                            <div className="space-y-6">
                                {filteredSidebarArticles.length > 0 ? filteredSidebarArticles.map((article) => (
                                    <Link key={article.id} href={`/editorial/blog/${article.id}`} className="group flex gap-4">
                                        <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-50 shadow-sm border border-zinc-100">
                                            <Image src={article.image} fill className="object-cover group-hover:scale-110 transition-transform duration-500" alt={article.title} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h5 className="text-[12px] font-black text-black leading-tight mb-1.5 group-hover:text-[#0d55a0] transition-colors line-clamp-2 uppercase tracking-tighter">{article.title}</h5>
                                            <span className="text-[8px] font-bold text-[#33a4df] uppercase tracking-widest">{article.category}</span>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="py-8 text-center border-2 border-dashed border-zinc-100 rounded-2xl">
                                        <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">No matches found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ENGAGEMENT CARD */}
                        <div className="bg-[#0d55a0]/5 p-6 rounded-3xl border border-[#0d55a0]/10">
                            <h3 className="text-[12px] font-black text-[#0d55a0] uppercase tracking-widest mb-2">Join the conversation</h3>
                            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mb-4">What are your thoughts on this story? Sign in to join the discussion.</p>
                            <button className="w-full bg-[#0d55a0] text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#33a4df] transition-all shadow-md shadow-[#0d55a0]/10">
                                Post a Comment
                            </button>
                        </div>

                    </aside>
                </div>
            </main>

            {/* --- BOTTOM ENGAGEMENT BAR --- */}
            <footer className="fixed bottom-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-t border-zinc-100 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
                <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 group">
                            <span className="text-[10px] font-black text-black group-hover:text-[#0d55a0] transition-colors uppercase tracking-widest">1.3K LIKES</span>
                        </button>
                        <button className="flex items-center gap-2 group">
                            <span className="text-[10px] font-black text-black group-hover:text-[#0d55a0] transition-colors uppercase tracking-widest">55 COMMENTS</span>
                        </button>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-sm ml-8 relative">
                        <input 
                            type="text" 
                            placeholder="Add your thoughts..." 
                            className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl px-5 py-2 text-[10px] font-semibold outline-none focus:ring-2 focus:ring-[#0d55a0]/10 transition-all placeholder:text-zinc-300"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0d55a0]">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
