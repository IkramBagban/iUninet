const express = require("express");
const { isAuth } = require("../middleware/isAuth");
const {
  createCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/category");

const router = express.Router();

router.get("/notes/:userId", getCategories);
router.post("/create-category", createCategory);
router.delete("/delete-category/:categoryId", deleteCategory);
module.exports = router;
