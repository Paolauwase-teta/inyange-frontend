'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [activeBrand, setActiveBrand] = useState('Milk Products');

  const brandCategories = ['Milk', 'Milk Products', 'Juice', 'Water'];

  const recipeCards = [
    { title: 'Classic Banana Bread', desc: 'Perfectly moist homemade treat', img: '/recipe_bread.webp' },
    { title: 'French Onion Soup', desc: 'Delicious classic comfort', img: '/recipe_soup.webp' },
    { title: 'Lemon Basil Fish', desc: 'Fresh and zesty grilled fillet', img: '/recipe_fish.webp' },
    { title: 'Chicken Corn Chowder', desc: 'Creamy and hearty delight', img: '/recipe_chowder.webp' },
  ];

  const newsCards = [
    { title: 'Sustainable Farming: Our Commitment to the Future', desc: 'Inyange remains at the forefront of agricultural innovation, supporting local farmers with modern techniques.', img: '/photo-1500382017468-9049fed747ef.webp' },
    { title: 'Awarded Best Beverage Producer of the Year', desc: 'We are honored to receive the 2023 Excellence Award for our consistent quality and safety standards.', img: '/photo-1550989460-0adf9ea622e2.webp' },
    { title: 'New Fortified Milk Range: Nutrition Redefined', desc: 'Introducing our latest product line designed to meet the growing nutritional needs of the East African market.', img: '/photo-1550583724-b2692b85b150.webp' },
    { title: 'Community Outreach: Supporting Local Schools', desc: 'Our recent initiative provided nutritional dairy products to school children across Rwanda villages.', img: '/photo-1488521787991-ed7bbaae773c.webp' },
  ];

  const leaders = [
    { name: 'John Doe', img: '/headshot-portrait-security-guard-work-smiling.jpg', bg: 'bg-[#F4A261]' },
    { name: 'Jane Doe', img: '/african-teenage-girl-portrait-happy-smiling-face.jpg', bg: 'bg-[#F48498]' },
    { name: 'Jane Doe', img: '/confident-business-woman-portrait-smiling-face.jpg', bg: 'bg-[#9D88B3]' },
    { name: 'John Doe', img: '/black-man-posing.jpg', bg: 'bg-[#3D8C8C]' },
  ];

  return (
    <main className="w-full font-calibre overflow-x-hidden flex flex-col items-center">
      
      {/* --- 3. Hero Section --- */}
      <section className="relative w-full h-[100vh] min-h-[800px] flex items-end justify-center overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
           <Image src="/freepik__enhance__29647.jpg" alt="Football, Friends, and Inyange" fill className="object-cover object-center" priority />
           <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Falling Chips Particle Animation Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
             <div 
               key={i} 
               className="absolute animate-fall"
               style={{ 
                 left: `${Math.random() * 100}%`, 
                 animationDuration: `${10 + Math.random() * 15}s`,
                 animationDelay: `-${Math.random() * 10}s`,
                 width: '40px', height: '40px',
                 backgroundColor: '#F4D414',
                 clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle chip shape
                 opacity: 0.8
               }}
             />
          ))}
        </div>

        {/* Foreground Product Shot */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 z-20 w-[90vw] md:w-[800px] h-[300px] md:h-[400px] pointer-events-none">
           {/* Fallback to Products.jpeg or generic transparent overlay if this image has a background. Using wqety.jpg as placeholder if Products doesn't work well */}
           <Image src="/021.png" alt="Foreground Products" fill className="object-contain object-bottom drop-shadow-2xl" />
        </div>

        {/* Headline */}
        <div className="relative z-30 w-full max-w-7xl px-8 md:px-12 pb-32 md:pb-48">
          <h1 className="font-voyager text-5xl md:text-7xl lg:text-[110px] leading-[0.85] text-white tracking-wide uppercase drop-shadow-lg">
            FOOTBALL,<br/>
            FRIENDS, AND<br/>
            INYANGE
          </h1>
        </div>
      </section>

      {/* --- 4. Our Brand Range Section --- */}
      <section className="w-full py-24 md:py-32 relative flex flex-col items-center">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-repeat bg-[length:20px]"
          style={{ backgroundImage: "url('/pattern.png')" }}
        />
        {/* Background Color Overlay */}
        <div className="absolute inset-0 z-0 bg-[#F6F5F2] opacity-90 mix-blend-multiply" />

        {/* Decorative Fruits (Left and Right) spanning the section boundary */}
        <div className="absolute left-[-5%] bottom-[-150px] md:bottom-[-200px] w-[200px] md:w-[350px] h-[350px] md:h-[500px] z-30 pointer-events-none">
          <Image src="/apples.png" alt="Apples" fill className="object-contain object-bottom mix-blend-multiply" />
        </div>
        <div className="absolute right-[-5%] bottom-[-100px] md:bottom-[-150px] w-[250px] md:w-[400px] h-[250px] md:h-[400px] z-30 pointer-events-none">
          <Image src="/orange.png" alt="Orange" fill className="object-contain object-bottom mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl w-full px-8 flex flex-col items-center text-center">
          <h2 className="font-voyager text-5xl md:text-6xl text-[var(--inyange-blue)] mb-3 tracking-wide uppercase">OUR BRAND RANGE</h2>
          <p className="text-[#5B6B7A] text-sm md:text-base font-medium max-w-lg mb-12 leading-snug">
            Experience Rwanda&apos;s pure essence through our premium selection of dairy, juices, and essential hydration.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-20 bg-white/50 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-black/5">
            {brandCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveBrand(cat)}
                className={`px-6 py-2 rounded-full font-gill text-sm md:text-base font-bold tracking-widest transition-all duration-300
                  ${activeBrand === cat 
                    ? 'bg-[var(--inyange-lime)] text-[var(--inyange-blue)] shadow-md' 
                    : 'bg-transparent text-[var(--inyange-blue)] hover:bg-white/60'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Carousel */}
          <div className="relative w-full max-w-6xl h-[450px] md:h-[600px] flex items-center justify-center">

             {/* Left Nav Arrow */}
             <button className="absolute left-[5%] md:left-[15%] z-30 w-10 h-10 bg-[var(--inyange-blue)] rounded-full text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
             </button>

             {/* Left Item (Desaturated & Scaled Down) */}
             <div className="absolute left-[15%] md:left-[22%] w-[120px] md:w-[180px] h-[300px] md:h-[400px] z-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex justify-center items-center">
               <div className="relative w-full h-full">
                 <Image src="/milk1.png" alt="Milk Left" fill className="object-contain" />
                 {/* Faint icon badge */}
                 <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-black/20 flex items-center justify-center bg-white/20 backdrop-blur-sm opacity-50">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                 </div>
               </div>
             </div>

             {/* Center Item (Focus) */}
             <div className="relative z-20 w-[220px] md:w-[320px] h-[400px] md:h-[550px]">
               {/* Soft blue glow */}
               <div className="absolute inset-0 bg-[#00AEEF]/20 blur-[80px] rounded-full scale-125 translate-y-10" />
               <Image src="/Low fat milk.png" alt="Whole Milk Center" fill className="object-contain drop-shadow-2xl" priority />
               {/* Faint icon badge */}
               <div className="absolute top-10 right-4 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center bg-white/40 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform cursor-pointer">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </div>
             </div>

             {/* Right Item (Desaturated & Scaled Down) */}
             <div className="absolute right-[15%] md:right-[22%] w-[120px] md:w-[180px] h-[300px] md:h-[400px] z-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex justify-center items-center">
               <div className="relative w-full h-full">
                 <Image src="/Low fat milk.png" alt="Mango Juice Right" fill className="object-contain" />
                 {/* Faint icon badge */}
                 <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-black/20 flex items-center justify-center bg-white/20 backdrop-blur-sm opacity-50">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                 </div>
               </div>
             </div>

             {/* Right Nav Arrow */}
             <button className="absolute right-[5%] md:right-[15%] z-30 w-10 h-10 bg-[var(--inyange-blue)] rounded-full text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
             </button>
          </div>
        </div>
      </section>

      {/* --- 5. Our Picks Section --- */}
      <section className="w-full bg-[#EAE8E1] pt-12 pb-32 relative flex flex-col items-center border-t border-black/5">
        <div className="relative z-10 max-w-7xl w-full px-4 md:px-8 flex flex-col items-center text-center mt-20">
          <h2 className="font-voyager text-5xl md:text-6xl text-[var(--inyange-blue)] mb-3 tracking-wide uppercase">OUR PICKS</h2>
          <p className="text-[#5B6B7A] text-sm md:text-base font-medium max-w-lg mb-16 leading-snug">
            Signature recipes crafted to elevate your everyday meals.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {[
              { title: 'Classic Banana Bread', desc: 'Perfectly moist homemade treat', img: '/recipe_bread.png' },
              { title: 'French Onion Soup', desc: 'Delicious classic comfort', img: '/recipe_soup.png' },
              { title: 'Lemon Basil Fish', desc: 'Fresh and zesty grilled fillet', img: '/recipe_fish.png' },
              { title: 'Chicken Corn Chowder', desc: 'Creamy and hearty delight', img: '/recipe_chowder.png' },
            ].map((card, idx) => (
              <div key={idx} className="flex flex-col items-center">
                 {/* Card Container */}
                 <div className="bg-white rounded-[2rem] p-4 pb-12 w-full flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300 relative border border-black/5">
                   {/* Food Image */}
                   <div className="relative w-full aspect-square rounded-full overflow-hidden p-2">
                     <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner">
                       <Image src={card.img} alt={card.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                     </div>
                   </div>
                   
                   {/* Floating Title Pill */}
                   <div className="absolute bottom-[-15px] bg-[var(--inyange-blue)] text-white px-5 py-2.5 rounded-full shadow-lg whitespace-nowrap border-2 border-[#EAE8E1]">
                     <span className="font-calibre text-[11px] md:text-xs font-bold tracking-widest uppercase text-center leading-none">{card.title}</span>
                   </div>
                 </div>
                 
                 {/* Description below card */}
                 <p className="text-[#5B6B7A] text-xs font-medium mt-8 max-w-[80%]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. Milk Brand Banner --- */}
      <section className="w-full bg-[#006BA6] relative overflow-hidden flex flex-col items-center pt-10 min-h-[400px] md:min-h-[500px]">
        {/* Splash Graphic (Background Layer) */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] z-0 opacity-100 pointer-events-none mix-blend-lighten">
          <Image src="/decorations/decosplash.png" alt="Milk Splash" fill className="object-contain" />
        </div>
        
        {/* Woman Photo (Foreground Layer) */}
        <div className="relative z-10 w-full max-w-2xl h-[350px] md:h-[450px] mt-auto">
          {/* We use quality1.png or a generic placeholder since the exact image name isn't clear, but let's try milk1.png or just assume they have one named correctly. The user said 'images are in the public folder search there' */}
          <Image src="/Inyange_Industry.jpg" alt="Woman drinking milk" fill className="object-contain object-bottom drop-shadow-2xl" />
        </div>
      </section>

      {/* Ticker 1 */}
      <div className="w-full bg-[#00AEEF] overflow-hidden py-4 border-y border-white/20">
        <div className="flex w-[200%] animate-marquee">
           <span className="font-gothic text-3xl md:text-4xl lg:text-[40px] text-[var(--inyange-yellow)] whitespace-nowrap tracking-tight uppercase flex-1">
             TRUSTED BY PEOPLE WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;TRUSTED BY PEOPLE WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;TRUSTED BY PEOPLE WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;TRUSTED BY PEOPLE WORLDWIDE
           </span>
        </div>
      </div>

      {/* --- 7. The Pride of Rwanda's Beverage Industry --- */}
      <section className="w-full">
        {/* Ticker 2 (Sticky/Repeating) */}
        <div className="w-full bg-[#00AEEF] overflow-hidden py-4 border-b border-white/20">
          <div className="flex w-[200%] animate-marquee" style={{ animationDirection: 'reverse' }}>
             <span className="font-gothic text-3xl md:text-4xl lg:text-[40px] text-[var(--inyange-yellow)] whitespace-nowrap tracking-tight uppercase flex-1">
               TRUSTED BY PEOPLE WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;TRUSTED BY PEOPLE WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;TRUSTED BY PEOPLE WORLDWIDE&nbsp;&nbsp;&nbsp;&nbsp;TRUSTED BY PEOPLE WORLDWIDE
             </span>
          </div>
        </div>

        {/* Lime Section */}
        <div className="w-full bg-[var(--inyange-lime)] py-24 md:py-32 relative overflow-hidden">
          {/* Decorative mango cutout */}
          <div className="absolute bottom-[-10px] left-[-40px] w-[200px] h-[200px] z-0 opacity-90 pointer-events-none">
            <Image src="/quality2.jpg" alt="Mango" fill className="object-contain mix-blend-multiply rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
             <div className="lg:w-1/2">
                <h2 className="font-voyager text-5xl md:text-[70px] leading-[0.9] text-white uppercase tracking-wide mb-8 drop-shadow-md">
                  THE PRIDE<br/>
                  OF RWANDA&apos;S<br/>
                  BEVERAGE INDUSTRY
                </h2>
                <p className="text-[#1B3629] text-base md:text-lg font-medium leading-relaxed max-w-md">
                  Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products under its household brand name&mdash;&quot;Inyange&quot;. Known for high-quality mineral water, fruit juices, and dairy products, we have become the regional standard for modern and hygienic production.
                </p>
             </div>
             
             <div className="lg:w-1/2 relative flex justify-center">
                {/* Hand drawn swoosh behind */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 text-[var(--inyange-blue)] opacity-40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 100 Q50 20 100 100 T190 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Mother and son image */}
                <div className="relative z-10 w-full max-w-[500px] aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
                   <Image src="/wqety.jpg" alt="Mother and son drinking milk" fill className="object-cover" />
                </div>
             </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="w-full bg-white py-24 px-8 md:px-12">
           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
             <div className="bg-[var(--inyange-card-cream)] rounded-[2rem] p-10 md:p-14 border border-[var(--inyange-blue)]/10 shadow-lg shadow-black/5 relative overflow-hidden group">
                <div className="w-16 h-16 text-[var(--inyange-blue)] mb-6 opacity-80 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h3 className="font-gill font-bold text-3xl text-[var(--inyange-blue)] uppercase tracking-wide mb-4">VISION</h3>
                <p className="text-[var(--inyange-blue)] font-medium text-lg leading-relaxed">
                  To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value.
                </p>
             </div>
             
             <div className="bg-[var(--inyange-card-cream)] rounded-[2rem] p-10 md:p-14 border border-[var(--inyange-blue)]/10 shadow-lg shadow-black/5 relative overflow-hidden group">
                <div className="w-16 h-16 text-[var(--inyange-blue)] mb-6 opacity-80 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <h3 className="font-gill font-bold text-3xl text-[var(--inyange-blue)] uppercase tracking-wide mb-4">MISSION</h3>
                <p className="text-[var(--inyange-blue)] font-medium text-lg leading-relaxed">
                  To secure the highest value for all stakeholders while enriching lives through nutritious and tasty dairy and beverage choices.
                </p>
             </div>
           </div>

           {/* Visionary Leaders */}
           <div className="max-w-7xl mx-auto flex flex-col items-center relative">
              <h2 className="font-voyager text-5xl md:text-6xl text-[var(--inyange-blue)] uppercase tracking-wide mb-6">VISIONARY LEADERS</h2>
              <p className="text-[var(--inyange-gray)] text-center text-lg md:text-xl font-medium max-w-3xl mb-16">
                Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products under its household brand name&mdash;&quot;Inyange&quot;. Known for high-quality mineral water, fruit juices, and dairy products, we have become the regional standard for modern and hygienic production.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl z-10">
                {leaders.map((leader, i) => (
                  <div key={i} className="flex flex-col items-center group cursor-pointer">
                    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${leader.bg} mb-4 relative overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300`}>
                       {/* Note: Placeholder Stock Headshots */}
                       <Image src={leader.img} alt={leader.name} fill className="object-cover" />
                    </div>
                    <span className="font-calibre font-semibold text-lg text-[var(--inyange-blue)]">{leader.name}</span>
                  </div>
                ))}
              </div>

              {/* Decorative passion fruit cutout */}
              <div className="absolute bottom-[-150px] right-[-50px] w-[300px] h-[300px] z-0 opacity-90 pointer-events-none">
                <Image src="/quality3.jpg" alt="Passion fruit" fill className="object-contain mix-blend-multiply rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* --- 8. From Our Newsroom Section --- */}
      <section className="w-full bg-[#00AEEF] py-24 md:py-32 relative overflow-hidden flex flex-col items-center">
        {/* Decorative passion fruit peek from top right */}
        <div className="absolute top-[-50px] right-[20px] w-[150px] h-[150px] z-0 opacity-90 pointer-events-none">
           <Image src="/quality3.jpg" alt="Passion fruit" fill className="object-contain mix-blend-multiply rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-12 w-full flex flex-col items-center z-10">
          <h2 className="font-voyager text-5xl md:text-6xl text-[var(--inyange-yellow)] uppercase tracking-wide mb-16 drop-shadow-md">FROM OUR NEWSROOM</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {newsCards.map((news, idx) => (
              <div key={idx} className="bg-white rounded-[1.5rem] flex flex-col overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="relative w-full aspect-square">
                  <Image src={news.img} alt={news.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <h3 className="font-calibre font-bold text-xl leading-tight text-[var(--inyange-blue)] mb-3">{news.title}</h3>
                  <p className="font-calibre font-medium text-[var(--inyange-gray)] text-[15px] leading-relaxed">{news.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 9. Want to Get in Touch CTA Section --- */}
      <section className="w-full bg-[#F9FAFB] py-24 md:py-32 flex flex-col items-center relative z-20">
         <div className="max-w-3xl mx-auto px-8 text-center flex flex-col items-center">
            <h2 className="font-voyager text-5xl md:text-6xl text-[var(--inyange-blue)] leading-[0.9] uppercase tracking-wide mb-6">
              WANT TO GET<br/>IN TOUCH?
            </h2>
            <p className="font-calibre text-lg md:text-xl font-medium text-[#5B6B7A] max-w-2xl mb-12">
              Whether you&apos;re a customer, a potential partner, or looking for a career, we&apos;re here to listen and grow together. Reach out to our dedicated support teams today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link href="/reach-out" className="bg-[var(--inyange-lime)] text-[var(--inyange-blue)] px-10 py-4 rounded-full font-gill font-bold text-sm uppercase tracking-widest hover:bg-[var(--inyange-yellow)] transition-colors shadow-lg">
                 CONTACT US NOW
               </Link>
               <Link href="/about/careers" className="bg-transparent border-2 border-[var(--inyange-blue)] text-[var(--inyange-blue)] px-10 py-4 rounded-full font-gill font-bold text-sm uppercase tracking-widest hover:bg-[var(--inyange-blue)] hover:text-white transition-colors">
                 JOIN US NOW
               </Link>
            </div>
         </div>
      </section>

    </main>
  );
}
