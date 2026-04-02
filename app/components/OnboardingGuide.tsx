"use client";

import React, { useState, useEffect } from 'react';

const steps = [
    {
        title: "Welcome to Inyange",
        description: "Inyange is a proudly Rwandan brand that has grown into a trusted household name in dairy, juice, and bottled water.",
        video: "/TourVideo.MOV"
    },
    {
        title: "Our Journey Since 1997",
        description: "The Inyange brand began in 1997, expanding from milk and yoghurt into wider beverage lines to serve families across Rwanda.",
        video: "/TourVideo.MOV"
    },
    {
        title: "Built on Quality",
        description: "From raw material sourcing to final delivery, quality and hygiene standards are maintained at every stage of production.",
        video: "/TourVideo.MOV"
    },
    {
        title: "Serving Rwanda and Beyond",
        description: "With modern production capacity and a growing distribution network, Inyange continues to reach more communities every year.",
        video: "/TourVideo.MOV"
    },
    {
        title: "Our Promise",
        description: "Nutritious, tasty, and reliable products for everyday life. Thank you for visiting the Inyange Industry Portfolio.",
        video: "/TourVideo.MOV"
    }
];

export default function OnboardingGuide() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Restart video when step changes
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    }, [currentStep]);

    useEffect(() => {
        // Check for cookie
        const hasSeenGuide = document.cookie.split('; ').find(row => row.startsWith('has_seen_guide='));
        if (!hasSeenGuide) {
            // Delay it slightly for impact
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        // Set cookie for 30 days
        const date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `has_seen_guide=true; expires=${date.toUTCString()}; path=/`;
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-500 animate-in fade-in">
            <div className="bg-white w-full max-w-[600px] rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden transition-all duration-300 scale-in-center border border-[#1668b2]/15">

                {/* Header: Progress Indicator */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex justify-between items-center text-xs font-black text-[#1668b2]/50 uppercase tracking-widest">
                        <span>Inyange Story</span>
                        <span>{currentStep + 1} / {steps.length}</span>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div className="flex gap-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-[#1668b2]' : 'bg-gray-100'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content: Main Body */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10 transition-all duration-300">
                    {/* Visual Container */}
                    <div className="w-full md:w-[45%] aspect-[4/3] bg-[#1668b2] rounded-[2rem] flex items-center justify-center relative group overflow-hidden border border-[#1668b2]/20 flex-shrink-0">
                        <video
                            ref={videoRef}
                            src={steps[currentStep].video}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        {/* Play Button Icon Overlay (Visible on Hover Only) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                <svg className="w-6 h-6 ml-1 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-left">
                        <h2 className="text-2xl font-black text-[#1668b2] tracking-tight leading-tight">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-sm text-black/65 font-medium leading-relaxed">
                            {steps[currentStep].description}
                        </p>
                    </div>
                </div>

                {/* Footer: Navigation Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex-1 py-4 px-8 rounded-2xl font-black uppercase text-xs transition-all flex items-center justify-center gap-2 ${currentStep === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-[#1668b2] hover:bg-[#00adef]/10'}`}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex-[1.5] py-4 px-8 rounded-2xl bg-[#1668b2] text-white font-black uppercase text-xs hover:bg-[#0b4a7d] transition-all flex items-center justify-center gap-2 shadow-[0_15px_35px_-10px_rgba(22,104,178,0.35)] active:scale-95"
                    >
                        {currentStep === steps.length - 1 ? "Enter Inyange →" : "Next →"}
                    </button>
                </div>

                {/* Close Button - Subtle Corner */}
                <button
                    onClick={handleComplete}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/50 backdrop-blur-sm rounded-full text-[#1668b2]/50 hover:text-[#1668b2] hover:bg-[#00adef]/10 transition-colors"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
        .scale-in-center {
          animation: scale-in-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
        @keyframes scale-in-center {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
        </div>
    );
}
