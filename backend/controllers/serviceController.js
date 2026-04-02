const Service = require('../models/Service');
const cloudinary = require('../config/cloudinary');

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const urlParts = url.split('/');
  const filenameWithExt = urlParts[urlParts.length - 1];
  const folder = urlParts[urlParts.length - 2];
  const filename = filenameWithExt.split('.')[0];
  return `${folder}/${filename}`;
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort('-createdAt');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
const createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path;
    }

    const service = await Service.create({
      title,
      description,
      price,
      imageUrl
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Admin)
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = req.body.title || service.title;
      service.description = req.body.description || service.description;
      service.price = req.body.price || service.price;

      if (req.file) {
        // Clean up old media
        const oldUrl = service.imageUrl;
        const oldPublicId = getPublicIdFromUrl(oldUrl);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'image' });
        }
        
        service.imageUrl = req.file.path;
      }

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      const url = service.imageUrl;
      const publicId = getPublicIdFromUrl(url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      }

      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
