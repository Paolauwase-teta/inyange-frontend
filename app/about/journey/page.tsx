"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

const MILESTONES = [
  { year: '1997', title: 'THE FOUNDATION', desc: 'Inyange Industries was founded to lead Rwanda\'s food and beverage processing.' },
  { year: '2001', title: 'WATER PROCESSING', desc: 'Introduction of mineral water processing, setting hygiene standards.' },
  { year: '2010', title: 'MASAKA PLANT', desc: 'Construction of a state-of-the-art plant in Masaka, increasing capacity tenfold.' },
  { year: '2024', title: 'REGIONAL LEAD', desc: 'Expanding reach across East Africa, delivering purity to millions.' }
];

export default function JourneyPage() {
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
            The Journey <span className="text-[#33a4df]">→</span> <br />
            legacy in <span className="italic font-serif font-light text-zinc-400">motion</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-zinc-500 max-w-2xl leading-relaxed">
            From a local dairy processor to a regional powerhouse. Our timeline is defined by innovation and purity.
          </p>
        </motion.div>
      </section>

      {/* ── TIMELINE (MAKERS STYLE) ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto border-t border-zinc-100">
        <div className="space-y-px bg-zinc-200 border border-zinc-200">
           {MILESTONES.map((item, i) => (
             <motion.div 
               key={i}
               {...fadeUp}
               className="bg-white p-12 md:p-20 flex flex-col md:flex-row gap-12 md:items-center hover:bg-zinc-50 transition-all"
             >
                <span className="text-4xl md:text-6xl font-black text-zinc-100 group-hover:text-[#33a4df]/10 transition-colors">{item.year}</span>
                <div className="space-y-2">
                   <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{item.title}</h3>
                   <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
             </motion.div>
           ))}
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
