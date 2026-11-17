import React from 'react';
import { 
  Film, 
  Layers, 
  Scissors, 
  Video, 
  Sparkles, 
  Briefcase, 
  Cpu 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SettingsContext';

const DEFAULT_SPECIALTY_ICONS = [Film, Video, Layers, Scissors];

export default function AboutUs() {
  const { settings } = useSiteSettings();
  const about = settings?.aboutContent || {};

  const hero = about.hero || {
    titleLine1: 'MY',
    titleLine2: 'RESUME',
    breadcrumb: 'Home / Resume',
    bgImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1600&q=80'
  };

  const quote = about.quote || {
    statement: "Every frame is a chance to move an audience. Filmmaking isn't just about putting clips together—it is about rhythm, emotional timing, and sculpting light so memories can live forever.",
    authorScript: 'Parvej Mosharrof',
    authorName: 'PARVEJ MOSHARROF POLLOB',
    authorTitle: 'Videography / Editor'
  };

  const profile = about.profile || {
    badge: 'SINCE 2022',
    heading: 'HELLO, IM PARVEJ MOSHARROF POLLOB',
    bio: 'For the past 4.5+ years, I have worked across full production pipelines—from shooting on set with cinema gear to final master delivery. My goal is to deliver clean visual clarity, immersive color profiles, and punchy edits that stand out in any feed or theatre screen.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    skills: [
      { name: 'ADOBE PREMIERE PRO', percent: 95 },
      { name: 'ADOBE AFTER EFFECT', percent: 85 },
      { name: '3D MODELLING', percent: 50 },
      { name: 'POST-PRODUCTION TECHNIQUES', percent: 100 }
    ]
  };

  const specialties = about.specialties || {
    badge: 'FLIPTHELENSE STUDIO',
    title: 'MY SPECIALTIES',
    bgImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    items: [
      {
        title: 'CINEMATIC WEDDING FILMS',
        subtitle: 'Emotional Storytelling',
        desc: 'Crafting non-linear, emotionally captivating wedding teasers and full-length feature films with bespoke pacing, speed ramps, and high-fidelity soundscapes.'
      },
      {
        title: 'COMMERCIALS & BRAND REELS',
        subtitle: 'High-Conversion Media',
        desc: 'Dynamic pacing, punchy typography, and trending motion design tailored to capture instant attention on Instagram Reels, YouTube Shorts, and TVC campaigns.'
      },
      {
        title: 'COLOR SCIENCE & LOOK DEV',
        subtitle: 'ACES & DaVinci Resolve',
        desc: 'Creating custom film-emulation LUTs, preserving organic skin tones, balancing multi-camera sensor variance, and delivering consistent cinematic mood.'
      },
      {
        title: 'POST-PRODUCTION & VFX',
        subtitle: 'Seamless Audio/Visual Sync',
        desc: 'Audio restoration, foley effects, rhythmic montage cuts, object masking, smooth warp transitions, and sophisticated visual enhancements.'
      }
    ]
  };

  const experience = about.experience || {
    badge: 'CAREER PATHWAY',
    title: 'WORK EXPERIENCE',
    items: [
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
    ]
  };

  const toolsGear = about.toolsGear || about.tools || {
    badge: 'PRODUCTION ARSENAL',
    title: 'GEAR & SOFTWARE',
    categories: [
      { category: 'EDITING & COLOR', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Wondershare Filmora', 'CapCut Pro'] },
      { category: 'DESIGN & GRAPHICS', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics Templates', 'Blender 3D Basics'] },
      { category: 'AUDIO SUITE', items: ['Adobe Audition', 'iZotope RX Noise Reduction', 'Foley Sound Design', 'Spatial Audio Mixing'] },
      { category: 'CAMERA & HARDWARE', items: ['Sony Alpha Series (4K 10-bit)', 'DJI Ronin Gimbal Stabilizers', 'Anamorphic & Prime Glass', 'Wireless Audio Transmitters'] }
    ]
  };

  const cta = about.cta || {
    title: "LET'S CRAFT YOUR NEXT CINEMATIC PROJECT",
    subtitle: "Ready to collaborate on weddings, high-converting commercials, or creative short-form videos? Let's turn your concept into reality.",
    primaryBtnText: 'Contact Me Now',
    primaryBtnLink: '/contact',
    primaryBtnStyle: 'solid-gold',
    secondaryBtnText: 'Explore Portfolio',
    secondaryBtnLink: '/portfolio',
    secondaryBtnStyle: 'outline-white'
  };

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen">
      
      {/* ================= 1. HERO BANNER ================= */}
      <section className="relative w-full h-[280px] sm:h-[350px] overflow-hidden border-b border-neutral-900 flex items-center">
        <div className="absolute inset-0">
          <img 
            src={hero.bgImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-45 filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10">
          <div className="space-y-1.5">
            <h1 
              className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-white uppercase flex items-center space-x-3"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              <span>{hero.titleLine1}</span>
              <span className="text-[#f5d77f]">{hero.titleLine2}</span>
            </h1>

            <div className="text-[11px] sm:text-xs text-neutral-400 font-sans tracking-wide">
              {hero.breadcrumb}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. QUOTE STATEMENT & SCRIPT SIGNATURE ================= */}
      <section className="py-16 sm:py-20 px-6 max-w-3xl mx-auto text-center">
        <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed font-sans italic tracking-normal max-w-2xl mx-auto">
          "{quote.statement}"
        </p>

        {/* Signature */}
        <div className="mt-8 flex flex-col items-center">
          <div 
            className="text-3xl sm:text-4xl text-neutral-300 tracking-wide select-none"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {quote.authorScript}
          </div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-300 mt-2">
            {quote.authorName}
          </h4>
          <span className="text-[10px] text-neutral-500 tracking-wider uppercase mt-0.5">
            {quote.authorTitle}
          </span>
        </div>
      </section>

      {/* ================= 3. PROFILE BIO & SKILLS PROGRESS BARS ================= */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Portrait */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-none overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              <img 
                src={profile.img} 
                alt={quote.authorName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Bio & Skills Progress Bars */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-neutral-500 font-mono uppercase">
                {profile.badge}
              </span>
              <h2 
                className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white uppercase tracking-tight mt-1"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
              >
                {profile.heading}
              </h2>
            </div>

            <p className="text-neutral-400 text-xs sm:text-[12.5px] leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>

            {/* MY SKILLS SECTION */}
            <div className="pt-2 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                MY SKILLS
              </h3>

              <div className="space-y-3">
                {(profile.skills || []).map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="relative w-full h-7 bg-[#1c1c1c] rounded-none overflow-hidden flex items-center justify-between px-3.5">
                      <div 
                        className="absolute inset-y-0 left-0 bg-[#f5d77f] rounded-none shadow-sm"
                        style={{ width: `${skill.percent}%` }}
                      />
                      
                      <span className="relative z-10 text-[11px] font-black tracking-wider text-black uppercase">
                        {skill.name}
                      </span>

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
            src={specialties.bgImage || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'} 
            alt="Cinematic landscape" 
            className="w-full h-full object-cover opacity-25 filter brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black" />
        </div>

        <div className="relative z-10 px-6 max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] uppercase tracking-widest text-[#f5d77f] font-mono font-bold">
            {specialties.badge}
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {specialties.title}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-[12px] leading-relaxed max-w-md mx-auto">
            Comprehensive cinematography and post-production capabilities delivered to the highest standard.
          </p>
        </div>
      </section>

      {/* ================= 5. SPECIALTIES CARDS GRID ================= */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(specialties.items || []).map((spec, i) => {
            const Icon = DEFAULT_SPECIALTY_ICONS[i % DEFAULT_SPECIALTY_ICONS.length] || Film;
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
            {experience.badge}
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {experience.title}
          </h2>
        </div>

        <div className="space-y-6">
          {(experience.items || []).map((exp, idx) => (
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
                {(exp.achievements || []).map((ach, aIdx) => (
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
            {toolsGear.badge}
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            {toolsGear.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(toolsGear.categories || []).map((item, i) => (
            <div key={i} className="bg-[#121212] border border-neutral-800 p-5 space-y-3">
              <h4 
                className="text-xs font-bold uppercase tracking-wider text-[#f5d77f] border-b border-neutral-800 pb-2"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
              >
                {item.category}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {(item.items || []).map((gear, gIdx) => (
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
            {cta.title}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            {cta.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Primary Button with dynamic styles */}
            <Link 
              to={cta.primaryBtnLink || cta.buttonLink || '/contact'} 
              className={`font-extrabold text-xs sm:text-sm px-8 py-3 transition-all shadow-xl hover:scale-105 uppercase tracking-wider inline-flex items-center justify-center ${
                cta.primaryBtnStyle === 'rounded-smooth'
                  ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black rounded-xl'
                  : cta.primaryBtnStyle === 'pill'
                  ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black rounded-full'
                  : cta.primaryBtnStyle === 'outline-gold'
                  ? 'bg-transparent hover:bg-[#FFE379] text-[#FFE379] hover:text-black border-2 border-[#FFE379] rounded-none'
                  : cta.primaryBtnStyle === 'cyber-cut'
                  ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] rounded-none'
                  : 'bg-[#f5d77f] hover:bg-[#ebd074] text-black rounded-none'
              }`}
            >
              {cta.primaryBtnText || cta.buttonText || 'Contact Me Now'}
            </Link>

            {/* Secondary Button with dynamic styles */}
            <Link 
              to={cta.secondaryBtnLink || '/portfolio'} 
              className={`font-bold text-xs sm:text-sm px-8 py-3 transition-all hover:scale-105 uppercase tracking-wider inline-flex items-center justify-center ${
                cta.secondaryBtnStyle === 'solid-gold'
                  ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black rounded-none shadow-lg'
                  : cta.secondaryBtnStyle === 'rounded-smooth'
                  ? 'bg-transparent hover:bg-white/10 text-white border border-neutral-700 rounded-xl'
                  : cta.secondaryBtnStyle === 'pill'
                  ? 'bg-transparent hover:bg-white/10 text-white border border-neutral-700 rounded-full'
                  : cta.secondaryBtnStyle === 'solid-dark'
                  ? 'bg-[#181818] hover:bg-[#222] text-[#FFE379] border border-[#333] rounded-none'
                  : cta.secondaryBtnStyle === 'glass'
                  ? 'bg-white/5 hover:bg-white/10 backdrop-blur text-white border border-white/20 rounded-xl'
                  : 'bg-transparent hover:bg-white/5 text-white border border-neutral-700 rounded-none'
              }`}
            >
              {cta.secondaryBtnText || 'Explore Portfolio'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
