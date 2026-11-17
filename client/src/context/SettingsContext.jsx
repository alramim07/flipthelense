import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const defaultSettings = {
  // Favicons
  frontendFavicon: '',
  adminFavicon: '',
  mergeFavicon: false,

  // Logos
  frontendLogo: '',
  adminLogo: '',
  footerLogo: '',
  logoHeight: 44, // Dynamic logo height in pixels (default 44px)
  mergeAdminLogo: false,
  mergeFooterLogo: false,

  // Menus
  activeMenuId: 'main-nav',
  menus: [
    {
      id: 'main-nav',
      name: 'Main Navigation',
      items: [
        { id: 'item-1', label: 'Home', path: '/' },
        { id: 'item-2', label: 'About', path: '/about' },
        { id: 'item-3', label: 'Services', path: '/services/cinematic-wedding-video-editing' },
        { id: 'item-4', label: 'Portfolio', path: '/portfolio' },
        { id: 'item-5', label: 'Contact', path: '/contact' }
      ]
    }
  ],

  // Header CTA Button Customizer
  headerCta: {
    enabled: true,
    text: 'Contact Us',
    link: '/contact',
    style: 'solid-gold', // 'solid-gold' | 'outline-gold' | 'glass-minimal' | 'rounded-pill'
    size: 'medium', // 'small' | 'medium' | 'large'
    customColor: '#FFE379',
    textColor: '#101010'
  },

  // Footer Dynamic Customizer
  footer: {
    aboutText: 'Transform your footage into high-impact cinematic stories. Professional video editing, color grading, and visual storytelling that captivates audiences.',
    licenceNo: 'TRAD/DNCC/008721/2025',
    companyTitle: 'Company',
    companyLinks: [
      { id: 'fl-1', label: 'About Us', path: '/about' },
      { id: 'fl-2', label: 'Portfolio', path: '/portfolio' },
      { id: 'fl-3', label: 'Our Services', path: '/services/cinematic-wedding-video-editing' },
      { id: 'fl-4', label: 'Privacy Policy', path: '#' },
      { id: 'fl-5', label: 'Terms & Conditions', path: '#' },
      { id: 'fl-6', label: 'Refund Policy', path: '#' }
    ],
    contactTitle: 'Get In Touch',
    address: 'Shyamoli, Mohammadpur, Dhaka 1207',
    phone: '+880 1885 000118',
    email: 'flipthelense@gmail.com',
    socials: [
      { id: 'soc-1', name: 'Facebook', iconType: 'text', iconText: 'f', iconUrl: '', link: 'https://facebook.com' },
      { id: 'soc-2', name: 'YouTube', iconType: 'text', iconText: '▶', iconUrl: '', link: 'https://youtube.com' },
      { id: 'soc-3', name: 'Instagram', iconType: 'text', iconText: 'IG', iconUrl: '', link: 'https://instagram.com' }
    ],
    copyrightText: '© {year} FlipTheLense. All Rights Reserved.',
    paymentGateways: [
      { id: 'pg-1', name: 'Visa', logoUrl: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/visa.svg' },
      { id: 'pg-2', name: 'Mastercard', logoUrl: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/mastercard.svg' },
      { id: 'pg-3', name: 'Amex', logoUrl: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/amex.svg' },
      { id: 'pg-4', name: 'bKash', logoUrl: 'https://raw.githubusercontent.com/tariqul-islam/bangladesh-payment-icons/master/svg/bkash.svg' },
      { id: 'pg-5', name: 'Nagad', logoUrl: 'https://raw.githubusercontent.com/tariqul-islam/bangladesh-payment-icons/master/svg/nagad.svg' }
    ]
  },

  // Homepage Dynamic Content Model
  homeContent: {
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
      animationStyle: 'classic-road', // 'classic-road' | 'neon-cyber' | 'filmstrip-sprocket' | 'electric-pulse' | 'cosmic-drift' | 'hyperspeed-warp'
      bottomBannerText: 'A structured, creative and detail-focused process that turns your raw footage into engaging, viral video content.',
      steps: [
        {
          step: '01',
          title: 'Discovery & Planning',
          desc: 'Understand your goals, audience and creative vision.',
          icon: '', // Custom icon image URL, or default lucide icon
          iconType: 'default',
          position: 'top',
          nodeIndex: 0
        },
        {
          step: '02',
          title: 'Footage Organization',
          desc: 'Ingest, back up and organize all raw footage for a smooth editing workflow.',
          icon: '',
          iconType: 'default',
          position: 'bottom',
          nodeIndex: 1
        },
        {
          step: '03',
          title: 'Rough Cut & Story Build',
          desc: 'Arrange the best shots and craft the initial flow of the story.',
          icon: '',
          iconType: 'default',
          position: 'top',
          nodeIndex: 2
        },
        {
          step: '04',
          title: 'Editing & Polishing',
          desc: 'Refine the cut, add transitions, graphics and maintain a strong narrative.',
          icon: '',
          iconType: 'default',
          position: 'bottom',
          nodeIndex: 3
        },
        {
          step: '05',
          title: 'Color, Sound & Refinement',
          desc: 'Enhance the visuals with color grading, sound design and motion graphics.',
          icon: '',
          iconType: 'default',
          position: 'top',
          nodeIndex: 4
        },
        {
          step: '06',
          title: 'Final Review & Delivery',
          desc: 'Review, make necessary revisions and deliver a ready-to-publish video.',
          icon: '',
          iconType: 'default',
          position: 'bottom',
          nodeIndex: 5
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
  }
};

const SettingsContext = createContext({
  settings: defaultSettings,
  updateSettings: () => {},
  loading: false
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/settings');
      if (res.data) {
        setSettings({
          ...defaultSettings,
          ...res.data,
          headerCta: {
            ...defaultSettings.headerCta,
            ...(res.data.headerCta || {})
          },
          footer: {
            ...defaultSettings.footer,
            ...(res.data.footer || {}),
            companyLinks: res.data.footer?.companyLinks || defaultSettings.footer.companyLinks,
            socials: res.data.footer?.socials || defaultSettings.footer.socials,
            paymentGateways: res.data.footer?.paymentGateways || defaultSettings.footer.paymentGateways
          },
          homeContent: {
            hero: { ...defaultSettings.homeContent.hero, ...(res.data.homeContent?.hero || {}) },
            reels: res.data.homeContent?.reels && res.data.homeContent.reels.length > 0 ? res.data.homeContent.reels : defaultSettings.homeContent.reels,
            about: {
              ...defaultSettings.homeContent.about,
              ...(res.data.homeContent?.about || {}),
              skills: res.data.homeContent?.about?.skills && res.data.homeContent.about.skills.length > 0
                ? res.data.homeContent.about.skills
                : defaultSettings.homeContent.about.skills
            },
            process: {
              ...defaultSettings.homeContent.process,
              ...(res.data.homeContent?.process || {}),
              steps: res.data.homeContent?.process?.steps && res.data.homeContent.process.steps.length > 0
                ? res.data.homeContent.process.steps
                : defaultSettings.homeContent.process.steps
            },
            cta: { ...defaultSettings.homeContent.cta, ...(res.data.homeContent?.cta || {}) }
          },
          menus: res.data.menus && res.data.menus.length > 0 ? res.data.menus : defaultSettings.menus
        });
      }
    } catch (err) {
      console.warn('Failed to fetch settings from API, using defaults:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Dynamically update favicon in the browser tab
  useEffect(() => {
    const isAdmin = window.location.pathname.startsWith('/admin');
    let targetFavicon = '';

    if (isAdmin) {
      targetFavicon = settings.mergeFavicon ? settings.frontendFavicon : (settings.adminFavicon || settings.frontendFavicon);
    } else {
      targetFavicon = settings.frontendFavicon;
    }

    if (targetFavicon) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = targetFavicon;
    }
  }, [settings.frontendFavicon, settings.adminFavicon, settings.mergeFavicon]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, fetchSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SettingsContext);
}
