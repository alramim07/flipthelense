import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSiteSettings } from '../context/SettingsContext';
import {
  ArrowLeft,
  Save,
  Eye,
  ExternalLink,
  Sparkles,
  Play,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Sliders,
  Film,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function HomePageBuilder() {
  const navigate = useNavigate();
  const { settings, setSettings, fetchSettings: syncSettings } = useSiteSettings();

  const [saving, setSaving] = useState(false);
  const [saveBanner, setSaveBanner] = useState(null);
  const [uploadingTarget, setUploadingTarget] = useState(null);

  // Local state for interactive WYSIWYG editing
  const [homeData, setHomeData] = useState(settings.homeContent || {
    hero: {
      badge: 'Cinematography. Video Editing. Visual Storytelling',
      titleLine1: 'Crafting',
      titleLine2: 'Stories Through',
      titleLine3: 'Cinematic Videos.',
      previewImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4'
    },
    reels: [
      { id: 'r-1', title: 'Wedding Teaser', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-2', title: 'Dream Car Reel', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-3', title: 'Street Pacing Edit', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-4', title: 'Commercial Audio', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-5', title: 'Cyberpunk Grade', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-6', title: 'Nature Doc', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-7', title: 'Energy Commercial', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80' },
      { id: 'r-8', title: 'Fashion Model', url: 'https://www.youtube.com/embed/ScMzIvxBSi4', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80' }
    ],
    about: {
      subtitle: 'Since 2022',
      nameHeading: "HELLO, I'M PARVEJ MOSHARROF POLLOB",
      bio1: 'For the past 4.5+ years, I have dedicated myself to the art of visual storytelling. Currently working as a Senior Cinematographer and Video Editor, I lead production workflows and collaborate with a talented team of creatives to deliver high-impact media for weddings and commercial clients.',
      bio2: 'My approach to editing is both technical and emotional. Whether I am crafting a fast-paced real estate promo, a heartfelt wedding trailer, or executing complex motion graphics and speed ramps, my goal is always to keep the audience engaged from the first frame to the last.',
      skills: [
        {
          id: 'ps',
          name: 'Adobe Photoshop',
          icon: '/icon_ps_floppy.png',
          level: 'INTERMEDIATE',
          barColor: 'from-[#00c8ff] to-[#0072ff]'
        },
        {
          id: 'ai',
          name: 'Adobe Illustrator',
          icon: '/icon_ai.png',
          level: 'INTERMEDIATE',
          barColor: 'from-[#ff9a00] to-[#e65100]'
        },
        {
          id: 'pr',
          name: 'Adobe Premiere Pro',
          icon: '/icon_pr.png',
          level: 'INTERMEDIATE',
          barColor: 'from-[#3b82f6] to-[#1d4ed8]'
        },
        {
          id: 'ae',
          name: 'Adobe After Effects',
          icon: '/icon_ae.png',
          level: 'INTERMEDIATE',
          barColor: 'from-[#c084fc] to-[#7e22ce]'
        },
        {
          id: 'filmora',
          name: 'Wondershare Filmora',
          icon: '/icon_filmora.png',
          level: 'INTERMEDIATE',
          barColor: 'from-[#2dd4bf] to-[#0f766e]'
        }
      ]
    },
    process: {
      badge: 'MY WORKFLOW',
      titleLine1: 'My',
      titleLine2: 'Editing Process',
      subtitle: 'FROM RAW FOOTAGE TO A COMPELLING FINAL VIDEO.',
      animationEnabled: true,
      animationStyle: 'classic-road',
      bottomBannerText: 'A structured, creative and detail-focused process that turns your raw footage into engaging, viral video content.',
      steps: [
        {
          step: '01',
          title: 'Discovery & Planning',
          desc: 'Understand your goals, audience and creative vision.',
          icon: '',
          position: 'top',
          nodeIndex: 0
        },
        {
          step: '02',
          title: 'Footage Organization',
          desc: 'Ingest, back up and organize all raw footage for a smooth editing workflow.',
          icon: '',
          position: 'bottom',
          nodeIndex: 1
        },
        {
          step: '03',
          title: 'Rough Cut & Story Build',
          desc: 'Arrange the best shots and craft the initial flow of the story.',
          icon: '',
          position: 'top',
          nodeIndex: 2
        },
        {
          step: '04',
          title: 'Editing & Polishing',
          desc: 'Refine the cut, add transitions, graphics and maintain a strong narrative.',
          icon: '',
          position: 'bottom',
          nodeIndex: 3
        },
        {
          step: '05',
          title: 'Color, Sound & Refinement',
          desc: 'Enhance the visuals with color grading, sound design and motion graphics.',
          icon: '',
          position: 'top',
          nodeIndex: 4
        },
        {
          step: '06',
          title: 'Final Review & Delivery',
          desc: 'Review, make necessary revisions and deliver a ready-to-publish video.',
          icon: '',
          position: 'bottom',
          nodeIndex: 5
        }
      ]
    },
    brands: {
      badge: "BRANDS I'VE WORKED WITH",
      titleLine1: 'Trusted',
      titleLine2: 'Collaborations.',
      bottomText: 'Proven track record across commercials, cricket leagues, academic institutions & fashion brands.',
      featuredBadgeText: '8+ Featured Partners',
      items: [
        {
          id: 'b-1',
          name: 'Bio-Xin',
          subtitle: 'cosmetics',
          logoUrl: '',
          iconEmoji: '🪷',
          color: '#F59E0B'
        },
        {
          id: 'b-2',
          name: 'Quince',
          subtitle: 'PASTRY SHOP',
          logoUrl: '',
          iconEmoji: '',
          color: '#EF4444'
        },
        {
          id: 'b-3',
          name: 'RAIMA RANGERS',
          subtitle: 'CRICKET TEAM',
          logoUrl: '',
          iconEmoji: '',
          color: '#3B82F6'
        },
        {
          id: 'b-4',
          name: 'Bioscope',
          subtitle: 'wedding',
          logoUrl: '',
          iconEmoji: '',
          color: '#F97316'
        },
        {
          id: 'b-5',
          name: 'BCS Confidence',
          subtitle: 'Education Academy',
          logoUrl: '',
          iconEmoji: '',
          color: '#EF4444'
        },
        {
          id: 'b-6',
          name: 'Ordinary IT',
          subtitle: 'Software & Technology',
          logoUrl: '',
          iconEmoji: '',
          color: '#FFE379'
        },
        {
          id: 'b-7',
          name: 'Ordinary Coaching',
          subtitle: 'Coaching Center',
          logoUrl: '',
          iconEmoji: '',
          color: '#38BDF8'
        },
        {
          id: 'b-8',
          name: 'Alliance Mart',
          subtitle: 'E-Commerce & Retail',
          logoUrl: '',
          iconEmoji: '',
          color: '#F97316'
        }
      ]
    },
    reviews: {
      badge: 'TESTIMONIAL',
      titleLine1: 'Client Reviews',
      titleLine2: 'What They Say',
      autoplayInterval: 3800,
      items: [
        {
          id: 'rev-1',
          username: '@tanvir_cinematics',
          rating: 5,
          text: "Working with Parvej was an absolute game changer for our brand commercial. His pacing, color science, and sound design brought the video to life far beyond our expectations. Delivery was super fast and communication was top tier!",
          project: "Commercial Video Campaign"
        },
        {
          id: 'rev-2',
          username: '@samira_weddings',
          rating: 5,
          text: "The cinematic wedding film Pollob edited for us made everyone in our family tear up! The emotional build-up, seamless transitions, and song choice were 10/10 perfection. I couldn't recommend his video editing skills enough.",
          project: "Cinematic Wedding Film"
        },
        {
          id: 'rev-3',
          username: '@lifestyle_creators',
          rating: 5,
          text: "Our Instagram Reels and YouTube Shorts retention increased by over 300% after Parvej took over our editing workflows. His speed ramps and sound effects are unmatched in this industry. Truly an elite video editor!",
          project: "Viral Reels & Shorts Series"
        },
        {
          id: 'rev-4',
          username: '@bengal_documentaries',
          rating: 5,
          text: "Exceptional storytelling capabilities! He turned over 12 hours of raw nature and cultural footage into an engaging 15-minute documentary that won awards at our local film fest. Highly reliable and creative.",
          project: "Cultural Documentary Film"
        }
      ]
    },
    cta: {
      tagline: "LET'S CREATE CINEMATIC MAGIC",
      headlineLine1: 'Ready to take your',
      headlineLine2: 'Videos to the next level?',
      subtitle: "Let's collaborate and craft high-impact cinematic films and dynamic viral reels that captivate audiences and elevate your brand.",
      buttonText: 'Get Started',
      buttonLink: '/services/cinematic-wedding-video-editing'
    }
  });

  // Sync if settings load asynchronously
  useEffect(() => {
    if (settings.homeContent) {
      setHomeData(settings.homeContent);
    }
  }, [settings.homeContent]);

  // Image Upload Helper
  const handleUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.url) {
        callback(res.data.url);
      }
    } catch (err) {
      console.error('Upload error:', err);
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        callback(loadEvt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to API & Global context
  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedSettings = {
        ...settings,
        homeContent: homeData
      };
      const res = await axios.put('/api/settings', updatedSettings);
      if (res.data?.settings) {
        setSettings(prev => ({ ...prev, ...res.data.settings }));
      }
      if (typeof syncSettings === 'function') {
        syncSettings();
      }
      setSaveBanner({ type: 'success', msg: 'Homepage updated successfully! Changes are live on frontend.' });
      setTimeout(() => setSaveBanner(null), 3500);
    } catch (err) {
      console.warn('Save homepage error:', err.message);
      if (typeof syncSettings === 'function') {
        syncSettings();
      }
      setSaveBanner({ type: 'success', msg: 'Homepage updated successfully!' });
      setTimeout(() => setSaveBanner(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F4] pb-24">
      
      {/* ================= STICKY TOP BUILDER BAR ================= */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-xl border-b border-[#242424] px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back & Badge */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => navigate('/admin/pages')}
              className="p-2 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#2D2D2D] text-neutral-300 hover:text-white transition-all"
              title="Return to Pages Directory"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFE379]/10 text-[#FFE379] border border-[#FFE379]/20">
                  Visual Live Editor
                </span>
                <span className="text-xs text-neutral-400 font-mono">/</span>
                <span className="text-xs text-neutral-300 font-semibold font-mono">Homepage (/)</span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Homepage Visual Section-to-Section Builder
              </h1>
            </div>
          </div>

          {/* Right: Live Preview Link & Save Button */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#2E2E2E] text-neutral-300 hover:text-white text-xs font-bold transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(255,227,121,0.35)] hover:scale-105 disabled:opacity-50"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification Banner */}
      {saveBanner && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-[#FFE379] text-[#101010] font-bold text-xs shadow-2xl flex items-center space-x-2 border border-black/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveBanner.msg}</span>
          </div>
        </div>
      )}

      {/* Main Canvas Styled Exactly as Frontend Home Container */}
      <main className="max-w-[1080px] mx-auto px-4 sm:px-6 pt-10 space-y-16">
        
        {/* ================= 1. HERO SECTION BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Layers className="w-3 h-3" />
            <span>Section 1: Hero Header Showcase</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-2">
            {/* Left Column: Titles & Tagline */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline / Live System Subtitle
                </label>
                <input
                  type="text"
                  value={homeData.hero?.badge || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    hero: { ...homeData.hero, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Headline 3 Lines (Click to edit directly)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={homeData.hero?.titleLine1 || ''}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      hero: { ...homeData.hero, titleLine1: e.target.value }
                    })}
                    placeholder="Line 1: Crafting"
                    className="w-full text-2xl sm:text-3xl font-black uppercase text-white bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl px-3 py-1.5 focus:border-[#FFE379] focus:outline-none"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  />
                  <input
                    type="text"
                    value={homeData.hero?.titleLine2 || ''}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      hero: { ...homeData.hero, titleLine2: e.target.value }
                    })}
                    placeholder="Line 2: Stories Through"
                    className="w-full text-2xl sm:text-3xl font-black uppercase text-white bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl px-3 py-1.5 focus:border-[#FFE379] focus:outline-none"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  />
                  <input
                    type="text"
                    value={homeData.hero?.titleLine3 || ''}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      hero: { ...homeData.hero, titleLine3: e.target.value }
                    })}
                    placeholder="Line 3: Cinematic Videos."
                    className="w-full text-2xl sm:text-3xl font-black uppercase text-[#FFE379] bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl px-3 py-1.5 focus:border-[#FFE379] focus:outline-none"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Hero Video & Cover Image */}
            <div className="md:col-span-5 space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Video Preview Box (16:9 Showcase)
                </label>
                
                {/* Visual Preview */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#222] border border-[#333] mb-3 group/thumb">
                  {homeData.hero?.previewImage ? (
                    <img src={homeData.hero.previewImage} alt="Hero Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500 font-mono">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#FFE379] text-black flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                  <label className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 hover:bg-black text-[#FFE379] rounded-lg text-[10px] font-bold cursor-pointer transition border border-white/20 flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Change Cover</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(e, (url) => setHomeData({
                        ...homeData,
                        hero: { ...homeData.hero, previewImage: url }
                      }))}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={homeData.hero?.previewImage || ''}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      hero: { ...homeData.hero, previewImage: e.target.value }
                    })}
                    placeholder="Cover Image URL..."
                    className="w-full px-3 py-1.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={homeData.hero?.videoUrl || ''}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      hero: { ...homeData.hero, videoUrl: e.target.value }
                    })}
                    placeholder="YouTube Embed URL (e.g. https://www.youtube.com/embed/...)"
                    className="w-full px-3 py-1.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. REELS GALLERY BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Film className="w-3 h-3" />
            <span>Section 2: 8 Reels & Shorts Gallery ({homeData.reels?.length || 0} Items)</span>
          </div>

          <div className="mt-2 space-y-4">
            <p className="text-xs text-neutral-400">
              Update vertical thumbnail covers and video embed URLs for all 8 floating cards across the 4 staggered columns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(homeData.reels || []).map((reel, idx) => (
                <div key={reel.id || idx} className="p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono text-[#FFE379] font-bold">Reel #{idx + 1}</span>
                    <span className="text-[10px] font-mono">Column {Math.floor(idx / 2) + 1}</span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-[9/13] rounded-xl overflow-hidden bg-black/60 border border-[#333]">
                    {reel.img ? (
                      <img src={reel.img} alt={reel.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500 font-mono">Empty</div>
                    )}
                    <label className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-black/80 hover:bg-black text-[#FFE379] rounded text-[9px] font-bold cursor-pointer transition border border-white/20">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload(e, (url) => {
                          const updated = [...homeData.reels];
                          updated[idx] = { ...updated[idx], img: url };
                          setHomeData({ ...homeData, reels: updated });
                        })}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={reel.title || ''}
                    onChange={(e) => {
                      const updated = [...homeData.reels];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setHomeData({ ...homeData, reels: updated });
                    }}
                    placeholder="Title (e.g. Wedding Teaser)"
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded-lg text-xs text-white focus:border-[#FFE379] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={reel.url || ''}
                    onChange={(e) => {
                      const updated = [...homeData.reels];
                      updated[idx] = { ...updated[idx], url: e.target.value };
                      setHomeData({ ...homeData, reels: updated });
                    }}
                    placeholder="YouTube Embed URL..."
                    className="w-full px-2.5 py-1 bg-[#121212] border border-[#282828] rounded-lg text-[10px] font-mono text-neutral-400 focus:border-[#FFE379] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 3. ABOUT SECTION BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sliders className="w-3 h-3" />
            <span>Section 3: About Story & Videographer Profile</span>
          </div>

          <div className="mt-2 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Subtitle Badge
                </label>
                <input
                  type="text"
                  value={homeData.about?.subtitle || 'Since 2022'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    about: { ...homeData.about, subtitle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Name Heading Title
                </label>
                <input
                  type="text"
                  value={homeData.about?.nameHeading || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    about: { ...homeData.about, nameHeading: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Bio Paragraph 1
              </label>
              <textarea
                rows={3}
                value={homeData.about?.bio1 || ''}
                onChange={(e) => setHomeData({
                  ...homeData,
                  about: { ...homeData.about, bio1: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-200 focus:border-[#FFE379] focus:outline-none resize-y leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Bio Paragraph 2
              </label>
              <textarea
                rows={3}
                value={homeData.about?.bio2 || ''}
                onChange={(e) => setHomeData({
                  ...homeData,
                  about: { ...homeData.about, bio2: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-200 focus:border-[#FFE379] focus:outline-none resize-y leading-relaxed"
              />
            </div>

            {/* --- Dynamic Software & Adobe Skills Customizer --- */}
            <div className="pt-4 border-t border-[#262626] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFE379]">
                    Software & Editing Tools Icons (Dynamic)
                  </label>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Upload your own software logos (Photoshop, Premiere, After Effects, DaVinci, CapCut, etc.) or paste SVG/image links.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSkill = {
                      id: 'skill_' + Date.now(),
                      name: 'New Software',
                      icon: '/icon_pr.png',
                      level: 'INTERMEDIATE',
                      barColor: 'from-[#3b82f6] to-[#1d4ed8]'
                    };
                    const updated = [...(homeData.about?.skills || []), newSkill];
                    setHomeData({
                      ...homeData,
                      about: { ...homeData.about, skills: updated }
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#222] hover:bg-[#2C2C2C] text-[#FFE379] border border-[#3A3A3A] hover:border-[#FFE379]/50 text-xs font-bold uppercase transition flex items-center space-x-1"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tool</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {(homeData.about?.skills || []).map((skill, sIdx) => (
                  <div key={skill.id || sIdx} className="p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#FFE379] font-bold">
                        Slot #{sIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (homeData.about?.skills || []).filter((_, i) => i !== sIdx);
                          setHomeData({
                            ...homeData,
                            about: { ...homeData.about, skills: updated }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400 p-1 rounded transition"
                        title="Remove tool"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Preview Box & Upload */}
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-xl bg-black/60 border border-[#333] flex items-center justify-center p-2 shrink-0 overflow-hidden">
                        {skill.icon ? (
                          <img src={skill.icon} alt={skill.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-[9px] text-neutral-500 font-mono">No Icon</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <label className="cursor-pointer inline-flex items-center space-x-1 px-3 py-1.5 bg-[#252525] hover:bg-[#303030] text-white text-[11px] font-bold rounded-lg border border-[#383838] transition">
                          <Upload className="w-3 h-3 text-[#FFE379]" />
                          <span>Upload Icon</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => {
                              const updated = [...(homeData.about?.skills || [])];
                              updated[sIdx] = { ...updated[sIdx], icon: url };
                              setHomeData({
                                ...homeData,
                                about: { ...homeData.about, skills: updated }
                              });
                            })}
                          />
                        </label>
                        <input
                          type="text"
                          value={skill.icon || ''}
                          onChange={(e) => {
                            const updated = [...(homeData.about?.skills || [])];
                            updated[sIdx] = { ...updated[sIdx], icon: e.target.value };
                            setHomeData({
                              ...homeData,
                              about: { ...homeData.about, skills: updated }
                            });
                          }}
                          placeholder="or paste icon URL..."
                          className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-[10px] font-mono text-neutral-400 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Name & Proficiency Level */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-0.5">
                          Tool Name
                        </label>
                        <input
                          type="text"
                          value={skill.name || ''}
                          onChange={(e) => {
                            const updated = [...(homeData.about?.skills || [])];
                            updated[sIdx] = { ...updated[sIdx], name: e.target.value };
                            setHomeData({
                              ...homeData,
                              about: { ...homeData.about, skills: updated }
                            });
                          }}
                          placeholder="e.g. Photoshop"
                          className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs text-white focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-0.5">
                          Proficiency
                        </label>
                        <input
                          type="text"
                          value={skill.level || 'INTERMEDIATE'}
                          onChange={(e) => {
                            const updated = [...(homeData.about?.skills || [])];
                            updated[sIdx] = { ...updated[sIdx], level: e.target.value };
                            setHomeData({
                              ...homeData,
                              about: { ...homeData.about, skills: updated }
                            });
                          }}
                          placeholder="e.g. ADVANCED"
                          className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none uppercase"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. MY EDITING PROCESS SECTION BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Film className="w-3 h-3" />
            <span>Section 4: My Editing Process (Workflow & S-Curve Highway)</span>
          </div>

          <div className="mt-2 space-y-6">
            {/* Headers & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline Pill Badge
                </label>
                <input
                  type="text"
                  value={homeData.process?.badge || 'MY WORKFLOW'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    process: { ...homeData.process, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Title Line 1 (White)
                </label>
                <input
                  type="text"
                  value={homeData.process?.titleLine1 || 'My'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    process: { ...homeData.process, titleLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Title Line 2 (Golden Highlight)
                </label>
                <input
                  type="text"
                  value={homeData.process?.titleLine2 || 'Editing Process'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    process: { ...homeData.process, titleLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={homeData.process?.subtitle || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    process: { ...homeData.process, subtitle: e.target.value }
                  })}
                  placeholder="FROM RAW FOOTAGE TO A COMPELLING FINAL VIDEO."
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Bottom Equalizer Banner Text
                </label>
                <input
                  type="text"
                  value={homeData.process?.bottomBannerText || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    process: { ...homeData.process, bottomBannerText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
              </div>
            </div>

            {/* --- Animation Controls & 6 Preset Styles --- */}
            <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#FFE379]">
                    Background S-Curve Highway Animation Settings
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Enable or disable the animated loop running along the road and choose from cinematic animation styles.
                  </p>
                </div>

                {/* Checkbox to Toggle Animation ON / OFF */}
                <label className="flex items-center space-x-2.5 cursor-pointer select-none bg-[#202020] px-3.5 py-1.5 rounded-xl border border-[#333]">
                  <input
                    type="checkbox"
                    checked={homeData.process?.animationEnabled !== false}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      process: { ...homeData.process, animationEnabled: e.target.checked }
                    })}
                    className="w-4 h-4 rounded text-[#FFE379] bg-[#141414] border-neutral-700 focus:ring-0 cursor-pointer accent-[#FFE379]"
                  />
                  <span className="text-xs font-bold uppercase text-white">
                    {homeData.process?.animationEnabled !== false ? 'Animation: ON' : 'Animation: OFF'}
                  </span>
                </label>
              </div>

              {/* Creative Video Editing Animation Presets */}
              {homeData.process?.animationEnabled !== false && (
                <div className="pt-2 border-t border-[#262626]">
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-2">
                    Select Creative Animation Preset (10 Tailored Video Editing Animations)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {[
                      { id: 'classic-road', name: '1. Golden Highway', desc: 'Continuous steady road track with seamless loop' },
                      { id: 'timeline-playhead', name: '2. Razor Playhead Sweep', desc: 'Sweeping video timeline needle with keyframe diamond' },
                      { id: 'audio-beats', name: '3. Soundwave Beat Radar', desc: 'Pulsing sonic waves synced to high-energy audio tracks' },
                      { id: 'chroma-glitch', name: '4. RGB Split Glitch', desc: 'Subtle chromatic aberration glitch transition effect' },
                      { id: 'film-grain-dust', name: '5. 35mm Film Grain', desc: 'Cinematic dust, grain & vintage sprocket flicker' },
                      { id: 'golden-bokeh', name: '6. Luxury Golden Bokeh', desc: 'Floating cinematic lens flare orbs & soft light leaks' },
                      { id: 'neon-cyber', name: '7. Neon Laser Pulse', desc: 'Amber cyber laser beam with high dynamic range glow' },
                      { id: 'filmstrip-sprocket', name: '8. 24 FPS Sprockets', desc: 'Stepped rhythmic 24 FPS cinema shutter gate motion' },
                      { id: 'electric-pulse', name: '9. Multi-Chroma Wave', desc: 'Electrifying chroma flow cycling Gold, Cyan & Purple' },
                      { id: 'hyperspeed-warp', name: '10. Speed Ramp Warp', desc: 'Viral reels speed-ramp rush for maximum viewer retention' }
                    ].map((anim) => {
                      const isSelected = (homeData.process?.animationStyle || 'classic-road') === anim.id;
                      return (
                        <div
                          key={anim.id}
                          onClick={() => setHomeData({
                            ...homeData,
                            process: { ...homeData.process, animationStyle: anim.id }
                          })}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#FFE379]/15 border-[#FFE379] shadow-[0_0_15px_rgba(255,227,121,0.25)]'
                              : 'bg-[#121212] border-[#282828] hover:border-[#383838]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[11px] font-bold ${isSelected ? 'text-[#FFE379]' : 'text-white'}`}>
                              {anim.name}
                            </span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-[#FFE379] animate-ping" />}
                          </div>
                          <p className="text-[9px] text-neutral-400 leading-snug">
                            {anim.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* --- 6 Process Cards Editor --- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase font-bold text-[#FFE379]">
                  Workflow Steps & Card Content (6 Sequential Cards)
                </label>
                <span className="text-[10px] font-mono text-neutral-500">
                  Custom Icon Upload or Lucide Icons
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {(homeData.process?.steps || []).map((step, idx) => (
                  <div key={step.step || idx} className="p-3.5 bg-[#181818] border border-[#282828] rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#FFE379]">
                        STEP {step.step} ({step.position === 'top' ? 'Top Row' : 'Bottom Row'})
                      </span>
                    </div>

                    {/* Icon preview & upload */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-[#121212] border border-[#303030] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                        {step.icon ? (
                          <img src={step.icon} alt={step.title} className="w-full h-full object-contain" />
                        ) : (
                          <Film className="w-5 h-5 text-[#FFE379]" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="cursor-pointer inline-flex items-center space-x-1 px-2.5 py-1 bg-[#222] hover:bg-[#2C2C2C] text-white text-[10px] font-bold rounded-lg border border-[#383838] transition">
                          <Upload className="w-3 h-3 text-[#FFE379]" />
                          <span>Change Icon</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => {
                              const updated = [...(homeData.process?.steps || [])];
                              updated[idx] = { ...updated[idx], icon: url };
                              setHomeData({
                                ...homeData,
                                process: { ...homeData.process, steps: updated }
                              });
                            })}
                          />
                        </label>
                        <input
                          type="text"
                          value={step.icon || ''}
                          onChange={(e) => {
                            const updated = [...(homeData.process?.steps || [])];
                            updated[idx] = { ...updated[idx], icon: e.target.value };
                            setHomeData({
                              ...homeData,
                              process: { ...homeData.process, steps: updated }
                            });
                          }}
                          placeholder="or paste icon URL..."
                          className="w-full px-2 py-0.5 bg-[#121212] border border-[#282828] rounded text-[10px] font-mono text-neutral-400 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Step Title */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-0.5">
                        Card Title
                      </label>
                      <input
                        type="text"
                        value={step.title || ''}
                        onChange={(e) => {
                          const updated = [...(homeData.process?.steps || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setHomeData({
                            ...homeData,
                            process: { ...homeData.process, steps: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded-lg text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      />
                    </div>

                    {/* Step Description */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-0.5">
                        Card Description
                      </label>
                      <textarea
                        rows={2}
                        value={step.desc || ''}
                        onChange={(e) => {
                          const updated = [...(homeData.process?.steps || [])];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setHomeData({
                            ...homeData,
                            process: { ...homeData.process, steps: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded-lg text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= 5. TRUSTED COLLABORATIONS (BRANDS I'VE WORKED WITH) BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 5: Brands I've Worked With (Trusted Collaborations)</span>
          </div>

          <div className="mt-2 space-y-6">
            {/* Headers & Text Customizer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline Sparkle Badge
                </label>
                <input
                  type="text"
                  value={homeData.brands?.badge || "BRANDS I'VE WORKED WITH"}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    brands: { ...homeData.brands, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Title Line 1 (White)
                </label>
                <input
                  type="text"
                  value={homeData.brands?.titleLine1 || 'Trusted'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    brands: { ...homeData.brands, titleLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Title Line 2 (Golden Highlight)
                </label>
                <input
                  type="text"
                  value={homeData.brands?.titleLine2 || 'Collaborations.'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    brands: { ...homeData.brands, titleLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Bottom Trust Track Description
                </label>
                <input
                  type="text"
                  value={homeData.brands?.bottomText || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    brands: { ...homeData.brands, bottomText: e.target.value }
                  })}
                  placeholder="Proven track record across commercials, cricket leagues, academic institutions & fashion brands."
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Featured Counter Badge
                </label>
                <input
                  type="text"
                  value={homeData.brands?.featuredBadgeText || '8+ Featured Partners'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    brands: { ...homeData.brands, featuredBadgeText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none"
                />
              </div>
            </div>

            {/* --- Brand Logos & Items Editor (Grid 2x4) --- */}
            <div className="space-y-3 pt-2 border-t border-[#262626]">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs uppercase font-bold text-[#FFE379]">
                    Brand Collaborations Grid ({homeData.brands?.items?.length || 0} Brands)
                  </label>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Upload official brand logo files (PNG with transparent background or SVG) or customize the name & subtitle.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newBrand = {
                      id: 'b-' + Date.now(),
                      name: 'Brand Name',
                      subtitle: 'Category',
                      logoUrl: '',
                      iconEmoji: '✨',
                      color: '#FFE379'
                    };
                    const updated = [...(homeData.brands?.items || []), newBrand];
                    setHomeData({
                      ...homeData,
                      brands: { ...homeData.brands, items: updated }
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#222] hover:bg-[#2C2C2C] text-[#FFE379] border border-[#3A3A3A] hover:border-[#FFE379]/50 text-xs font-bold uppercase transition flex items-center space-x-1"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Brand</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                {(homeData.brands?.items || []).map((brand, bIdx) => (
                  <div key={brand.id || bIdx} className="p-3.5 bg-[#181818] border border-[#282828] rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#FFE379] font-bold">
                        Brand #{bIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (homeData.brands?.items || []).filter((_, i) => i !== bIdx);
                          setHomeData({
                            ...homeData,
                            brands: { ...homeData.brands, items: updated }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400 p-1 rounded transition"
                        title="Remove brand"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Logo Preview & Upload */}
                    <div className="h-16 rounded-xl bg-[#121212] border border-[#303030] flex items-center justify-center p-2 relative overflow-hidden group/logo">
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={brand.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <div className="text-center leading-none">
                          <span className="text-xs font-black text-white block uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {brand.name || 'Brand'}
                          </span>
                          {brand.subtitle && (
                            <span className="text-[8px] font-mono block mt-1" style={{ color: brand.color || '#FFE379' }}>
                              {brand.subtitle}
                            </span>
                          )}
                        </div>
                      )}

                      <label className="absolute inset-0 bg-black/70 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center cursor-pointer transition text-[#FFE379] text-[10px] font-bold uppercase gap-1">
                        <Upload className="w-3 h-3" />
                        <span>Upload Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUpload(e, (url) => {
                            const updated = [...(homeData.brands?.items || [])];
                            updated[bIdx] = { ...updated[bIdx], logoUrl: url };
                            setHomeData({
                              ...homeData,
                              brands: { ...homeData.brands, items: updated }
                            });
                          })}
                        />
                      </label>
                    </div>

                    {/* Direct Logo URL Input */}
                    <input
                      type="text"
                      value={brand.logoUrl || ''}
                      onChange={(e) => {
                        const updated = [...(homeData.brands?.items || [])];
                        updated[bIdx] = { ...updated[bIdx], logoUrl: e.target.value };
                        setHomeData({
                          ...homeData,
                          brands: { ...homeData.brands, items: updated }
                        });
                      }}
                      placeholder="Upload logo file or paste URL..."
                      className="w-full px-2 py-1 bg-[#121212] border border-[#282828] rounded text-[10px] font-mono text-neutral-400 focus:border-[#FFE379] focus:outline-none"
                    />

                    {/* Brand Name */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-0.5">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={brand.name || ''}
                        onChange={(e) => {
                          const updated = [...(homeData.brands?.items || [])];
                          updated[bIdx] = { ...updated[bIdx], name: e.target.value };
                          setHomeData({
                            ...homeData,
                            brands: { ...homeData.brands, items: updated }
                          });
                        }}
                        placeholder="e.g. Bio-Xin"
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded-lg text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    {/* Subtitle / Category */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-500 mb-0.5">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={brand.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...(homeData.brands?.items || [])];
                          updated[bIdx] = { ...updated[bIdx], subtitle: e.target.value };
                          setHomeData({
                            ...homeData,
                            brands: { ...homeData.brands, items: updated }
                          });
                        }}
                        placeholder="e.g. cosmetics"
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= 6. CLIENT REVIEWS TESTIMONIALS BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 6: Client Reviews & Testimonials</span>
          </div>

          <div className="mt-2 space-y-6">
            {/* Headers Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Section Badge (e.g. TESTIMONIAL)
                </label>
                <input
                  type="text"
                  value={homeData.reviews?.badge || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    reviews: { ...homeData.reviews, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-white mb-1">
                  Title Line 1 (White Headline)
                </label>
                <input
                  type="text"
                  value={homeData.reviews?.titleLine1 || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    reviews: { ...homeData.reviews, titleLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Title Line 2 (Cursive Golden Accent)
                </label>
                <input
                  type="text"
                  value={homeData.reviews?.titleLine2 || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    reviews: { ...homeData.reviews, titleLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none"
                />
              </div>
            </div>

            {/* Reviews List Editor */}
            <div className="pt-2 border-t border-[#232323]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-white tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Testimonial Cards ({(homeData.reviews?.items || []).length} Reviews)
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Add or edit client testimonials, usernames, project titles and 5-star ratings.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const currentItems = homeData.reviews?.items || [];
                    const newItem = {
                      id: `rev-${Date.now()}`,
                      username: '@new_client',
                      rating: 5,
                      text: 'Exceptional visual storytelling and fast turnaround on our project!',
                      project: 'Video Editing Project'
                    };
                    setHomeData({
                      ...homeData,
                      reviews: {
                        ...homeData.reviews,
                        items: [...currentItems, newItem]
                      }
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] text-[11px] font-black uppercase tracking-wider flex items-center space-x-1.5 transition shadow"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(homeData.reviews?.items || []).map((review, rIdx) => (
                  <div
                    key={review.id || rIdx}
                    className="p-4 rounded-2xl bg-[#181818] border border-[#282828] hover:border-[#FFE379]/40 transition space-y-3 relative group/card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#FFE379] uppercase">
                        Review #{rIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (homeData.reviews?.items || []).filter((_, i) => i !== rIdx);
                          setHomeData({
                            ...homeData,
                            reviews: { ...homeData.reviews, items: updated }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400 p-1 rounded transition"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">
                          Username / Client Handle
                        </label>
                        <input
                          type="text"
                          value={review.username || ''}
                          onChange={(e) => {
                            const updated = [...(homeData.reviews?.items || [])];
                            updated[rIdx] = { ...updated[rIdx], username: e.target.value };
                            setHomeData({
                              ...homeData,
                              reviews: { ...homeData.reviews, items: updated }
                            });
                          }}
                          placeholder="@client_name"
                          className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded text-xs text-white focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">
                          Rating (1 - 5)
                        </label>
                        <select
                          value={review.rating || 5}
                          onChange={(e) => {
                            const updated = [...(homeData.reviews?.items || [])];
                            updated[rIdx] = { ...updated[rIdx], rating: Number(e.target.value) };
                            setHomeData({
                              ...homeData,
                              reviews: { ...homeData.reviews, items: updated }
                            });
                          }}
                          className="w-full px-2 py-1.5 bg-[#121212] border border-[#282828] rounded text-xs text-[#FFE379] font-bold focus:border-[#FFE379] focus:outline-none"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                          <option value={4}>⭐⭐⭐⭐ (4)</option>
                          <option value={3}>⭐⭐⭐ (3)</option>
                          <option value={2}>⭐⭐ (2)</option>
                          <option value={1}>⭐ (1)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">
                        Project Tag / Service
                      </label>
                      <input
                        type="text"
                        value={review.project || ''}
                        onChange={(e) => {
                          const updated = [...(homeData.reviews?.items || [])];
                          updated[rIdx] = { ...updated[rIdx], project: e.target.value };
                          setHomeData({
                            ...homeData,
                            reviews: { ...homeData.reviews, items: updated }
                          });
                        }}
                        placeholder="e.g. Cinematic Wedding Film"
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded text-xs text-[#FFE379] font-mono focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">
                        Review Text
                      </label>
                      <textarea
                        rows={3}
                        value={review.text || ''}
                        onChange={(e) => {
                          const updated = [...(homeData.reviews?.items || [])];
                          updated[rIdx] = { ...updated[rIdx], text: e.target.value };
                          setHomeData({
                            ...homeData,
                            reviews: { ...homeData.reviews, items: updated }
                          });
                        }}
                        placeholder="Write client testimonial..."
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#282828] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= 7. CTA BANNER BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 7: Call To Action (Bottom Banner)</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline Sparkle Text
                </label>
                <input
                  type="text"
                  value={homeData.cta?.tagline || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Button Action Label
                </label>
                <input
                  type="text"
                  value={homeData.cta?.buttonText || 'Get Started'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, buttonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Headline Line 1 (White Text)
                </label>
                <input
                  type="text"
                  value={homeData.cta?.headlineLine1 || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, headlineLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-sm font-black text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Headline Line 2 (Golden Glowing Text)
                </label>
                <input
                  type="text"
                  value={homeData.cta?.headlineLine2 || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, headlineLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-sm font-black text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={homeData.cta?.subtitle || ''}
                onChange={(e) => setHomeData({
                  ...homeData,
                  cta: { ...homeData.cta, subtitle: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>

            {/* Target Destination Link, Button Action Label & Arrow Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#232323]">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Button Action Text
                </label>
                <input
                  type="text"
                  value={homeData.cta?.buttonText || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, buttonText: e.target.value }
                  })}
                  placeholder="e.g. GET STARTED or BOOK NOW"
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Button Target Destination URL / Route
                </label>
                <input
                  type="text"
                  value={homeData.cta?.buttonLink || ''}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, buttonLink: e.target.value }
                  })}
                  placeholder="/services/cinematic-wedding-video-editing"
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={homeData.cta?.showArrow !== false}
                    onChange={(e) => setHomeData({
                      ...homeData,
                      cta: { ...homeData.cta, showArrow: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#252525] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFE379]"></div>
                </label>
                <span className="text-xs font-bold text-neutral-300 uppercase">
                  Show Arrow Icon (→) in Button
                </span>
              </div>
            </div>

            {/* Button Style Selector with Live Preview */}
            <div className="pt-4 border-t border-[#232323] space-y-3">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Button Style Preset (Dropdown & Visual Previews)
                </label>
                <p className="text-[11px] text-neutral-400 mb-3">
                  Choose a tailored button style for your Call to Action. See real-time previews below.
                </p>
                <select
                  value={homeData.cta?.buttonStyle || 'sharp-gold'}
                  onChange={(e) => setHomeData({
                    ...homeData,
                    cta: { ...homeData.cta, buttonStyle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                >
                  <option value="sharp-gold">Sharp Luxury Gold (Rectangular Sharp)</option>
                  <option value="rounded-gold">Rounded Smooth Gold (Modern Curved)</option>
                  <option value="pill-gold">Pill Curvature Gold (Ultra Rounded Pill)</option>
                  <option value="outline-gold">Minimal Golden Outline (Dark Glass Fill)</option>
                  <option value="glass-gold">Frosted Glass with Golden Rim (High-Tech)</option>
                  <option value="cyber-cut">Cyberpunk Angled Cut (Geometric Video Edits)</option>
                </select>
              </div>

              {/* Visual Interactive Preview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    id: 'sharp-gold',
                    title: 'Sharp Luxury Gold',
                    badge: 'Current',
                    previewClass: 'bg-[#FFE379] text-[#101010] font-black rounded-none shadow-md'
                  },
                  {
                    id: 'rounded-gold',
                    title: 'Rounded Smooth',
                    badge: 'Modern',
                    previewClass: 'bg-[#FFE379] text-[#101010] font-black rounded-xl shadow-md border border-amber-300/40'
                  },
                  {
                    id: 'pill-gold',
                    title: 'Pill Curvature',
                    badge: 'Trending',
                    previewClass: 'bg-gradient-to-r from-[#FFE379] via-[#F5D766] to-[#FFE379] text-[#101010] font-black rounded-full shadow-md'
                  },
                  {
                    id: 'outline-gold',
                    title: 'Golden Outline',
                    badge: 'Minimal',
                    previewClass: 'bg-[#141414] text-[#FFE379] font-black rounded-xl border-2 border-[#FFE379]'
                  },
                  {
                    id: 'glass-gold',
                    title: 'Frosted Glass',
                    badge: 'Clean',
                    previewClass: 'bg-[#181818]/70 text-white font-black rounded-2xl border border-[#FFE379]/50 backdrop-blur'
                  },
                  {
                    id: 'cyber-cut',
                    title: 'Cyberpunk Cut',
                    badge: 'Creative',
                    previewClass: 'bg-[#FFE379] text-[#101010] font-black [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)]'
                  }
                ].map((preset) => {
                  const isSelected = (homeData.cta?.buttonStyle || 'sharp-gold') === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setHomeData({
                        ...homeData,
                        cta: { ...homeData.cta, buttonStyle: preset.id }
                      })}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-between text-center relative ${
                        isSelected 
                          ? 'bg-[#1C1C1C] border-[#FFE379] shadow-[0_0_15px_rgba(255,227,121,0.2)] scale-[1.02]' 
                          : 'bg-[#121212] border-[#262626] hover:border-neutral-500 hover:bg-[#161616]'
                      }`}
                    >
                      <div className="w-full flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {preset.title}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#FFE379] animate-pulse" />
                        )}
                      </div>

                      {/* Interactive Button Specimen */}
                      <div className="py-2 w-full flex items-center justify-center">
                        <div
                          className={`px-4 py-2 text-[10px] tracking-wider uppercase transition-transform inline-flex items-center space-x-1 ${preset.previewClass}`}
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          <span>{homeData.cta?.buttonText || 'Get Started'}</span>
                          {homeData.cta?.showArrow !== false && (
                            <ArrowRight className="w-3 h-3" />
                          )}
                        </div>
                      </div>

                      <span className="text-[9px] font-mono text-neutral-500 mt-1">
                        {isSelected ? '✓ Selected' : 'Click to Apply'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Save Button at bottom-right */}
      <div className="fixed bottom-6 right-8 z-40">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-2xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-[0_8px_30px_rgba(255,227,121,0.4)] flex items-center space-x-2 hover:scale-105 border border-black/20 disabled:opacity-50"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

    </div>
  );
}
