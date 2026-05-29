const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let coverImage = null;

    if (req.file) {
      // Assuming cloudinary/multer setup returns req.file.path like in mediaController
      coverImage = req.file.path;
    }

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({
      name,
      coverImage,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const oldName = category.name;

    if (name && name !== oldName) {
      // Check if new name already exists
      const nameExists = await Category.findOne({ name });
      if (nameExists) {
         return res.status(400).json({ message: 'Category name already exists' });
      }
      
      category.name = name;
      
      // IMPORTANT: Update all Media that used the old category name
      const Media = require('../models/Media');
      await Media.updateMany(
        { category: oldName },
        { $set: { category: name } }
      );
    }
    
    if (req.file) {
      category.coverImage = req.file.path;
    }

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const oldName = category.name;

    await category.deleteOne();
    
    // Optional: when a category is deleted, you might want to assign its media to 'Uncategorized'
    // or leave them as is. Reassigning prevents broken filters:
    const Media = require('../models/Media');
    await Media.updateMany(
      { category: oldName },
      { $set: { category: 'Uncategorized' } }
    );

    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
