// const Category = require("../models/category");
// const Conversation = require("../models/conversation");
// const { throwError } = require("../utils/throwError");

// exports.getCategories = async (req, res, next) => {
//   const { userId } = req.params;
//   const { reciever } = req.params;
//   try {
//     if (!userId) throwError("Unauthorized - userId is required", 401);

//     const categories = await Conversation.find({ userId });
//     if (!categories)
//       throwError("No categories found for the provided userId", 404);
//     res.status(200).json({
//       message: "Categories Fetched Successfully",
//       success: true,
//       data: categories,
//     });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 500; // Internal Server Error
//       error.message = "An error occurred while fetching categories";
//     }
//     next(error);
//   }
// };

// exports.createCategory = async (req, res, next) => {
//   const { categoryId, categoryName, userId } = req.body;
//   try {
//     if (!categoryId || !categoryName || !userId) {
//       throwError("Category Name, CategoryId and userId Is Required", 400);
//     }
//     const category = new Category(req.body);
//     const response = await category.save();

//     if (!response)
//       throwError(
//         "Internal Server Error : Error in saving the category to database.",
//         500
//       );

//     res.status(201).json({ message: "created", success: true, data: response });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };


