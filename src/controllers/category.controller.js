const Category = require('../models/tbl_category');
const ApiError = require('../utils/Api.error');
const ApiResponse = require('../utils/Api.response');

//Add category controller
module.exports.add = (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the category name');
  const category = new Category.create({ name, description });
  return res
    .status(200)
    .json(new ApiResponse(200, category, 'Category created '));
};

// Get all category controller
module.exports.get_all = async (req, res) => {
  const category = await Category.find({ deleted: false });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, 'Category found succesfully'));
};

// Get single category controller
module.exports.get = async (req, res) => {
  const { _id } = req.params;

  const category = await Category.findOne({ _id, deleted: false });
  if (!category) throw new ApiError(404, 'Category not found');

  return res
    .status(200)
    .json(new ApiResponse(200, category, 'Category Found '));
};

// Update category controller
module.exports.update = async (req, res) => {
  const { _id, name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the Category name');

  const updatedCategory = await Category.findByIdUpdate(
    _id,
    { name, description },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(404, 'Category not found');
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, 'Category updated succesfully ')
    );
};

// Delete category controller
module.exports.delete = async (req, res) => {
  const { _id } = req.params;
  const deleted_category = await Category.findByIdUpdate(_id, {
    deleted: true,
    deleted_by: req.user_id,
    new: true,
  });

  if (!deleted_category) throw new ApiError(404, 'Category not found');

  return res
    .status(200)
    .json(new ApiResponse(200, true, 'Category deleted created '));
};
