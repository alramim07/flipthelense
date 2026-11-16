import dotenv from 'dotenv';
dotenv.config();

import Portfolio from './models/Portfolio.js';
import Reel from './models/Reel.js';
import ServiceGig from './models/ServiceGig.js';
import SiteSettings from './models/SiteSettings.js';

export async function seedInitialData() {
  try {
    const portCount = await Portfolio.countDocuments();
    if (portCount === 0) {
      await Portfolio.insertMany([
        {
          title: "Dream Car Bengal - Commercial",
          category: "full_production",
          badge: "Premium",
          clientName: "Bengal Auto",
          thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
          videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
          order: 1
        },
        {
          title: "Royal Wedding Cinematic Film",
          category: "wedding_video",
          badge: "Premium",
          clientName: "Samira & Fahad",
          thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
          videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
          order: 2
        },
        {
          title: "JBL GO3 Audio Product Video",
          category: "reels_shorts",
          badge: "Standard",
          clientName: "JBL Media",
          thumbnailUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
          videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
          order: 3
        },
        {
          title: "Seylon Documentary Reel",
          category: "documentary",
          badge: "Standard",
          clientName: "Seylon",
          thumbnailUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
          videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
          order: 4
        },
        {
          title: "Cinematic Wedding Photography",
          category: "wedding_photo",
          badge: "Standard",
          clientName: "Destination Wedding",
          thumbnailUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
          videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
          order: 5
        },
        {
          title: "Luxe Bottle Creative Poster",
          category: "graphic_design",
          badge: "Premium",
          clientName: "Luxe Cosmetics",
          thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
          videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
          order: 6
        }
      ]);
      console.log('Seeded initial portfolio items.');
    }

    const reelCount = await Reel.countDocuments();
    if (reelCount === 0) {
      await Reel.insertMany([
        { title: "Cinematic Wedding Teaser", viewsCount: "1.2M Views", thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 1 },
        { title: "Dream Car Reel", viewsCount: "890K Views", thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 2 },
        { title: "Street Pacing Motion Edit", viewsCount: "2.4M Views", thumbnailUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 3 },
        { title: "Commercial Audio", viewsCount: "540K Views", thumbnailUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 4 },
        { title: "Neon Cyberpunk Color Grade", viewsCount: "1.8M Views", thumbnailUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 5 },
        { title: "Nature Documentary", viewsCount: "720K Views", thumbnailUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 6 },
        { title: "Energy Commercial", viewsCount: "3.1M Views", thumbnailUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 7 },
        { title: "Fashion Model Reel", viewsCount: "610K Views", thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", order: 8 }
      ]);
      console.log('Seeded initial reels.');
    }

    const serviceCount = await ServiceGig.countDocuments();
    if (serviceCount === 0) {
      await ServiceGig.create({
        slug: "cinematic-wedding-video-editing",
        title: "I will do cinematic wedding video editing, 4K film color grading and storytelling",
        sellerName: "Parvej Mosharrof Pollob",
        sellerRole: "Senior Cinematographer & Film Director",
        sellerRating: 5.0,
        reviewsCount: 128,
        ordersInQueue: 14,
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
        packages: {
          basic: {
            title: "Teaser / Trailer Edit",
            price: "US$150",
            rawPrice: 150,
            desc: "Up to 60 seconds teaser trailer with sound effects, color grading, and social exports.",
            deliveryDays: 3,
            revisions: "2 Revisions",
            checklist: ["Up to 60 sec teaser edit", "Sound effects & licensed audio", "Color grading (Rec.709)", "1080p Full HD Export"]
          },
          standard: {
            title: "Cinematic Wedding Highlight",
            price: "US$300",
            rawPrice: 300,
            desc: "3 to 5 minutes cinematic wedding highlight film with full 4K color grading, dialogue audio sync, licensed music and drone integration.",
            deliveryDays: 5,
            revisions: "3 Revisions",
            checklist: ["4K UHD Master File Export", "Multi-Camera Audio Synchronization", "Professional Hollywood Color Grading", "Sound Design & Licensed Music", "Drone Footage Integration"]
          },
          premium: {
            title: "Full Feature Documentary",
            price: "US$550",
            rawPrice: 550,
            desc: "Comprehensive 15-20 minutes full documentary film + 60s teaser + speech multicam edits + raw project files.",
            deliveryDays: 7,
            revisions: "Unlimited Revisions",
            checklist: ["15 to 20 min Full Documentary", "Free 60 sec Social Teaser", "Full Audio Speech Mastering", "Unlimited Revisions", "Full 4K ProRes Export"]
          }
        }
      });
      console.log('Seeded initial service gig.');
    }

    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({});
      console.log('Seeded initial site settings.');
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
}
