const User = require("../models/user");
const { throwError } = require("../utils/throwError");

exports.getUsers = async (req, res, next) => {
  const loggedInUserId = req.user._id;

  try {
    if (!loggedInUserId) {
      throwError("Unauthroized Access - Authorization failed", 401);
    }

    const allUsers = await User.find().select('-password -resetlink');

    res
      .status(200)
      .json({
        message: "User fetched successfully.",
        success: true,
        data: allUsers,
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
