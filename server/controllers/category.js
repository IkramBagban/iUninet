const Category = require("../models/category");
exports.getNotes = async (req, res) => {
  const notes = await Category.find();

  if (!notes) {
    res.status(404).json({
      message: "notes does not exist",
      success: false,
    });
  }

  res.status(200).json({
    message: "Notes Fetched Successfully",
    success: true,
    data: notes,
  });
};

exports.createCategory = async (req, res) => {
  const note = new Category(req.body);
  const response = await note.save();

  res.status(201).json({ message: "created", success: true, data: response });
};

// exports.createSubCategory = async (req, res) => {
//   const { categoryId, subCategory } = req.body;
//   const note = await Category.findOne({ _id: categoryId });

//   if (!note) {
//     console.log("cattegory not found");
//     return res
//       .status(404)
//       .json({ message: "category not found.", success: false });
//   }
//   note.subCategories.push(subCategory);
//   const response = await note.save();
//   // const subCategoryId = response.subCategories[response.subCategories.length - 1]._id;
//   res.status(200).json({ message: "...", success: true, data: response });
// };

// exports.postNote = async (req, res) => {
//   try {
//     const { categoryId, subCategoryId, notes } = req.body;

//     // Validate input parameters
//     if (!categoryId || !subCategoryId || !notes) {
//       return res
//         .status(400)
//         .json({ message: "Invalid input data", success: false });
//     }

//     // Update the note directly in the database
//     const updatedNote = await Category.findOneAndUpdate(
//       { categoryId: categoryId, "subCategories.subCategoryId": subCategoryId },
//       { $set: { "subCategories.$.notes": notes } },
//       { new: true }
//     );

//     if (!updatedNote) {
//       return res
//         .status(404)
//         .json({ message: "Category or note not found", success: false });
//     }

//     // Return success response
//     res
//       .status(200)
//       .json({
//         message: "Category updated successfully",
//         success: true,
//         data: updatedNote,
//       });
//   } catch (error) {
//     console.error("Error updating note:", error);
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };