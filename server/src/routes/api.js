import express from 'express';
import Portfolio from '../models/Portfolio.js';
import Reel from '../models/Reel.js';
import ServiceGig from '../models/ServiceGig.js';
import SiteSettings from '../models/SiteSettings.js';
import Inquiry from '../models/Inquiry.js';
import { getLocalStore, saveLocalStore } from '../store/localStore.js';

const router = express.Router();

// ================= 1. LIGHTWEIGHT BUILT-IN REAL ANALYTICS =================

// POST track a real page hit
router.post('/analytics/track', (req, res) => {
  try {
    const { visitorId, path, referrer, screenWidth } = req.body;
    const store = getLocalStore();

    // Determine device category
    let device = 'Desktop';
    if (screenWidth && screenWidth < 768) {
      device = 'Mobile';
    } else if (screenWidth && screenWidth < 1024) {
      device = 'Tablet';
    }

    const hit = {
      id: 'hit_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      visitorId: visitorId || 'anonymous_' + (req.ip || 'local'),
      path: path || '/',
      referrer: referrer || 'Direct',
      device,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown'
    };

    store.analytics.push(hit);
    // Keep last 10,000 hits to avoid unbounded growth
    if (store.analytics.length > 10000) {
      store.analytics = store.analytics.slice(-10000);
    }
    saveLocalStore(store);

    res.json({ success: true, recorded: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET aggregated real analytics statistics for Dashboard
router.get('/analytics/stats', (req, res) => {
  try {
    const store = getLocalStore();
    const hits = store.analytics || [];
    const totalHits = hits.length;

    // Accurate Distinct Unique Visitors based on VisitorId
    const uniqueVisitorSet = new Set(hits.map(h => h.visitorId).filter(Boolean));
    const uniqueVisitorsCount = uniqueVisitorSet.size;

    const uniquePaths = {};
    const referrerCounts = { Direct: 0, Search: 0, Social: 0, Referral: 0 };

    hits.forEach(h => {
      // Path views
      uniquePaths[h.path] = (uniquePaths[h.path] || 0) + 1;

      // Classify referrer
      const ref = (h.referrer || '').toLowerCase();
      if (!ref || ref === 'direct' || ref.includes('localhost')) {
        referrerCounts.Direct++;
      } else if (ref.includes('google') || ref.includes('bing') || ref.includes('yahoo')) {
        referrerCounts.Search++;
      } else if (ref.includes('instagram') || ref.includes('youtube') || ref.includes('facebook') || ref.includes('tiktok')) {
        referrerCounts.Social++;
      } else {
        referrerCounts.Referral++;
      }
    });

    // Format top pages list
    const topPages = Object.keys(uniquePaths)
      .map(p => ({
        path: p,
        views: uniquePaths[p]
      }))
      .sort((a, b) => b.views - a.views);

    // Total inquiries
    const totalInquiries = (store.inquiries || []).length;
    const conversionRate = uniqueVisitorsCount > 0 
      ? ((totalInquiries / uniqueVisitorsCount) * 100).toFixed(1) + '%' 
      : '0.0%';

    res.json({
      totalVisitors: uniqueVisitorsCount, // Accurate count of unique devices/browsers
      totalViews: totalHits,             // Total pageviews / hit count
      conversionRate,
      topPages,
      trafficSources: [
        { source: 'Direct & Internal', count: referrerCounts.Direct },
        { source: 'Search Engines', count: referrerCounts.Search },
        { source: 'Social Media', count: referrerCounts.Social },
        { source: 'Referral Links', count: referrerCounts.Referral }
      ],
      recentHits: hits.slice(-10).reverse()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= 2. SITE SETTINGS =================

// GET Settings
router.get('/settings', async (req, res) => {
  try {
    const store = getLocalStore();
    res.json(store.settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Settings
router.put('/settings', async (req, res) => {
  try {
    const store = getLocalStore();
    store.settings = { ...store.settings, ...req.body };
    saveLocalStore(store);
    res.json({ success: true, settings: store.settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= 3. PORTFOLIO =================

// Helper to create SEO-friendly slug
function createSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// ================= CATEGORIES (CRUD) =================

// GET Categories
router.get('/categories', async (req, res) => {
  try {
    const store = getLocalStore();
    if (!store.categories || !store.categories.length) {
      store.categories = [
        { id: 'cat_commercials', name: 'Commercials', slug: 'commercials' },
        { id: 'cat_wedding', name: 'Wedding', slug: 'wedding' },
        { id: 'cat_music_video', name: 'Music Video', slug: 'music_video' },
        { id: 'cat_documentary', name: 'Documentary', slug: 'documentary' }
      ];
      saveLocalStore(store);
    }
    res.json(store.categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create Category
router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const store = getLocalStore();
    store.categories = store.categories || [
      { id: 'cat_commercials', name: 'Commercials', slug: 'commercials' },
      { id: 'cat_wedding', name: 'Wedding', slug: 'wedding' },
      { id: 'cat_music_video', name: 'Music Video', slug: 'music_video' },
      { id: 'cat_documentary', name: 'Documentary', slug: 'documentary' }
    ];

    const slug = createSlug(name);
    // Check duplicate
    if (store.categories.some(c => c.slug === slug || c.name.toLowerCase() === name.trim().toLowerCase())) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const newCategory = {
      id: 'cat_' + Date.now(),
      name: name.trim(),
      slug
    };

    store.categories.push(newCategory);
    saveLocalStore(store);
    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Update Category
router.put('/categories/:id', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const store = getLocalStore();
    store.categories = store.categories || [];
    const index = store.categories.findIndex(c => c.id === req.params.id || c.slug === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const oldSlug = store.categories[index].slug;
    const newSlug = createSlug(name);

    store.categories[index] = {
      ...store.categories[index],
      name: name.trim(),
      slug: newSlug
    };

    // Also update any portfolio items currently referencing the old category
    if (store.portfolio) {
      store.portfolio.forEach(p => {
        if (p.category === oldSlug) {
          p.category = newSlug;
          p.tag = name.trim();
        }
      });
    }

    saveLocalStore(store);
    res.json({ success: true, category: store.categories[index] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Category
router.delete('/categories/:id', async (req, res) => {
  try {
    const store = getLocalStore();
    store.categories = (store.categories || []).filter(c => c.id !== req.params.id && c.slug !== req.params.id);
    saveLocalStore(store);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Portfolio
router.get('/portfolio', async (req, res) => {
  try {
    const store = getLocalStore();
    res.json(store.portfolio || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Single Project by Slug (SEO Friendly Route)
router.get('/projects/:slug', async (req, res) => {
  try {
    const store = getLocalStore();
    const project = (store.portfolio || []).find(p => p.slug === req.params.slug);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Update Single Project by Slug or ID
router.put('/projects/:slug', async (req, res) => {
  try {
    const store = getLocalStore();
    const index = (store.portfolio || []).findIndex(p => p.slug === req.params.slug || p._id === req.params.slug);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const current = store.portfolio[index];
    const updated = {
      ...current,
      ...req.body,
      _id: current._id, // preserve id
      updatedAt: new Date().toISOString()
    };

    // If slug is changed, check uniqueness
    if (req.body.slug && req.body.slug !== current.slug) {
      let baseSlug = createSlug(req.body.slug);
      let slug = baseSlug;
      let counter = 1;
      while ((store.portfolio || []).some((p, i) => i !== index && p.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      updated.slug = slug;
    }

    store.portfolio[index] = updated;
    saveLocalStore(store);
    res.json({ success: true, project: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Portfolio Item (From Admin Dashboard)
router.post('/portfolio', async (req, res) => {
  try {
    const store = getLocalStore();
    const title = req.body.title || 'Untitled Project';
    let baseSlug = req.body.slug ? createSlug(req.body.slug) : createSlug(title);
    
    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while ((store.portfolio || []).some(p => p.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newItem = {
      _id: 'port_' + Date.now(),
      title,
      slug,
      category: req.body.category || 'commercials',
      tag: req.body.tag || (req.body.category ? req.body.category.toUpperCase() : 'Commercials'),
      client: req.body.client || 'Client Commission',
      duration: req.body.duration || '03:00 MIN',
      img: req.body.img || req.body.image || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      video: req.body.video || 'https://www.youtube.com/embed/ScMzIvxBSi4',
      overview: req.body.overview || `A premier ${req.body.category || 'cinematic'} video edit showcasing dynamic pacing, pristine color grading, and custom audio mixing.`,
      headline: req.body.headline || `I will do ${title} with 4K color grading, audio sync and storytelling`,
      deliverables: req.body.deliverables || [
        "4K UHD Master File Export",
        "Multi-Camera Audio Synchronization",
        "Professional Hollywood Color Grading",
        "Sound Design & Licensed Music"
      ],
      basicPrice: Number(req.body.basicPrice) || 150,
      standardPrice: Number(req.body.standardPrice) || 300,
      premiumPrice: Number(req.body.premiumPrice) || 550,
      createdAt: new Date().toISOString()
    };

    store.portfolio.unshift(newItem);
    saveLocalStore(store);
    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Portfolio Item
router.delete('/portfolio/:id', async (req, res) => {
  try {
    const store = getLocalStore();
    store.portfolio = (store.portfolio || []).filter(p => p._id !== req.params.id && p.id !== req.params.id);
    saveLocalStore(store);
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= 4. INQUIRIES =================

// GET Inquiries
router.get('/inquiries', async (req, res) => {
  try {
    const store = getLocalStore();
    res.json(store.inquiries || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Inquiry (Public submit)
router.post('/inquiries', async (req, res) => {
  try {
    const { name, email, serviceType, packageChosen, notes } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const store = getLocalStore();
    const newInquiry = {
      _id: 'inq_' + Date.now(),
      name,
      email,
      serviceType: serviceType || 'General Inquiry',
      packageChosen: packageChosen || 'Standard',
      notes: notes || '',
      status: 'New Inquiry',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    store.inquiries.unshift(newInquiry);
    saveLocalStore(store);
    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
