"use client";

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

type Availability = 'High' | 'Medium' | 'Low';

interface Distributor {
    id: number;
    name: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    availability: Availability;
    services: string[];
    hours: string;
}

const DISTRIBUTORS: Distributor[] = [
    { id: 1, name: 'Kigali Central Distributor', city: 'Kigali', address: 'KN 5 Ave, Nyarugenge, Kigali', lat: -1.9441, lng: 30.0619, availability: 'High', services: ['Dairy', 'Juice', 'Water'], hours: '7:30 - 18:00' },
    { id: 2, name: 'Musanze Northern Hub', city: 'Musanze', address: 'RN4, Muhoza, Musanze', lat: -1.4996, lng: 29.6357, availability: 'High', services: ['Dairy', 'Water'], hours: '8:00 - 17:30' },
    { id: 3, name: 'Rubavu Lakeside Depot', city: 'Rubavu', address: 'Avenue de la Paix, Rubavu', lat: -1.6790, lng: 29.2584, availability: 'Medium', services: ['Juice', 'Water'], hours: '8:00 - 17:00' },
    { id: 4, name: 'Huye Southern Partner', city: 'Huye', address: 'Ruhande Rd, Huye', lat: -2.5967, lng: 29.7394, availability: 'High', services: ['Dairy', 'Juice'], hours: '8:00 - 17:00' },
    { id: 5, name: 'Nyagatare East Route', city: 'Nyagatare', address: 'Sun City Road, Nyagatare', lat: -1.2990, lng: 30.3260, availability: 'Low', services: ['Water'], hours: '8:30 - 16:30' },
    { id: 6, name: 'Rusizi Border Outlet', city: 'Rusizi', address: 'Kamembe Center, Rusizi', lat: -2.4846, lng: 28.9075, availability: 'Medium', services: ['Dairy', 'Juice', 'Water'], hours: '8:00 - 17:30' },
];

function availabilityClasses(level: Availability) {
    if (level === 'High') return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (level === 'Medium') return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
}

const DistributorMap = dynamic(() => import('./DistributorMap'), { ssr: false });

export default function DistributorsPage() {
    const [selectedService, setSelectedService] = useState<'All' | 'Dairy' | 'Juice' | 'Water'>('All');
    const [selectedId, setSelectedId] = useState<number>(DISTRIBUTORS[0].id);

    const filtered = useMemo(
        () => DISTRIBUTORS.filter((d) => selectedService === 'All' || d.services.includes(selectedService)),
        [selectedService]
    );

    const selected = filtered.find((d) => d.id === selectedId) || filtered[0];

    useEffect(() => {
        if (!selected) return;
        setSelectedId(selected.id);
    }, [selected?.id]); // keep selected stable after filter changes

    return (
        <main className="min-h-screen bg-[#f7f8fa] pb-10">

            <section className="pt-32 px-8 md:px-12 max-w-6xl mx-auto">
                <div className="mb-4 md:mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#0d55a0]/65 mb-2">Distributor Network</p>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight text-black">Find Inyange distributors across Rwanda</h1>
                </div>

                <div className="rounded-3xl border border-[#0d55a0]/25 bg-white p-3 md:p-4 shadow-[0_20px_50px_rgba(22,104,178,0.08)]">
                    <div className="rounded-2xl border border-black/10 bg-[#f8fbff] p-3 md:p-4 mb-3 md:mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#0d55a0]/80 mb-2">Where</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black/70">Rwanda</span>
                                    <span className="rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black/70">All provinces</span>
                                    <span className="rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black/70">Live map view</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#0d55a0]/80 mb-2">Product Filters</p>
                                <div className="flex flex-wrap gap-2">
                                    {(['All', 'Dairy', 'Juice', 'Water'] as const).map((service) => {
                                        const active = selectedService === service;
                                        return (
                                            <button
                                                key={service}
                                                onClick={() => setSelectedService(service)}
                                                className={`text-[10px] font-black uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${active
                                                    ? 'bg-[#0d55a0] text-white border-[#0d55a0]'
                                                    : 'bg-white text-[#0d55a0] border-[#0d55a0]/25 hover:bg-[#5bb63a]/10'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 md:gap-5">
                        <div className="space-y-3">
                            <div>
                                <p className="text-[13px] font-bold text-black/80 mb-2">We found {filtered.length} distributor points near you</p>
                                <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
                                    {filtered.map((d) => {
                                        const active = selected?.id === d.id;
                                        return (
                                            <div
                                                key={d.id}
                                                className={`rounded-xl border p-3 transition-colors ${active
                                                    ? 'border-[#0d55a0] bg-[#f2f9ff] shadow-sm'
                                                    : 'border-black/10 bg-white hover:border-[#0d55a0]/25'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${availabilityClasses(d.availability)}`}>
                                                        {d.availability} Availability
                                                    </span>
                                                    <span className="text-[10px] text-black/45 font-semibold">{d.hours}</span>
                                                </div>
                                                <h3 className="text-sm font-black text-black leading-tight">{d.name}</h3>
                                                <p className="text-[11px] text-black/55 mb-1.5">{d.address}</p>
                                                <p className="text-[10px] text-[#0d55a0]/80 font-bold">{d.services.join(' • ')}</p>
                                                <button onClick={() => setSelectedId(d.id)} className="mt-2 text-[10px] font-black px-3 py-1.5 rounded-md bg-[#0d55a0] text-white hover:bg-[#0b4a7d] transition-colors">View location</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-black/10 bg-[#f5f7fb] min-h-[640px] relative">
                            {selected && <DistributorMap selected={selected} filtered={filtered} onSelect={setSelectedId} />}

                            {selected && (
                                <div className="absolute left-4 bottom-4 z-[500] w-[320px] rounded-xl border border-[#0d55a0]/20 bg-white/95 backdrop-blur p-3 shadow-lg">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-[#0d55a0] mb-1">Selected distributor</p>
                                    <h4 className="text-sm font-black text-black leading-tight">{selected.name}</h4>
                                    <p className="text-[11px] text-black/60 mt-1">{selected.address}</p>
                                    <p className="text-[11px] text-black/60">{selected.city} • {selected.hours}</p>
                                    <p className="text-[10px] font-bold text-[#0d55a0] mt-1.5">{selected.services.join(' • ')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

