import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  serviceType: { type: String, default: 'General Inquiry' },
  packageChosen: { type: String, default: 'Standard' },
  footageLink: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'In Progress', 'Completed'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema);
