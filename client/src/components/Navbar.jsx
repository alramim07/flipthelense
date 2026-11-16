import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#232323] py-2.5 px-4 sm:px-8 flex items-center justify-between shadow-xl transition-all">
      {/* Brand Logo in exact Videen Gold */}
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="bg-[#FFE379] text-black font-black px-3.5 py-1 text-sm tracking-wider uppercase transition-transform group-hover:scale-105">
          FLIPTHELENSE
        </div>
      </Link>

      <nav className="flex items-center space-x-6 sm:space-x-10 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300">
        <Link to="/" className="hover:text-[#FFE379] transition">Home</Link>
        <Link to="/about" className="hover:text-[#FFE379] transition">About</Link>
        <Link to="/services/cinematic-wedding-video-editing" className="hover:text-[#FFE379] transition text-neutral-300">Services</Link>
        <Link to="/portfolio" className="hover:text-[#FFE379] transition">Portfolio</Link>
        <Link to="/contact" className="hover:text-[#FFE379] transition">Contact</Link>
      </nav>

      <Link to="/contact" className="bg-[#FFE379] hover:bg-[#ebd074] text-black font-extrabold px-5 py-1.5 text-xs sm:text-sm transition-all shadow-md hover:scale-105 uppercase tracking-wider">
        Contact us
      </Link>
    </header>
  );
}
