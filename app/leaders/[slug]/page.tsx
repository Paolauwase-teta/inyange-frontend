"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { LEADERS } from '@/lib/data/leaders';
import Link from 'next/link';

export default function LeaderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const leader = LEADERS.find((l) => l.slug === slug);
  const otherLeaders = LEADERS.filter((l) => l.slug !== slug);

  if (!leader) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-[#0d55a0]">
        <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">Voice not found</h1>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#33a4df] text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg hover:scale-105 transition-transform"
        >
          Back to Leaders
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0d55a0] font-sans overflow-hidden selection:bg-[#33a4df]/20 selection:text-[#0d55a0]">
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(51,164,223,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_110%,rgba(13,85,160,0.1),transparent)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard.png')" }} />
      </div>

      {/* ── TOP NAVIGATION ── */}
      <nav className="fixed top-24 left-8 right-8 z-50 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -10 }}
          onClick={() => router.back()}
          className="group flex gap-4 items-center px-6 py-4 bg-white/80 backdrop-blur-3xl rounded-[1.5rem] border border-[#0d55a0]/10 shadow-xl"
        >
          <div className="w-8 h-8 rounded-full bg-[#0d55a0] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0d55a0]/70 group-hover:text-[#0d55a0] transition-colors">Back to Leaders</span>
        </motion.button>

        <div className="hidden md:flex gap-4">
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#0d55a0]/20">Governance Record</span>
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#33a4df]">0{leader.id}</span>
        </div>
      </nav>

      {/* ── PROFILE CORE ── */}
      <section className="relative z-10 pt-52 pb-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: Interactive Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-5 relative perspective-[1000px]"
          >
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(13,85,160,0.2)] z-10 border border-white group">
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                className="object-cover saturate-[0.9] group-hover:saturate-100 transition-all duration-1000"
              />

              {/* Immersive Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/40 via-transparent to-transparent opacity-60" />

              {/* Floating Meta Data */}
              <div className="absolute bottom-10 left-10 right-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-3xl border border-[#33a4df]/20 rounded-2xl shadow-xl"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#33a4df]">
                    {leader.roleTag || leader.level}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Ambient Background Glow for Portrait */}
            <div className="absolute -inset-10 bg-[#33a4df]/10 blur-[100px] -z-10 animate-pulse" />
          </motion.div>

          {/* Right: Chronological & Bio Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Medium Name */}
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 text-[#0d55a0]">
                {leader.name}<span className="text-[#33a4df]">.</span>
              </h1>

              {/* Medium Tag & Social */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="px-5 py-2.5 border border-[#33a4df]/20 bg-[#33a4df]/5 text-[#33a4df] rounded-xl text-[10px] font-black uppercase tracking-widest">
                  {leader.title}
                </div>
                <div className="flex gap-3">
                  {leader.socialLinks.linkedin && (
                    <a href={leader.socialLinks.linkedin} className="w-10 h-10 rounded-xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-[#0d55a0] hover:bg-[#0d55a0] hover:text-white transition-all transform hover:-translate-y-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Medium Bio */}
              <div className="relative pl-8 border-l-4 border-[#33a4df]/20 mb-12">
                <p className="text-[#0d55a0]/70 font-medium leading-relaxed text-sm md:text-lg tracking-tight max-w-2xl italic">
                  "{leader.bio}"
                </p>
              </div>

              {/* Experience List - Medium */}
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#0d55a0]">Track Record</h3>
                  <div className="flex-1 h-[1px] bg-[#0d55a0]/10" />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {leader.experiencePoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-6 bg-white/60 p-6 rounded-2xl border border-[#0d55a0]/5 hover:border-[#33a4df]/20 transition-all group shadow-sm hover:shadow-xl"
                    >
                      <div className="flex-shrink-0 pt-1">
                        <div className="w-10 h-10 rounded-xl bg-[#33a4df]/10 flex items-center justify-center text-[#33a4df]">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-[#0d55a0]/60 font-bold text-xs md:text-sm leading-relaxed">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── PERSPECTIVE EXPLORER (OTHER LEADERS) ── */}
      <section className="relative z-10 py-40 border-t border-[#0d55a0]/5">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-24 flex md:items-end justify-between gap-12 flex-col md:flex-row">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#33a4df] mb-4 block">Expand the Circle</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-[#0d55a0]">Other <br /> <span className="text-[#0d55a0]/10">Visionaries.</span></h2>
            </div>
            <Link
              href="/leaders"
              className="px-8 py-3 h-fit border border-[#0d55a0]/10 hover:bg-[#0d55a0] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              View All Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherLeaders.slice(0, 4).map((item, idx) => (
              <Link href={`/leaders/${item.slug}`} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white border border-[#0d55a0]/5 group-hover:border-[#33a4df]/50 transition-all duration-700 shadow-sm hover:shadow-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover saturate-0 group-hover:saturate-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#0d55a0]/80 via-transparent to-transparent">
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-white">{item.name}</h3>
                      <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fine-Grain Ambient Noise */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.05]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dust.png")' }} />
    </main>
  );
}
