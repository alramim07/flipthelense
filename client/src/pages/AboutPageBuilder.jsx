import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Check, 
  Eye, 
  Upload, 
  Plus, 
  Trash2, 
  Sparkles, 
  User, 
  FileText, 
  Award, 
  Briefcase, 
  Cpu, 
  Link as LinkIcon,
  AlertCircle,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSiteSettings } from '../context/SettingsContext';

export default function AboutPageBuilder() {
  const { settings, updateSectionSettings } = useSiteSettings();
  const [aboutData, setAboutData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Initialize local state from context settings
  useEffect(() => {
    if (settings && settings.aboutContent) {
      const cloned = JSON.parse(JSON.stringify(settings.aboutContent));
      // Ensure toolsGear exists and has categories
      if (!cloned.toolsGear) {
        cloned.toolsGear = cloned.tools || {
          badge: 'PRODUCTION ARSENAL',
          title: 'GEAR & SOFTWARE',
          categories: [
            { category: 'EDITING & COLOR', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Wondershare Filmora', 'CapCut Pro'] },
            { category: 'DESIGN & GRAPHICS', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics Templates', 'Blender 3D Basics'] },
            { category: 'AUDIO SUITE', items: ['Adobe Audition', 'iZotope RX Noise Reduction', 'Foley Sound Design', 'Spatial Audio Mixing'] },
            { category: 'CAMERA & HARDWARE', items: ['Sony Alpha Series (4K 10-bit)', 'DJI Ronin Gimbal Stabilizers', 'Anamorphic & Prime Glass', 'Wireless Audio Transmitters'] }
          ]
        };
      } else if (!cloned.toolsGear.categories || cloned.toolsGear.categories.length === 0) {
        cloned.toolsGear.categories = [
          { category: 'EDITING & COLOR', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Wondershare Filmora', 'CapCut Pro'] },
          { category: 'DESIGN & GRAPHICS', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics Templates', 'Blender 3D Basics'] },
          { category: 'AUDIO SUITE', items: ['Adobe Audition', 'iZotope RX Noise Reduction', 'Foley Sound Design', 'Spatial Audio Mixing'] },
          { category: 'CAMERA & HARDWARE', items: ['Sony Alpha Series (4K 10-bit)', 'DJI Ronin Gimbal Stabilizers', 'Anamorphic & Prime Glass', 'Wireless Audio Transmitters'] }
        ];
      }

      // Ensure quote has authorScript / signature
      if (!cloned.quote) cloned.quote = {};
      if (!cloned.quote.authorScript) {
        cloned.quote.authorScript = cloned.quote.signature || 'Parvej Mosharrof';
      }

      // Ensure CTA has both buttons and styles
      if (!cloned.cta) {
        cloned.cta = {};
      }
      if (!cloned.cta.primaryBtnText) cloned.cta.primaryBtnText = cloned.cta.buttonText || 'Contact Me Now';
      if (!cloned.cta.primaryBtnLink) cloned.cta.primaryBtnLink = cloned.cta.buttonLink || '/contact';
      if (!cloned.cta.primaryBtnStyle) cloned.cta.primaryBtnStyle = 'solid-gold';
      if (!cloned.cta.secondaryBtnText) cloned.cta.secondaryBtnText = 'Explore Portfolio';
      if (!cloned.cta.secondaryBtnLink) cloned.cta.secondaryBtnLink = '/portfolio';
      if (!cloned.cta.secondaryBtnStyle) cloned.cta.secondaryBtnStyle = 'outline-white';

      setAboutData(cloned);
    }
  }, [settings]);

  // Handle direct file uploads to server/uploads/
  const handleUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast('error', 'File size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('image', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data?.url) {
        callback(res.data.url);
        showToast('success', 'Image uploaded successfully!');
      } else {
        throw new Error('Server did not return file URL');
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Image upload failed';
      showToast('error', `Upload failed: ${errMsg}`);
      
      // Fallback: read as base64 data URL so user is never blocked
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          callback(loadEvt.target.result);
          showToast('success', 'Image loaded locally (fallback)');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save all About page changes to server settings
  const handleSave = async () => {
    if (!aboutData) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await axios.put('/api/settings', {
        aboutContent: aboutData
      });

      if (res.data) {
        updateSectionSettings('aboutContent', aboutData);
        setSaveSuccess(true);
        showToast('success', 'All About Page changes saved successfully!');
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      showToast('error', `Error saving About Page changes: ${errMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!aboutData) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-[#FFE379] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm text-neutral-400">Loading About Page Builder...</span>
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
                About Us Page Builder
              </h1>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Live route: <span className="text-[#FFE379]">/about</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/about"
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

      {/* Floating Modern Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
            toast.type === 'error'
              ? 'bg-[#1C1212] border-red-500/50 text-red-300'
              : 'bg-[#121A14] border-emerald-500/50 text-emerald-300'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="font-mono">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="p-1 hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Sections Builder */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ================= 1. HERO BANNER BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 1: Hero Banner</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Title Line 1 (White)
                </label>
                <input
                  type="text"
                  value={aboutData.hero?.titleLine1 || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    hero: { ...aboutData.hero, titleLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Title Line 2 (Golden Accent)
                </label>
                <input
                  type="text"
                  value={aboutData.hero?.titleLine2 || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    hero: { ...aboutData.hero, titleLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Breadcrumb Subtitle
              </label>
              <input
                type="text"
                value={aboutData.hero?.breadcrumb || 'Home / Resume'}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  hero: { ...aboutData.hero, breadcrumb: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Background Image URL or Upload
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={aboutData.hero?.bgImage || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    hero: { ...aboutData.hero, bgImage: e.target.value }
                  })}
                  placeholder="Paste image link or upload"
                  className="flex-1 px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
                <label className="cursor-pointer px-4 py-2 bg-[#252525] hover:bg-[#303030] text-white text-xs font-bold rounded-xl border border-[#383838] transition flex items-center space-x-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#FFE379]" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, (url) => {
                      setAboutData({
                        ...aboutData,
                        hero: { ...aboutData.hero, bgImage: url }
                      });
                    })}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. QUOTE & SIGNATURE BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <FileText className="w-3 h-3" />
            <span>Section 2: Quote & Script Signature</span>
          </div>

          <div className="mt-2 space-y-4">
            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Quote Statement
              </label>
              <textarea
                rows={3}
                value={aboutData.quote?.statement || ''}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  quote: { ...aboutData.quote, statement: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Cursive Script Text
                </label>
                <input
                  type="text"
                  value={aboutData.quote?.authorScript || 'Parvej Mosharrof'}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    quote: { ...aboutData.quote, authorScript: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Great Vibes', cursive", fontSize: '18px' }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Author Full Name (Caps)
                </label>
                <input
                  type="text"
                  value={aboutData.quote?.authorName || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    quote: { ...aboutData.quote, authorName: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Author Title / Role
                </label>
                <input
                  type="text"
                  value={aboutData.quote?.authorTitle || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    quote: { ...aboutData.quote, authorTitle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. PROFILE BIO & SKILLS PROGRESS BARS ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <User className="w-3 h-3" />
            <span>Section 3: Profile Bio & Skills Progress</span>
          </div>

          <div className="mt-2 space-y-6">
            {/* Bio Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Since Tag (e.g. SINCE 2022)
                </label>
                <input
                  type="text"
                  value={aboutData.profile?.badge || 'SINCE 2022'}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    profile: { ...aboutData.profile, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white focus:border-[#FFE379] focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Main Bio Headline
                </label>
                <input
                  type="text"
                  value={aboutData.profile?.heading || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    profile: { ...aboutData.profile, heading: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white focus:border-[#FFE379] focus:outline-none uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Bio Paragraph
              </label>
              <textarea
                rows={3}
                value={aboutData.profile?.bio || ''}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  profile: { ...aboutData.profile, bio: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Profile Portrait Image
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={aboutData.profile?.img || ''}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    profile: { ...aboutData.profile, img: e.target.value }
                  })}
                  className="flex-1 px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
                <label className="cursor-pointer px-4 py-2 bg-[#252525] hover:bg-[#303030] text-white text-xs font-bold rounded-xl border border-[#383838] transition flex items-center space-x-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#FFE379]" />
                  <span>Upload Portrait</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUpload(e, (url) => {
                      setAboutData({
                        ...aboutData,
                        profile: { ...aboutData.profile, img: url }
                      });
                    })}
                  />
                </label>
              </div>
            </div>

            {/* Skills Slider List */}
            <div className="pt-4 border-t border-[#232323] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#FFE379]">
                    Skills Progress Bars ({(aboutData.profile?.skills || []).length})
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Adjust skill names and percentage sliders rendered on the About page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(aboutData.profile?.skills || []),
                      { name: 'NEW SKILL', percent: 80 }
                    ];
                    setAboutData({
                      ...aboutData,
                      profile: { ...aboutData.profile, skills: updated }
                    });
                  }}
                  className="px-3 py-1.5 bg-[#222] hover:bg-[#2C2C2C] text-[#FFE379] border border-[#333] rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(aboutData.profile?.skills || []).map((sk, idx) => (
                  <div key={idx} className="p-3 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#FFE379] font-bold">Skill #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (aboutData.profile?.skills || []).filter((_, i) => i !== idx);
                          setAboutData({
                            ...aboutData,
                            profile: { ...aboutData.profile, skills: updated }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={sk.name || ''}
                      onChange={(e) => {
                        const updated = [...(aboutData.profile?.skills || [])];
                        updated[idx] = { ...updated[idx], name: e.target.value };
                        setAboutData({
                          ...aboutData,
                          profile: { ...aboutData.profile, skills: updated }
                        });
                      }}
                      placeholder="Skill Name (e.g. ADOBE PREMIERE PRO)"
                      className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                    />

                    <div className="flex items-center space-x-3 pt-1">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={sk.percent || 80}
                        onChange={(e) => {
                          const updated = [...(aboutData.profile?.skills || [])];
                          updated[idx] = { ...updated[idx], percent: Number(e.target.value) };
                          setAboutData({
                            ...aboutData,
                            profile: { ...aboutData.profile, skills: updated }
                          });
                        }}
                        className="flex-1 accent-[#FFE379]"
                      />
                      <span className="text-xs font-mono font-bold text-[#FFE379] w-12 text-right">
                        {sk.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. SPECIALTIES BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Award className="w-3 h-3" />
            <span>Section 4: My Specialties</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Tagline Badge
                </label>
                <input
                  type="text"
                  value={aboutData.specialties?.badge || 'FLIPTHELENSE STUDIO'}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    specialties: { ...aboutData.specialties, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={aboutData.specialties?.title || 'MY SPECIALTIES'}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    specialties: { ...aboutData.specialties, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            {/* Specialties 4 Cards */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(aboutData.specialties?.items || []).map((card, idx) => (
                <div key={idx} className="p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl space-y-2.5">
                  <span className="text-[10px] font-mono text-[#FFE379] font-bold block">
                    Specialty Card #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={card.title || ''}
                    onChange={(e) => {
                      const updated = [...(aboutData.specialties?.items || [])];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setAboutData({
                        ...aboutData,
                        specialties: { ...aboutData.specialties, items: updated }
                      });
                    }}
                    placeholder="Title (e.g. CINEMATIC WEDDING FILMS)"
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={card.subtitle || ''}
                    onChange={(e) => {
                      const updated = [...(aboutData.specialties?.items || [])];
                      updated[idx] = { ...updated[idx], subtitle: e.target.value };
                      setAboutData({
                        ...aboutData,
                        specialties: { ...aboutData.specialties, items: updated }
                      });
                    }}
                    placeholder="Subtitle (e.g. Emotional Storytelling)"
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={card.desc || ''}
                    onChange={(e) => {
                      const updated = [...(aboutData.specialties?.items || [])];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      setAboutData({
                        ...aboutData,
                        specialties: { ...aboutData.specialties, items: updated }
                      });
                    }}
                    placeholder="Short description..."
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-400 focus:border-[#FFE379] focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 5. WORK EXPERIENCE TIMELINE BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Briefcase className="w-3 h-3" />
            <span>Section 5: Career Work Experience</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#FFE379]">
                  Work Experience Cards ({(aboutData.experience?.items || []).length})
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Manage chronological employment roles, companies, locations, and achievements.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const updated = [
                    ...(aboutData.experience?.items || []),
                    {
                      period: '2023 - PRESENT',
                      role: 'Video Editor & Colorist',
                      company: 'Production Studio',
                      location: 'Dhaka, Bangladesh',
                      achievements: ['Delivered commercial projects.']
                    }
                  ];
                  setAboutData({
                    ...aboutData,
                    experience: { ...aboutData.experience, items: updated }
                  });
                }}
                className="px-3 py-1.5 bg-[#222] hover:bg-[#2C2C2C] text-[#FFE379] border border-[#333] rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {(aboutData.experience?.items || []).map((exp, idx) => (
                <div key={idx} className="p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#FFE379] font-bold">Position #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (aboutData.experience?.items || []).filter((_, i) => i !== idx);
                        setAboutData({
                          ...aboutData,
                          experience: { ...aboutData.experience, items: updated }
                        });
                      }}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">Role Title</label>
                      <input
                        type="text"
                        value={exp.role || ''}
                        onChange={(e) => {
                          const updated = [...(aboutData.experience?.items || [])];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          setAboutData({
                            ...aboutData,
                            experience: { ...aboutData.experience, items: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs text-white focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">Company</label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const updated = [...(aboutData.experience?.items || [])];
                          updated[idx] = { ...updated[idx], company: e.target.value };
                          setAboutData({
                            ...aboutData,
                            experience: { ...aboutData.experience, items: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs text-white focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">Period</label>
                      <input
                        type="text"
                        value={exp.period || ''}
                        onChange={(e) => {
                          const updated = [...(aboutData.experience?.items || [])];
                          updated[idx] = { ...updated[idx], period: e.target.value };
                          setAboutData({
                            ...aboutData,
                            experience: { ...aboutData.experience, items: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs font-mono text-[#FFE379] focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-0.5">
                      Achievements Bullet Points (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={Array.isArray(exp.achievements) ? exp.achievements.join('\n') : exp.achievements || ''}
                      onChange={(e) => {
                        const updated = [...(aboutData.experience?.items || [])];
                        updated[idx] = { ...updated[idx], achievements: e.target.value.split('\n') };
                        setAboutData({
                          ...aboutData,
                          experience: { ...aboutData.experience, items: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 6. PRODUCTION GEAR & SOFTWARE STACK BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Cpu className="w-3 h-3" />
            <span>Section 6: Gear & Software Stack</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Tagline Badge
                </label>
                <input
                  type="text"
                  value={aboutData.toolsGear?.badge || 'PRODUCTION ARSENAL'}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    toolsGear: { ...aboutData.toolsGear, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={aboutData.toolsGear?.title || 'GEAR & SOFTWARE'}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    toolsGear: { ...aboutData.toolsGear, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-neutral-300 uppercase">
                Categories ({(aboutData.toolsGear?.categories || []).length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const updated = [
                    ...(aboutData.toolsGear?.categories || []),
                    { category: 'NEW CATEGORY', items: ['Tool 1', 'Tool 2'] }
                  ];
                  setAboutData({
                    ...aboutData,
                    toolsGear: { ...aboutData.toolsGear, categories: updated }
                  });
                }}
                className="px-3 py-1.5 bg-[#222] hover:bg-[#2C2C2C] text-[#FFE379] border border-[#333] rounded-xl text-xs font-bold uppercase flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(aboutData.toolsGear?.categories || []).map((cat, idx) => (
                <div key={idx} className="p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#FFE379] font-bold">Category #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (aboutData.toolsGear?.categories || []).filter((_, i) => i !== idx);
                        setAboutData({
                          ...aboutData,
                          toolsGear: { ...aboutData.toolsGear, categories: updated }
                        });
                      }}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={cat.category || ''}
                    onChange={(e) => {
                      const updated = [...(aboutData.toolsGear?.categories || [])];
                      updated[idx] = { ...updated[idx], category: e.target.value };
                      setAboutData({
                        ...aboutData,
                        toolsGear: { ...aboutData.toolsGear, categories: updated }
                      });
                    }}
                    placeholder="Category Name"
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs font-bold text-[#FFE379] uppercase focus:border-[#FFE379] focus:outline-none"
                  />
                  <label className="block text-[9px] uppercase font-bold text-neutral-400">
                    Comma-separated tools or gear:
                  </label>
                  <textarea
                    rows={2}
                    value={Array.isArray(cat.items) ? cat.items.join(', ') : cat.items || ''}
                    onChange={(e) => {
                      const updated = [...(aboutData.toolsGear?.categories || [])];
                      updated[idx] = { ...updated[idx], items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                      setAboutData({
                        ...aboutData,
                        toolsGear: { ...aboutData.toolsGear, categories: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 7. BOTTOM CTA BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <LinkIcon className="w-3 h-3" />
            <span>Section 7: Bottom Call To Action & 2 Action Buttons</span>
          </div>

          <div className="mt-2 space-y-6">
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                Headline
              </label>
              <input
                type="text"
                value={aboutData.cta?.title || ''}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  cta: { ...aboutData.cta, title: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={aboutData.cta?.subtitle || ''}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  cta: { ...aboutData.cta, subtitle: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>

            {/* BUTTON 1 (PRIMARY) CONFIGURATION */}
            <div className="p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#FFE379] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFE379]" />
                  <span>Button 1 (Primary Action)</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">e.g. Contact Me Now</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                    Label Text
                  </label>
                  <input
                    type="text"
                    value={aboutData.cta?.primaryBtnText || aboutData.cta?.buttonText || 'Contact Me Now'}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      cta: { 
                        ...aboutData.cta, 
                        primaryBtnText: e.target.value,
                        buttonText: e.target.value 
                      }
                    })}
                    className="w-full px-3 py-1.5 bg-[#121212] border border-[#262626] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                    Target Link / Route
                  </label>
                  <input
                    type="text"
                    value={aboutData.cta?.primaryBtnLink || aboutData.cta?.buttonLink || '/contact'}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      cta: { 
                        ...aboutData.cta, 
                        primaryBtnLink: e.target.value,
                        buttonLink: e.target.value 
                      }
                    })}
                    className="w-full px-3 py-1.5 bg-[#121212] border border-[#262626] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                    Button Style Preset
                  </label>
                  <select
                    value={aboutData.cta?.primaryBtnStyle || 'solid-gold'}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      cta: { ...aboutData.cta, primaryBtnStyle: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#121212] border border-[#262626] rounded-xl text-xs font-bold text-[#FFE379] focus:border-[#FFE379] focus:outline-none uppercase"
                  >
                    <option value="solid-gold">Sharp Luxury Gold (Default)</option>
                    <option value="rounded-smooth">Rounded Modern Gold</option>
                    <option value="pill">Pill Curvature Gold</option>
                    <option value="outline-gold">Minimal Golden Outline</option>
                    <option value="cyber-cut">Cyberpunk Angled Cut</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BUTTON 2 (SECONDARY) CONFIGURATION */}
            <div className="p-4 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-white flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>Button 2 (Secondary Action)</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">e.g. Explore Portfolio</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                    Label Text
                  </label>
                  <input
                    type="text"
                    value={aboutData.cta?.secondaryBtnText || 'Explore Portfolio'}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      cta: { ...aboutData.cta, secondaryBtnText: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#121212] border border-[#262626] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                    Target Link / Route
                  </label>
                  <input
                    type="text"
                    value={aboutData.cta?.secondaryBtnLink || '/portfolio'}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      cta: { ...aboutData.cta, secondaryBtnLink: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#121212] border border-[#262626] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                    Button Style Preset
                  </label>
                  <select
                    value={aboutData.cta?.secondaryBtnStyle || 'outline-white'}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      cta: { ...aboutData.cta, secondaryBtnStyle: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#121212] border border-[#262626] rounded-xl text-xs font-bold text-neutral-300 focus:border-[#FFE379] focus:outline-none uppercase"
                  >
                    <option value="outline-white">Minimal White Outline (Default)</option>
                    <option value="rounded-smooth">Rounded Border White</option>
                    <option value="pill">Pill Border White</option>
                    <option value="solid-dark">Solid Charcoal Dark with Gold Text</option>
                    <option value="solid-gold">Solid Luxury Gold</option>
                    <option value="glass">Frosted Glass with Border</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Save Bar at the bottom */}
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
              <span>Save All About Page Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
