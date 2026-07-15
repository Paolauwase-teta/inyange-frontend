'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'OUR BRANDS', href: '/brands' },
  { label: 'RECIPES', href: '/recipes' },
  { label: 'ABOUT', href: '/about' },
  { label: 'EDITORIAL PAGE', href: '/editorial' },
  { label: 'REACH OUT', href: '/reach-out' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-7xl px-4 md:px-12 pointer-events-none">
      <div className="bg-[var(--inyange-blue)] rounded-b-[2rem] pt-6 pb-6 px-4 flex flex-col items-center justify-center pointer-events-auto shadow-2xl relative">
        {/* Centered Logo SVG */}
        <Link href="/" className="mb-6 relative z-10 block transition-transform hover:scale-105">
          <svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110" cy="30" rx="100" ry="25" stroke="white" strokeWidth="2.5" className="opacity-90"/>
            <text x="110" y="38" fontSize="28" fill="white" fontFamily="var(--font-voyager)" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">INYANGE</text>
          </svg>
        </Link>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-x-12 z-10 w-full px-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs md:text-sm tracking-wider uppercase font-semibold transition-colors duration-300 font-gill ${
                  isActive ? 'text-[var(--inyange-lime)]' : 'text-white hover:text-[var(--inyange-lime)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
