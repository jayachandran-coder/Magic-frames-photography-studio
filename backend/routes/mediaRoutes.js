const express = require('express');
const router = express.Router();
const { getMedia, uploadMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.route('/')
  .get(getMedia)
  .post(protect, upload.single('file'), uploadMedia);

router.route('/:id')
  .put(protect, upload.single('file'), updateMedia)
  .delete(protect, deleteMedia);

module.exports = router;
