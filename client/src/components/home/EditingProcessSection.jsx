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

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Planning',
    desc: 'Understand your goals, audience and creative vision.',
    icon: ClipboardList,
    accent: '#FFE379',
    position: 'top',
    nodeIndex: 0,
  },
  {
    step: '02',
    title: 'Footage Organization',
    desc: 'Ingest, back up and organize all raw footage for a smooth editing workflow.',
    icon: FolderArchive,
    accent: '#FFE379',
    position: 'bottom',
    nodeIndex: 1,
  },
  {
    step: '03',
    title: 'Rough Cut & Story Build',
    desc: 'Arrange the best shots and craft the initial flow of the story.',
    icon: Film,
    accent: '#FFE379',
    position: 'top',
    nodeIndex: 2,
  },
  {
    step: '04',
    title: 'Editing & Polishing',
    desc: 'Refine the cut, add transitions, graphics and maintain a strong narrative.',
    icon: Scissors,
    accent: '#FFE379',
    position: 'bottom',
    nodeIndex: 3,
  },
  {
    step: '05',
    title: 'Color, Sound & Refinement',
    desc: 'Enhance the visuals with color grading, sound design and motion graphics.',
    icon: SlidersHorizontal,
    accent: '#FFE379',
    position: 'top',
    nodeIndex: 4,
  },
  {
    step: '06',
    title: 'Final Review & Delivery',
    desc: 'Review, make necessary revisions and deliver a ready-to-publish video.',
    icon: CheckCircle2,
    accent: '#FFE379',
    position: 'bottom',
    nodeIndex: 5,
  },
];

export default function EditingProcessSection() {
  const [activeStep, setActiveStep] = useState(2); // default step 03 active

  return (
    <section id="process" className="mb-24 pt-4">
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#232323] shadow-2xl bg-[#121212] p-6 sm:p-12 lg:p-14">
        
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
              MY WORKFLOW
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
              My <span className="text-[#FFE379]">Editing Process</span>
            </h2>
          </div>

          <p 
            className="text-xs sm:text-sm text-neutral-400 uppercase tracking-[0.25em] mt-3 font-medium"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            FROM RAW FOOTAGE TO A COMPELLING FINAL VIDEO.
          </p>
        </div>

        {/* ================= INTERACTIVE 6-STEP WORKFLOW TIMELINE WITH S-CURVE HIGHWAY ================= */}
        {/*
          High-end layered Highway:
          - An absolute SVG background layer (z-0) spanning the full width and height of the 2-row layout plus overflow margins.
          - Cards stay on z-10 with fully opaque backgrounds so the highway flows seamlessly underneath them.
          - Path accurately traces:
            1. Starts top-left outside (-60, -30)
            2. Curves down into Card 01 center (170, 95)
            3. Curves down into Card 02 center (170, 395)
            4. Loops diagonally up-right passing between rows into Card 03 center (510, 95)
            5. Crests smoothly over top and descends into Card 05 center (850, 95)
            6. Sweeps downward-left into Card 04 center (510, 395)
            7. Channels across right through Card 06 center (850, 395)
            8. Exits smoothly off right boundary (1080, 420)
        */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* ===== BACKGROUND HIGHWAY SVG ===== */}
          <div
            className="absolute -inset-x-8 -top-8 -bottom-8 pointer-events-none hidden md:block"
            style={{ zIndex: 0 }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1020 500"
              fill="none"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Glow filter for realistic highway presence */}
                <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Path Definition:
                  P0: -50, -20 (enters from top-left outside)
                  P1: 170, 95 (Card 01)
                  P2: 170, 395 (Card 02)
                  P3: 510, 95 (Card 03)
                  P4: 850, 95 (Card 05)
                  P5: 510, 395 (Card 04)
                  P6: 850, 395 (Card 06)
                  P7: 1080, 410 (Exit right)
              */}

              {/* 
                Calculated Continuous Organic Highway Spline:
                - Realistic smooth highway turning radii (C1 continuity between curves)
                - Wide highway roadbed for impactful presence
              */}

              {/* 1. Road Outer Dark Foundation / Shadow */}
              <path
                d="M -60 -30 
                   C 30 10, 110 30, 165 95
                   C 215 155, 215 320, 165 390
                   C 120 455, 230 460, 310 395
                   C 390 330, 430 190, 505 95
                   C 570 15, 740 15, 845 95
                   C 920 155, 860 270, 755 330
                   C 665 385, 590 405, 505 405
                   C 430 405, 710 405, 845 405
                   C 930 405, 1000 410, 1100 415"
                stroke="#0A0A0A"
                strokeWidth="58"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />

              {/* 2. Asphalt Road Surface (Wider & Solid) */}
              <path
                d="M -60 -30 
                   C 30 10, 110 30, 165 95
                   C 215 155, 215 320, 165 390
                   C 120 455, 230 460, 310 395
                   C 390 330, 430 190, 505 95
                   C 570 15, 740 15, 845 95
                   C 920 155, 860 270, 755 330
                   C 665 385, 590 405, 505 405
                   C 430 405, 710 405, 845 405
                   C 930 405, 1000 410, 1100 415"
                stroke="#1B1B1B"
                strokeWidth="42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Left / Outer White Boundary Rail */}
              <path
                d="M -60 -30 
                   C 30 10, 110 30, 165 95
                   C 215 155, 215 320, 165 390
                   C 120 455, 230 460, 310 395
                   C 390 330, 430 190, 505 95
                   C 570 15, 740 15, 845 95
                   C 920 155, 860 270, 755 330
                   C 665 385, 590 405, 505 405
                   C 430 405, 710 405, 845 405
                   C 930 405, 1000 410, 1100 415"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeOpacity="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-10, -10)"
              />

              {/* 4. Right / Inner White Boundary Rail */}
              <path
                d="M -60 -30 
                   C 30 10, 110 30, 165 95
                   C 215 155, 215 320, 165 390
                   C 120 455, 230 460, 310 395
                   C 390 330, 430 190, 505 95
                   C 570 15, 740 15, 845 95
                   C 920 155, 860 270, 755 330
                   C 665 385, 590 405, 505 405
                   C 430 405, 710 405, 845 405
                   C 930 405, 1000 410, 1100 415"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeOpacity="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(10, 10)"
              />

              {/* 5. Animated Golden Center Lane Track */}
              <path
                d="M -60 -30 
                   C 30 10, 110 30, 165 95
                   C 215 155, 215 320, 165 390
                   C 120 455, 230 460, 310 395
                   C 390 330, 430 190, 505 95
                   C 570 15, 740 15, 845 95
                   C 920 155, 860 270, 755 330
                   C 665 385, 590 405, 505 405
                   C 430 405, 710 405, 845 405
                   C 930 405, 1000 410, 1100 415"
                stroke="#FFE379"
                strokeWidth="4"
                strokeDasharray="20 14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-road-middle-track"
              />
            </svg>
          </div>

          {/* Top Row Cards (Steps 01, 03, 05) — fully opaque, z-10 */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24">
            {PROCESS_STEPS.filter(s => s.position === 'top').map((item) => {
              const isActive = activeStep === item.nodeIndex;
              const IconComp = item.icon;
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
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md font-mono ${
                      isActive ? 'bg-[#FFE379] text-[#101010]' : 'bg-[#232323] text-neutral-400 group-hover:text-white'
                    }`}>{item.step}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#FFE379]/15 text-[#FFE379]' : 'bg-[#202020] text-neutral-400 group-hover:text-[#FFE379]'
                    }`}><IconComp className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 transition-colors group-hover:text-[#FFE379]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row Cards (Steps 02, 04, 06) — fully opaque, z-10 */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PROCESS_STEPS.filter(s => s.position === 'bottom').map((item) => {
              const isActive = activeStep === item.nodeIndex;
              const IconComp = item.icon;
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
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md font-mono ${
                      isActive ? 'bg-[#FFE379] text-[#101010]' : 'bg-[#232323] text-neutral-400 group-hover:text-white'
                    }`}>{item.step}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#FFE379]/15 text-[#FFE379]' : 'bg-[#202020] text-neutral-400 group-hover:text-[#FFE379]'
                    }`}><IconComp className="w-4 h-4" /></div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 transition-colors group-hover:text-[#FFE379]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed"
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
              A structured, creative and detail-focused process that turns your raw footage into engaging, viral video content.
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
