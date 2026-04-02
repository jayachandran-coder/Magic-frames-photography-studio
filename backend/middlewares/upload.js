const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'magic_frames',   // Main folder in cloudinary
    resource_type: 'auto',    // Detect if video or image automatically
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'mp4', 'mov', 'webm'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
