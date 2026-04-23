"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Target, Heart } from 'lucide-react';
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

export default function VisionPage() {
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
            The Vision <span className="text-[#33a4df]">→</span> <br />
            shaping <span className="italic font-serif font-light text-zinc-400">futures</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-zinc-500 max-w-2xl leading-relaxed">
            Our strategic focus is built on health, prosperity, and the unyielding pursuit of regional excellence.
          </p>
        </motion.div>
      </section>

      {/* ── CONTENT (MAKERS STYLE) ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto border-t border-zinc-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 bg-zinc-100 border border-zinc-100 mb-40 shadow-2xl">
            <motion.div 
               {...fadeUp}
               className="bg-white p-16 md:p-32 space-y-8 flex flex-col justify-center"
            >
               <div className="w-12 h-12 bg-[#33a4df]/5 flex items-center justify-center text-[#33a4df] mb-4">
                  <Eye className="w-6 h-6" />
               </div>
               <h3 className="text-3xl font-black uppercase tracking-tighter">The Vision</h3>
               <p className="text-zinc-600 text-xl font-medium leading-relaxed italic">
                  "To be the leading producer of high-quality food and beverage products in Africa, recognized for our commitment to excellence."
               </p>
               <div className="w-16 h-1 bg-[#33a4df]" />
            </motion.div>

            <motion.div 
               {...fadeUp}
               className="bg-[#0d55a0] p-16 md:p-32 space-y-8 text-white flex flex-col justify-center"
            >
               <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-white mb-4">
                  <Target className="w-6 h-6" />
               </div>
               <h3 className="text-3xl font-black uppercase tracking-tighter">The Mission</h3>
               <p className="text-white/80 text-xl font-medium leading-relaxed italic">
                  "To produce high-quality, nutritious food and beverage products that contribute to the health and prosperity of our community."
               </p>
               <div className="w-16 h-1 bg-[#5bb63a]" />
            </motion.div>
         </div>

         <div className="max-w-4xl mx-auto space-y-24">
            <motion.div {...fadeUp} className="flex flex-col md:flex-row items-center gap-16 text-center md:text-left">
                <div className="w-24 h-24 border border-zinc-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-10 h-10 text-[#5bb63a]" />
                </div>
                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#33a4df]">Commitment</span>
                    <h3 className="text-3xl font-black text-[#0d55a0] uppercase tracking-tighter leading-none">CORE VALUES</h3>
                    <p className="text-zinc-500 text-lg font-medium leading-relaxed pt-6 border-t border-zinc-100">
                        Beyond our products, we are driven by integrity, excellence, and a deep respect for our Rwandan heritage.
                    </p>
                </div>
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
