const SubCategory = require("../models/subCategory");
const Category = require("../models/category");
const { throwError } = require("../utils/throwError");

exports.createSubCategory = async (req, res, next) => {
  const { categoryId, subCategory } = req.body;

  if (!categoryId || !subCategory) {
    throwError("CategoryId and subCategory Details are required.", 400);
  }

  try {
    const sub_category = new SubCategory({
      ...subCategory,
      categoryId: categoryId,
    });
    const response = await sub_category.save();

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      throwError("Category Doesn't found!.", 404);
    }

    await category.addSubCategoryId(response._id);
    res.status(201).json({
      message: "SubCategory has been created successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};

exports.addNotes = async (req, res, next) => {
  const subCategoryId = req.params.subCategoryId;
  const notes = req.body.notes;

  if (!subCategoryId || !notes) {
    throwError("subCategoryId and notes are required.", 400);
  }
  try {
    const subCategory = await SubCategory.findOne({ _id: subCategoryId });

    if (!subCategory) {
      throwError("SubCategory not found", 404);
    }

    subCategory.notes = notes;
    const response = await subCategory.save();

    res.status(200).json({
      message: "add notes to subcategory",
      success: true,
      data: response,
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;

    next(error);
  }
};
exports.getSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({
      message: "SubCategories fetched successfully",
      success: true,
      data: subCategories,
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params;

  if (!subCategoryId) {
    throwError("subCategoryId is required", 400);
  }

  try {
    const response = await SubCategory.findByIdAndDelete(subCategoryId);

    if (!response) {
      throwError("SubCategory not found", 404);
    }

    const category = await Category.findOne({ subCategoryId: subCategoryId });
    await category.removeSubCategoryId(subCategoryId);

    res.status(200).json({
      message: "delete subCategory successfully.",
      success: true,
      data: response,
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
