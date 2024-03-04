const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

// isAuth;

const {
  login,
  register,
  forgetPassword,
  updatePassword,
} = require("../controllers/auth");

router.post("/login", login);

router.post("/register", register);
router.put("/forget-password", forgetPassword);
router.put("/update-password/:token", updatePassword);

module.exports = router;
