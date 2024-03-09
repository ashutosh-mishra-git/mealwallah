const Address = require('../models/tbl_address');
const ApiResponse = require('../utils/Api.response');

module.exports.add = (req, res) => {
  try {
    const { state, city, add1, add2, landmark, pincode, phone_nu, country } =
      req.body;

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

    const address = Address.create({
      state,
      city,
      add1,
      add2: add2 || '',
      landmark,
      pincode,
      phone_nu,
    });

    if (!address) {
      throw new ApiError(501, 'Internal server error');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, address, 'Address added Sucesfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
module.exports.get_all = async (req, res) => {
  try {
    const address = await Address.find({ deleted: false });

    if (!address.length) {
      throw new ApiError(404, 'Address not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, address, 'Fetched all address'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
module.exports.get = async (req, res) => {
  try {
    const { _id } = req.params;
    const address = await Address.findOne({ _id });
    if (!address) {
      throw new ApiError(404, 'Address not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, address, 'Address found succesfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
module.exports.update = async (req, res) => {
  const { _id, state, city, add1, add2, landmark, pincode, phone_nu, country } =
    req.body;

  const check = [
    _id,
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

  const updated_item = await Address.findByIdAndUpdate(
    _id,
    {
      state,
      city,
      add1,
      add2: add2 || '',
      landmark,
      pincode,
      phone_nu,
      country,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updated_item, 'Updated item found successfully')
    );
};

module.exports.delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted_item = await Address.findByIdAndUpdate(
      _id,
      { deleted: true },
      { new: true }
    );

    if (!deleted_item) {
      throw new ApiError(404, 'Address not found');
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
