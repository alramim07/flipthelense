import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Save,
  ArrowLeft,
  Eye,
  Check,
  Play,
  Upload,
  Sparkles,
  ChevronRight,
  Clock,
  ShieldCheck,
  ArrowRight,
  Plus,
  Trash2,
  ExternalLink,
  Video,
  Image as ImageIcon,
  Film,
  X
} from 'lucide-react';

export default function ProjectVisualBuilder() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroThumbInputRef = useRef(null);
  const galleryImageInputRef = useRef(null);

  const isEditingExisting = Boolean(slug);

  // Clean empty state for new projects as requested by the user
  const emptyProject = {
    title: '',
    slug: '',
    category: '',
    tag: '',
    client: '',
    duration: '',
    thumbnailType: 'image', // 'image' | 'video'
    img: '',
    video: '',
    headline: '',
    overview: '',
    deliverables: [],
    basicPrice: '',
    standardPrice: '',
    premiumPrice: '',
    mediaGallery: [] // Array of { type: 'image' | 'video', url: string, caption?: string }
  };

  const [project, setProject] = useState(emptyProject);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('standard');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [saveBanner, setSaveBanner] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoModalUrl, setActiveVideoModalUrl] = useState('');

  // Gallery video add input state
  const [newGalleryVideoUrl, setNewGalleryVideoUrl] = useState('');
  const [newGalleryVideoCaption, setNewGalleryVideoCaption] = useState('');
  const [showAddVideoInput, setShowAddVideoInput] = useState(false);

  // If slug is provided (editing existing), fetch that project; otherwise leave completely empty for new project
  useEffect(() => {
    if (slug) {
      setLoading(true);
      axios.get(`/api/projects/${slug}`)
        .then((res) => {
          if (res.data) {
            setProject({
              ...emptyProject,
              ...res.data,
              thumbnailType: res.data.thumbnailType || (res.data.video && !res.data.img ? 'video' : 'image'),
              mediaGallery: res.data.mediaGallery || []
            });
          }
        })
        .catch((err) => {
          console.warn('Could not load project', err);
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  // Handle hero thumbnail image upload
  const handleHeroImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject((prev) => ({
          ...prev,
          img: reader.result,
          image: reader.result,
          thumbnailType: 'image'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding image(s) to media gallery
  const handleGalleryImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject((prev) => ({
          ...prev,
          mediaGallery: [
            ...(prev.mediaGallery || []),
            {
              id: 'med_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
              type: 'image',
              url: reader.result,
              caption: file.name.replace(/\.[^/.]+$/, '')
            }
          ]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Add gallery video from link
  const handleAddGalleryVideo = () => {
    if (!newGalleryVideoUrl.trim()) return;
    let embedUrl = newGalleryVideoUrl.trim();
    if (embedUrl.includes('watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }

    setProject((prev) => ({
      ...prev,
      mediaGallery: [
        ...(prev.mediaGallery || []),
        {
          id: 'med_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          type: 'video',
          url: embedUrl,
          caption: newGalleryVideoCaption.trim() || 'Video Showcase'
        }
      ]
    }));
    setNewGalleryVideoUrl('');
    setNewGalleryVideoCaption('');
    setShowAddVideoInput(false);
  };

  // Remove gallery item
  const handleRemoveMedia = (index) => {
    setProject((prev) => ({
      ...prev,
      mediaGallery: prev.mediaGallery.filter((_, i) => i !== index)
    }));
  };

  // Deliverables add/remove
  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setProject((prev) => ({
      ...prev,
      deliverables: [...(prev.deliverables || []), newDeliverable.trim()]
    }));
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (index) => {
    setProject((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  // Save / Publish
  const handleSaveProject = async () => {
    if (!project.title.trim() && !project.headline.trim()) {
      setSaveBanner({ type: 'error', msg: 'Please provide at least a Project Title or Headline before saving.' });
      setTimeout(() => setSaveBanner(null), 3000);
      return;
    }

    setSaving(true);
    setSaveBanner(null);

    const projectToSave = {
      ...project,
      title: project.title.trim() || project.headline.trim(),
      slug: project.slug.trim() || (project.title || project.headline).toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
      tag: project.tag.trim() || (project.category ? project.category.toUpperCase() : 'PROJECT SHOWCASE'),
      category: project.category.trim() || 'commercials',
      basicPrice: Number(project.basicPrice) || 0,
      standardPrice: Number(project.standardPrice) || 0,
      premiumPrice: Number(project.premiumPrice) || 0
    };

    try {
      if (isEditingExisting) {
        const res = await axios.put(`/api/projects/${slug}`, projectToSave);
        setSaveBanner({ type: 'success', msg: 'Project changes updated successfully!' });
        if (res.data?.project) {
          setProject((prev) => ({ ...prev, ...res.data.project }));
        }
      } else {
        const res = await axios.post('/api/portfolio', projectToSave);
        const createdItem = res.data?.item;
        setSaveBanner({ type: 'success', msg: 'New project published to portfolio!' });
        setTimeout(() => {
          if (createdItem?.slug) {
            navigate(`/${createdItem.slug}`);
          } else {
            navigate('/admin/portfolio');
          }
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setSaveBanner({ type: 'error', msg: 'Failed to save project. Please check fields.' });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveBanner(null), 4000);
    }
  };

  // Dynamic pricing package preview helper
  const PACKAGES = {
    basic: {
      title: 'Basic Edit Package',
      price: project.basicPrice ? `US$${project.basicPrice}` : 'US$0',
      desc: 'Teaser / short trailer cut, sound design, color grading, and social multi-platform exports.',
      delivery: '3-day delivery',
      revisions: '2 Revisions',
      checklist: [
        'Up to 60 sec cut & pace',
        'Sound effects & licensed audio',
        'Color grading (Rec.709)',
        'Full HD / 4K Export'
      ]
    },
    standard: {
      title: 'Standard Highlight Film',
      price: project.standardPrice ? `US$${project.standardPrice}` : 'US$0',
      desc: 'Full cinematic highlight film with color grading, dialogue audio sync, and licensed music.',
      delivery: '5-day delivery',
      revisions: '3 Revisions',
      checklist: (project.deliverables && project.deliverables.length > 0) ? project.deliverables : [
        '4K UHD Master File Export',
        'Multi-Camera Audio Synchronization',
        'Color Grading & Film Emulation'
      ]
    },
    premium: {
      title: 'Premium Extended Feature',
      price: project.premiumPrice ? `US$${project.premiumPrice}` : 'US$0',
      desc: 'Comprehensive full cut + social teasers + multi-camera audio sync + master source project archive.',
      delivery: '7-day delivery',
      revisions: 'Unlimited Revisions',
      checklist: [
        'Extended Feature Cut',
        'Free Social Media Teaser',
        'Dialogue Cleanup & Mastering',
        'Master ProRes Export'
      ]
    }
  };

  const currentPkg = PACKAGES[activeTab];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white font-mono text-sm">
        <span className="w-3 h-3 rounded-full bg-[#FFE379] animate-ping mr-3" />
        Loading Live Visual Builder...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] text-[#F4F4F4] pb-24">
      {/* ================= STICKY TOP ELEMENTOR-STYLE BUILDER BAR ================= */}
      <header className="sticky top-0 z-50 bg-[#161616]/95 backdrop-blur-xl border-b border-[#2B2B2B] px-4 sm:px-8 py-3 shadow-2xl">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Back & Breadcrumb mode indicator */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/admin/portfolio')}
              className="p-2 rounded-xl bg-[#202020] hover:bg-[#2A2A2A] text-neutral-300 hover:text-white transition-colors flex items-center space-x-1.5 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-neutral-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE379] animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-300 font-bold">
                VISUAL LIVE BUILDER ({isEditingExisting ? `EDITING: ${project.title || slug}` : 'NEW EMPTY PROJECT'})
              </span>
            </div>
          </div>

          {/* Center notification banner */}
          {saveBanner && (
            <div className={`text-xs px-3.5 py-1.5 rounded-lg font-mono font-bold flex items-center space-x-2 ${
              saveBanner.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              <Check className="w-3.5 h-3.5" />
              <span>{saveBanner.msg}</span>
            </div>
          )}

          {/* Right: Preview link & Save/Publish Button */}
          <div className="flex items-center space-x-3">
            {project.slug && (
              <a
                href={`/${project.slug}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#202020] hover:bg-[#2A2A2A] text-neutral-300 hover:text-[#FFE379] text-xs font-mono transition-colors border border-[#333]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live View</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            )}

            <button
              onClick={handleSaveProject}
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-[#101010] font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_25px_rgba(255,227,121,0.3)] hover:scale-105 cursor-pointer disabled:opacity-50"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{saving ? 'Publishing...' : isEditingExisting ? 'Update Project' : 'Publish Project'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Helper Bar */}
      <div className="bg-[#FFE379]/10 border-b border-[#FFE379]/20 py-2 px-4 text-center text-xs text-[#FFE379] font-mono flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Fill in every section directly on the page. Add an image or video thumbnail, plus as many gallery images & videos as you like!</span>
      </div>

      {/* ================= PAGE CONTAINER MATCHING EXACT LIVE LAYOUT ================= */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-8">
        
        {/* SEO Breadcrumb Navigation & Slug Editor */}
        <div className="pb-6 text-xs text-neutral-400 flex flex-wrap items-center gap-2 font-mono">
          <span>Home</span>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span>Portfolio</span>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          
          <div className="flex items-center space-x-1 bg-[#1A1A1A] px-2.5 py-1 rounded-lg border border-[#333]">
            <span className="text-neutral-500">domain.com/</span>
            <input
              type="text"
              value={project.slug || ''}
              onChange={(e) => {
                const cleanSlug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
                setProject({ ...project, slug: cleanSlug });
              }}
              placeholder="project-slug-here"
              className="bg-transparent text-[#FFE379] font-bold outline-none border-b border-dashed border-[#FFE379]/50 focus:border-[#FFE379] text-xs font-mono w-48"
            />
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT COLUMN: Project Media & Narrative (8 Cols) ================= */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Category Tag & Title Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={project.tag || project.category || ''}
                  onChange={(e) => setProject({ ...project, tag: e.target.value, category: e.target.value.toLowerCase() })}
                  placeholder="TYPE CATEGORY (e.g. DOCUMENTARY, COMMERCIAL, WEDDING)"
                  className="px-3.5 py-1.5 rounded-md bg-[#FFE379]/15 border border-[#FFE379]/40 text-[#FFE379] text-xs font-bold uppercase tracking-wider font-mono outline-none focus:ring-1 focus:ring-[#FFE379] min-w-[280px]"
                />
              </div>

              {/* Project Title & Headline Input */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const autoSlug = val.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
                    setProject({ 
                      ...project, 
                      title: val, 
                      slug: project.slug ? project.slug : autoSlug 
                    });
                  }}
                  placeholder="Enter Project Title (e.g. Alpine Ridge Explorer)"
                  className="w-full text-base sm:text-xl font-bold text-white bg-[#181818]/80 px-4 py-2.5 rounded-xl border border-dashed border-[#3D3D3D] hover:border-[#FFE379] focus:border-[#FFE379] focus:bg-[#181818] outline-none font-mono"
                />

                <textarea
                  rows="2"
                  value={project.headline || ''}
                  onChange={(e) => setProject({ ...project, headline: e.target.value })}
                  placeholder="Enter Display Headline (e.g. I will produce cinema-grade documentary video editing, soundscapes and color grading)"
                  className="w-full text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase bg-[#181818]/60 hover:bg-[#181818] p-3 rounded-xl border border-dashed border-[#3D3D3D] hover:border-[#FFE379] focus:border-[#FFE379] focus:bg-[#181818] focus:outline-none transition-all resize-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                />
              </div>
            </div>

            {/* ================= HERO THUMBNAIL (IMAGE OR VIDEO TOGGLE) ================= */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-bold text-neutral-300 flex items-center space-x-2">
                  <Film className="w-4 h-4 text-[#FFE379]" />
                  <span>Main Showcase Thumbnail</span>
                </span>

                {/* Switch between Image thumbnail vs Direct Video Player thumbnail */}
                <div className="inline-flex rounded-lg bg-[#181818] border border-[#2D2D2D] p-1 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setProject({ ...project, thumbnailType: 'image' })}
                    className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 ${
                      project.thumbnailType !== 'video'
                        ? 'bg-[#FFE379] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Image Thumbnail</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProject({ ...project, thumbnailType: 'video' })}
                    className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1.5 ${
                      project.thumbnailType === 'video'
                        ? 'bg-[#FFE379] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Direct Video Player</span>
                  </button>
                </div>
              </div>

              {/* Main Display Container */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden relative border border-[#262626] shadow-2xl bg-neutral-950 group">
                
                {/* 1. Direct Video mode */}
                {project.thumbnailType === 'video' && project.video ? (
                  <iframe
                    src={project.video}
                    title={project.title || 'Project Video'}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : project.img ? (
                  /* 2. Image mode with uploaded/set image */
                  <>
                    <img 
                      src={project.img} 
                      alt={project.title || 'Project Thumbnail'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    
                    {project.video && (
                      <button 
                        type="button"
                        onClick={() => {
                          setActiveVideoModalUrl(project.video);
                          setIsVideoModalOpen(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        title="Click to preview video modal"
                      >
                        <div className="w-18 h-18 rounded-full bg-[#FFE379] text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,227,121,0.5)] transform group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  /* 3. Empty placeholder */
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500 border-2 border-dashed border-[#2A2A2A]">
                    {project.thumbnailType === 'video' ? (
                      <>
                        <Video className="w-12 h-12 text-neutral-600 mb-3" />
                        <span className="text-xs uppercase font-mono text-neutral-400 font-bold mb-1">
                          No Video Embed Link Provided
                        </span>
                        <p className="text-[11px] text-neutral-600 max-w-sm">
                          Paste a YouTube or Vimeo embed link below to play directly in this hero section.
                        </p>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-12 h-12 text-neutral-600 mb-3" />
                        <span className="text-xs uppercase font-mono text-neutral-400 font-bold mb-1">
                          No Thumbnail Image Uploaded Yet
                        </span>
                        <p className="text-[11px] text-neutral-600 max-w-sm mb-4">
                          Click "Upload Thumbnail Image" below or paste an image URL.
                        </p>
                        <button
                          type="button"
                          onClick={() => heroThumbInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-[#FFE379] hover:bg-[#F2D76B] text-black font-black uppercase text-xs tracking-wider font-mono flex items-center space-x-2 shadow-lg"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Select Thumbnail Image</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Upload Thumbnail Overlay Button (Available in Image mode) */}
                {project.thumbnailType !== 'video' && (
                  <div className="absolute bottom-4 right-4 z-10 flex items-center space-x-2">
                    <input
                      type="file"
                      ref={heroThumbInputRef}
                      onChange={handleHeroImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => heroThumbInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-lg bg-black/80 hover:bg-[#FFE379] text-white hover:text-black transition-colors font-mono text-xs flex items-center space-x-1.5 border border-white/20 backdrop-blur-md cursor-pointer shadow-lg"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{project.img ? 'Change Thumbnail' : 'Upload Thumbnail'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Link Controls for Thumbnail Image & Video */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#141414] p-3 rounded-xl border border-[#262626]">
                  <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                    Or Paste Image URL (Thumbnail)
                  </label>
                  <input
                    type="text"
                    value={project.img || ''}
                    onChange={(e) => setProject({ ...project, img: e.target.value, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-1.5 rounded-lg text-xs font-mono text-white placeholder-neutral-600 focus:border-[#FFE379] outline-none"
                  />
                </div>

                <div className="bg-[#141414] p-3 rounded-xl border border-[#262626]">
                  <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                    YouTube / Vimeo Embed URL (For Play Modal or Direct Player)
                  </label>
                  <input
                    type="text"
                    value={project.video || ''}
                    onChange={(e) => {
                      let url = e.target.value;
                      if (url.includes('watch?v=')) {
                        url = url.replace('watch?v=', 'embed/');
                      } else if (url.includes('youtu.be/')) {
                        url = url.replace('youtu.be/', 'www.youtube.com/embed/');
                      }
                      setProject({ ...project, video: url });
                    }}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-1.5 rounded-lg text-xs font-mono text-white placeholder-neutral-600 focus:border-[#FFE379] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ================= ADDITIONAL MEDIA GALLERY (UNLIMITED IMAGES & VIDEOS) ================= */}
            <div className="space-y-4 pt-6 border-t border-[#232323]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 
                    className="text-lg font-bold text-white uppercase tracking-tight flex items-center space-x-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <span>Additional Showcase Media (Images & Videos)</span>
                    <span className="text-xs font-mono text-[#FFE379] bg-[#FFE379]/10 px-2 py-0.5 rounded border border-[#FFE379]/20">
                      {project.mediaGallery?.length || 0} Added
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Add as many extra showcase images or embedded videos as you wish for this project.
                  </p>
                </div>

                {/* Add Buttons */}
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    ref={galleryImageInputRef}
                    onChange={handleGalleryImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => galleryImageInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#FFE379] hover:text-black text-white text-xs font-bold uppercase transition-colors flex items-center space-x-1.5 border border-[#333]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Image(s)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddVideoInput(!showAddVideoInput)}
                    className="px-3 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#FFE379] hover:text-black text-white text-xs font-bold uppercase transition-colors flex items-center space-x-1.5 border border-[#333]"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Add Video</span>
                  </button>
                </div>
              </div>

              {/* Add Video Drawer / Input */}
              {showAddVideoInput && (
                <div className="p-4 rounded-xl bg-[#181818] border border-[#FFE379]/30 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FFE379] uppercase">
                      Add Embedded Video to Gallery
                    </span>
                    <button onClick={() => setShowAddVideoInput(false)} className="text-neutral-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newGalleryVideoUrl}
                      onChange={(e) => setNewGalleryVideoUrl(e.target.value)}
                      placeholder="YouTube / Vimeo Video URL (e.g. https://www.youtube.com/watch?v=...)"
                      className="w-full bg-[#121212] border border-[#333] px-3.5 py-2 rounded-lg text-xs font-mono text-white placeholder-neutral-500 focus:border-[#FFE379] outline-none"
                    />
                    <input
                      type="text"
                      value={newGalleryVideoCaption}
                      onChange={(e) => setNewGalleryVideoCaption(e.target.value)}
                      placeholder="Optional Caption / Title (e.g. Behind The Scenes / Color Grade)"
                      className="w-full bg-[#121212] border border-[#333] px-3.5 py-2 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-[#FFE379] outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddGalleryVideo}
                      className="px-5 py-2 rounded-lg bg-[#FFE379] text-black font-bold uppercase text-xs font-mono hover:bg-[#F2D76B]"
                    >
                      Insert Video
                    </button>
                  </div>
                </div>
              )}

              {/* Media Gallery Grid */}
              {project.mediaGallery && project.mediaGallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.mediaGallery.map((item, idx) => (
                    <div 
                      key={item.id || idx}
                      className="relative rounded-xl overflow-hidden bg-[#161616] border border-[#262626] group shadow-lg"
                    >
                      {item.type === 'video' ? (
                        <div className="aspect-video w-full bg-black relative">
                          <iframe
                            src={item.url}
                            title={item.caption || `Video ${idx + 1}`}
                            className="w-full h-full pointer-events-none"
                          />
                          <div 
                            onClick={() => {
                              setActiveVideoModalUrl(item.url);
                              setIsVideoModalOpen(true);
                            }}
                            className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#FFE379] text-black flex items-center justify-center shadow-lg">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
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

                      {/* Caption & Delete Button */}
                      <div className="p-2.5 flex items-center justify-between bg-[#141414] border-t border-[#232323]">
                        <span className="text-[11px] font-mono text-neutral-300 truncate max-w-[170px]">
                          {item.caption || (item.type === 'video' ? 'Video Media' : 'Image Photo')}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(idx)}
                          className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                          title="Remove from gallery"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-[#262626] text-center text-neutral-500 font-mono text-xs">
                  No additional gallery items yet. Add screenshots, color grade stills, or extra footage links above.
                </div>
              )}
            </div>

            {/* ================= ABOUT THIS PROJECT NARRATIVE ================= */}
            <div className="space-y-4 pt-6 border-t border-[#232323]">
              <h2 
                className="text-xl font-bold text-white uppercase tracking-tight flex items-center space-x-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span>About This Project & Creative Direction</span>
              </h2>

              <div className="relative group">
                <textarea
                  rows="4"
                  value={project.overview || ''}
                  onChange={(e) => setProject({ ...project, overview: e.target.value })}
                  placeholder="Write project overview, narrative, camera equipment used, creative vision..."
                  className="w-full text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal bg-[#161616] p-4 rounded-xl border border-dashed border-[#333] hover:border-[#FFE379] focus:border-[#FFE379] focus:outline-none transition-all resize-y"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                />
              </div>

              {/* Key Editing Deliverables Included */}
              <div className="pt-2">
                <h3 className="font-bold text-white text-sm uppercase mb-3 flex items-center justify-between" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  <span>Key Editing Deliverables Included</span>
                  <span className="text-[10px] font-mono text-neutral-400">{project.deliverables?.length || 0} items</span>
                </h3>

                {project.deliverables && project.deliverables.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
                    {project.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center justify-between bg-[#141414] p-2.5 rounded-lg border border-[#232323] group hover:border-[#FFE379]/40 transition-colors">
                        <div className="flex items-center space-x-2 min-w-0 pr-2">
                          <Check className="w-4 h-4 text-[#FFE379] shrink-0" />
                          <span className="text-xs truncate">{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(i)}
                          className="text-neutral-500 hover:text-red-400 p-1 rounded transition-colors"
                          title="Remove deliverable"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Add Deliverable Row */}
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddDeliverable(); }}}
                    placeholder="Add deliverable (e.g. 4K UHD Master File Export) and press Enter"
                    className="flex-1 bg-[#1A1A1A] border border-[#2D2D2D] text-xs px-3.5 py-2 rounded-xl text-white placeholder-neutral-500 focus:border-[#FFE379] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-4 py-2 rounded-xl bg-[#222] hover:bg-[#FFE379] hover:text-black text-white text-xs font-bold uppercase transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Client & Duration Meta Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#232323]">
                <div className="bg-[#141414] p-3 rounded-xl border border-[#232323]">
                  <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                    Client / Commission Label
                  </label>
                  <input
                    type="text"
                    value={project.client || ''}
                    onChange={(e) => setProject({ ...project, client: e.target.value })}
                    placeholder="e.g. Royal Heritage / National Geographic / Nike"
                    className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-1.5 rounded-lg text-xs text-white focus:border-[#FFE379] outline-none"
                  />
                </div>

                <div className="bg-[#141414] p-3 rounded-xl border border-[#232323]">
                  <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                    Duration Tag
                  </label>
                  <input
                    type="text"
                    value={project.duration || ''}
                    onChange={(e) => setProject({ ...project, duration: e.target.value })}
                    placeholder="e.g. 03:30 MIN"
                    className="w-full bg-[#1A1A1A] border border-[#333] px-3 py-1.5 rounded-lg text-xs text-white focus:border-[#FFE379] outline-none"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: Tiered Pricing Packages (4 Cols) ================= */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            
            {/* Pricing Controls Box */}
            <div className="rounded-2xl bg-[#181818] border border-[#FFE379]/30 p-4 shadow-xl">
              <span className="text-[10px] font-mono uppercase text-[#FFE379] font-bold block mb-2">
                ⚙ Pricing Controls (Set Packages)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] uppercase font-mono text-neutral-400 mb-1">Basic ($)</label>
                  <input
                    type="number"
                    value={project.basicPrice || ''}
                    onChange={(e) => setProject({ ...project, basicPrice: e.target.value })}
                    placeholder="150"
                    className="w-full bg-[#121212] border border-[#333] rounded-lg p-2 text-xs font-mono font-bold text-[#FFE379] text-center focus:border-[#FFE379] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-mono text-neutral-400 mb-1">Standard ($)</label>
                  <input
                    type="number"
                    value={project.standardPrice || ''}
                    onChange={(e) => setProject({ ...project, standardPrice: e.target.value })}
                    placeholder="300"
                    className="w-full bg-[#121212] border border-[#333] rounded-lg p-2 text-xs font-mono font-bold text-[#FFE379] text-center focus:border-[#FFE379] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-mono text-neutral-400 mb-1">Premium ($)</label>
                  <input
                    type="number"
                    value={project.premiumPrice || ''}
                    onChange={(e) => setProject({ ...project, premiumPrice: e.target.value })}
                    placeholder="550"
                    className="w-full bg-[#121212] border border-[#333] rounded-lg p-2 text-xs font-mono font-bold text-[#FFE379] text-center focus:border-[#FFE379] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Exactly Matching Live Interactive Pricing Widget */}
            <div className="rounded-2xl bg-[#141414] border border-[#2E2E2E] overflow-hidden shadow-2xl">
              
              {/* Package Selector Tabs */}
              <div className="grid grid-cols-3 border-b border-[#2E2E2E]">
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
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
                  <div
                    className="w-full py-3.5 rounded-xl bg-[#FFE379] text-[#101010] font-black uppercase text-xs tracking-wider shadow-md flex items-center justify-center space-x-2 opacity-90 cursor-default"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    <span>Book This Project Edit ({currentPkg.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    (Live visitor view will trigger direct order checkout)
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Video Modal Preview */}
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
              src={activeVideoModalUrl || project.video}
              title={project.title}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

    </div>
  );
}
