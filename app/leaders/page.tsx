'use client';

import { LEADERS, LeaderLevel } from '@/lib/data/leaders';
import Link from 'next/link';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LeadersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLeaders = LEADERS.filter(leader =>
        leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leader.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const levels: { id: LeaderLevel, label: string, desc: string }[] = [
        { id: 'Executive', label: 'Executive Board', desc: 'Strategic vision and global direction for the Inyange ecosystem.' },
        { id: 'Management', label: 'Department Heads', desc: 'Operational excellence and specialized management of our core activities.' },
        { id: 'Operations', label: 'Operational Leads', desc: 'Ensuring seamless day-to-day execution and specialized innovation.' }
    ];

    return (
        <main className="min-h-screen bg-white font-sans pb-40 relative overflow-hidden">
            {/* ── SECTION 1: HERO (With Faint Background Image) ── */}
            <section className="relative w-full h-[50vh] md:h-[65vh] bg-[#0d55a0] overflow-hidden flex items-center justify-center">
                {/* Faint Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600"
                        alt="Background"
                        fill
                        className="object-cover opacity-10 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d55a0] via-transparent to-[#0d55a0]/50" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-4"
                        >
                            Inyange Industry Governance
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                        >
                            OUR <br /> <span className="text-[#33a4df]">LEADERS</span>.
                        </motion.h1>
                    </div>

                    {/* Search Bar Component */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10"
                    >
                        <input
                            type="text"
                            placeholder="Find a leader..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#0d55a0] outline-none shadow-xl border-none placeholder:text-zinc-300"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 2: CATEGORIZED LEADERS ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-8">
                {levels.map((level, levelIdx) => {
                    const levelLeaders = filteredLeaders.filter(l => l.level === level.id);
                    if (levelLeaders.length === 0) return null;

                    return (
                        <section key={level.id} className="pt-24 first:pt-20">
                            {/* Level Header */}
                            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.03] pb-8 relative">
                                <div className="max-w-xl relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-10 h-[1px] bg-[#33a4df]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df]">
                                            Level 0{levelIdx + 1}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter mb-4">
                                        {level.label}
                                    </h2>
                                    <p className="text-xs md:text-sm text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                                        {level.desc}
                                    </p>
                                </div>
                                <div className="text-[12vw] font-black text-[#0d55a0]/[0.02] leading-none select-none uppercase tracking-tighter absolute right-0 bottom-4 pointer-events-none hidden lg:block">
                                    {level.id}
                                </div>
                            </div>

                            {/* Grid (Consistent Size Across All Levels) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                                {levelLeaders.map((leader, idx) => (
                                    <Link href={`/leaders/${leader.slug}`} key={leader.id}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (idx % 4) * 0.1 }}
                                            className="group relative cursor-pointer"
                                        >
                                            {/* Card Container */}
                                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-black/5">
                                                <Image
                                                    src={leader.image}
                                                    alt={leader.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />

                                                {/* Bottom Floating Info Section */}
                                                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex-1">
                                                            <h3 className="text-sm md:text-base font-black text-[#0d55a0] mb-0.5 leading-tight">{leader.name}</h3>
                                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter leading-tight">{leader.title}</p>
                                                        </div>
                                                        <div
                                                            className="w-8 h-8 rounded-lg bg-[#0d55a0]/5 flex items-center justify-center text-[#0d55a0] group-hover:bg-[#0d55a0] group-hover:text-white transition-all overflow-hidden"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}

                {filteredLeaders.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-zinc-400 font-bold uppercase tracking-widest">No leaders matched your search.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
