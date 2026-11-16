import React, { useState, useEffect } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VideoModal from '../components/common/VideoModal';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalVideo, setModalVideo] = useState({ isOpen: false, title: '', url: '' });
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([
    { id: 'all', name: 'ALL' },
    { id: 'commercials', name: 'COMMERCIALS' },
    { id: 'wedding', name: 'WEDDING' },
    { id: 'music_video', name: 'MUSIC VIDEO' },
    { id: 'documentary', name: 'DOCUMENTARY' }
  ]);

  // Fetch dynamic projects & categories managed via Admin Dashboard
  useEffect(() => {
    axios.get('/api/portfolio')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        }
      })
      .catch(() => {});

    axios.get('/api/categories')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories([
            { id: 'all', name: 'ALL' },
            ...res.data.map(c => ({ id: c.slug, name: c.name.toUpperCase() }))
          ]);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#101010] text-[#F4F4F4] min-h-screen">
      
      {/* ================= 1. HERO BANNER (100% ELEMENTOR EXACT DOM STRUCTURE & STYLING) ================= */}
      {/*
        Exact Videen Template Structure:
        - Background: L-4.jpg (Original mountain backdrop from template kit)
        - Overlay: #101010 at 70% opacity
        - Container: 1140px boxed, min-h-[90vh] or min-h-[580px]
        - 2 Equal Columns (50% / 50%):
          * Column 1 (Left):
            - 18+ Years Experience (Funfact box: bg #232323, z-index 1, negative margin overlapping top-left of image)
            - Image F1-1.png (540x540 original transparent cutout of filmmaker on #10101070 box)
            - Inner section with 2 equal sub-columns:
                15+ Best Award (Funfact box: bg #232323, negative margin overlapping bottom-center)
                523+ Project Done (Funfact box: bg #232323, negative margin overlapping bottom-right)
          * Column 2 (Right):
            - Title: "WELCOME TO VIDEEN STUDIO" (Raleway 1rem / 16px, tracking-[4.5px], color #FFE379)
            - Heading: "LET'S MAKE YOUR VIDEO LOOKS MORE COOL" (Oswald 800, 5rem / 80px, #F4F4F4 with MAKE & COOL in #FFE379)
            - Paragraph: "Lorem ipsum dolor sit amet..." (Raleway 1rem, #F4F4F4, line-height 2em)
            - Button: "GET STARTED" (bg #FFE379, text #101010, Oswald font-semibold, arrow icon)
      */}
      <section 
        className="relative w-full overflow-hidden border-b border-[#232323] flex items-center min-h-[580px] lg:min-h-[85vh] py-12 lg:py-16"
        style={{
          backgroundImage: "url('/videen_hero_bg_real.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Exact Elementor Background Overlay (#101010 at 70% opacity) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundColor: '#101010', opacity: 0.7 }}
        />

        {/* Elementor Boxed Container (max-w-[1140px] w-full mx-auto px-4 sm:px-6) */}
        <div className="relative z-10 w-full max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
            
            {/* ================= LEFT COLUMN: Image & 3 Funfact Stat Boxes (Elementor-col-50 bd43591) ================= */}
            <div className="relative p-2 sm:p-4 flex flex-col justify-center max-w-[540px] mx-auto lg:max-w-none w-full">
              
              {/* 1. Elementor Funfact Widget (77641fa): 18+ Years Experience */}
              {/* Negative bottom margin so it pulls the image up and overlaps the top-left */}
              <div className="relative z-20 self-start sm:-ml-4 mb-[-60px] sm:mb-[-80px]">
                <div 
                  className="p-3.5 sm:p-4 text-center min-w-[135px] sm:min-w-[155px] shadow-2xl border border-white/5"
                  style={{ backgroundColor: '#232323' }}
                >
                  <div className="flex items-baseline justify-center text-[#F4F4F4] leading-none mb-1">
                    <span 
                      className="text-4xl sm:text-[46px] font-semibold"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      18
                    </span>
                    <span 
                      className="text-[#FFE379] text-xl sm:text-2xl font-semibold ml-0.5 align-super"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      +
                    </span>
                  </div>
                  <h3 
                    className="text-[11px] sm:text-xs text-[#FFE379] uppercase font-normal tracking-wide"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Years Experience
                  </h3>
                </div>
              </div>

              {/* 2. Elementor Image Widget (c59b849): F1-1.png sitting on translucent container */}
              <div 
                className="w-full relative overflow-visible z-10"
                style={{ backgroundColor: '#10101070' }}
              >
                <img 
                  src="/F1-1.png" 
                  alt="Videen Filmmaker Portrait" 
                  width="540" 
                  height="540" 
                  className="w-full h-auto object-contain block drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* 3. Elementor Inner Section (d26e645): 15+ and 523+ */}
              {/* Negative top margin to pull up over the bottom of the image */}
              <div className="relative z-20 mt-[-55px] sm:mt-[-75px] flex justify-end space-x-3 sm:space-x-4 pr-0 sm:pr-4">
                
                {/* 15+ Best Award (Inner column 9cda6d0 -> Widget fc3fade) */}
                <div 
                  className="p-3 sm:p-3.5 text-center min-w-[110px] sm:min-w-[130px] shadow-2xl border border-white/5"
                  style={{ backgroundColor: '#232323' }}
                >
                  <div className="flex items-baseline justify-center text-[#F4F4F4] leading-none mb-1">
                    <span 
                      className="text-3xl sm:text-[38px] font-semibold"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      15
                    </span>
                    <span 
                      className="text-[#FFE379] text-lg sm:text-xl font-semibold ml-0.5 align-super"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      +
                    </span>
                  </div>
                  <h3 
                    className="text-[10px] sm:text-[11px] text-[#FFE379] uppercase font-normal tracking-wide"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Best Award
                  </h3>
                </div>

                {/* 523+ Project Done (Inner column 7b7326c -> Widget e7a9bca) */}
                <div 
                  className="p-3 sm:p-3.5 text-center min-w-[115px] sm:min-w-[135px] shadow-2xl border border-white/5"
                  style={{ backgroundColor: '#232323' }}
                >
                  <div className="flex items-baseline justify-center text-[#F4F4F4] leading-none mb-1">
                    <span 
                      className="text-3xl sm:text-[38px] font-semibold"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      523
                    </span>
                    <span 
                      className="text-[#FFE379] text-lg sm:text-xl font-semibold ml-0.5 align-super"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      +
                    </span>
                  </div>
                  <h3 
                    className="text-[10px] sm:text-[11px] text-[#FFE379] uppercase font-normal tracking-wide"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    Project Done
                  </h3>
                </div>

              </div>

            </div>

            {/* ================= RIGHT COLUMN: Typography & Action Button (Elementor-col-50 58a7240) ================= */}
            <div className="relative p-2 sm:p-4 lg:pl-16 space-y-4 text-left">
              
              {/* Subheading: WELCOME TO VIDEEN STUDIO (7d284ea) */}
              <h1 
                className="text-xs sm:text-sm lg:text-[15px] uppercase font-medium tracking-[4.5px] text-[#FFE379]"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                WELCOME TO VIDEEN STUDIO
              </h1>

              {/* Main Heading: LET'S MAKE YOUR VIDEO LOOKS MORE COOL (66028b4) */}
              <h2 
                className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold uppercase leading-[1.08] text-[#F4F4F4] tracking-normal"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                LET'S <span className="text-[#FFE379]">MAKE</span><br />
                YOUR VIDEO<br />
                LOOKS MORE<br />
                <span className="text-[#FFE379]">COOL</span>
              </h2>

              {/* Body Paragraph: (436ca04) */}
              <p 
                className="text-neutral-300 text-xs sm:text-sm lg:text-[15px] leading-[1.8em] sm:leading-[2em] max-w-lg font-normal pt-1"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>

              {/* CTA Button: GET STARTED (26e06cc) */}
              <div className="pt-4">
                <a 
                  href="#my-work-section" 
                  className="inline-flex items-center space-x-3 bg-[#FFE379] hover:bg-transparent text-[#101010] hover:text-[#F4F4F4] border border-transparent hover:border-[#FFE379] font-semibold text-sm sm:text-base px-7 py-3.5 uppercase tracking-wider transition-all duration-300 shadow-xl"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <span className="text-base font-bold">→</span>
                  <span>GET STARTED</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. "MY WORK" FILTERABLE PORTFOLIO SHOWCASE ================= */}
      <section id="my-work-section" className="py-20 px-6 max-w-[1140px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span 
            className="text-xs uppercase tracking-[4.5px] text-[#FFE379] font-medium block"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            PORTFOLIO
          </span>
          <h2 
            className="text-4xl sm:text-5xl font-extrabold text-[#F4F4F4] uppercase tracking-normal mt-1"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            MY WORK
          </h2>
          <p 
            className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed mt-2 italic max-w-md mx-auto"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Duis ac finibus enim, sit amet vulputate quam. Ut ac ante vel dolor pulvinar bibendum. Curabitur molestie, nisi quis porta laoreet.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#FFE379] text-black shadow-lg scale-105'
                    : 'bg-[#1A1A1A] text-neutral-400 hover:text-white border border-[#232323] hover:border-neutral-700'
                }`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4:3 Aspect Ratio Landscape Cards Grid with SEO-Friendly Links to Single Service Detail Page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((item) => {
            const projectSlug = item.slug || (item.title ? item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : 'project');
            return (
              <div 
                key={item._id || item.id}
                className="group relative aspect-[4/3] bg-[#1A1A1A] overflow-hidden shadow-xl border border-[#232323] hover:border-[#FFE379]/60 transition-all duration-500 rounded-none"
              >
                <img 
                  src={item.img || item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" 
                />

                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/65 transition-colors duration-300" />

                <div className="absolute top-3 left-3 z-10">
                  <span 
                    className="bg-black/80 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#FFE379] px-2.5 py-1 border border-white/10"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {item.tag || item.category}
                  </span>
                </div>

                {/* Quick Action Center: Play Video Modal or View Full Project Page */}
                <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-10">
                  <button
                    onClick={() => setModalVideo({ isOpen: true, title: item.title, url: item.video })}
                    className="w-12 h-12 rounded-full bg-[#FFE379] hover:bg-[#F2D76B] text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                    title="Play Video Preview"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  <Link
                    to={`/${projectSlug}`}
                    className="w-12 h-12 rounded-full bg-[#141414] hover:bg-[#FFE379] text-white hover:text-black border border-[#FFE379]/40 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                    title="View Project Details Page"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Bottom Overlay with Link */}
                <Link
                  to={`/${projectSlug}`}
                  className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-10 block"
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-1">
                    <span>{item.client || 'Creative Project'}</span>
                    <span className="text-[#FFE379] font-bold">
                      {item.duration || '03:00 MIN'}
                    </span>
                  </div>
                  <h4 
                    className="text-base font-semibold text-white leading-tight group-hover:text-[#FFE379] transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                </Link>

              </div>
            );
          })}
        </div>

      </section>

      {/* ================= 3. BOTTOM CINEMATIC CTA BANNER ================= */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-[#101010] to-black border-t border-[#232323]">
        <div className="max-w-2xl mx-auto space-y-5">
          <span 
            className="text-xs uppercase tracking-[4.5px] text-[#FFE379] font-medium block"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            WORK WITH US
          </span>

          <h2 
            className="text-3xl sm:text-5xl font-extrabold text-[#F4F4F4] uppercase tracking-normal"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            HAVE A PROJECT IN MIND?
          </h2>
          <p 
            className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Ready to produce high-end wedding films, viral reels, or cinematic TV commercials? Let's discuss your timeline and vision.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="/#footer-section" 
              className="inline-flex items-center space-x-2 bg-[#FFE379] hover:bg-[#ebd074] text-black font-semibold text-sm px-8 py-3.5 uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>BOOK A CONSULTATION</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        title={modalVideo.title}
        url={modalVideo.url}
        onClose={() => setModalVideo({ isOpen: false, title: '', url: '' })}
      />

    </div>
  );
}
