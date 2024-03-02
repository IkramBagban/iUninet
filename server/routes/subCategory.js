const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  addNotes,
  deleteSubCategory,
} = require("../controllers/subCategory");

const router = express.Router();

router.post("/sub", createSubCategory);
router.patch("/add-notes/:subCategoryId", addNotes);
router.get("/subcategories", getSubCategories);

router.delete("/delete-subCategory/:subCategoryId",deleteSubCategory)

module.exports = router;
