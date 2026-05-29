const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.route('/')
  .get(getCategories)
  .post(protect, upload.single('coverImage'), createCategory);

router.route('/:id')
  .put(protect, upload.single('coverImage'), updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
