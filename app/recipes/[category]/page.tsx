"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function RecipeCategoryPage() {
    const params = useParams();
    const category = typeof params?.category === 'string' ? params.category : 'recipes';
    
    // Format "baking-and-topping" to "BAKING AND TOPPING"
    const title = category.replace(/-/g, ' ').toUpperCase();

    // Mock recipes for the layout
    const MOCK_RECIPES_BY_CATEGORY: Record<string, { id: number, title: string, image: string }[]> = {
        'cooking': [
            { id: 1, title: 'Lemon Basil Fish', image: '/cooked1.jpg' },
            { id: 2, title: 'Spicy Grilled Chicken', image: '/cooked2.jpg' },
            { id: 3, title: 'Garlic Butter Penne', image: '/cooked3.jpg' }
        ],
        'baking': [
            { id: 4, title: 'Classic Banana Bread', image: '/baked1.jpg' },
            { id: 5, title: 'Chocolate Chip Muffins', image: '/baked2.jpg' },
            { id: 6, title: 'Artisan Sourdough', image: '/baked3.jpg' }
        ],
        'desserts': [
            { id: 7, title: 'Cream Cheese Frosting', image: '/topping1.jpg' },
            { id: 8, title: 'Berries Jubilee', image: '/topping2.jpeg' },
            { id: 9, title: 'Smooth Caramel Drizzle', image: '/topping3.jpg' }
        ],
        'breakfast': [
            { id: 10, title: 'Morning Pancakes', image: '/breakfast1.jpg' },
            { id: 11, title: 'Healthy Granola Bowl', image: '/breakfast2.jpg' },
            { id: 12, title: 'Creamy Avocado Toast', image: '/breakfast3.jpg' }
        ]
    };

    const currentRecipes = MOCK_RECIPES_BY_CATEGORY[category] || MOCK_RECIPES_BY_CATEGORY['cooking'];
    const videoSrc = category === 'baking' ? '/bread.mp4' : '/cooking.mp4';

    return (
        <main className="min-h-screen bg-[#fcfbf7] font-sans pb-24">
            {/* Banner Section with Video */}
            <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
                <video
                    key={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/cooked1.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                {/* Subtle fade overlay to blend into the background color */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcfbf7] to-transparent pointer-events-none" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 -mt-10 md:-mt-16 w-full max-w-7xl mx-auto px-6">
                
                {/* Page Title */}
                <h1 className="text-center text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-[#0d55a0] mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {title}
                </h1>

                {/* Search Bar Container */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-[#f1f0fa] border border-[#c3c1e3] text-[#0d55a0] text-sm md:text-base rounded-full py-3.5 md:py-4 px-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] outline-none focus:ring-2 focus:ring-[#0d55a0]/30 transition-all placeholder:text-[#0d55a0]/50"
                        />
                        <button className="absolute right-6 flex items-center justify-center text-[#0d55a0] hover:text-[#5bb63a] transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-6.65a8 8 0 11-16 0 8 8 0 0116 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Filters and Sorting Row */}
                <div className="max-w-4xl mx-auto mt-12 mb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-semibold text-[#0d55a0]">
                    
                    {/* Left: Filter */}
                    <button className="flex items-center gap-2 hover:text-[#0d55a0] transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Filter
                    </button>

                    {/* Center: Results Count */}
                    <span className="text-[#0d55a0]/60 text-xs font-bold tracking-wide">
                        {currentRecipes.length} results
                    </span>

                    {/* Right: Sort By */}
                    <div className="flex items-center gap-1 font-medium">
                        <span className="text-[#0d55a0]/60">Sort by:</span>
                        <select className="bg-transparent font-bold text-[#0d55a0] outline-none cursor-pointer hover:text-[#0d55a0] transition-colors appearance-none">
                            <option>Popular Recipes</option>
                            <option>Newest</option>
                            <option>Alphabetical</option>
                        </select>
                    </div>

                </div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {currentRecipes.map((recipe) => (
                        <div key={recipe.id} className="group flex flex-col bg-transparent cursor-pointer">
                            {/* Card Image */}
                            <div className="w-full relative h-[250px] md:h-[280px] rounded-3xl overflow-hidden bg-zinc-200 mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                                <Image
                                    src={recipe.image}
                                    alt={recipe.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {/* Card Details Placeholder */}
                            <div className="px-2">
                                <h3 className="text-[#0d55a0] font-bold text-lg mb-1 group-hover:text-[#0d55a0] transition-colors">{recipe.title}</h3>
                                <p className="text-[#0d55a0]/60 text-xs font-semibold">Ready in 30 mins</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
