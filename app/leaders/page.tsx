'use client';

import { LEADERS, LeaderLevel } from '@/lib/data/leaders';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const TIERS: { id: LeaderLevel, label: string, desc: string }[] = [
    { id: 'Executive', label: 'Executive Board', desc: 'Strategic architects of our global vision.' },
    { id: 'Management', label: 'Department Heads', desc: 'Masters of operational excellence and strategy.' },
    { id: 'Operations', label: 'Operational Leads', desc: 'The pulse of our day-to-day innovation.' }
];

export default function LeadersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTier, setActiveTier] = useState<LeaderLevel>('Executive');
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Spring physics for smooth movement
    const { scrollXProgress } = useScroll({
        container: containerRef,
    });
    
    const scale = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const filteredLeaders = LEADERS.filter(leader => 
        (leader.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        leader.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (searchQuery ? true : leader.level === activeTier)
    );

    return (
        <main className="min-h-screen bg-[#f8fafc] text-[#0d55a0] font-sans overflow-hidden selection:bg-[#33a4df]/20 selection:text-[#0d55a0]">
            {/* ── AMBIENT BACKGROUND (Airy Blue Style) ── */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(51,164,223,0.15),transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_110%,rgba(13,85,160,0.1),transparent)]" />
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay" 
                     style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard.png')" }} />
            </div>

            {/* ── SECTION 1: MINIMALIST POWER HERO ── */}
            <header className="relative z-20 pt-32 pb-20 px-8 max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-3xl border border-[#33a4df]/20 rounded-full shadow-sm"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#33a4df] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df]">
                            The Governance Matrix
                        </span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] text-[#0d55a0]"
                    >
                        THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d55a0] via-[#33a4df] to-[#0d55a0]/40">VOICES</span>
                        <span className="text-[#33a4df]">.</span>
                    </motion.h1>
                </div>

                {/* ADVANCED SEARCH BOX */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#0d55a0] to-[#33a4df] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
                    <div className="relative bg-white/80 backdrop-blur-2xl border border-[#0d55a0]/10 rounded-2xl p-2 flex items-center shadow-lg">
                        <div className="pl-4 pr-3 text-[#33a4df]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input 
                            type="text"
                            placeholder="Find a leader..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent w-full py-4 text-xs font-black uppercase tracking-widest text-[#0d55a0] outline-none placeholder:text-zinc-400"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="pr-4 text-zinc-400 hover:text-[#0d55a0] transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </motion.div>
            </header>

            {/* ── SECTION 2: TIER SELECTOR ── */}
            <nav className="relative z-30 px-8 pb-12 max-w-[1800px] mx-auto">
                <div className="flex flex-wrap gap-4 items-center">
                    {TIERS.map((tier, idx) => (
                        <button
                            key={tier.id}
                            onClick={() => {
                                setActiveTier(tier.id);
                                setSearchQuery('');
                            }}
                            className={`group relative px-8 py-4 rounded-xl transition-all duration-500 ${
                                activeTier === tier.id && !searchQuery ? 'bg-[#0d55a0] text-white shadow-xl' : 'bg-white/40 border border-[#0d55a0]/5 hover:bg-white/80'
                            }`}
                        >
                            <div className="flex flex-col items-start text-left">
                                <span className={`text-[8px] font-black uppercase tracking-widest mb-1 ${
                                    activeTier === tier.id && !searchQuery ? 'text-[#33a4df]' : 'text-zinc-400'
                                }`}>
                                    0{idx + 1} Tier
                                </span>
                                <span className={`text-sm md:text-lg font-black uppercase tracking-tight ${
                                    activeTier === tier.id && !searchQuery ? 'text-white' : 'text-[#0d55a0]/40'
                                }`}>
                                    {tier.label}
                                </span>
                            </div>
                        </button>
                    ))}
                    
                    {!searchQuery && (
                        <div className="ml-auto hidden lg:block">
                            <p className="text-[#0d55a0]/40 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                                {TIERS.find(t => t.id === activeTier)?.desc}
                            </p>
                        </div>
                    )}
                </div>
            </nav>

            {/* ── SECTION 3: THE STUDIO GALLERY & HORIZONTAL SNAP ── */}
            <div className="relative z-10 w-full overflow-hidden">
                <div 
                    ref={containerRef}
                    className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-8 md:px-[15vw] pb-40"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredLeaders.map((leader, idx) => (
                            <motion.div
                                key={leader.slug}
                                initial={{ opacity: 0, x: 100, rotateY: 30 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: idx * 0.05,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="flex-none w-[80vw] md:w-[450px] mr-12 snap-center perspective-[2000px]"
                            >
                                <Link href={`/leaders/${leader.slug}`}>
                                    <div className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white border border-[#0d55a0]/5 shadow-[0_30px_60px_-15px_rgba(13,85,160,0.1)] transition-all duration-700 hover:border-[#33a4df]/30 hover:shadow-[0_40px_100px_-20px_rgba(51,164,223,0.3)]">
                                        
                                        {/* Background Typography (Watermark) */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.04] transition-opacity">
                                            <span className="text-[20rem] font-black uppercase rotate-90 leading-none">
                                                {leader.name.charAt(0)}
                                            </span>
                                        </div>

                                        <Image 
                                            src={leader.image}
                                            alt={leader.name}
                                            fill
                                            className="object-cover saturate-[0.9] group-hover:saturate-100 transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />

                                        {/* High-End Glass Information Panel */}
                                        <div className="absolute inset-x-4 bottom-4 z-20">
                                            <div className="bg-white/90 backdrop-blur-3xl border border-[#0d55a0]/5 rounded-[2rem] p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out shadow-2xl">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <motion.p className="text-[10px] font-black text-[#33a4df] uppercase tracking-[0.3em] mb-2">
                                                            {leader.roleTag || leader.level}
                                                        </motion.p>
                                                        <h3 className="text-xl md:text-3xl font-black text-[#0d55a0] uppercase tracking-tighter leading-none mb-4">
                                                            {leader.name}
                                                        </h3>
                                                        <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#33a4df] to-transparent transition-all duration-700" />
                                                        <p className="mt-4 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
                                                            {leader.title}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex flex-col gap-2">
                                                        <div className="w-12 h-12 rounded-2xl bg-[#0d55a0]/5 border border-[#0d55a0]/10 flex items-center justify-center text-[#0d55a0] group-hover:bg-[#0d55a0] group-hover:text-white transition-all duration-500 hover:rotate-12 hover:shadow-xl">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </div>
                                                        <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#33a4df] group-hover:bg-[#33a4df] group-hover:text-white transition-all">
                                                            <span className="text-xl font-black">→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {filteredLeaders.length === 0 && (
                        <div className="min-w-full flex items-center justify-center py-40">
                            <p className="text-[#0d55a0]/30 font-black uppercase tracking-[0.5em]">No voices found in this tier.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── SECTION 4: INTERACTIVE FOOTER SCROLLBAR ── */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-8">
                <div className="h-[2.5px] w-full bg-[#0d55a0]/10 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-[#33a4df] origin-left shadow-[0_0_15px_rgba(51,164,223,0.5)]"
                        style={{ scaleX: scale }}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Shift to navigate</span>
                    <span className="text-[8px] font-black text-[#33a4df] uppercase tracking-widest">Discovery Progress</span>
                </div>
            </div>

            {/* Fine-Grain Ambient Noise */}
            <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.05]" 
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dust.png")' }} />
        </main>
    );
}
