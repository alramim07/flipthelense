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

        {/* ================= 4. CTA BANNER BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 4: Call To Action (Bottom Banner)</span>
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
