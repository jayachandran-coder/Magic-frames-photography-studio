const Offer = require('../models/Offer');
const cloudinary = require('../config/cloudinary');

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const urlParts = url.split('/');
  const filenameWithExt = urlParts[urlParts.length - 1];
  const folder = urlParts[urlParts.length - 2];
  const filename = filenameWithExt.split('.')[0];
  return `${folder}/${filename}`;
};

// @desc    Fetch all offers
// @route   GET /api/offers
// @access  Public
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}).sort('-createdAt');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offers' });
  }
};

// @desc    Create a new offer
// @route   POST /api/offers
// @access  Private (Admin only)
const createOffer = async (req, res) => {
  try {
    const { title, description, buttonText } = req.body;
    
    let imageUrl = '';
    let videoUrl = '';

    if (req.file) {
      if (req.file.mimetype.startsWith('video/')) {
        videoUrl = req.file.path;
      } else {
        imageUrl = req.file.path;
      }
    }

    const offer = await Offer.create({
      title,
      description,
      buttonText: buttonText || 'Book Now',
      imageUrl,
      videoUrl,
    });

    res.status(201).json(offer);
  } catch (error) {
    console.error('Create Offer Error:', error);
    res.status(500).json({ message: error.message || 'Error creating offer' });
  }
};

// @desc    Update offer
// @route   PUT /api/offers/:id
// @access  Private
const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    offer.title = req.body.title || offer.title;
    offer.description = req.body.description || offer.description;
    offer.buttonText = req.body.buttonText || offer.buttonText;

    if (req.file) {
      // Clean up old media
      const oldUrl = offer.videoUrl || offer.imageUrl;
      const oldPublicId = getPublicIdFromUrl(oldUrl);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId, { resource_type: offer.videoUrl ? 'video' : 'image' });
      }

      // Assign new media URL based on mime type
      if (req.file.mimetype.startsWith('video/')) {
        offer.videoUrl = req.file.path;
        offer.imageUrl = '';
      } else {
        offer.imageUrl = req.file.path;
        offer.videoUrl = '';
      }
    }

    const updatedOffer = await offer.save();
    res.json(updatedOffer);
  } catch (error) {
    console.error('Update Offer Error:', error);
    res.status(500).json({ message: error.message || 'Error updating offer' });
  }
};

// @desc    Delete offer
// @route   DELETE /api/offers/:id
// @access  Private
const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    const url = offer.videoUrl || offer.imageUrl;
    const publicId = getPublicIdFromUrl(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: offer.videoUrl ? 'video' : 'image' });
    }

    await offer.deleteOne();
    res.json({ message: 'Offer securely deleted' });
  } catch (error) {
    console.error('Delete Offer Error:', error);
    res.status(500).json({ message: error.message || 'Error deleting offer' });
  }
};

module.exports = { getOffers, createOffer, updateOffer, deleteOffer };
