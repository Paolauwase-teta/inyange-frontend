"use client";

import React from 'react';
import Footer from '../components/Footer';

const testimonies = [
    {
        quote: "The quality is always consistent and safe for our children. Inyange milk is part of our daily breakfast.",
        product: "Inyange Milk",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
        clientName: "Aline M.",
        clientRole: "Mother of two • Kigali",
        clientImage: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        quote: "The taste is rich and natural, and the packaging is convenient for our office team.",
        product: "Inyange Yoghurt",
        rating: 5,
        image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=900&q=80",
        clientName: "Eric N.",
        clientRole: "Operations Lead • Musanze",
        clientImage: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
        quote: "We use Inyange water for events because availability and quality are always dependable.",
        product: "Inyange Water",
        rating: 4,
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
        clientName: "Claudine U.",
        clientRole: "Event Coordinator • Huye",
        clientImage: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
        quote: "Our customers keep asking for Inyange juices. The flavor feels authentic and fresh.",
        product: "Inyange Juice",
        rating: 5,
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80",
        clientName: "Jean P.",
        clientRole: "Retail Owner • Rubavu",
        clientImage: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
        quote: "As a retailer, I appreciate the organized distribution. Products arrive on time and in great condition.",
        product: "Mixed Product Supply",
        rating: 4,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        clientName: "Sandrine K.",
        clientRole: "Store Manager • Nyagatare",
        clientImage: "https://randomuser.me/api/portraits/women/48.jpg",
    },
];

export default function TestimonyPage() {
    const marqueeItems = [...testimonies, ...testimonies];

    return (
        <main className="min-h-screen bg-white">
            <section className="pt-32 pb-16 overflow-hidden">
                <div className="max-w-6xl mx-auto px-8 md:px-12">
                    <div className="text-center mb-8 md:mb-12">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1668b2] mb-3">
                            Client Voice
                        </p>

                        <h1 className="uppercase tracking-tight leading-none mb-3 md:mb-4">
                            <span className="text-[54px] md:text-[120px] font-black text-black/75">TES</span>
                            <span className="text-[54px] md:text-[120px] font-black text-[#1668b2]/35">TI</span>
                            <span className="text-[54px] md:text-[120px] font-black text-black/75">MONY</span>
                        </h1>

                        <p className="text-sm md:text-base text-black/55 font-medium max-w-2xl mx-auto">
                            Real customer experiences with Inyange products across Rwanda.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="marquee-track flex gap-5 w-max px-2 md:px-4">
                        {marqueeItems.map((item, idx) => (
                            <article
                                key={`${item.clientName}-${idx}`}
                                className="w-[240px] md:w-[260px] rounded-2xl border border-[#1668b2]/20 bg-white shadow-sm overflow-hidden"
                            >
                                <div className="h-[170px] overflow-hidden">
                                    <img src={item.image} alt={item.clientName} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <span className="inline-block mb-2 text-[9px] font-black uppercase tracking-wider text-[#1668b2] bg-[#00adef]/10 px-2 py-1 rounded-full">
                                        Client Experience
                                    </span>
                                    <div className="flex items-center gap-2 mb-3">
                                        <img
                                            src={item.clientImage}
                                            alt={item.clientName}
                                            className="w-9 h-9 rounded-full object-cover border border-[#1668b2]/20"
                                        />
                                        <div>
                                            <p className="text-[12px] font-black text-black leading-tight">{item.clientName}</p>
                                            <p className="text-[10px] text-black/50 font-semibold leading-tight">{item.clientRole}</p>
                                        </div>
                                    </div>
                                    <p className="text-[12px] font-bold uppercase tracking-wide text-[#1668b2]/70 mb-1">
                                        {item.product}
                                    </p>
                                    <p className="text-[12px] text-black/70 leading-relaxed line-clamp-3 mb-2">
                                        "{item.quote}"
                                    </p>
                                    <p className="text-[11px] text-[#1668b2]">
                                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
                .marquee-track {
                    animation: testimony-marquee 34s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
                @keyframes testimony-marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
            <Footer />
        </main>
    );
}

