'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="w-full bg-[var(--inyange-blue)] text-white py-16 font-calibre">
            <div className="max-w-7xl mx-auto px-8 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    
                    {/* Column 1: INYANGE INDUSTRIES */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider">INYANGE INDUSTRIES</h3>
                        <p className="text-sm font-normal text-white/80">
                            Food Processing & Dairy / Beverages.
                        </p>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Explore</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">About Us</Link>
                            <Link href="/Careers" className="text-sm text-white/80 hover:text-white transition-colors">Careers</Link>
                            <Link href="/leaders" className="text-sm text-white/80 hover:text-white transition-colors">Leaders</Link>
                            <Link href="/reach-out#faq" className="text-sm text-white/80 hover:text-white transition-colors">FAQ</Link>
                        </div>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Connect</h3>
                        <div className="flex flex-col gap-2">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Instagram</a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">LinkedIn</a>
                            <a href="mailto:info@inyangeindustries.rw" className="text-sm text-white/80 hover:text-white transition-colors">Email</a>
                            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">TikTok</a>
                        </div>
                    </div>

                    {/* Column 4: Company */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Company</h3>
                        <p className="text-sm text-white/80">
                            Operating since 1997.
                        </p>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
}
