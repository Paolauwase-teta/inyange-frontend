"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Play } from 'lucide-react';
import Image from 'next/image';

const LEADERS = [
  { name: 'Marcus Mango', title: 'CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Sarah Chen', title: 'CFO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Jean-Paul Kagabo', title: 'COO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'Elena Rodriguez', title: 'CMO', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500' },
];

export default function AboutPage() {
  const heroImages = [
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600", alt: "Team" },
    { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600", alt: "Specialist" },
    { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600", alt: "Collaboration" },
    { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600", alt: "Leadership" }
  ];

  const coreValues = [
    {
      icon: <Users className="w-5 h-5 text-[#0d55a0]" />,
      title: "People First",
      desc: "Empowering our team and community.",
      bgColor: "bg-white"
    },
    {
      icon: <Target className="w-5 h-5 text-[#0d55a0]" />,
      title: "Integrity",
      desc: "Unhindered commitment to purity.",
      bgColor: "bg-white"
    },
    {
      icon: <Award className="w-5 h-5 text-[#0d55a0]" />,
      title: "Excellence",
      desc: "Setting the standard for quality.",
      bgColor: "bg-white"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ── SECTION 1: HERO (REFINED SPACING & OVERLAP) ── */}
      <section className="relative pt-32 md:pt-40 pb-0 flex flex-col items-center">
        {/* Theme Background Pattern Overlay */}
        <div 
            className="absolute inset-x-0 top-0 h-[380px] md:h-[450px] pointer-events-none select-none z-0 opacity-[0.04] bg-repeat bg-[length:400px]"
            style={{ backgroundImage: "url('/pattern.png')" }}
        />
        {/* Background color (Off-white theme) */}
        <div className="absolute top-0 left-0 w-full h-[380px] md:h-[450px] bg-[#fcfbf7] z-[-1]" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#0d55a0] mb-4 tracking-tight text-center uppercase tracking-tighter">
            About us
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto mb-8 leading-relaxed text-xs md:text-sm text-center">
            Inyange Industries: Rwanda's leading food processor, delivering premium dairy and beverages built on purity and excellence.
          </p>

          {/* Horizontal Image Row (Uniform & Scaled Down) */}
          <div className="flex flex-row items-center justify-center gap-4 md:gap-6 w-full mb-[-60px] md:mb-[-100px]">
            {heroImages.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden shadow-xl bg-white rounded-2xl w-20 md:w-36 h-28 md:h-48"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for overlap */}
      <div className="h-20 md:h-32" />

      {/* ── SECTION 2: COMPANY BRIEF (COMPACT) ── */}
      <section className="py-16 max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-1"
            >
                <h2 className="text-3xl font-black text-[#0d55a0] leading-tight mb-4">
                    Purity & <span className="text-[#5bb63a]">Innovation</span>
                </h2>
                <div className="w-12 h-1 bg-[#5bb63a] rounded-full mb-6" />
                <p className="text-zinc-500 text-xs leading-loose">
                    Founded in 1997, Inyange Industries has become Rwanda's most trusted name in nutrition, leveraging modern technology to deliver nature's best to your table.
                </p>
            </motion.div>

            {/* Core Values / Briefing */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {coreValues.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-3xl ${val.bgColor} border border-black/10 shadow-sm relative overflow-hidden`}
                    >
                        {/* Subtle pattern for cards */}
                        <div 
                            className="absolute inset-0 pointer-events-none opacity-[0.02] bg-repeat bg-[length:200px]"
                            style={{ backgroundImage: "url('/pattern.png')" }}
                        />
                        <div className="relative z-10">
                            <div className="mb-4">{val.icon}</div>
                            <h3 className="text-sm font-black text-[#1a1a1a] mb-2 uppercase tracking-tighter">{val.title}</h3>
                            <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">{val.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ── SECTION 3: LEADERSHIP (THE BRIEF) ── */}
      <section className="py-16 bg-[#fcfbf7] relative overflow-hidden">
        {/* Theme Background Pattern Overlay */}
        <div 
            className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
            style={{ backgroundImage: "url('/pattern.png')" }}
        />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0d55a0] mb-2 block">The Team</span>
                    <h2 className="text-3xl font-black text-[#0d55a0] uppercase tracking-tighter">Visionary <span className="text-[#5bb63a]">Leaders</span></h2>
                </div>
                <div className="hidden md:block">
                    <p className="text-zinc-400 text-[10px] max-w-[200px] leading-relaxed">
                        Driving Rwandan excellence through strategic vision and uncompromising quality.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {LEADERS.map((leader, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col"
                    >
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                            <Image 
                                src={leader.image} 
                                alt={leader.name} 
                                fill 
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-[#0d55a0]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-tighter">{leader.name}</h3>
                        <span className="text-[10px] font-bold text-[#5bb63a] uppercase tracking-widest">{leader.title}</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ── SECTION 4: IMPACT & EMPOWERMENT (RESTORED) ── */}
      <section className="py-20 max-w-6xl mx-auto px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image/Video Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
              alt="Making an impact"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                >
                    <Play className="w-6 h-6 text-[#0d55a0] fill-[#0d55a0]" />
                </motion.div>
            </div>

            {/* Floating Quote Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-64 bg-white rounded-2xl p-6 shadow-2xl"
            >
                <p className="text-[#1a1a1a] font-black text-xs italic mb-3 leading-relaxed">
                    "Making an impact, together"
                </p>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#0d55a0] uppercase tracking-widest">Inyange Leadership</span>
                    <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">Vision for Excellence</span>
                </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-black text-[#0d55a0] mb-6 leading-tight uppercase tracking-tighter">
              We empower small business owners
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm leading-loose mb-8">
              At Inyange, we recognize that our success is deeply intertwined with the prosperity of our local partners. We actively support small business owners across our supply chain—from local farmers to regional distributors.
            </p>
            <div className="pl-6 border-l-4 border-[#5bb63a]">
                <p className="text-zinc-600 text-xs md:text-sm italic font-medium leading-relaxed">
                    "Our commitment goes beyond processing; it's about building a sustainable ecosystem where every partner can thrive and contribute to Rwanda's growth."
                </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
