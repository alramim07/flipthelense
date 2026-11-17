import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { useSiteSettings } from '../../context/SettingsContext';

// Helper to render platform badge / logo
function PlatformBadge({ platform }) {
  const p = (platform || 'youtube').toLowerCase();
  if (p === 'instagram') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-md">
        IG Reel
      </span>
    );
  }
  if (p === 'tiktok') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/90 text-[#00f2fe] border border-[#fe0979]/50 shadow-md">
        TikTok
      </span>
    );
  }
  if (p === 'facebook') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#1877F2] text-white shadow-md">
        Facebook
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FF0000] text-white shadow-md">
      YouTube
    </span>
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
