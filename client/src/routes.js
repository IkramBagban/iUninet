import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ChatSection from "./components/chat/ChatSection";
import NoteSection from "./components/note/NoteSection";
import NoteEditorSection from "./components/note/NoteEditorSection";
import Login from "./components/auth/LoginPage";
import SubCategories from "./components/note/SubCategories";
import Dummy_Login from "./components/auth/Dummy_Login";
import RegisterPage from "./components/auth/RegisterPage";



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
  { path: "/register", element: <RegisterPage /> }

]);

export default router;
