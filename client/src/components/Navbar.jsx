import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SettingsContext';

export default function Navbar() {
  const { settings } = useSiteSettings();

  // Determine Active Header Menu (Limit to 7 items)
  const activeMenu = (settings.menus || []).find(m => m.id === settings.activeMenuId) || settings.menus?.[0] || { items: [] };
  const menuItems = (activeMenu.items || []).slice(0, 7);

  // Header CTA Button Customizer Style Helpers
  const cta = settings.headerCta || {
    enabled: true,
    text: 'Contact us',
    link: '/contact',
    style: 'solid-gold',
    size: 'medium'
  };

  const getCtaClasses = () => {
    let classes = 'font-extrabold transition-all shadow-md uppercase tracking-wider inline-flex items-center justify-center ';
    
    // Size
    if (cta.size === 'small') {
      classes += 'px-3.5 py-1 text-xs ';
    } else if (cta.size === 'large') {
      classes += 'px-6 py-2.5 text-sm sm:text-base ';
    } else {
      classes += 'px-5 py-1.5 text-xs sm:text-sm '; // medium
    }

    // Style
    if (cta.style === 'outline-gold') {
      classes += 'bg-transparent border border-[#FFE379] text-[#FFE379] hover:bg-[#FFE379] hover:text-[#101010] rounded-none hover:scale-105 ';
    } else if (cta.style === 'rounded-pill') {
      classes += 'bg-[#FFE379] hover:bg-[#ebd074] text-[#101010] rounded-full hover:scale-105 ';
    } else if (cta.style === 'glass-minimal') {
      classes += 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl hover:border-[#FFE379] hover:text-[#FFE379] ';
    } else {
      // Solid gold
      classes += 'bg-[#FFE379] hover:bg-[#ebd074] text-[#101010] rounded-none hover:scale-105 ';
    }

    return classes;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#232323] py-2.5 px-4 sm:px-8 flex items-center justify-between shadow-xl transition-all">
      {/* Brand Logo in exact Videen Gold or Uploaded Image */}
      <Link to="/" className="flex items-center space-x-2 group shrink-0 py-1">
        {settings.frontendLogo ? (
          <img 
            src={settings.frontendLogo} 
            alt="FlipTheLense Logo" 
            style={{ height: `${settings.logoHeight || 44}px` }}
            className="w-auto max-w-[280px] object-contain transition-transform group-hover:scale-105" 
          />
        ) : (
          <div className="bg-[#FFE379] text-black font-black px-3.5 py-1 text-sm tracking-wider uppercase transition-transform group-hover:scale-105" style={{ fontFamily: "'Oswald', sans-serif" }}>
            FLIPTHELENSE
          </div>
        )}
      </Link>

      {/* Dynamic Header Menu Items (Max 7) */}
      <nav className="flex items-center space-x-6 sm:space-x-10 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300">
        {menuItems.map((item, idx) => (
          <Link key={item.id || idx} to={item.path} className="hover:text-[#FFE379] transition">
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Dynamic Header CTA Button */}
      {cta.enabled !== false && (
        <Link 
          to={cta.link || '/contact'} 
          className={getCtaClasses()}
          style={cta.customColor ? { 
            ...(cta.style === 'solid-gold' || cta.style === 'rounded-pill' ? { backgroundColor: cta.customColor, color: cta.textColor || '#101010' } : {}),
            ...(cta.style === 'outline-gold' ? { borderColor: cta.customColor, color: cta.customColor } : {})
          } : undefined}
        >
          {cta.text || 'Contact us'}
        </Link>
      )}
    </header>
  );
}
