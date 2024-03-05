const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const { throwError } = require("./throwError");

const signJWT = async (payload, expiresIn = "15min") => {
  // return jwt.sign(payload, secretKey, { expiresIn });
  return jwt.sign(payload, secretKey);
};

const verifyJWT = async (token, next) => {
  try {
    const decoded = await jwt.verify(token, secretKey);

    if (!decoded) {
      throwError("Authroization Failed.", 401);
    }
    return decoded;
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      throwError("Authroization Failed.", 401);
    } else {
      if (err.statusCode) {
        err.statusCode = 401;
      }
      next(err);
    }
  }
};

module.exports = { signJWT, verifyJWT };
