const express = require('express');
const router = express.Router();
const { loginUser, updateAdminCredentials } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.post('/login', loginUser);
router.put('/update', protect, updateAdminCredentials);

module.exports = router;
