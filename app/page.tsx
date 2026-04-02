"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import OnboardingGuide from './components/OnboardingGuide';
import ProjectShowcase from './components/ProjectShowcase';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 }
  }
};

const PATH_D_SERVICES =
  "M 180 120 C 350 120, 350 120, 480 120 C 600 120, 750 120, 820 120 C 950 120, 950 320, 820 320 C 700 320, 600 320, 480 320 C 350 320, 150 320, 180 320 C 50 320, 50 520, 340 520 C 450 520, 500 520, 660 520";

// Cubic bezier that passes through every cx/cy
const PATH_D =
  'M 45 255 C 150 255, 200 170, 297 170 C 400 170, 455 100, 558 100 C 665 100, 720 40, 792 40';

// SVG viewBox dimensions
const VB_W = 900;
const VB_H = 340;

import Footer from './components/Footer';

interface Milestone {
  id: number;
  label: string;
  number: string;
  year: string;
  title: string;
  company: string;
  description: string;
  cx: number;
  cy: number;
}

interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  number: string;
}

export default function Home() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([
      fetch('/api/milestones').then(res => res.json()),
      fetch('/api/services').then(res => res.json())
    ])
      .then(([milestonesData, servicesData]) => {
        setMilestones(Array.isArray(milestonesData) ? milestonesData : []);
        setServices(Array.isArray(servicesData) ? servicesData : []);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: number) =>
    setActiveNode(prev => (prev === id ? null : id));

  function ServiceCard({ data }: { data: Service }) {
    if (!data) return null;
    return (
      <Link href={`/services/${data.slug}`}
        className="bg-[#fcfcfc] border border-[#1668b2]/20 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 w-full max-w-[190px] relative group reveal block"
      >
        {/* Decorative bar at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#00adef] rounded-b-sm group-hover:w-12 transition-all duration-500" />

        <div className="pt-2">
          <span className="text-[10px] font-black text-black/20 block mb-1">{data.number}</span>
          <h3 className="text-sm font-black uppercase tracking-tighter text-[#1668b2] mb-2 leading-tight group-hover:text-[#0b4a7d] transition-colors">{data.title}</h3>
          <p className="text-[10px] font-medium text-black/60 leading-tight italic">{data.description}</p>
        </div>

        {/* Arrow hint */}
        <div className="absolute bottom-3 right-3 text-black/10 group-hover:text-[#1668b2]/60 transition-colors text-[10px] font-black">→</div>
        {/* Decorative bar at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-black/10 rounded-t-sm" />
      </Link>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── SECTION 1: HERO (REFERENCE STYLE) ── */}
      <section id="hero" className="bg-white pt-32 pb-6 md:pt-36 md:pb-8 px-12 md:px-24 lg:px-36">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-6 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none text-black mb-2">
                Inyange Dairy,
                <br />
                Built With Quality
              </h1>
              <p className="text-sm md:text-base text-black/45 font-semibold">
                Trusted milk, yoghurt, juice, and water production from modern hygienic facilities.
              </p>
            </div>
            <Link
              href="/services"
              className="shrink-0 mt-1 rounded-xl bg-[#1668b2] text-white text-xs md:text-sm font-bold px-5 py-2.5 hover:bg-[#0b4a7d] transition-colors"
            >
              Our Lines
            </Link>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-2 md:p-2.5 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2.5">
            <div className="relative rounded-2xl overflow-hidden border border-black/10 h-[210px] md:h-[250px]">
              <img
                src="/Inyange_Industry.jpg"
                alt="Inyange industry food production"
                className="w-full h-full object-cover"
              />
              {/* Softer gradient + tighter panel so the image stays visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              <div className="absolute left-4 right-4 bottom-2 bg-black/20 backdrop-blur-md border border-white/15 rounded-2xl px-2.5 md:px-3 py-1.5 flex items-center justify-between gap-2.5">
                <div>
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-white/80 mb-0.5">Inyange Industries</span>
                  <h3 className="text-white text-[15px] md:text-base font-extrabold leading-tight">
                    Leaders in dairy & beverage production
                  </h3>
                  <p className="text-white/70 text-[10px] md:text-xs mt-0.5 max-w-lg">
                    From raw material procurement to final delivery, quality stays at the center of every batch.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center text-sm font-black shrink-0">
                  ↗
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-black/10 h-[210px] md:h-[250px]">
              <img
                src="/Products.jpeg"
                alt="Inyange products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/8 to-transparent" />
              <div className="absolute left-4 bottom-3 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl px-4 py-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1668b2]">Products</span>
              </div>
            </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-black/10 bg-white p-3.5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] font-black uppercase tracking-[0.16em] text-[#1668b2] bg-[#00adef]/10 px-2 py-0.5 rounded-full">Heritage</span>
                <span className="text-[9px] font-bold text-black/30">01</span>
              </div>
              <p className="text-xl md:text-2xl font-black text-black leading-none">1997</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-black/35 mt-1.5">Brand Started</p>
              <p className="text-[10px] text-black/45 mt-1.5">Inyange begins operations in Rwanda.</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-3.5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] font-black uppercase tracking-[0.16em] text-[#1668b2] bg-[#00adef]/10 px-2 py-0.5 rounded-full">Scale</span>
                <span className="text-[9px] font-bold text-black/30">02</span>
              </div>
              <p className="text-xl md:text-2xl font-black text-black leading-none">10x</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-black/35 mt-1.5">Capacity Growth</p>
              <p className="text-[10px] text-black/45 mt-1.5">Masaka expansion enables higher output.</p>
            </div>
            <div className="rounded-2xl border border-[#1668b2] bg-[#1668b2] p-3.5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] font-black uppercase tracking-[0.16em] text-white bg-white/20 px-2 py-0.5 rounded-full">Market</span>
                <span className="text-[9px] font-bold text-white/60">03</span>
              </div>
              <p className="text-xl md:text-2xl font-black text-white leading-none">EAC</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/75 mt-1.5">Regional Market Reach</p>
              <p className="text-[10px] text-white/75 mt-1.5">Expanding distribution across neighboring markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: OUR SERVICES ── */}
      <section id="services" className="bg-white pt-12 pb-0 md:pt-16 md:pb-10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black">Our Processing Lines</h2>
          </div>

          <div className="relative md:min-h-[550px]">
            {/* Connecting Dashed Path (High Contrast) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 1000 550" fill="none" preserveAspectRatio="none">
                <path
                  d={PATH_D_SERVICES}
                  stroke="#00adef"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  strokeOpacity="0.22"
                />
              </svg>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-full min-h-[550px]">
                <p className="text-zinc-400 font-medium">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[550px]">
                <p className="text-zinc-400 font-medium">No services found.</p>
              </div>
            ) : (
              /* 3-3-2 Tiered Layout (Centered) */
              <div className="flex flex-col gap-10 md:block">
                {/* Row 1: 3 cards */}
                {services[0] && <div className="md:absolute md:top-0 md:left-[80px]"><ServiceCard data={services[0]} /></div>}
                {services[1] && <div className="md:absolute md:top-0 md:left-[405px]"><ServiceCard data={services[1]} /></div>}
                {services[2] && <div className="md:absolute md:top-0 md:left-[730px]"><ServiceCard data={services[2]} /></div>}

                {/* Row 2: 3 cards */}
                {services[3] && <div className="md:absolute md:top-[200px] md:left-[80px]"><ServiceCard data={services[3]} /></div>}
                {services[4] && <div className="md:absolute md:top-[200px] md:left-[405px]"><ServiceCard data={services[4]} /></div>}
                {services[5] && <div className="md:absolute md:top-[200px] md:left-[730px]"><ServiceCard data={services[5]} /></div>}

                {/* Row 3: 2 cards */}
                {services[6] && <div className="md:absolute md:top-[400px] md:left-[240px]"><ServiceCard data={services[6]} /></div>}
                {services[7] && <div className="md:absolute md:top-[400px] md:left-[560px]"><ServiceCard data={services[7]} /></div>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ABOUT US / EVOLUTION TIMELINE ── */}
      <section id="about" className="bg-white pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12">

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1668b2] mb-2">EVOLUTION OF INYANGE INDUSTRIES</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10 md:mb-16">Our Story</h2>

          {/* Timeline container — overflow:visible so cards can pop above */}
          <div className="relative w-full" style={{ height: '360px' }}>

            {/* EVOLUTION watermark — sized to fill the box width exactly */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span
                className="font-black uppercase tracking-tighter leading-none whitespace-nowrap"
                style={{ fontSize: 'clamp(90px, 13vw, 160px)', color: 'rgba(0,173,239,0.07)' }}
              >
                INYANGE
              </span>
            </div>

            {/* SVG: path only — dots are HTML so click + card works cleanly */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d={PATH_D}
                stroke="#1668b2"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                fill="none"
              />
            </svg>

            {/* Dots + labels + cards — HTML layers on top of SVG */}
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-zinc-400 font-medium">Loading history...</p>
              </div>
            ) : milestones.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-zinc-400 font-medium">No history found.</p>
              </div>
            ) : (
              milestones.map((m, idx) => {
                const leftPct = (m.cx / VB_W) * 100;
                const topPct = (m.cy / VB_H) * 100;
                const isActive = activeNode === m.id;
                const isRight = leftPct > 70;
                const dotSize = idx === 1 ? 18 : 10; // making the second dot slightly bigger for effect

                return (
                  <div
                    key={m.id}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      // Centre exactly on the path coordinate
                      transform: 'translate(-50%, -50%)',
                      zIndex: isActive ? 40 : 10,
                    }}
                  >
                    {/* ── Dot ── */}
                    <button
                      onClick={() => toggle(m.id)}
                      className="rounded-full bg-[#00adef] flex items-center justify-center hover:scale-125 transition-transform duration-200 focus:outline-none"
                      style={{
                        width: dotSize,
                        height: dotSize,
                        boxShadow: isActive ? '0 0 0 3px rgba(0,173,239,0.25)' : 'none',
                      }}
                      aria-label={m.label}
                    />

                    {/* ── Label below ── */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center whitespace-nowrap pointer-events-none">
                      <p className="text-[8px] font-bold text-[#1668b2] tracking-widest leading-none mb-0.5">{m.number}</p>
                      <p className="text-[9px] font-bold text-[#1668b2]">{m.label}</p>
                    </div>

                    {/* ── Card (shows on click) ── */}
                    {isActive && (
                      <div
                        className={`absolute z-50 w-[210px] bg-white border border-[#1668b2]/15 rounded-2xl p-5 shadow-2xl ${isRight ? 'right-0' : 'left-0'}`}
                        style={{ bottom: '26px' }}
                      >
                        <p className="text-[9px] font-bold text-[#1668b2]/50 tracking-widest mb-1">{m.year}</p>
                        <h4 className="text-sm font-black leading-tight mb-0.5 text-[#1668b2]">{m.title}</h4>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#1668b2] mb-3">{m.company}</p>
                        <p className="text-[10px] text-[#1668b2]/90 leading-relaxed">{m.description}</p>
                        <button
                          onClick={() => setActiveNode(null)}
                          className="mt-3 text-[8px] font-black uppercase tracking-widest text-[#1668b2]/30 hover:text-[#1668b2] transition-colors"
                        >
                          Close ×
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-12 md:mt-16">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#1668b2] mb-4">
              About Inyange Industries
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="rounded-xl border border-black/10 bg-white p-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#1668b2]/70">Brand Since</p>
                <p className="text-lg md:text-xl font-black text-black mt-1">1997</p>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#1668b2]/70">Operations Since</p>
                <p className="text-lg md:text-xl font-black text-black mt-1">1999</p>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#1668b2]/70">Plant Expansion</p>
                <p className="text-lg md:text-xl font-black text-black mt-1">$27M</p>
              </div>
              <div className="rounded-xl border border-[#1668b2] bg-[#1668b2] p-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/75">Capacity Growth</p>
                <p className="text-lg md:text-xl font-black text-white mt-1">10x</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00adef] mb-3">Who We Are</p>
                <ul className="text-[13px] md:text-[14px] text-black/70 leading-relaxed space-y-2">
                  <li>Leading food processor in Rwanda under the Inyange brand.</li>
                  <li>Started with pasteurized milk and yoghurt, later adding mineral water in 2001.</li>
                  <li>Now a household FMCG name for high-quality water, juices, milk, and dairy products.</li>
                  <li>Expanded to neighboring countries through the EAC market and customs union.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#1668b2]/20 bg-[#00adef]/[0.04] p-4 md:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00adef] mb-3">Quality Promise</p>
                <p className="text-[13px] md:text-[14px] text-black/75 leading-relaxed italic">
                  "At Inyange, we maintain high quality from raw material procurement to final delivery.
                  This commitment has earned us market-leader status in multiple production lines."
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-5 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00adef] mb-2">Our Vision</p>
                    <p className="text-[12px] md:text-[13px] text-black/70 leading-relaxed">
                      To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value.
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00adef] mb-2">Our Mission</p>
                    <p className="text-[12px] md:text-[13px] text-black/70 leading-relaxed">
                      To secure the highest value for all stakeholders while enriching lives through nutritious and tasty dairy and beverage choices.
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#00adef] mb-2">Our Values</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Results Driven', 'Integrity', 'Innovation', 'Excellence', 'Leadership'].map((value) => (
                        <span key={value} className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md border border-[#1668b2]/20 text-[#1668b2] bg-white">
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="projects"><ProjectShowcase /></div>

      <OnboardingGuide />
      <Footer />
    </div>
  );
}
