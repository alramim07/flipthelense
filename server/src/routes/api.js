import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Portfolio from '../models/Portfolio.js';
import Reel from '../models/Reel.js';
import ServiceGig from '../models/ServiceGig.js';
import SiteSettings from '../models/SiteSettings.js';
import Inquiry from '../models/Inquiry.js';
import { getLocalStore, saveLocalStore } from '../store/localStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${basename}_${Date.now()}${ext}`);
  }
});

// File type filter: whitelist safe media only
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error(`Security block: File type ${ext} is not allowed. Only images (PNG, JPG, WEBP, SVG) are permitted.`), false);
  }

  // Also check MIME type
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Security block: Uploaded file is not a valid image.'), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const router = express.Router();

// ================= FILE UPLOAD ENDPOINT (Logos & Favicons) =================
// Accept any field name (e.g. 'file', 'image', 'photo') and handle errors gracefully
router.post('/upload', (req, res) => {
  upload.any()(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      return res.status(500).json({ error: err.message || 'File upload failed' });
    }

    const file = req.files && req.files.length > 0 ? req.files[0] : req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided in form data' });
    }

    const fileUrl = `/uploads/${file.filename}`;
    res.json({
      success: true,
      url: fileUrl,
      filename: file.filename,
      size: file.size
    });
  });
});

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

// PUT Update Inquiry Status / Notes
router.put('/inquiries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const store = getLocalStore();
    const index = (store.inquiries || []).findIndex(i => i._id === req.params.id || i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    if (status) {
      store.inquiries[index].status = status;
    }
    saveLocalStore(store);
    res.json({ success: true, inquiry: store.inquiries[index] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Inquiry
router.delete('/inquiries/:id', async (req, res) => {
  try {
    const store = getLocalStore();
    store.inquiries = (store.inquiries || []).filter(i => i._id !== req.params.id && i.id !== req.params.id);
    saveLocalStore(store);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= 7. REVIEWS & RATINGS SYSTEM (MODERATION & PUBLIC) =================

// GET reviews: filtered by projectSlug, or status ('accepted', 'pending', 'rejected', or all for admin)
router.get('/reviews', async (req, res) => {
  try {
    const { projectSlug, status } = req.query;
    const store = getLocalStore();
    let reviews = store.reviews || [];

    if (projectSlug) {
      reviews = reviews.filter(r => r.projectSlug === projectSlug || r.projectSlug === 'all');
    }

    if (status) {
      reviews = reviews.filter(r => r.status === status);
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST review (Visitor submission - starts as 'pending', or Admin custom review - starts as 'accepted')
router.post('/reviews', async (req, res) => {
  try {
    const { 
      projectSlug, 
      projectName, 
      name, 
      country, 
      flag, 
      rating, 
      comment, 
      pricePaid, 
      duration,
      status // 'pending' or 'accepted'
    } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }

    const store = getLocalStore();
    if (!store.reviews) store.reviews = [];

    const newReview = {
      _id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      projectSlug: projectSlug || 'all',
      projectName: projectName || 'All Projects',
      name: name.trim(),
      country: country || 'United States',
      flag: flag || '🇺🇸',
      rating: Number(rating) || 5,
      comment: comment.trim(),
      pricePaid: pricePaid || 'US$150-US$300',
      duration: duration || '3-5 days',
      status: status || 'pending', // 'pending' | 'accepted' | 'rejected'
      date: 'Just now',
      createdAt: new Date().toISOString()
    };

    store.reviews.unshift(newReview);
    saveLocalStore(store);

    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH review status (Admin Approve / Reject / Pending)
router.patch('/reviews/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'accepted' | 'rejected' | 'pending'

    if (!['accepted', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const store = getLocalStore();
    if (!store.reviews) store.reviews = [];

    const review = store.reviews.find(r => r._id === id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.status = status;
    saveLocalStore(store);

    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE review
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const store = getLocalStore();
    if (!store.reviews) store.reviews = [];

    store.reviews = store.reviews.filter(r => r._id !== id);
    saveLocalStore(store);

    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= REEL / VIDEO METADATA & THUMBNAIL RESOLVER =================
// Automatically detect platform, generate embed URL, and fetch thumbnail for YouTube, Instagram, TikTok, Facebook
router.post('/reels/resolve-url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid URL is required' });
    }

    const trimmedUrl = url.trim();
    let platform = 'custom';
    let embedUrl = trimmedUrl;
    let thumbnailUrl = '';

    // 1. YouTube & YouTube Shorts
    // Match youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
    const ytMatch = trimmedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
    if (ytMatch && ytMatch[1]) {
      const videoId = ytMatch[1];
      platform = 'youtube';
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      return res.json({
        platform,
        embedUrl,
        thumbnailUrl,
        videoId
      });
    }

    // 2. Instagram & Instagram Reels
    // Match instagram.com/reel/CODE, instagram.com/p/CODE
    const instaMatch = trimmedUrl.match(/instagram\.com\/(?:reel|reels|p)\/([a-zA-Z0-9_-]+)/);
    if (instaMatch) {
      platform = 'instagram';
      embedUrl = `https://www.instagram.com/p/${instaMatch[1]}/embed/`;
      // Try resolving public oEmbed for Instagram thumbnail if possible
      try {
        const oembedRes = await fetch(`https://api.instagram.com/oembed/?url=${encodeURIComponent(trimmedUrl)}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(3000)
        });
        if (oembedRes.ok) {
          const data = await oembedRes.json();
          if (data.thumbnail_url) thumbnailUrl = data.thumbnail_url;
        }
      } catch (e) {}

      return res.json({
        platform,
        embedUrl,
        thumbnailUrl
      });
    }

    // 3. TikTok
    // Match tiktok.com/@user/video/ID, vt.tiktok.com/CODE
    if (trimmedUrl.includes('tiktok.com')) {
      platform = 'tiktok';
      try {
        const oembedRes = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(trimmedUrl)}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(3000)
        });
        if (oembedRes.ok) {
          const data = await oembedRes.json();
          if (data.thumbnail_url) thumbnailUrl = data.thumbnail_url;
        }
      } catch (e) {}

      return res.json({
        platform,
        embedUrl: trimmedUrl,
        thumbnailUrl
      });
    }

    // 4. Facebook Watch / Reels
    if (trimmedUrl.includes('facebook.com') || trimmedUrl.includes('fb.watch')) {
      platform = 'facebook';
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmedUrl)}&show_text=0`;
      return res.json({
        platform,
        embedUrl,
        thumbnailUrl
      });
    }

    // 5. Pinterest Pins / Video Pins
    if (trimmedUrl.includes('pinterest.com') || trimmedUrl.includes('pin.it')) {
      platform = 'pinterest';
      return res.json({
        platform,
        embedUrl: trimmedUrl,
        thumbnailUrl
      });
    }

    // 6. Fallback for custom / other video links
    return res.json({
      platform,
      embedUrl,
      thumbnailUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to resolve URL' });
  }
});

export default router;
