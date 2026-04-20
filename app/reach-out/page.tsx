"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const ReachOutMap = dynamic(() => import('./ReachOutMap'), { ssr: false });

const LOCATIONS = [
    { id: 1, name: 'Main Processing Plant (Masaka)', city: 'Kigali', address: 'Plot 793, Masaka, Kigali', lat: -1.9897, lng: 30.2016, contact: '+250 788 300 000' },
    { id: 2, name: 'Inyange Head Office', city: 'Kigali', address: 'Masaka Industrial Zone, Kigali, Rwanda', lat: -1.9895, lng: 30.2010, contact: 'info@inyange.rw' },
    { id: 3, name: 'Nyagatare Milk Center', city: 'Nyagatare', address: 'Eastern Province, Nyagatare District', lat: -1.2990, lng: 30.3260, contact: '+250 788 300 500' },
];

const FAQS = [
    {
        q: "How can I become an Inyange distributor?",
        a: "To become a certified Inyange distributor, please visit our Head Office in Masaka or contact our sales department at sales@inyange.rw. We welcome partners who share our commitment to quality."
    },
    {
        q: "Are Inyange products Halal certified?",
        a: "Yes. All Inyange products are locally and internationally certified by recognized Islamic organizations, ensuring they meet the highest Halal standards."
    },
    {
        q: "Does Inyange offer educational factory tours?",
        a: "We are proud of our state-of-the-art facility! We host scheduled educational tours for schools and professional groups. Please submit a request via our contact form at least two weeks in advance."
    },
    {
        q: "Where is the Masaka processing plant located?",
        a: "Our world-class processing facility is located in Masaka, about 20km from Kigali City Center along the Kigali-Kayonza highway."
    }
];

export default function ReachOutPage() {
    const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success("Message sent! We'll be in touch soon.");
            setFormData({ name: '', email: '', message: '' });
            setLoading(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#fcfbf7] font-sans">

            {/* ── SECTION 1: HERO ── */}
            <section className="relative w-full h-[40vh] md:h-[55vh] bg-[#0d55a0] overflow-hidden flex items-center justify-center pt-20">
                {/* Background Pattern Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                    style={{ backgroundImage: "url('/pattern.png')" }}
                />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-4">Connection Points</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                        GET IN <span className="text-[#33a4df]">TOUCH</span>.
                    </motion.h1>
                </div>
            </section>

            {/* ── SECTION 2: AESOP-STYLE PLANT MAP ── */}
            <section className="bg-white border-b border-black/5">
                <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] min-h-[500px]">
                    {/* Left: Project Locations List */}
                    <div className="p-8 md:p-16 border-r border-black/5 flex flex-col justify-center">
                        <h2 className="text-2xl font-black text-[#0d55a0] uppercase tracking-tighter mb-10">Our Physical Presence ({LOCATIONS.length})</h2>
                        <div className="space-y-12">
                            {LOCATIONS.map((loc, idx) => (
                                <motion.div 
                                    key={loc.id}
                                    onClick={() => setSelectedLoc(loc)}
                                    className={`cursor-pointer group flex gap-6 ${selectedLoc.id === loc.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'} transition-all`}
                                >
                                    <div className={`w-8 h-8 rounded-full border border-black flex items-center justify-center text-xs font-black shrink-0 ${selectedLoc.id === loc.id ? 'bg-black text-white' : ''}`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-tighter mb-1">{loc.name}</h3>
                                        <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mb-2">{loc.address}</p>
                                        <p className="text-[10px] font-bold text-[#0d55a0]">{loc.contact}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Map - Compact & Rounded */}
                    <div className="p-4 md:p-12 flex items-center justify-center bg-[#fdfdfd]">
                        <div className="relative w-full h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden border-8 border-white">
                            <ReachOutMap selected={selectedLoc} locations={LOCATIONS} onSelect={(id) => setSelectedLoc(LOCATIONS.find(l => l.id === id) || LOCATIONS[0])} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: FAQs & QUICK LINKS ── */}
            <section className="py-24 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-20">
                {/* Left: FAQs */}
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5bb63a] mb-4 block">Information Desk</span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#0d55a0] uppercase tracking-tighter mb-12">Common <span className="text-[#5bb63a]">Inquiries</span>.</h2>
                    
                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="border-b border-black/5 pb-4">
                                <button 
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between py-4 text-left group"
                                >
                                    <span className={`text-[13px] md:text-sm font-black uppercase tracking-tight transition-colors ${activeFaq === idx ? 'text-[#5bb63a]' : 'text-[#0d55a0] group-hover:text-[#5bb63a]'}`}>
                                        {faq.q}
                                    </span>
                                    <span className="text-xl font-light text-[#0d55a0]/30">{activeFaq === idx ? '−' : '+'}</span>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === idx && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed pb-4">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Socials & Quick Links */}
                <div className="space-y-12">
                    <div className="bg-[#0d55a0] rounded-[2.5rem] p-8 text-white shadow-2xl">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#5bb63a] mb-6 block">Quick Connect</span>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-8 italic">Follow us on Social Media:</h3>
                        <div className="flex flex-col gap-4">
                            {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(social => (
                                <button key={social} className="flex items-center justify-between bg-white/10 hover:bg-white text-white hover:text-[#0d55a0] transition-all px-5 py-3 rounded-xl group">
                                    <span className="text-[11px] font-black uppercase tracking-widest">{social}</span>
                                    <span className="text-xs group-hover:translate-x-1 transition-transform">↗</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border border-black/5 rounded-[2.5rem] p-8 bg-white shadow-sm">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0] mb-6 block">Direct Line</span>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Message Us</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="w-full bg-[#fcfbf7] border border-black/10 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest focus:border-[#1668b2] outline-none"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                            <textarea 
                                placeholder="How can we help?" 
                                rows={4}
                                className="w-full bg-[#fcfbf7] border border-black/10 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest focus:border-[#1668b2] outline-none resize-none"
                                value={formData.message}
                                onChange={e => setFormData({...formData, message: e.target.value})}
                            />
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-black text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1668b2] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Transmit Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </main>
    );
}
