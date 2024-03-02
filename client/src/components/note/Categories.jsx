import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { addCategoryToStore, addingTheFetchedDataToStore, deleteCategory } from "../../store/noteSlice";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { API, deleteData } from "../../utils/api";

const Categories = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const categories = useSelector((state) => state.note.categories) || null;

  const addCategoryHandler = async () => {
    const categoryName = window.prompt("Category name");

    if (!categoryName || categoryName.trim() === "") return alert('category name can\'t be empty');
    if (categoryName.includes('-')) return alert("you can't add '-' in the category name")


    const newCategory = {
      categoryId: categories.length + Math.floor(Math.random() * 9000 + 1000),
      categoryName: categoryName,
      userId : localStorage.getItem('userId')
    };

    try {
      const response = await axios.post(API + '/note/create-category', newCategory)
      dispatch(addCategoryToStore(response.data.data));
    } catch (e) {
      console.log(e)
    }

  };

  const deleteCategoryHandler = async (categoryId) => {
    const confirm = window.confirm("Confirm To Delete :")
    if (!confirm) return;
    try {
      const response = await deleteData(`/note/delete-category/${categoryId}`)
      if (response.data.success){
        navigate('/note')
        return dispatch(deleteCategory(categoryId))

      }


      else throw new Error('Delete SubCategory Failed.')
    } catch (error) {
      alert(error || "Something went wrong.")
    }
  }
  return (
    <div className="flex w-full border-2 ">

      <div className="w-1/4 h-screen p-4 border-r-2 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          <button
            onClick={addCategoryHandler}
            className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition duration-150"
          >
            <span className="text-xl">+</span>
          </button>
        </div>
        <div className="overflow-y-auto pr-2">
          {categories && categories.map((category) => {
            return (
              <div
                key={category._id}
                className="flex justify-between my-3 mx-2 rounded-lg px-4  bg-teal-500 hover:bg-teal-400 transition duration-150 shadow">
                <NavLink
                  to={`/note/${category.categoryName}-${category._id}`}
                  state={{ category }}
                  key={category.categoryId}
                  className="w-[100%] py-2"
                  // className="block py-2 px-4 my-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-green-50 hover:text-green-600 transition duration-150"
                >
                  {category.categoryName}
                </NavLink>
                  <button onClick={() => deleteCategoryHandler(category._id)} className="mx-3 text-red-300">D</button>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex-grow p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};



export default Categories;
