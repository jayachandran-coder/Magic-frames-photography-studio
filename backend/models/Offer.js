const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an offer title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  imageUrl: {
    type: String,
    // Optional because an offer might only have a video
  },
  videoUrl: {
    type: String,
    // Optional because an offer might only have an image
  },
  buttonText: {
    type: String,
    default: 'Book Now',
  },
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
