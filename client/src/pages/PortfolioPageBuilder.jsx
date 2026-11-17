import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Check, 
  Eye, 
  Upload, 
  Sparkles, 
  Film, 
  Layers, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSiteSettings } from '../context/SettingsContext';

export default function PortfolioPageBuilder() {
  const { settings, updateSectionSettings } = useSiteSettings();
  const [portfolioData, setPortfolioData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings && settings.portfolioContent) {
      const cloned = JSON.parse(JSON.stringify(settings.portfolioContent));
      if (!cloned.hero) cloned.hero = {};
      if (!cloned.hero.tagline) cloned.hero.tagline = cloned.hero.badge || 'WELCOME TO VIDEEN STUDIO';
      if (!cloned.hero.headlineLine1) cloned.hero.headlineLine1 = "LET'S MAKE";
      if (!cloned.hero.headlineLine2) cloned.hero.headlineLine2 = 'YOUR VIDEO LOOKS MORE COOL';
      if (!cloned.hero.description) cloned.hero.description = cloned.hero.desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.';
      if (!cloned.hero.buttonText) cloned.hero.buttonText = cloned.hero.btnText || 'GET STARTED';
      if (!cloned.hero.buttonLink) cloned.hero.buttonLink = cloned.hero.btnLink || '#my-work-section';
      if (!cloned.hero.buttonStyle) cloned.hero.buttonStyle = 'sharp-gold';
      if (cloned.hero.showArrow === undefined) cloned.hero.showArrow = true;
      if (!cloned.hero.bgImage) cloned.hero.bgImage = '/videen_hero_bg_real.jpg';
      if (!cloned.hero.filmmakerImage) cloned.hero.filmmakerImage = '/F1-1.png';
      if (!cloned.hero.statYears) cloned.hero.statYears = '18';
      if (!cloned.hero.statYearsLabel) cloned.hero.statYearsLabel = 'Years Experience';
      if (!cloned.hero.statAwards) cloned.hero.statAwards = '15';
      if (!cloned.hero.statAwardsLabel) cloned.hero.statAwardsLabel = 'Best Award';
      if (!cloned.hero.statProjects) cloned.hero.statProjects = '523';
      if (!cloned.hero.statProjectsLabel) cloned.hero.statProjectsLabel = 'Project Done';
      setPortfolioData(cloned);
    }
  }, [settings]);

  const handleUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('image', file);

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
        if (loadEvt.target?.result) callback(loadEvt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!portfolioData) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await axios.put('/api/settings', {
        portfolioContent: portfolioData
      });

      if (res.data) {
        updateSectionSettings('portfolioContent', portfolioData);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error saving Portfolio Page changes: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-[#FFE379] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm text-neutral-400">Loading Portfolio Page Builder...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] text-[#F4F4F4] pb-32">
      {/* Top Header Sticky Bar */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur border-b border-[#262626] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/pages"
            className="p-2 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] hover:border-[#FFE379]/50 text-neutral-300 hover:text-white transition flex items-center space-x-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Back to Pages</span>
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE379] animate-pulse" />
              <h1 className="text-sm sm:text-base font-black uppercase text-white tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Portfolio Page Builder
              </h1>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Live route: <span className="text-[#FFE379]">/portfolio</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/portfolio"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-[#1F1F1F] hover:bg-[#282828] text-neutral-300 hover:text-white border border-[#333] text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#FFE379]" />
            <span className="hidden sm:inline">Live Preview</span>
          </Link>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition shadow-lg flex items-center space-x-2 disabled:opacity-50"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Sections Builder */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Quick Link Notice to Projects Manager */}
        <div className="p-4 rounded-2xl bg-[#FFE379]/10 border border-[#FFE379]/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="w-5 h-5 text-[#FFE379]" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Looking to add or reorder individual Portfolio Projects?
              </h4>
              <p className="text-[11px] text-neutral-400">
                You can create, edit, reorder, and tag individual project items in the dedicated Portfolio Tab.
              </p>
            </div>
          </div>
          <Link
            to="/admin/portfolio"
            className="px-3.5 py-1.5 rounded-xl bg-[#FFE379] text-[#101010] text-xs font-black uppercase tracking-wider hover:bg-[#F2D76B] transition shrink-0"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Manage Projects →
          </Link>
        </div>

        {/* ================= 1. HERO BANNER BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 1: Hero Banner (Videen Showcase)</span>
          </div>

          <div className="mt-2 space-y-6">
            {/* Headers & Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline Pill Badge
                </label>
                <input
                  type="text"
                  value={portfolioData.hero?.tagline || 'WELCOME TO VIDEEN STUDIO'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Button Action Label
                </label>
                <input
                  type="text"
                  value={portfolioData.hero?.buttonText || 'GET STARTED'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, buttonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Headline Line 1 (White & Yellow)
                </label>
                <input
                  type="text"
                  value={portfolioData.hero?.headlineLine1 || "LET'S MAKE"}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, headlineLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Headline Line 2
                </label>
                <input
                  type="text"
                  value={portfolioData.hero?.headlineLine2 || "YOUR VIDEO LOOKS MORE COOL"}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, headlineLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Body Paragraph Description
              </label>
              <textarea
                rows={2}
                value={portfolioData.hero?.description || ''}
                onChange={(e) => setPortfolioData({
                  ...portfolioData,
                  hero: { ...portfolioData.hero, description: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>

            {/* Target Destination Link & Button Style Customizer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#232323]">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Button Action Label
                </label>
                <input
                  type="text"
                  value={portfolioData.hero?.buttonText || 'GET STARTED'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, buttonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Button Target Destination URL
                </label>
                <input
                  type="text"
                  value={portfolioData.hero?.buttonLink || '#my-work-section'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, buttonLink: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Button Design / Style Preset
                </label>
                <select
                  value={portfolioData.hero?.buttonStyle || 'sharp-gold'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, buttonStyle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                >
                  <option value="sharp-gold">Sharp Luxury Gold (Rectangular Sharp)</option>
                  <option value="rounded-gold">Rounded Smooth Gold (Modern Curved)</option>
                  <option value="pill-gold">Pill Curvature Gold (Ultra Rounded Pill)</option>
                  <option value="outline-gold">Minimal Golden Outline (Dark Glass Fill)</option>
                  <option value="cyber-cut">Cyberpunk Angled Cut (Geometric Video Edits)</option>
                </select>
              </div>
            </div>

            {/* Media Uploads: Background + Filmmaker Cutout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#232323]">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Hero Background Image (L-4.jpg)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={portfolioData.hero?.bgImage || ''}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      hero: { ...portfolioData.hero, bgImage: e.target.value }
                    })}
                    className="flex-1 px-3 py-1.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                  <label className="cursor-pointer px-3 py-1.5 bg-[#252525] hover:bg-[#303030] text-white text-xs font-bold rounded-xl border border-[#383838] transition flex items-center space-x-1 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#FFE379]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(e, (url) => {
                        setPortfolioData({
                          ...portfolioData,
                          hero: { ...portfolioData.hero, bgImage: url }
                        });
                      })}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Filmmaker Cutout Image (F1-1.png)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={portfolioData.hero?.filmmakerImage || ''}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      hero: { ...portfolioData.hero, filmmakerImage: e.target.value }
                    })}
                    className="flex-1 px-3 py-1.5 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                  <label className="cursor-pointer px-3 py-1.5 bg-[#252525] hover:bg-[#303030] text-white text-xs font-bold rounded-xl border border-[#383838] transition flex items-center space-x-1 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#FFE379]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(e, (url) => {
                        setPortfolioData({
                          ...portfolioData,
                          hero: { ...portfolioData.hero, filmmakerImage: url }
                        });
                      })}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* 3 Funfact Stat Cards */}
            <div className="pt-2 border-t border-[#232323]">
              <h4 className="text-xs font-bold uppercase text-[#FFE379] mb-3">
                3 Floating Funfact Stat Boxes
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Stat 1 */}
                <div className="p-3 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FFE379] font-bold block">
                    Stat Box #1 (Top-Left)
                  </span>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Value (Number)</label>
                    <input
                      type="text"
                      value={portfolioData.hero?.statYears || '18'}
                      onChange={(e) => setPortfolioData({
                        ...portfolioData,
                        hero: { ...portfolioData.hero, statYears: e.target.value }
                      })}
                      className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Label</label>
                    <input
                      type="text"
                      value={portfolioData.hero?.statYearsLabel || 'Years Experience'}
                      onChange={(e) => setPortfolioData({
                        ...portfolioData,
                        hero: { ...portfolioData.hero, statYearsLabel: e.target.value }
                      })}
                      className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-3 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FFE379] font-bold block">
                    Stat Box #2 (Bottom-Left)
                  </span>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Value (Number)</label>
                    <input
                      type="text"
                      value={portfolioData.hero?.statAwards || '15'}
                      onChange={(e) => setPortfolioData({
                        ...portfolioData,
                        hero: { ...portfolioData.hero, statAwards: e.target.value }
                      })}
                      className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Label</label>
                    <input
                      type="text"
                      value={portfolioData.hero?.statAwardsLabel || 'Best Award'}
                      onChange={(e) => setPortfolioData({
                        ...portfolioData,
                        hero: { ...portfolioData.hero, statAwardsLabel: e.target.value }
                      })}
                      className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-3 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl space-y-2">
                  <span className="text-[10px] font-mono text-[#FFE379] font-bold block">
                    Stat Box #3 (Bottom-Right)
                  </span>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Value (Number)</label>
                    <input
                      type="text"
                      value={portfolioData.hero?.statProjects || '523'}
                      onChange={(e) => setPortfolioData({
                        ...portfolioData,
                        hero: { ...portfolioData.hero, statProjects: e.target.value }
                      })}
                      className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400">Label</label>
                    <input
                      type="text"
                      value={portfolioData.hero?.statProjectsLabel || 'Project Done'}
                      onChange={(e) => setPortfolioData({
                        ...portfolioData,
                        hero: { ...portfolioData.hero, statProjectsLabel: e.target.value }
                      })}
                      className="w-full px-2 py-1 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. WORK ARCHIVE HEADER BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Layers className="w-3 h-3" />
            <span>Section 2: Work Archive Filter Header</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline Label
                </label>
                <input
                  type="text"
                  value={portfolioData.filterSection?.tagline || 'MY WORK'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    filterSection: { ...portfolioData.filterSection, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-white mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={portfolioData.filterSection?.title || 'EXPLORE OUR RECENT PROJECTS'}
                  onChange={(e) => setPortfolioData({
                    ...portfolioData,
                    filterSection: { ...portfolioData.filterSection, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={portfolioData.filterSection?.description || ''}
                onChange={(e) => setPortfolioData({
                  ...portfolioData,
                  filterSection: { ...portfolioData.filterSection, description: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>
          </div>
        </div>

      </main>

      {/* Floating Save Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-2xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-sm tracking-wider transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center space-x-2 border-2 border-black/40 disabled:opacity-50"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : saveSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Portfolio Page Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
