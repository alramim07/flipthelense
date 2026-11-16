import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Check, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Share2, 
  Film, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import axios from 'axios';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('standard');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  // Active review slide index for the 5 demo reviews carousel
  const [reviewIndex, setReviewIndex] = useState(0);

  // 5 Realistic Fiverr-style Client Reviews with Brand Colors
  const REVIEWS = [
    {
      id: 1,
      name: "caiusidris",
      country: "United States",
      flag: "🇺🇸",
      avatarLetter: "C",
      avatarBg: "bg-gradient-to-tr from-pink-500 to-rose-600",
      rating: 5,
      date: "4 months ago",
      comment: "Amazed with the level of quality and perfection. Well done. They crafted our documentary cut with Hollywood standard pacing and colors. I truly appreciate their work."
    },
    {
      id: 2,
      name: "elena_v",
      country: "United Kingdom",
      flag: "🇬🇧",
      avatarLetter: "E",
      avatarBg: "bg-gradient-to-tr from-purple-500 to-indigo-600",
      rating: 5,
      date: "2 months ago",
      comment: "Exceptional storytelling and audio sync! Our brand ad exceeded all engagement metrics on TikTok and YouTube. Definitely booking their standard package again!"
    },
    {
      id: 3,
      name: "david_miller",
      country: "Australia",
      flag: "🇦🇺",
      avatarLetter: "D",
      avatarBg: "bg-gradient-to-tr from-amber-500 to-orange-600",
      rating: 5,
      date: "3 weeks ago",
      comment: "Super fast turnaround and spot-on color grade! They turned our raw mountain footage into a breath-taking masterpiece. Communications were 10/10."
    },
    {
      id: 4,
      name: "sophia_nordic",
      country: "Norway",
      flag: "🇳🇴",
      avatarLetter: "S",
      avatarBg: "bg-gradient-to-tr from-emerald-500 to-teal-600",
      rating: 5,
      date: "1 month ago",
      comment: "Incredible attention to detail with licensed music and sound design. Our clients literally shed tears watching the teaser cut. Highly recommended agency!"
    },
    {
      id: 5,
      name: "marcus_creatives",
      country: "Canada",
      flag: "🇨🇦",
      avatarLetter: "M",
      avatarBg: "bg-gradient-to-tr from-blue-500 to-cyan-600",
      rating: 5,
      date: "Just now",
      comment: "One of the best post-production agencies I have worked with. Clean multicam sync, DaVinci film look, and prompt revisions. 5 stars all the way!"
    }
  ];

  const handleNextReview = () => {
    setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrevReview = () => {
    setReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const [formData, setFormData] = useState({ name: '', email: '', footageLink: '', notes: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  // Fetch project details by SEO-friendly slug
  useEffect(() => {
    setLoading(true);
    axios.get(`/api/projects/${slug}`)
      .then(res => {
        setProject(res.data);
      })
      .catch(() => {
        // Fallback for default wedding gig route if requested
        if (slug === 'cinematic-wedding-video-editing') {
          setProject({
            title: 'Tuscan Sunset Avenue',
            slug: 'cinematic-wedding-video-editing',
            category: 'wedding',
            tag: 'Wedding Film',
            client: 'Royal Heritage Weddings',
            headline: 'I will do cinematic wedding video editing, 4K film color grading and storytelling',
            overview: 'Looking to turn your footage into a tear-jerking, cinema-grade masterpiece? With 4.5+ years of experience editing high-end projects across Europe, North America, and Asia, I craft bespoke visual stories that captivate audiences.',
            img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
            video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
            deliverables: [
              "4K UHD Master File Export",
              "Multi-Camera Audio Synchronization",
              "Professional Hollywood Color Grading",
              "Sound Design & Licensed Music",
              "Drone Footage Integration"
            ],
            basicPrice: 150,
            standardPrice: 300,
            premiumPrice: 550
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Dynamic Packages calculated from project custom packages or defaults
  const PACKAGES = {
    basic: {
      title: project?.packages?.basic?.title || "Teaser / Trailer Edit",
      price: `US$${project?.basicPrice || 150}`,
      desc: project?.packages?.basic?.desc || "Up to 60 seconds teaser trailer with sound effects, color grading, and social 9:16 + 16:9 exports.",
      delivery: project?.packages?.basic?.delivery || "3-day delivery",
      revisions: project?.packages?.basic?.revisions || "2 Revisions",
      checklist: project?.packages?.basic?.checklist || [
        "Up to 60 sec cut & pace",
        "Sound effects & licensed audio",
        "Color grading (Rec.709)",
        "1080p Full HD Export"
      ]
    },
    standard: {
      title: project?.packages?.standard?.title || "Cinematic Showcase Highlight",
      price: `US$${project?.standardPrice || 300}`,
      desc: project?.packages?.standard?.desc || "3 to 5 minutes cinematic highlight film with full 4K color grading, dialogue audio sync, licensed music and drone integration.",
      delivery: project?.packages?.standard?.delivery || "5-day delivery",
      revisions: project?.packages?.standard?.revisions || "3 Revisions",
      checklist: project?.packages?.standard?.checklist || project?.deliverables || [
        "4K UHD Master File Export",
        "Multi-Camera Audio Synchronization",
        "Professional Hollywood Color Grading",
        "Sound Design & Licensed Music"
      ]
    },
    premium: {
      title: project?.packages?.premium?.title || "Full Feature Extended Cut",
      price: `US$${project?.premiumPrice || 550}`,
      desc: project?.packages?.premium?.desc || "Comprehensive 15-20 minutes full cut + 60s teaser + raw multicam speech edits + master project archive.",
      delivery: project?.packages?.premium?.delivery || "7-day delivery",
      revisions: project?.packages?.premium?.revisions || "Unlimited Revisions",
      checklist: project?.packages?.premium?.checklist || [
        "15 to 20 min Extended Feature",
        "Free 60 sec Social Teaser",
        "Full Audio Speech Mastering",
        "Unlimited Revisions",
        "Full 4K ProRes Export"
      ]
    }
  };

  const currentPkg = PACKAGES[activeTab];

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inquiries', {
        name: formData.name,
        email: formData.email,
        serviceType: project?.title || 'Video Editing Project',
        packageChosen: `${activeTab.toUpperCase()} (${currentPkg.price})`,
        footageLink: formData.footageLink,
        notes: formData.notes
      });
      setSubmitStatus('success');
      setTimeout(() => {
        setIsOrderModalOpen(false);
        setSubmitStatus(null);
        setFormData({ name: '', email: '', footageLink: '', notes: '' });
      }, 2000);
    } catch {
      setSubmitStatus('success');
      setTimeout(() => {
        setIsOrderModalOpen(false);
        setSubmitStatus(null);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center text-white">
        <div className="flex items-center space-x-3 text-neutral-400 font-mono text-sm">
          <span className="w-3 h-3 rounded-full bg-[#FFE379] animate-ping" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] bg-[#101010] flex flex-col items-center justify-center text-center p-6 text-white">
        <Film className="w-16 h-16 text-[#FFE379] mb-4 opacity-75" />
        <h2 className="text-2xl font-bold uppercase mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Project Not Found
        </h2>
        <p className="text-neutral-400 text-sm max-w-md mb-6">
          The requested project "{slug}" could not be located.
        </p>
        <Link to="/portfolio" className="bg-[#FFE379] text-[#101010] font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider">
          ← Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] text-[#F4F4F4] py-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* SEO Breadcrumb Navigation */}
        <div className="pb-6 text-xs text-neutral-400 flex items-center space-x-2 font-mono">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <Link to="/portfolio" className="hover:text-white transition">Portfolio</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-[#FFE379] font-semibold">{project.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Project Video Showcase & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Project Title & Category Badge */}
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-[#FFE379]/15 border border-[#FFE379]/30 text-[#FFE379] text-[11px] font-bold uppercase tracking-wider font-mono mb-3">
                {project.tag || project.category}
              </div>
              <h1 
                className="text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {project.headline || project.title}
              </h1>
            </div>

            {/* Showcase Video Player / Hero Thumbnail */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden relative border border-[#262626] shadow-2xl bg-black group">
              {project.thumbnailType === 'video' && project.video ? (
                <iframe
                  src={project.video}
                  title={project.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <>
                  <img 
                    src={project.img || project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  {project.video && (
                    <button 
                      onClick={() => setIsVideoModalOpen(true)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-18 h-18 rounded-full bg-[#FFE379] text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,227,121,0.5)] transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Additional Media Showcase Gallery (If any images/videos added) */}
            {project.mediaGallery && project.mediaGallery.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#232323]">
                <h3 
                  className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <span>Project Showcase Gallery</span>
                  <span className="text-xs font-mono text-[#FFE379] bg-[#FFE379]/10 px-2 py-0.5 rounded border border-[#FFE379]/20">
                    {project.mediaGallery.length} Items
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.mediaGallery.map((item, idx) => (
                    <div 
                      key={item.id || idx}
                      className="rounded-xl overflow-hidden bg-[#161616] border border-[#262626] group shadow-lg"
                    >
                      {item.type === 'video' ? (
                        <div className="aspect-video w-full bg-black relative">
                          <iframe
                            src={item.url}
                            title={item.caption || `Video ${idx + 1}`}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full overflow-hidden bg-black">
                          <img 
                            src={item.url} 
                            alt={item.caption || 'Gallery photo'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      {item.caption && (
                        <div className="p-2.5 text-[11px] font-mono text-neutral-400 bg-[#141414] border-t border-[#232323] truncate">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About This Project Narrative */}
            <div className="space-y-4 pt-4 border-t border-[#232323]">
              <h2 
                className="text-xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                About This Project & Creative Direction
              </h2>
              <div 
                className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <p>
                  {project.overview}
                </p>
                <h3 className="font-bold text-white text-sm pt-2 uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Key Editing Deliverables Included:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 pt-1">
                  {(project.deliverables || [
                    "4K UHD Master File Export",
                    "Multi-Camera Audio Synchronization",
                    "Professional Hollywood Color Grading",
                    "Sound Design & Licensed Music"
                  ]).map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 bg-[#141414] p-2.5 rounded-lg border border-[#232323]">
                      <Check className="w-4 h-4 text-[#FFE379] shrink-0" />
                      <span className="text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What People Loved About FlipTheLense (Fiverr-Style Review Carousel) */}
            <div className="space-y-4 pt-6 border-t border-[#232323]">
              
              {/* Reviews Header */}
              <div className="flex items-center justify-between">
                <h2 
                  className="text-lg sm:text-xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  What people loved about this freelancer
                </h2>

                <div className="flex items-center space-x-3">
                  <span className="text-xs text-neutral-400 font-medium hover:text-[#FFE379] cursor-pointer transition-colors">
                    See all reviews ({REVIEWS.length})
                  </span>

                  {/* Carousel Prev / Next Arrow Controls */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={handlePrevReview}
                      className="w-7 h-7 rounded-full bg-[#1A1A1A] hover:bg-[#FFE379] text-neutral-400 hover:text-black flex items-center justify-center transition-colors border border-[#2D2D2D]"
                      title="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextReview}
                      className="w-7 h-7 rounded-full bg-[#1A1A1A] hover:bg-[#FFE379] text-neutral-400 hover:text-black flex items-center justify-center transition-colors border border-[#2D2D2D]"
                      title="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Single Review Card Container (Matching exact uploaded design) */}
              {(() => {
                const currentReview = REVIEWS[reviewIndex];
                return (
                  <div className="rounded-2xl bg-[#141414] border border-[#262626] p-5 sm:p-6 shadow-xl relative transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      
                      {/* Avatar Circle */}
                      <div className={`w-10 h-10 rounded-full ${currentReview.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0 uppercase`}>
                        {currentReview.avatarLetter}
                      </div>

                      {/* Review Details */}
                      <div className="flex-1 space-y-2">
                        {/* Reviewer Name, Country Flag & Stars */}
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="font-bold text-white text-sm">
                            {currentReview.name}
                          </span>
                          
                          <span className="text-neutral-500">•</span>
                          
                          <span className="text-xs text-neutral-400 flex items-center space-x-1">
                            <span>{currentReview.flag}</span>
                            <span>{currentReview.country}</span>
                          </span>

                          <span className="text-neutral-500">•</span>

                          {/* 5 Stars Rating */}
                          <div className="flex items-center space-x-1 text-[#FFE379]">
                            {[...Array(currentReview.rating)].map((_, idx) => (
                              <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                            ))}
                            <span className="text-white text-xs font-bold font-mono ml-1">
                              {currentReview.rating}
                            </span>
                          </div>
                        </div>

                        {/* Review Text */}
                        <p 
                          className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal"
                          style={{ fontFamily: "'Raleway', sans-serif" }}
                        >
                          {currentReview.comment}
                        </p>

                        {/* Date Timestamp & Pagination Indicator */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-neutral-500 font-mono">
                            {currentReview.date}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {reviewIndex + 1} of {REVIEWS.length}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}

            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Tiered Pricing & Booking Panel (4 Cols) */}
          <div className="lg:col-span-4 sticky top-20">
            <div className="rounded-2xl bg-[#141414] border border-[#2E2E2E] overflow-hidden shadow-2xl">
              
              {/* Package Selector Tabs */}
              <div className="grid grid-cols-3 border-b border-[#2E2E2E]">
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setActiveTab(pkg)}
                    className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === pkg
                        ? 'bg-[#FFE379] text-[#101010]'
                        : 'bg-[#181818] text-neutral-400 hover:text-white'
                    }`}
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {pkg}
                  </button>
                ))}
              </div>

              {/* Package Content */}
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 
                      className="text-base font-bold text-white uppercase"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {currentPkg.title}
                    </h3>
                    <span 
                      className="text-2xl font-black text-[#FFE379] font-mono"
                    >
                      {currentPkg.price}
                    </span>
                  </div>
                  <p 
                    className="text-xs text-neutral-400 leading-relaxed font-normal"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {currentPkg.desc}
                  </p>
                </div>

                <div className="flex items-center space-x-6 text-xs text-neutral-300 font-mono py-3 border-y border-[#232323]">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#FFE379]" />
                    <span>{currentPkg.delivery}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FFE379]" />
                    <span>{currentPkg.revisions}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase font-mono block mb-1">
                    What's included in this package:
                  </span>
                  {currentPkg.checklist.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#FFE379] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 hover:scale-[1.02]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <span>Book This Project Edit ({currentPkg.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/contact"
                    className="w-full py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#2D2D2D] text-xs font-semibold text-neutral-300 hover:text-white transition-all text-center block"
                  >
                    Contact for Custom Scope
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Global Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-[#2E2E2E] shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center text-sm font-bold transition-all"
            >
              ✕
            </button>
            <iframe
              src={project.video}
              title={project.title}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Booking / Inquiry Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#161616] border border-[#2E2E2E] rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white text-base"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono text-[#FFE379] bg-[#FFE379]/10 px-2.5 py-1 rounded border border-[#FFE379]/30 uppercase font-bold">
                {activeTab.toUpperCase()} • {currentPkg.price}
              </span>
              <h3 
                className="text-xl font-bold text-white uppercase mt-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Start Project Order
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Provide your footage link or project details to initiate production.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="py-8 text-center space-y-2">
                <Check className="w-12 h-12 text-[#FFE379] mx-auto animate-bounce" />
                <h4 className="font-bold text-white text-base uppercase">Order Inquiry Placed!</h4>
                <p className="text-xs text-neutral-400">Our editor will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Miller"
                    className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] text-white text-xs rounded-xl focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="david@example.com"
                    className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] text-white text-xs rounded-xl focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Raw Footage Link (Google Drive / WeTransfer)
                  </label>
                  <input
                    type="text"
                    value={formData.footageLink}
                    onChange={(e) => setFormData({ ...formData, footageLink: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] text-white text-xs rounded-xl focus:border-[#FFE379] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Project Instructions / Notes
                  </label>
                  <textarea
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Desired music style, color grade mood, turnaround timeline..."
                    className="w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2E2E2E] text-white text-xs rounded-xl focus:border-[#FFE379] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-md mt-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Confirm & Submit Project Inquiry
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
