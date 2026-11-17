import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_PORTFOLIO = [
  { id: "p1", title: "Dream Car Bengal - Commercial", category: "full_production", badge: "Premium", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", video: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: "p2", title: "Royal Wedding Cinematic Film", category: "wedding_video", badge: "Premium", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", video: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: "p3", title: "JBL GO3 Audio Product Video", category: "reels_shorts", badge: "Standard", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80", video: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: "p4", title: "Seylon Documentary Reel", category: "documentary", badge: "Standard", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", video: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: "p5", title: "Cinematic Wedding Photography", category: "wedding_photo", badge: "Standard", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80", video: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: "p6", title: "Luxe Bottle Creative Poster", category: "graphic_design", badge: "Premium", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }
];

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "wedding_video", name: "Wedding Video" },
  { id: "wedding_photo", name: "Wedding Photo" },
  { id: "graphic_design", name: "Graphic Design" },
  { id: "reels_shorts", name: "Reels / Shorts" },
  { id: "documentary", name: "Documentary" },
  { id: "full_production", name: "Full Production" }
];

export default function PortfolioSection({ onOpenVideo }) {
  const [currentFilter, setCurrentFilter] = useState('all');

  const filteredPortfolio = currentFilter === 'all' 
    ? DEFAULT_PORTFOLIO 
    : DEFAULT_PORTFOLIO.filter(p => p.category === currentFilter);

  return (
    <section id="portfolio-section" className="mb-20">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Our Portfolio</h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-2">Our portfolio highlights a diverse range of creative work.</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCurrentFilter(c.id)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition cursor-pointer ${
              currentFilter === c.id 
                ? 'bg-[#F59E0B] text-black font-bold' 
                : 'bg-[#181818] text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredPortfolio.map(item => (
          <div key={item.id} className="bg-[#121212] border border-neutral-800 rounded-sm overflow-hidden group">
            <div 
              className="aspect-square relative overflow-hidden bg-neutral-900 cursor-pointer"
              onClick={() => onOpenVideo(item.title, item.video)}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-2 left-2">
                <span className="bg-black/70 text-[10px] uppercase font-bold text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                  {item.badge}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Link to="/portfolio" className="w-10 h-10 rounded-full bg-[#F59E0B] text-black flex items-center justify-center">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </Link>
              </div>
            </div>
            <div className="p-3">
              <Link to="/portfolio" className="block">
                <h4 className="text-xs font-bold text-white hover:text-[#F59E0B] transition line-clamp-1">{item.title}</h4>
              </Link>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/80">
                <span className="text-[10px] text-neutral-400 capitalize">{item.category.replace('_', ' ')}</span>
                <Link to="/portfolio" className="text-[10px] font-bold text-[#F59E0B] hover:underline flex items-center">
                  View Work →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
