import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['wedding_video', 'wedding_photo', 'graphic_design', 'reels_shorts', 'documentary', 'full_production'],
    required: true 
  },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, default: '' },
  badge: { type: String, enum: ['Premium', 'Standard', 'Award Winner'], default: 'Standard' },
  clientName: { type: String, default: 'Independent Project' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Portfolio', portfolioSchema);
