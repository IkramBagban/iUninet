
const jwt = require('jsonwebtoken');
const { throwError } = require("../utils/throwError");

exports.isAuth = (req, res, next) => {
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    if(err.statusCode){
      error.statusCode=500;
    }
    next(err);
    
  }
};
