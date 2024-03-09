const Vendor = require('../models/tbl_vendor');
const ApiResponse = require('../utils/Api.response');

module.exports.add = (req, res) => {
  try {
    const { vendor_name, phone_nu, aadhaar_nu, pan_nu, food_license_nu } =
      req.body;

    if (
      [vendor_name, phone_nu, aadhaar_nu, pan_nu, food_license_nu].some(
        field.trim === ''
      )
    ) {
      throw new ApiError(401, "Value can't be null");
    }

    const vendor = new Vendor.create({
      vendor_name,
      phone_nu,
      aadhaar_nu,
      pan_nu,
      food_license_nu,
    });

    if (!vendor) {
      throw new ApiError(401, 'Vendor not created');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, vendor, 'Vendor created successfully'));
  } catch (error) {
    throw new ApiError(501, 'Internal server error');
  }
};

module.exports.get_all = async (req, res) => {
  try {
    const Vendors = await Vendor.find({ deleted: false });

    if (!Vendors.length) {
      throw new ApiError(404, 'Vendors not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, Ve, 'Fetched all Vendors'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
module.exports.get = async (req, res) => {
  try {
    const { _id } = req.params;
    const vendor = await Vendor.findOne({ _id });
    if (!vendor) {
      throw new ApiError(404, 'vendor not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, vendor, 'vendor found succesfully'));
  } catch (error) {
    throw new ApiError(501, error.message);
  }
};
module.exports.update = (req, res) => {
  const { vendor_name, phone_nu, aadhaar_nu, pan_nu, food_license_nu } =
    req.body;

  if (
    [vendor_name, phone_nu, aadhaar_nu, pan_nu, food_license_nu].some(
      field.trim === ''
    )
  ) {
    throw new ApiError(401, "Value can't be null");
  }

  const updated_item = Vendor.findByIdAndUpdate(
    _id,
    { vendor_name, phone_nu, aadhaar_nu, pan_nu, food_license_nu },
    { new: true }
  );

  if (!updated_item) {
    throw new ApiError(404, 'Vendor not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updated_item, 'Vendor updated successfully'));
};

module.exports.delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted_item = await Vendor.findByIdAndUpdate(
      _id,
      { deleted: true },
      { new: true }
    );

    if (!deleted_item) {
      throw new ApiError(404, 'Vendor not found');
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
