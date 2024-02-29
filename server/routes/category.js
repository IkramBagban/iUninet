const express = require("express");
const {  createCategory, deleteCategory, getCategories } = require("../controllers/category");

const router = express.Router();

router.get("/notes", getCategories);
router.post("/create-category", createCategory);
router.delete("/delete-category/:categoryId",deleteCategory)
module.exports = router;
