const About = require('../models/About');
const cloudinary = require('../config/cloudinary');

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const urlParts = url.split('/');
  const filenameWithExt = urlParts[urlParts.length - 1];
  const folder = urlParts[urlParts.length - 2];
  const filename = filenameWithExt.split('.')[0];
  return `${folder}/${filename}`;
};

// @desc    Get the about image config
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'No About configuration found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about configuration' });
  }
};

// @desc    Upload or Update the about image
// @route   PUT /api/about
// @access  Private (Admin only)
const updateAbout = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    const newImageUrl = req.file.path;
    let about = await About.findOne();

    if (about) {
      // Clean up old media from cloudinary
      const oldUrl = about.imageUrl;
      const oldPublicId = getPublicIdFromUrl(oldUrl);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'image' });
      }
      
      about.imageUrl = newImageUrl;
      const updatedAbout = await about.save();
      return res.json(updatedAbout);
    } else {
      // Create new
      about = await About.create({
        imageUrl: newImageUrl
      });
      return res.status(201).json(about);
    }

  } catch (error) {
    console.error('Update About Error:', error);
    res.status(500).json({ message: error.message || 'Error updating about config' });
  }
};

module.exports = { getAbout, updateAbout };
