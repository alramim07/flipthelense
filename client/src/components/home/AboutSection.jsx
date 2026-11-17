import React from 'react';
import { useSiteSettings } from '../../context/SettingsContext';

// Dynamic Skill / Software Data
const SOFTWARE_SKILLS = [
  {
    id: 'ps',
    name: 'Adobe Photoshop',
    icon: '/icon_ps_floppy.png',
    level: 'INTERMEDIATE',
    barColor: 'from-[#00c8ff] to-[#0072ff]',
    markerColor: '#00c8ff'
  },
  {
    id: 'ai',
    name: 'Adobe Illustrator',
    icon: '/icon_ai.png',
    level: 'INTERMEDIATE',
    barColor: 'from-[#ff9a00] to-[#e65100]',
    markerColor: '#ff9a00'
  },
  {
    id: 'pr',
    name: 'Adobe Premiere Pro',
    icon: '/icon_pr.png',
    level: 'INTERMEDIATE',
    barColor: 'from-[#3b82f6] to-[#1d4ed8]',
    markerColor: '#3b82f6'
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    icon: '/icon_ae.png',
    level: 'INTERMEDIATE',
    barColor: 'from-[#c084fc] to-[#7e22ce]',
    markerColor: '#c084fc'
  },
  {
    id: 'filmora',
    name: 'Wondershare Filmora',
    icon: '/icon_filmora.png',
    level: 'INTERMEDIATE',
    barColor: 'from-[#2dd4bf] to-[#0f766e]',
    markerColor: '#2dd4bf'
  }
];

export default function AboutSection() {
  const { settings } = useSiteSettings();
  const aboutData = settings.homeContent?.about || {};

  const subtitle = aboutData.subtitle || 'Since 2022';
  const nameHeading = aboutData.nameHeading || "HELLO, I'M PARVEJ MOSHARROF POLLOB";
  const bio1 = aboutData.bio1 || 'For the past 4.5+ years, I have dedicated myself to the art of visual storytelling. Currently working as a Senior Cinematographer and Video Editor, I lead production workflows and collaborate with a talented team of creatives to deliver high-impact media for weddings and commercial clients.';
  const bio2 = aboutData.bio2 || 'My approach to editing is both technical and emotional. Whether I am crafting a fast-paced real estate promo, a heartfelt wedding trailer, or executing complex motion graphics and speed ramps, my goal is always to keep the audience engaged from the first frame to the last.';

  return (
    <section id="about" className="mb-28 pt-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
          About
        </h2>
        
        {/* Subtitle */}
        <div className="text-neutral-400 text-xs sm:text-sm font-sans mt-2 tracking-wide">
          {subtitle}
        </div>

        {/* Name Title: Sharp, clean, legible uppercase */}
        <h3 
          className="text-2xl sm:text-3xl lg:text-[32px] tracking-wider text-white mt-3 mb-6 uppercase" 
          style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif', letterSpacing: '0.04em" }}
        >
          {nameHeading}
        </h3>

        {/* Bio paragraphs */}
        <div className="space-y-5 text-neutral-300 text-sm sm:text-[15px] leading-relaxed text-left max-w-3xl whitespace-pre-line">
          <p>{bio1}</p>
          <p>{bio2}</p>
        </div>

        {/* 
          SOFTWARE SKILLS SECTION:
          - Dynamic icons
          - Animated glowing energy-pulse SVG line
          - Pulsing checkpoint nodes
        */}
        <div className="relative mt-16 pt-8 pb-4">
          
          {/* Animated Background SVG Linear Curve with Electric Energy Pulse */}
          <div className="absolute inset-0 pointer-events-none -z-0">
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 1000 200" 
              preserveAspectRatio="none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Main Curve Base Gradient */}
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.6" />
                </linearGradient>

                {/* Flowing Laser Light Pulse Gradient */}
                <linearGradient id="laserPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="45%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                  <stop offset="55%" stopColor="#ec4899" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* Soft Ambient Glow Filter */}
                <filter id="svgGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Base Static Ambient Line with Glow */}
              <path 
                d="M 20 180 C 80 140, 110 90, 180 85 C 240 80, 270 120, 360 115 C 440 110, 520 145, 620 140 C 720 135, 800 155, 960 150" 
                stroke="url(#curveGradient)" 
                strokeWidth="2.5" 
                filter="url(#svgGlow)"
              />

              {/* 2. Continuous Traveling Energy Pulse / Flowing Light Wave along the line */}
              <path 
                d="M 20 180 C 80 140, 110 90, 180 85 C 240 80, 270 120, 360 115 C 440 110, 520 145, 620 140 C 720 135, 800 155, 960 150" 
                stroke="url(#laserPulseGradient)" 
                strokeWidth="3.5" 
                strokeDasharray="90 400"
                filter="url(#svgGlow)"
                className="animate-svg-laser-flow"
              />

              {/* 3. Connected Checkpoint Dots (Clean & Steady matching original design) */}
              {/* Start square node */}
              <rect x="15" y="175" width="10" height="10" fill="#4a5568" rx="2" />

              {/* Photoshop Node (x: 180, y: 85) */}
              <circle cx="180" cy="85" r="5" fill="#a0aec0" stroke="#4a154b" strokeWidth="2" />

              {/* Illustrator Node (x: 360, y: 115) */}
              <circle cx="360" cy="115" r="5.5" fill="#718096" stroke="#c13584" strokeWidth="2" />

              {/* Premiere Pro Node (x: 620, y: 140) */}
              <circle cx="620" cy="140" r="5" fill="#a0aec0" stroke="#e1306c" strokeWidth="2" />

              {/* After Effects Node (x: 820, y: 145) */}
              <circle cx="820" cy="145" r="6" fill="#718096" stroke="#833ab4" strokeWidth="2" />
            </svg>
          </div>

          {/* Dynamic 5-column software grid */}
          <div className="relative z-10 grid grid-cols-5 gap-3 sm:gap-6 items-end">
            {SOFTWARE_SKILLS.map((skill) => (
              <div key={skill.id} className="flex flex-col items-center group">
                
                {/* Dynamic Icon with smooth interactive hover */}
                <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2.5 group-hover:scale-108 cursor-pointer">
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="max-h-full max-w-full object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_6px_20px_rgba(255,255,255,0.25)] transition-all" 
                  />
                </div>

                {/* Progress bar and Level Label */}
                <div className="w-full mt-4 flex flex-col items-center">
                  <div className="w-full h-[3.5px] rounded-full bg-neutral-800/90 overflow-hidden relative">
                    <div className={`h-full w-full bg-gradient-to-r ${skill.barColor} rounded-full`}></div>
                    {/* Shimmer light beam running across the skill bar on hover */}
                    <div className="absolute inset-0 bg-white/40 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-sans font-semibold tracking-wider text-neutral-400 group-hover:text-white transition-colors uppercase mt-2 text-center select-none">
                    {skill.level}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
