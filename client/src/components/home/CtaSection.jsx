import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../../context/SettingsContext';

export const CTA_BUTTON_STYLES = {
  'sharp-gold': {
    id: 'sharp-gold',
    name: 'Sharp Luxury Gold (Current)',
    className: 'bg-[#FFE379] hover:bg-[#ebd074] text-[#101010] font-black rounded-none shadow-[0_10px_35px_rgba(255,227,121,0.3)] hover:shadow-[0_15px_40px_rgba(255,227,121,0.5)] border-0'
  },
  'rounded-gold': {
    id: 'rounded-gold',
    name: 'Rounded Smooth Gold',
    className: 'bg-[#FFE379] hover:bg-[#ebd074] text-[#101010] font-black rounded-xl shadow-[0_10px_30px_rgba(255,227,121,0.35)] hover:shadow-[0_15px_40px_rgba(255,227,121,0.5)] border border-amber-300/40'
  },
  'pill-gold': {
    id: 'pill-gold',
    name: 'Pill Curvature Gold',
    className: 'bg-gradient-to-r from-[#FFE379] via-[#F5D766] to-[#FFE379] hover:brightness-110 text-[#101010] font-black rounded-full shadow-[0_10px_35px_rgba(255,227,121,0.4)] px-12'
  },
  'outline-gold': {
    id: 'outline-gold',
    name: 'Minimal Golden Outline',
    className: 'bg-[#141414]/80 hover:bg-[#FFE379] text-[#FFE379] hover:text-[#101010] font-black rounded-xl border-2 border-[#FFE379] shadow-[0_0_25px_rgba(255,227,121,0.2)] hover:shadow-[0_0_35px_rgba(255,227,121,0.4)]'
  },
  'glass-gold': {
    id: 'glass-gold',
    name: 'Frosted Glass with Golden Rim',
    className: 'bg-[#181818]/60 hover:bg-[#202020] text-white hover:text-[#FFE379] font-black rounded-2xl border border-[#FFE379]/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
  },
  'cyber-cut': {
    id: 'cyber-cut',
    name: 'Cyberpunk Angled Cut',
    className: 'bg-[#FFE379] hover:bg-[#ebd074] text-[#101010] font-black [clip-path:polygon(12px_0%,100%_0%,calc(100%-12px)_100%,0%_100%)] px-12 shadow-[0_10px_35px_rgba(255,227,121,0.4)]'
  }
};

export default function CtaSection() {
  const { settings } = useSiteSettings();
  const ctaData = settings.homeContent?.cta || {};

  const tagline = ctaData.tagline || "LET'S CREATE CINEMATIC MAGIC";
  const line1 = ctaData.headlineLine1 || 'Ready to take your';
  const line2 = ctaData.headlineLine2 || 'Videos to the next level?';
  const subtitle = ctaData.subtitle || "Let's collaborate and craft high-impact cinematic films and dynamic viral reels that captivate audiences and elevate your brand.";
  const buttonText = ctaData.buttonText || 'Get Started';
  const buttonLink = ctaData.buttonLink || '/services/cinematic-wedding-video-editing';
  const buttonStyleKey = ctaData.buttonStyle || 'sharp-gold';
  const showArrow = ctaData.showArrow !== false;

  const currentStyle = CTA_BUTTON_STYLES[buttonStyleKey] || CTA_BUTTON_STYLES['sharp-gold'];

  return (
    <section className="mb-14 relative overflow-hidden text-center py-16 px-6 sm:px-12 border border-[#FFE379]/20 rounded-3xl shadow-2xl group animate-brand-gradient-mix">
      
      {/* Dynamic Liquid Color Mixing Ambient Blobs (Brand Gold + Warm Glow) */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-[#FFE379]/15 rounded-full blur-3xl pointer-events-none animate-fluid-blob-1" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#FFE379]/20 rounded-full blur-3xl pointer-events-none animate-fluid-blob-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#FFE379]/10 via-[#232323]/50 to-[#FFE379]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Sparkle Pill */}
      {tagline && (
        <div className="relative z-10 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1A1A1A]/90 border border-[#FFE379]/30 text-[#FFE379] text-xs font-semibold mb-6 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#FFE379]" style={{ animationDuration: '6s' }} />
          <span className="tracking-wide uppercase">{tagline}</span>
        </div>
      )}

      {/* Headline with Brand Accent */}
      <h2 
        className="relative z-10 text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight mb-4 leading-[1.08] uppercase"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {line1}<br />
        <span className="text-[#FFE379] drop-shadow-[0_0_25px_rgba(255,227,121,0.35)]">
          {line2}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p 
          className="relative z-10 text-neutral-300 text-xs sm:text-sm lg:text-base max-w-lg mx-auto mb-9 leading-relaxed font-normal whitespace-pre-line"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {subtitle}
        </p>
      )}

      {/* Brand Golden Yellow Action Button with Dynamic Chosen Style */}
      <div className="relative z-10">
        <Link 
          to={buttonLink} 
          className={`inline-flex items-center space-x-3 text-xs sm:text-sm px-10 py-4 uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${currentStyle.className}`}
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span>{buttonText}</span>
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </Link>
      </div>

    </section>
  );
}
