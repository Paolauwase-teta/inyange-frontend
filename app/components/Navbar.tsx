'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DropdownItem {
    label: string;
    href: string;
}

interface NavLinkProps {
    label: string;
    href: string;
    dropdown?: DropdownItem[];
}

function NavLink({ label, href, dropdown }: NavLinkProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative group h-full flex flex-col items-center justify-center px-3"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Top indicator (visible on hover) */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00adef] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

            <Link
                href={href}
                className="text-[10px] font-black uppercase tracking-wider text-[#1668b2]/60 group-hover:text-[#00adef] transition-colors flex items-center gap-1"
            >
                {label}
                {dropdown && (
                    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-300 text-[#1668b2]/40">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                )}
            </Link>

            {/* Dropdown Menu */}
            {dropdown && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-44 bg-white border border-[#1668b2]/20 shadow-xl rounded-lg overflow-hidden transition-all duration-300 z-[110] ${isOpen ? 'opacity-100 translate-y-2 visible' : 'opacity-0 translate-y-4 invisible'}`}>
                    <div className="h-[2px] w-full bg-[#00adef]" />
                    <div className="py-1">
                        {dropdown.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="block px-3 py-1.5 text-[9px] font-bold uppercase tracking-tight text-[#1668b2]/60 hover:text-[#00adef] hover:bg-[#00adef]/5 transition-all border-b border-[#1668b2]/[0.02] last:border-0"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4 pointer-events-none">
            <div className="w-full bg-white/80 backdrop-blur-md border border-[#1668b2]/20 rounded-full h-11 shadow-2xl pointer-events-auto flex items-center justify-between px-5 relative transition-all duration-300">

                {/* Left: Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-[#1668b2] bg-white flex items-center justify-center group-hover:border-[#00adef]/60 transition-all">
                            <Image
                                src="/logo.png"
                                alt="Inyange Logo"
                                width={24}
                                height={24}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-xs font-black tracking-tighter text-[#1668b2] uppercase hidden sm:block">INYANGE</span>
                    </Link>
                </div>

                {/* Right: Links Grouped */}
                <div className="flex h-full items-center">
                    <NavLink label="Home" href="/" />
                    <NavLink label="Our Brands" href="/brands" />
                    <NavLink label="Recipes" href="/recipes" dropdown={[
                        { label: 'Breakfast', href: '/recipes/breakfast' },
                        { label: 'Cooking', href: '/recipes/cooking' },
                        { label: 'Baking and Topping', href: '/recipes/baking-and-topping' }
                    ]} />
                    <NavLink label="About" href="/about" dropdown={[
                        { label: 'About Us', href: '/about-us' },
                        { label: 'Leaders', href: '/leaders' },
                        { label: 'Careers', href: '/careers' }
                    ]} />
                    <NavLink label="Editorial" href="/editorial" />
                    <NavLink label="Reach Out" href="/reach-out" />
                </div>
            </div>
        </nav>
    );
}
