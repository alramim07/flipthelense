import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  tagline: { type: String, default: 'Cinematography. Video Editing. Visual Storytelling' },
  heroTitle: { type: String, default: 'Crafting Stories Through Cinematic Videos.' },
  heroBio: { type: String, default: 'Senior Video Editor & Cinematographer focused on emotionally charged narrative pacing, high watch-time reels, color science, and cinematic wedding & commercial films.' },
  heroCoverImage: { type: String, default: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80' },
  heroVideoUrl: { type: String, default: 'https://www.youtube.com/embed/ScMzIvxBSi4' },
  stats: {
    exp: { type: String, default: '4.5+' },
    projects: { type: String, default: '523+' },
    satisfaction: { type: String, default: '99%' }
  },
  about: {
    title: { type: String, default: "HELLO, I'M PARVEJ MOSHARROF POLLOB" },
    sinceYear: { type: String, default: 'Since 2022' },
    bio1: { type: String, default: 'For the past 4.5+ years, I have dedicated myself to the art of visual storytelling. Currently working as a Senior Cinematographer and Video Editor, I lead production workflows and collaborate with a talented team of creatives to deliver high-impact media for weddings and commercial clients.' },
    bio2: { type: String, default: 'My approach to editing is both technical and emotional. Whether I am crafting a fast-paced real estate promo, a heartfelt wedding trailer, or executing complex motion graphics and speed ramps, my goal is always to keep the audience engaged from the first frame to the last.' }
  },
  contact: {
    email: { type: String, default: 'parvejmosharrof@gmail.com' },
    location: { type: String, default: 'Rajshahi, Bangladesh (Available worldwide)' },
    phone: { type: String, default: '+880 1885 000118' },
    socials: {
      linkedin: { type: String, default: '#' },
      youtube: { type: String, default: '#' },
      instagram: { type: String, default: '#' }
    }
  }
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);
