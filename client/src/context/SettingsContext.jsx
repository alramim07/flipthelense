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
          iconEmoji: '',
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
      buttonLink: '/contact',
      buttonStyle: 'sharp-gold', // 'sharp-gold' | 'rounded-gold' | 'pill-gold' | 'outline-gold' | 'glass-gold' | 'cyber-cut'
      showArrow: true
    }
  },

  // About Page Dynamic Content Model
  aboutContent: {
    hero: {
      titleLine1: 'MY',
      titleLine2: 'RESUME',
      breadcrumb: 'Home / Resume',
      bgImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1600&q=80'
    },
    quote: {
      text: '"Every frame is a chance to move an audience. Filmmaking isn\'t just about putting clips together—it is about rhythm, emotional timing, and sculpting light so memories can live forever."',
      authorName: 'PARVEJ MOSHARROF POLLOB',
      authorTitle: 'Videography / Editor',
      signature: 'Parvej Mosharrof'
    },
    profile: {
      badge: 'SINCE 2022',
      heading: "HELLO, I'M PARVEJ MOSHARROF POLLOB",
      bio: 'For the past 4.5+ years, I have worked across full production pipelines—from shooting on set with cinema gear to final master delivery. My goal is to deliver clean visual clarity, immersive color profiles, and punchy edits that stand out in any feed or theatre screen.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      skills: [
        { name: 'ADOBE PREMIERE PRO', percent: 95 },
        { name: 'ADOBE AFTER EFFECT', percent: 85 },
        { name: '3D MODELLING', percent: 50 },
        { name: 'POST-PRODUCTION TECHNIQUES', percent: 100 }
      ]
    },
    specialties: {
      badge: 'FLIPTHELENSE STUDIO',
      title: 'MY SPECIALTIES',
      bgImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      items: [
        {
          id: 'sp-1',
          title: 'CINEMATIC WEDDING FILMS',
          subtitle: 'Emotional Storytelling',
          desc: 'Crafting non-linear, emotionally captivating wedding teasers and full-length feature films with bespoke pacing, speed ramps, and high-fidelity soundscapes.'
        },
        {
          id: 'sp-2',
          title: 'COMMERCIALS & BRAND REELS',
          subtitle: 'High-Conversion Media',
          desc: 'Dynamic pacing, punchy typography, and trending motion design tailored to capture instant attention on Instagram Reels, YouTube Shorts, and TVC campaigns.'
        },
        {
          id: 'sp-3',
          title: 'COLOR SCIENCE & LOOK DEV',
          subtitle: 'ACES & DaVinci Resolve',
          desc: 'Creating custom film-emulation LUTs, preserving organic skin tones, balancing multi-camera sensor variance, and delivering consistent cinematic mood.'
        },
        {
          id: 'sp-4',
          title: 'POST-PRODUCTION & VFX',
          subtitle: 'Seamless Audio/Visual Sync',
          desc: 'Audio restoration, foley effects, rhythmic montage cuts, object masking, smooth warp transitions, and sophisticated visual enhancements.'
        }
      ]
    },
    experience: {
      badge: 'CAREER TIMELINE',
      title: 'WORK EXPERIENCE',
      items: [
        {
          id: 'exp-1',
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
          id: 'exp-2',
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
          id: 'exp-3',
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
    },
    toolsGear: {
      badge: 'PRODUCTION ARSENAL',
      title: 'GEAR & SOFTWARE',
      categories: [
        { category: 'EDITING & COLOR', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Wondershare Filmora', 'CapCut Pro'] },
        { category: 'DESIGN & GRAPHICS', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Motion Graphics Templates', 'Blender 3D Basics'] },
        { category: 'AUDIO SUITE', items: ['Adobe Audition', 'iZotope RX Noise Reduction', 'Foley Sound Design', 'Spatial Audio Mixing'] },
        { category: 'CAMERA & HARDWARE', items: ['Sony Alpha Series (4K 10-bit)', 'DJI Ronin Gimbal Stabilizers', 'Anamorphic & Prime Glass', 'Wireless Audio Transmitters'] }
      ]
    },
    cta: {
      title: "LET'S CRAFT YOUR NEXT CINEMATIC PROJECT",
      subtitle: "Ready to collaborate on weddings, high-converting commercials, or creative short-form videos? Let's turn your concept into reality.",
      primaryBtnText: 'Contact Me Now',
      primaryBtnLink: '/contact',
      primaryBtnStyle: 'solid-gold', // 'solid-gold' | 'outline-gold' | 'rounded-smooth' | 'cyber-cut'
      secondaryBtnText: 'Explore Portfolio',
      secondaryBtnLink: '/portfolio',
      secondaryBtnStyle: 'outline-white' // 'outline-white' | 'solid-dark' | 'glass' | 'solid-gold'
    }
  },

  // Contact Page Dynamic Content Model
  contactContent: {
    hero: {
      badge: 'GET IN TOUCH',
      titleLine1: 'Contact',
      titleLine2: 'Us',
      subtitle: "Let's discuss your next cinematic video project or commercial campaign."
    },
    info: {
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.07007788484!2d90.3541893!3d23.7645164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0a373307659%3A0x6e26217436f56193!2sShyamoli%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
      phone: '+880 1885 000118',
      phoneSub: 'Sunday - Thursday: 10AM - 8PM',
      email: 'flipthelense@gmail.com',
      emailSub: 'Online support 24/7',
      address: 'Shyamoli, Mohammadpur',
      addressSub: 'Dhaka 1207, Bangladesh',
      studio: 'FlipTheLense Creative Hub',
      studioSub: 'Production & Post-Production Suite'
    },
    form: {
      badge: 'QUICK INQUIRY',
      title: 'SEND US A MESSAGE',
      desc: 'Fill out the form below and we will get back to you within 24 hours with package details and availability.',
      submitBtnText: 'Send Message'
    },
    bottomCta: {
      badge: 'COLLABORATE',
      title: 'READY TO START YOUR NEXT CINEMATIC PROJECT?',
      desc: 'Whether it is a luxury wedding film, TVC commercial, or viral short series, we bring cinematic polish to your raw vision.',
      btnText: 'View Portfolio',
      btnLink: '/portfolio'
    }
  },

  // Portfolio Page Dynamic Content Model
  portfolioContent: {
    hero: {
      bgImage: '/videen_hero_bg_real.jpg',
      tagline: 'WELCOME TO VIDEEN STUDIO',
      headlineLine1: "LET'S MAKE",
      headlineLine2: 'YOUR VIDEO LOOKS MORE COOL',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
      buttonText: 'GET STARTED',
      buttonLink: '#my-work-section',
      buttonStyle: 'sharp-gold', // 'sharp-gold' | 'rounded-gold' | 'pill-gold' | 'outline-gold' | 'cyber-cut'
      showArrow: true,
      filmmakerImage: '/F1-1.png',
      statYears: '18',
      statYearsLabel: 'Years Experience',
      statAwards: '15',
      statAwardsLabel: 'Best Award',
      statProjects: '523',
      statProjectsLabel: 'Project Done'
    },
    filterSection: {
      tagline: 'MY WORK',
      title: 'EXPLORE OUR RECENT PROJECTS',
      description: 'Bespoke video editing, high-end commercial grading, and story-driven post production across global client productions.'
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
            brands: {
              ...defaultSettings.homeContent.brands,
              ...(res.data.homeContent?.brands || {}),
              items: res.data.homeContent?.brands?.items && res.data.homeContent.brands.items.length > 0
                ? res.data.homeContent.brands.items
                : defaultSettings.homeContent.brands.items
            },
            reviews: {
              ...defaultSettings.homeContent.reviews,
              ...(res.data.homeContent?.reviews || {}),
              items: res.data.homeContent?.reviews?.items && res.data.homeContent.reviews.items.length > 0
                ? res.data.homeContent.reviews.items
                : defaultSettings.homeContent.reviews.items
            },
            cta: { ...defaultSettings.homeContent.cta, ...(res.data.homeContent?.cta || {}) }
          },
          aboutContent: {
            ...defaultSettings.aboutContent,
            ...(res.data.aboutContent || {}),
            hero: { ...defaultSettings.aboutContent.hero, ...(res.data.aboutContent?.hero || {}) },
            quote: { ...defaultSettings.aboutContent.quote, ...(res.data.aboutContent?.quote || {}) },
            profile: {
              ...defaultSettings.aboutContent.profile,
              ...(res.data.aboutContent?.profile || {}),
              skills: res.data.aboutContent?.profile?.skills && res.data.aboutContent.profile.skills.length > 0
                ? res.data.aboutContent.profile.skills
                : defaultSettings.aboutContent.profile.skills
            },
            specialties: {
              ...defaultSettings.aboutContent.specialties,
              ...(res.data.aboutContent?.specialties || {}),
              items: res.data.aboutContent?.specialties?.items && res.data.aboutContent.specialties.items.length > 0
                ? res.data.aboutContent.specialties.items
                : defaultSettings.aboutContent.specialties.items
            },
            experience: {
              ...defaultSettings.aboutContent.experience,
              ...(res.data.aboutContent?.experience || {}),
              items: res.data.aboutContent?.experience?.items && res.data.aboutContent.experience.items.length > 0
                ? res.data.aboutContent.experience.items
                : defaultSettings.aboutContent.experience.items
            },
            toolsGear: {
              ...defaultSettings.aboutContent.toolsGear,
              ...(res.data.aboutContent?.toolsGear || res.data.aboutContent?.tools || {}),
              categories: (res.data.aboutContent?.toolsGear?.categories || res.data.aboutContent?.tools?.categories || []).length > 0
                ? (res.data.aboutContent?.toolsGear?.categories || res.data.aboutContent?.tools?.categories)
                : defaultSettings.aboutContent.toolsGear.categories
            },
            cta: { ...defaultSettings.aboutContent.cta, ...(res.data.aboutContent?.cta || {}) }
          },
          contactContent: {
            ...defaultSettings.contactContent,
            ...(res.data.contactContent || {}),
            hero: { ...defaultSettings.contactContent.hero, ...(res.data.contactContent?.hero || {}) },
            info: { ...defaultSettings.contactContent.info, ...(res.data.contactContent?.info || {}) },
            form: { ...defaultSettings.contactContent.form, ...(res.data.contactContent?.form || {}) },
            bottomCta: { ...defaultSettings.contactContent.bottomCta, ...(res.data.contactContent?.bottomCta || {}) }
          },
          portfolioContent: {
            ...defaultSettings.portfolioContent,
            ...(res.data.portfolioContent || {}),
            hero: { ...defaultSettings.portfolioContent.hero, ...(res.data.portfolioContent?.hero || {}) },
            filterSection: { ...defaultSettings.portfolioContent.filterSection, ...(res.data.portfolioContent?.filterSection || {}) }
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

  // Update specific section settings in local context state immediately
  const updateSectionSettings = (sectionKey, newSectionData) => {
    setSettings((prev) => ({
      ...prev,
      [sectionKey]: newSectionData
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, updateSectionSettings, fetchSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SettingsContext);
}
