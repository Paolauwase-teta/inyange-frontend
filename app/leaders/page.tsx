'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LEADERS = [
    { id: 1, name: 'Marcus Mango', title: 'Chief Executive Officer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 2, name: 'Sarah Chen', title: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 3, name: 'Jean-Paul Kagabo', title: 'Chief Operations Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 4, name: 'Elena Rodriguez', title: 'Chief Marketing Officer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 5, name: 'Kwesi Mensah', title: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 6, name: 'Priya Sharma', title: 'Head of Human Resources', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 7, name: "Michael O'Neill", title: 'Head of Production', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 8, name: 'Amira Al-Fayed', title: 'Head of Research & Development', image: 'https://images.unsplash.com/photo-1598550874175-4d0fe4a2c900?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 9, name: 'David Smith', title: 'Head of Sales', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 10, name: 'Ling Wu', title: 'Head of Supply Chain', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 11, name: 'Beatrice Mutoni', title: 'Head of Quality Assurance', image: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd47?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 12, name: 'Carlos Mendez', title: 'Head of Logistics', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 13, name: 'Sophie Dubois', title: 'General Counsel', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 14, name: 'Thomas Müller', title: 'Head of Maintenance', image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 15, name: 'Fatima Zahra', title: 'Digital Transformation Lead', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 16, name: 'Richard Baxter', title: 'Head of Finance', image: 'https://images.unsplash.com/photo-1492562080023-ab3dbdf5bb3d?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 17, name: 'Anya Ivanov', title: 'Head of IT Infrastructure', image: 'https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 18, name: 'Samuel Okoro', title: 'Head of Security & Risk', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 19, name: 'Isabella Conti', title: 'Creative Director', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 20, name: 'Hiroshi Tanaka', title: 'Strategic Planning Manager', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 21, name: 'Grace Ndayisaba', title: 'Sustainability Officer', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 22, name: 'Oliver Wright', title: 'Communications Manager', image: 'https://images.unsplash.com/photo-1517060197619-354f2c3dac5c?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 23, name: 'Mariam Diallo', title: 'Public Relations Officer', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 24, name: 'Daniel Park', title: 'Senior Data Analyst', image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400&h=500' },
    { id: 25, name: 'Rose Nyirahabimana', title: 'Factory Operations Manager', image: 'https://images.unsplash.com/photo-1551069613-1904dbdcda11?auto=format&fit=crop&q=80&w=400&h=500' },
];

export default function LeadersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLeaders = LEADERS.filter(leader => 
        leader.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        leader.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#fcfbf7] font-sans pb-24">
                        {/* ── SECTION 1: HERO ── */}
            <section className="relative w-full h-[50vh] md:h-[65vh] bg-[#0d55a0] overflow-hidden flex items-center justify-center">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                    <span className="font-black uppercase tracking-tighter leading-none whitespace-nowrap text-white/5 text-[15vw] md:text-[20vw]">
                        LEADERSHIP
                    </span>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Left: Title Area */}
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
                </div>
            </section>

            {/* ── SECTION 2: INTRO WORDS ── */}
            <div className="max-w-4xl mx-auto px-8 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0d55a0] mb-6">Built on Integrity & Excellence</h2>
                    <p className="text-sm md:text-base text-zinc-500 font-medium leading-loose">
                        Our leadership team is composed of seasoned professionals dedicated to maintaining the highest standards of food safety and quality in Rwanda. Each individual brings a unique perspective, ensuring that Inyange remains at the forefront of the dairy and beverage industry through innovation and sustainable practices.
                    </p>
                </motion.div>
            </div>

            {/* ── SECTION 3: LEADERS GRID ── */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {filteredLeaders.map((leader, idx) => (
                        <motion.div
                            key={leader.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 4) * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-200 shadow-sm group-hover:shadow-2xl transition-all duration-500">
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
                                        <a 
                                            href="https://linkedin.com" 
                                            className="w-8 h-8 rounded-lg bg-[#0d55a0]/5 flex items-center justify-center text-[#0d55a0] hover:bg-[#0d55a0] hover:text-white transition-all overflow-hidden"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredLeaders.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-zinc-400 font-bold uppercase tracking-widest">No leaders matched your search.</p>
                    </div>
                )}
            </div>

        </main>
    );
}
