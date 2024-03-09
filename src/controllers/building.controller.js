const Building = require('../models/tbl_building');
const Address = require('../models/tbl_address');
const ApiResponse = require('../utils/Api.response');

module.exports.add = (req, res) => {
  try {
    const { building_name, address, allow_outsider } = req.body;

    if (!building_name) {
      throw new ApiError(400, 'All fields are required');
    }

    const { state, city, add1, add2, landmark, pincode, phone_nu, country } =
      address;

    const check = [
      state,
      city,
      add1,
      landmark,
      pincode,
      phone_nu,
      country,
    ].some(field.trim === '');
    if (check) {
      throw new ApiError(400, 'All fields are required');
    }

    const add_address = Address.create({
      state,
      city,
      add1,
      add2: add2 || '',
      landmark,
      pincode,
      phone_nu,
    });

    if (!add_address) {
      throw new ApiError(501, 'Internal server error');
    }

    const building = new Building.create({
      building_name,
      address: add_address._id,
      allow_outsider,
    });

    if (!building) {
      throw new ApiError(501, 'Internal server error');
    }

    building.address = add_address;
    return res
      .status(200)
      .json(new ApiResponse(200, building, 'Building created succesfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};
module.exports.get_all = async (req, res) => {
  try {
    const buildings = await Building.find({ deleted: false }).populate(
      'address'
    );

    if (!buildings.length) {
      throw new ApiError(404, 'Buildings not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, buildings, 'Fetched all Buildings'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
module.exports.get = async (req, res) => {
  try {
    const { _id } = req.params;
    const building = await Building.findOne({ _id }).populate('address');
    if (!building) {
      throw new ApiError(404, 'Buildings not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, building, 'Building found succesfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { _id, building, allow_outsider } = req.body;

    if (!building || !allow_outsider) {
      throw new ApiError(300, 'All fields required');
    }

    const updated_item = await Building.findByIdAndUpdate(
      _id,
      { building, allow_outsider },
      {
        new: true,
      }
    );

    if (!updated_item) throw new ApiError(404, 'Building not found');

    return res
      .status(200)
      .json(new ApiResponse(200, updated_item, 'Updated sucessfully'));
  } catch (error) {}
};

module.exports.delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted_item = await Building.findByIdAndUpdate(
      _id,
      { deleted: true },
      { new: true }
    );

    if (!deleted_item) {
      throw new ApiError(404, 'Building not found');
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
