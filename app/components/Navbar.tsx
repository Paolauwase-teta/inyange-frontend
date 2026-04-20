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
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[teal] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

            <Link
                href={href}
                className="text-[10px] font-black uppercase tracking-wider text-[navy]/60 group-hover:text-[teal] transition-colors flex items-center gap-1"
            >
                {label}
                {dropdown && (
                    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-300 text-[navy]/40">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                )}
            </Link>

            {/* Dropdown Menu */}
            {dropdown && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-44 bg-white border border-[navy]/20 shadow-xl rounded-lg overflow-hidden transition-all duration-300 z-[110] ${isOpen ? 'opacity-100 translate-y-2 visible' : 'opacity-0 translate-y-4 invisible'}`}>
                    <div className="h-[2px] w-full bg-[teal]" />
                    <div className="py-1">
                        {dropdown.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="block px-3 py-1.5 text-[9px] font-bold uppercase tracking-tight text-[navy]/60 hover:text-[teal] hover:bg-[teal]/5 transition-all border-b border-[navy]/[0.02] last:border-0"
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

const NAV_ITEMS: NavLinkProps[] = [
    { label: "Home", href: "/" },
    { label: "Our Brands", href: "/brands", dropdown: [
        { label: 'Milk', href: '/brands/milk' },
        { label: 'Milk Products', href: '/brands/milk-products' },
        { label: 'Juice', href: '/brands/juice' },
        { label: 'Water', href: '/brands/water' }
    ]},
    { label: "Recipes", href: "/recipes", dropdown: [
        { label: 'Breakfast', href: '/recipes/breakfast' },
        { label: 'Cooking', href: '/recipes/cooking' },
        { label: 'Baking', href: '/recipes/baking' },
        { label: 'Desserts', href: '/recipes/desserts' }
    ]},
    { label: "About", href: "/about", dropdown: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Leaders', href: '/leaders' },
        { label: 'Careers', href: '/careers' }
    ]},
    { label: "Editorial", href: "/editorial" },
    { label: "Reach Out", href: "/reach-out" }
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        if (isMobileMenuOpen) setExpandedMobileItem(null); // Reset accordions when closing
    };

    return (
        <>
            {/* Blurry Backdrop Overlay for Mobile Menu */}
            <div 
                className={`fixed inset-0 z-[90] bg-black/10 backdrop-blur-md transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-4xl px-4 pointer-events-none">
                <div className={`w-full bg-white/80 backdrop-blur-md border border-[navy]/20 shadow-2xl pointer-events-auto flex flex-col relative transition-all duration-300 rounded-[22px]`}>
                    
                    {/* Top Bar Wrapper */}
                <div className="flex items-center justify-between px-5 h-11 shrink-0 w-full">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center group py-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="relative w-14 h-14 transition-transform group-hover:scale-105 duration-300">
                            <Image
                                src="/inyangelogo.png"
                                alt="Inyange Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Right: Desktop Links */}
                    <div className="hidden md:flex h-full items-center">
                        {NAV_ITEMS.map((item, idx) => (
                            <NavLink key={idx} {...item} />
                        ))}
                    </div>

                    {/* Right: Hamburger Menu (Mobile) */}
                    <button 
                        onClick={toggleMobileMenu}
                        className="md:hidden text-[navy] hover:text-[teal] focus:outline-none p-1"
                    >
                        <svg className="w-5 h-5 flex shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 w-full ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5 pt-2 flex flex-col gap-3 border-t border-[navy]/10 mt-2 overflow-y-auto">
                        {NAV_ITEMS.map((item, idx) => (
                            <div key={idx} className="flex flex-col">
                                {item.dropdown ? (
                                    <button 
                                        onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                                        className={`text-left text-xs font-black uppercase tracking-wider py-1 flex justify-between items-center transition-colors ${expandedMobileItem === item.label ? 'text-[teal]' : 'text-[navy] hover:text-[teal]'}`}
                                    >
                                        {item.label}
                                        <svg className={`w-3 h-3 transition-transform ${expandedMobileItem === item.label ? 'rotate-180 text-[teal]' : 'text-[navy]/40'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </button>
                                ) : (
                                    <Link 
                                        href={item.href} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xs font-black uppercase tracking-wider text-[navy] hover:text-[teal] py-1"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                                
                                {item.dropdown && (
                                    <div className={`overflow-hidden transition-all duration-300 ${expandedMobileItem === item.label ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-4 flex flex-col gap-1 border-l-2 border-[navy]/10">
                                            {item.dropdown.map((subItem, subIdx) => (
                                                <Link 
                                                    key={subIdx} 
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    href={subItem.href} 
                                                    className="text-[10px] font-bold uppercase tracking-tight text-[navy]/60 hover:text-[teal] py-1.5 border-b border-[navy]/[0.02] last:border-0"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </nav>
        </>
    );
}
