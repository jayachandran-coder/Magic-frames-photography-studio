const Media = require('../models/Media');
const cloudinary = require('../config/cloudinary');

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const urlParts = url.split('/');
  const filenameWithExt = urlParts[urlParts.length - 1];
  const folder = urlParts[urlParts.length - 2];
  const filename = filenameWithExt.split('.')[0];
  return `${folder}/${filename}`;
};

// @desc    Fetch all media
// @route   GET /api/media
// @access  Public
const getMedia = async (req, res) => {
  try {
    const media = await Media.find({}).sort('-createdAt');
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media' });
  }
};

// @desc    Upload new media
// @route   POST /api/media
// @access  Private (Admin only)
const uploadMedia = async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No media file provided' });
    }

    const media = await Media.create({
      title,
      type,
      url: req.file.path,
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Upload Media Error:', error);
    res.status(500).json({ message: error.message || 'Error uploading media' });
  }
};

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private (Admin only)
const updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    media.title = req.body.title || media.title;
    if (req.body.type) media.type = req.body.type;

    if (req.file) {
      // Delete old file from cloudinary
      const oldPublicId = getPublicIdFromUrl(media.url);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId, { resource_type: media.type === 'video' ? 'video' : 'image' });
      }
      media.url = req.file.path;
    }

    const updatedMedia = await media.save();
    res.json(updatedMedia);
  } catch (error) {
    console.error('Update Media Error:', error);
    res.status(500).json({ message: error.message || 'Error updating media' });
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private (Admin only)
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    const publicId = getPublicIdFromUrl(media.url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: media.type === 'video' ? 'video' : 'image' });
    }

    await media.deleteOne();
    res.json({ message: 'Media securely deleted' });
  } catch (error) {
    console.error('Delete Media Error:', error);
    res.status(500).json({ message: error.message || 'Error deleting media' });
  }
};

module.exports = { getMedia, uploadMedia, updateMedia, deleteMedia };
