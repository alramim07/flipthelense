import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import { useSiteSettings } from '../../context/SettingsContext';

const DEFAULT_BRAND_ITEMS = [
  {
    id: 'bio-xin',
    name: 'Bio-Xin',
    subtitle: 'cosmetics',
    category: 'Cosmetics & Skincare',
    color: '#F59E0B',
    iconEmoji: '🪷',
    logoUrl: ''
  },
  {
    id: 'quince',
    name: 'Quince',
    subtitle: 'PASTRY SHOP',
    category: 'Pastry & Food Craft',
    color: '#EF4444',
    iconEmoji: '',
    logoUrl: ''
  },
  {
    id: 'raima-rangers',
    name: 'RAIMA RANGERS',
    subtitle: 'CRICKET TEAM',
    category: 'Sports & Athletics',
    color: '#3B82F6',
    iconEmoji: '',
    logoUrl: ''
  },
  {
    id: 'bioscope',
    name: 'Bioscope',
    subtitle: 'wedding',
    category: 'Cinematic Weddings',
    color: '#F97316',
    iconEmoji: '',
    logoUrl: ''
  },
  {
    id: 'bcs-confidence',
    name: 'BCS Confidence',
    subtitle: 'Education Academy',
    category: 'Education & Career',
    color: '#EF4444',
    iconEmoji: '',
    logoUrl: ''
  },
  {
    id: 'ordinary-it',
    name: 'Ordinary IT',
    subtitle: 'Software & Technology',
    category: 'Tech & Development',
    color: '#FFE379',
    iconEmoji: '',
    logoUrl: ''
  },
  {
    id: 'ordinary-coaching',
    name: 'Ordinary Coaching',
    subtitle: 'Coaching Center',
    category: 'Academic Mentorship',
    color: '#38BDF8',
    iconEmoji: 'C',
    logoUrl: ''
  },
  {
    id: 'alliance-mart',
    name: 'Alliance Mart',
    subtitle: 'E-Commerce & Retail',
    category: 'E-Commerce & Retail',
    color: '#F97316',
    iconEmoji: '🛍️',
    logoUrl: ''
  }
];

export default function BrandsSection() {
  const { settings } = useSiteSettings();
  const brandsConfig = settings.homeContent?.brands || {};

  const badgeText = brandsConfig.badge || "BRANDS I'VE WORKED WITH";
  const title1 = brandsConfig.titleLine1 || 'Trusted';
  const title2 = brandsConfig.titleLine2 || 'Collaborations.';
  const bottomText = brandsConfig.bottomText || 'Proven track record across commercials, cricket leagues, academic institutions & fashion brands.';
  const featuredBadgeText = brandsConfig.featuredBadgeText || '8+ Featured Partners';

  const brandItems = brandsConfig.items && brandsConfig.items.length > 0
    ? brandsConfig.items
    : DEFAULT_BRAND_ITEMS;

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
              {badgeText}
            </span>
          </div>

          <h2 
            className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {title1} <span className="text-[#FFE379]">{title2}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FFE379] to-transparent mx-auto mt-3" />
        </div>

        {/* 2x4 Grid Container matching the reference image layout */}
        <div className="relative rounded-3xl bg-[#141414]/90 backdrop-blur-xl border border-[#262626] shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#262626] rounded-2xl overflow-hidden border border-[#262626]">
            {brandItems.map((brand, idx) => {
              const hasUploadedLogo = Boolean(brand.logoUrl);

              return (
                <div
                  key={brand.id || idx}
                  className="group relative bg-[#161616] hover:bg-[#1C1C1C] p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 min-h-[110px] sm:min-h-[130px] cursor-default"
                >
                  {/* Subtle Hover Accent */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FFE379] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Render Custom Brand Logo / Uploaded Image or Styled Typography */}
                  <div className="transform transition-transform duration-300 group-hover:scale-105 max-h-16 flex items-center justify-center">
                    {hasUploadedLogo ? (
                      <img 
                        src={brand.logoUrl} 
                        alt={brand.name || 'Brand Logo'} 
                        className="max-h-12 max-w-[140px] object-contain filter contrast-125"
                      />
                    ) : (
                      <div className="text-center leading-none">
                        <div className="flex items-center justify-center space-x-1.5">
                          {brand.iconEmoji && (
                            <span className="text-base sm:text-xl">{brand.iconEmoji}</span>
                          )}
                          <span 
                            className="text-sm sm:text-base font-black tracking-tight text-white block uppercase"
                            style={{ fontFamily: "'Oswald', sans-serif" }}
                          >
                            {brand.name}
                          </span>
                        </div>
                        {brand.subtitle && (
                          <span 
                            className="text-[9px] font-mono tracking-widest uppercase block mt-1"
                            style={{ color: brand.color || '#FFE379' }}
                          >
                            {brand.subtitle}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust Stat / Micro-Badge */}
          <div className="mt-8 pt-6 border-t border-[#232323] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-mono gap-3">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#FFE379] shrink-0" />
              <span>{bottomText}</span>
            </div>
            <span className="text-[#FFE379] font-bold shrink-0">{featuredBadgeText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
