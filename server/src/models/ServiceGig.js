import mongoose from 'mongoose';

const servicePackageSchema = new mongoose.Schema({
  title: String,
  price: String,
  rawPrice: Number,
  desc: String,
  deliveryDays: Number,
  revisions: String,
  checklist: [String]
});

const serviceGigSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  sellerName: { type: String, default: 'Parvej Mosharrof Pollob' },
  sellerRole: { type: String, default: 'Senior Cinematographer & Film Director' },
  sellerRating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 128 },
  ordersInQueue: { type: Number, default: 14 },
  coverImage: { type: String, required: true },
  videoUrl: { type: String, default: '' },
  galleryImages: [String],
  aboutGig: [String],
  packages: {
    basic: servicePackageSchema,
    standard: servicePackageSchema,
    premium: servicePackageSchema
  },
  faqs: [{
    question: String,
    answer: String
  }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ServiceGig', serviceGigSchema);
