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
