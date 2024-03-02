const User = require('../models/user.model');
const ApiError = require('../utils/Api.error');
const ApiResponse = require('../utils/Api.response');

const genrateAccessAndRefreshToken = async (user_id) => {
  const user = await User.findById(user_id);

  const accessToken = user.genrateAccessToken();
  const refreshToken = user.genrateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.find({ username: username });
  if (!user) {
    throw new ApiError(404, 'User not existed');
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
    user._id
  );

  const loggedIn = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          loggedIn,
          accessToken,
          refreshToken,
        },
        'User logged in successfully'
      )
    );
};

module.exports.signup = async (req, res) => {
  const { username, email, phoneNum, password, repassword, org } = req.body;

  if (
    [username, phoneNum, password, repassword, org].some(field?.trim() === '')
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  if (password !== repassword) {
    throw new ApiError(400, 'Password does not matched');
  }

  const existedUser = await User.findOne({ username });
  if (existedUser) {
    throw new ApiError(400, 'User already exist');
  }

  const user = new User.create({
    username: username.toLowerCase(),
    email: email || '',
    phoneNum: '',
    password: password,
    org: org,
  });

  const createdUser = await user
    .findById(user._id)
    .select('-password refreshToken');

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, 'User Created Successfully'));
};

module.exports.changePassword = async (req, res) => {};
