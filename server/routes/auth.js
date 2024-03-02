const express = require("express");
const router = express.Router();

const {
  login,
  register,
  forgetPassword,
  updatePassword,
} = require("../controllers/auth");

router.post("/login", login);

router.post("/register", register);
router.put("/forget-password", forgetPassword);
router.put("/update-password", updatePassword);

module.exports = router;
