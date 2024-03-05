const jwt = require("jsonwebtoken");
const { throwError } = require("../utils/throwError");

exports.isAuth = (req, res, next) => {
  const token = req.headers["token"];

  try {
    if (!token) {
      throwError("Token is not provided , authorization denied", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded.user;
    } else {
      throwError("Invalid Token , authorization denied", 401);
    }
    next();
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 401;
    }
    next(error);
  }
};
