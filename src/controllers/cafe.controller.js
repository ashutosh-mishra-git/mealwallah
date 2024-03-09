const Cafe = require('../models/tbl_cafe');
const ApiResponse = require('../utils/Api.response');

module.exports.add = (req, res) => {
  try {
    const {
      cafe_name,
      building_id,
      owner_id,
      floor,
      allow_outsider,
      has_microwave,
    } = req.body;

    if (
      [
        cafe_name,
        building_id,
        owner_id,
        floor,
        allow_outsider,
        has_microwave,
      ].some(field.trim === '')
    ) {
      throw new ApiError('400', 'All fields are required');
    }

    const cafe = new Cafe.create({
      cafe_name,
      building_id,
      owner_id,
      floor,
      allow_outsider,
      has_microwave,
    });

    if (!cafe) {
      throw new ApiError(400, 'Cafe not created');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, cafe, 'Cafe created succesfully'));
  } catch (error) {
    console.error('An error occurred:', error);
    throw new ApiError(500, 'Server error');
  }
};

module.exports.get_all = async (req, res) => {
  try {
    const cafes = await Cafe.find({ deleted: false }).populate(
      'building_id owner_id'
    );

    if (!cafes.length) {
      throw new ApiError(404, 'No data found');
    }

    return res.status(200).json(200, cafes, 'Cafe found succesfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

module.exports.get = async (req, res) => {
  try {
    const { _id } = req.params;
    const cafe = await Cafe.findOne({ _id }).populate('buildinf_id owner_id');

    if (!cafe) {
      throw new ApiError(404, 'Cafe not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, cafe, 'Cafe found succesfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};

module.exports.update = (req, res) => {
  try {
    const {
      _id,
      cafe_name,
      building_id,
      owner_id,
      floor,
      allow_outsider,
      has_microwave,
    } = req.body;

    if (
      [
        _id,
        cafe_name,
        building_id,
        owner_id,
        floor,
        allow_outsider,
        has_microwave,
      ].some(field.trim === '')
    ) {
      throw new ApiError('400', 'All fields are required');
    }

    const updated_item = Cafe.findByIdAndUpdate(
      _id,
      {
        cafe_name,
        building_id,
        owner_id,
        floor,
        allow_outsider,
        has_microwave,
      },
      { new: true }
    );
    if (!updated_item) {
      throw new ApiError(404, 'Value not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updated_item, 'Updated sucessfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted_item = await Cafe.findByIdAndUpdate(
      _id,
      { deleted: true },
      { new: true }
    );

    if (!deleted_item) {
      throw new ApiError(404, 'Item not found');
    }
    if (!deleted_item.deleted) {
      throw new ApiError(501, 'Internal server error');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, true, 'Deleted sucessfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
