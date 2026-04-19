"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
    { title: 'Breakfast', link: '/recipes/breakfast', image: '/food/breakfast2.jpg', desc: 'Start your day right' },
    { title: 'Cooking', link: '/recipes/cooking', image: '/food/cooked1.jpg', desc: 'Savoury main meals' },
    { title: 'Baking', link: '/recipes/baking', image: '/food/baked1.jpg', desc: 'Fresh from the oven' },
    { title: 'Desserts', link: '/recipes/desserts', image: '/food/topping2.jpeg', desc: 'Sweet treats & toppings' },
];

const ALL_RECIPES = [
    { id: 10, title: 'Morning Pancakes', image: '/food/breakfast1.jpg', category: 'Breakfast' },
    { id: 1, title: 'Lemon Basil Fish', image: '/food/cooked1.jpg', category: 'Cooking' },
    { id: 4, title: 'Classic Banana Bread', image: '/food/baked1.jpg', category: 'Baking' },
    { id: 8, title: 'Berries Jubilee', image: '/food/topping2.jpeg', category: 'Desserts' },
    { id: 2, title: 'Spicy Grilled Chicken', image: '/food/cooked2.jpg', category: 'Cooking' },
    { id: 11, title: 'Healthy Granola Bowl', image: '/food/breakfast2.jpg', category: 'Breakfast' },
    { id: 5, title: 'Chocolate Chip Muffins', image: '/food/baked2.jpg', category: 'Baking' },
    { id: 7, title: 'Cream Cheese Frosting', image: '/food/topping1.jpg', category: 'Desserts' },
    { id: 3, title: 'Garlic Butter Penne', image: '/food/cooked3.jpg', category: 'Cooking' },
    { id: 12, title: 'Creamy Avocado Toast', image: '/food/breakfast3.jpg', category: 'Breakfast' },
    { id: 6, title: 'Artisan Sourdough', image: '/food/baked3.jpg', category: 'Baking' },
    { id: 9, title: 'Smooth Caramel Drizzle', image: '/food/topping3.jpg', category: 'Desserts' }
];

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
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/cooking.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcfbf7] to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 flex items-center justify-center flex-col px-6 mt-16 md:mt-24 text-center">
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-white/80 mb-3">
                        Inyange Culinary
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-white mb-6 uppercase" style={{ fontFamily: 'var(--font-jost), sans-serif' }}>
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

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-10">
                
                {/* Circle Categories */}
                <div className="mb-20">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8">
                        {CATEGORIES.map(cat => (
                            <Link key={cat.title} href={cat.link} className="group flex flex-col items-center gap-4">
                                <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#f5f3ec] p-2 md:p-3 transition-all duration-300 ring-4 ring-transparent group-hover:ring-[#1668b2] group-hover:shadow-xl">
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </div>
                                <span className="text-sm md:text-base font-bold text-[#0f2e5a] group-hover:text-[#1668b2] transition-colors tracking-wide">{cat.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* All Recipes Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0f2e5a] mb-10">Latest Recipes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {ALL_RECIPES.map((recipe) => (
                            <div key={recipe.id} className="group flex flex-col bg-transparent cursor-pointer">
                                {/* Card Image */}
                                <div className="w-full relative h-[250px] md:h-[280px] rounded-3xl overflow-hidden bg-zinc-200 mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Category pill */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0f2e5a] text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                                        {recipe.category}
                                    </div>
                                </div>
                                {/* Card Details Placeholder */}
                                <div className="px-2">
                                    <h3 className="text-[#0f2e5a] font-bold text-lg mb-1 group-hover:text-[#1668b2] transition-colors">{recipe.title}</h3>
                                    <p className="text-[#0f2e5a]/60 text-xs font-semibold">Ready in 30 mins</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    )
}
