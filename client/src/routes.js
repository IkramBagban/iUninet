import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ChatSection from "./components/chat/ChatSection";
import NoteSection from "./components/note/NoteSection";
import NoteEditorSection from "./components/note/NoteEditorSection";
import SubCategories from "./components/note/SubCategories";

import {Login,Register,ForgetPassword,UpdatePassword} from "./components/auth/auth"




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/Chat", element: <ChatSection /> },
      {
        path: "/note",
        element: <NoteSection />,
        children: [{ path: "/note/:category", element: <SubCategories /> },
        { path: "/note/:category/:topic", element: <NoteEditorSection /> }],
      },
      { path: "/note", element: <NoteSection /> },
    ],

  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register/> },
  {path:"/forget-password",element: <ForgetPassword/>},
  {path:"/update-password/:token",element: <UpdatePassword/>}
]);

export default router;
