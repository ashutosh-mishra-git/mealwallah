const Cuisine = require('../models/tbl_cuisine');
const ApiError = require('../utils/Api.error');
const ApiResponse = require('../utils/Api.response');

// Add cuisine controller
module.exports.add = async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the category name');

  try {
    const cuisine = await Cuisine.create({ name, description });
    res.status(200).json(new ApiResponse(200, cuisine, 'Cuisine created'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

// Get cuisine controller
module.exports.get_all = async (req, res) => {
  try {
    const cuisines = await Cuisine.find({ deleted: false });
    if (!cuisines.length) throw new ApiError(404, 'Cuisines not found');
    res
      .status(200)
      .json(new ApiResponse(200, cuisines, 'Cuisine found successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

// Get single cuisine controller
module.exports.get = async (req, res) => {
  const { _id } = req.params;
  try {
    const cuisine = await Cuisine.findOne({ _id, deleted: false });
    if (!cuisine) throw new ApiError(404, 'Cuisine not found');
    res.status(200).json(new ApiResponse(200, cuisine, 'Cuisine Found'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

// Update cuisine controller
module.exports.update = async (req, res) => {
  const { _id, name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the category name');

  try {
    const updatedCuisine = await Cuisine.findByIdAndUpdate(
      _id,
      { name, description },
      { new: true }
    );
    if (!updatedCuisine) throw new ApiError(404, 'Cuisine not found');
    res
      .status(200)
      .json(
        new ApiResponse(200, updatedCuisine, 'Cuisine updated successfully')
      );
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

// Delete cuisine controller
module.exports.delete = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedCuisine = await Cuisine.findByIdAndUpdate(
      _id,
      { deleted: true, deleted_by: req.user_id },
      { new: true }
    );
    if (!deletedCuisine) throw new ApiError(404, 'Cuisine not found');
    res
      .status(200)
      .json(new ApiResponse(200, true, 'Cuisine deleted successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};
