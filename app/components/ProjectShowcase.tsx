'use client';

import React, { useState, useEffect } from 'react';

interface ProjectIconProps {
    label: string;
    icon: React.ReactNode;
}

function ProjectIcon({ label, icon }: ProjectIconProps) {
    return (
        <div className="flex flex-col items-center gap-1.5 group cursor-default">
            <div className="w-9 h-9 rounded-lg bg-[#00adef]/10 border border-[#1668b2]/20 flex items-center justify-center text-[#1668b2]/80 group-hover:bg-[#1668b2] group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#1668b2]/60 group-hover:text-[#1668b2] transition-colors">{label}</span>
        </div>
    );
}

// --- LOCAL UI ASSETS --- //
// In our backend, we only store the metadata (title, subtitle, description, tag)
// The rich, animated 3D mockups and SVG icons are strictly frontend UI concerns.
// We map them by the project ID.

const UI_ASSETS: Record<string, { icons: { label: string, svg: React.ReactNode }[], mockup: React.ReactNode }> = {
    '01': {
        icons: [
            { label: 'Packaging', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg> },
            { label: 'Quality', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg> },
            { label: 'Nutrition', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg> },
        ],
        mockup: (
            <div className="relative w-[260px] h-[300px] bg-[#eaf7ff] rounded-[26px] border border-[#1668b2]/25 shadow-2xl rotate-y-[-18deg] rotate-x-[8deg] rotate-z-[4deg] group-hover:rotate-y-[-10deg] transition-all duration-700">
                <div className="absolute inset-0 rounded-[26px] overflow-hidden p-4 font-sans text-left">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-8 h-1 bg-[#1668b2]/20 rounded-full" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#1668b2]">Milk</span>
                    </div>
                    <h4 className="text-sm font-black mb-0.5 text-[#1668b2]">Premium Dairy</h4>
                    <p className="text-[7px] text-[#1668b2]/60 font-bold uppercase tracking-tight mb-3">3D Product Showcase</p>
                    <div className="h-40 rounded-xl bg-white border border-[#1668b2]/10 flex items-end justify-center gap-2 p-3">
                        <div className="w-10 h-24 rounded-t-lg bg-[#00adef]/30 border border-[#1668b2]/20" />
                        <div className="w-12 h-28 rounded-t-lg bg-[#1668b2]/25 border border-[#1668b2]/30" />
                        <div className="w-9 h-20 rounded-t-lg bg-[#00adef]/25 border border-[#1668b2]/20" />
                    </div>
                    <div className="mt-3 p-2 bg-[#1668b2] text-white rounded-lg flex items-center gap-1.5">
                        <span className="text-[7px] font-bold">High Calcium</span>
                        <span className="text-[7px] font-black ml-auto">Family Pack</span>
                    </div>
                </div>
            </div>
        )
    },
    '02': {
        icons: [
            { label: 'Bottling', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 2h6" /><path d="M10 2v4l-3 4v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10l-3-4V2" /></svg> },
            { label: 'Purity', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12Z" /></svg> },
            { label: 'Distribution', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> },
        ],
        mockup: (
            <div className="relative w-[260px] h-[300px] bg-[#eef8ff] rounded-[26px] border border-[#1668b2]/25 shadow-2xl rotate-y-[-18deg] rotate-x-[8deg] rotate-z-[4deg] group-hover:rotate-y-[-10deg] transition-all duration-700">
                <div className="absolute inset-0 rounded-[26px] overflow-hidden p-4 font-sans text-left">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-8 h-1 bg-[#1668b2]/20 rounded-full" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#1668b2]">Water</span>
                    </div>
                    <h4 className="text-sm font-black mb-0.5 text-[#1668b2]">Mineral Water</h4>
                    <p className="text-[7px] text-[#1668b2]/60 font-bold uppercase tracking-tight mb-3">3D Product Showcase</p>
                    <div className="h-40 rounded-xl bg-white border border-[#1668b2]/10 flex items-end justify-center gap-2 p-3">
                        <div className="w-8 h-28 rounded-full bg-[#00adef]/30 border border-[#1668b2]/20" />
                        <div className="w-9 h-32 rounded-full bg-[#1668b2]/25 border border-[#1668b2]/30" />
                        <div className="w-8 h-24 rounded-full bg-[#00adef]/25 border border-[#1668b2]/20" />
                    </div>
                    <div className="mt-3 flex justify-between gap-2">
                        {[1, 2, 3].map(i => <div key={i} className={`h-5 rounded-md flex-1 ${i === 2 ? 'bg-[#1668b2]' : 'bg-[#00adef]/20'}`} />)}
                    </div>
                </div>
            </div>
        )
    },
    '03': {
        icons: [
            { label: 'Flavor', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-12V4l-8-2-8 2v6c0 8 8 12 8 12z" /></svg> },
            { label: 'Freshness', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3v18" /><path d="M5 10c0-4 3-7 7-7s7 3 7 7-3 7-7 7-7-3-7-7z" /></svg> },
            { label: 'Shelf Ready', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M9 3v18" /></svg> },
        ],
        mockup: (
            <div className="relative w-[260px] h-[300px] bg-[#eef8ff] rounded-[26px] border border-[#1668b2]/25 shadow-2xl rotate-y-[18deg] rotate-x-[8deg] rotate-z-[-4deg] group-hover:rotate-y-[10deg] transition-all duration-700">
                <div className="absolute inset-0 rounded-[26px] overflow-hidden p-4 font-sans text-left">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-8 h-1 bg-[#1668b2]/20 rounded-full" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#1668b2]">Juice</span>
                    </div>
                    <h4 className="text-sm font-black mb-0.5 text-[#1668b2]">Fruit Juices</h4>
                    <p className="text-[7px] text-[#1668b2]/60 font-bold uppercase tracking-tight mb-3">3D Product Showcase</p>
                    <div className="h-40 rounded-xl bg-white border border-[#1668b2]/10 flex items-end justify-center gap-2 p-3">
                        <div className="w-10 h-24 rounded-md bg-[#00adef]/20 border border-[#1668b2]/20" />
                        <div className="w-10 h-28 rounded-md bg-[#1668b2]/25 border border-[#1668b2]/30" />
                        <div className="w-10 h-24 rounded-md bg-[#00adef]/25 border border-[#1668b2]/20" />
                    </div>
                    <div className="mt-3 h-8 flex items-center justify-center bg-[#00adef]/10 border border-[#1668b2]/10 rounded-lg">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#1668b2]/45" />
                            <div className="w-2 h-2 rounded-full bg-[#1668b2]/45" />
                            <div className="w-2 h-2 rounded-full bg-[#1668b2]/45" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

interface ProjectData {
    id: string;
    title: string;
    accent: string;
    subtitle: string;
    tag: string;
    description: string;
    mirrored: boolean;
    icons: string[];
}

export default function ProjectShowcase() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (projects.length === 0) return;
        const timer = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIdx, projects.length]);

    const handleNext = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIdx((prev) => (prev + 1) % projects.length);
            setIsAnimating(false);
        }, 500);
    };

    if (loading) {
        return (
            <div className="relative min-h-[500px] flex items-center justify-center py-12 md:py-20 text-zinc-400 font-medium">
                Loading featured products...
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="relative min-h-[500px] flex items-center justify-center py-12 md:py-20 text-zinc-400 font-medium">
                No featured products right now.
            </div>
        );
    }

    const project = projects[currentIdx];
    // Fallback UI if id not in our local dict
    const ui = UI_ASSETS[project.id] || {
        icons: [],
        mockup: <div className="w-44 h-[360px] bg-zinc-100 flex items-center justify-center text-xs text-black/50">Missing Mockup</div>
    };

    return (
        <div className="bg-white overflow-hidden">
            {/* ── SECTION HEADER ── */}
            <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-4 border-t border-black/[0.03]">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1668b2]">Featured Products</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6 text-[#1668b2]/25">
                        3D <span className="text-[#1668b2]">Product</span> Showcase.
                    </h2>
                </div>
            </div>

            {/* ── CAROUSEL CONTAINER ── */}
            <div className="relative min-h-[500px] flex items-center py-12 md:py-20">
                <div className={`w-full max-w-4xl mx-auto px-8 flex flex-col items-center gap-12 md:gap-20 transition-all duration-700 ease-out ${isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'} ${project.mirrored ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                    {/* Mockup Container */}
                    <div className={`relative w-full md:w-1/2 flex justify-center perspective-1000 scale-90 md:scale-95 group transition-all duration-1000 delay-100 ${isAnimating ? (project.mirrored ? '-rotate-y-12' : 'rotate-y-12') : 'rotate-y-0'}`}>
                        {ui.mockup}

                        {/* Background Polish */}
                        <div className={`absolute -top-10 w-24 h-24 bg-[#00adef]/10 border border-[#1668b2]/20 rounded-2xl -z-10 ${project.mirrored ? '-right-10 -rotate-12' : '-left-10 rotate-12'}`} />
                        <div className={`absolute -bottom-10 w-20 h-20 bg-[#1668b2]/10 rounded-full -z-10 blur-xl ${project.mirrored ? '-left-10' : '-right-10'}`} />
                    </div>

                    {/* Content Container */}
                    <div className={`w-full md:w-1/2 text-left ${project.mirrored ? 'md:pl-0 md:pr-10' : ''}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[#1668b2]/35 font-bold text-sm tracking-tight">{project.id} /</span>
                            <span className="text-[#1668b2] font-black uppercase tracking-widest text-[9px]">{project.tag}</span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4 leading-none">
                            {project.title} <span className="text-[#1668b2]/25">{project.accent}</span>
                        </h3>

                        <p className="text-black/60 text-sm md:text-base leading-relaxed mb-8 font-medium max-w-md">
                            {project.description}
                        </p>

                        {/* Technical Icons */}
                        <div className="flex gap-8 mb-10">
                            {ui.icons.map((icon, i) => (
                                <ProjectIcon key={i} label={icon.label} icon={icon.svg} />
                            ))}
                        </div>

                        {/* Pagination Indicators */}
                        <div className="flex items-center gap-3">
                            {projects.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrentIdx(i); setIsAnimating(false); }, 500); }}
                                    className={`h-1 rounded-full transition-all duration-500 ${currentIdx === i ? 'w-12 bg-[#1668b2]' : 'w-4 bg-[#1668b2]/20 hover:bg-[#1668b2]/40'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-\\[-25deg\\] { transform: rotateX(10deg) rotateY(-25deg) rotateZ(5deg); }
        .rotate-y-\\[25deg\\] { transform: rotateX(10deg) rotateY(25deg) rotateZ(-5deg); }
      `}</style>
        </div>
    );
}
