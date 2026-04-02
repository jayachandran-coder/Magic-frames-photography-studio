const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a media title'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: [true, 'Media must be classified as photo or video'],
  },
  url: {
    type: String,
    required: [true, 'Media URL is required'],
  },
  videoPreviewUrl: {
    type: String,
    // Only used if type === 'video' and a separate preview/thumbnail is needed
  },
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
