import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSiteSettings();

  const footerLogoSrc = settings.mergeFooterLogo 
    ? settings.frontendLogo 
    : (settings.footerLogo || settings.frontendLogo);

  const footerData = settings.footer || {};
  const currentYear = new Date().getFullYear();

  // Parse copyright text replacing {year}
  const rawCopyright = footerData.copyrightText || '© {year} FlipTheLense. All Rights Reserved.';
  const renderedCopyright = rawCopyright.replace('{year}', currentYear.toString());

  const companyLinks = footerData.companyLinks || [
    { id: 'fl-1', label: 'About Us', path: '/about' },
    { id: 'fl-2', label: 'Portfolio', path: '/portfolio' },
    { id: 'fl-3', label: 'Our Services', path: '/services/cinematic-wedding-video-editing' },
    { id: 'fl-4', label: 'Privacy Policy', path: '#' },
    { id: 'fl-5', label: 'Terms & Conditions', path: '#' },
    { id: 'fl-6', label: 'Refund Policy', path: '#' }
  ];

  const socials = footerData.socials || [
    { id: 'soc-1', name: 'Facebook', iconType: 'text', iconText: 'f', iconUrl: '', link: 'https://facebook.com' },
    { id: 'soc-2', name: 'YouTube', iconType: 'text', iconText: '▶', iconUrl: '', link: 'https://youtube.com' },
    { id: 'soc-3', name: 'Instagram', iconType: 'text', iconText: 'IG', iconUrl: '', link: 'https://instagram.com' }
  ];

  const paymentGateways = footerData.paymentGateways || [];

  return (
    <footer id="footer-section" className="w-full bg-[#1A1A1A] text-[#F4F4F4] px-4 sm:px-12 pt-16 pb-10 border-t border-[#232323] mt-20">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-[#232323]">
          
          {/* Brand Info & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block group">
              {footerLogoSrc ? (
                <img 
                  src={footerLogoSrc} 
                  alt="FlipTheLense Logo" 
                  style={{ height: `${Math.round((settings.logoHeight || 44) * 1.15)}px` }}
                  className="w-auto max-w-[280px] object-contain transition-transform group-hover:scale-105" 
                />
              ) : (
                <div className="bg-[#FFE379] text-[#101010] font-black px-4 py-1.5 text-base tracking-wider uppercase transition-transform group-hover:scale-105" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  FLIPTHELENSE
                </div>
              )}
            </Link>

            <p className="text-xs sm:text-[13px] text-[#878787] leading-relaxed max-w-sm whitespace-pre-line" style={{ fontFamily: "'Raleway', sans-serif" }}>
              {footerData.aboutText || 'Transform your footage into high-impact cinematic stories. Professional video editing, color grading, and visual storytelling that captivates audiences.'}
            </p>

            {(footerData.licenceNo || footerData.licenceNo === undefined) && (
              <div className="pt-2 text-xs text-neutral-400 font-medium">
                <span className="text-[#FFE379] font-bold">Licence No:</span> {footerData.licenceNo || 'TRAD/DNCC/008721/2025'}
              </div>
            )}
          </div>

          {/* Company Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-extrabold text-sm sm:text-base text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {footerData.companyTitle || 'Company'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#878787]" style={{ fontFamily: "'Raleway', sans-serif" }}>
              {companyLinks.map((item, idx) => (
                <li key={item.id || idx}>
                  {item.path && item.path.startsWith('/') ? (
                    <Link to={item.path} className="hover:text-[#FFE379] transition">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.path || '#'} className="hover:text-[#FFE379] transition">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-extrabold text-sm sm:text-base text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {footerData.contactTitle || 'Get In Touch'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-[#878787]" style={{ fontFamily: "'Raleway', sans-serif" }}>
              {footerData.address && (
                <div className="flex items-start">
                  <span className="w-16 font-semibold text-neutral-300 shrink-0">Address</span>
                  <span>: {footerData.address}</span>
                </div>
              )}
              {footerData.phone && (
                <div className="flex items-center">
                  <span className="w-16 font-semibold text-neutral-300 shrink-0">Phone</span>
                  <a href={`tel:${footerData.phone.replace(/\s+/g, '')}`} className="text-[#FFE379] font-mono hover:underline">
                    : {footerData.phone}
                  </a>
                </div>
              )}
              {footerData.email && (
                <div className="flex items-center">
                  <span className="w-16 font-semibold text-neutral-300 shrink-0">Email</span>
                  <a href={`mailto:${footerData.email}`} className="hover:text-white transition">
                    : {footerData.email}
                  </a>
                </div>
              )}
            </div>

            {/* Social Icons in Exact Brand Gold / Custom Uploaded */}
            <div className="flex items-center flex-wrap gap-2.5 pt-3">
              {socials.map((soc, idx) => {
                const isImage = soc.iconType === 'image' && soc.iconUrl;
                return (
                  <a 
                    key={soc.id || idx}
                    href={soc.link || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    title={soc.name || 'Social Link'}
                    className="w-8 h-8 bg-[#FFE379] hover:bg-white text-[#101010] flex items-center justify-center text-xs font-black transition-all shadow-md hover:scale-105 overflow-hidden"
                  >
                    {isImage ? (
                      <img src={soc.iconUrl} alt={soc.name || 'Icon'} className="w-5 h-5 object-contain" />
                    ) : (
                      <span>{soc.iconText || soc.name?.substring(0, 2) || '★'}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#878787]">
          <p>{renderedCopyright}</p>
          
          {/* Dynamic Payment Gateways Accepted */}
          <div className="flex items-center flex-wrap gap-2 justify-end">
            {paymentGateways.length > 0 ? (
              paymentGateways.map((gw, idx) => (
                <div 
                  key={gw.id || idx}
                  title={gw.name || 'Payment Partner'}
                  className="h-7 px-2.5 py-1 bg-[#222222] hover:bg-[#282828] border border-[#333333] rounded flex items-center justify-center transition-all shadow-sm"
                >
                  {gw.logoUrl ? (
                    <img 
                      src={gw.logoUrl} 
                      alt={gw.name || 'Payment'} 
                      className="h-4 max-w-[50px] object-contain filter contrast-125" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline';
                      }}
                    />
                  ) : null}
                  <span 
                    className="text-[11px] font-bold text-neutral-300 font-mono"
                    style={{ display: gw.logoUrl ? 'none' : 'inline' }}
                  >
                    {gw.name}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-[11px] text-neutral-500 italic">No payment gateways configured</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
