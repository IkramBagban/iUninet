import React, { useEffect, useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useDispatch } from "react-redux";
import { addNote } from "../../store/noteSlice";
import axios from "axios";
import { uploadToTmpFilesDotOrg_DEV_ONLY } from "@blocknote/core";
import { API } from "../../utils/api";

const Editor = ({
  categoryObj,
  subCategory,
 }) => {
  const [blocks, setBlocks] = useState(null);

  const dispatch = useDispatch();
// console.log('subCategory',subCategory)

  useEffect(() => {


    if (!categoryObj || !subCategory) return console.log('data....', categoryObj)
    dispatch(
      addNote({
        categoryId: categoryObj.categoryId,
        subCategoryId: subCategory._id,
        notes: subCategory.notes,
      })
    );
  }, []);


  const editor = useBlockNote({
    // using this to add file uploader
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,

    onEditorContentChange: (editor) => {

      setBlocks(editor?.topLevelBlocks);

      if (!subCategory || categoryObj) return
      dispatch(
        addNote({
          categoryId: categoryObj.categoryId,
          subCategoryId: subCategory.subCategoryId,
          notes: editor.topLevelBlocks,
        })
      );
    },
  });
  useEffect(() => {
    if (!subCategory?.notes) {
      return;
    }


    editor.insertBlocks(
      // block,
      subCategory.notes,
      //   editor.getTextCursorPosition().block,
      "initialBlockId",
      "after"
    );
  }, []);

  const saveNoteHandler = async () => {


    alert("your note has been saved")

    // const dataToPost = {
    //   categoryId: categoryObj.categoryId,
    //   subCategoryId: subCategory.subCategoryId,
    //   notes: blocks
    // }
// console.log('subCategory._id', subCategory)
    try {
      // const response = await axios.post(API + '/note/add-note', dataToPost)
      const r = await axios.patch(API + '/add-notes/' + subCategory._id, {notes : blocks})
      console.log('response added notes in subcategory', r)
    } catch (error) {
      // console.log('2.subCategoryId',subCategory._id)
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <button onClick={saveNoteHandler} className="m-3 p-2 border rounded bg-green-500 text-white">save note</button>
        <BlockNoteView editor={editor} theme={"light"}></BlockNoteView>
      </div>
    </>
  );
};

export default Editor;
