// categories: [
//   {
//     categoryName: "physics ",
//     categoryId: "id",
//     subCategoryId: [
//         ...subCategoryId
//     ],
//   },
// ],
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    subCategoryId: [
      {
        ref: "SubCategory",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],

    userId: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { minimize: false }
);

categorySchema.methods.addSubCategoryId = function (subCategoryId) {
  this.subCategoryId.push(subCategoryId);
  return this.save();
};

categorySchema.methods.removeSubCategoryId = function (subCategoryId) {
  const subCategoryIds = this.subCategoryId.filter(
    (c) => !c.equals(subCategoryId)
  );
  this.subCategoryId = subCategoryIds;
  return this.save();
};

module.exports = mongoose.model("Category", categorySchema);
