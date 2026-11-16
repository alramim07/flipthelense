import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard,
  Film,
  FileText,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Sparkles,
  BarChart3,
  Video,
  ArrowUpRight,
  Users,
  Globe2,
  MousePointerClick,
  Percent,
  Search,
  Check,
  Edit3,
  RefreshCw,
  X,
  Tags,
  FolderPlus,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Filter,
  ChevronDown
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { tab } = useParams();
  
  // Valid admin tabs: "dashboard" | "portfolio" | "categories" | "reviews" | "pages" | "inquiries" | "settings"
  const activeTab = ['dashboard', 'portfolio', 'categories', 'reviews', 'pages', 'inquiries', 'settings'].includes(tab)
    ? tab
    : 'dashboard';

  const [adminUser, setAdminUser] = useState({ email: 'admin@flipthelense.com', role: 'Super Admin' });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Category Management State
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [editingCatId, setEditingCatId] = useState(null);
  const [editingCatName, setEditingCatName] = useState('');
  const [catActionMsg, setCatActionMsg] = useState(null);

  // Real-Time Analytics State fetched directly from `/api/analytics/stats`
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    totalViews: 0,
    conversionRate: '0.00%',
    topPages: [],
    trafficSources: [
      { source: 'Direct & Internal', count: 0 },
      { source: 'Search Engines', count: 0 },
      { source: 'Social Media', count: 0 },
      { source: 'Referral Links', count: 0 }
    ],
    recentHits: []
  });

  // Dynamic Inquiries from database
  const [inquiries, setInquiries] = useState([]);

  // Dynamic Portfolio Items from database
  const [portfolioItems, setPortfolioItems] = useState([]);

  // Dynamic Reviews System
  const [reviews, setReviews] = useState([]);
  const [reviewFilterStatus, setReviewFilterStatus] = useState('all'); // 'all' | 'pending' | 'accepted' | 'rejected'
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    projectSlug: 'all',
    projectName: 'All Projects',
    name: '',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    comment: '',
    pricePaid: 'US$150-US$300',
    duration: '3-5 days'
  });

  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: 'Commercial',
    duration: '02:00',
    views: '10K',
    image: ''
  });

  // Website Settings from database
  const [settings, setSettings] = useState({
    siteName: 'FlipTheLense',
    tagline: 'From Raw Footage To A Compelling Final Video',
    phone: '+880 1885 000118',
    email: 'flipthelense@gmail.com',
    address: 'Shyamoli, Mohammadpur, Dhaka 1207',
    licenceNo: 'TRAD/DNCC/008721/2025',
    expCounter: '4.5+',
    projectsCounter: '523+',
    satisfactionCounter: '99%'
  });

  // Global ESC key listener to dismiss open modals & dropdowns
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isProjectDropdownOpen) {
          setIsProjectDropdownOpen(false);
          return;
        }
        if (isAddReviewModalOpen) {
          setIsAddReviewModalOpen(false);
          setIsProjectDropdownOpen(false);
        }
        if (isAddModalOpen) {
          setIsAddModalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddReviewModalOpen, isAddModalOpen, isProjectDropdownOpen]);

  // Frontend Pages List for "Pages" Menu Tab
  const frontendPages = [
    {
      title: 'Homepage',
      slug: '/',
      description: 'Main landing page featuring hero showcase, reels, editing process highway, and CTA.',
      status: 'Live & Active'
    },
    {
      title: 'About Us',
      slug: '/about',
      description: 'Company story, videographer profile, core editing proficiencies, and creative specialties.',
      status: 'Live & Active'
    },
    {
      title: 'Portfolio Showcase',
      slug: '/portfolio',
      description: 'Categorized grid of commercials, wedding highlights, music videos, and YouTube reels.',
      status: 'Live & Active'
    },
    {
      title: 'Contact Us',
      slug: '/contact',
      description: 'Interactive contact form, embedded studio map, direct phone/email, and promotion banner.',
      status: 'Live & Active'
    },
    {
      title: 'Service Detail: Wedding Film Editing',
      slug: '/services/cinematic-wedding-video-editing',
      description: 'Tiered packages (Basic, Standard, Premium), client reviews, and direct booking form.',
      status: 'Live & Active'
    }
  ];

  // Fetch all live data from backend APIs
  const fetchAllData = async () => {
    setRefreshing(true);
    try {
      // 1. Fetch Real Web Analytics
      const analyticsRes = await axios.get('/api/analytics/stats');
      if (analyticsRes.data) {
        setAnalytics(analyticsRes.data);
      }

      // 2. Fetch Inquiries
      const inquiriesRes = await axios.get('/api/inquiries');
      if (inquiriesRes.data) {
        setInquiries(inquiriesRes.data);
      }

      // 3. Fetch Portfolio
      const portfolioRes = await axios.get('/api/portfolio');
      if (portfolioRes.data) {
        setPortfolioItems(portfolioRes.data);
      }

      // 4. Fetch Categories
      const categoriesRes = await axios.get('/api/categories');
      if (categoriesRes.data) {
        setCategories(categoriesRes.data);
      }

      // 5. Fetch Settings
      const settingsRes = await axios.get('/api/settings');
      if (settingsRes.data) {
        setSettings(prev => ({ ...prev, ...settingsRes.data }));
      }

      // 6. Fetch Reviews
      const reviewsRes = await axios.get('/api/reviews');
      if (Array.isArray(reviewsRes.data)) {
        setReviews(reviewsRes.data);
      }
    } catch (err) {
      console.warn('API sync fallback:', err.message);
    } finally {
      setRefreshing(false);
    }
  };

  // Category Actions: Create, Edit, Delete
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      const res = await axios.post('/api/categories', { name: newCatName.trim() });
      if (res.data?.category) {
        setCategories([...categories, res.data.category]);
        setNewCatName('');
        setCatActionMsg({ type: 'success', text: `Category "${res.data.category.name}" created successfully!` });
      }
    } catch (err) {
      setCatActionMsg({ type: 'error', text: err.response?.data?.error || 'Failed to create category' });
    } finally {
      setTimeout(() => setCatActionMsg(null), 3000);
    }
  };

  const handleUpdateCategory = async (catId) => {
    if (!editingCatName.trim()) return;
    try {
      const res = await axios.put(`/api/categories/${catId}`, { name: editingCatName.trim() });
      if (res.data?.category) {
        setCategories(categories.map(c => c.id === catId ? res.data.category : c));
        setEditingCatId(null);
        setEditingCatName('');
        setCatActionMsg({ type: 'success', text: 'Category updated successfully!' });
      }
    } catch (err) {
      setCatActionMsg({ type: 'error', text: err.response?.data?.error || 'Failed to update category' });
    } finally {
      setTimeout(() => setCatActionMsg(null), 3000);
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`/api/categories/${catId}`);
      setCategories(categories.filter(c => c.id !== catId));
      setCatActionMsg({ type: 'success', text: 'Category deleted successfully' });
    } catch (err) {
      setCatActionMsg({ type: 'error', text: 'Failed to delete category' });
    } finally {
      setTimeout(() => setCatActionMsg(null), 3000);
    }
  };

  // Verify auth session & load data on mount
  useEffect(() => {
    const token = localStorage.getItem('ftl_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const savedUser = localStorage.getItem('ftl_admin_user');
    if (savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch (err) {}
    }

    fetchAllData();
    // Auto-refresh analytics every 30 seconds
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  // Review Status Action (Approve / Reject / Pending)
  const handleUpdateReviewStatus = async (reviewId, newStatus) => {
    try {
      await axios.patch(`/api/reviews/${reviewId}/status`, { status: newStatus });
      setReviews(prev => prev.map(r => r._id === reviewId ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Failed to update review status:', err);
    }
  };

  // Delete Review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
    } catch (err) {
      console.error('Failed to delete review:', err);
    }
  };

  // Add Custom Admin Review for Specific Project
  const handleCreateCustomReview = async (e) => {
    e.preventDefault();
    if (!newReviewForm.name || !newReviewForm.comment) return;
    try {
      const res = await axios.post('/api/reviews', {
        ...newReviewForm,
        status: 'accepted'
      });
      if (res.data?.review) {
        setReviews([res.data.review, ...reviews]);
        setIsAddReviewModalOpen(false);
        setNewReviewForm({
          projectSlug: 'all',
          projectName: 'All Projects',
          name: '',
          country: 'United States',
          flag: '🇺🇸',
          rating: 5,
          comment: '',
          pricePaid: 'US$150-US$300',
          duration: '3-5 days'
        });
      }
    } catch (err) {
      alert('Failed to add custom review');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ftl_admin_token');
    localStorage.removeItem('ftl_admin_user');
    navigate('/admin/login');
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/settings', settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    if (!newPortfolio.title) return;
    try {
      const res = await axios.post('/api/portfolio', newPortfolio);
      if (res.data?.item) {
        setPortfolioItems([res.data.item, ...portfolioItems]);
      } else {
        const newItem = {
          ...newPortfolio,
          _id: 'port_' + Date.now(),
          image: newPortfolio.image || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
        };
        setPortfolioItems([newItem, ...portfolioItems]);
      }
      setNewPortfolio({ title: '', category: 'commercials', duration: '03:00 MIN', views: '10K', image: '', slug: '', client: '', basicPrice: 150, standardPrice: 300, premiumPrice: 550 });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePortfolio = async (id) => {
    try {
      await axios.delete(`/api/portfolio/${id}`);
      setPortfolioItems(portfolioItems.filter(item => item._id !== id && item.id !== id));
    } catch (err) {
      setPortfolioItems(portfolioItems.filter(item => item._id !== id && item.id !== id));
    }
  };

  return (
    <div className="h-screen bg-[#0D0D0D] text-[#F4F4F4] flex flex-col md:flex-row relative overflow-hidden font-sans">
      
      {/* Ambient background glows for high-tech glass feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FFE379]/5 rounded-full blur-[140px] animate-fluid-blob-1" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[#FFE379]/5 rounded-full blur-[150px] animate-fluid-blob-2" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#FFE379 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* ================= SIDEBAR (Glass Panel) ================= */}
      <aside className="relative z-20 w-full md:w-64 bg-[#141414]/85 backdrop-blur-2xl border-r border-[#232323] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-[#232323] flex items-center justify-between">
            <Link to="/" className="group flex items-center space-x-2">
              <div className="bg-[#FFE379] text-[#101010] font-black px-3 py-1 text-xs tracking-wider uppercase">
                FLIPTHELENSE
              </div>
            </Link>
            <span className="text-[10px] font-mono text-[#FFE379] bg-[#FFE379]/10 px-2 py-0.5 rounded border border-[#FFE379]/20">
              CMS v2.0
            </span>
          </div>

          {/* Navigation Links:
              1. Dashboard (/admin/dashboard)
              2. Portfolio Works (/admin/portfolio)
              3. Categories (/admin/categories)
              4. Pages (/admin/pages)
              5. Work Inquiries (/admin/inquiries)
              6. Website Settings (/admin/settings)
          */}
          <div className="p-4 space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'portfolio', label: 'Portfolio Works', icon: Film, badge: portfolioItems.length },
              { id: 'categories', label: 'Categories', icon: Tags, badge: categories.length },
              { 
                id: 'reviews', 
                label: 'Reviews', 
                icon: MessageSquare, 
                badge: reviews.filter(r => r.status === 'pending').length > 0 
                  ? `${reviews.filter(r => r.status === 'pending').length} New` 
                  : reviews.length 
              },
              { id: 'pages', label: 'Pages', icon: FileText, badge: frontendPages.length },
              { id: 'inquiries', label: 'Work Inquiries', icon: Inbox, badge: inquiries.length },
              { id: 'settings', label: 'Website Settings', icon: Settings },
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={`/admin/${item.id}`}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#FFE379] text-[#101010] shadow-[0_4px_20px_rgba(255,227,121,0.25)] font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <div className="flex items-center space-x-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-[#101010]' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#101010] text-[#FFE379]' : 'bg-[#FFE379]/20 text-[#FFE379]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="p-4 border-t border-[#232323] space-y-3">
          <div className="flex items-center justify-between px-2">
            <div>
              <p className="text-xs font-bold text-white truncate max-w-[130px]">{adminUser.email}</p>
              <p className="text-[10px] text-[#FFE379] font-mono">{adminUser.role}</p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              title="Open Public Site"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FFE379] hover:text-[#101010] text-neutral-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT (Glass Panels) ================= */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
        
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#232323] mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-[11px] font-mono text-[#FFE379] mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SYSTEM CONNECTED • REAL-TIME DATA</span>
            </div>
            <h1 
              className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'portfolio' && 'Portfolio Works'}
              {activeTab === 'categories' && `Portfolio Categories (${categories.length})`}
              {activeTab === 'reviews' && `Client Reviews & Feedback (${reviews.length})`}
              {activeTab === 'pages' && 'Pages'}
              {activeTab === 'inquiries' && `Work Inquiries (${inquiries.length})`}
              {activeTab === 'settings' && 'Website Settings'}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] text-xs font-semibold text-neutral-300 hover:text-white transition-all shadow-md disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#FFE379] ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Sync Real Data'}</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>Visit Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ================= TAB 1: MAIN "DASHBOARD" (REAL WEB ANALYTICS) ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* 1. Real-Time Web Analytics KPI Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <BarChart3 className="w-4 h-4 text-[#FFE379]" />
                  <span>WEB Metrics</span>
                </h2>
                <span className="text-xs text-neutral-400 font-mono flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Tracking Live Visits</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { 
                    title: 'Real Unique Visitors', 
                    value: analytics.totalVisitors, 
                    icon: Users, 
                    badge: 'Direct Tracker',
                    note: 'Recorded page hits' 
                  },
                  { 
                    title: 'Total Page Views', 
                    value: analytics.totalViews, 
                    icon: Eye, 
                    badge: 'Live Counter',
                    note: 'Aggregate impressions' 
                  },
                  { 
                    title: 'Active Inquiries', 
                    value: inquiries.length, 
                    icon: Inbox, 
                    badge: 'Database',
                    note: 'Submitted orders' 
                  },
                  { 
                    title: 'Real Lead Conversion', 
                    value: analytics.conversionRate, 
                    icon: Percent, 
                    badge: 'Calculated',
                    note: 'Inquiries per visitor' 
                  },
                ].map((card, i) => {
                  const IconComp = card.icon;
                  return (
                    <div
                      key={i}
                      className="relative group rounded-2xl p-5 bg-[#141414]/85 backdrop-blur-xl border border-[#232323] hover:border-[#FFE379]/40 transition-all shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFE379]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                          {card.title}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#FFE379]/10 text-[#FFE379] flex items-center justify-center">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>

                      <div 
                        className="text-3xl font-black text-white tracking-tight"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {card.value}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/80">
                        <span className="text-[11px] text-[#FFE379] font-mono font-bold">
                          {card.badge}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">{card.note}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Visual Traffic Sources & Top Performing Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Traffic Acquisition Breakdown (5 Cols) */}
              <div className="lg:col-span-5 rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 shadow-xl">
                <h3 
                  className="text-base font-bold text-white uppercase tracking-tight mb-4 flex items-center space-x-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Globe2 className="w-4 h-4 text-[#FFE379]" />
                  <span>Real Traffic Source Origin</span>
                </h3>

                <div className="space-y-4">
                  {analytics.trafficSources.map((item, idx) => {
                    const totalSourceHits = analytics.trafficSources.reduce((acc, curr) => acc + curr.count, 0) || 1;
                    const percent = Math.round((item.count / totalSourceHits) * 100);
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-300 font-medium">{item.source}</span>
                          <span className="text-[#FFE379] font-mono font-bold">{item.count} hits ({percent}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FFE379] to-[#F2D76B] rounded-full transition-all duration-700"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Visited Pages (7 Cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 shadow-xl">
                <h3 
                  className="text-base font-bold text-white uppercase tracking-tight mb-4 flex items-center space-x-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <MousePointerClick className="w-4 h-4 text-[#FFE379]" />
                  <span>Live Page Views (Actual Route Hits)</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#232323] text-neutral-400 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="pb-3 font-semibold">Route Path</th>
                        <th className="pb-3 font-semibold text-right">Actual Views</th>
                        <th className="pb-3 font-semibold text-right">Traffic Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F1F1F]">
                      {analytics.topPages.length > 0 ? (
                        analytics.topPages.map((pg, idx) => {
                          const percent = analytics.totalVisitors > 0 
                            ? Math.round((pg.views / analytics.totalVisitors) * 100) 
                            : 0;
                          return (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 font-mono text-[#FFE379] font-bold">{pg.path}</td>
                              <td className="py-3 text-right font-mono text-white">{pg.views} views</td>
                              <td className="py-3 text-right font-mono text-neutral-400">{percent}%</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="3" className="py-6 text-center text-neutral-500 font-mono">
                            No visits recorded yet. Open any page on the website to trigger the real-time tracker!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* 3. Live Activity Stream (Recent Visits Log) */}
            <div className="rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 
                    className="text-base font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Live Visitor Activity Stream
                  </h3>
                  <p className="text-xs text-neutral-400">Latest recorded visitor hits with device and route</p>
                </div>
                <span className="text-[11px] font-mono text-[#FFE379] bg-[#FFE379]/10 px-2 py-0.5 rounded border border-[#FFE379]/20">
                  Last 10 Events
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#232323] text-neutral-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="pb-3 font-semibold">Route</th>
                      <th className="pb-3 font-semibold">Device</th>
                      <th className="pb-3 font-semibold">Referrer</th>
                      <th className="pb-3 font-semibold text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F]">
                    {analytics.recentHits.map((hit, idx) => (
                      <tr key={hit.id || idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 font-mono text-[#FFE379] font-semibold">{hit.path}</td>
                        <td className="py-3 text-neutral-300">{hit.device}</td>
                        <td className="py-3 text-neutral-400 font-mono text-[11px] truncate max-w-[200px]">{hit.referrer}</td>
                        <td className="py-3 text-right text-neutral-500 font-mono text-[11px]">
                          {new Date(hit.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: PORTFOLIO WORKS (REAL DATABASE DRIVEN) ================= */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Header with Title and Add Project Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 rounded-2xl shadow-xl">
              <div>
                <div className="flex items-center space-x-2">
                  <Film className="w-5 h-5 text-[#FFE379]" />
                  <h2 
                    className="text-xl font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Portfolio Showcase Items
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage agency showcase projects. Each item has its own dedicated SEO page (<code className="text-[#FFE379]">domain.com/slug</code>).
                </p>
              </div>

              <Link
                to="/admin/portfolio/builder"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(255,227,121,0.25)] hover:shadow-[0_0_25px_rgba(255,227,121,0.4)] cursor-pointer"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Project</span>
              </Link>
            </div>

            {/* List / Table of Portfolio Showcase Items */}
            <div className="rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] overflow-hidden shadow-xl">
              <div className="p-5 border-b border-[#232323] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">
                    Published Projects ({portfolioItems.length})
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20">
                  Live in Showcase
                </span>
              </div>

              {/* Table view for desktop / responsive card list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101010]/90 text-neutral-400 uppercase font-mono text-[10px] border-b border-[#232323]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Project</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">SEO URL Slug</th>
                      <th className="py-3.5 px-4 font-semibold">Client / Scope</th>
                      <th className="py-3.5 px-4 font-semibold">Starting Price</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F]">
                    {portfolioItems.map((item) => {
                      const projectSlug = item.slug || (item.title ? item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : 'project');
                      return (
                        <tr key={item._id || item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-14 h-9 rounded-lg overflow-hidden bg-neutral-900 border border-[#262626] shrink-0">
                                <img
                                  src={item.img || item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <span 
                                  className="font-bold text-white text-xs block truncate max-w-[220px]"
                                  style={{ fontFamily: "'Oswald', sans-serif" }}
                                >
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  {item.duration || '03:00 MIN'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-[#FFE379]/10 text-[#FFE379] text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-[#FFE379]/20">
                              {item.tag || item.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-neutral-300">
                            /{projectSlug}
                          </td>
                          <td className="py-3 px-4 text-neutral-400 text-xs truncate max-w-[160px]">
                            {item.client || 'Agency Portfolio'}
                          </td>
                          <td className="py-3 px-4 font-mono text-[#FFE379] font-bold text-xs">
                            ${item.basicPrice || 150}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center space-x-1.5">
                              <Link
                                to={`/admin/portfolio/builder/${projectSlug}`}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#1A1A1A] hover:bg-[#FFE379] text-neutral-300 hover:text-black transition-colors font-mono text-[11px] border border-[#2D2D2D]"
                                title="Edit in Elementor Visual Builder"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </Link>
                              <Link
                                to={`/${projectSlug}`}
                                target="_blank"
                                className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#1A1A1A] hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors font-mono text-[11px] border border-[#2D2D2D]"
                                title="View Live Single Project Page"
                              >
                                <ArrowUpRight className="w-3 h-3" />
                              </Link>
                              <button
                                onClick={() => handleDeletePortfolio(item._id || item.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/80 text-red-400 hover:text-white transition-colors border border-red-500/20"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: Add New Portfolio Project rendered in Portal */}
            {isAddModalOpen && createPortal(
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                <div className="relative w-full max-w-2xl rounded-2xl bg-[#141414] border border-[#2D2D2D] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#232323]">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-[#FFE379]/10 text-[#FFE379] flex items-center justify-center">
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </div>
                      <h3 
                        className="text-lg font-bold text-white uppercase tracking-tight"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Add New Portfolio Showcase Item
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsAddModalOpen(false)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400 mt-3 mb-5">
                    Enter project details below. FlipTheLense will generate a dedicated SEO landing page at <code className="text-[#FFE379]">domain.com/slug</code>.
                  </p>

                  <form onSubmit={handleAddPortfolio} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPortfolio.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            const autoSlug = val.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
                            setNewPortfolio({ ...newPortfolio, title: val, slug: newPortfolio.slugCustom ? newPortfolio.slug : autoSlug });
                          }}
                          placeholder="e.g. Alpine Ridge Explorer"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white placeholder-neutral-500 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          SEO Slug (URL Path)
                        </label>
                        <input
                          type="text"
                          value={newPortfolio.slug || ''}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, slug: e.target.value, slugCustom: true })}
                          placeholder="e.g. alpine-ridge-explorer"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs font-mono text-[#FFE379] placeholder-neutral-500 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Category
                        </label>
                        <select
                          value={newPortfolio.category}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white focus:border-[#FFE379] focus:outline-none"
                        >
                          {categories.map((c) => (
                            <option key={c.id || c.slug} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Client / Commission Name
                        </label>
                        <input
                          type="text"
                          value={newPortfolio.client || ''}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, client: e.target.value })}
                          placeholder="e.g. National Geographic Wild"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white placeholder-neutral-500 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Duration Badge
                        </label>
                        <input
                          type="text"
                          value={newPortfolio.duration || '03:00 MIN'}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, duration: e.target.value })}
                          placeholder="e.g. 04:15 MIN"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white placeholder-neutral-500 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Cover Thumbnail Image URL
                        </label>
                        <input
                          type="text"
                          value={newPortfolio.image || newPortfolio.img || ''}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, image: e.target.value, img: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white placeholder-neutral-500 focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Basic Package ($)
                        </label>
                        <input
                          type="number"
                          value={newPortfolio.basicPrice || 150}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, basicPrice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white font-mono focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Standard Package ($)
                        </label>
                        <input
                          type="number"
                          value={newPortfolio.standardPrice || 300}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, standardPrice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white font-mono focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1.5">
                          Premium Package ($)
                        </label>
                        <input
                          type="number"
                          value={newPortfolio.premiumPrice || 550}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, premiumPrice: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white font-mono focus:border-[#FFE379] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#232323]">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="py-2.5 px-5 rounded-xl bg-[#1E1E1E] hover:bg-[#282828] text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-md flex items-center space-x-2"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Publish Project</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {/* ================= TAB: CATEGORIES (MANAGE CATEGORIES) ================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 rounded-2xl shadow-xl">
              <div>
                <div className="flex items-center space-x-2">
                  <Tags className="w-5 h-5 text-[#FFE379]" />
                  <h2 
                    className="text-xl font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Portfolio Categories Manager
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Create, edit, update and delete categories. These automatically appear in the project builder dropdown and frontend filter tabs.
                </p>
              </div>

              <Link
                to="/admin/portfolio/builder"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-[#1E1E1E] hover:bg-[#FFE379] text-neutral-300 hover:text-black font-semibold text-xs tracking-wider transition-all border border-[#333]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project with Categories</span>
              </Link>
            </div>

            {/* Notification alert banner */}
            {catActionMsg && (
              <div className={`p-4 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 ${
                catActionMsg.type === 'success'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
              }`}>
                <Check className="w-4 h-4" />
                <span>{catActionMsg.text}</span>
              </div>
            )}

            {/* Add New Category Form */}
            <div className="rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 shadow-xl">
              <h3 
                className="text-base font-bold text-white uppercase tracking-tight mb-3 flex items-center space-x-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <FolderPlus className="w-4 h-4 text-[#FFE379]" />
                <span>Create New Category</span>
              </h3>

              <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Commercials, Documentary, Music Video, Wedding, Drone Films..."
                  className="w-full flex-1 px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-white placeholder-neutral-500 focus:border-[#FFE379] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-md flex items-center justify-center space-x-1.5 shrink-0"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Category</span>
                </button>
              </form>
            </div>

            {/* Categories List / Table */}
            <div className="rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] overflow-hidden shadow-xl">
              <div className="p-5 border-b border-[#232323] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">
                  Existing Categories ({categories.length})
                </span>
                <span className="text-[11px] font-mono text-[#FFE379] bg-[#FFE379]/10 px-2.5 py-1 rounded border border-[#FFE379]/20">
                  Live in Portfolio System
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101010]/90 text-neutral-400 uppercase font-mono text-[10px] border-b border-[#232323]">
                    <tr>
                      <th className="py-3.5 px-5 font-semibold">Category Name</th>
                      <th className="py-3.5 px-5 font-semibold">Slug Identifier</th>
                      <th className="py-3.5 px-5 font-semibold">Associated Projects</th>
                      <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F]">
                    {categories.map((cat) => {
                      const count = portfolioItems.filter(p => p.category === cat.slug || p.category === cat.name.toLowerCase()).length;
                      const isEditing = editingCatId === cat.id;

                      return (
                        <tr key={cat.id || cat.slug} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-5 font-medium text-white">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editingCatName}
                                onChange={(e) => setEditingCatName(e.target.value)}
                                className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#FFE379] text-xs text-white focus:outline-none"
                                autoFocus
                              />
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-[#FFE379]" />
                                <span className="font-bold text-white text-sm" style={{ fontFamily: "'Oswald', sans-serif" }}>
                                  {cat.name}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-5 font-mono text-[#FFE379] text-[11px]">
                            {cat.slug}
                          </td>
                          <td className="py-3.5 px-5 text-neutral-400 font-mono text-[11px]">
                            {count} project{count === 1 ? '' : 's'}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            {isEditing ? (
                              <div className="inline-flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCategory(cat.id)}
                                  className="px-3 py-1 rounded-lg bg-[#FFE379] text-black font-bold text-xs uppercase"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingCatId(null)}
                                  className="px-3 py-1 rounded-lg bg-[#222] text-neutral-400 hover:text-white text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="inline-flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCatId(cat.id);
                                    setEditingCatName(cat.name);
                                  }}
                                  className="p-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#FFE379] text-neutral-400 hover:text-black transition-colors"
                                  title="Edit Category Name"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/80 text-red-400 hover:text-white transition-colors border border-red-500/20"
                                  title="Delete Category"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: REVIEWS MODERATION & CREATION ================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Header & Add Custom Review Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 
                  className="text-xl font-bold text-white uppercase tracking-tight flex items-center space-x-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <MessageSquare className="w-5 h-5 text-[#FFE379]" />
                  <span>Review Submissions & Approvals</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage visitor reviews or add custom project-specific reviews to showcase client satisfaction.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddReviewModalOpen(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Create Custom Review</span>
              </button>
            </div>

            {/* Filter Tabs (All, Pending, Accepted, Rejected) */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#232323] pb-4">
              {[
                { id: 'all', label: 'All Reviews', count: reviews.length },
                { id: 'pending', label: 'Pending Approval', count: reviews.filter(r => r.status === 'pending').length },
                { id: 'accepted', label: 'Accepted (Live)', count: reviews.filter(r => r.status === 'accepted').length },
                { id: 'rejected', label: 'Rejected', count: reviews.filter(r => r.status === 'rejected').length },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setReviewFilterStatus(filter.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2 ${
                    reviewFilterStatus === filter.id
                      ? 'bg-[#FFE379] text-black font-bold shadow-md'
                      : 'bg-[#181818] text-neutral-400 hover:text-white border border-[#262626]'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <span>{filter.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    reviewFilterStatus === filter.id ? 'bg-black text-[#FFE379]' : 'bg-[#222] text-neutral-300'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.filter(r => reviewFilterStatus === 'all' || r.status === reviewFilterStatus).length === 0 ? (
                <div className="p-12 text-center bg-[#141414] rounded-2xl border border-[#232323] space-y-3">
                  <p className="text-sm font-mono text-neutral-400">No reviews found in this status category.</p>
                </div>
              ) : (
                reviews
                  .filter(r => reviewFilterStatus === 'all' || r.status === reviewFilterStatus)
                  .map((rev) => (
                    <div 
                      key={rev._id}
                      className="bg-[#141414] rounded-2xl border border-[#232323] hover:border-[#FFE379]/40 p-6 space-y-4 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFE379]/30 to-amber-500/30 border border-[#FFE379]/50 flex items-center justify-center font-bold text-white text-sm shrink-0">
                            {rev.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                              <span className="text-xs">{rev.flag}</span>
                              <span className="text-xs text-neutral-400 font-mono">({rev.country})</span>
                            </div>

                            <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-1">
                              <div className="flex text-[#FFE379]">
                                {[...Array(rev.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-[#FFE379]" />
                                ))}
                              </div>
                              <span>•</span>
                              <span className="text-[#FFE379] font-mono font-semibold">
                                {rev.projectName || (rev.projectSlug === 'all' ? 'All Projects' : rev.projectSlug)}
                              </span>
                              <span>•</span>
                              <span className="text-neutral-500 font-mono">{rev.date || 'Recent'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge & Quick Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            rev.status === 'accepted'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : rev.status === 'rejected'
                                ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}>
                            {rev.status.toUpperCase()}
                          </span>

                          {rev.status !== 'accepted' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateReviewStatus(rev._id, 'accepted')}
                              className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black text-xs font-bold transition-colors"
                              title="Accept & Show Live"
                            >
                              Accept
                            </button>
                          )}

                          {rev.status !== 'rejected' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateReviewStatus(rev._id, 'rejected')}
                              className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black text-xs font-bold transition-colors"
                              title="Reject Review"
                            >
                              Reject
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rev._id)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Comment Body */}
                      <p 
                        className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-[#181818] p-4 rounded-xl border border-[#222]"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {rev.comment}
                      </p>

                      {/* Fiverr Style Meta Footer */}
                      <div className="flex items-center space-x-6 text-[11px] font-mono text-neutral-400 pt-1">
                        <div>Price: <span className="text-white font-bold">{rev.pricePaid || 'US$150'}</span></div>
                        <div>Duration: <span className="text-white font-bold">{rev.duration || '4 days'}</span></div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Modal: Create Custom Review rendered in Portal directly into body */}
            {isAddReviewModalOpen && createPortal(
              <div 
                className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsAddReviewModalOpen(false);
                    setIsProjectDropdownOpen(false);
                  }
                }}
              >
                <div className="relative w-full max-w-lg bg-[#161616] border border-[#2E2E2E] rounded-3xl p-6 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FFE379]/10 text-[#FFE379] flex items-center justify-center">
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </div>
                      <h3 
                        className="text-base font-bold text-white uppercase"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Create Custom Review
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddReviewModalOpen(false);
                        setIsProjectDropdownOpen(false);
                      }}
                      className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateCustomReview} className="space-y-3.5">
                    {/* Target Project Dropdown with Live Search */}
                    <div className="relative">
                      <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                        Target Project
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                        className="w-full bg-[#1A1A1A] border border-[#333] hover:border-[#FFE379]/60 px-3.5 py-2.5 rounded-xl text-xs text-white focus:border-[#FFE379] outline-none flex items-center justify-between transition-colors"
                      >
                        <span className="truncate font-semibold">
                          {newReviewForm.projectSlug === 'all'
                            ? '🌐 Show Across All Projects'
                            : `🎬 ${newReviewForm.projectName} (${newReviewForm.projectSlug})`}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ml-2 ${isProjectDropdownOpen ? 'rotate-180 text-[#FFE379]' : ''}`} />
                      </button>

                      {/* Dropdown Menu with Live Filter Search */}
                      {isProjectDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#181818] border border-[#333] rounded-2xl shadow-2xl z-30 overflow-hidden animate-fade-in">
                          {/* Search Bar inside dropdown */}
                          <div className="p-2 border-b border-[#282828] bg-[#121212]">
                            <div className="relative">
                              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                autoFocus
                                value={projectSearchQuery}
                                onChange={(e) => setProjectSearchQuery(e.target.value)}
                                placeholder="Search project name or slug..."
                                className="w-full bg-[#1C1C1C] text-white text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#2E2E2E] focus:border-[#FFE379] outline-none placeholder-neutral-500 font-mono"
                              />
                            </div>
                          </div>

                          {/* Options List */}
                          <div className="max-h-56 overflow-y-auto divide-y divide-[#222]">
                            {/* "All Projects" Option */}
                            {('show across all projects'.includes(projectSearchQuery.toLowerCase()) || projectSearchQuery.trim() === '') && (
                              <button
                                type="button"
                                onClick={() => {
                                  setNewReviewForm({
                                    ...newReviewForm,
                                    projectSlug: 'all',
                                    projectName: 'All Projects'
                                  });
                                  setIsProjectDropdownOpen(false);
                                  setProjectSearchQuery('');
                                }}
                                className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                                  newReviewForm.projectSlug === 'all'
                                    ? 'bg-[#FFE379]/15 text-[#FFE379] font-bold'
                                    : 'text-neutral-300 hover:bg-[#222]'
                                }`}
                              >
                                <div>
                                  <div className="font-semibold">🌐 Show Across All Projects</div>
                                  <div className="text-[10px] text-neutral-500 font-mono">Global site-wide review</div>
                                </div>
                                {newReviewForm.projectSlug === 'all' && <Check className="w-4 h-4 text-[#FFE379]" />}
                              </button>
                            )}

                            {/* Filtered Portfolio Projects */}
                            {portfolioItems
                              .filter((p) => {
                                const q = projectSearchQuery.toLowerCase();
                                return (
                                  (p.title && p.title.toLowerCase().includes(q)) ||
                                  (p.slug && p.slug.toLowerCase().includes(q)) ||
                                  (p.category && p.category.toLowerCase().includes(q))
                                );
                              })
                              .map((p) => {
                                const isSelected = newReviewForm.projectSlug === p.slug;
                                return (
                                  <button
                                    key={p.slug}
                                    type="button"
                                    onClick={() => {
                                      setNewReviewForm({
                                        ...newReviewForm,
                                        projectSlug: p.slug,
                                        projectName: p.title || p.slug
                                      });
                                      setIsProjectDropdownOpen(false);
                                      setProjectSearchQuery('');
                                    }}
                                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                                      isSelected
                                        ? 'bg-[#FFE379]/15 text-[#FFE379] font-bold'
                                        : 'text-neutral-300 hover:bg-[#222]'
                                    }`}
                                  >
                                    <div className="truncate mr-2">
                                      <div className="font-semibold text-white truncate">{p.title}</div>
                                      <div className="text-[10px] text-neutral-400 font-mono">slug: /{p.slug}</div>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-[#FFE379] shrink-0" />}
                                  </button>
                                );
                              })}

                            {portfolioItems.filter((p) => {
                              const q = projectSearchQuery.toLowerCase();
                              return (
                                (p.title && p.title.toLowerCase().includes(q)) ||
                                (p.slug && p.slug.toLowerCase().includes(q))
                              );
                            }).length === 0 &&
                              !('show across all projects'.includes(projectSearchQuery.toLowerCase())) && (
                                <div className="p-4 text-center text-xs text-neutral-500 font-mono">
                                  No projects match "{projectSearchQuery}"
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                          Client Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewForm.name}
                          onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                          placeholder="e.g. Liam Harrison"
                          className="w-full bg-[#1A1A1A] border border-[#333] px-3.5 py-2 rounded-xl text-xs text-white focus:border-[#FFE379] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                          Country & Flag
                        </label>
                        <input
                          type="text"
                          value={newReviewForm.country}
                          onChange={(e) => setNewReviewForm({ ...newReviewForm, country: e.target.value })}
                          placeholder="e.g. United Kingdom 🇬🇧"
                          className="w-full bg-[#1A1A1A] border border-[#333] px-3.5 py-2 rounded-xl text-xs text-white focus:border-[#FFE379] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                          Star Rating
                        </label>
                        <select
                          value={newReviewForm.rating}
                          onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                          className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 rounded-xl text-xs text-[#FFE379] font-bold focus:border-[#FFE379] outline-none"
                        >
                          <option value={5}>5 Stars ★★★★★</option>
                          <option value={4}>4 Stars ★★★★☆</option>
                          <option value={3}>3 Stars ★★★☆☆</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                          Price Paid
                        </label>
                        <input
                          type="text"
                          value={newReviewForm.pricePaid}
                          onChange={(e) => setNewReviewForm({ ...newReviewForm, pricePaid: e.target.value })}
                          placeholder="US$300"
                          className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 rounded-xl text-xs text-white focus:border-[#FFE379] outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={newReviewForm.duration}
                          onChange={(e) => setNewReviewForm({ ...newReviewForm, duration: e.target.value })}
                          placeholder="4 days"
                          className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-2 rounded-xl text-xs text-white focus:border-[#FFE379] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-mono text-neutral-400 mb-1">
                        Detailed Review Feedback
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={newReviewForm.comment}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                        placeholder="Write authentic, professional praise about video editing quality, speed, or color grading..."
                        className="w-full bg-[#1A1A1A] border border-[#333] px-3.5 py-2.5 rounded-xl text-xs text-neutral-200 focus:border-[#FFE379] outline-none leading-relaxed resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsAddReviewModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-[#222] text-xs font-semibold text-neutral-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-black text-xs font-black uppercase tracking-wider transition-all"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Publish Review Live
                      </button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {/* ================= TAB 3: PAGES (LIST OF ALL FRONTEND PAGES) ================= */}
        {activeTab === 'pages' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 
                  className="text-xl font-black text-white uppercase tracking-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Frontend Website Pages Directory
                </h2>
                <p className="text-xs text-neutral-400">
                  Comprehensive listing of all active public routes and components with live traffic tracking
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {frontendPages.map((page, i) => {
                const recordedViews = (analytics.topPages.find(p => p.path === page.slug)?.views) || 0;
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-6 bg-[#141414]/85 backdrop-blur-xl border border-[#232323] hover:border-[#FFE379]/40 transition-all shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center space-x-3">
                        <h3 
                          className="text-lg font-bold text-white uppercase"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {page.title}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {page.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#FFE379] font-mono">
                        Route: <span className="underline">{page.slug}</span>
                      </p>
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                        {page.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 self-end md:self-center shrink-0">
                      <div className="text-right text-xs font-mono hidden sm:block">
                        <div className="text-white font-bold">{recordedViews} tracked hits</div>
                        <div className="text-[11px] text-neutral-500">Live Status: OK</div>
                      </div>

                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-md hover:scale-105"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: WORK INQUIRIES (REAL SUBMISSIONS) ================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 
                  className="text-xl font-black text-white uppercase tracking-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Client Work Inquiries & Orders ({inquiries.length})
                </h2>
                <p className="text-xs text-neutral-400">
                  Real submissions received from the Contact page and Service Gigs booking forms
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className="rounded-2xl p-6 bg-[#141414]/85 backdrop-blur-xl border border-[#232323] hover:border-[#FFE379]/30 transition-all shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#232323]">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-base text-white">{inq.name}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE379]/15 text-[#FFE379] border border-[#FFE379]/30">
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">{inq.email}</p>
                      </div>

                      <div className="text-left sm:text-right font-mono">
                        <div className="text-xs text-[#FFE379] font-bold">{inq.packageChosen}</div>
                        <div className="text-[11px] text-neutral-500">{inq.createdAt}</div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <span className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                        Service Requested: <span className="text-white normal-case">{inq.serviceType}</span>
                      </span>
                      <p className="text-xs text-neutral-300 bg-[#1A1A1A] p-3 rounded-xl border border-[#262626] leading-relaxed">
                        "{inq.notes}"
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl p-10 bg-[#141414]/85 border border-[#232323] text-center text-neutral-500 font-mono text-xs">
                  No inquiries received yet. Submit a message on the Contact page to see it appear here in real time!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: WEBSITE SETTINGS (REAL DATABASE UPDATE) ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl animate-fade-in-up space-y-6">
            <div className="rounded-2xl bg-[#141414]/85 backdrop-blur-xl border border-[#232323] p-6 sm:p-8 shadow-xl">
              <h2 
                className="text-xl font-black text-white uppercase tracking-tight mb-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Global Website Settings & Brand Meta
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                Manage contact info, trade license credentials, and live hero experience counters. Changes persist to the database.
              </p>

              {saveSuccess && (
                <div className="mb-6 p-3 rounded-xl bg-[#FFE379]/10 border border-[#FFE379]/40 text-[#FFE379] text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Website settings and counters saved and synchronized with database!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                {/* Brand & Studio Information */}
                <div>
                  <h3 
                    className="text-sm font-bold text-[#FFE379] uppercase tracking-wider mb-4 border-b border-[#232323] pb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    1. Brand & Studio Contact Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Brand / Site Title
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Official Trade Licence No.
                      </label>
                      <input
                        type="text"
                        value={settings.licenceNo}
                        onChange={(e) => setSettings({ ...settings, licenceNo: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white font-mono text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Studio Phone
                      </label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white font-mono text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Official Studio Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                      Physical Studio Address
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white text-xs focus:border-[#FFE379] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Hero Experience Counters */}
                <div className="pt-2">
                  <h3 
                    className="text-sm font-bold text-[#FFE379] uppercase tracking-wider mb-4 border-b border-[#232323] pb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    2. Live Experience Counters (3 Hero Boxes)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Years Experience
                      </label>
                      <input
                        type="text"
                        value={settings.expCounter}
                        onChange={(e) => setSettings({ ...settings, expCounter: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white font-mono text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Completed Projects
                      </label>
                      <input
                        type="text"
                        value={settings.projectsCounter}
                        onChange={(e) => setSettings({ ...settings, projectsCounter: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white font-mono text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                        Satisfaction Rate
                      </label>
                      <input
                        type="text"
                        value={settings.satisfactionCounter}
                        onChange={(e) => setSettings({ ...settings, satisfactionCounter: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] rounded-xl text-white font-mono text-xs focus:border-[#FFE379] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs sm:text-sm tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 hover:scale-[1.01]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Saving Settings...' : 'Save All Website Settings'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
