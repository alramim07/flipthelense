import React, { useState, useEffect } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VideoModal from '../components/common/VideoModal';
import { useSiteSettings } from '../context/SettingsContext';

export default function Portfolio() {
  const { settings } = useSiteSettings();
  const portfolioSettings = settings?.portfolioContent || {};

  const hero = portfolioSettings.hero || {
    tagline: 'WELCOME TO VIDEEN STUDIO',
    headlineLine1: "LET'S MAKE",
    headlineLine2: 'YOUR VIDEO LOOKS MORE COOL',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'GET STARTED',
    bgImage: '/videen_hero_bg_real.jpg',
    filmmakerImage: '/F1-1.png',
    statYears: '18',
    statYearsLabel: 'Years Experience',
    statAwards: '15',
    statAwardsLabel: 'Best Award',
    statProjects: '523',
    statProjectsLabel: 'Project Done'
  };

  const filterSection = portfolioSettings.filterSection || {
    tagline: 'MY WORK',
    title: 'EXPLORE OUR RECENT PROJECTS',
    description: 'Bespoke video editing, high-end commercial grading, and story-driven post production across global client productions.'
  };

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
      
      {/* ================= 1. HERO BANNER (DYNAMIC BUILDER SUPPORT) ================= */}
      <section 
        className="relative w-full overflow-hidden border-b border-[#232323] flex items-center min-h-[580px] lg:min-h-[85vh] py-12 lg:py-16"
        style={{
          backgroundImage: `url('${hero.bgImage || '/videen_hero_bg_real.jpg'}')`,
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
            
            {/* ================= LEFT COLUMN: Image & 3 Funfact Stat Boxes ================= */}
            <div className="relative p-2 sm:p-4 flex flex-col justify-center max-w-[540px] mx-auto lg:max-w-none w-full">
              
              {/* 1. Funfact Widget: Years Experience */}
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
                      {hero.statYears || '18'}
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
                    {hero.statYearsLabel || 'Years Experience'}
                  </h3>
                </div>
              </div>

              {/* 2. Image Widget: Cutout of Filmmaker */}
              <div 
                className="w-full relative overflow-visible z-10"
                style={{ backgroundColor: '#10101070' }}
              >
                <img 
                  src={hero.filmmakerImage || '/F1-1.png'} 
                  alt="Filmmaker Portrait" 
                  width="540" 
                  height="540" 
                  className="w-full h-auto object-contain block drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* 3. Bottom 2 Stat Boxes */}
              <div className="relative z-20 mt-[-55px] sm:mt-[-75px] flex justify-end space-x-3 sm:space-x-4 pr-0 sm:pr-4">
                
                {/* Best Award */}
                <div 
                  className="p-3 sm:p-3.5 text-center min-w-[110px] sm:min-w-[130px] shadow-2xl border border-white/5"
                  style={{ backgroundColor: '#232323' }}
                >
                  <div className="flex items-baseline justify-center text-[#F4F4F4] leading-none mb-1">
                    <span 
                      className="text-3xl sm:text-[38px] font-semibold"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {hero.statAwards || '15'}
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
                    {hero.statAwardsLabel || 'Best Award'}
                  </h3>
                </div>

                {/* Project Done */}
                <div 
                  className="p-3 sm:p-3.5 text-center min-w-[115px] sm:min-w-[135px] shadow-2xl border border-white/5"
                  style={{ backgroundColor: '#232323' }}
                >
                  <div className="flex items-baseline justify-center text-[#F4F4F4] leading-none mb-1">
                    <span 
                      className="text-3xl sm:text-[38px] font-semibold"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {hero.statProjects || '523'}
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
                    {hero.statProjectsLabel || 'Project Done'}
                  </h3>
                </div>

              </div>

            </div>

            {/* ================= RIGHT COLUMN: Typography & Action Button ================= */}
            <div className="relative p-2 sm:p-4 lg:pl-16 space-y-4 text-left">
              
              <h1 
                className="text-xs sm:text-sm lg:text-[15px] uppercase font-medium tracking-[4.5px] text-[#FFE379]"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {hero.tagline || 'WELCOME TO VIDEEN STUDIO'}
              </h1>

              <h2 
                className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold uppercase leading-[1.08] text-[#F4F4F4] tracking-normal"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {hero.headlineLine1 || "LET'S MAKE"}<br />
                <span className="text-[#FFE379]">{hero.headlineLine2 || 'YOUR VIDEO LOOKS MORE COOL'}</span>
              </h2>

              <p 
                className="text-neutral-300 text-xs sm:text-sm lg:text-[15px] leading-[1.8em] sm:leading-[2em] max-w-lg font-normal pt-1"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {hero.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'}
              </p>

              <div className="pt-4">
                <a 
                  href={hero.buttonLink || '#my-work-section'} 
                  className={`inline-flex items-center space-x-2 text-sm sm:text-base px-7 py-3.5 uppercase tracking-wider transition-all duration-300 shadow-xl ${
                    hero.buttonStyle === 'rounded-gold'
                      ? 'bg-[#FFE379] hover:bg-[#F5D766] text-[#101010] font-black rounded-xl'
                      : hero.buttonStyle === 'pill-gold'
                      ? 'bg-[#FFE379] hover:bg-[#F5D766] text-[#101010] font-black rounded-full'
                      : hero.buttonStyle === 'outline-gold'
                      ? 'bg-transparent hover:bg-[#FFE379] text-[#FFE379] hover:text-[#101010] border-2 border-[#FFE379] font-bold rounded-none'
                      : hero.buttonStyle === 'cyber-cut'
                      ? 'bg-[#FFE379] hover:bg-[#F5D766] text-[#101010] font-black [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] rounded-none'
                      : 'bg-[#FFE379] hover:bg-transparent text-[#101010] hover:text-[#F4F4F4] border border-transparent hover:border-[#FFE379] font-semibold rounded-none'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {hero.showArrow !== false && <span className="text-base font-bold">→</span>}
                  <span>{hero.buttonText || 'GET STARTED'}</span>
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
            {filterSection.tagline}
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F4F4F4] mt-2 mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {filterSection.title}
          </h2>
          <p 
            className="text-xs sm:text-sm text-neutral-400 uppercase tracking-widest"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {filterSection.description}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#FFE379] text-[#101010] border-[#FFE379] shadow-[0_0_20px_rgba(255,227,121,0.25)]'
                    : 'bg-[#181818] text-[#F4F4F4] border-[#2D2D2D] hover:border-[#FFE379]/50 hover:text-[#FFE379]'
                }`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 font-mono text-sm">
            No projects available under this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((item) => (
              <div 
                key={item._id || item.id}
                className="group relative bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden hover:border-[#FFE379]/60 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Media Container with 16:9 cinematic aspect ratio */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Play Video Trigger Button */}
                  {item.video && (
                    <button 
                      onClick={() => setModalVideo({ isOpen: true, title: item.title, url: item.video })}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#FFE379]/90 text-[#101010] flex items-center justify-center pl-1 shadow-2xl backdrop-blur group-hover:scale-110 group-hover:bg-[#FFE379] transition-all duration-300"
                      aria-label="Play Video"
                    >
                      <Play className="w-6 h-6 fill-[#101010]" />
                    </button>
                  )}

                  {/* Category Pill Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur border border-white/10 text-[#FFE379]"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {item.tag || item.category}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#FFE379] transition-colors line-clamp-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    
                    <p 
                      className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {item.headline || item.overview || 'High-end cinematic film color graded and sound designed.'}
                    </p>
                  </div>

                  {/* Action Link: Navigate to Single Project Page */}
                  <div className="pt-6 mt-4 border-t border-[#222] flex items-center justify-between">
                    <Link 
                      to={`/${item.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-[#FFE379] transition-colors"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      <span>View Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {item.client && (
                      <span className="text-[11px] font-mono text-neutral-500 uppercase truncate max-w-[120px]">
                        {item.client}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* Video Modal Popup */}
      <VideoModal 
        isOpen={modalVideo.isOpen} 
        onClose={() => setModalVideo({ isOpen: false, title: '', url: '' })} 
        videoUrl={modalVideo.url} 
        title={modalVideo.title} 
      />

    </div>
  );
}
