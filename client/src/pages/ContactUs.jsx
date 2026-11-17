import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import axios from 'axios';
import { useSiteSettings } from '../context/SettingsContext';

export default function ContactUs() {
  const { settings } = useSiteSettings();
  const contact = settings?.contactContent || {};

  const hero = contact.hero || {
    badge: 'GET IN TOUCH',
    titleLine1: 'Contact',
    titleLine2: 'Us',
    subtitle: "Let's discuss your next cinematic video project or commercial campaign."
  };

  const info = contact.info || {
    phone: '+880 1885 000118',
    email: 'flipthelense@gmail.com',
    website: 'www.flipthelense.com',
    address: 'Shyamoli, Mohammadpur,\nDhaka 1207, Bangladesh',
    studioName: 'FlipTheLense Studio',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.06992648784!2d90.3582451!3d23.7645851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c09f9ba3d447%3A0x1bab85212fb32a76!2sShyamoli%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'
  };

  const form = contact.form || {
    tagline: 'CONTACT US',
    title: 'HELLO, HAVE ANY QUESTION?',
    description: 'Have a raw footage bundle or a vision you want to bring to life? Send us a message and our team will get back to you within 24 hours.',
    buttonText: 'SUBMIT BUTTON'
  };

  const bottomCta = contact.bottomCta || {
    bgImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80',
    badge: 'COLLABORATE',
    title: 'READY TO START YOUR NEXT CINEMATIC PROJECT?',
    buttonText: 'VIEW PORTFOLIO',
    buttonLink: '/portfolio',
    buttonStyle: 'outline-white'
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/inquiries', {
        name: formData.name,
        email: formData.email,
        serviceType: 'Contact Page Inquiry',
        packageChosen: 'General Contact',
        notes: formData.message
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] text-[#F4F4F4]">
      
      {/* ================= HERO HEADER ================= */}
      <div className="relative pt-24 pb-16 px-4 sm:px-8 border-b border-[#232323] overflow-hidden bg-[#141414]">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#FFE379]/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1F1F1F] border border-[#2E2E2E] shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE379]" />
            <span 
              className="text-xs uppercase tracking-widest text-[#FFE379] font-semibold"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {hero.badge}
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {hero.titleLine1} <span className="text-[#FFE379]">{hero.titleLine2}</span>
          </h1>
          <p 
            className="text-xs sm:text-sm text-neutral-400 uppercase tracking-[0.25em] mt-3 font-medium max-w-xl mx-auto"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {hero.subtitle}
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTACT SECTION ================= */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Map + 4 Contact Info Blocks */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-10">
            
            {/* Grayscale Map Container */}
            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-[#232323] shadow-2xl bg-[#1A1A1A]">
              <iframe
                title="Office Location Map"
                src={info.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  filter: 'grayscale(100%) invert(92%) contrast(85%) hue-rotate(180deg)' 
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Map Floating Location Badge */}
              <div className="absolute top-4 left-4 bg-[#141414]/90 backdrop-blur-md border border-[#2D2D2D] p-3 rounded-xl shadow-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFE379] text-[#101010] flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{info.studioName}</h4>
                  <p className="text-[11px] text-neutral-400 whitespace-pre-line">{info.address?.split('\n')[0]}</p>
                </div>
              </div>
            </div>

            {/* 4 Contact Info Tiles in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              
              {/* Phone Number */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FFE379]/40 flex items-center justify-center text-[#FFE379] shrink-0 shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 
                    className="text-base sm:text-lg font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Phone Number
                  </h4>
                  <a 
                    href={`tel:${info.phone}`} 
                    className="text-xs sm:text-sm text-[#FFE379] font-mono mt-0.5 block hover:underline"
                  >
                    {info.phone}
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FFE379]/40 flex items-center justify-center text-[#FFE379] shrink-0 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 
                    className="text-base sm:text-lg font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Email Address
                  </h4>
                  <a 
                    href={`mailto:${info.email}`}
                    className="text-xs sm:text-sm text-neutral-400 hover:text-[#FFE379] transition mt-0.5 block"
                  >
                    {info.email}
                  </a>
                </div>
              </div>

              {/* Websites */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FFE379]/40 flex items-center justify-center text-[#FFE379] shrink-0 shadow-md">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 
                    className="text-base sm:text-lg font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Websites
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-0.5">
                    {info.website}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FFE379]/40 flex items-center justify-center text-[#FFE379] shrink-0 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 
                    className="text-base sm:text-lg font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Address
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-snug mt-0.5 whitespace-pre-line">
                    {info.address}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form Card */}
          <div className="lg:col-span-6 bg-[#161616] border border-[#232323] rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            
            <span 
              className="text-xs uppercase tracking-[0.2em] text-[#FFE379] font-bold block mb-2"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {form.tagline}
            </span>

            <h2 
              className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase text-white tracking-tight leading-none mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {form.title}
            </h2>

            <p 
              className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed mb-8 font-normal"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {form.description}
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#FFE379]/10 border border-[#FFE379]/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FFE379] text-[#101010] flex items-center justify-center mx-auto font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Message Received!
                </h3>
                <p className="text-xs text-neutral-300">
                  Thank you for reaching out. We will review your message and reply via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-[#FFE379] hover:underline font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-transparent border border-[#FFE379]/40 focus:border-[#FFE379] text-white placeholder-neutral-400 text-xs sm:text-sm rounded-none focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-transparent border border-[#FFE379]/40 focus:border-[#FFE379] text-white placeholder-neutral-400 text-xs sm:text-sm rounded-none focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    rows="6"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 bg-transparent border border-[#FFE379]/40 focus:border-[#FFE379] text-white placeholder-neutral-400 text-xs sm:text-sm rounded-none focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs sm:text-sm tracking-wider px-8 py-3.5 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center space-x-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <span>{loading ? 'SENDING...' : (form.buttonText || 'SUBMIT BUTTON')}</span>
                  {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* ================= PROMOTION CTA BANNER ================= */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-[#232323] shadow-2xl min-h-[380px] sm:min-h-[420px] flex items-center justify-center text-center p-8 sm:p-14">
          
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${bottomCta.bgImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80'}')`,
            }}
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span 
              className="text-xs uppercase tracking-[0.25em] text-[#FFE379] font-bold block"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {bottomCta.badge}
            </span>

            <h2 
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {bottomCta.title}
            </h2>

            <div className="pt-2">
              <Link
                to={bottomCta.buttonLink || '/portfolio'}
                className={`inline-flex items-center justify-center px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl ${
                  (bottomCta.buttonStyle || bottomCta.btnStyle) === 'solid-gold'
                    ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black rounded-none'
                    : (bottomCta.buttonStyle || bottomCta.btnStyle) === 'rounded-smooth'
                    ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black rounded-xl'
                    : (bottomCta.buttonStyle || bottomCta.btnStyle) === 'pill'
                    ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black rounded-full'
                    : (bottomCta.buttonStyle || bottomCta.btnStyle) === 'cyber-cut'
                    ? 'bg-[#FFE379] hover:bg-[#ebd074] text-black clip-diagonal'
                    : 'bg-transparent border border-white hover:border-[#FFE379] text-white hover:text-[#FFE379] rounded-none'
                }`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>{bottomCta.buttonText || bottomCta.btnText || 'VIEW PORTFOLIO'}</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
