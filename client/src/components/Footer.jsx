import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSiteSettings();

  const footerLogoSrc = settings.mergeFooterLogo 
    ? settings.frontendLogo 
    : (settings.footerLogo || settings.frontendLogo);

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

            <p className="text-xs sm:text-[13px] text-[#878787] leading-relaxed max-w-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Transform your footage into high-impact cinematic stories. Professional video editing, color grading, and visual storytelling that captivates audiences.
            </p>

            <div className="pt-2 text-xs text-neutral-400 font-medium">
              <span className="text-[#FFE379] font-bold">Licence No:</span> TRAD/DNCC/008721/2025
            </div>
          </div>

          {/* Company Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-extrabold text-sm sm:text-base text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#878787]" style={{ fontFamily: "'Raleway', sans-serif" }}>
              <li><Link to="/about" className="hover:text-[#FFE379] transition">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#FFE379] transition">Portfolio</Link></li>
              <li><Link to="/services/cinematic-wedding-video-editing" className="hover:text-[#FFE379] transition">Our Services</Link></li>
              <li><a href="#" className="hover:text-[#FFE379] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FFE379] transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#FFE379] transition">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Details & Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-extrabold text-sm sm:text-base text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-[#878787]" style={{ fontFamily: "'Raleway', sans-serif" }}>
              <div className="flex items-start">
                <span className="w-16 font-semibold text-neutral-300 shrink-0">Address</span>
                <span>: Shyamoli, Mohammadpur, Dhaka 1207</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 font-semibold text-neutral-300 shrink-0">Phone</span>
                <span className="text-[#FFE379] font-mono">: +880 1885 000118</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 font-semibold text-neutral-300 shrink-0">Email</span>
                <span>: flipthelense@gmail.com</span>
              </div>
            </div>

            {/* Social Icons in Exact Brand Gold */}
            <div className="flex items-center space-x-2.5 pt-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 bg-[#FFE379] hover:bg-white text-[#101010] flex items-center justify-center text-xs font-black transition-all shadow-md hover:scale-105"
              >
                f
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 bg-[#FFE379] hover:bg-white text-[#101010] flex items-center justify-center text-xs font-black transition-all shadow-md hover:scale-105"
              >
                ▶
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 bg-[#FFE379] hover:bg-white text-[#101010] flex items-center justify-center text-xs font-black transition-all shadow-md hover:scale-105"
              >
                IG
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#878787]">
          <p>© {new Date().getFullYear()} FlipTheLense. All Rights Reserved.</p>
          <div className="max-w-[320px] w-full overflow-hidden opacity-80 filter brightness-90 hover:opacity-100 transition">
            <img src="/payment_badges.png" alt="Payment Gateways Accepted" className="w-full object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
