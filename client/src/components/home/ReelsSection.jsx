import React from 'react';
import { Link } from 'react-router-dom';

export default function ReelsSection({ onOpenVideo }) {
  return (
    <section className="mb-32 relative pt-28 pb-4">
      {/* Light Gray Horizontal Band (#C5D0DC) */}
      <div className="bg-[#C5D0DC] rounded-xl px-4 sm:px-8 pt-6 pb-8 min-h-[320px] flex items-center relative overflow-visible shadow-lg">
        
        {/* 4 Staggered Columns matching exact blueprint with continuous ambient floating */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full items-start">
          
          {/* Column 1: Top card flush with gray band top, bottom card hangs below */}
          <div className="flex flex-col gap-3 animate-reel-col-1">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo('Wedding Teaser', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 1" />
            </div>
            <div 
              className="reel-card aspect-[9/13] translate-y-14" 
              onClick={() => onOpenVideo('Dream Car Reel', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 2" />
            </div>
          </div>

          {/* Column 2: Peaks HIGH — top card rises ~96px above gray band */}
          <div className="flex flex-col gap-3 -translate-y-24 animate-reel-col-2">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo('Street Pacing Edit', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 3" />
            </div>
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo('Commercial Audio', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 4" />
            </div>
          </div>

          {/* Column 3: Flush with gray band top, bottom card hangs below */}
          <div className="flex flex-col gap-3 animate-reel-col-3">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo('Cyberpunk Grade', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 5" />
            </div>
            <div 
              className="reel-card aspect-[9/13] translate-y-14" 
              onClick={() => onOpenVideo('Nature Doc', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 6" />
            </div>
          </div>

          {/* Column 4: Peaks moderately (-translate-y-14) */}
          <div className="flex flex-col gap-3 -translate-y-14 animate-reel-col-4">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo('Energy Commercial', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 7" />
            </div>
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo('Fashion Model', 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Reel 8" />
            </div>
          </div>

        </div>

        {/* EXPLORE MORE BUTTON: Links to /portfolio page with glowing hover micro-interaction */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 z-30">
          <Link 
            to="/portfolio" 
            className="group relative bg-[#C5D0DC] hover:bg-[#a8b8c9] text-black font-semibold text-xs sm:text-sm px-8 py-2.5 rounded-full border border-black/15 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(197,208,220,0.4)] flex items-center space-x-2"
          >
            <span>Explore more</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
