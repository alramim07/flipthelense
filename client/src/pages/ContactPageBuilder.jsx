import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Check, 
  Eye, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageSquare, 
  Megaphone 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSiteSettings } from '../context/SettingsContext';

export default function ContactPageBuilder() {
  const { settings, updateSectionSettings } = useSiteSettings();
  const [contactData, setContactData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings && settings.contactContent) {
      setContactData(JSON.parse(JSON.stringify(settings.contactContent)));
    }
  }, [settings]);

  const handleSave = async () => {
    if (!contactData) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await axios.put('/api/settings', {
        contactContent: contactData
      });

      if (res.data) {
        updateSectionSettings('contactContent', contactData);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error saving Contact Page changes: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  if (!contactData) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-[#FFE379] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm text-neutral-400">Loading Contact Page Builder...</span>
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
                Contact Page Builder
              </h1>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Live route: <span className="text-[#FFE379]">/contact</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/contact"
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

        {/* ================= 1. HERO HEADER BUILDER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Sparkles className="w-3 h-3" />
            <span>Section 1: Hero Header</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Pill Badge
                </label>
                <input
                  type="text"
                  value={contactData.hero?.badge || 'GET IN TOUCH'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    hero: { ...contactData.hero, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Title Line 1 (White)
                </label>
                <input
                  type="text"
                  value={contactData.hero?.titleLine1 || 'Contact'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    hero: { ...contactData.hero, titleLine1: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Title Line 2 (Yellow)
                </label>
                <input
                  type="text"
                  value={contactData.hero?.titleLine2 || 'Us'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    hero: { ...contactData.hero, titleLine2: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Hero Subtitle Description
              </label>
              <textarea
                rows={2}
                value={contactData.hero?.subtitle || ''}
                onChange={(e) => setContactData({
                  ...contactData,
                  hero: { ...contactData.hero, subtitle: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>
          </div>
        </div>

        {/* ================= 2. CONTACT DETAILS & GOOGLE MAP ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <MapPin className="w-3 h-3" />
            <span>Section 2: Contact Information & Google Map</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="text"
                  value={contactData.info?.phone || ''}
                  onChange={(e) => setContactData({
                    ...contactData,
                    info: { ...contactData.info, phone: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-[#FFE379] focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1 flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={contactData.info?.email || ''}
                  onChange={(e) => setContactData({
                    ...contactData,
                    info: { ...contactData.info, email: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-white focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-[#FFE379]" />
                  <span>Website URL</span>
                </label>
                <input
                  type="text"
                  value={contactData.info?.website || 'www.flipthelense.com'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    info: { ...contactData.info, website: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Studio Name (Badge on Map)
                </label>
                <input
                  type="text"
                  value={contactData.info?.studioName || 'FlipTheLense Studio'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    info: { ...contactData.info, studioName: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#FFE379]" />
                <span>Physical Studio Address</span>
              </label>
              <textarea
                rows={2}
                value={contactData.info?.address || ''}
                onChange={(e) => setContactData({
                  ...contactData,
                  info: { ...contactData.info, address: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Google Maps Iframe Embed URL
              </label>
              <input
                type="text"
                value={contactData.info?.mapEmbedUrl || ''}
                onChange={(e) => setContactData({
                  ...contactData,
                  info: { ...contactData.info, mapEmbedUrl: e.target.value }
                })}
                placeholder="https://www.google.com/maps/embed?..."
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
              />
              <p className="text-[10px] text-neutral-500 mt-1">
                Paste the 'src' attribute from any Google Maps Share &gt; Embed a map iframe.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 3. INQUIRY FORM CARD CONFIG ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <MessageSquare className="w-3 h-3" />
            <span>Section 3: Inquiry Form Card</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Tagline Label
                </label>
                <input
                  type="text"
                  value={contactData.form?.tagline || 'CONTACT US'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    form: { ...contactData.form, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-white mb-1">
                  Form Heading Title
                </label>
                <input
                  type="text"
                  value={contactData.form?.title || 'HELLO, HAVE ANY QUESTION?'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    form: { ...contactData.form, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Form Subtitle Description
              </label>
              <textarea
                rows={2}
                value={contactData.form?.description || ''}
                onChange={(e) => setContactData({
                  ...contactData,
                  form: { ...contactData.form, description: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-neutral-300 focus:border-[#FFE379] focus:outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                Submit Button Text
              </label>
              <input
                type="text"
                value={contactData.form?.buttonText || 'SUBMIT BUTTON'}
                onChange={(e) => setContactData({
                  ...contactData,
                  form: { ...contactData.form, buttonText: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-[#FFE379] uppercase focus:border-[#FFE379] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ================= 4. BOTTOM PROMO BANNER ================= */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[#141414]/90 border-2 border-[#262626] hover:border-[#FFE379]/50 transition-all shadow-xl">
          <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-[#FFE379] text-[#101010] text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 shadow">
            <Megaphone className="w-3 h-3" />
            <span>Section 4: Bottom Promotion Banner</span>
          </div>

          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#FFE379] mb-1">
                  Banner Tagline
                </label>
                <input
                  type="text"
                  value={contactData.bottomCta?.badge || 'VIDEEN PROMOTION'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    bottomCta: { ...contactData.bottomCta, badge: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-white mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={contactData.bottomCta?.title || ''}
                  onChange={(e) => setContactData({
                    ...contactData,
                    bottomCta: { ...contactData.bottomCta, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-bold text-white uppercase focus:border-[#FFE379] focus:outline-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={contactData.bottomCta?.buttonText || 'VIEW PORTFOLIO'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    bottomCta: { ...contactData.bottomCta, buttonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs text-white uppercase focus:border-[#FFE379] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-neutral-400 mb-1">
                  Button Target Destination
                </label>
                <input
                  type="text"
                  value={contactData.bottomCta?.buttonLink || '/portfolio'}
                  onChange={(e) => setContactData({
                    ...contactData,
                    bottomCta: { ...contactData.bottomCta, buttonLink: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl text-xs font-mono text-neutral-300 focus:border-[#FFE379] focus:outline-none"
                />
              </div>
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
              <span>Save All Contact Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
