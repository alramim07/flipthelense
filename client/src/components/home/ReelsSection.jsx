import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../context/SettingsContext';

export default function ReelsSection({ onOpenVideo }) {
  const { settings } = useSiteSettings();
  const reels = settings.homeContent?.reels || [];

  const getReel = (idx, fallbackTitle, fallbackImg) => {
    return reels[idx] || {
      title: fallbackTitle,
      url: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      img: fallbackImg
    };
  };

  const r1 = getReel(0, 'Wedding Teaser', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80');
  const r2 = getReel(1, 'Dream Car Reel', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80');
  const r3 = getReel(2, 'Street Pacing Edit', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80');
  const r4 = getReel(3, 'Commercial Audio', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80');
  const r5 = getReel(4, 'Cyberpunk Grade', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80');
  const r6 = getReel(5, 'Nature Doc', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80');
  const r7 = getReel(6, 'Energy Commercial', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80');
  const r8 = getReel(7, 'Fashion Model', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80');

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
              onClick={() => onOpenVideo(r1.title, r1.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r1.img} className="w-full h-full object-cover" alt={r1.title} />
            </div>
            <div 
              className="reel-card aspect-[9/13] translate-y-14" 
              onClick={() => onOpenVideo(r2.title, r2.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r2.img} className="w-full h-full object-cover" alt={r2.title} />
            </div>
          </div>

          {/* Column 2: Peaks HIGH — top card rises ~96px above gray band */}
          <div className="flex flex-col gap-3 -translate-y-24 animate-reel-col-2">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo(r3.title, r3.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r3.img} className="w-full h-full object-cover" alt={r3.title} />
            </div>
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo(r4.title, r4.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r4.img} className="w-full h-full object-cover" alt={r4.title} />
            </div>
          </div>

          {/* Column 3: Flush with gray band top, bottom card hangs below */}
          <div className="flex flex-col gap-3 animate-reel-col-3">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo(r5.title, r5.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r5.img} className="w-full h-full object-cover" alt={r5.title} />
            </div>
            <div 
              className="reel-card aspect-[9/13] translate-y-14" 
              onClick={() => onOpenVideo(r6.title, r6.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r6.img} className="w-full h-full object-cover" alt={r6.title} />
            </div>
          </div>

          {/* Column 4: Peaks moderately (-translate-y-14) */}
          <div className="flex flex-col gap-3 -translate-y-14 animate-reel-col-4">
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo(r7.title, r7.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r7.img} className="w-full h-full object-cover" alt={r7.title} />
            </div>
            <div 
              className="reel-card aspect-[9/13]" 
              onClick={() => onOpenVideo(r8.title, r8.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
            >
              <img src={r8.img} className="w-full h-full object-cover" alt={r8.title} />
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
