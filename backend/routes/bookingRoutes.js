const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/auth');

router.route('/')
  .post(createBooking)
  .get(protect, getBookings);

module.exports = router;
