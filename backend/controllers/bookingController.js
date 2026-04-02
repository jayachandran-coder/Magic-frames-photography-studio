const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/booking
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { name, phone, offerTitle, offerDescription } = req.body;
    const booking = await Booking.create({
      name,
      phone,
      offerTitle,
      offerDescription
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// @desc    Get all bookings
// @route   GET /api/booking
// @access  Private (Admin)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

module.exports = { createBooking, getBookings };
