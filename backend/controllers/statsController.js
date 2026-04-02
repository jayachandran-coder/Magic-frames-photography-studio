const Stats = require('../models/Stats');

// @desc    Get website stats
// @route   GET /api/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne({ name: 'siteViews' });
    if (!stats) {
      stats = await Stats.create({ name: 'siteViews', count: 0 });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stats' });
  }
};

// @desc    Increment website view count
// @route   PUT /api/stats/increment
// @access  Public
const incrementStats = async (req, res) => {
  try {
    const stats = await Stats.findOneAndUpdate(
      { name: 'siteViews' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error incrementing stats' });
  }
};

module.exports = { getStats, incrementStats };
