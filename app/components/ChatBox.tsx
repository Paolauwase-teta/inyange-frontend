'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    role: 'USER' | 'ASSISTANT';
    content: string;
    timestamp: Date;
}

export default function ChatBox() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    if (pathname.startsWith('/admin')) {
        return null;
    }
    const [activeTab, setActiveTab] = useState<'ASSISTANT' | 'FAQS'>('ASSISTANT');
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: 'ASSISTANT',
            content: "Hello! I'm Inyange, your wellness assistant. How can I help you today?",
            timestamp: new Date()
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = {
            id: Date.now(),
            role: 'USER',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate Bot Response
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                role: 'ASSISTANT',
                content: getBotResponse(text),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (input: string): string => {
        const lower = input.toLowerCase();
        if (lower.includes('milk')) return "Our Inyange Fresh Milk is sourced directly from local farmers and processed within hours to ensure maximum freshness! Would you like to know where to find it?";
        if (lower.includes('order')) return "I can help check your order status. Please provide your order number, or I can connect you with a representative.";
        if (lower.includes('deal') || lower.includes('offer')) return "We have a special 15% discount on all bulk yogurt orders this week! Check our 'Deals' section for more.";
        if (lower.includes('opening') || lower.includes('hours')) return "Our main outlets are open from 8:00 AM to 9:00 PM daily. Our online store is open 24/7!";
        if (lower.includes('hello') || lower.includes('hi')) return "Hi there! I'm here to answer any questions about Inyange products and services.";
        return "That's an interesting question! Let me check that for you, or would you like to speak with a human agent specialized in that area?";
    };

    const QUICK_ACTIONS = [
        "What are today's deals?",
        "Where is my order?",
        "Do you have fresh milk?",
        "Wholesale inquiries"
    ];

    const FAQS = [
        { q: "How do I become a distributor?", a: "You can apply through our Distributors page or contact us directly at sales@inyange.com." },
        { q: "Where can I find Inyange products?", a: "Our products are available in all major supermarkets and retail outlets across the region." },
        { q: "What is the shelf life of your milk?", a: "Our UHT milk stays fresh for up to 6 months when stored in a cool, dry place." }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="absolute bottom-16 right-0 w-[320px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-zinc-100 overflow-hidden flex flex-col"
                        style={{ height: '520px', maxHeight: '80vh' }}
                    >
                        {/* HEADER */}
                        <div className="p-5 pb-3 flex items-center justify-between bg-white border-b border-zinc-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#e6eff6] flex items-center justify-center text-[#0d55a0] font-black text-base border-2 border-white shadow-sm shrink-0">
                                    IA
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[14px] font-black text-black leading-tight">Inyange Assistant</h3>
                                    <div className="flex items-center gap-1.5 pt-0.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-[#0d55a0] animate-bounce' : 'bg-emerald-500 animate-pulse'}`} />
                                        <span className={`text-[9px] font-bold uppercase tracking-wider ${isTyping ? 'text-[#0d55a0]' : 'text-emerald-500'}`}>
                                            {isTyping ? 'Typing...' : 'Ready to help'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="p-1.5 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>

                        {/* NAV TABS */}
                        <div className="px-5 flex border-b border-zinc-50 bg-white">
                            {['FAQS', 'ASSISTANT'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`flex-1 py-2.5 text-[9px] font-black tracking-[0.2em] uppercase transition-all relative ${activeTab === tab ? 'text-[#0d55a0]' : 'text-zinc-300'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d55a0]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* CONTENT AREA */}
                        <div className="flex-1 overflow-y-auto p-5 bg-[#fafafa]">
                            <AnimatePresence mode="wait">
                                {activeTab === 'ASSISTANT' ? (
                                    <motion.div
                                        key="assistant"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex flex-col gap-3">
                                            {/* MESSAGES LIST */}
                                            {messages.map((msg) => (
                                                <div 
                                                    key={msg.id} 
                                                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm border ${msg.role === 'ASSISTANT' ? 'self-start bg-white rounded-tl-none border-zinc-100' : 'self-end bg-[#0d55a0] text-white rounded-tr-none border-[#0d55a0]'}`}
                                                >
                                                    <p className={`text-[12px] font-medium leading-relaxed ${msg.role === 'ASSISTANT' ? 'text-zinc-600' : 'text-white'}`}>
                                                        {msg.content}
                                                    </p>
                                                </div>
                                            ))}

                                            {/* TYPING INDICATOR */}
                                            {isTyping && (
                                                <div className="self-start bg-white p-3 px-5 rounded-full shadow-sm border border-zinc-100 flex gap-1 items-center">
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            )}

                                            <div ref={messagesEndRef} />

                                            {/* QUICK ACTION CHIPS */}
                                            {messages.length < 3 && !isTyping && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {QUICK_ACTIONS.map((action) => (
                                                        <button 
                                                            key={action}
                                                            className="px-3.5 py-2.5 bg-white border border-zinc-100 rounded-xl text-[10px] font-bold text-zinc-700 shadow-sm hover:border-[#0d55a0] hover:text-[#0d55a0] transition-all text-left"
                                                            onClick={() => handleSend(action)}
                                                        >
                                                            {action}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="faqs"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-3"
                                    >
                                        {FAQS.map((faq, i) => (
                                            <div key={i} className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                                                <h4 className="text-[11px] font-black text-black uppercase tracking-tight mb-1.5">{faq.q}</h4>
                                                <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">{faq.a}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* INPUT AREA */}
                        <div className="p-5 bg-white border-t border-zinc-50">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                                className="relative flex items-center gap-2.5"
                            >
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full bg-[#f8f8f8] border-none rounded-xl py-3 px-5 text-[11px] font-semibold text-black placeholder:text-zinc-400 focus:ring-2 focus:ring-[#0d55a0]/10 transition-all outline-none"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="w-10 h-10 rounded-full bg-[#f8f8f8] flex items-center justify-center text-zinc-300 hover:bg-[#0d55a0] hover:text-white transition-all shadow-sm disabled:opacity-50"
                                >
                                    <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOGGLE BUTTON */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className={`w-14 h-14 rounded-full shadow-[0_15px_40px_rgba(13,85,160,0.25)] flex items-center justify-center text-white relative z-[201] transition-colors border-4 border-white ${isOpen ? 'bg-black' : 'bg-[#0d55a0]'}`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            className="w-7 h-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
