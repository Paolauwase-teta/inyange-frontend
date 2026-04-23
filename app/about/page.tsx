"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Trophy, TrendingUp, ArrowRight, Play, CheckCircle2,
  Briefcase, GraduationCap, Globe, ShieldCheck, Eye, Rocket, Target,
  Phone, Mail, MapPin, Share2, MessageCircle, MessagesSquare
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LEADERS } from '@/lib/data/leaders';

// Fixed transition for TypeScript compatibility
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
};

const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as any,
        duration: 25,
        ease: "linear",
      },
    },
  },
};

export default function AboutPage() {
  const teamMembers = LEADERS.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans selection:bg-[#33a4df]/20 selection:text-[#0d55a0] overflow-x-hidden">
      
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-20 overflow-hidden bg-[#071e3d]">
        {/* Full-Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Inyange_Industry.jpg"
            alt="Inyange Factory"
            fill
            className="object-cover scale-105 opacity-40 mix-blend-luminosity"
            priority
          />
        </div>
        {/* Rich dark-to-navy gradient overlay for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#071e3d]/95 via-[#0d55a0]/70 to-[#071e3d]/80" />
        {/* Subtle grain texture for depth */}
        <div className="absolute inset-0 z-10 opacity-20" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        
        <div className="max-w-[1200px] mx-auto px-8 text-center relative z-20 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#33a4df]" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80">Est. 1997 • Rwanda</span>
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase pb-2"
            >
              The Inyange <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Legac</span>
              <span className="relative inline-block">
                Y
                <span className="absolute bottom-[0.15em] -right-[0.2em] w-[0.25em] h-[0.25em] bg-[#33a4df] inline-block" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/60 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Building a healthy nation through natural excellence and world-class industrial standards. We are the pulse of Rwandan nutrition.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
             <button className="px-8 py-4 bg-[#33a4df] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Explore Our Story
             </button>
             <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white">Factory Tour</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: OUR STORY (Compact Editorial) ── */}
      <section className="py-16 px-8 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto">

          {/* Two-Column layout: Images Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Stacked Images */}
            <div className="flex items-end gap-3">
              <motion.div
                {...fadeUp}
                className="w-[44%] aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md"
              >
                <Image src="/about_processing.png" alt="Processing" fill className="object-cover" />
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ delay: 0.1 }}
                className="w-[48%] aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg mb-6"
              >
                <Image src="/editorial_hero.png" alt="Innovation" fill className="object-cover" />
              </motion.div>
            </div>

            {/* Right: Brand Typography matching Vision/Mission */}
            <motion.div {...fadeUp} className="space-y-6">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#33a4df] block">Since 1997</span>
              <h2 className="text-4xl font-black text-[#0d55a0] tracking-tighter uppercase leading-none">
                Our Journey
              </h2>
              <div className="w-12 h-[2px] bg-[#33a4df]" />
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                From our state-of-the-art processing plants to your family table, 
                we ensure every drop and every bite meets the highest global standards 
                of safety and natural flavor. Rooted in Rwanda, grown for the world.
              </p>
              <div>
                <button className="px-8 py-3 bg-[#0d55a0] text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-[#33a4df] transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Faint Word */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.03] uppercase tracking-tight whitespace-nowrap pointer-events-none select-none">
          INYANGE
        </div>
      </section>

      {/* ── SECTION 3: STANDARDS CAROUSEL (Contained) ── */}
      <section className="py-20 bg-[#f8fafc] border-y border-zinc-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-8 mb-10 flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0d55a0]/40">Industrial Standards</span>
           <div className="flex-1 h-[1px] bg-zinc-200 mx-8" />
        </div>
        
        {/* Leaving space on both edges */}
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-white border border-zinc-100 py-12">
            <div className="flex w-full overflow-hidden">
              <motion.div 
                className="flex gap-20"
                variants={marqueeVariants}
                animate="animate"
              >
                {[...Array(4)].map((_, groupIdx) => (
                  <React.Fragment key={groupIdx}>
                    {[
                      { id: 1, label: "ISO 22000" },
                      { id: 2, label: "HALAL" },
                      { id: 3, label: "RSB" },
                      { id: 4, label: "HACCP" }
                    ].map((item) => (
                      <div key={item.id} className="flex flex-col items-center gap-3 flex-shrink-0 group">
                        <div className="w-16 h-16 relative flex items-center justify-center p-3 bg-[#f8fafc] rounded-2xl transition-all duration-500 group-hover:bg-[#33a4df]/5">
                          <Image 
                            src={`/quality${item.id}.${item.id === 2 || item.id === 3 ? 'jpg' : 'png'}`}
                            alt={item.label}
                            width={50}
                            height={50}
                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-[#0d55a0] transition-colors">{item.label}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: VISION & MISSION (Full BG Image) ── */}
      <section className="relative py-35 overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/editorial_showcase_1.png"
            alt="Vision Background"
            fill
            className="object-cover opacity-30 mix-blend-luminosity scale-105"
          />
        </div>
        {/* Deep navy overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#071e3d]/95 via-[#0d55a0]/60 to-[#071e3d]/90" />

        <div className="relative z-20 max-w-[1000px] w-full mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {/* Vision */}
            <motion.div {...fadeUp} className="space-y-4">
               <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Our Vision</h3>
               <div className="w-12 h-[2px] bg-[#33a4df]" />
               <p className="text-sm text-white/50 leading-relaxed font-medium">
                  At Inyange, we envision a Rwanda where every household has access to natural, pure, and nourishing food products. 
                  We lead with integrity and innovation.
               </p>
            </motion.div>

            {/* Mission */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-4 md:text-right">
               <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Our Mission</h3>
               <div className="w-12 h-[2px] bg-[#5bb63a] md:ml-auto" />
               <p className="text-sm text-white/50 leading-relaxed font-medium">
                  Connecting Rwandan smallholder farmers to consumers through transparent, sustainable food chains. 
                  Nourishing lives and fostering community growth.
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: OUR TEAM (Compact with VOICES Watermark) ── */}
      <section className="py-24 px-8 bg-[#ffffff] relative overflow-hidden border-t border-zinc-100">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/circles.png")' }} />
        
        {/* Green VOICES Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-[#5bb63a]/[0.07] uppercase tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          VOICES
        </div>
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div {...fadeUp} className="lg:col-span-5 space-y-4 text-left">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#33a4df]">The Leadership</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0d55a0] tracking-tight leading-none uppercase">
              Meet With <br /> Our Expert
            </h2>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
              Our leadership team brings together decades of expertise to ensure Inyange remains the gold standard of Rwandan industry.
            </p>
            <div className="pt-2">
              <Link href="/leaders">
                <button className="px-8 py-3 bg-[#0d55a0] text-white rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-[#33a4df] transition-all">
                  Full Team
                </button>
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            {teamMembers.map((leader, i) => (
              <motion.div 
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-sm"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className={`p-4 text-center ${i === 0 ? 'bg-[#0d55a0] text-white' : 'bg-[#f8fafc] text-[#0d55a0]'}`}>
                   <h4 className="text-xs font-black uppercase truncate">{leader.name}</h4>
                   <p className="text-[8px] font-bold uppercase tracking-widest mt-0.5 opacity-50">{leader.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CONNECT WITH US (Blue with Footer Curvings) ── */}
      <section className="relative py-32 px-8 overflow-hidden bg-[#0d55a0]">
         {/* Background Pattern Overlay matching Footer */}
         <div 
             className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.05] bg-repeat bg-[length:400px]"
             style={{ backgroundImage: "url('/pattern.png')" }}
         />
         
         {/* Minimal SVG 3D Simulation matching Footer */}
         <div className="absolute inset-x-0 bottom-0 h-[150px] z-0 overflow-hidden opacity-20 pointer-events-none">
            <svg
                viewBox="0 0 1440 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
                preserveAspectRatio="xMidYMin slice"
            >
                <path
                    d="M0 100 C400 50 800 150 1440 100 V200 H0 V100 Z"
                    fill="#ffffff"
                    fillOpacity="0.1"
                />
                <path
                    d="M0 150 C500 100 1000 200 1440 150 V200 H0 V150 Z"
                    fill="#ffffff"
                    fillOpacity="0.1"
                />
                <path
                    d="M0 180 C600 150 1200 210 1440 180 V200 H0 V180 Z"
                    fill="#ffffff"
                    fillOpacity="0.2"
                />
            </svg>
         </div>
         
         <div className="max-w-[1200px] mx-auto text-center relative z-20 space-y-8">
            <motion.h2 {...fadeUp} className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
               READY TO JOIN <br /> <span className="text-[#33a4df]">THE FAMILY?</span>
            </motion.h2>
            
            <motion.p {...fadeUp} transition={{ delay: 0.2 }} className="text-white/60 text-base max-w-xl mx-auto font-medium">
               Whether you're a food technology expert, a logistics specialist, or a passionate graduate, we're here to grow together.
            </motion.p>

            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
               <button className="px-10 py-4 bg-[#33a4df] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  Contact Us Now
               </button>
               <button className="px-10 py-4 border-2 border-white/20 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#0d55a0] transition-all">
                  Careers
               </button>
            </motion.div>
         </div>
      </section>

      {/* Fine-Grain Ambient Noise */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.03]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dust.png")' }} />
    </main>
  );
}
