'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-16 right-0 w-[320px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-[#1668b2]/10 overflow-hidden flex flex-col"
                        style={{ maxHeight: '500px', height: '60vh' }}
                    >
                        {/* Header */}
                        <div className="bg-[#1668b2] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div className="text-white">
                                    <h3 className="text-sm font-black uppercase tracking-tight leading-none">Inyange Support</h3>
                                    <p className="text-[10px] font-medium text-white/70 mt-1">Direct Help Desk</p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-white/60 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-zinc-50 flex flex-col gap-4">
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-[#1668b2]/5 flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6 text-[#1668b2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-[11px] font-bold text-[#1668b2]/40 uppercase tracking-widest">Typical response time: <span className="text-[#1668b2]">Under 2 mins</span></p>
                            </div>

                            {/* Self Message Mock */}
                            <div className="self-start max-w-[80%] bg-white border border-[#1668b2]/10 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                <p className="text-xs text-[#1668b2]/80 leading-relaxed">
                                    Hello! 👋 Welcome to Inyange Industries Support. How can we help you today?
                                </p>
                                <span className="text-[9px] text-black/30 font-bold uppercase mt-2 block">Inyange Support • Just now</span>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-[#1668b2]/10">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-zinc-100 border-none rounded-xl py-3 px-4 text-xs font-semibold text-[#1668b2] outline-none placeholder:text-[#1668b2]/40 focus:ring-2 focus:ring-[#1668b2]/20 transition-all"
                                />
                                <button className="flex-shrink-0 w-10 h-10 bg-[#00adef] rounded-xl flex items-center justify-center text-white hover:bg-[#1668b2] transition-colors shadow-lg">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-[9px] text-center text-black/20 font-medium mt-3">Powered by Inyange Tech</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className="w-14 h-14 bg-[#00adef] rounded-full shadow-[0_10px_30px_rgba(0,173,239,0.4)] flex items-center justify-center text-white relative z-[201] group border-4 border-white"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="w-7 h-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
                
                {/* Ping animation when closed */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
                )}
            </motion.button>
        </div>
    );
}
