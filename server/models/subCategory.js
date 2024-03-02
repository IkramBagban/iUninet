const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: String,
    subCategoryId: Number,
    notes: [],
    categoryId: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
