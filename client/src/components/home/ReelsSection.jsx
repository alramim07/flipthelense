import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { useSiteSettings } from '../../context/SettingsContext';

// Helper to render platform icon (No text name, with Pinterest support)
function PlatformBadge({ platform }) {
  const p = (platform || 'youtube').toLowerCase();

  // 1. Instagram
  if (p === 'instagram') {
    return (
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md border border-white/20"
        title="Instagram Reel"
      >
        <svg className="w-3.5 h-3.5 text-white fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </div>
    );
  }

  // 2. TikTok
  if (p === 'tiktok') {
    return (
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center bg-black/95 border border-[#25F4EE]/50 shadow-md"
        title="TikTok"
      >
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.35 0 .69.06 1 .18V8.9a6.37 6.37 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.06a8.16 8.16 0 0 0 4.76 1.52v-3.45a4.85 4.85 0 0 1-1-.44z"/>
        </svg>
      </div>
    );
  }

  // 3. Facebook
  if (p === 'facebook') {
    return (
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1877F2] shadow-md border border-white/20"
        title="Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    );
  }

  // 4. Pinterest
  if (p === 'pinterest') {
    return (
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E60023] shadow-md border border-white/20"
        title="Pinterest"
      >
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.52-.11-1.32.02-1.89l.86-3.64s-.22-.44-.22-1.09c0-1.02.59-1.78 1.33-1.78.63 0 .93.47.93 1.04 0 .63-.4 1.58-.61 2.45-.17.74.37 1.34 1.1 1.34 1.32 0 2.34-1.39 2.34-3.4 0-1.78-1.28-3.02-3.1-3.02-2.27 0-3.6 1.7-3.6 3.46 0 .69.26 1.42.59 1.82a.24.24 0 0 1 .06.23c-.06.26-.2.82-.23.94-.04.16-.14.2-.32.12-1.19-.55-1.93-2.28-1.93-3.67 0-2.98 2.17-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.22.84-.81 1.89-1.21 2.53A12 12 0 1 0 12 0z"/>
        </svg>
      </div>
    );
  }

  // 5. Default: YouTube
  return (
    <div 
      className="w-6 h-6 rounded-full flex items-center justify-center bg-[#FF0000] shadow-md border border-white/20"
      title="YouTube"
    >
      <svg className="w-3.5 h-3.5 fill-white ml-0.5" viewBox="0 0 24 24">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 22c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 2c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
      </svg>
    </div>
  );
}

// Single Reel Card with Viral Engagement overlay
function ReelCard({ reel, onOpenVideo, extraClass = '' }) {
  return (
    <div 
      className={`reel-card group relative aspect-[9/13] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.03] ${extraClass}`}
      onClick={() => onOpenVideo(reel.title, reel.url || 'https://www.youtube.com/embed/ScMzIvxBSi4')}
    >
      {/* Background Cover Image */}
      <img 
        src={reel.img} 
        alt={reel.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40 group-hover:from-black/95 transition-all duration-300" />

      {/* Top Bar: Platform Badge & Centered Play Glow */}
      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
        <PlatformBadge platform={reel.platform} />
        {reel.views && (
          <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
            <Eye className="w-2.5 h-2.5 text-[#FFE379]" />
            <span>{reel.views}</span>
          </span>
        )}
      </div>

      {/* Play Icon in center on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <div className="w-11 h-11 rounded-full bg-[#FFE379] text-[#101010] flex items-center justify-center shadow-[0_0_20px_rgba(255,227,121,0.6)] transform scale-75 group-hover:scale-100 transition-transform">
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Information: Title & Viral Stats (Likes, Comments, Shares) */}
      <div className="absolute bottom-2.5 inset-x-2.5 z-10 space-y-1.5">
        <h4 
          className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#FFE379] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {reel.title}
        </h4>

        {/* Viral Engagement Metrics Bar */}
        {(reel.likes || reel.comments || reel.shares) && (
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-neutral-300 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl border border-white/10">
            {reel.likes && (
              <span className="flex items-center space-x-0.5" title="Likes">
                <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                <span>{reel.likes}</span>
              </span>
            )}
            {reel.comments && (
              <span className="flex items-center space-x-0.5" title="Comments">
                <MessageCircle className="w-2.5 h-2.5 text-sky-400" />
                <span>{reel.comments}</span>
              </span>
            )}
            {reel.shares && (
              <span className="flex items-center space-x-0.5" title="Shares">
                <Share2 className="w-2.5 h-2.5 text-[#FFE379]" />
                <span>{reel.shares}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReelsSection({ onOpenVideo }) {
  const { settings } = useSiteSettings();
  const reels = settings.homeContent?.reels || [];

  const getReel = (idx, fallbackTitle, fallbackImg, platform = 'youtube', views = '1.2M', likes = '95K', comments = '1.2K', shares = '15K') => {
    return reels[idx] || {
      title: fallbackTitle,
      url: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      img: fallbackImg,
      platform,
      views,
      likes,
      comments,
      shares
    };
  };

  const r1 = getReel(0, 'Wedding Teaser', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', 'youtube', '1.2M', '95K', '1.4K', '18K');
  const r2 = getReel(1, 'Dream Car Reel', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', 'instagram', '850K', '72K', '980', '12K');
  const r3 = getReel(2, 'Street Pacing Edit', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', 'tiktok', '2.4M', '180K', '3.1K', '42K');
  const r4 = getReel(3, 'Commercial Audio', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', 'facebook', '450K', '38K', '620', '8.5K');
  const r5 = getReel(4, 'Cyberpunk Grade', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', 'youtube', '980K', '84K', '1.2K', '16K');
  const r6 = getReel(5, 'Nature Doc', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80', 'instagram', '620K', '54K', '850', '9.2K');
  const r7 = getReel(6, 'Energy Commercial', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', 'tiktok', '1.8M', '142K', '2.8K', '31K');
  const r8 = getReel(7, 'Fashion Model', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', 'facebook', '510K', '42K', '590', '7.8K');

  return (
    <section className="mb-32 relative pt-28 pb-4">
      {/* Light Gray Horizontal Band (#C5D0DC) */}
      <div className="bg-[#C5D0DC] rounded-xl px-4 sm:px-8 pt-6 pb-8 min-h-[320px] flex items-center relative overflow-visible shadow-lg">
        
        {/* 4 Staggered Columns matching exact blueprint with continuous ambient floating */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full items-start">
          
          {/* Column 1: Top card flush with gray band top, bottom card hangs below */}
          <div className="flex flex-col gap-3 animate-reel-col-1">
            <ReelCard reel={r1} onOpenVideo={onOpenVideo} />
            <ReelCard reel={r2} onOpenVideo={onOpenVideo} extraClass="translate-y-14" />
          </div>

          {/* Column 2: Peaks HIGH — top card rises ~96px above gray band */}
          <div className="flex flex-col gap-3 -translate-y-24 animate-reel-col-2">
            <ReelCard reel={r3} onOpenVideo={onOpenVideo} />
            <ReelCard reel={r4} onOpenVideo={onOpenVideo} />
          </div>

          {/* Column 3: Flush with gray band top, bottom card hangs below */}
          <div className="flex flex-col gap-3 animate-reel-col-3">
            <ReelCard reel={r5} onOpenVideo={onOpenVideo} />
            <ReelCard reel={r6} onOpenVideo={onOpenVideo} extraClass="translate-y-14" />
          </div>

          {/* Column 4: Peaks moderately (-translate-y-14) */}
          <div className="flex flex-col gap-3 -translate-y-14 animate-reel-col-4">
            <ReelCard reel={r7} onOpenVideo={onOpenVideo} />
            <ReelCard reel={r8} onOpenVideo={onOpenVideo} />
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
