'use client';

import { LEADERS, LeaderLevel } from '@/lib/data/leaders';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TIERS: { id: LeaderLevel, label: string, desc: string }[] = [
    { id: 'Executive', label: 'Executive Board', desc: 'Strategic vision and global direction for the Inyange ecosystem.' },
    { id: 'Management', label: 'Department Heads', desc: 'Operational excellence and tactical implementation across sectors.' },
    { id: 'Operations', label: 'Operational Leads', desc: 'The frontline of innovation and daily production excellence.' }
];

export default function LeadersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <main className="min-h-screen bg-[#ffffff] text-[#0d55a0] font-sans selection:bg-[#33a4df]/20 selection:text-[#0d55a0] overflow-x-hidden">
            {/* ── BACKGROUND WATERMARK ── */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <span className="text-[30vw] font-black text-zinc-50 uppercase tracking-tighter select-none opacity-40">
                    VOICES
                </span>
            </div>

            {/* ── HEADER ── */}
            <header className="relative z-20 pt-32 pb-16 px-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-1 bg-[#33a4df] rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#33a4df]">
                            The Governance Matrix
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-[#0d55a0]">
                        THE VOICES<span className="text-[#33a4df]">.</span>
                    </h1>
                </div>

                <div className="w-full max-w-sm relative group">
                    <div className="relative bg-white border border-zinc-100 rounded-2xl p-1 flex items-center shadow-sm">
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
                            className="bg-transparent w-full py-4 text-[10px] font-black uppercase tracking-widest text-[#0d55a0] outline-none placeholder:text-zinc-400"
                        />
                    </div>
                </div>
            </header>

            {/* ── LEADERSHIP GRID ── */}
            <div className="relative z-10 pb-40 space-y-32 max-w-7xl mx-auto px-8">
                {TIERS.map((tier, tierIdx) => {
                    const tierLeaders = LEADERS.filter(leader =>
                        leader.level === tier.id &&
                        (leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            leader.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    );

                    if (tierLeaders.length === 0) return null;

                    return (
                        <section key={tier.id}>
                            {/* SECTION HEADER */}
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5bb63a]">Level 0{tierIdx + 1}</span>
                                    <div className="flex-1 h-[1px] bg-zinc-100" />
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0d55a0]">
                                    {tier.label}
                                </h2>
                                {/* COMPACT GRID - MEDIUM VERSION */}
                                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {tierLeaders.map((leader) => (
                                        <Link href={`/leaders/${leader.slug}`} key={leader.slug}>
                                            <motion.div
                                                className="group relative cursor-pointer"
                                            >
                                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-white shadow-sm transition-all duration-700 hover:shadow-2xl">
                                                    {/* Background Department Text (Sweet Hover) */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 select-none pointer-events-none">
                                                        <span className="text-[6rem] font-black uppercase -rotate-12 leading-none text-[#0d55a0]">
                                                            {leader.level}
                                                        </span>
                                                    </div>

                                                    <Image
                                                        src={leader.image}
                                                        alt={leader.name}
                                                        fill
                                                        className="object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:saturate-[1.2]"
                                                        priority={tierIdx === 0}
                                                    />

                                                    {/* Original White Box Style Information Panel - SWEET ANIMATION */}
                                                    <div className="absolute inset-x-3 bottom-3 z-20">
                                                        <div className="bg-white rounded-[1.5rem] p-6 shadow-2xl border border-zinc-50 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[0.16, 1, 0.3, 1]">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="min-w-0">
                                                                    <h3 className="text-sm md:text-base font-black text-[#0d55a0] uppercase tracking-tighter truncate">
                                                                        {leader.name}
                                                                    </h3>
                                                                    <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest truncate mt-1">
                                                                        {leader.title}
                                                                    </p>
                                                                </div>
                                                                <div className="w-10 h-10 rounded-xl bg-[#0d55a0]/5 group-hover:bg-[#0d55a0] text-[#0d55a0] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-500">
                                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
