"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAsset } from '@/lib/getAsset';

const CATEGORIES = [
    { title: 'Breakfast', link: '/recipes/breakfast', image: getAsset('/breakfast2.jpg'), desc: 'Start your day right' },
    { title: 'Cooking', link: '/recipes/cooking', image: getAsset('/cooked1.jpg'), desc: 'Savoury main meals' },
    { title: 'Baking', link: '/recipes/baking', image: getAsset('/baked1.jpg'), desc: 'Fresh from the oven' },
    { title: 'Desserts', link: '/recipes/desserts', image: getAsset('/topping2.jpeg'), desc: 'Sweet treats & toppings' },
];

const ALL_RECIPES = [
    { id: 10, title: 'Morning Pancakes', image: getAsset('/breakfast1.jpg'), category: 'Breakfast' },
    { id: 1, title: 'Lemon Basil Fish', image: getAsset('/cooked1.jpg'), category: 'Cooking' },
    { id: 4, title: 'Classic Banana Bread', image: getAsset('/baked1.jpg'), category: 'Baking' },
    { id: 8, title: 'Berries Jubilee', image: getAsset('/topping2.jpeg'), category: 'Desserts' },
    { id: 2, title: 'Spicy Grilled Chicken', image: getAsset('/cooked2.jpg'), category: 'Cooking' },
    { id: 11, title: 'Healthy Granola Bowl', image: getAsset('/breakfast2.jpg'), category: 'Breakfast' },
    { id: 5, title: 'Chocolate Chip Muffins', image: getAsset('/baked2.jpg'), category: 'Baking' },
    { id: 7, title: 'Cream Cheese Frosting', image: getAsset('/topping1.jpg'), category: 'Desserts' },
    { id: 3, title: 'Garlic Butter Penne', image: getAsset('/cooked3.jpg'), category: 'Cooking' },
    { id: 12, title: 'Creamy Avocado Toast', image: getAsset('/breakfast3.jpg'), category: 'Breakfast' },
    { id: 6, title: 'Artisan Sourdough', image: getAsset('/baked3.jpg'), category: 'Baking' },
    { id: 9, title: 'Smooth Caramel Drizzle', image: getAsset('/topping3.jpg'), category: 'Desserts' }
];

const SectionHeader = ({ label, title, light = false }: { label: string; title: string; light?: boolean }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-1.5">
            <span className={`text-[7px] font-black uppercase tracking-[0.3em] ${light ? 'text-white/60' : 'text-[#0d55a0] opacity-40'} whitespace-nowrap`}>{label}</span>
        </div>
        <h2 className={`text-xl md:text-3xl font-black uppercase tracking-tighter leading-none ${light ? 'text-white' : 'text-[#0d55a0]'}`}>
            {title}
        </h2>
    </div>
);

export default function RecipesOverviewPage() {
    return (
        <main className="min-h-screen bg-[#fcfbf7] font-sans pb-24">
            {/* Banner Section with Video */}
            <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={getAsset("/breakfast1.jpg")}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={getAsset("/cooking.mp4")} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcfbf7] to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center flex-col px-6 mt-16 md:mt-24 text-center">
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-white/80 mb-3">
                        Inyange Culinary
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-white mb-6 uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>
                        All Recipes
                    </h1>
                    <div className="max-w-2xl mx-auto">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search all recipes..."
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full py-4 px-8 shadow-2xl outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/60"
                            />
                            <button className="absolute right-6 flex items-center justify-center text-white hover:text-[#00adef] transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-6.65a8 8 0 11-16 0 8 8 0 0116 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-10">
                
                {/* Circle Categories */}
                <div className="mb-20">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8">
                        {CATEGORIES.map(cat => (
                            <Link key={cat.title} href={cat.link} className="group flex flex-col items-center gap-4">
                                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#f5f3ec] p-2 md:p-3 transition-all duration-300 ring-4 ring-transparent group-hover:ring-[#0d55a0] group-hover:shadow-xl">
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </div>
                                <span className="text-xs md:text-sm font-bold text-[#0d55a0] group-hover:text-[#0d55a0] transition-colors tracking-wide">{cat.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* All Recipes Grid */}
                <div className="mb-8">
                    <SectionHeader label="Culinary Collection" title="Latest Recipes" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-8">
                        {ALL_RECIPES.map((recipe) => (
                            <div key={recipe.id} className="group flex flex-col bg-transparent cursor-pointer">
                                {/* Card Image */}
                                <div className="w-full relative h-[200px] rounded-2xl overflow-hidden bg-zinc-200 mb-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Category pill */}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0d55a0] text-[8px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                                        {recipe.category}
                                    </div>
                                </div>
                                {/* Card Details Placeholder */}
                                <div className="px-1">
                                    <h3 className="text-[#0d55a0] font-bold text-sm mb-0.5 group-hover:text-[#0d55a0] transition-colors line-clamp-1">{recipe.title}</h3>
                                    <p className="text-[#0d55a0]/60 text-[9px] font-semibold tracking-tight">Ready in 30 mins</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    )
}
