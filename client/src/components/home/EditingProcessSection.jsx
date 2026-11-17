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
      case 'hyperspeed-warp':
        return 'animate-hyperspeed-warp';
      case 'classic-road':
        return 'animate-road-middle-track';
      default:
        // By default or for other atmospheric background modes, road remains a clean, elegant still luxury track
        return '';
    }
  };

  return (
    <section id="process" className="mb-24 pt-4">
      <div 
        className={`relative w-full rounded-3xl overflow-hidden border border-[#232323] shadow-2xl bg-[#121212] p-6 sm:p-12 lg:p-14 transition-all duration-700 ${
          animationEnabled && animationStyle === 'chroma-drift' ? 'animate-chroma-drift' : ''
        }`}
        style={{
          backgroundImage: animationEnabled && animationStyle === 'chroma-drift'
            ? 'linear-gradient(-45deg, #121212, #1b160a, #0a171e, #180e1f, #141414)'
            : undefined
        }}
      >
        
        {/* Subtle background grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFE379 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

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

        {/* ================= INTERACTIVE 6-STEP WORKFLOW TIMELINE CONTAINER ================= */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* ========================================================
              DYNAMIC BACKGROUND SCENARIO REPLACING HIGHWAY
              When an animation style is chosen, highway is REPLACED by that specific scenario!
             ======================================================== */}

          {/* 1. SCENARIO A: CLASSIC HIGHWAY (Only rendered when classic-road is selected) */}
          {animationStyle === 'classic-road' && (
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

                {/* Road Deep Shadow */}
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

                {/* Concrete Road Curb */}
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

                {/* Outer Road Edge Lines */}
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

                {/* Smooth Asphalt Paved Surface */}
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

                {/* Center Lane Track */}
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
                  className={animationEnabled ? 'animate-road-middle-track' : ''}
                  filter="url(#yellowGlow)"
                />
              </svg>
            </div>
          )}

          {/* 2. SCENARIO B: LUXURY BOKEH & CINEMATIC LIGHT ORBS (Replaces Highway) */}
          {animationStyle === 'golden-bokeh' && (
            <div className="absolute -inset-10 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
              {/* Golden Constellation Connector Lines between steps */}
              <svg className="w-full h-full absolute inset-0 opacity-40 hidden md:block" viewBox="0 0 1000 480" fill="none">
                <path
                  d="M 160 120 Q 330 240 500 120 T 840 120"
                  stroke="url(#bokehLineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M 160 380 Q 330 260 500 380 T 840 380"
                  stroke="url(#bokehLineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <defs>
                  <linearGradient id="bokehLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE379" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#FFE379" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFE379" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Luminous Golden Orbs */}
              <div className={`absolute top-1/4 left-1/12 w-72 h-72 rounded-full bg-[#FFE379]/15 blur-3xl ${animationEnabled ? 'animate-bokeh-orb-1' : ''}`} />
              <div className={`absolute bottom-1/4 right-1/12 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl ${animationEnabled ? 'animate-bokeh-orb-2' : ''}`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] rounded-full bg-[#FFE379]/10 blur-[90px]" />
            </div>
          )}

          {/* 3. SCENARIO C: 35MM CONTINUOUS FILMSTRIP STREAM (Replaces Highway) */}
          {animationStyle === 'film-reel-ribbon' && (
            <div className="absolute -inset-x-8 -top-4 -bottom-4 pointer-events-none overflow-hidden flex flex-col justify-between py-1" style={{ zIndex: 0 }}>
              {/* Top Filmstrip Track */}
              <div className="w-[200%] flex space-x-3 opacity-30 select-none">
                <div className={`flex space-x-3 w-full ${animationEnabled ? 'animate-film-reel-scroll' : ''}`}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-20 h-14 rounded-lg border border-neutral-700 bg-neutral-900/90 shrink-0 flex flex-col justify-between p-1 shadow-lg">
                      <div className="flex justify-between px-0.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Film className="w-3.5 h-3.5 text-[#FFE379]/70" />
                        <span className="text-[7px] font-mono text-neutral-400">FRAME {i + 1}</span>
                      </div>
                      <div className="flex justify-between px-0.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting Film Ribbon Between Rows */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFE379]/40 to-transparent my-auto" />

              {/* Bottom Filmstrip Track */}
              <div className="w-[200%] flex space-x-3 opacity-30 select-none">
                <div className={`flex space-x-3 w-full ${animationEnabled ? 'animate-film-reel-scroll' : ''}`} style={{ animationDirection: 'reverse' }}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-20 h-14 rounded-lg border border-neutral-700 bg-neutral-900/90 shrink-0 flex flex-col justify-between p-1 shadow-lg">
                      <div className="flex justify-between px-0.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <Play className="w-3 h-3 text-[#FFE379]/70 fill-current" />
                        <span className="text-[7px] font-mono text-neutral-400">CUT #{i + 1}</span>
                      </div>
                      <div className="flex justify-between px-0.5">
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#FFE379]/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. SCENARIO D: 3D CYBER WIREFRAME FLOOR & DIGITAL MATRIX (Replaces Highway) */}
          {animationStyle === 'cyber-grid' && (
            <div className="absolute -inset-x-8 -inset-y-6 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
              {/* Flowing 3D Perspective Plane */}
              <div className="absolute inset-0 opacity-40">
                <div 
                  className={`w-full h-full ${animationEnabled ? 'animate-cyber-grid' : ''}`}
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255, 227, 121, 0.35) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255, 227, 121, 0.35) 1.5px, transparent 1.5px)',
                    backgroundSize: '48px 48px',
                    transformOrigin: '50% 100%'
                  }}
                />
              </div>
              {/* Top & Bottom Fog Blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]" />
            </div>
          )}

          {/* 5. SCENARIO E: MULTI-TRACK AUDIO FREQUENCY STUDIO (Replaces Highway) */}
          {animationStyle === 'equalizer-wave' && (
            <div className="absolute -inset-x-6 -inset-y-4 pointer-events-none overflow-hidden flex flex-col justify-center space-y-8 opacity-30" style={{ zIndex: 0 }}>
              {/* Top Audio Waveform Channel */}
              <div className="flex items-center justify-between w-full px-2 h-16">
                {[45, 80, 25, 95, 60, 40, 100, 70, 30, 85, 55, 90, 40, 75, 100, 35, 65, 80, 45, 90, 60, 30, 85, 100, 40, 75, 55, 90, 35, 65, 80, 50].map((h, i) => (
                  <div
                    key={`top-${i}`}
                    className={`w-1 sm:w-1.5 bg-gradient-to-t from-[#FFE379] via-amber-400 to-transparent rounded-full ${animationEnabled ? 'animate-audio-track-pulse' : ''}`}
                    style={{
                      height: `${h}%`,
                      animationDelay: `${(i % 10) * 0.12}s`,
                      animationDuration: `${1.2 + (i % 6) * 0.18}s`
                    }}
                  />
                ))}
              </div>

              {/* Center DAW Master Beat Pulse Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFE379]/60 to-transparent relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full bg-[#181818] border border-[#FFE379]/40 text-[#FFE379] text-[9px] font-mono">
                  MASTER AUDIO BUS • 48 kHz / 24-BIT
                </div>
              </div>

              {/* Bottom Audio Waveform Channel */}
              <div className="flex items-center justify-between w-full px-2 h-16">
                {[30, 65, 90, 50, 75, 100, 40, 85, 60, 35, 95, 70, 45, 80, 55, 100, 35, 75, 60, 40, 90, 65, 30, 85, 50, 100, 45, 75, 60, 35, 80, 55].map((h, i) => (
                  <div
                    key={`bot-${i}`}
                    className={`w-1 sm:w-1.5 bg-gradient-to-b from-[#FFE379] via-amber-400 to-transparent rounded-full ${animationEnabled ? 'animate-audio-track-pulse' : ''}`}
                    style={{
                      height: `${h}%`,
                      animationDelay: `${(i % 8) * 0.14}s`,
                      animationDuration: `${1.4 + (i % 5) * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 6. SCENARIO F: MULTI-CHROMA COLOR GRADING ATMOSPHERE (Replaces Highway) */}
          {animationStyle === 'chroma-drift' && (
            <div className="absolute -inset-10 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
              {/* Luminous Neon Gradient Nodes connecting the cards */}
              <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
              <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#FFE379]/15 blur-[100px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/10 blur-[120px]" />
              
              {/* Subtle Tech Laser Connection Grid */}
              <svg className="w-full h-full absolute inset-0 opacity-20 hidden md:block" viewBox="0 0 1000 480" fill="none">
                <line x1="160" y1="120" x2="500" y2="120" stroke="#FFE379" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="500" y1="120" x2="840" y2="120" stroke="#FFE379" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="160" y1="380" x2="500" y2="380" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="500" y1="380" x2="840" y2="380" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="500" y1="120" x2="500" y2="380" stroke="#C084FC" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          )}

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
