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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf7]">
        <h1 className="text-2xl font-black text-[#0d55a0] mb-4">Leader not found</h1>
        <button 
          onClick={() => router.back()}
          className="px-6 py-2 bg-[#0d55a0] text-white rounded-full font-bold uppercase tracking-widest text-xs"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbf7] font-sans pb-24">
      {/* ── HEADER ── */}
      <section className="pt-24 pb-8 text-center px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-black text-[#0d55a0] mb-4 tracking-tight uppercase tracking-tighter">
            Meet Our <span className="relative">
              Team
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#33a4df]/30 rounded-full" />
            </span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed text-sm">
            Our leadership team is driving Rwanda's excellence through strategic vision, 
            dedication to purity, and an uncompromising commitment to quality.
          </p>
        </motion.div>
      </section>

      {/* ── LEADER PROFILE SECTION (No Card) ── */}
      <section className="max-w-6xl mx-auto px-8 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src={leader.image}
              alt={leader.name}
              fill
              className="object-cover"
            />
            {/* Role Tag (Bubble Mode) */}
            <div className="absolute top-8 left-8 px-5 py-2.5 bg-white rounded-2xl shadow-xl">
              <span className="text-[10px] font-black text-[#0d55a0] uppercase tracking-[0.2em] leading-none">
                {leader.roleTag || leader.title}
              </span>
            </div>
          </motion.div>

          {/* Right: Content Side */}
          <div className="flex flex-col pt-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-[#0d55a0] mb-6 uppercase tracking-tighter leading-none">
                {leader.name}
              </h2>
              <p className="text-zinc-500 font-medium leading-loose mb-10 text-sm md:text-base max-w-xl">
                {leader.bio}
              </p>

              {/* Social Links (Clean Minimal Mode) */}
              <div className="flex items-center gap-4 mb-16">
                {leader.socialLinks.twitter && (
                  <a href={leader.socialLinks.twitter} className="w-11 h-11 rounded-2xl bg-[#f0f4f8] border border-black/5 flex items-center justify-center text-[#1a1a1a] hover:bg-[#0d55a0] hover:text-white transition-all transform hover:-translate-y-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                )}
                {leader.socialLinks.linkedin && (
                  <a href={leader.socialLinks.linkedin} className="w-11 h-11 rounded-2xl bg-[#f0f4f8] border border-black/5 flex items-center justify-center text-[#1a1a1a] hover:bg-[#0d55a0] hover:text-white transition-all transform hover:-translate-y-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Experience Section (Merged with Background) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-12 border-t border-black/5"
            >
              <h3 className="text-2xl md:text-3xl font-black text-[#1a1a1a] mb-6 uppercase tracking-tighter">
                {leader.experienceTitle}
              </h3>
              <p className="text-zinc-500 font-medium leading-loose mb-10 text-xs md:text-sm max-w-xl">
                {leader.experienceBio}
              </p>

              <div className="space-y-6">
                {leader.experiencePoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="mt-1">
                      <div className="w-6 h-6 rounded-full border-2 border-[#5bb63a]/30 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#5bb63a]" />
                      </div>
                    </div>
                    <p className="text-zinc-600 font-medium text-sm md:text-base leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── OTHER LEADERS GRID (Integrated) ── */}
      <section className="bg-white/50 backdrop-blur-sm py-32 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0d55a0] mb-2 block">Inyange Team</span>
                <h2 className="text-3xl font-black text-[#0d55a0] uppercase tracking-tighter">Browse <span className="text-[#33a4df]">Our Leaders</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {otherLeaders.slice(0, 8).map((item, idx) => (
                    <Link href={`/leaders/${item.slug}`} key={item.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 4) * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-black/5">
                                <Image 
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                
                                {/* Bottom Floating Info Section */}
                                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex-1">
                                            <h3 className="text-sm md:text-base font-black text-[#0d55a0] mb-0.5 leading-tight">{item.name}</h3>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter leading-tight">{item.title}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-[#0d55a0]/5 flex items-center justify-center text-[#0d55a0] group-hover:bg-[#0d55a0] group-hover:text-white transition-all overflow-hidden">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
}
