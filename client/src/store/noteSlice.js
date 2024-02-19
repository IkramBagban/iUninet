import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    categories: [],
    subCategories: [],
  },

  reducers: {
    addingTheFetchedDataToStore: (state, action) => {
      state.categories = action.payload;
    },

    addCategoryToStore: (state, action) => {
      state.categories.push(action.payload);
    },

    addSubcategoriesToStore: (state, action) => {
      console.log("paylaod ", action.payload);
      state.subCategories = action.payload;
    },
    addSubCategoryToStore: (state, action) => {
      console.log("paylaod ", action.payload);
      state.subCategories.push(action.payload);
    },
    addNote: (state, action) => {
      const { subCategoryId, notes } = action.payload;

      const subCategoryIdx = state.subCategories.findIndex(
        (n) => n._id === subCategoryId
      );

      if (subCategoryIdx !== -1) {
        state.subCategories[subCategoryIdx].notes = notes;
      }
    },
    deleteSubCategory: (state, action) => {
      const subCategoryId = action.payload;
      const filteredSubCategories = state.subCategories.filter(
        (subCategory) => subCategory._id !== subCategoryId
      );
      state.subCategories = filteredSubCategories;
    },
  },
});

export const {
  addCategoryToStore,
  addSubcategoriesToStore,
  addSubCategoryToStore,
  addNote,
  addingTheFetchedDataToStore,
  deleteSubCategory
} = noteSlice.actions;
export default noteSlice.reducer;
