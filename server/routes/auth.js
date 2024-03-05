const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
  login,
  register,
  forgetPassword,
  updatePassword,
} = require("../controllers/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("images"));
  },
  filename: (req, file, cb) => {
    const filePath = file.originalname;

    cb(null, Math.floor(Math.random() * 100000) + "-"+ filePath);
  },
});

const upload = multer({ storage: storage });
router.post("/login", login);

router.post("/register", upload.single("profilePic"), register);
router.put("/forget-password", forgetPassword);
router.put("/update-password/:token", updatePassword);

module.exports = router;
