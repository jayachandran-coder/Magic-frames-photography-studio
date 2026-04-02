const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
