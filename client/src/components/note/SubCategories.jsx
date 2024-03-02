import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API, deleteData } from "../../utils/api";
import { addSubCategoryToStore, deleteSubCategory } from "../../store/noteSlice";

const SubCategories = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const categoryId = params.category.split('-')[1]

  const category = useSelector((state) => {
    return state.note.categories.find((n) => (n._id === categoryId));
  }) || null;
  const subCategory = useSelector((state) => {
    return state.note.subCategories.filter((n) => (n.categoryId === categoryId));
  }) || null;


  const addSubCategory = async () => {

    const subCategoryTitle = window.prompt("sub Category");

    if (!subCategoryTitle) return;

    const subCategory = {
      categoryId: categoryId,
      subCategory: {
        subCategoryName: subCategoryTitle,
        subCategoryId: Math.random(),
        notes: [],
      },
    };
    try {
      const response = await axios.post(API + '/sub', subCategory)
      dispatch(addSubCategoryToStore(response.data.data))
    } catch (e) {
      console.log(e)
    }
  };

  const deleteSubCategoryHandler = async (subCategoryId) => {
    const confirm = window.confirm("Confirm To Delete :")
    if (!confirm) return;
    try {
      const response = await deleteData(`/delete-subCategory/${subCategoryId}`)
      if (response.data.success)
        return dispatch(deleteSubCategory(subCategoryId))

      else throw new Error('Delete SubCategory Failed.')
    } catch (error) {
      alert(error || "Something went wrong.")
    }
  }
  return (
    <div className="mx-10 my-4">
      <div className="flex justify-between items-center bg-teal-500 p-4 rounded-lg shadow-md">
        <h1 className="text-xl text-white font-semibold">{category?.categoryName}</h1>
        <button
          onClick={addSubCategory}
          className="bg-white text-teal-500 rounded-full p-2 hover:bg-teal-100 transition duration-150"
        >
          <strong>+</strong>
        </button>
      </div>

      <div className="mt-4">
        {/* If we directly delete a category, it causes an error because we are trying to access the values of the deleted category below. Therefore, I've added a condition with 'category &&' to ensure that if the category no longer exists, it will not attempt to render the content below. */}
        {(category && subCategory) && subCategory.map((subCategory) => (
          <div
            key={subCategory._id}
            className="flex justify-between my-3 mx-2 rounded-lg px-4  bg-teal-500 hover:bg-teal-400 transition duration-150 shadow">
            <Link
              className="w-[100%] py-2"
              to={`/note/${category.categoryName}-${categoryId}/${subCategory.subCategoryName}-${subCategory._id}`}

            >
              <div className="text-white font-medium">{subCategory.subCategoryName}</div>
            </Link>
            <button onClick={() => deleteSubCategoryHandler(subCategory._id)} className=" text-red-300">D</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;