"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // We wait for the entire page to load (including videos and images)
        const handleLoad = () => {
            // Slight delay to ensure the branding is seen for a premium feel
            setTimeout(() => {
                setIsVisible(false);
            }, 1200);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Safety fallback: Hide after 4 seconds regardless of load state
        const fallback = setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(fallback);
        };
    }, []);

    // Prevent scrolling while loader is active
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
                >
                    {/* Background Subtle Pattern */}
                    <div 
                        className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03] bg-repeat bg-[length:400px]"
                        style={{ backgroundImage: "url('/pattern.png')" }}
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo with pulsing effect */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                                scale: [0.8, 1, 0.95, 1],
                                opacity: 1
                            }}
                            transition={{
                                scale: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                opacity: { duration: 0.5 }
                            }}
                            className="relative w-32 h-32 md:w-48 md:h-48 mb-8"
                        >
                            <Image
                                src="/inyangelogo.png"
                                alt="Inyange industries Loading"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Animated Loading Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0d55a0]/40">
                                Premium Quality
                            </span>
                            <div className="w-48 h-[2px] bg-zinc-100 rounded-full overflow-hidden relative">
                                <motion.div 
                                    className="absolute inset-y-0 left-0 bg-[#0d55a0]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ 
                                        duration: 3,
                                        ease: "easeInOut",
                                        repeat: Infinity
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Accreditation/Safety Marks Placeholder (subtle) */}
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 opacity-20 grayscale">
                         {/* We can put small icons here if needed later */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
