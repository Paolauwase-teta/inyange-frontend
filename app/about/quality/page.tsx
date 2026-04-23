"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const STANDARDS = [
    { icon: <Award className="w-6 h-6" />, title: "ISO 22000", desc: "Global food safety management standards." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "HACCP", desc: "Rigorous hazard analysis and critical control points." },
    { icon: <Zap className="w-6 h-6" />, title: "FLASH TECH", desc: "Advanced pasteurization for maximum nutrient retention." }
];

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-white text-[#0d55a0] font-sans selection:bg-[#33a4df]/20 selection:text-[#0d55a0]">
      {/* ── BACK BUTTON ── */}
      <div className="pt-32 px-8 max-w-7xl mx-auto">
        <Link href="/about" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#33a4df]">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          Back to Hub
        </Link>
      </div>

      {/* ── HERO ── */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12">
            The Quality <span className="text-[#33a4df]">→</span> <br />
            absolute <span className="italic font-serif font-light text-zinc-400">purity</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-zinc-500 max-w-2xl leading-relaxed">
            Every drop is tested, verified, and certified to meet the highest global standards of safety and nutrition.
          </p>
        </motion.div>
      </section>

      {/* ── STANDARDS (MAKERS STYLE) ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto border-t border-zinc-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 mb-40">
           {STANDARDS.map((std, i) => (
             <motion.div 
               key={i}
               {...fadeUp}
               transition={{ ...transition, delay: i * 0.1 }}
               className="bg-white p-16 space-y-8 hover:bg-zinc-50 transition-all"
             >
                <div className="w-12 h-12 bg-[#0d55a0]/5 flex items-center justify-center text-[#0d55a0]">
                   {std.icon}
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-black uppercase tracking-tighter">{std.title}</h3>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed">{std.desc}</p>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeUp} className="space-y-10">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#33a4df]">Purity Standards</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
                    Tested to <br /> <span className="italic font-serif font-light text-zinc-400">perfection</span>
                </h2>
                <p className="text-zinc-600 text-lg font-medium leading-relaxed pt-8 border-t border-zinc-100">
                    Inyange Industries employs the latest in dairy and beverage processing technology. Our Masaka plant is a hub of innovation, where every batch is tested for microbiological, chemical, and physical purity.
                </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...transition, delay: 0.2 }} className="relative aspect-square shadow-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
               <Image src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800" alt="Lab Testing" fill className="object-cover" />
            </motion.div>
        </div>
      </section>

      {/* ── FOOTER LOGO (CONNECTED) ── */}
      <section className="pt-20 pb-20 px-8 border-t border-zinc-100 overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-[15vw] font-black tracking-tighter leading-none text-[#0d55a0] whitespace-nowrap">
               Inyange <span className="text-[#33a4df]">→</span> Industries
            </h1>
         </div>
      </section>
    </main>
  );
}
