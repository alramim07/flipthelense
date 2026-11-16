import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function HeroSection() {
  const [isGigVideoPlaying, setIsGigVideoPlaying] = useState(false);

  return (
    <section id="hero" className="mb-5 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Title: 7 cols */}
        <div className="md:col-span-7 space-y-3 pt-1">
          <div className="inline-flex items-center space-x-2 text-neutral-400 text-xs sm:text-sm tracking-normal">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
            <span>Cinematography. Video Editing. Visual Storytelling</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] hero-title text-white">
            Crafting<br />
            Stories Through<br />
            Cinematic Videos.
          </h1>
        </div>

        {/* Right Video Container: Landscape 16:9 box aligned top-right */}
        <div className="md:col-span-5 flex justify-end pt-1">
          <div 
            className="relative bg-[#C5D0DC] rounded-xl overflow-hidden w-full aspect-[16/9] shadow-md group cursor-pointer transition-all duration-500 hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)] hover:-translate-y-1"
            onClick={() => setIsGigVideoPlaying(!isGigVideoPlaying)}
          >
            {!isGigVideoPlaying ? (
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80" 
                  alt="Gig Video Preview" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" 
                />
                {/* Central Play Glow Button on Hover */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-lg transform group-hover:scale-115 transition-all duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            )}

            <div className="absolute top-2.5 right-2.5 z-10">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsGigVideoPlaying(!isGigVideoPlaying); }} 
                className="bg-black/70 hover:bg-black text-[#F59E0B] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center space-x-1 transition shadow-md hover:scale-105"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isGigVideoPlaying ? 'Hide Video' : 'View Video'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
