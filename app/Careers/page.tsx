"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Heart, Rocket, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    category: string;
    bio: string;
    imageUrl: string;
    socialLinks?: { github?: string; linkedin?: string; email?: string };
}

const transition = { 
  duration: 0.8, 
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition
};

export default function CareersPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/team')
            .then(r => r.json())
            .then(data => {
                const teamArr = Array.isArray(data) ? data : [];
                setMembers(teamArr);
                const uniqueCats = [...new Set(teamArr.map((m: TeamMember) => m.category).filter(Boolean))];
                setCategories(uniqueCats);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const benefits = [
        { icon: <Heart className="w-5 h-5" />, title: "Wellness First", desc: "Comprehensive health coverage for you and your family." },
        { icon: <Rocket className="w-5 h-5" />, title: "Growth Engine", desc: "Continuous learning and professional development paths." },
        { icon: <Users className="w-5 h-5" />, title: "Family Culture", desc: "A collaborative environment built on trust and respect." }
    ];

    const openRoles = [
        { title: "Production Manager", dept: "Operations", type: "Full-time" },
        { title: "Quality Assurance Specialist", dept: "Quality Control", type: "Full-time" },
        { title: "Regional Sales Lead", dept: "Commercial", type: "Full-time" }
    ];

    return (
        <main className="min-h-screen bg-white text-[#0d55a0] font-sans selection:bg-[#33a4df]/20 selection:text-[#0d55a0]">
            {/* ── HERO SECTION ── */}
            <section className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
                <motion.div {...fadeUp}>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12">
                        Careers <span className="text-[#33a4df]">→</span> <br />
                        join the <span className="italic font-serif font-light text-zinc-400">mission</span>
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                        <p className="text-lg md:text-xl font-medium text-zinc-500 max-w-xl leading-relaxed">
                            We are seeking unique perspectives to help us redefine nutrition in East Africa. Join a collective of visionaries since 1997.
                        </p>
                        <div className="flex gap-4">
                            <Image src="/about_processing.png" alt="Team" width={150} height={200} className="object-cover h-40 w-32 shadow-2xl" />
                            <div className="bg-[#fcfbf7] p-8 w-48 hidden md:flex flex-col justify-center border border-zinc-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#33a4df]">Opportunities</span>
                                <p className="text-[8px] font-bold text-zinc-400 mt-2 uppercase tracking-tighter">Grow With Us</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── CULTURE (MAKERS STYLE) ── */}
            <section className="py-24 px-8 max-w-7xl mx-auto border-t border-zinc-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div {...fadeUp} className="space-y-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#33a4df]">01. Culture</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight uppercase">
                            The heart of <br /> <span className="italic font-serif font-light text-zinc-400">excellence</span>
                        </h2>
                        <div className="space-y-8">
                            {benefits.map((b, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <span className="text-sm font-black text-zinc-300 group-hover:text-[#33a4df] transition-colors">0{i+1}.</span>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-black uppercase tracking-tighter">{b.title}</h4>
                                        <p className="text-zinc-500 text-base font-medium leading-relaxed">{b.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp} transition={{ ...transition, delay: 0.2 }} className="relative aspect-square shadow-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                        <Image src="/editorial_showcase_2.png" alt="Culture" fill className="object-cover" />
                    </motion.div>
                </div>
            </section>

            {/* ── THE DIRECTORY (SHARP GRID) ── */}
            <section className="py-32 px-8 max-w-7xl mx-auto border-t border-zinc-100">
                <motion.div {...fadeUp} className="mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#5bb63a] mb-6 block">02. The Experts</span>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        The <span className="text-[#33a4df]">→</span> collective
                    </h2>
                </motion.div>

                <div className="space-y-32">
                    {categories.map((cat, i) => {
                        const catMembers = members.filter(m => m.category === cat);
                        if (catMembers.length === 0) return null;

                        return (
                            <div key={i}>
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-10 h-[2px] bg-[#33a4df]" />
                                    <h3 className="text-2xl font-black text-[#0d55a0] uppercase tracking-tighter">{cat}</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
                                    {catMembers.map((member) => (
                                        <motion.div
                                            key={member.id}
                                            {...fadeUp}
                                            className="group relative cursor-pointer bg-white overflow-hidden p-6 hover:bg-zinc-50 transition-all"
                                        >
                                            <div className="relative aspect-square mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                                {member.imageUrl ? (
                                                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-5xl font-black text-[#0d55a0]/10">{member.name.charAt(0)}</div>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-black text-[#0d55a0] uppercase tracking-tighter">{member.name}</h4>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{member.role}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── OPEN POSITIONS (CONNECTED) ── */}
            <section id="openings" className="py-32 px-8 max-w-4xl mx-auto border-t border-zinc-100">
                <motion.div {...fadeUp} className="text-center mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#33a4df] mb-6 block">03. Application</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                        Current <span className="text-[#5bb63a]">→</span> roles
                    </h2>
                </motion.div>

                <div className="space-y-px bg-zinc-200 border border-zinc-200 shadow-2xl">
                    {openRoles.map((role, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            className="p-10 bg-white flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-zinc-50 transition-all"
                        >
                            <div className="flex items-center gap-8">
                                <div className="w-12 h-12 border border-zinc-100 flex items-center justify-center text-[#0d55a0] group-hover:bg-[#0d55a0] group-hover:text-white transition-all">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-[#0d55a0] uppercase tracking-tighter">{role.title}</h3>
                                    <div className="flex gap-4 mt-1">
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{role.dept}</span>
                                        <span className="text-[9px] font-bold text-[#33a4df] uppercase tracking-widest">• {role.type}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-8 py-4 border border-zinc-100 text-[10px] font-black uppercase tracking-widest hover:bg-[#0d55a0] hover:text-white transition-all">
                                Apply Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER LOGO (CONNECTED) ── */}
            <section className="pt-20 pb-20 px-8 border-t border-zinc-100 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.h1 
                        initial={{ x: "-20%", opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-[15vw] font-black tracking-tighter leading-none text-[#0d55a0] whitespace-nowrap"
                    >
                        Inyange <span className="text-[#33a4df]">→</span> Industries
                    </motion.h1>
                </div>
            </section>
        </main>
    );
}
