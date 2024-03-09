const Company = require('../models/tbl_company');
const Building = require('../models/tbl_building');

module.exports.add = async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the category name');

  try {
    const company = await Company.create({ name, description });
    res.status(200).json(new ApiResponse(200, company, 'company created'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

module.exports.get_all = async (req, res) => {
  try {
    const company = await Company.find({ deleted: false });
    if (!company.length) throw new ApiError(404, 'company not found');
    res
      .status(200)
      .json(new ApiResponse(200, company, 'company found successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

module.exports.get = async (req, res) => {
  const { _id } = req.params;
  try {
    const company = await Company.findOne({ _id, deleted: false });
    if (!company) throw new ApiError(404, 'company not found');
    res.status(200).json(new ApiResponse(200, company, 'company Found'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

module.exports.update = async (req, res) => {
  const { _id, name, description } = req.body;
  if (!name) throw new ApiError(301, 'Provide the company name');

  try {
    const updated_company = await Company.findByIdAndUpdate(
      _id,
      { name, description },
      { new: true }
    );
    if (!updated_company) throw new ApiError(404, 'Company not found');
    res
      .status(200)
      .json(
        new ApiResponse(200, updated_company, 'Company updated successfully')
      );
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};

module.exports.delete = async (req, res) => {
  const { _id } = req.params;
  try {
    const deleted_company = await Company.findByIdAndUpdate(
      _id,
      { deleted: true, deleted_by: req.user_id },
      { new: true }
    );
    if (!deleted_company) throw new ApiError(404, 'Company not found');
    res
      .status(200)
      .json(new ApiResponse(200, true, 'Company deleted successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error');
  }
};
