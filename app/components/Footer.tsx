'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const HillPath = ({ d, fill, delay }: { d: string, fill: string, delay: number }) => (
    <motion.path
        d={d}
        fill={fill}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: "circOut" }}
        viewport={{ once: true }}
    />
);

const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Email', href: 'mailto:info@inyangeindustries.rw' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
];

export default function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="w-full relative overflow-hidden bg-white pb-8">
            {/* Background Pattern Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                style={{ backgroundImage: "url('/pattern.png')" }}
            />

            {/* Minimal SVG 3D Simulation (Subtle & Compact) */}
            <div className="absolute inset-x-0 bottom-0 h-[150px] z-0 overflow-hidden opacity-40 pointer-events-none">
                <svg
                    viewBox="0 0 1440 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMin slice"
                >
                    <HillPath
                        d="M0 100 C400 50 800 150 1440 100 V200 H0 V100 Z"
                        fill="#f4f4f5"
                        delay={0.4}
                    />
                    <HillPath
                        d="M0 150 C500 100 1000 200 1440 150 V200 H0 V150 Z"
                        fill="#e4e4e7"
                        delay={0.2}
                    />
                    <HillPath
                        d="M0 180 C600 150 1200 210 1440 180 V200 H0 V180 Z"
                        fill="#ffffff"
                        delay={0}
                    />
                </svg>
            </div>

            {/* Simple & Clean Content Layer */}
            <div className="relative z-10 max-w-6xl mx-auto px-8 pt-6">

                {/* Top Grid: Minimal Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="text-sm font-black uppercase tracking-tighter mb-3 text-[#0d55a0]">INYANGE INDUSTRIES</h2>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                            Food Processing & Dairy / Beverages.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-1">Explore</span>
                        {[
                            { label: 'About Us', href: '/about' },
                            { label: 'Careers', href: '/Careers' },
                            { label: 'Leaders', href: '/leaders' },
                            { label: 'FAQ', href: '/reach-out#faq' }
                        ].map(item => (
                            <a key={item.label} href={item.href} className="text-[11px] font-bold uppercase text-zinc-600 hover:text-[#33a4df] transition-colors">{item.label}</a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-1">Connect</span>
                        {socialLinks.map(item => (
                            <a key={item.label} href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="text-[11px] font-bold uppercase text-zinc-600 hover:text-[#33a4df] transition-colors">{item.label}</a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-1">Company</span>
                        <p className="text-[11px] font-bold uppercase text-zinc-500">
                            Operating since <br /> 1997.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar: Ultra Clean */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center pt-6 border-t border-zinc-100 gap-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300">
                        © 2026 INYANGE INDUSTRIES. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex items-center gap-6">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-200">
                            Simulated Horizon V4.0
                        </span>
                        <div className="w-2 h-2 rounded-full bg-zinc-100 animate-pulse" />
                    </div>
                </div>

                {/* Branding Hook at the very bottom */}
                <div className="mt-12 text-center">
                    <p className="text-[12vw] font-black text-[#0d55a0]/10 leading-none select-none uppercase tracking-tighter">
                        Inyange
                    </p>
                </div>
            </div>
        </footer>
    );
}
