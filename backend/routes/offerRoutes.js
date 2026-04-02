const express = require('express');
const router = express.Router();
const { getOffers, createOffer, updateOffer, deleteOffer } = require('../controllers/offerController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.route('/')
  .get(getOffers)
  .post(protect, upload.single('media'), createOffer);

router.route('/:id')
  .put(protect, upload.single('media'), updateOffer)
  .delete(protect, deleteOffer);

module.exports = router;
