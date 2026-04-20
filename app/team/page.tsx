"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Footer from '../components/Footer';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
        },
    },
};

interface TeamMember {
    id: number;
    name: string;
    role: string;
    category: string;
    bio: string;
    imageUrl: string;
    socialLinks?: { github?: string; linkedin?: string; email?: string };
}

interface Role {
    id: number;
    name: string;
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [categories, setCategories] = useState<{ name: string; id: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const workerOfTheYear = members[0];

    useEffect(() => {
        Promise.all([
            fetch('/api/team').then(r => r.json()),
            fetch('/api/roles').then(r => r.json()),
        ]).then(([teamData, rolesData]) => {
            const teamArr = Array.isArray(teamData) ? teamData : [];
            const rolesArr = Array.isArray(rolesData) ? rolesData : [];

            setMembers(teamArr);

            // Build categories from roles, or fall back to unique categories from team data
            if (rolesArr.length > 0) {
                setCategories(rolesArr.map((r: Role) => ({
                    name: r.name,
                    id: r.name.toLowerCase().replace(/\s+/g, '-'),
                })));
            } else {
                const uniqueCats = [...new Set(teamArr.map((m: TeamMember) => m.category).filter(Boolean))];
                setCategories(uniqueCats.map(c => ({
                    name: c,
                    id: c.toLowerCase().replace(/\s+/g, '-'),
                })));
            }
        }).catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-24 pb-12">
                <div className="flex items-center justify-center py-32">
                    <p className="text-zinc-400 text-sm">Loading team...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <main className="max-w-6xl mx-auto px-6 md:px-12 mt-10">

                {/* Header Section */}
                <section className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1668b2]/70">The Crew</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#1668b2] leading-none mb-6"
                    >
                        MEET OUR<br /> EXPERTS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="max-w-xl text-sm md:text-base text-black/60 font-medium leading-relaxed"
                    >
                        A collective of innovative thinkers, builders, and creators. We combine our diverse
                        expertises to deliver studio-quality solutions that push the boundaries of digital experiences.
                    </motion.p>
                </section>

                {/* Worker of the Year Highlight */}
                {workerOfTheYear && (
                    <section className="mb-14 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="rounded-3xl border border-[#1668b2]/20 bg-gradient-to-br from-[#00adef]/10 via-white to-[#1668b2]/10 p-4 md:p-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 items-center">
                                <div className="w-[110px] h-[110px] rounded-2xl overflow-hidden border border-[#1668b2]/20 bg-white">
                                    {workerOfTheYear.imageUrl ? (
                                        <img src={workerOfTheYear.imageUrl} alt={workerOfTheYear.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[#1668b2]/35">
                                            {workerOfTheYear.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#1668b2] mb-2">Worker of the Year</p>
                                    <h2 className="text-2xl md:text-3xl font-black text-black leading-tight">{workerOfTheYear.name}</h2>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1668b2]/70 mt-1">{workerOfTheYear.role}</p>
                                    {workerOfTheYear.bio && (
                                        <p className="text-sm text-black/60 mt-2 max-w-2xl leading-relaxed">{workerOfTheYear.bio}</p>
                                    )}
                                </div>

                                <div className="self-start md:self-center">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1668b2] text-white text-[10px] font-black uppercase tracking-widest">
                                        <span>*</span>
                                        2026 Highlight
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* Categories Sections */}
                <div className="flex flex-col gap-16">
                    {categories.map((category) => {
                        const categoryMembers = members.filter(m =>
                            m.category === category.name || m.role === category.name
                        );

                        if (categoryMembers.length === 0) return null;

                        return (
                            <section key={category.id} id={category.id} className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-xl font-black uppercase tracking-tight text-[#1668b2] flex-shrink-0">
                                        {category.name}
                                    </h2>
                                    <div className="h-[2px] w-full bg-[#1668b2]/20 flex-grow" />
                                    <span className="text-[10px] font-bold text-[#1668b2]/50 flex-shrink-0">
                                        {categoryMembers.length} {categoryMembers.length === 1 ? 'member' : 'members'}
                                    </span>
                                </div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                                >
                                    {categoryMembers.map((member) => (
                                        <motion.div
                                            key={member.id}
                                            variants={itemVariants}
                                            className="group"
                                        >
                                            {/* Avatar */}
                                            <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-zinc-100 border border-[#1668b2]/15">
                                                {member.imageUrl ? (
                                                    <img
                                                        src={member.imageUrl}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[#1668b2]/35">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}

                                                {/* Social overlay on hover */}
                                                <div className="absolute inset-0 bg-[#1668b2]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                                    {member.socialLinks?.email && (
                                                        <a href={`mailto:${member.socialLinks.email}`} className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#1668b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        </a>
                                                    )}
                                                    {member.socialLinks?.linkedin && (
                                                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                                                            <span className="text-[11px] font-bold text-[#1668b2]">in</span>
                                                        </a>
                                                    )}
                                                    {member.socialLinks?.github && (
                                                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#1668b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <h3 className="text-sm font-bold text-[#1668b2] mb-0.5 leading-tight">
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] font-semibold tracking-wide text-[#1668b2]/55 uppercase mb-1.5">
                                                {member.role}
                                            </p>
                                            {member.bio && (
                                                <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                                                    {member.bio}
                                                </p>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </section>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
