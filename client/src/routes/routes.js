import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ChatSection from "../components/chat/ChatSection";
import NoteSection from "../components/note/NoteSection";
import NoteEditorSection from "../components/note/NoteEditorSection";
import SubCategories from "../components/note/SubCategories";

import {
  Login,
  Register,
  ForgetPassword,
  UpdatePassword,
} from "../components/auth/auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/Chat",
        element: (
          <PrivateRoute>
            {" "}
            <ChatSection />
          </PrivateRoute>
        ),
      },
      {
        path: "/note",
        element: (
          <PrivateRoute>
            <NoteSection />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/note/:category",
            element: (
              <PrivateRoute>
                <SubCategories />
              </PrivateRoute>
            ),
          },
          {
            path: "/note/:category/:topic",
            element: (
              <PrivateRoute>
                <NoteEditorSection />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/note",
        element: (
          <PrivateRoute>
            <NoteSection />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <PublicRoute>
        <ForgetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/update-password/:token",
    element: (
      <PublicRoute>
        <UpdatePassword />
      </PublicRoute>
    ),
  },
]);

export default router;
