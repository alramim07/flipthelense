import React from 'react';
import { 
  Film, 
  Camera, 
  Scissors, 
  Layers, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Play, 
  Calendar, 
  Building2, 
  Video,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SKILLS = [
  { name: 'ADOBE PREMIERE PRO', percent: 95 },
  { name: 'ADOBE AFTER EFFECT', percent: 85 },
  { name: '3D MODELLING', percent: 50 },
  { name: 'POST-PRODUCTION TECHNIQUES', percent: 100 }
];

const SPECIALTIES = [
  {
    icon: Film,
    title: 'CINEMATIC WEDDING FILMS',
    subtitle: 'Emotional Storytelling',
    desc: 'Crafting non-linear, emotionally captivating wedding teasers and full-length feature films with bespoke pacing, speed ramps, and high-fidelity soundscapes.'
  },
  {
    icon: Video,
    title: 'COMMERCIALS & BRAND REELS',
    subtitle: 'High-Conversion Media',
    desc: 'Dynamic pacing, punchy typography, and trending motion design tailored to capture instant attention on Instagram Reels, YouTube Shorts, and TVC campaigns.'
  },
  {
    icon: Layers,
    title: 'COLOR SCIENCE & LOOK DEV',
    subtitle: 'ACES & DaVinci Resolve',
    desc: 'Creating custom film-emulation LUTs, preserving organic skin tones, balancing multi-camera sensor variance, and delivering consistent cinematic mood.'
  },
  {
    icon: Scissors,
    title: 'POST-PRODUCTION & VFX',
    subtitle: 'Seamless Audio/Visual Sync',
    desc: 'Audio restoration, foley effects, rhythmic montage cuts, object masking, smooth warp transitions, and sophisticated visual enhancements.'
  }
];

const WORK_EXPERIENCE = [
  {
    period: '2022 - PRESENT',
    role: 'Senior Cinematographer & Lead Video Editor',
    company: 'FlipTheLense Studio / Freelance',
    location: 'Dhaka, Bangladesh',
    achievements: [
      'Directed and finalized over 80+ high-end wedding films and 150+ commercial reels.',
      'Established high-speed proxy workflows and automated post-production pipelines.',
      'Achieved a 99% 5-star client satisfaction rating across domestic and global productions.'
    ]
  },
  {
    period: '2020 - 2022',
    role: 'Commercial Video Editor & Colorist',
    company: 'Creative Media Agency',
    location: 'Dhaka, Bangladesh',
    achievements: [
      'Edited narrative commercials for fashion, corporate, and culinary brands.',
      'Managed color grading workflows for multi-cam shoots using DaVinci Resolve and Premiere Pro.',
      'Collaborated closely with directors and audio engineers to hit strict broadcast deadlines.'
    ]
  },
  {
    period: '2019 - 2020',
    role: 'Assistant Cinematographer & DIT',
    company: 'Independent Film Group',
    location: 'Dhaka, Bangladesh',
    achievements: [
      'Handled on-location camera rigs, lighting setups, gimbal tracking, and dual-system audio recording.',
      'Organized and ingested raw footage, created rough cut assemblies, and delivered daily rushes.'
    ]
  }
];

const TOOLS_GEAR = [
  { category: 'EDITING & COLOR', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Wondershare Filmora', 'CapCut Pro'] },
  { category: 'DESIGN & GRAPHICS', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics Templates', 'Blender 3D Basics'] },
  { category: 'AUDIO SUITE', items: ['Adobe Audition', 'iZotope RX Noise Reduction', 'Foley Sound Design', 'Spatial Audio Mixing'] },
  { category: 'CAMERA & HARDWARE', items: ['Sony Alpha Series (4K 10-bit)', 'DJI Ronin Gimbal Stabilizers', 'Anamorphic & Prime Glass', 'Wireless Audio Transmitters'] }
];

export default function AboutUs() {
  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen">
      
      {/* ================= 1. HERO BANNER (EXACT IMAGE MATCH) ================= */}
      <section className="relative w-full h-[280px] sm:h-[350px] overflow-hidden border-b border-neutral-900 flex items-center">
        {/* Background dark cinematic silhouette photo */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1600&q=80" 
            alt="Photographer holding camera in mist" 
            className="w-full h-full object-cover opacity-45 filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        {/* Content Container: Left-aligned matching reference image */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10">
          <div className="space-y-1.5">
            <h1 
              className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-white uppercase flex items-center space-x-3"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              <span>MY</span>
              <span className="text-[#f5d77f]">RESUME</span>
            </h1>

            <div className="text-[11px] sm:text-xs text-neutral-400 font-sans tracking-wide">
              <span>Home</span>
              <span className="mx-1.5 text-neutral-500">/</span>
              <span className="text-neutral-300">Resume</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. QUOTE STATEMENT & SCRIPT SIGNATURE ================= */}
      <section className="py-16 sm:py-20 px-6 max-w-3xl mx-auto text-center">
        <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed font-sans italic tracking-normal max-w-2xl mx-auto">
          "Every frame is a chance to move an audience. Filmmaking isn't just about putting clips together—it is about rhythm, emotional timing, and sculpting light so memories can live forever."
        </p>

        {/* Signature */}
        <div className="mt-8 flex flex-col items-center">
          <div 
            className="text-3xl sm:text-4xl text-neutral-300 tracking-wide select-none"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Parvej Mosharrof
          </div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-300 mt-2">
            PARVEJ MOSHARROF POLLOB
          </h4>
          <span className="text-[10px] text-neutral-500 tracking-wider uppercase mt-0.5">
            Videography / Editor
          </span>
        </div>
      </section>

      {/* ================= 3. PROFILE BIO & SKILLS PROGRESS BARS ================= */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Photographer Portrait with Hat */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-none overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                alt="Parvej Mosharrof Pollob with hat" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Bio & Skills Progress Bars */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-neutral-500 font-mono uppercase">
                SINCE 2022
              </span>
              <h2 
                className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white uppercase tracking-tight mt-1"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
              >
                HELLO, IM PARVEJ MOSHARROF POLLOB
              </h2>
            </div>

            <p className="text-neutral-400 text-xs sm:text-[12.5px] leading-relaxed">
              For the past 4.5+ years, I have worked across full production pipelines—from shooting on set with cinema gear to final master delivery. My goal is to deliver clean visual clarity, immersive color profiles, and punchy edits that stand out in any feed or theatre screen.
            </p>

            {/* MY SKILLS SECTION */}
            <div className="pt-2 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                MY SKILLS
              </h3>

              <div className="space-y-3">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    {/* Bar Background Track */}
                    <div className="relative w-full h-7 bg-[#1c1c1c] rounded-none overflow-hidden flex items-center justify-between px-3.5">
                      {/* Yellow Fill Bar */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-[#f5d77f] rounded-none shadow-sm"
                        style={{ width: `${skill.percent}%` }}
                      />
                      
                      {/* Skill Name Overlay (Always inside yellow bar: Crisp Pure Black) */}
                      <span className="relative z-10 text-[11px] font-black tracking-wider text-black uppercase">
                        {skill.name}
                      </span>

                      {/* Percentage Overlay: If bar covers right edge (like 100%), text is black; if not, crisp bright gold/white */}
                      <span 
                        className={`relative z-10 text-[11px] font-extrabold tracking-wide ${
                          skill.percent >= 98 
                            ? 'text-black' 
                            : 'text-[#f5d77f] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                        }`}
                      >
                        {skill.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 4. MY SPECIALTIES BANNER ================= */}
      <section className="relative w-full h-[240px] sm:h-[280px] overflow-hidden border-t border-b border-neutral-900 flex items-center justify-center text-center mt-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80" 
            alt="Cinematic landscape" 
            className="w-full h-full object-cover opacity-25 filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black" />
        </div>

        <div className="relative z-10 px-6 max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] uppercase tracking-widest text-[#f5d77f] font-mono font-bold">
            FLIPTHELENSE STUDIO
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            MY SPECIALTIES
          </h2>
          <p className="text-neutral-400 text-xs sm:text-[12px] leading-relaxed max-w-md mx-auto">
            Comprehensive cinematography and post-production capabilities delivered to the highest standard.
          </p>
        </div>
      </section>

      {/* ================= 5. SPECIALTIES CARDS GRID ================= */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SPECIALTIES.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div 
                key={i}
                className="bg-[#121212] border border-neutral-800/80 p-6 flex flex-col justify-between hover:border-[#f5d77f]/50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="w-11 h-11 bg-neutral-900 border border-neutral-800 text-[#f5d77f] flex items-center justify-center mb-5 group-hover:bg-[#f5d77f] group-hover:text-black transition-all">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 
                    className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-[#f5d77f] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                  >
                    {spec.title}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono block mt-1">
                    {spec.subtitle}
                  </span>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-3">
                    {spec.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 6. CAREER EXPERIENCE ROADMAP ================= */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-widest text-[#f5d77f] font-mono font-bold">
            CAREER PATHWAY
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            WORK EXPERIENCE
          </h2>
        </div>

        <div className="space-y-6">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div 
              key={idx}
              className="bg-[#121212] border border-neutral-800/80 p-6 sm:p-7 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 mb-4 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-0.5">
                    <span className="text-[#f5d77f] font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 bg-neutral-900 border border-neutral-800 text-[#f5d77f] text-[11px] font-mono font-bold w-fit">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-300">
                {exp.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start space-x-2">
                    <span className="text-[#f5d77f] text-sm leading-none mt-0.5">▹</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 7. PRODUCTION GEAR & SOFTWARE STACK ================= */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-widest text-[#f5d77f] font-mono font-bold">
            PRODUCTION ARSENAL
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            GEAR & SOFTWARE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS_GEAR.map((item, i) => (
            <div key={i} className="bg-[#121212] border border-neutral-800 p-5 space-y-3">
              <h4 
                className="text-xs font-bold uppercase tracking-wider text-[#f5d77f] border-b border-neutral-800 pb-2"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
              >
                {item.category}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {item.items.map((gear, gIdx) => (
                  <li key={gIdx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f5d77f]" />
                    <span>{gear}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8. BOTTOM CALL TO ACTION ================= */}
      <section className="py-20 px-6 text-center border-t border-neutral-900 bg-gradient-to-b from-[#0e0e0e] to-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            LET'S CRAFT YOUR NEXT CINEMATIC PROJECT
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Ready to collaborate on weddings, high-converting commercials, or creative short-form videos? Let's turn your concept into reality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="/#footer-section" 
              className="bg-[#f5d77f] hover:bg-[#ebd074] text-black font-extrabold text-xs sm:text-sm px-8 py-3 rounded-none transition-all shadow-xl hover:scale-105 uppercase tracking-wider"
            >
              Contact Me Now
            </a>
            <Link 
              to="/portfolio" 
              className="bg-transparent hover:bg-white/5 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-none border border-neutral-700 transition-all hover:scale-105 uppercase tracking-wider"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
