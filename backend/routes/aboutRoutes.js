const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Since there's only one About configuration globally, we map direct to root
router.route('/')
  .get(getAbout)
  .put(protect, upload.single('image'), updateAbout);

module.exports = router;
