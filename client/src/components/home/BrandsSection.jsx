import React from 'react';
import { Award, Sparkles } from 'lucide-react';

const BRAND_COLLABORATIONS = [
  {
    id: 'bio-xin',
    name: 'Bio-Xin',
    subtitle: 'cosmetics',
    category: 'Cosmetics & Skincare',
    iconColor: '#F59E0B',
    renderLogo: () => (
      <div className="flex items-center space-x-2">
        <span className="text-xl sm:text-2xl font-black text-amber-400 font-serif italic">🪷</span>
        <div className="text-left leading-none">
          <span className="text-base sm:text-lg font-black text-white tracking-tight block">Bio-Xin</span>
          <span className="text-[9px] font-sans text-amber-400/90 tracking-widest uppercase block -mt-0.5">cosmetics</span>
        </div>
      </div>
    )
  },
  {
    id: 'quince',
    name: 'Quince',
    subtitle: 'PASTRY SHOP',
    category: 'Pastry & Food Craft',
    iconColor: '#EF4444',
    renderLogo: () => (
      <div className="text-center leading-none">
        <span className="text-xl sm:text-2xl font-serif italic font-bold text-red-400 block" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive, serif" }}>
          Quince
        </span>
        <span className="text-[8px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mt-0.5">
          PASTRY SHOP
        </span>
      </div>
    )
  },
  {
    id: 'raima-rangers',
    name: 'RAIMA RANGERS',
    subtitle: 'CRICKET TEAM',
    category: 'Sports & Athletics',
    iconColor: '#3B82F6',
    renderLogo: () => (
      <div className="text-center leading-none">
        <span className="text-sm sm:text-base font-black text-blue-400 tracking-wider uppercase block" style={{ fontFamily: "'Oswald', sans-serif" }}>
          RAIMA RANGERS
        </span>
        <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block mt-0.5">
          CRICKET TEAM
        </span>
      </div>
    )
  },
  {
    id: 'bioscope',
    name: 'Bioscope',
    subtitle: 'wedding',
    category: 'Cinematic Weddings',
    iconColor: '#F97316',
    renderLogo: () => (
      <div className="text-center leading-none">
        <span className="text-base sm:text-lg font-serif font-black text-white tracking-tight block">
          Bioscope
        </span>
        <span className="text-[9px] font-serif italic text-orange-400 tracking-wider block -mt-0.5">
          wedding
        </span>
      </div>
    )
  },
  {
    id: 'bcs-confidence',
    name: 'BCS Confidence',
    subtitle: 'Education Academy',
    category: 'Education & Career',
    iconColor: '#EF4444',
    renderLogo: () => (
      <div className="text-center leading-none">
        <div className="inline-flex items-baseline space-x-1">
          <span className="text-base sm:text-lg font-black text-red-500 tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>BCS</span>
          <span className="text-[10px] font-bold text-red-400 italic">Confidence</span>
        </div>
        <span className="text-[8px] font-mono tracking-wider text-neutral-400 block mt-0.5">Education</span>
      </div>
    )
  },
  {
    id: 'ordinary-it',
    name: 'Ordinary IT',
    subtitle: 'Software & Technology',
    category: 'Tech & Development',
    iconColor: '#FFFFFF',
    renderLogo: () => (
      <div className="flex items-center space-x-1.5">
        <span className="text-base sm:text-lg font-extrabold text-white tracking-tight" style={{ fontFamily: "'Raleway', sans-serif" }}>
          Ordinary
        </span>
        <span className="text-sm sm:text-base font-black text-[#FFE379] px-1.5 py-0.5 rounded bg-[#FFE379]/10 border border-[#FFE379]/30 font-mono">
          IT
        </span>
      </div>
    )
  },
  {
    id: 'ordinary-coaching',
    name: 'Ordinary Coaching',
    subtitle: 'Coaching Center',
    category: 'Academic Mentorship',
    iconColor: '#38BDF8',
    renderLogo: () => (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full border-2 border-sky-400 flex items-center justify-center font-bold text-[10px] text-sky-400 shrink-0">
          C
        </div>
        <div className="text-left leading-none">
          <span className="text-xs sm:text-sm font-bold text-white block">Ordinary</span>
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block mt-0.5">Coaching Center</span>
        </div>
      </div>
    )
  },
  {
    id: 'alliance-mart',
    name: 'Alliance Mart',
    subtitle: 'E-Commerce & Retail',
    category: 'E-Commerce & Retail',
    iconColor: '#F97316',
    renderLogo: () => (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[#101010] font-black text-xs shadow-md shrink-0">
          🛍️
        </div>
        <div className="text-left leading-none">
          <span className="text-xs sm:text-sm font-black text-white tracking-tight block">Alliance</span>
          <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block mt-0.5">Mart</span>
        </div>
      </div>
    )
  }
];

export default function BrandsSection() {
  return (
    <section className="relative z-10 py-20 my-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFE379]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] shadow-lg mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE379]" />
            <span 
              className="text-[11px] uppercase tracking-widest text-[#FFE379] font-bold"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              BRANDS I'VE WORKED WITH
            </span>
          </div>

          <h2 
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Trusted <span className="text-[#FFE379]">Collaborations.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FFE379] to-transparent mx-auto mt-3" />
        </div>

        {/* 2x4 Grid Container matching the reference image layout */}
        <div className="relative rounded-3xl bg-[#141414]/90 backdrop-blur-xl border border-[#262626] shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#262626] rounded-2xl overflow-hidden border border-[#262626]">
            {BRAND_COLLABORATIONS.map((brand) => (
              <div
                key={brand.id}
                className="group relative bg-[#161616] hover:bg-[#1C1C1C] p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 min-h-[110px] sm:min-h-[130px] cursor-default"
              >
                {/* Subtle Hover Accent */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FFE379] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Render Custom Brand Logo typography & insignia */}
                <div className="transform transition-transform duration-300 group-hover:scale-105">
                  {brand.renderLogo()}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Stat / Micro-Badge */}
          <div className="mt-8 pt-6 border-t border-[#232323] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-mono gap-3">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#FFE379]" />
              <span>Proven track record across commercials, cricket leagues, academic institutions & fashion brands.</span>
            </div>
            <span className="text-[#FFE379] font-bold">8+ Featured Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}
