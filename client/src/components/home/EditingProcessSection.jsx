import React, { useState } from 'react';
import { 
  Play, 
  ClipboardList, 
  FolderArchive, 
  Film, 
  Scissors, 
  SlidersHorizontal, 
  CheckCircle2,
  Video
} from 'lucide-react';
import { useSiteSettings } from '../../context/SettingsContext';

const DEFAULT_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Planning',
    desc: 'Understand your goals, audience and creative vision.',
    iconComp: ClipboardList,
    accent: '#FFE379',
    position: 'top',
    nodeIndex: 0,
  },
  {
    step: '02',
    title: 'Footage Organization',
    desc: 'Ingest, back up and organize all raw footage for a smooth editing workflow.',
    iconComp: FolderArchive,
    accent: '#FFE379',
    position: 'bottom',
    nodeIndex: 1,
  },
  {
    step: '03',
    title: 'Rough Cut & Story Build',
    desc: 'Arrange the best shots and craft the initial flow of the story.',
    iconComp: Film,
    accent: '#FFE379',
    position: 'top',
    nodeIndex: 2,
  },
  {
    step: '04',
    title: 'Editing & Polishing',
    desc: 'Refine the cut, add transitions, graphics and maintain a strong narrative.',
    iconComp: Scissors,
    accent: '#FFE379',
    position: 'bottom',
    nodeIndex: 3,
  },
  {
    step: '05',
    title: 'Color, Sound & Refinement',
    desc: 'Enhance the visuals with color grading, sound design and motion graphics.',
    iconComp: SlidersHorizontal,
    accent: '#FFE379',
    position: 'top',
    nodeIndex: 4,
  },
  {
    step: '06',
    title: 'Final Review & Delivery',
    desc: 'Review, make necessary revisions and deliver a ready-to-publish video.',
    iconComp: CheckCircle2,
    accent: '#FFE379',
    position: 'bottom',
    nodeIndex: 5,
  },
];

export default function EditingProcessSection() {
  const [activeStep, setActiveStep] = useState(2); // default step 03 active
  const { settings } = useSiteSettings();

  const processConfig = settings.homeContent?.process || {};

  const badgeText = processConfig.badge || 'MY WORKFLOW';
  const title1 = processConfig.titleLine1 || 'My';
  const title2 = processConfig.titleLine2 || 'Editing Process';
  const subtitle = processConfig.subtitle || 'FROM RAW FOOTAGE TO A COMPELLING FINAL VIDEO.';
  const bottomBannerText = processConfig.bottomBannerText || 'A structured, creative and detail-focused process that turns your raw footage into engaging, viral video content.';
  const animationEnabled = processConfig.animationEnabled !== false;
  const animationStyle = processConfig.animationStyle || 'classic-road';

  // Merge configured steps with defaults for icons & position
  const rawSteps = processConfig.steps && processConfig.steps.length > 0
    ? processConfig.steps
    : DEFAULT_PROCESS_STEPS;

  const mergedSteps = rawSteps.map((s, idx) => {
    const fallback = DEFAULT_PROCESS_STEPS[idx] || DEFAULT_PROCESS_STEPS[0];
    return {
      ...fallback,
      ...s,
      iconComp: fallback.iconComp
    };
  });

  // Determine dynamic animation class for highway center lane
  const getHighwayAnimationClass = () => {
    if (!animationEnabled) return '';
    switch (animationStyle) {
      case 'neon-cyber':
        return 'animate-neon-cyber';
      case 'filmstrip-sprocket':
        return 'animate-filmstrip-sprocket';
      case 'electric-pulse':
        return 'animate-electric-pulse';
      case 'cosmic-drift':
        return 'animate-cosmic-drift';
      case 'hyperspeed-warp':
        return 'animate-hyperspeed-warp';
      case 'timeline-playhead':
        return 'animate-neon-cyber';
      case 'audio-beats':
        return 'animate-electric-pulse';
      case 'chroma-glitch':
        return 'animate-road-middle-track animate-chroma-glitch';
      case 'film-grain-dust':
        return 'animate-filmstrip-sprocket';
      case 'golden-bokeh':
        return 'animate-cosmic-drift';
      case 'classic-road':
      default:
        return 'animate-road-middle-track';
    }
  };

  return (
    <section id="process" className="mb-24 pt-4">
      <div className={`relative w-full rounded-3xl overflow-hidden border border-[#232323] shadow-2xl bg-[#121212] p-6 sm:p-12 lg:p-14 ${
        animationEnabled && animationStyle === 'chroma-glitch' ? 'animate-chroma-glitch' : ''
      }`}>
        
        {/* Subtle background grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFE379 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Dynamic Creative Overlay Layer based on Selected Animation */}
        {animationEnabled && (
          <>
            {/* 1. Timecode Playhead Scanline (Sweeping razor line across timeline) */}
            {(animationStyle === 'timeline-playhead' || animationStyle === 'neon-cyber') && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#FFE379] to-transparent shadow-[0_0_12px_#FFE379] animate-timeline-playhead">
                  <div className="w-2.5 h-2.5 -ml-1 bg-[#FFE379] rounded-sm transform rotate-45 shadow" />
                </div>
              </div>
            )}

            {/* 2. Audio Wave Beats Radar Glow */}
            {(animationStyle === 'audio-beats' || animationStyle === 'electric-pulse') && (
              <div className="absolute -inset-10 pointer-events-none rounded-3xl animate-audio-beats z-0" />
            )}

            {/* 3. Golden Bokeh Particle Spheres */}
            {(animationStyle === 'golden-bokeh' || animationStyle === 'cosmic-drift') && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/6 w-48 h-48 rounded-full bg-[#FFE379]/10 blur-2xl animate-bokeh-1" />
                <div className="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full bg-[#FFE379]/8 blur-3xl animate-bokeh-2" />
                <div className="absolute top-2/3 left-1/2 w-36 h-36 rounded-full bg-amber-500/10 blur-xl animate-bokeh-1" />
              </div>
            )}

            {/* 4. Film Grain & Cinematic Dust Flicker */}
            {animationStyle === 'film-grain-dust' && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 z-0 animate-film-grain"
                style={{
                  backgroundImage: 'radial-gradient(circle, #FFE379 0.8px, transparent 0.8px), radial-gradient(circle, #FFFFFF 0.5px, transparent 0.5px)',
                  backgroundSize: '16px 16px, 24px 24px',
                  backgroundPosition: '0 0, 8px 8px'
                }}
              />
            )}
          </>
        )}

        {/* 1. Floating Video Editor Monitor UI (Top-Left) */}
        <div className="absolute top-6 left-6 w-48 bg-[#161616]/85 backdrop-blur-md border border-[#2e2e2e] rounded-xl p-2.5 shadow-2xl opacity-75 pointer-events-none transform -rotate-6 hidden lg:block">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-800">
            <div className="flex space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[9px] font-mono text-[#FFE379]">REC 00:04:12</span>
          </div>
          <div className="space-y-1">
            <div className="h-2 rounded bg-neutral-800 overflow-hidden flex">
              <div className="w-3/5 bg-[#FFE379]/60 h-full rounded-l" />
              <div className="w-1/4 bg-[#FFE379]/30 h-full ml-1 rounded-r" />
            </div>
            <div className="h-1.5 rounded bg-neutral-800 overflow-hidden flex">
              <div className="w-1/3 bg-blue-500/50 h-full rounded-l" />
              <div className="w-1/2 bg-purple-500/50 h-full ml-1 rounded-r" />
            </div>
          </div>
        </div>

        {/* 2. Floating Film Strip Ribbon (Top-Right) */}
        <div className="absolute top-6 right-6 w-44 bg-[#161616]/85 backdrop-blur-md border border-[#2e2e2e] rounded-xl p-2 shadow-2xl opacity-75 pointer-events-none transform rotate-6 hidden lg:block">
          <div className="flex items-center justify-between px-1 mb-1 text-[8px] font-mono text-neutral-400">
            <span>24 FPS</span>
            <span className="text-[#FFE379]">4K PRORES</span>
          </div>
          <div className="flex space-x-1.5 overflow-hidden py-1">
            {[1, 2, 3].map((f) => (
              <div key={f} className="w-11 h-14 bg-neutral-800 rounded border border-neutral-700/60 relative flex flex-col justify-between p-0.5">
                <div className="flex justify-between">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                </div>
                <Film className="w-3.5 h-3.5 text-[#FFE379]/70 mx-auto" />
                <div className="flex justify-between">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <div className="relative z-10 text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1F1F1F] border border-[#2E2E2E] shadow-lg mb-4">
            <Play className="w-3 h-3 text-[#FFE379] fill-current" />
            <span 
              className="text-xs uppercase tracking-widest text-[#FFE379] font-semibold"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {badgeText}
            </span>
          </div>

          <div className="relative inline-block px-8 py-2">
            <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFE379]" />
            <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFE379]" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFE379]" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFE379]" />

            <h2 
              className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white uppercase tracking-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {title1} <span className="text-[#FFE379]">{title2}</span>
            </h2>
          </div>

          <p 
            className="text-xs sm:text-sm text-neutral-400 uppercase tracking-[0.25em] mt-3 font-medium"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>

        {/* ================= INTERACTIVE 6-STEP WORKFLOW TIMELINE WITH S-CURVE HIGHWAY ================= */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* ===== BACKGROUND HIGHWAY SVG ===== */}
          <div
            className="absolute -inset-x-6 -top-6 -bottom-6 pointer-events-none hidden md:block"
            style={{ zIndex: 0 }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1020 520"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="roadAtmosphere" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="mountainRoadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E1E1E" />
                  <stop offset="50%" stopColor="#151515" />
                  <stop offset="100%" stopColor="#1C1C1C" />
                </linearGradient>
              </defs>

              {/* 1. Road Deep Shadow */}
              <path
                d="M -90 40 
                   C -20 50, 80 65, 170 95
                   C 260 125, 275 320, 195 385
                   C 135 435, 120 480, 215 470
                   C 310 460, 385 240, 480 120
                   C 530 60, 610 65, 540 220
                   C 480 340, 420 450, 520 440
                   C 630 430, 720 220, 810 115
                   C 865 50, 970 80, 905 270
                   C 850 420, 780 445, 875 425
                   C 960 410, 1020 415, 1110 425"
                stroke="#050505"
                strokeWidth="84"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />

              {/* 2. Concrete Road Curb */}
              <path
                d="M -90 40 
                   C -20 50, 80 65, 170 95
                   C 260 125, 275 320, 195 385
                   C 135 435, 120 480, 215 470
                   C 310 460, 385 240, 480 120
                   C 530 60, 610 65, 540 220
                   C 480 340, 420 450, 520 440
                   C 630 430, 720 220, 810 115
                   C 865 50, 970 80, 905 270
                   C 850 420, 780 445, 875 425
                   C 960 410, 1020 415, 1110 425"
                stroke="#2B2B2B"
                strokeWidth="70"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Outer Road Edge Lines */}
              <path
                d="M -90 40 
                   C -20 50, 80 65, 170 95
                   C 260 125, 275 320, 195 385
                   C 135 435, 120 480, 215 470
                   C 310 460, 385 240, 480 120
                   C 530 60, 610 65, 540 220
                   C 480 340, 420 450, 520 440
                   C 630 430, 720 220, 810 115
                   C 865 50, 970 80, 905 270
                   C 850 420, 780 445, 875 425
                   C 960 410, 1020 415, 1110 425"
                stroke="#FFFFFF"
                strokeWidth="62"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />

              {/* 4. Smooth Asphalt Paved Surface */}
              <path
                d="M -90 40 
                   C -20 50, 80 65, 170 95
                   C 260 125, 275 320, 195 385
                   C 135 435, 120 480, 215 470
                   C 310 460, 385 240, 480 120
                   C 530 60, 610 65, 540 220
                   C 480 340, 420 450, 520 440
                   C 630 430, 720 220, 810 115
                   C 865 50, 970 80, 905 270
                   C 850 420, 780 445, 875 425
                   C 960 410, 1020 415, 1110 425"
                stroke="url(#mountainRoadGrad)"
                strokeWidth="58"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 5. Center Lane Track with Selectable Animation */}
              <path
                d="M -90 40 
                   C -20 50, 80 65, 170 95
                   C 260 125, 275 320, 195 385
                   C 135 435, 120 480, 215 470
                   C 310 460, 385 240, 480 120
                   C 530 60, 610 65, 540 220
                   C 480 340, 420 450, 520 440
                   C 630 430, 720 220, 810 115
                   C 865 50, 970 80, 905 270
                   C 850 420, 780 445, 875 425
                   C 960 410, 1020 415, 1110 425"
                stroke="#FFE379"
                strokeWidth="4"
                strokeDasharray="20 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={getHighwayAnimationClass()}
                filter="url(#yellowGlow)"
              />
            </svg>
          </div>

          {/* Top Row Cards (Steps 01, 03, 05) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24">
            {mergedSteps.filter(s => s.position === 'top').map((item) => {
              const isActive = activeStep === item.nodeIndex;
              const IconComp = item.iconComp;
              const hasCustomIcon = Boolean(item.icon);

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.nodeIndex)}
                  className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-[#1C1C1C] border-[#FFE379] shadow-[0_15px_35px_rgba(255,227,121,0.18)] scale-[1.02]'
                      : 'bg-[#161616] border-[#262626] hover:border-[#FFE379]/50 hover:bg-[#1A1A1A] shadow-2xl'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-[#FFE379] transition">
                      STEP {item.step}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1 transition-colors ${
                      isActive ? 'bg-[#FFE379]/15 text-[#FFE379]' : 'bg-[#202020] text-neutral-400 group-hover:text-[#FFE379]'
                    }`}>
                      {hasCustomIcon ? (
                        <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                      ) : (
                        <IconComp className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 transition-colors group-hover:text-[#FFE379]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal whitespace-pre-line"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row Cards (Steps 02, 04, 06) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {mergedSteps.filter(s => s.position === 'bottom').map((item) => {
              const isActive = activeStep === item.nodeIndex;
              const IconComp = item.iconComp;
              const hasCustomIcon = Boolean(item.icon);

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.nodeIndex)}
                  className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-[#1C1C1C] border-[#FFE379] shadow-[0_15px_35px_rgba(255,227,121,0.18)] scale-[1.02]'
                      : 'bg-[#161616] border-[#262626] hover:border-[#FFE379]/50 hover:bg-[#1A1A1A] shadow-xl'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-[#FFE379] transition">
                      STEP {item.step}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1 transition-colors ${
                      isActive ? 'bg-[#FFE379]/15 text-[#FFE379]' : 'bg-[#202020] text-neutral-400 group-hover:text-[#FFE379]'
                    }`}>
                      {hasCustomIcon ? (
                        <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                      ) : (
                        <IconComp className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 transition-colors group-hover:text-[#FFE379]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal whitespace-pre-line"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= BOTTOM BANNER WITH AUDIO WAVEFORM ================= */}
        <div className="relative z-10 max-w-3xl mx-auto mt-14 bg-gradient-to-r from-[#1C1C1C] via-[#222222] to-[#1C1C1C] border border-[#2E2E2E] rounded-2xl py-4 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#FFE379]/15 text-[#FFE379] flex items-center justify-center shrink-0 border border-[#FFE379]/30">
              <Video className="w-4 h-4" />
            </div>
            <p 
              className="text-xs sm:text-[13px] text-neutral-300 leading-snug font-normal"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {bottomBannerText}
            </p>
          </div>

          {/* Animated Equalizer Wave */}
          <div className="flex items-center space-x-1 shrink-0 h-6">
            {[40, 75, 100, 60, 85, 45, 90, 65, 80, 50].map((h, i) => (
              <span 
                key={i} 
                className="w-1 bg-[#FFE379] rounded-full animate-pulse"
                style={{ 
                  height: `${h}%`,
                  animationDuration: `${0.6 + (i % 4) * 0.25}s`,
                  animationDelay: `${i * 0.08}s`
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
