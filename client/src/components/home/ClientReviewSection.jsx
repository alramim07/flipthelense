import React, { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import { useSiteSettings } from '../../context/SettingsContext';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    username: '@tanvir_cinematics',
    rating: 5,
    text: "Working with Parvej was an absolute game changer for our brand commercial. His pacing, color science, and sound design brought the video to life far beyond our expectations. Delivery was super fast and communication was top tier!",
    project: "Commercial Video Campaign"
  },
  {
    id: 2,
    username: '@samira_weddings',
    rating: 5,
    text: "The cinematic wedding film Pollob edited for us made everyone in our family tear up! The emotional build-up, seamless transitions, and song choice were 10/10 perfection. I couldn't recommend his video editing skills enough.",
    project: "Cinematic Wedding Film"
  },
  {
    id: 3,
    username: '@lifestyle_creators',
    rating: 5,
    text: "Our Instagram Reels and YouTube Shorts retention increased by over 300% after Parvej took over our editing workflows. His speed ramps and sound effects are unmatched in this industry. Truly an elite video editor!",
    project: "Viral Reels & Shorts Series"
  },
  {
    id: 4,
    username: '@bengal_documentaries',
    rating: 5,
    text: "Exceptional storytelling capabilities! He turned over 12 hours of raw nature and cultural footage into an engaging 15-minute documentary that won awards at our local film fest. Highly reliable and creative.",
    project: "Cultural Documentary Film"
  }
];

export default function ClientReviewSection() {
  const { settings } = useSiteSettings();
  const reviewsConfig = settings?.homeContent?.reviews;

  const reviewList = reviewsConfig?.items?.length > 0 ? reviewsConfig.items : DEFAULT_REVIEWS;
  const badgeText = reviewsConfig?.badge || 'TESTIMONIAL';
  const title1 = reviewsConfig?.titleLine1 || 'Client Reviews';
  const title2 = reviewsConfig?.titleLine2 || 'What They Say';
  const autoInterval = reviewsConfig?.autoplayInterval || 3800;

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-switch carousel
  useEffect(() => {
    if (!reviewList || reviewList.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewList.length);
    }, autoInterval);

    return () => clearInterval(timer);
  }, [reviewList.length, autoInterval]);

  const total = reviewList.length;

  const getCardStyle = (index) => {
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      // CENTER ACTIVE FRONT SPOTLIGHT
      return {
        transform: 'translateX(0px) scale(1) translateZ(0px)',
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px)',
        background: 'linear-gradient(180deg, #222222 0%, #1A1A1A 60%, #141414 100%)',
        color: '#F4F4F4',
        borderColor: 'rgba(255, 227, 121, 0.45)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 227, 121, 0.12)',
        pointerEvents: 'auto',
        transition: 'transform 850ms cubic-bezier(0.25, 1, 0.5, 1) 180ms, background 700ms ease 180ms, opacity 700ms ease 180ms, filter 700ms ease 180ms, border-color 600ms ease',
      };
    } else if (diff === 1) {
      // RIGHT WAITING CARD (Entering Next)
      return {
        transform: 'translateX(265px) scale(0.88) translateZ(-40px)',
        zIndex: 10,
        opacity: 0.65,
        filter: 'blur(1.8px)',
        background: '#161616',
        color: '#878787',
        borderColor: '#232323',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
        pointerEvents: 'auto',
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1) 80ms, background 600ms ease, opacity 600ms ease, filter 600ms ease, border-color 600ms ease',
      };
    } else if (diff === total - 1) {
      // LEFT OUTGOING CARD (Just stepped down from center)
      return {
        transform: 'translateX(-265px) scale(0.88) translateZ(-40px)',
        zIndex: 10,
        opacity: 0.65,
        filter: 'blur(1.8px)',
        background: '#161616',
        color: '#878787',
        borderColor: '#232323',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
        pointerEvents: 'auto',
        transition: 'transform 750ms cubic-bezier(0.25, 1, 0.5, 1) 0ms, background 600ms ease, opacity 600ms ease, filter 600ms ease, border-color 600ms ease',
      };
    } else {
      // HIDDEN IN DEEP BACKGROUND
      return {
        transform: 'translateX(0px) scale(0.7) translateZ(-100px)',
        zIndex: 0,
        opacity: 0,
        filter: 'blur(5px)',
        background: '#141414',
        color: '#878787',
        borderColor: 'transparent',
        pointerEvents: 'none',
        transition: 'transform 700ms ease, opacity 500ms ease',
      };
    }
  };

  return (
    <section id="reviews-section" className="mb-24 pt-6">
      {/* Container Frame with exact Brand Dark Gradient & Golden Aura */}
      <div className="relative w-full rounded-3xl py-14 px-4 sm:px-8 overflow-hidden shadow-2xl border border-[#232323] bg-gradient-to-b from-[#181818] via-[#141414] to-[#101010]">
        
        {/* Floating Ambient Brand Golden Spheres / Orbs */}
        <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-[#FFE379]/8 blur-3xl pointer-events-none hidden md:block" />
        <div className="absolute bottom-12 right-12 w-52 h-52 rounded-full bg-[#FFE379]/10 blur-3xl pointer-events-none hidden md:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FFE379]/5 blur-[100px] pointer-events-none" />

        {/* Section Heading with Brand Typography */}
        <div className="relative z-10 text-center max-w-md mx-auto mb-12 select-none">
          <span 
            className="text-xs uppercase tracking-[4.5px] text-[#FFE379] font-medium block mb-1"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {badgeText}
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-extrabold text-[#F4F4F4] uppercase tracking-normal"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {title1}
          </h2>
          <div 
            className="text-3xl sm:text-4xl -mt-2 text-[#FFE379] tracking-wide transform -rotate-2 opacity-90"
            style={{ fontFamily: "'Great Vibes', 'Caveat', cursive", fontWeight: 400 }}
          >
            {title2}
          </div>
        </div>

        {/* 3D Circular Deck Carousel */}
        <div className="relative z-10 max-w-4xl mx-auto h-[410px] flex items-center justify-center [perspective:1000px]">
          
          {reviewList.map((review, index) => {
            const isCenter = (index - activeIndex + total) % total === 0;
            const style = getCardStyle(index);

            return (
              <div
                key={review.id || index}
                onClick={() => setActiveIndex(index)}
                style={style}
                className="absolute w-[300px] sm:w-[350px] h-[375px] rounded-[28px] p-6 shadow-2xl flex flex-col justify-between border cursor-pointer overflow-hidden select-none"
              >
                {/* Card Top: Quote icon + User Avatar + Stars */}
                <div className="flex items-start justify-between">
                  <span className={`text-5xl font-serif font-black leading-none transition-colors duration-500 ${isCenter ? 'text-[#FFE379]/60' : 'text-neutral-700'}`}>
                    “
                  </span>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors duration-500 ${isCenter ? 'bg-[#FFE379]/15 border border-[#FFE379]/40 text-[#FFE379]' : 'bg-[#232323] text-neutral-500'}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-semibold tracking-wide transition-colors duration-500 ${isCenter ? 'text-[#F4F4F4]' : 'text-neutral-400'}`}>
                        {review.username}
                      </span>
                    </div>

                    {/* 5 Stars in Brand Golden Yellow */}
                    <div className="flex items-center space-x-0.5 mt-1.5">
                      {[...Array(Number(review.rating) || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFE379] text-[#FFE379]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real Testimonial Text */}
                <div className="relative my-auto py-2">
                  <div className={`absolute right-0 bottom-0 text-7xl font-serif font-black pointer-events-none select-none transition-opacity duration-500 ${isCenter ? 'text-white/[0.05]' : 'text-neutral-900/[0.05]'}`}>
                    ”
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed font-normal tracking-wide relative z-10 transition-colors duration-500 ${isCenter ? 'text-[#F4F4F4]' : 'text-neutral-500'}`} style={{ fontFamily: "'Raleway', sans-serif" }}>
                    {review.text}
                  </p>
                </div>

                {/* Card Bottom: Project Tag (Cleaned from social buttons) */}
                <div className={`pt-3 border-t flex items-center justify-end transition-colors duration-500 ${isCenter ? 'border-[#2e2e2e]' : 'border-[#232323]'}`}>
                  <span className={`text-[10px] font-mono tracking-tight uppercase transition-colors duration-500 ${isCenter ? 'text-[#FFE379]' : 'text-neutral-600'}`}>
                    {review.project}
                  </span>
                </div>

              </div>
            );
          })}

        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center space-x-2 mt-4 relative z-20">
          {reviewList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-7 bg-[#FFE379] shadow-[0_0_10px_rgba(255,227,121,0.5)]' 
                  : 'w-2 bg-[#2a2a2a] hover:bg-neutral-600'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
