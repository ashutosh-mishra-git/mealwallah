const Cuisine = require('../models/tbl_cuisine');
const ApiError = require('../utils/Api.error');
const ApiResponse = require('../utils/Api.response');

// Add cuisine controller
module.exports.add = (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the category name');
  const cuisine = new Cuisine.create({ name, description });
  return res
    .status(200)
    .json(new ApiResponse(200, cuisine, 'Cuisine created '));
};
// Get cuisine controller
module.exports.get_all = async (req, res) => {
  const cuisines = await Cuisine.find({ deleted: false });
  if (!cuisines) {
    throw new ApiError(404, 'Cuisines not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cuisines, 'Cuisine found succesfully'));
};

// Get single cuisine controller
module.exports.get = async (req, res) => {
  const { _id } = req.params;

  const cuisine = await Cuisine.findOne({ _id, deleted: false });
  if (!cuisine) throw new ApiError(404, 'Cuisine not found');

  return res.status(200).json(new ApiResponse(200, cuisine, 'Cuisine Found '));
};

// Update cuisine controller
module.exports.update = async (req, res) => {
  const { _id, name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the category name');

  const cuisine = await Cuisine.findByIdUpdate(
    _id,
    { name, description },
    { new: true }
  );

  if (!updatedCuisine) {
    throw new ApiError(404, 'Cuisine not found');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, cuisine, 'Cuisine updated succesfully '));
};

// Delete cuisine controller
module.exports.delete = async (req, res) => {
  const { _id } = req.params;
  const deleted_cuisine = await Cuisine.findByIdUpdate(_id, {
    deleted: true,
    deleted_by: req.user_id,
    new: true,
  });

  if (!deleted_cuisine) throw new ApiError(404, 'Cuisine not found');

  return res
    .status(200)
    .json(new ApiResponse(200, true, 'Cuisine deleted created '));
};
