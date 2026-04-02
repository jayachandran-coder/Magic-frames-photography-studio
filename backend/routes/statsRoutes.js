const express = require('express');
const router = express.Router();
const { getStats, incrementStats } = require('../controllers/statsController');
const { protect } = require('../middlewares/auth');

router.get('/', getStats);
router.put('/increment', incrementStats);

module.exports = router;
