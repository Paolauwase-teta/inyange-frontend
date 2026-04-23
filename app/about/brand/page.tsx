"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Star } from 'lucide-react';
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

export default function BrandStoryPage() {
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
            The Brand <span className="text-[#33a4df]">→</span> <br />
            legacy of <span className="italic font-serif font-light text-zinc-400">excellence</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-zinc-500 max-w-2xl leading-relaxed">
            Since 1997, Inyange Industries has been the pride of Rwanda's dairy industry, setting the standard for purity and innovation.
          </p>
        </motion.div>
      </section>

      {/* ── CONTENT (MAKERS STYLE) ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto border-t border-zinc-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
           <motion.div {...fadeUp} className="space-y-16">
              <div className="group">
                 <div className="flex gap-8">
                    <span className="text-sm font-black text-zinc-300">01.</span>
                    <div className="space-y-4">
                       <h3 className="text-2xl font-black tracking-tighter uppercase">Modern Facilities</h3>
                       <p className="text-zinc-600 text-lg font-medium leading-relaxed">
                          Operating in modern and hygienic production facilities, Inyange manufactures a wide range of products including mineral water, fruit juices, and dairy.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="group">
                 <div className="flex gap-8">
                    <span className="text-sm font-black text-zinc-300">02.</span>
                    <div className="space-y-4">
                       <h3 className="text-2xl font-black tracking-tighter uppercase">Purity Guaranteed</h3>
                       <p className="text-zinc-600 text-lg font-medium leading-relaxed">
                          We are renowned for our commitment to excellence. Every product that leaves our plant is a testament to our unyielding quality control.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-zinc-100">
                 <div className="space-y-4">
                    <Award className="w-8 h-8 text-[#33a4df]" />
                    <h4 className="text-sm font-black uppercase">Global Standards</h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ISO 22000 Certified</p>
                 </div>
                 <div className="space-y-4">
                    <Star className="w-8 h-8 text-[#5bb63a]" />
                    <h4 className="text-sm font-black uppercase">Local Trust</h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">RSB Excellence</p>
                 </div>
              </div>
           </motion.div>

           <motion.div {...fadeUp} transition={{ ...transition, delay: 0.2 }} className="relative aspect-[4/5] shadow-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <Image src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800" alt="Inyange Purity" fill className="object-cover" />
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
